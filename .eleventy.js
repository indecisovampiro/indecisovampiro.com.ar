module.exports = function (config) {
  // Copy
  config.addPassthroughCopy({
    'static/favicon.ico': 'favicon.ico',
    static: 'static',
    'netlifycms.yml': 'admin/config.yml',
    'node_modules/alpinejs/dist/cdn.min.js': 'alpine.js',
  })

  // Better defaults
  config.setDataDeepMerge(true)
  config.addWatchTarget('_site/tailwind.css')

  // Plugins
  const pluginSEO = require('eleventy-plugin-seo')
  config.addPlugin(pluginSEO, require('./_data/settings.json'))

  // Filters
  // readableDate
  const { DateTime } = require('luxon')
  config.addFilter('readableDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat(
      'dd LLL yyyy'
    )
  })
  // renderUsingMarkdown
  const markdownIt = require("markdown-it");
  const md = new markdownIt();
  config.addFilter("renderUsingMarkdown", (content) => {
    return md.render(content);
  });
  // renderAsText
  const { convert } = require('html-to-text');
  config.addFilter("renderAsText", (content) => {
    return convert(content, { ignoreHref: true }).replace(/"/g, `'`)
  });

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
