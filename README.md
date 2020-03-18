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

# cjet 前端工程构建工具

`cjet` 致力于使用 React 技术栈以系统性、组件化、标准化的过程方法开发和维护企业级应用软件。确保前端开发人员能够快速在 React 生态中将各种基础工具以零配置的方式与企业级业务需求的开发平稳衔接，让研发人员更专注于开发业务逻辑上，同时提供灵活的配置，以适合不同类型和规模的企业级应用。

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

const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(proxy("/api", { target: "http://localhost:5000/" }));
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
    stylusOptions: {}
  }
};
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

## 代码拆分（Code Splitting)

随着应用需求的增长，包文件也会随之增大，特别是开发大型应用程序，这将影响用户访问的加载性能。cjet 支持代码分割，即允许你将代码分割成小块，然后按需加载。

cjet 支持通过 [动态 import()](https://2ality.com/2017/01/import-operator.html#loading-code-on-demand) 进行代码拆分。 它是在[第 3 阶段的 提案](https://github.com/tc39/proposal-dynamic-import) 。 import() 函数表单接受模块名作为参数，并[返回一个 Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) ，该 Promise 总是 resolves 到模块的命名空间对象。

**moduleDemo.js**

```js
const moduleDemo = "Hello";

export { moduleDemo };
```

**app.js**

```js
import React, { Component } from "react";

class App extends Component {
  handleClick = () => {
    import("./moduleDemo")
      .then(({ moduleDemo }) => {
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
    prefetch: true
  }
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

## Webpack 配置

cjet 工程使用 webpack 作为模块打包工具，根据众多业务场景，融合了业内开发 React 项目的大量最佳实践配置，让你在开发企业级项目中享受零配置的工程体验，也依然支持高度灵活的可配置性，在根目录新建`webpack.config.js`，并输出一个配置对象：

```js
//webpack.config.js

const path = require("path");
module.exports = {
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  //扩展更多 loader
  module: {
    rules: [{ test: /\.handlebars$/, loader: "handlebars-loader" }]
  },
  //扩展更多plugins
  plugins: [new I18nPlugin(languageConfig, optionsObj)]
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
    "postcss-aspect-ratio-mini": {},
    // to edit target browsers: use "browserslist" field in package.json
    "postcss-write-svg": {
      uft8: false
    },
    "postcss-px-to-viewport": {
      viewportWidth: 750, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
      viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
      unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
      viewportUnit: "vw", // 指定需要转换成的视窗单位，建议使用vw
      selectorBlackList: [".ignore", ".hairlines"], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
      minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
      mediaQuery: false // 允许在媒体查询中转换`px`
    },
    "postcss-viewport-units": {},
    cssnano: {
      preset: "advanced",
      autoprefixer: false, // 和cssnext同样具有autoprefixer，保留一个
      "postcss-zindex": false
    }
  }
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
    ["import", { libraryName: "antd-mobile", style: true }] // `style: true` 会加载 less 文件
  ]
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
    cache: true, //启用配置缓存，如果新配置不起作用请先设置为false
    useEslintrc: true, //使用项目中eslintrc配置
    extends: ["eslint-config-react-app"] //默认使用的eslint规则
  }
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
    rewrite: true //是否使用框架内部最佳实践覆盖项目中的tsconfig.json
  }
};
```

> 注意： 默认配置不支持常量枚举和命名空间。

## 待续...

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2020-present, [chanjet-fe](https://github.com/chanjet-fe).
