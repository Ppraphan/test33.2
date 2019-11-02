const con = require('./connect-db.js'); /*เชื่อมต่อฐานข้อมูล*/
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

module.exports = function(app) {

    app.get('/dashboard', function(req, res) {
      var userinfo = req.user;
      var message = req.query.message;


      con.query('SELECT * FROM project.portfolio where pfoUserAI_ID = "' + req.user.id + '"', function(err, rows) {

        if (err)
          console.log("Error Selecting : %s ", err);
        res.render('pages/dashboard', {
          userinfo: userinfo,
          message: message,

          portdata: rows,
        });
      });

    });

    app.get('/allUser', function(req, res) {
      var userinfo = req.user;
      var message = req.query.message;


      con.query('SELECT * FROM project.users;', function(err, rows) {

        if (err)
          console.log("Error Selecting : %s ", err);
        res.render('pages/allUser', {
          userinfo: userinfo,
          message: message,

          usersData: rows,
        });
      });

    });





    }
