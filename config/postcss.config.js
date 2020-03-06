const path = require('path');
const fs = require('fs');
const defaultsDeep = require('lodash.defaultsdeep');
const postcssConfigDefault = {
  plugins: {
    'postcss-flexbugs-fixes': {},
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
    },
    'postcss-normalize': {}
  }
}

const postcssConfig = {}

const postcssConfigPath = path.resolve(process.cwd(), 'postcss.config.js')

if (fs.existsSync(postcssConfigPath)) {
  const postcssConfigProject = require(postcssConfigPath)
  Object.assign(postcssConfig, defaultsDeep(postcssConfigDefault, (postcssConfigProject.default || postcssConfigProject)))
} else {
  Object.assign(postcssConfig, postcssConfigDefault)
}

module.exports = postcssConfig
