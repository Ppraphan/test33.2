const con = require('./connect-db.js'); /*เชื่อมต่อฐานข้อมูล*/
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

module.exports = function(app) {

  app.get('/profile/:userid/:pfoID', function(req, res) {
    var userinfo = req.user;
    var message = req.query.message;




    con.query('SELECT * FROM project.portfolio where pfoID = "' + req.params.pfoID + '";' +
      'SELECT * FROM project.users where id = "' + req.params.userid + '";',
      function(err, rows) {
        if (err)
          console.log("Error Selecting : %s ", err);
        res.render('pages/work', {
          userinfo: userinfo,
          message: message,

          portdata: rows[0][0],
          selectUser: rows[1][0],
        });

      });

  });

  app.get('/all-works', function(req, res) {
    var userinfo = req.user;
    var message = req.query.message;


    con.query('SELECT * FROM project.portfolio where pfoUserAI_ID = "' + req.user.id + '"', function(err, rows) {

      if (err)
        console.log("Error Selecting : %s ", err);
      res.render('pages/all-works', {
        userinfo: userinfo,
        message: message,

        portdata: rows,
      });
    });

  });

  app.get('/new-work', function(req, res) {
    var userinfo = req.user;
    var message = req.query.message;

    res.render('pages/new-work', {
      userinfo: userinfo,
      message: message,
    });

  });

  app.get('/all-works/delete/:pfoID', function(req, res) {
    var userinfo = req.user;
    var message = req.query.message;
    var pfoID = req.params.pfoID;

    var sql = 'DELETE FROM project.portfolio WHERE (pfoID = ' + pfoID + ');';
    console.log(sql);
    con.query(sql, function(err, rows) {

      if (err)
        console.log("Error Selecting : %s ", err);
      var message = encodeURIComponent('ลบเรียบร้อยแล้ว');
      res.redirect('/all-works?message=' + message)
    });


  });
  app.post('/new-work', function(req, res) {

    var pfoUserAI_ID = req.user.id;

    var pfoCatagoryID = req.body.pfoCatagoryID;
    var pfoYears = req.body.pfoYears;
    var pfoTitile = req.body.pfoTitile;
    var pfoDetails = req.body.pfoDetails;



    if (req.body.pfoCatagoryID == '' || req.body.pfoCatagoryID == undefined) pfoCatagoryID = "-";
    if (req.body.pfoYears == '' || req.body.pfoYears == undefined) pfoYears = "-";
    if (req.body.pfoTitile == '' || req.body.pfoTitile == undefined) pfoTitile = "-";
    if (req.body.pfoDetails == '' || req.body.pfoDetails == undefined) pfoDetails = "-";


    if (!(req.files && req.files.pfoImage)) {
      var sql = "INSERT INTO project.portfolio (pfoUserAI_ID, pfoCatagoryID, pfoYears, pfoTitile, pfoDetails) " +
        " VALUES ('" + pfoUserAI_ID + "','" + pfoCatagoryID + "','" + pfoYears + "','" + pfoTitile + "','" + pfoDetails + "');";



      con.query(sql, function(err, rows) {
        if (err)
          console.log("Error Selecting : %s ", err);
      });

    } else {
      var pfoImageName = req.files.pfoImage.name;

      console.log(Object.prototype.toString.call(pfoImage));


      if (pfoImage instanceof Array) {
        const file = req.files.pfoImage;
        for (let i = 0; i < file.length; i++) {
          file[i].mv('./public/portfolio/' + file[i].name, function(err) {
            if (err) {
              res.send("EEROR " + err);
            }
          })
        }

      } else {
        pfoImage.mv('./public/portfolio/' + req.user.id + pfoImageName, function(err) {
          if (pfoImage == null) {
            console.log(err);
          } else {
            console.log('./public/portfolio/' + req.user.id + pfoImageName + "\t" + "uploaded");
          }
        });
      }

      var sql = "INSERT INTO project.portfolio (pfoUserAI_ID, pfoCatagoryID, pfoYears, pfoTitile, pfoDetails) " +
        " VALUES ('" + pfoUserAI_ID + "','" + pfoCatagoryID + "','" + pfoYears + "','" + pfoTitile + "','" + pfoDetails + "');";



      con.query(sql, function(err, rows) {
        if (err)
          console.log("Error Selecting : %s ", err);
      });
    }





    var message = encodeURIComponent('เพิ่มข้อมูลเรียบร้อยแล้ว');
    res.redirect('/new-work?message=' + message);

  });

}
