# CJET

CJET致力于使用React技术栈以系统性、组件化、标准化的过程方法开发和维护企业级应用软件。确保前端开发人员能够快速在React生态中将各种基础工具以零配置的方式与企业级业务需求的开发平稳衔接，让研发人员更专注于开发业务逻辑上，同时提供灵活的配置，以适合不同类型和规模的企业级应用。

## 快速开始

##### 1、确保你的项目为以下结构
```bash
project
├── package.json
└── src
    └── views 
        └── index
            ├── index.html
            └── index.js
```
对于要构建的项目，这些文件必须以确切的文件名存在：
- `src/views/index/index.html` 是index页面的模版
- `src/views/index/index.js` 是index页面的javascript入口


CJET支持构建多页面应用。如果你开发的项目是多页应用，请在`src/views`以目录名称存放每个页面内容。

```bash
src
└── views  
    ├── index  
    │   ├── index.html
    │   └── index.js
    └── demo
        ├── index.html
        └── index.js
```

通过CJET最终编译构建为：
```bash
dist
├── demo.html
├── index.html
└── static
    └── js
        ├── demo.[hash].js
        └── index.[hash].js
```

##### 2、在项目中安装CJET

```bash
yarn add cjet -D # 或者 npm install cjet --save-dev
```
##### 3、添加script配置

- package.json配置
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

在本地构建Node开发服务器，脱离nginx、apache等后台服务的依赖，实时编译前端的各种资源，并且在开发过程中任何文件的更改，都会自动更新浏览器，实时查看修改效果。你还将在控制台中看到任何 lint 错误。

```bash
yarn build #或者 npm run build
```

将生产应用程序构建到 dist 文件夹。它能将 React 代码智能地打包为生产模式中并优化构建以获得最佳性能。构建文件将被压缩，文件名中将包含哈希。

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2020-present, [chanjet-fe](https://github.com/chanjet-fe).