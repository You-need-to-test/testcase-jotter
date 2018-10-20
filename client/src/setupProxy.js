const proxy = require('http-proxy-middleware')
const PORT = 5000;

module.exports = function(app) {
  app.use(proxy('/api/*', { target: 'http://127.0.0.1:5000'}))
  app.use(proxy('/auth/*', { target: 'http://127.0.0.1:5000'}))
}