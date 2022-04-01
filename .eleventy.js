const yaml = require('js-yaml')
const fs = require('fs')
const MarkdownIt = require('markdown-it')
const { DateTime } = require('luxon')
const { convert } = require('html-to-text')
const htmlmin = require('html-minifier')
const externalLinks = require('eleventy-plugin-external-links')

const OUTPUT_DIRECTORY = '_site'

// Filters
function readableDate(dateObj) {
  return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('dd LLL yyyy')
}

function renderUsingMarkdown(content) {
  const md = new MarkdownIt()
  return md.render(content)
}

function renderAsText(content) {
  return convert(content, { ignoreHref: true }).replace(/"/g, "'")
}

// Transformers
function minifiedHTML(content, outputPath) {
  // https://www.11ty.dev/docs/config/#transforms-example-minify-html-output
  // Eleventy 1.0+: use this.inputPath and this.outputPath instead
  if (outputPath && outputPath.endsWith('.html')) {
    let minified = htmlmin.minify(content, {
      useShortDoctype: true,
      removeComments: true,
      collapseWhitespace: true,
    })
    return minified
  }
  return content
}

function support404() {
  return {
    callbacks: {
      ready: function (err, bs) {
        bs.addMiddleware('*', (req, res) => {
          res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' })
          res.write(fs.readFileSync(`${OUTPUT_DIRECTORY}/404.html`))
          res.end()
        })
      },
    },
  }
}

module.exports = function (config) {
  // Copy
  config.addPassthroughCopy({
    'netlifycms.yml': 'admin/config.yml',
    'static/favicon.ico': 'favicon.ico',
    'static/sprite.svg': 'static/sprite.svg',
    'static/fonts': 'static/fonts',
    'static/images': 'static/images',
    'static/router.js': 'router.js',
    'node_modules/alpinejs/dist/cdn.min.js': 'alpine.js',
    'node_modules/flickity/dist/flickity.min.css': 'flickity.min.css',
    'node_modules/flickity/dist/flickity.pkgd.min.js': 'flickity.pkgd.min.js',
  })

  // Plugins
  config.addDataExtension('yaml', contents => yaml.load(contents))
  config.addPlugin(externalLinks)

  // Filters
  config.addFilter('readableDate', readableDate)
  config.addFilter('renderUsingMarkdown', renderUsingMarkdown)
  config.addFilter('renderAsText', renderAsText)

  // Conditional configs
  const isProduction = process.env.NODE_ENV === 'production'
  if (isProduction) {
    config.addTransform('minifyHtml', minifiedHTML)
  } else {
    config.setBrowserSyncConfig(support404())
  }

  return {
    dir: {
      input: 'pages',
      output: OUTPUT_DIRECTORY,
      includes: '../includes',
      layouts: '../layouts',
      data: '../data',
    },
  }
}
