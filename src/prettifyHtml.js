const path = require('path')
const prettier = require('prettier')

module.exports = (content, outputPath) => {
  const extname = path.extname(outputPath)
  switch (extname) {
    case '.html':
    case '.json':
      // Strip leading period from extension and use as the Prettier parser.
      const parser = extname.replace(/^./, '')
      const printWidth = 120
      return prettier.format(content, { parser, printWidth })
    default:
      return content
  }
}
