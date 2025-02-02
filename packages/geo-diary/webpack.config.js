const { webpackConfigProd, webpackConfigDev, sassProd, sassDev, graphql } = require('@reapit/ts-scripts')

const isProd = process.env.NODE_ENV === 'production'
const appName = 'Geo Diary'
const config = isProd ? webpackConfigProd({ appName }) : webpackConfigDev({ appName })
const sassRules = isProd ? sassProd : sassDev

config.module.rules.push(sassRules)
config.module.rules.push(graphql)

module.exports = config
