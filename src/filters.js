const MarkdownIt = require('markdown-it')
const { DateTime } = require('luxon')
const { convert } = require('html-to-text')

function readableDate (dateObj) {
  return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat(
    'dd LLL yyyy'
  )
}
function renderUsingMarkdown (content) {
  const md = new MarkdownIt()
  return md.render(content)
}
function renderAsText (content) {
  return convert(content, { ignoreHref: true }).replace(/"/g, '\'')
}

module.exports = { readableDate, renderUsingMarkdown, renderAsText }
