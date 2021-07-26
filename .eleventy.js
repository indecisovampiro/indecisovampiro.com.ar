module.exports = function (config) {
  // Copy!
  // Favicon
  config.addPassthroughCopy({ 'static/favicon.ico': 'favicon.ico' })
  // Static
  config.addPassthroughCopy('static')
  // Netlify CMS
  config.addPassthroughCopy('admin')
  // Vendor
  config.addPassthroughCopy({
    'node_modules/alpinejs/dist/alpine.js': 'alpine.js',
    'node_modules/fitty/dist/fitty.min.js': 'fitty.js',
  })

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
