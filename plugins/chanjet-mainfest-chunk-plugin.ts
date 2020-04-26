const Source = require('webpack-sources').Source;
const RawSource = require('webpack-sources').RawSource;
const CachedSource = require('webpack-sources').CachedSource;
const ConcatSource = require('webpack-sources').ConcatSource;
import * as util from 'util';
import type {Compiler, Plugin} from 'webpack';

const pluginName = 'ChanjetMainfestChunkPlugin';
class ChanjetMainfestChunkPlugin implements Plugin {
  private requireScriptFn: string;
  private requireLinkFn: string;

  constructor(options) {
    this.requireScriptFn = '__loadScript__';
    this.requireLinkFn = '__loadLink__';
  }

  apply(compiler: Compiler) {
    const self = this;
    // must be webpack 4
    compiler.hooks.thisCompilation.tap(pluginName, compilation => {
      compilation.hooks.afterOptimizeAssets.tap(pluginName, function (assets) {
        // 获取 stats 序列化时只保留 hash, assets, chunk
        const stats = compilation.getStats().toJson({
          hash: true,
          assets: true,
          chunks: true,
          modules: false,
          source: false,
        });

        // 获取入口 chunk
        const entryChunk = stats.chunks.find(chunk => chunk.entry === true);

        // console.log(util.inspect(compilation.entrypoints, false, 4));
        // console.log(util.inspect(comp2www, false, 2));

        // console.log(JSON.stringify(stats.chunks, null, 2));

        // 检查以下两种情况
        // 1. 找不到入口chunk
        // 2. 存在多个入口chunk
        if (!entryChunk || entryChunk.files.length !== 1) {
          throw new Error(
            '[chanjet-mainfest-chunk-plugin] 找不到入口chunk,或存在多个入口chunk，插件只支持单个入口chunk'
          );
        }
        // 与入口chunk同级的chunk id, 反向排序后得到初始chunk正确依赖顺序
        const siblingsIds = entryChunk.siblings.reverse();

        let initialScriptNameArr = [];
        let initialLinkNameArr = [];

        // 按依赖关系抽取 css, js
        siblingsIds.forEach(chunkId => {
          const chunk = stats.chunks.find(ck => ck.id === chunkId);
          chunk.files.forEach(filename => {
            /\.js$/.test(filename) && initialScriptNameArr.push(filename);
            /\.css$/.test(filename) && initialLinkNameArr.push(filename);
          });
        });

        // 入口chunk的名称
        let entryFileName = entryChunk.files[0];

        // 生成自定义载入脚本
        const {outputOptions} = compilation.mainTemplate;
        const extraSources = self.assembleInitialSources(outputOptions, initialScriptNameArr, initialLinkNameArr);

        // 入口chunk的代码,正常情况下应该是webpack的运行时代码
        let entrySource = assets[entryFileName];

        // 如果存在缓存，直接读取缓存
        if (assets[entryFileName] instanceof CachedSource) {
          entrySource = assets[entryFileName]._source;
        }

        if (entrySource instanceof ConcatSource) {
          const raw = new RawSource(extraSources);
          entrySource.children.splice(1, 0, raw); // todo: 排除 sourcemap ，写死放在第二行
          return;
        }
        // jenkins构建时因为是全新构建所以不会缓存会走这里
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
      `script.src = "${publicPath || ''}" + scriptName;`,
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

module.exports = ChanjetMainfestChunkPlugin;
