class Enterprise::Webhooks::MayarController < ActionController::API
  before_action :verify_token

  def process_payload
    account_id = params[:accountId]
    plan = params[:plan]
    is_self_hosted = ActiveModel::Type::Boolean.new.cast(params[:isSelfHosted])

    if account_id.blank? || plan.blank?
      render json: { error: 'Missing accountId or plan' }, status: :unprocessable_entity
      return
    end

    account = Account.find_by(id: account_id)
    unless account
      render json: { error: "Account not found with ID: #{account_id}" }, status: :not_found
      return
    end

    # Normalize plan name for the Account's custom_attributes
    normalized_plan = case plan.to_s.downcase
                      when 'growth' then 'Startups'
                      when 'business' then 'Business'
                      when 'premium' then 'Premium'
                      when 'enterprise' then 'Enterprise'
                      else plan.to_s.titleize
                      end

    # If it is self-hosted:
    # Update the GlobalConfig/InstallationConfig INSTALLATION_PRICING_PLAN and INSTALLATION_PRICING_PLAN_QUANTITY
    if is_self_hosted
      plan_config = InstallationConfig.find_by(name: 'INSTALLATION_PRICING_PLAN')
      plan_config&.update!(value: plan.to_s.downcase) # 'premium' or 'enterprise'

      quantity_config = InstallationConfig.find_by(name: 'INSTALLATION_PRICING_PLAN_QUANTITY')
      quantity_config&.update!(value: 10) # 10 agent licenses by default for paid plans
    end

    # Update the specific account's billing attributes
    # For self-hosted accounts, set plan_name to 'Enterprise' so they get all features unlocked
    db_plan_name = is_self_hosted ? 'Enterprise' : normalized_plan

    account.update!(
      custom_attributes: account.custom_attributes.merge(
        'plan_name' => db_plan_name,
        'subscription_status' => 'active',
        'subscription_ends_on' => 1.month.from_now.iso8601,
        'mayar_invoice_id' => params[:invoiceId],
        'mayar_customer_email' => params[:email]
      )
    )

    # Reconcile plan features
    Enterprise::Billing::ReconcilePlanFeaturesService.new(account: account).perform

    # Update Captain AI limits
    # Default limits based on pricing details:
    # Growth (Startups) -> 300, Business -> 500, Enterprise -> 800
    responses_limit = case db_plan_name.downcase
                      when 'startups' then 300
                      when 'business' then 500
                      when 'enterprise' then 800
                      else 0
                      end

    # Try to load limits from CAPTAIN_CLOUD_PLAN_LIMITS if set
    limits_config = InstallationConfig.find_by(name: 'CAPTAIN_CLOUD_PLAN_LIMITS')&.value
    if limits_config.present?
      begin
        parsed_config = limits_config.is_a?(String) ? JSON.parse(limits_config) : limits_config
        plan_config = parsed_config[db_plan_name.downcase] || parsed_config[plan.to_s.downcase]
        responses_limit = plan_config['responses'].to_i if plan_config && plan_config['responses']
      rescue StandardError => e
        Rails.logger.error "Failed to parse CAPTAIN_CLOUD_PLAN_LIMITS in Mayar webhook: #{e.message}"
      end
    end

    current_limits = account.limits || {}
    account.update!(limits: current_limits.merge('captain_responses' => responses_limit))

    render json: { success: true, plan: db_plan_name }, status: :ok
  end

  private

  def verify_token
    token = request.headers['X-Conviq-Webhook-Token']
    expected_token = ENV.fetch('MAYAR_WEBHOOK_TOKEN', nil)

    authorized = expected_token.present? && token.present? && ActiveSupport::SecurityUtils.secure_compare(token, expected_token)
    return if authorized

    render json: { error: 'Unauthorized' }, status: :unauthorized
  end
end
