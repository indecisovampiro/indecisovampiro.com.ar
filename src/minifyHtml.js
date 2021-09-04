const htmlmin = require('html-minifier')

module.exports = (content, outputPath) => {
  const isHtml = outputPath.endsWith('.html')
  if (isHtml) {
    return htmlmin.minify(content, {
      useShortDoctype: true,
      removeComments: true,
      collapseWhitespace: true
    })
  }

  return content
}
