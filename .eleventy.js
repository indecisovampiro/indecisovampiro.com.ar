const pluginSEO = require('eleventy-plugin-seo')
const { readableDate, renderUsingMarkdown, renderAsText } = require('./src/filters')

module.exports = function (config) {
  // Defaults
  config.setDataDeepMerge(true)
  config.addWatchTarget('_site/tailwind.css')

  // Copy
  config.addPassthroughCopy({
    'netlifycms.yml': 'admin/config.yml',
    'static/favicon.ico': 'favicon.ico',
    'static/sprite.svg': 'sprite.svg',
    'static/fonts': 'static/fonts',
    'static/images': 'static/images',
    'node_modules/alpinejs/dist/cdn.min.js': 'alpine.js'
  })

  // Plugins
  config.addPlugin(pluginSEO, require('./_data/settings.json'))

  // Filters
  config.addFilter('readableDate', readableDate)
  config.addFilter('renderUsingMarkdown', renderUsingMarkdown)
  config.addFilter('renderAsText', renderAsText)

  // Conditional configs
  const isProduction = process.env.NODE_ENV === 'production'
  if (isProduction) {
    config.addTransform('minifyHtml', require('./src/minifyHtml'))
  } else {
    config.setBrowserSyncConfig(require('./src/browsersyncConfig'))
  }

  return {
    dir: {
      input: '_pages',
      includes: '../_includes',
      layouts: '../_layouts',
      data: '../_data'
    }
  }
}
