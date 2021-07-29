module.exports = function (config) {
  config.addPassthroughCopy({
    'static/favicon.ico': 'favicon.ico',
    'static': 'static',
    'admin': 'admin',
    'node_modules/alpinejs/dist/alpine.js': 'alpine.js',
  })

  // Plugins
  const pluginSEO = require('eleventy-plugin-seo')
  config.addPlugin(pluginSEO, require('./_data/seo.json'))

  // Config!
  config.setBrowserSyncConfig(require('./lib/browsersyncConfig'))
  config.addTransform('minifyHtml', require('./lib/minifyHtml'))

  return {
    dir: {
      input: '_pages',
      includes: '../_includes',
      data: '../_data',
    },
  }
}
