const Routes = {
  AUTHENTICATION: '/authentication',
  AUTHENTICATION_LOGIN_TYPE: '/authentication/:loginType',
  APPS: '/apps',
  APPS_NEW: '/apps/new',
  APP_DETAIL: '/apps/:appid',
  APP_DETAIL_V8: '/v8/apps/:appid',
  SWAGGER: '/swagger',
  DESKTOP: '/desktop',
  APPS_EDIT: '/apps/:appid/edit',
  APPS_EDIT_V8: '/v8/apps/:appid/edit',
  API_DOCS: '/api-docs',
  ANALYTICS_SCHEMA_DOCS: '/analytics-schema-docs',
  ANALYTICS: '/analytics',
  ANALYTICS_TAB: '/analytics/:activeTab?',
  RESET_PASSWORD: '/reset-password',
  WEBHOOKS_ABOUT: '/webhooks/about',
  WEBHOOKS_NEW: '/webhooks/new',
  WEBHOOKS_MANAGE: '/webhooks/manage',
  WEBHOOKS_LOGS: '/webhooks/logs',
  SETTINGS: '/settings/',
  SETTINGS_PROFILE_TAB: '/settings/profile',
  SETTINGS_ORGANISATION_TAB: '/settings/organisation',
  SETTINGS_BILLING_TAB: '/settings/billing',
  SUBMIT_APP: '/submit-app',
  HELP: '/help',
  APP_PREVIEW: '/apps/:appId/preview',
  DEVELOPER_EDITION_DOWNLOAD: '/edition-download',
  REGISTER: '/register',
  REGISTER_CONFIRM: '/register/confirm',
  LOGIN: '/login',
  FOUR_O_FOUR: '/404',
  FORGOT_PASSWORD: '/forgot-password',
  INVITE: '/invite',
  OK: '/ok',
  GRAPHQL: '/graphql',
  ELEMENTS: '/elements',
  SELECT_ROLE: '/select-role',
}

export default Routes
