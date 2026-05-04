module Enterprise::ConviqHub
  ENTERPRISE_BASE_URL = 'https://hub.2.conviq.com'.freeze

  def base_url
    return ENV.fetch('CONVIQ_HUB_URL', ENTERPRISE_BASE_URL) if Rails.env.development?

    ENTERPRISE_BASE_URL
  end
end
