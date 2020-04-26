const path = require('path');
const fs = require('fs');
const defaultsDeep = require('lodash.defaultsdeep');

const cjetConfigDefault = {
  html: {
    /**
     * 启用 preload
     * 构建项目自动加入preload方案
     */
    preload: false,
    /**
     * 启用 prefetch
     * 构建项目自动加入prefetch方案
     */
    prefetch: false,
  },

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
     * style sourceMap
     */
    sourceMap: false,
  },

  /**
   * SVG symbol图标方案配置
   * 配置参考：https://github.com/kisenka/svg-sprite-loader#configuration
   */
  svgSprite: {
    options: {
      symbolId: 'icon-[name]', //symbolId和use使用的名称
    },
  },

  /**
   * eslint 配置
   */
  eslint: {
    available: true, //开启eslint
    cache: true, //启用配置缓存，如果新配置不起作用请先设置为false
    useEslintrc: false, //使用项目中eslintrc配置
    extends: [], //默认使用的eslint规则
  },

  /**
   * -------------------------------
   * 路径配置
   * -------------------------------
   */
  paths: {
    appPath: '.',
    appSrc: '.', //源码目录，非src目录中的代码不做编译
    appBuild: 'dist', //生产目录
    appPublic: 'public', //静态资源目录
    appIndexHtml: 'src/index.html', //默认首页模板
    appIndexJs: 'src/index', //默认首页脚本文件
    appPages: 'src/pages', //多页面存放目录
    svgIconPath: 'src/icons', //svg 图标存放目录
    proxySetup: 'src/setupProxy.js', //proxy代理配置文件
    appTypeDeclarations: 'src/react-app-env.d.ts', //ts环境变量配置文件
  },

  /**
   * PWA的workbox-webpack-plugin配置
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
    },
  },

  /**
   * typescript配置
   */
  tsconfig: {
    rewrite: true, //是否使用框架内部最佳实践覆盖项目中的tsconfig.json
  },
};

const cjetConfig = {};

const cjetConfigPath = path.resolve(process.cwd(), 'cjet.config.js');

if (fs.existsSync(cjetConfigPath)) {
  const cjetConfigProject = require(cjetConfigPath);
  Object.assign(cjetConfig, defaultsDeep(cjetConfigProject.default || cjetConfigProject, cjetConfigDefault));
} else {
  Object.assign(cjetConfig, cjetConfigDefault);
}

module.exports = cjetConfig;
