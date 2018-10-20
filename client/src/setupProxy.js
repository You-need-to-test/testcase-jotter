const proxy = require('http-proxy-middleware')
const PORT = process.env.PORT || 5000;

module.exports = function(app) {
  app.use(proxy('/api/*', { target: 'http://localhost:'+ PORT }))
  app.use(proxy('/auth/*', { target: 'http://localhost:' + PORT }))
}