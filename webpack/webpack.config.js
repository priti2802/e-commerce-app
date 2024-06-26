const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common.js')

module.exports = (envVars) => {
   const { env } = envVars

   console.log(`================ ${env} ================`);
   const envConfig = require(`./webpack.${env}.js`)

   return merge(commonConfig, envConfig)
}
