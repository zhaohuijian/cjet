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

# CJET

CJET 致力于使用 React 技术栈以系统性、组件化、标准化的过程方法开发和维护企业级应用软件。确保前端开发人员能够快速在 React 生态中将各种基础工具以零配置的方式与企业级业务需求的开发平稳衔接，让研发人员更专注于开发业务逻辑上，同时提供灵活的配置，以适合不同类型和规模的企业级应用。

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

##### 2、在项目中安装 CJET

```bash
yarn add cjet -D # 或者 npm install cjet --save-dev
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

CJET 支持构建多页面应用。如果你开发的项目是多页应用，请在`src/pages`以目录名存放每个页面内容。

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

## cjet 配置文件

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
    prefetch: true
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
    sourceMap: false
  },

  /**
   * SVG symbol图标方案配置
   * 配置参考：https://github.com/kisenka/svg-sprite-loader#configuration
   */
  svgSprite: {
    options: {
      symbolId: "icon-[name]" //symbolId和use使用的名称
    }
  },

  /**
   * eslint 配置
   */
  eslint: {
    cache: true, //启用配置缓存，如果新配置不起作用请先设置为false
    useEslintrc: true, //使用项目中eslintrc配置
    extends: ["eslint-config-react-app"] //默认使用的eslint规则
  },

  /**
   * -------------------------------
   * 路径配置
   * -------------------------------
   */
  paths: {
    appPath: ".",
    appSrc: "src", //源码目录，非src目录中的代码不做编译
    appBuild: "dist", //生产目录
    appPublic: "public", //静态资源目录
    appIndexHtml: "src/index.html", //默认首页模板
    appIndexJs: "src/index", //默认首页脚本文件
    appPages: "src/pages", //多页面存放目录
    svgIconPath: "src/icons", //svg 图标存放目录
    proxySetup: "src/setupProxy.js", //proxy代理配置文件
    appTypeDeclarations: "src/react-app-env.d.ts" //ts环境变量配置文件
  },
  /**
   * PWA的workbox-webpack-plugin配置
   * More info see: https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin
   */
  pwa: {
    mode: "GenerateSW", // GenerateSW or InjectManifest
    options: {
      clientsClaim: true,
      exclude: [/\.map$/, /asset-manifest\.json$/],
      importWorkboxFrom: "cdn",
      navigateFallback: "/index.html",
      navigateFallbackBlacklist: [
        // Exclude URLs starting with /_, as they're likely an API call
        new RegExp("^/_"),
        // Exclude any URLs whose last part seems to be a file extension
        // as they're likely a resource and not a SPA route.
        // URLs containing a "?" character won't be blacklisted as they're likely
        // a route with query params (e.g. auth callbacks).
        new RegExp("/[^/?]+\\.[^/]+$")
      ]
    }
  },

  /**
   * typescript配置
   */
  tsconfig: {
    rewrite: true //是否使用框架内部最佳实践覆盖项目中的tsconfig.json
  }
};
```

## 支持的浏览器和特性

默认情况下，使用 CJET 构建的项目支持所有现代浏览器。 如果你的项目想支持 Internet Explorer 9 , 10 和 11 ， 请自行引入[polyfills](https://github.com/facebook/create-react-app/blob/master/packages/react-app-polyfill/README.md)。

CJET 支持最新 JavaScript 标准的超集。 除了 ES6 语法功能外，它还支持：

- 指数运算符 (ES2016).
- Async/await (ES2017).
- Object Rest(剩余)/Spread(展开) 属性 (ES2018).
- 动态 import() (stage 3 proposal)
- Class 字段和静态属性 (part of stage 3 proposal).
- JSX, Flow 和 TypeScript.

## 开发环境

- 开发编辑器

建议安装使用[Visual Studio Code](https://code.visualstudio.com/)编辑器，并安装[Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)和[editorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) 代码风格及格式化、以及对应的文件代码高亮等插件。

- 编码规范

CJET 默认已集成 eslint 进行代码风格和质量检查，默认使用 facebook 官方根据业内最佳实践整理的[eslint-config-react-app](https://github.com/facebook/create-react-app/blob/master/packages/eslint-config-react-app/index.js)代码风格库，你也可以通过`eslintrc`配置团队自己的代码规范，或者扩展更多第三方的代码规范，如：[eslint-config-airbnb](https://github.com/airbnb/javascript);

- 热重载和实时检测代码错误

编辑保存文件，页面将重新加载。还将在控制台中看到任何 lint 错误。

```bash
Compiled successfully!
+-------------------------------------------------------+
|                                                       |
|   欢迎使用CJET前端React工程构建工具                   |
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

- 使用 Proxy 代理 API 请求

对于开发前后端分离的项目，常常需要访问 api 服务器，请在 package.json 中添加 proxy 字段

```json
 "proxy": "http://xxx.xxx.xxx.xxx:3000",
```

开发中使用 `fetch('/api/todos')` 时，开发服务器将识别出它不是静态资源，并将你的请求代理到`http://xxx.xxx.xxx.xxx:3000/api/todos`。开发服务器将 仅仅 尝试将 Accept 头中没有 text/html 的请求发送到代理。可以避免开发环境中的 [CORS(跨域)](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS) issues 和错误消息，在 cjet 中 proxy 选项支持 HTTP ，HTTPS 和 WebSocket 连接。

如果 proxy 选项对你来说 不够 灵活，你可以直接访问 Express 应用程序实例，并连接你自己的代理中间件。

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

const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(proxy("/api", { target: "http://localhost:5000/" }));
};
```

## 样式开发

- 使用 CSS

cjet 低层使用 Webpack 处理样式资源，要表明 JavaScript 文件依赖于某个 CSS 文件，你需要 在 JavaScript 文件中导入 CSS

**Button.css**

```css
.Button {
  padding: 20px;
}
```

**Button.js**

```js
import React, { Component } from "react";
import "./Button.css"; // 告诉 Webpack Button.js 使用这些样式

class Button extends Component {
  render() {
    // 你可以将它们用作常规 CSS 样式
    return <div className="Button" />;
  }
}
```

但是这样开发容易造成变量命名的冲突，尤其多人合作开发复杂项目，将会尤为严重。

- 使用 CSSModule

cjet 工程工具支持 `[name].module.css` 文件命名约定支持 [CSS Modules](https://github.com/css-modules/css-modules) 和常规 CSS 。 CSS Modules 允许通过自动创建 `[filename]\_[classname]\_\_[hash]` 格式的唯一 classname 来确定 CSS 的作用域。CSS Modules 允许你在不同的文件中使用相同的 CSS classname，而无需担心命名冲突。 你可以[了解有关 CSS Modules 的更多信息](https://css-tricks.com/css-modules-part-1-need/)。

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
import React, { Component } from "react";
import styles from "./Button.module.css"; // 将 css modules 文件导入为 styles
import "./another-stylesheet.css"; // 导入常规 CSS 文件

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

- 使用样式预处理器

根据业内组件化开发的一些实践（分治而非复用），React 官方也建议不要在不同的组件中重用相同的 CSS 类。 例如，不要在 `<AcceptButton>` 和 `<RejectButton>` 组件中使用同一个 `.Button` CSS 类，而是使用自己的 `.Button` 样式创建一个 `<Button>` 组件，`<AcceptButton>` 和`<RejectButton>`都可以渲染（但 不是继承）。

遵循这个规则通常会使 CSS 预处理器变得不那么有用，因为 mixins 和嵌套等功能会被组件组合所取代。 但是，如果觉得 CSS 预处理程序有价值，在 cjet 工程工具中也可以集成。

在 cjet 工程中默认同时支持`less`、`sass`、`stylus`，让编写样式具备强大的编程能力，只需要在项目中安装对应的依赖包，而无需做任何设置。

**安装 less**

```bash
yarn add less-loader less #或者 npm install less-loader less
```

**安装 sass**

```bash
yarn add sass-loader node-sass #或者 npm install sass-loader node-sass
```

**安装 stylus**

```bash
yarn add stylus-loader stylus #或者 npm install stylus-loader stylus
```

## 使用图片，字体和文件

在 cjet 的工程项目中，使用图片和字体等静态资源的工作方式与 CSS 类似。直接在 JavaScript 模块中 import 文件。通过 cjet 编译后将该文件包含在 bundle(包) 中。 与 CSS 导入不同，导入文件会为你提供字符串值。 此值是你可以在代码中引用的最终路径，例如 image 的 src 属性或链接到 PDF 的 href 属性。

要减少对服务器的请求数，导入小于 10,000 字节的图片将返回 data URI 而不是路径。 这适用于以下文件扩展名：`bmp` ，`gif` ，`jpg` ，`jpeg` 和 `png` 。

```js
import React from "react";
import logo from "./logo.png"; // 告诉 cjet工程 这个 JS 文件使用了这个图片

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

## 使用SVG 图标/图像

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
const svgs = require.context("./svg", false, /\.svg$/);
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
import React from "react";
import ReactDOM from "react-dom";
import "./index.less";
import App from "./App";
import "./icons"; //导入所有svg图标
//import './icons/svg/logo.svg' //按需导入单个图标

ReactDOM.render(<App />, document.getElementById("root"));
```

3、在组件中使用 svg

```js
import React, { Component } from "react";
import styles from "./App.module.less";

class App extends Component {
  render() {
    return (
      <div className={styles["App"]}>
        <svg aria-hidden="true" className={styles["App-logo"]}>
          <use xlinkHref="#icon-logo"></use>
        </svg>
      </div>
    );
  }
}

export default App;
```

你可以在`cjet.config.js`配置默认前缀或其它更多配置

```js
//cjet.config.js
module.exports = {
  /**
   * SVG symbol图标方案配置
   * 配置参考：https://github.com/kisenka/svg-sprite-loader#configuration
   */
  svgSprite: {
    options: {
      symbolId: "icon-[name]" //symbolId和use使用的名称
    }
  }
};
```

**封装 svgIcon 组件**

1、创建`src/components/svgIcon/index.jsx`文件。

```js
import React from "react";
import PropTypes from "prop-types";
import styles from "./style.module.css"; //已启用 CSS Modules

const SvgIcon = props => {
  const { iconName, fill, className } = props;

  return (
    <svg aria-hidden="true" className={className}>
      <use xlinkHref={"#icon-" + iconName} fill={fill} />
    </svg>
  );
};

SvgIcon.propTypes = {
  // svg名字
  iconName: PropTypes.string.isRequired,
  // 填充颜色
  fill: PropTypes.string
};

SvgIcon.defaultProps = {
  fill: "currentColor",
  className: styles["svg-class"]
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
import React, { Component } from "react";
import styles from "./App.module.less";
import SvgIcon from "./components/svgIcon"; //引入svgIcon组件

class App extends Component {
  render() {
    return (
      <div className={styles["App"]}>
        <div className={styles["App-header"]}>
          <svg aria-hidden="true" className={styles["App-logo"]}>
            <use xlinkHref="#icon-logo"></use>
          </svg>
        </div>
        <p>
          <SvgIcon iconName="antd-mobile" /> 基于antd mobile基础组件库
        </p>
        <p className={styles["theme-icon"]}>
          <SvgIcon iconName="theme" fill="#ff0000" /> 支持antd
          mobile组件主题定制
        </p>
      </div>
    );
  }
}

export default App;
```

## 待续...

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2020-present, [chanjet-fe](https://github.com/chanjet-fe).
