require 'rails_helper'

RSpec.describe 'Enterprise::Webhooks::MayarController', type: :request do
  let!(:account) { create(:account) }
  let(:token) { 'secret_token_123' }

  before do
    allow(ENV).to receive(:fetch).and_call_original
    allow(ENV).to receive(:fetch).with('MAYAR_WEBHOOK_TOKEN', nil).and_return(token)
  end

  describe 'POST /enterprise/webhooks/mayar' do
    context 'when unauthorized' do
      it 'returns unauthorized if X-Conviq-Webhook-Token is missing' do
        post '/enterprise/webhooks/mayar', params: { accountId: account.id, plan: 'growth' }
        expect(response).to have_http_status(:unauthorized)
      end

      it 'returns unauthorized if X-Conviq-Webhook-Token is incorrect' do
        post '/enterprise/webhooks/mayar',
             headers: { 'X-Conviq-Webhook-Token' => 'wrong_token' },
             params: { accountId: account.id, plan: 'growth' }
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'when authorized' do
      let(:headers) { { 'X-Conviq-Webhook-Token' => token } }

      it 'returns unprocessable_entity if accountId is missing' do
        post '/enterprise/webhooks/mayar', headers: headers, params: { plan: 'growth' }
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'returns unprocessable_entity if plan is missing' do
        post '/enterprise/webhooks/mayar', headers: headers, params: { accountId: account.id }
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'returns not_found if account does not exist' do
        post '/enterprise/webhooks/mayar', headers: headers, params: { accountId: 999_999, plan: 'growth' }
        expect(response).to have_http_status(:not_found)
      end

      it 'successfully provisions a cloud growth (Startups) plan update' do
        reconcile_service = double
        expect(Enterprise::Billing::ReconcilePlanFeaturesService).to receive(:new).with(account: account).and_return(reconcile_service)
        expect(reconcile_service).to receive(:perform)

        post '/enterprise/webhooks/mayar',
             headers: headers,
             params: { accountId: account.id, plan: 'growth', isSelfHosted: false, invoiceId: 'inv-123', email: 'test@conviq.com' }

        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body)).to eq('success' => true, 'plan' => 'Startups')

        account.reload
        expect(account.custom_attributes['plan_name']).to eq('Startups')
        expect(account.custom_attributes['subscription_status']).to eq('active')
        expect(account.custom_attributes['mayar_invoice_id']).to eq('inv-123')
        expect(account.custom_attributes['mayar_customer_email']).to eq('test@conviq.com')
        expect(account.limits['captain_responses']).to eq(300)
      end

      it 'successfully provisions a self-hosted premium plan update' do
        unless InstallationConfig.find_by(name: 'INSTALLATION_PRICING_PLAN')
          create(:installation_config, name: 'INSTALLATION_PRICING_PLAN', value: 'community')
        end

        unless InstallationConfig.find_by(name: 'INSTALLATION_PRICING_PLAN_QUANTITY')
          create(:installation_config, name: 'INSTALLATION_PRICING_PLAN_QUANTITY', value: 0)
        end

        reconcile_service = double
        expect(Enterprise::Billing::ReconcilePlanFeaturesService).to receive(:new).with(account: account).and_return(reconcile_service)
        expect(reconcile_service).to receive(:perform)

        post '/enterprise/webhooks/mayar',
             headers: headers,
             params: { accountId: account.id, plan: 'premium', isSelfHosted: true, invoiceId: 'inv-456', email: 'self@conviq.com' }

        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body)).to eq('success' => true, 'plan' => 'Enterprise')

        account.reload
        # For self-hosted, the account's plan_name is upgraded to Enterprise to unlock all features locally
        expect(account.custom_attributes['plan_name']).to eq('Enterprise')
        expect(account.limits['captain_responses']).to eq(800)

        expect(InstallationConfig.find_by(name: 'INSTALLATION_PRICING_PLAN').value).to eq('premium')
        expect(InstallationConfig.find_by(name: 'INSTALLATION_PRICING_PLAN_QUANTITY').value).to eq(10)
      end
    end
  end
end
