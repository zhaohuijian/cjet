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
    cssOptions: {},
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
     * postcss配置
     * https://github.com/postcss/postcss-loader#options
     * 仅支持扩展plugin
     */
    postcssOptions: {
      plugins: []
    }
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
