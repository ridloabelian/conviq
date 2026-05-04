class SuperAdmin::PlatformBannersController < SuperAdmin::ApplicationController
  before_action :ensure_conviq_cloud

  private

  def ensure_conviq_cloud
    raise ActionController::RoutingError, 'Not Found' unless ConviqApp.conviq_cloud?
  end
end
