const { webpackConfigProd, webpackConfigDev } = require('@reapit/ts-scripts')

const isProd = process.env.NODE_ENV === 'production'
const appName = 'Developer Portal'
const config = isProd ? webpackConfigProd({ appName }) : webpackConfigDev({ appName })

module.exports = config
