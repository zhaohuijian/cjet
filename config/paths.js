/**
 * Copyright (c) 2020, chanjet-fe, https://github.com/furic-zhao.
 * Based on create-react-app but adds a bunch of useful features.
 */
'use strict';

const path = require('path');
const fs = require('fs');
const url = require('url');
const globby = require('react-dev-utils/globby');
const cjetConfig = require('./cjet.config');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const envPublicUrl = process.env.PUBLIC_URL;

function ensureSlash(inputPath, needsSlash) {
  const hasSlash = inputPath.endsWith('/');
  if (hasSlash && !needsSlash) {
    return inputPath.substr(0, inputPath.length - 1);
  } else if (!hasSlash && needsSlash) {
    return `${inputPath}/`;
  } else {
    return inputPath;
  }
}

const getPublicUrl = appPackageJson =>
  envPublicUrl || require(appPackageJson).homepage;

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// Webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
function getServedPath(appPackageJson) {
  const publicUrl = getPublicUrl(appPackageJson);
  const servedUrl =
    envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/');
  return ensureSlash(servedUrl, true);
}

const moduleFileExtensions = [
  'web.mjs',
  'mjs',
  'web.js',
  'js',
  'web.ts',
  'ts',
  'web.tsx',
  'tsx',
  'json',
  'web.jsx',
  'jsx',
];

// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn, filePath) => {
  const extension = moduleFileExtensions.find(extension =>
    fs.existsSync(resolveFn(`${filePath}.${extension}`))
  );

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.js`);
};

// entry js array
const appPagesJs = globby.sync(path.join(resolveApp(cjetConfig.paths.appPages), `*/index.{js,mjs,jsx,ts,tsx}`));
// entry html array
const appPagesHtml = globby.sync(path.join(resolveApp(cjetConfig.paths.appPages), `*/index.html`));

const resolveOwn = relativePath => path.resolve(__dirname, '..', relativePath);

const svgIconPathInclude = (svgIconPath) => {
  if (typeof svgIconPath === 'string') return resolveApp(svgIconPath);
  const includePaths = [];
  svgIconPath.include && svgIconPath.include.map((item) => {
    includePaths.push(resolveApp(item))
  })
  return includePaths;
}

const svgIconPathExclude = (svgIconPath) => {
  if (typeof svgIconPath === 'string') return [];
  const excludePaths = [];
  svgIconPath.exclude && svgIconPath.exclude.map((item) => {
    excludePaths.push(resolveApp(item))
  })
  return excludePaths;
}

// config before eject: we're in ./node_modules/cjet/config/
module.exports = {
  appPagesJs: appPagesJs,
  appPagesHtml: appPagesHtml,
  dotenv: resolveApp('.env'),
  appPath: resolveApp(cjetConfig.paths.appPath),
  appBuild: resolveApp(cjetConfig.paths.appBuild),
  appPublic: resolveApp(cjetConfig.paths.appPublic),
  appIndexHtml: resolveApp(cjetConfig.paths.appIndexHtml),
  appIndexJs: resolveModule(resolveApp, cjetConfig.paths.appIndexJs),
  svgIconPath: svgIconPathInclude(cjetConfig.paths.svgIconPath),
  svgIconPathExclude: svgIconPathExclude(cjetConfig.paths.svgIconPath),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp(cjetConfig.paths.appSrc),
  appTsConfig: resolveApp('tsconfig.json'),
  appJsConfig: resolveApp('jsconfig.json'),
  yarnLockFile: resolveApp('yarn.lock'),
  proxySetup: resolveApp(cjetConfig.paths.proxySetup),
  appNodeModules: resolveApp('node_modules'),
  publicUrl: getPublicUrl(resolveApp('package.json')),
  servedPath: getServedPath(resolveApp('package.json')),
  // These properties only exist before ejecting:
  ownPath: resolveOwn('.'),
  ownNodeModules: resolveOwn('node_modules'), // This is empty on npm 3
  appTypeDeclarations: resolveApp(cjetConfig.paths.appTypeDeclarations),
  ownTypeDeclarations: resolveOwn('lib/react-app.d.ts'),
};

module.exports.moduleFileExtensions = moduleFileExtensions;
