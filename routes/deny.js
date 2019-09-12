var mysql = require('mysql');
var bodyParser = require('body-parser');
var querystring = require('querystring');

var con = require('./connect-db.js');

module.exports = function(app) {
  app.get('/deny', function(req, res) {
    var userinfo = req.user;

    res.render('pages/deny', {
      userinfo: userinfo,
    });

  });
}
