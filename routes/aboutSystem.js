var con = require('./connect-db.js'); /*เชื่อมต่อฐานข้อมูล*/
var bodyParser = require('body-parser');

module.exports = function(app) {

  app.get('/about', function(req, res) {
    var userinfo = req.user;
    var message = req.query.message;

      res.render('pages/about', {
        userinfo: userinfo,
        message: message,
      });

  });

  app.get('/ask', function(req, res) {
    var userinfo = req.user;
    var message = req.query.message;

      res.render('pages/ask', {
        userinfo: userinfo,
        message: message,
      });

  });

  app.get('/recommend', function(req, res) {
    var userinfo = req.user;
    var message = req.query.message;

      res.render('pages/recommend', {
        userinfo: userinfo,
        message: message,
      });

  });

  app.get('/dev', function(req, res) {
    var userinfo = req.user;
    var message = req.query.message;

      res.render('pages/dev', {
        userinfo: userinfo,
        message: message,
      });

  });

}
