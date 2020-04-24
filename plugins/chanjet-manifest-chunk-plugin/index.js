const getAssetKind = require('./getAssetKind');
const isHMRUpdate = require('./isHMRUpdate');
const isSourceMap = require('./isSourceMap');
const toposort = require('toposort');
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

        const outputOptions = compilation.mainTemplate.outputOptions;

        // 从chunks列表中过滤 入口 chunk 和 初始 chunk
        const chunkObj = self.filterChunks(stats.chunks);
        const initialChunks = self.sortByDependency(chunkObj.initialChunks);
        // console.log(
        //   Object.keys(assets),
        //   stats.chunks,
        //   // '\n\n',
        //   '初始化',
        //   chunkObj.initialChunks,
        //   '入口点',
        //   chunkObj.entryChunks
        // );

        //
        let entryFileName = '';
        let initialScriptNameArr = [];
        let initialLinkNameArr = [];

        if (chunkObj.entryChunks.length === 1) {
          const entryFileNames = self.filterAssetNameForChunkFiles(chunkObj.entryChunks[0], compilerOptions);
          entryFileName = entryFileNames.assetScriptNames[0];
        } else {
          throw new Error("don't support multi entry in the version!");
        }

        initialChunks.forEach(chunkItem => {
          const assetNames = self.filterAssetNameForChunkFiles(chunkItem, compilerOptions);
          initialScriptNameArr = initialScriptNameArr.concat(assetNames.assetScriptNames);
          initialLinkNameArr = initialLinkNameArr.concat(assetNames.assetLinkNames);
        });

        // 生成自定义载入脚本
        const extraSources = self.assembleInitialSources(outputOptions, initialScriptNameArr, initialLinkNameArr);

        let entrySource = assets[entryFileName];

        // console.log('======>', entrySource.source());

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

  filterAssetNameForChunkFiles(chunk, options) {
    const assetScriptNames = [],
      assetLinkNames = [];
    const assets = chunk.files;
    if (Array.isArray(assets)) {
      for (let i = 0; i < assets.length; i++) {
        const asset = assets[i];
        if (isHMRUpdate(options, asset) || isSourceMap(options, asset)) {
          continue;
        }
        const typeName = getAssetKind(options, asset);
        if (typeName === 'js') {
          assetScriptNames.push(asset);
        }

        if (typeName === 'css') {
          assetLinkNames.push(asset);
        }
      }
    }
    return {assetScriptNames: assetScriptNames, assetLinkNames: assetLinkNames};
  }

  /**
   * 筛选  chunk
   * @params chunks 所有的 chunk 集合
   * @returns entry chunk and initialize chunks
   */
  filterChunks(chunks) {
    const entryChunks = [],
      initialChunks = [];
    chunks.forEach(function (chunk) {
      let chunkName = '';
      if (chunk.names && Array.isArray(chunk.names)) {
        chunkName = chunk.names[0];
      }
      if (!chunkName) {
        return;
      }
      // This chunk doesn't have a name. This script can't handled it.
      if (chunkName === undefined) {
        return;
      }
      // Skip if the chunk should be lazy loaded
      if (typeof chunk.isInitial === 'function') {
        if (!chunk.isInitial()) {
          return;
        }
      } else if (!chunk.initial) {
        return;
      }

      //  入口 本身
      if (chunk.entry === true) {
        entryChunks.push(chunk);
        return;
      }
      // Add otherwise
      initialChunks.push(chunk);
      return;
    });

    return {
      entryChunks,
      initialChunks,
    };
  }

  /**
   * @params chunks 必须要是 数组
   */
  sortByDependency(chunks) {
    if (!chunks) {
      return chunks;
    }

    if (this.entriesSequence instanceof Array) {
      const result = [];
      chunks.sort((a, b) => {
        const aIndex = this.entriesSequence.findIndex(item => a.names.toString().indexOf(item) > -1);
        const bIndex = this.entriesSequence.findIndex(item => b.names.toString().indexOf(item) > -1);
        return aIndex - bIndex;
      });
      return chunks;
    }

    // We build a map (chunk-id -> chunk) for faster access during graph building.
    var nodeMap = {};

    chunks.forEach(function (chunk) {
      nodeMap[chunk.id] = chunk;
    });

    // Next, we add an edge for each parent relationship into the graph
    var edges = [];

    chunks.forEach(function (chunk) {
      if (chunk.parents) {
        // Add an edge for each parent (parent -> child)
        chunk.parents.forEach(function (parentId) {
          // webpack2 chunk.parents are chunks instead of string id(s)
          var parentChunk = parentId instanceof Object ? parentId : nodeMap[parentId];
          // If the parent chunk does not exist (e.g. because of an excluded chunk)
          // we ignore that parent
          if (parentChunk) {
            edges.push([parentChunk, chunk]);
          }
        });
      }
    });
    // We now perform a topological sorting on the input chunks and built edges
    return toposort.array(chunks, edges);
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
