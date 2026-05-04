json.partial! 'api/v1/models/account', formats: [:json], resource: @account
json.latest_conviq_version @latest_conviq_version
json.partial! 'enterprise/api/v1/accounts/partials/account', account: @account if ConviqApp.enterprise?
