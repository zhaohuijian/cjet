const HtmlWebpackPlugin = require('html-webpack-plugin');
const pluginName = 'ConsoleLogOnBuildWebpackPlugin';
const Source = require('webpack-sources').Source;
const RawSource = require('webpack-sources').RawSource;
const CachedSource = require('webpack-sources').CachedSource;
const ConcatSource = require('webpack-sources').ConcatSource;

class ConsoleLogOnBuildWebpackPlugin {
  constructor(options) {
    // 入口文件 排列 顺序。可以从外部指定
    this.entriesSequence = options && options.entriesSequence;
    this.requireScriptFn = '__loadScript__';
    this.requireLinkFn = '__loadLink__';
  }
  apply(compiler) {
    // must be webpack 4 and html-webpack-plugin 4

    const self = this;
    const compilerOptions = compiler.options;

    compiler.hooks.thisCompilation.tap(pluginName, (compilation, callback) => {
      compilation.hooks.afterOptimizeAssets.tap(pluginName, function (assets) {
        // 获取 stats 只保留 hash, assets, chunk
        const stats = compilation.getStats().toJson({
          hash: true,
          assets: true,
          chunks: true,
          modules: false,
          source: false,
        });

        // 获取入口 chunk
        const entryChunk = stats.chunks.find(chunk => chunk.entry === true);

        // 异常检查
        if (entryChunk.files.length !== 1) {
          throw new Error('[chanjet-mainfest-chunk-plugin] 插件不支持多入口点');
        }
        // 与入口chunk同级chunk的id, 反向排序后得到初始chunk正确依赖顺序
        const siblingsIds = entryChunk.siblings.reverse();

        let initialScriptNameArr = [];
        let initialLinkNameArr = [];

        // 按依赖关系抽取 css, js
        siblingsIds.forEach(chunkId => {
          const chunk = stats.chunks.find(ck => ck.id === chunkId);
          chunk.files.forEach(name => {
            /\.js$/.test(name) && initialScriptNameArr.push(name);
            /\.css$/.test(name) && initialLinkNameArr.push(name);
          });
        });

        // 入口chunk的名称
        let entryFileName = entryChunk.files[0];

        // 生成自定义载入脚本
        const outputOptions = compilation.mainTemplate.outputOptions;
        const extraSources = self.assembleInitialSources(outputOptions, initialScriptNameArr, initialLinkNameArr);

        let entrySource = assets[entryFileName];

        // 如果是缓存，直接读取缓存
        if (assets[entryFileName] instanceof CachedSource) {
          entrySource = assets[entryFileName]._source;
        }

        if (entrySource instanceof ConcatSource) {
          const raw = new RawSource(extraSources);
          entrySource.children.splice(1, 0, raw); // todo: 排除 sourcemap ，写死放在第二行
          return;
        }

        if (entrySource.__proto__ instanceof Source) {
          assets[entryFileName] = new RawSource(self.appendString([entrySource.source(), extraSources]));
          return;
        }
      });

      //
    });
  }

  /**
   * 装配 需要初始化的资源
   * @params initialScriptArr 初始化 JavaScript 入口 资源
   * @parmas initialLinkArr 初始化 CSS 入口 资源
   * @returns 返回 装配好了的 模块 代码
   */
  assembleInitialSources(outputOptions, initialScriptNameArr, initialLinkNameArr) {
    const buf = [''];
    // buf.push("(function() { ");
    buf.push(this.downloadLinkFn(outputOptions && outputOptions.publicPath));
    buf.push(this.downloadScriptFn(outputOptions));

    if (Array.isArray(initialLinkNameArr)) {
      initialLinkNameArr.forEach(linkName => {
        buf.push(`${this.requireLinkFn}("${linkName}");`);
      });
    }

    if (Array.isArray(initialScriptNameArr)) {
      initialScriptNameArr.forEach(scriptName => {
        buf.push(`${this.requireScriptFn}("${scriptName}");`);
      });
    }
    // buf.push("})()");
    return this.appendString(buf);
  }

  // 构造 link DOM 节点 加载 函数
  downloadLinkFn(publicPath) {
    return this.appendString([
      `var ${this.requireLinkFn} = function (sheetName) {`,
      "var head = document.getElementsByTagName('head')[0];",
      "var link = document.createElement('link');",
      "link.rel='stylesheet';",
      "link.type = 'text/css';",
      `link.href = "${publicPath || ''}" + sheetName;`,
      'head.appendChild(link);',
      '};',
    ]);
  }

  downloadScriptFn(outputOptions) {
    const crossOriginLoading = outputOptions && outputOptions.crossOriginLoading;
    const chunkLoadTimeout = outputOptions && outputOptions.chunkLoadTimeout;
    const publicPath = outputOptions && outputOptions.publicPath;
    return this.appendString([
      `var ${this.requireScriptFn} = function (scriptName) {`,
      "var head = document.getElementsByTagName('head')[0];",
      "var script = document.createElement('script');",
      "script.type = 'text/javascript';",
      "script.charset = 'utf-8';",
      'script.async = true;',
      `script.timeout = ${chunkLoadTimeout};`,
      crossOriginLoading ? `script.crossOrigin = ${JSON.stringify(crossOriginLoading)};` : '',
      // `if (${this.requireFn}.nc) {`,
      // this.indent(`script.setAttribute("nonce", ${this.requireFn}.nc);`),
      // "}",
      `script.src = "${publicPath || ''}" + scriptName;`,
      // `var timeout = setTimeout(onScriptComplete, ${chunkLoadTimeout});`,
      // "script.onerror = script.onload = onScriptComplete;",
      // "function onScriptComplete() {",
      // this.indent([
      //     "// avoid mem leaks in IE.",
      //     "script.onerror = script.onload = null;",
      //     "clearTimeout(timeout);",
      //     "var chunk = installedChunks[chunkId];",
      //     "if(chunk !== 0) {",
      //     this.indent([
      //         "if(chunk) {",
      //         this.indent("chunk[1](new Error('Loading chunk ' + chunkId + ' failed.'));"),
      //         "}",
      //         "installedChunks[chunkId] = undefined;"
      //     ]),
      //     "}"
      // ]),
      'head.appendChild(script);',
      '};',
    ]);
  }

  // Template 里面的 asString 方法，这里换了个名字
  appendString(str) {
    if (Array.isArray(str)) {
      return str.join(' ');
    }
    return str;
  }
}

module.exports = ConsoleLogOnBuildWebpackPlugin;
