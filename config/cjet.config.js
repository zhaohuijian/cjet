const path = require('path')
const fs = require('fs')
const defaultsDeep = require('lodash.defaultsdeep')

const cjetConfigDefault = {

  /**
   * -------------------------------
   * 样式编译器配置
   * -------------------------------
   */
  style: {
    /**
     * css配置
     * https://github.com/webpack-contrib/css-loader
     */
    cssOptions: {

    },
    /**
     * less配置
     * https://github.com/webpack-contrib/less-loader
     */
    lessOptions: {},

    /**
     * sass配置
     * https://github.com/webpack-contrib/sass-loader
     */
    sassOptions: {},

    /**
     * stylus配置
     * https://github.com/shama/stylus-loader
     */
    stylusOptions: {},

    /**
     * style sourceMap
     */
    sourceMap: false
  },

  /**
   * -------------------------------
   * 路径配置
   * -------------------------------
   */
  paths: {
    appPath: '.',
    appSrc: 'src',
    appBuild: 'dist',
    appPublic: 'src/public',
    appIndexHtml: 'src/index.html',
    appIndexJs: 'src/index',
    appPages: 'src/pages',
    proxySetup: 'src/setupProxy.js',
    appTypeDeclarations: 'src/react-app-env.d.ts',
    ownTypeDeclarations: 'lib/react-app.d.ts'
  },
  /**
   * workbox-webpack-plugin配置
   * More info see: https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin
   */
  pwa: {
    mode: 'GenerateSW', // GenerateSW or InjectManifest
    options: {
      clientsClaim: true,
      exclude: [/\.map$/, /asset-manifest\.json$/],
      importWorkboxFrom: 'cdn',
      navigateFallback: '/index.html',
      navigateFallbackBlacklist: [
        // Exclude URLs starting with /_, as they're likely an API call
        new RegExp('^/_'),
        // Exclude any URLs whose last part seems to be a file extension
        // as they're likely a resource and not a SPA route.
        // URLs containing a "?" character won't be blacklisted as they're likely
        // a route with query params (e.g. auth callbacks).
        new RegExp('/[^/?]+\\.[^/]+$'),
      ],
    }
  }
}

const cjetConfig = {}

const cjetConfigPath = path.resolve(process.cwd(), 'cjet.config.js')

if (fs.existsSync(cjetConfigPath)) {
  const cjetConfigProject = require(cjetConfigPath)
  Object.assign(cjetConfig, defaultsDeep((cjetConfigProject.default || cjetConfigProject), cjetConfigDefault))
} else {
  Object.assign(cjetConfig, cjetConfigDefault)
}

module.exports = cjetConfig
