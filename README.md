<p align="center">
    <img width="150" src="https://user-images.githubusercontent.com/9346030/74599354-5ac22200-50bb-11ea-82be-e340bb2f90e7.png">
  <br>
  <br>
  <a href="https://www.npmjs.com/package/cjet">
  <img src="https://img.shields.io/npm/v/cjet.svg" alt="npm-version"></a>
  <br>
  <br>
  <img src="https://img.shields.io/npm/dm/cjet.svg" alt="download-num">
  <img src="https://img.shields.io/badge/node-%3E=8.10.0-brightgreen.svg" alt="node">
  <img src="https://img.shields.io/npm/l/cjet.svg" alt="license">
  <img src="https://img.shields.io/badge/platform-MacOS%7CLinux%7CWindows-lightgrey.svg" alt="platform">
  <br>
</p>

- [cjet 前端工程构建工具](#cjet-%e5%89%8d%e7%ab%af%e5%b7%a5%e7%a8%8b%e6%9e%84%e5%bb%ba%e5%b7%a5%e5%85%b7)
  - [特性](#%e7%89%b9%e6%80%a7)
  - [快速开始](#%e5%bf%ab%e9%80%9f%e5%bc%80%e5%a7%8b)
        - [1、确保你的项目为以下结构](#1%e7%a1%ae%e4%bf%9d%e4%bd%a0%e7%9a%84%e9%a1%b9%e7%9b%ae%e4%b8%ba%e4%bb%a5%e4%b8%8b%e7%bb%93%e6%9e%84)
        - [2、在项目中安装 `cjet`](#2%e5%9c%a8%e9%a1%b9%e7%9b%ae%e4%b8%ad%e5%ae%89%e8%a3%85-cjet)
        - [3、添加 script 配置](#3%e6%b7%bb%e5%8a%a0-script-%e9%85%8d%e7%bd%ae)
  - [执行命令](#%e6%89%a7%e8%a1%8c%e5%91%bd%e4%bb%a4)
  - [构建多页应用](#%e6%9e%84%e5%bb%ba%e5%a4%9a%e9%a1%b5%e5%ba%94%e7%94%a8)
  - [`cjet` 配置文件](#cjet-%e9%85%8d%e7%bd%ae%e6%96%87%e4%bb%b6)
  - [支持的浏览器和特性](#%e6%94%af%e6%8c%81%e7%9a%84%e6%b5%8f%e8%a7%88%e5%99%a8%e5%92%8c%e7%89%b9%e6%80%a7)
      - [browserslist](#browserslist)
  - [开发环境](#%e5%bc%80%e5%8f%91%e7%8e%af%e5%a2%83)
  - [样式开发](#%e6%a0%b7%e5%bc%8f%e5%bc%80%e5%8f%91)
  - [使用图片，字体和文件](#%e4%bd%bf%e7%94%a8%e5%9b%be%e7%89%87%e5%ad%97%e4%bd%93%e5%92%8c%e6%96%87%e4%bb%b6)
  - [使用 SVG 图标/图像](#%e4%bd%bf%e7%94%a8-svg-%e5%9b%be%e6%a0%87%e5%9b%be%e5%83%8f)
        - [开始使用](#%e5%bc%80%e5%a7%8b%e4%bd%bf%e7%94%a8)
  - [代码拆分（Code Splitting)](#%e4%bb%a3%e7%a0%81%e6%8b%86%e5%88%86code-splitting)
      - [基于路由的代码拆分](#%e5%9f%ba%e4%ba%8e%e8%b7%af%e7%94%b1%e7%9a%84%e4%bb%a3%e7%a0%81%e6%8b%86%e5%88%86)
  - [preload 和 prefetch](#preload-%e5%92%8c-prefetch)
  - [使用 public 文件夹](#%e4%bd%bf%e7%94%a8-public-%e6%96%87%e4%bb%b6%e5%a4%b9)
  - [使用 PWA（开发渐进式 WEB 应用程序）](#%e4%bd%bf%e7%94%a8-pwa%e5%bc%80%e5%8f%91%e6%b8%90%e8%bf%9b%e5%bc%8f-web-%e5%ba%94%e7%94%a8%e7%a8%8b%e5%ba%8f)
  - [Webpack 配置](#webpack-%e9%85%8d%e7%bd%ae)
  - [PostCSS 配置](#postcss-%e9%85%8d%e7%bd%ae)
  - [Babel 配置](#babel-%e9%85%8d%e7%bd%ae)
  - [ESlint 配置](#eslint-%e9%85%8d%e7%bd%ae)
  - [使用 TypeScript](#%e4%bd%bf%e7%94%a8-typescript)
  - [使用环境变量](#%e4%bd%bf%e7%94%a8%e7%8e%af%e5%a2%83%e5%8f%98%e9%87%8f)
  - [待续...](#%e5%be%85%e7%bb%ad)
  - [License](#license)

# cjet 前端工程构建工具

`cjet` 致力于使用 React 技术栈以系统性、组件化、标准化的过程方法开发和维护企业级应用软件。确保前端开发人员能够快速在 React 生态中将各种基础工具以零配置的方式与企业级业务需求的开发平稳衔接，让研发人员更专注于开发业务逻辑上，同时提供灵活的配置，以适合不同类型和规模的企业级应用。

## 特性

- [ ] 开发环境默认允许跨域,方便与乾坤微前端集成时测试
- [ ] todo
- [ ] todo
- [ ] todo
- [ ] todo
- [ ] todo

## 快速开始

##### 1、确保你的项目为以下结构

```bash
project
├── package.json
└── src
    ├── index.html
    └── index.js
```

对于要构建的项目，这些文件必须以确切的文件名存在：

- `src/index.html` 是 index 页面的模版
- `src/index.js` 是 index 页面的 javascript 入口

##### 2、在项目中安装 `cjet`

```bash
yarn add cjet-cli -D # 或者 npm install cjet-cli --save-dev
```

##### 3、添加 script 配置

- package.json 配置

```json
{
  "scripts": {
    "dev": "cjet dev",
    "build": "cjet build"
  }
}
```

## 执行命令

```bash
yarn dev #或者 npm run dev
```

在本地构建 Node 开发服务器，脱离 nginx、apache 等后台服务的依赖，实时编译前端的各种资源，并且在开发过程中任何文件的更改，都会自动更新浏览器，实时查看修改效果。你还将在控制台中看到任何 lint 错误。

```bash
yarn build #或者 npm run build
```

将生产应用程序构建到 dist 文件夹。它能将 React 代码智能地打包为生产模式中并优化构建以获得最佳性能。构建文件将被压缩，文件名中将包含哈希。

## 构建多页应用

`cjet` 支持构建多页面应用。如果你开发的项目是多页应用，请在`src/pages`以目录名存放每个页面内容。

```bash
project
├── package.json
└── src
    ├── pages
    │   ├── demo1
    │   │   ├── index.html
    │   │   └── index.js
    │   └── demo2
    │       ├── index.html
    │       └── index.js
    ├── index.html
    └── index.js
```

## `cjet` 配置文件

在项目根目录新建`cjet.config.js`

```js
module.exports = {
  html: {
    /**
     * 启用 preload
     * 构建项目自动加入preload方案
     */
    preload: true,
    /**
     * 启用 prefetch
     * 构建项目自动加入prefetch方案
     */
    prefetch: true,
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
    appSrc: 'src', //源码目录，非src目录中的代码不做编译
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
```

## 支持的浏览器和特性

默认情况下，使用 `cjet` 构建的项目支持所有现代浏览器。 如果你的项目想支持 Internet Explorer 9 , 10 和 11 ， 请自行引入[polyfills](https://github.com/facebook/create-react-app/blob/master/packages/react-app-polyfill/README.md)。

`cjet` 支持最新 JavaScript 标准的超集。 除了 ES6 语法功能外，它还支持：

- 指数运算符 (ES2016).
- Async/await (ES2017).
- Object Rest(剩余)/Spread(展开) 属性 (ES2018).
- 动态 import() (stage 3 proposal)
- Class 字段和静态属性 (part of stage 3 proposal).
- JSX, Flow 和 TypeScript.

#### browserslist

在 `cjet` 构建的项目根目录 package.json 文件里的 browserslist 字段 (或一个单独的 .browserslistrc 文件)，指定了项目的目标浏览器的范围。这个值会被 `cjet` 工程工具来确定需要转译的 JavaScript 特性和需要添加的 CSS 浏览器前缀。具体配置可参考：[https://github.com/browserslist/browserslist](https://github.com/browserslist/browserslist);

## 开发环境

- **开发编辑器**

建议安装使用[Visual Studio Code](https://code.visualstudio.com/)编辑器，并安装[Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)和[editorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) 代码风格及格式化、以及对应的文件代码高亮等插件。

- **编码规范**

`cjet` 默认已集成 eslint 在开发过程中进行代码风格和质量检查，默认使用 React 官方的[eslint-config-react-app](https://github.com/facebook/create-react-app/blob/master/packages/eslint-config-react-app/index.js)代码风格库，你也可以通过 `eslintrc` 手动配置自己团队的代码规范，或者扩展更多第三方的代码规范，如：[eslint-config-airbnb](https://github.com/airbnb/javascript);

- **热重载和实时检测代码错误**

编辑保存文件，页面将重新加载。还将在控制台中看到任何 lint 错误。

```bash
Compiled successfully!
+-------------------------------------------------------+
|                                                       |
|   欢迎使用cjet前端React工程构建工具                   |
|                                                       |
|   You can now view chanjet-mobile in the browser.     |
|                                                       |
|     - Local:    http://localhost:8080/                |
|     - Network:  http://10.1.145.16:8080/              |
|                                                       |
|   Note that the development build is not optimized.   |
|   To create a production build, use yarn build.       |
|                                                       |
|   More info see:https://github.com/chanjet-fe/cjet    |
|                                                       |
+-------------------------------------------------------+
```

- **使用 Proxy 代理 API 请求**

对于开发前后端分离的项目，常常需要访问 api 服务器，请在 `package.json` 中添加 proxy 字段

```json
 "proxy": "http://xxx.xxx.xxx.xxx:3000",
```

开发中使用 `fetch('/api/todos')` 时，开发服务器将识别出它不是静态资源，并将你的请求代理到`http://xxx.xxx.xxx.xxx:3000/api/todos`。开发服务器将 仅仅 尝试将 `Accept` 头中没有 `text/html` 的请求发送到代理。可以避免开发环境中的 [CORS(跨域)](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS) issues 和错误消息，使用 `cjet` 的 `proxy` 选项支持 HTTP ，HTTPS 和 WebSocket 连接。

如果 `package.json` 文件中的 `proxy` 选项对你来说 不够 灵活，你可以直接访问 Express 应用程序实例，并连接你自己的代理中间件。

你可以将此功能与 `package.json` 中的 `proxy` 属性结合使用，但建议你将所有逻辑合并到 `src/setupProxy.js` 中。

首先，使用 npm 或 Yarn 安装 http-proxy-middleware ：

```bash
npm install http-proxy-middleware --save
# 或
yarn add http-proxy-middleware
```

创建 `src/setupProxy.js` 并将以下内容放入该文件中：

```js
//更多配置请参考：https://github.com/chimurai/http-proxy-middleware

const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(createProxyMiddleware('/api', {target: 'http://localhost:5000/'}));
};
```

**使用 HTTPS**

开发过程中可能需要开发服务器通过 HTTPS 提供页面。 当 `API` 服务器本身为 `HTTPS` 服务时，使用 `proxy`（代理）功能 将请求代理到 `API` 服务器，请将 `HTTPS` 环境变量设置为 `true` ，然后像往常一样使用 `yarn dev` 启动开发服务器：

```bash
# Windows (cmd.exe)
set HTTPS=true&&npm start

# Windows (Powershell)
($env:HTTPS = "true") -and (npm start)

# Linux, macOS (Bash)
HTTPS=true npm start

```

服务器将使用自签名证书，所以 Web 浏览器在访问页面时基本上会显示警告。

## 样式开发

- **使用 CSS**

`cjet` 工程使用 Webpack 处理样式资源，要表明 JavaScript 文件依赖于某个 CSS 文件，你需要 在 JavaScript 文件中导入 CSS

**Button.css**

```css
.Button {
  padding: 20px;
}
```

**Button.js**

```js
import React, {Component} from 'react';
import './Button.css'; // 告诉 Webpack Button.js 使用这些样式

class Button extends Component {
  render() {
    // 你可以将它们用作常规 CSS 样式
    return <div className="Button" />;
  }
}
```

但是这样开发容易造成变量命名的冲突，尤其多人合作开发复杂项目，将会尤为严重。

- **使用 CSSModule**

`cjet` 工程工具支持 `[name].module.css` 文件命名约定支持 [CSS Modules](https://github.com/css-modules/css-modules) 和常规 CSS 。 CSS Modules 允许通过自动创建 `[filename]\_[classname]\_\_[hash]` 格式的唯一 classname 来确定 CSS 的作用域。CSS Modules 允许你在不同的文件中使用相同的 CSS classname，而无需担心命名冲突。 你可以[了解有关 CSS Modules 的更多信息](https://css-tricks.com/css-modules-part-1-need/)。

**Button.module.css**

```css
.error {
  background-color: red;
}
```

**another-stylesheet.css**

```css
.error {
  color: red;
}
```

**Button.js**

```js
import React, {Component} from 'react';
import styles from './Button.module.css'; // 将 css modules 文件导入为 styles
import './another-stylesheet.css'; // 导入常规 CSS 文件

class Button extends Component {
  render() {
    // 作为 js 对象引用
    return <button className={styles.error}>Error Button</button>;
  }
}
```

最终编译结果不会和其他 `.error` 类名冲突

```html
<!-- This button has red background but not red text -->
<button class="Button_error_ax7yz"></div>
```

- **使用样式预处理器**

根据业内组件化开发的一些实践（分治而非复用），React 官方也建议不要在不同的组件中重用相同的 CSS 类。 例如，不要在 `<AcceptButton>` 和 `<RejectButton>` 组件中使用同一个 `.Button` CSS 类，而是使用自己的 `.Button` 样式创建一个 `<Button>` 组件，`<AcceptButton>` 和`<RejectButton>`都可以渲染（但 不是继承）。

遵循这个规则通常会使 CSS 预处理器变得不那么有用，因为 mixins 和嵌套等功能会被组件组合所取代。 但是，如果觉得 CSS 预处理程序有价值，在 cjet 工程工具中也可以集成。

cjet 天生支持包含 Sass、Less、Stylus 在内的预处理器。让编写样式具备强大的编程能力，只需要在项目中安装对应的依赖包，而无需做任何设置。

```bash
# 安装 less
yarn add less-loader less #或者 npm install less-loader less

# 安装 sass
yarn add sass-loader node-sass #或者 npm install sass-loader node-sass

# 安装 stylus
yarn add stylus-loader stylus #或者 npm install stylus-loader stylus
```

**向预处理器 Loader 传递选项**

有的时候你想要向 cjet 工程的 webpack 的预处理器 loader 传递选项。

```js
//cjet.config.js

module.exports = {
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
  },
};
```

## 使用图片，字体和文件

在 cjet 的工程项目中，使用图片和字体等静态资源的工作方式与 CSS 类似。直接在 JavaScript 模块中 import 文件。通过 cjet 编译后将该文件包含在 bundle(包) 中。 与 CSS 导入不同，导入文件会为你提供字符串值。 此值是你可以在代码中引用的最终路径，例如 image 的 src 属性或链接到 PDF 的 href 属性。

要减少对服务器的请求数，导入小于 10,000 字节的图片将返回 data URI 而不是路径。 这适用于以下文件扩展名：`bmp` ，`gif` ，`jpg` ，`jpeg` 和 `png` 。

```js
import React from 'react';
import logo from './logo.png'; // 告诉 cjet工程 这个 JS 文件使用了这个图片

console.log(logo); // /logo.84287d09.png

function Header() {
  // 导入结果是图片的 URL
  return <img src={logo} alt="Logo" />;
}

export default Header;
```

这确保了在构建项目时，Webpack 可以正确地将该图片移动到构建文件夹中，并为我们提供正确的路径。

这也适用于 CSS ：

```css
.Logo {
  background-image: url(./logo.png);
}
```

Webpack 在 CSS 中找到所有相关模块引用（它们以 `./` 开头），并用编译后的 bundle(包) 中的最终路径替换它们。如果输入拼写错误或意外删除重要文件，你将看到编译错误信息，就像导入不存在的 JavaScript 模块一样。编译包中的最终文件名由 Webpack 从内容哈希生成。如果文件内容将来发生变化，Webpack 将在生产中为其指定一个不同的名称，因此你无需担心这些静态资源的长期缓存。

## 使用 SVG 图标/图像

在 cjet 工程项目中使用`Svg Symbol`方式在项目中使用 SVG，这是一种全新的使用方式，是未来的主流，也是业界目前推荐的用法。Symbol 具有如下特点：

- 支持多色图标，不再受单色限制。
- 通过一些技巧，支持像字体那样，通过 font-size,color 来调整样式。
- 支持 ie9+,及现代浏览器。

##### 开始使用

1、创建`src/icons/`作为项目图标存放目录（可配置）

此目录下的所有`.svg`文件都会经过 cjet 的自动编译为 symbol 方式，为便于 svg 图标管理，可创建 svg 子目录。将设计师导出的所有 svg 文件存放在`src/icons/svg/`目录下。

在`src/icons`目录下创建`index.js`文件，用于自动导入`src/icons/svg`目录下所有 svg 图标。

```js
const requireAll = requireContext => requireContext.keys().map(requireContext);
const svgs = require.context('./svg', false, /\.svg$/);
requireAll(svgs);
```

目录结构：

```bash
src
└── icons
    ├── index.js
    └── svg
        ├── antd-mobile.svg
        ├── logo.svg
        └── theme.svg
```

2、在项目入口引入`src/icons/index.js`用于导入所有 svg 图标，也可以按需导入单个或多个图标。

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import App from './App';
import './icons'; //导入所有svg图标
//import './icons/svg/logo.svg' //按需导入单个图标

ReactDOM.render(<App />, document.getElementById('root'));
```

3、在组件中使用 svg

```js
import React, {Component} from 'react';
import styles from './App.module.less';

class App extends Component {
  render() {
    return (
      <div className={styles['App']}>
        <svg aria-hidden="true" className={styles['App-logo']}>
          <use xlinkHref="#icon-logo"></use>
        </svg>
      </div>
    );
  }
}

export default App;
```

你可以在`cjet.config.js`配置默认前缀

```js
//cjet.config.js
module.exports = {
  /**
   * SVG symbol图标方案配置
   * 配置参考：https://github.com/kisenka/svg-sprite-loader#configuration
   */
  svgSprite: {
    options: {
      symbolId: 'icon-[name]', //symbolId和use使用的名称
    },
  },
};
```

你可以在`cjet.config.js`配置 svg 图标存放目录，目录下所有 `.svg` 将为编译为 `SVG symbol` 方式

```js
//cjet.config.js
module.exports = {
  paths: {
    /**
     * svg 图标存放目录 此目录下所有 .svg 将为编译为SVG symbol
     * 如果设置为空，项目中所有.svg都将被编译
     */
    svgIconPath: 'src/icons', //svg 图标存放目录
  },
};
```

配置多个 svg 图标存放目录及要忽略编译的目录：

```js
//cjet.config.js
module.exports = {
  paths: {
    /**
     * v2.7.5以后版本支持配置多个目录，并且可以配置忽略路径
     */
    svgIconPath: {
      include: ['src/icons1', 'src/icons2', 'src/icons3'],
      exclude: [],
    },
  },
};
```

**封装 svgIcon 组件**

1、创建`src/components/svgIcon/index.jsx`文件。

```js
import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.css'; //已启用 CSS Modules

const SvgIcon = props => {
  const {iconName, fill, className} = props;

  return (
    <svg aria-hidden="true" className={className}>
      <use xlinkHref={'#icon-' + iconName} fill={fill} />
    </svg>
  );
};

SvgIcon.propTypes = {
  // svg名字
  iconName: PropTypes.string.isRequired,
  // 填充颜色
  fill: PropTypes.string,
};

SvgIcon.defaultProps = {
  fill: 'currentColor',
  className: styles['svg-class'],
};

export default SvgIcon;
```

2、创建`src/components/svgIcon/style.module.css`文件，用于更好的控制图标的自适应。

```css
.svg-class {
  display: inline-block;
  overflow: hidden;
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
}
```

3、在组件中使用 svgIcon

```js
import React, {Component} from 'react';
import styles from './App.module.less';
import SvgIcon from './components/svgIcon'; //引入svgIcon组件

class App extends Component {
  render() {
    return (
      <div className={styles['App']}>
        <div className={styles['App-header']}>
          <svg aria-hidden="true" className={styles['App-logo']}>
            <use xlinkHref="#icon-logo"></use>
          </svg>
        </div>
        <p>
          <SvgIcon iconName="antd-mobile" /> 基于antd mobile基础组件库
        </p>
        <p className={styles['theme-icon']}>
          <SvgIcon iconName="theme" fill="#ff0000" /> 支持antd mobile组件主题定制
        </p>
      </div>
    );
  }
}

export default App;
```

## 代码拆分（Code Splitting)

随着应用需求的增长，包文件也会随之增大，特别是开发大型应用程序，这将影响用户访问的加载性能。cjet 支持代码分割，即允许你将代码分割成小块，然后按需加载。

cjet 支持通过 [动态 import()](https://2ality.com/2017/01/import-operator.html#loading-code-on-demand) 进行代码拆分。 它是在[第 3 阶段的 提案](https://github.com/tc39/proposal-dynamic-import) 。 import() 函数表单接受模块名作为参数，并[返回一个 Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) ，该 Promise 总是 resolves 到模块的命名空间对象。

**moduleDemo.js**

```js
const moduleDemo = 'Hello';

export {moduleDemo};
```

**app.js**

```js
import React, {Component} from 'react';

class App extends Component {
  handleClick = () => {
    import('./moduleDemo')
      .then(({moduleDemo}) => {
        // Use moduleDemo
      })
      .catch(err => {
        // Handle failure
      });
  };

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Load</button>
      </div>
    );
  }
}

export default App;
```

这将使 `moduleDemo.js` 及其所有唯一依赖项成为一个单独的块，仅在用户单击 `Load` 按钮后加载。代码中也可以使用 `async / await` 语法。

#### 基于路由的代码拆分

如果你在项目中使用的是 React Router，请参考：[https://serverless-stack.com/chapters/code-splitting-in-create-react-app.html](https://serverless-stack.com/chapters/code-splitting-in-create-react-app.html)了解代码拆分，或是 React 官方文档：[代码拆分(Code-Splitting)](http://react.html.cn/docs/code-splitting.html)。也可以使用[react-loadable](https://github.com/jamiebuilds/react-loadable)或[loadable-components](https://github.com/gregberge/loadable-components)。

## preload 和 prefetch

**Preload**

浏览器会在遇到含有 preload 的 link 标签时，立刻开始下载 main.js(不阻塞 parser)，并放在内存中，但不会执行其中的 JS 语句。Preload 指明哪些资源是在页面加载完成后即刻需要的。对于这种即刻需要的资源，可能希望在页面加载的生命周期的早期阶段就开始获取，在浏览器的主渲染机制介入前就进行预加载。这一机制使得资源可以更早的得到加载并可用，且更不易阻塞页面的初步渲染，进而提升性能。

```html
<link rel="preload" href="/main.js" as="script" />
```

- 下载但不执行
- 异步加载，不影响当前页面的渲染
- 提前加载资源，在真正使用时，直接从从缓存中读取。

**Prefetch**

浏览器会在空闲的时候，下载 main.js, 并缓存到 disk。当有页面使用的时候，直接从 disk 缓存中读取。

```html
<link href="main.js" rel="prefetch" />
```

- 首次渲染时不需要，之后可能需要。
- 在浏览器空闲时才会下载。

`cjet` 默认已在工程构建时自动加入 preload 和 prefetch 代码。如果某些场景不需要此功能可以通过`cjet.config.js`关闭。

```js
//cjet.config.js

module.exports = {
  html: {
    /**
     * 启用 preload
     * 构建项目自动加入preload方案
     */
    preload: true,
    /**
     * 启用 prefetch
     * 构建项目自动加入prefetch方案
     */
    prefetch: true,
  },
};
```

**cjet 工程增加 preload 和 prefetch 的机制**

- initial 即初始化需要的模块添加到 preload
- asyncChunks 即通过`import()`（Code Splitting）动态导入的模块添加到 prefetch

## 使用 public 文件夹

任何放置在 `public` 文件夹的静态资源都会被简单的复制，而不经过任何编译。要引用 public 文件夹中的资源，需要使用名为 `PUBLIC_URL` 的特殊变量。

**html 模板中使用**

```html
<link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" />
```

**JavaScript 代码中使用**

```js
render() {
  // 注意：这是一个逃生舱（escape hatch），应该谨慎使用！
  // 通常我们建议使用`import`来获取资源的 URL
  // 如我们上一节 “添加图片和字体”中所述。
  return <img src={process.env.PUBLIC_URL + '/img/logo.png'} />;
}
```

cjet 推荐将资源作为模块依赖图的一部分导入，这样它们会通过工程编译的处理并获得如下好处：

- 脚本和样式表会被压缩且打包在一起，从而避免额外的网络请求。
- 文件丢失会直接在编译时报错，而不是到了用户端才产生 404 错误。
- 最终生成的文件名包含了内容哈希，因此你不必担心浏览器会缓存它们的老版本。

**何时使用 public**

- 你需要在构建输出中具有特定名称的文件，例如 manifest.webmanifest 。
- 你有数千张图片，需要动态引用它们的路径。
- 你希望在打包代码之外包含一个像 pace.js 这样的小脚本。
- 某些库可能与 Webpack 不兼容，你没有其他选择，只能将其包含为 `<script>` 标记。

## 使用 PWA（开发渐进式 WEB 应用程序）

`cjet`已集成业内开发一流的 [Progressive Web App](https://web.dev/progressive-web-apps/) 的最佳实践，项目中包含一个`src/serviceWroker.js`文件，用于开发渐进式应用程序，在应用程序入口脚本（`src/index.tsx`）默认状态是未注册，如果要使用 PWA，需要在应用入口将 `serviceWorker.unregister()` 更改为 `serviceWorker.register()`。

随着业内 PWA 相关的技术不断升级优化，在用户体验和用户留存两方面都提供了非常好的解决方案。PWA 可以将 Web 和 App 各自的优势融合在一起：渐进式、可响应、可离线、实现类似 App 的交互、即时更新、安全、可以被搜索引擎检索、可推送、可安装、可链接。其主要特点：

- 可靠 - 即使在网络不稳定甚至断网的环境下，也能瞬间加载并展现
- 用户体验 - 快速响应，具有平滑的过渡动画及用户操作的反馈
- 用户黏性 - 和 Native App 一样，可以被添加到桌面，能接受离线通知，具有沉浸式的用户体验

本项目使用 cjet 作为工程构建工具，工程框架已集成[workbox-webpack-plugin](https://github.com/GoogleChrome/workbox)，它将负责生成 service worker 文件，该文件将自动预先缓存所有本地资源，并在部署更新时使其保持最新。 service worker 将使用 缓存优先策略 来处理对本地资源的所有请求，包括 HTML 的 导航请求，确保你的 Web 应用程序始终保持快速，即使在缓慢或不可靠的网络上也是如此。

可以通过`cjet.config.js`文件对`workbox-webpack-plugin`进行更多高级配置：

```js
//cjet.config.js

module.exports = {
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
};
```

**开发渐进式应用程序（PWA）的注意事项**

开发渐进式 WEB 应用程序使调试部署更具挑战性，如果决定选择加入 service worker 注册，需考虑以下因素：

- 初始缓存完成后，[service worker 生命周期](https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle) 控制何时更新的内容最终显示给用户。默认行为是保守地使更新的 service worker 保持 ["waiting"](https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle#waiting) 状态。这意味着用户最终会看到旧内容，直到他们关闭（重新加载）现有的打开标签。
- 用户并不总是熟悉离线优先 Web 应用程序。[让用户知道 service worker 何时完成填充缓存](https://developers.google.com/web/fundamentals/instant-and-offline/offline-ux)（显示 "This web app works offline!（此 Web 应用程序脱机工作！）"消息），并让他们知道 service worker 何时获取可用的最新更新可能很有用。
- service worker [需要 HTTPS](https://developers.google.com/web/fundamentals/primers/service-workers#you_need_https)，但为了便于本地测试，该策略[不适用于 localhost](https://stackoverflow.com/questions/34160509/options-for-testing-service-workers-via-http/34161385#34161385) 。如果你的生产 Web 服务器不支持 HTTPS ，则服务工作者注册将失败，但你的 Web 应用程序的其余部分仍将保持正常运行。
- service worker 仅在 生产环境 中启用，建议你不要在开发环境中启用离线优先 service worker 程序，因为它可能会导致使用以前缓存的资源时无效，并且不包括你在本地进行的最新更改。
- 如果 需要 在本地测试离线优先 service worker ，请构建应用程序（使用 `yarn build` ）并从构建目录运行简单的 http 服务器。
- 默认情况下，生成的 service worker 文件不会拦截或缓存任何跨源资源，如 HTTP API 请求，图片或从其他域名加载的嵌入。

**渐进式 Web 应用程序元 Metadata**

默认配置包含的 Web 应用程序 manifest 位于 `public/manifest.json` ，你可以使用特定于 Web 应用程序的详细信息进行自定义。

当用户在 Android 上使用 Chrome 或 Firefox 将网络应用添加到其主屏幕时，`manifest.json` 中的元数据可以设置显示网络应用时需要使用的图标，名称和品牌颜色（branding colors）。 [Web App Manifest](https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/) 指南 提供了有关每个字段的含义以及你的自定义将如何影响用户体验的更多信息。

已添加到主屏幕的渐进式 Web 应用程序将加载更快，并在激活 service worker 时脱机工作。话虽如此，无论你是否选择性加入 service worker 注册，Web 应用程序清单中的元数据仍将被使用。

## Webpack 配置

cjet 工程使用 webpack 作为模块打包工具，根据众多业务场景，融合了业内开发 React 项目的大量最佳实践配置，让你在开发企业级项目中享受零配置的工程体验，也依然支持高度灵活的可配置性，在根目录新建`webpack.config.js`，并输出一个配置对象：

```js
//webpack.config.js

const path = require('path');
module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  //扩展更多 loader
  module: {
    rules: [{test: /\.handlebars$/, loader: 'handlebars-loader'}],
  },
  //扩展更多plugins
  plugins: [new I18nPlugin(languageConfig, optionsObj)],
};
```

该对象将会被 [webpack-merge](https://github.com/survivejs/webpack-merge) 合并入最终的 webpack 配置。

有些 webpack 选项是基于工程实践设置的，并被用在配置里的多个地方，以确保所有的部分都能正常工作在一起。在你扩展更多配置之前，建议先参考[cjet 工程内部已有配置](https://github.com/chanjet-fe/cjet/blob/master/config/webpack.config.js)。

## PostCSS 配置

cjet 内部使用了 PostCSS，并预设了以下配置。

```js
{
  plugins: {
    "postcss-flexbugs-fixes": {},
    "postcss-preset-env": {
      autoprefixer: {
        flexbox: "no-2009"
      },
      stage: 3
    },
    "postcss-normalize": {}
  }
}
```

cjet 支持 PostCSS 的灵活配置，只需在项目根目录新建`postcss.config.js`，并导出一个配置对象，改对象将被合并为最终的 PostCSS 配置。例如要扩展 viewport(vw、vh)适配方案：

```js
//postcss.config.js

module.exports = {
  plugins: {
    'postcss-aspect-ratio-mini': {},
    // to edit target browsers: use "browserslist" field in package.json
    'postcss-write-svg': {
      uft8: false,
    },
    'postcss-px-to-viewport': {
      viewportWidth: 750, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
      viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
      unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
      selectorBlackList: ['.ignore', '.hairlines'], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
      minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
      mediaQuery: false, // 允许在媒体查询中转换`px`
    },
    'postcss-viewport-units': {},
    cssnano: {
      preset: 'advanced',
      autoprefixer: false, // 和cssnext同样具有autoprefixer，保留一个
      'postcss-zindex': false,
    },
  },
};
```

cjet 默认开启了 autoprefixer。你可以根据 [Browserslist](https://github.com/browserslist/browserslist#readme) 规范 调整 package.json 中的 browserslist 来自定义目标支持浏览器。

例如：

```css
.App {
  display: flex;
  flex-direction: row;
  align-items: center;
}
```

将被编译成：

```css
.App {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
```

默认情况下 禁用了 [CSS Grid(网格)](https://www.html.cn/archives/8510) 布局 前缀，但不会删除手动前缀。 如果你想选择加入 CSS Grid(网格) 前缀，请先 [熟悉一下它的局限性](https://github.com/postcss/autoprefixer#does-autoprefixer-polyfill-grid-layout-for-ie)。
要启用 CSS Grid(网格) 前缀，请将 `/* autoprefixer grid: on */` 添加到 CSS 文件的顶部。

## Babel 配置

cjet 支持在项目根目录新建`babel.config.js`，扩展更多 babel 配置。

```js
//babel.config.js

module.exports = {
  plugins: [
    ['import', {libraryName: 'antd-mobile', style: true}], // `style: true` 会加载 less 文件
  ],
};
```

## ESlint 配置

cjet 支持在项目根目录`cjet.config.js`文件中配置 ESlint 工程配置项，默认使用了[eslint-config-react-app](https://github.com/facebook/create-react-app/blob/master/packages/eslint-config-react-app/index.js)配置规则，也可以灵活配置、扩展其它规则，支持[ESlint 官方配置文件](https://eslint.org/docs/user-guide/configuring#configuration-file-formats)。

```js
//cjet.config.js

module.exports = {
  /**
   * eslint 配置
   */
  eslint: {
    available: true, //开启eslint
    cache: true, //启用配置缓存，如果新配置不起作用请先设置为false
    useEslintrc: false, //使用项目中eslintrc配置
    extends: [], //默认使用的eslint规则
  },
};
```

## 使用 TypeScript

TypeScript 是 JavaScript 的类型超集，可编译为纯 JavaScript 。

首先安装依赖：

```bash
yarn add typescript @types/node @types/react @types/react-dom
# 或者
npm install typescript @types/node @types/react @types/react-dom
```

接下来，无需任何配置，只需将任何文件重命名为 TypeScript 文件（例如 src/index.js 重命名为 src/index.tsx ）并 重新启动开发服务器，cjet 自动生成 `tsconfig.json` 文件，可以编辑生成的 TypeScript 配置。

```json
//tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react"
  },
  "include": ["src"]
}
```

根据业内开发 React 项目的最佳实践，某些配置会被 cjet 内部默认配置覆盖，如果不想覆盖`tsconfig.json`某些项目，可在项目根目录`cjet.config.js`中关闭配置。

```js
//cjet.config.js

module.exports = {
  /**
   * typescript配置
   */
  tsconfig: {
    rewrite: true, //是否使用框架内部最佳实践覆盖项目中的tsconfig.json
  },
};
```

> 注意： 默认配置不支持常量枚举和命名空间。

## 使用环境变量

使用`cjet`构建的项目，可以使用在环境中声明的变量，就好像它们是在 JS 文件中本地声明的变量一样。

环境变量在构建期间嵌入。由于 `cjet` 生成静态的 HTML / CSS / JS 包，因此无法在 runtime(运行时) 读取它们。要在运行时读取它们，需要将 HTML 加载到服务器上的内存中，并在运行时替换占位符。

> 注意：必须以 `REACT_APP` 开头创建自定义环境变量。除了 `NODE_ENV` 之外的任何其他变量都将被忽略，以避免意外地在可能具有相同名称的计算机上公开私钥。更改任何环境变量都需要重新启动正在运行的开发服务器

将在 `process.env` 上为你定义这些环境变量。例如，名为 `REACT_APP_ENVDEMO_CODE` 的环境变量将在你的 JS 中公开为 `process.env.REACT_APP_ENVDEMO_CODE` 。

还有一个名为 NODE_ENV 的特殊内置环境变量。可以从 `process.env.NODE_ENV` 中读取。当你运行 `yarn dev` 时，它总是等于 `development` ，当你运行 `yarn build` 来生成一个生产 bundle(包) 时，它总是等于 `production` 。无法手动覆盖`NODE_ENV`。 这可以防止开发人员意外地将慢速开发构建部署到生产环境中。

**在 HTML 中引用环境变量**

`cjet` 支持在 `index.html` 中以 `REACT_APP` 开头访问环境变量:

```html
<title>%REACT_APP_WEBSITE_NAME%</title>
```

请注意：

- 除了一些内置变量（ `NODE_ENV` 和 `PUBLIC_URL`）之外，变量名必须以 `REACT_APP_` 开头才能工作。
- 环境变量在构建时注入。 如果需要在运行时注入它们，请改为使用此方法

**在 Shell 中使用临时环境变量**

```bash
# Windows (cmd.exe) 注意：变量赋值需要用引号包裹，以避免尾随空格。）
set "REACT_APP_ENVDEMO_CODE=abcdef" && yarn dev

# Windows (Powershell)
($env:REACT_APP_ENVDEMO_CODE = "abcdef") -and (yarn dev)

# Linux, macOS (Bash)
REACT_APP_ENVDEMO_CODE=abcdef yarn dev
```

**在 .env 中使用环境变量**

使用`cjet`构建的项目，支持使用`.env`文件设置、管理项目中的环境变量，在项目根目录新建`.env`文件：

```env
REACT_APP_ENVDEMO_CODE=abcdef
```

- `.env`：默认。
- `.env.local`：本地覆盖。研发和生产环境都加载此文件。
- `.env.development`, `.env.production`：设置特定环境。
- `.env.development.local`, `.env.production.local`：设置特定环境的本地覆盖。

左侧的文件比右侧的文件具有更高的优先级：

- `yarn dev`: `.env.development.local`, `.env.development`, `.env.local`, `.env`
- `yarn build`: `.env.production.local`, `.env.production`, `.env.local`, `.env`

**`cjet`已预置的环境变量**

你可以通过在 shell 中设置环境变量或使用 `.env` 来调整各种开发和生产设置。

| 变量                     | Development | Production | 用法                                                                                                                                                                                                                                                                                                                                                 |
| ------------------------ | ----------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BROWSER                  | ✅ 支持      | 🚫 不支持   | 默认情况下，`cjet` 将打开默认系统浏览器，支持 macOS 上的 Chrome 。 指定 browser 以覆盖此行为，或将其设置为 none 以完全禁用它。 如果需要自定义启动浏览器的方式，则可以指定一个 node 脚本。 传递给 `yarn dev` 的任何参数也将传递给此脚本，并且提供应用程序的 url 将是最后一个参数。 你的脚本的文件名必须以 .js 为扩展名。                              |
| **HOST**                 | ✅ 支持      | 🚫 不支持   | 默认情况下，开发 Web 服务器绑定到 localhost 。你可以使用此变量指定其他主机。                                                                                                                                                                                                                                                                         |
| **PORT**                 | ✅ 支持      | 🚫 不支持   | 默认情况下，开发 Web 服务器将尝试侦听端口 8080 或提示你尝试下一个可用端口。你可以使用此变量指定其他端口。                                                                                                                                                                                                                                            |
| **HTTPS**                | ✅ 支持      | 🚫 不支持   | 设置为 true 时，`cjet` 将以 https 模式运行开发服务器。                                                                                                                                                                                                                                                                                               |
| **PUBLIC_URL**           | 🚫 不支持    | ✅ 支持     | `cjet` 假定你的应用程序托管在服务 Web 服务器的根目录或 package.json (homepage) 中指定的子路径。 通常，`cjet` 会忽略主机名。 你可以使用此变量强制资源逐字引用到你提供的 URL（`hostname`）。 当使用 CDN 托管你的应用程序时，这可能特别有用。                                                                                                           |
| CI                       | ✅ 支持      | ✅ 支持     | 设置为 true 时，`cjet` 会将警告视为构建中的失败。这也使得 测试运行 不能检测到。大多数 CI 默认设置此标志。                                                                                                                                                                                                                                            |
| REACT_EDITOR             | ✅ 支持      | 🚫 不支持   | 当应用程序在开发过程中崩溃时，你将看到带有可点击堆栈跟踪的错误覆盖。 当你单击它时，`cjet` 将尝试根据当前正在运行的进程确定你正在使用的编辑器，并打开相关的源文件。 你可以 发送拉取请求以检测你选择的编辑器。 设置此环境变量会覆盖自动检测。 如果这样做，请确保你的系统 PATH 环境变量指向编辑器的 bin 文件夹。 你也可以将其设置为 none 以完全禁用它。 |
| CHOKIDAR_USEPOLLING      | ✅ 支持      | 🚫 不支持   | 设置为 true 时，watcher 在 VM 内部根据需要以轮询模式运行。如果 `yarn dev` 未检测到更改，请使用此选项。                                                                                                                                                                                                                                               |
| GENERATE_SOURCEMAP       | 🚫 不支持    | ✅ 支持     | 设置为 false 时，不会为生产构建生成源映射。这解决了一些小型机器上的 OOM 问题。                                                                                                                                                                                                                                                                       |
| NODE_PATH                | ✅ 支持      | ✅ 支持     | 与 Node.js 中的 NODE_PATH 相同，但只允许相关文件夹。通过设置 `NODE_PATH=src`可以方便地模拟 monorepo 设置。                                                                                                                                                                                                                                           |
| **INLINE_RUNTIME_CHUNK** | 🚫 不支持    | ✅ 支持     | 默认情况下，`cjet`会在生成构建期间将运行时脚本嵌入到 index.html 中。设置为 false 时，脚本将不会嵌入，并将照常导入。在处理 CSP 时通常需要这样做。                                                                                                                                                                                                     |
| **CHANJET_MAINFEST**     | 🚫 不支持    | ✅ 支持     | 默认不启用, 如果要启用 chanjet-mainfest-chunk-plugin，在项目根目录下创建 `.env.production`， 配置 `CHANJET_MAINFEST=true`, `INLINE_RUNTIME_CHUNK=true`                                                                                                                                                                                               |

## 待续...

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2020-present, [chanjet-fe](https://github.com/chanjet-fe).
