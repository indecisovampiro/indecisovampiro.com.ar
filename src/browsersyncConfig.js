const fs = require('fs')

module.exports = {
  open: "http://localhost:8080",
  callbacks: {
    ready: function (err, bs) {
      const content_404 = fs.readFileSync('_site/404.html')
      bs.addMiddleware('*', (req, res) => {
        res.write(content_404)
        res.end()
      })
    },
  },
}
