module.exports = function (config) {
  // Copy
  config.addPassthroughCopy({
    'static/favicon.ico': 'favicon.ico',
    static: 'static',
    'netlifycms.yml': 'admin/config.yml',
    'node_modules/alpinejs/dist/alpine.js': 'alpine.js',
  })

  // Better defaults
  config.setDataDeepMerge(true)
  config.addWatchTarget("_site/tailwind.css");

  // Plugins
  const pluginSEO = require('eleventy-plugin-seo')
  config.addPlugin(pluginSEO, require('./_data/settings.json'))

  // Conditional configs
  const isProduction = process.env.NODE_ENV === 'production'
  if (isProduction) {
    config.addTransform('minifyHtml', require('./src/minifyHtml'))
  } else {
    config.setBrowserSyncConfig(require('./src/browsersyncConfig'))
    // Too strict, need a linter first
    // config.addTransform("prettier", require('./src/prettifyHtml'))
  }

  return {
    dir: {
      input: '_pages',
      includes: '../_includes',
      data: '../_data',
    },
  }
}
