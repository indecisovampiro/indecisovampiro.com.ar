const fs = require('fs')

module.exports = {
  // open: 'http://localhost:8080',
  callbacks: {
    ready: function (_err, bs) {
      const html = fs.readFileSync('public/404.html')
      bs.addMiddleware('*', (req, res) => {
        res.write(html)
        res.end()
      })
    },
  },
}
