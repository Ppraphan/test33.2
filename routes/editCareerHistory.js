var con = require('./connect-db.js'); /*เชื่อมต่อฐานข้อมูล*/
var bodyParser = require('body-parser');

module.exports = function(app) {

  app.get('/edit-career-history', function(req, res) {
    var userinfo = req.user;
    var message = req.query.message;


    con.query('SELECT * FROM project.careerhistory where chUserAI_ID = "' + req.user.id + '"', function(err, rows) {

      if (err)
        console.log("Error Selecting : %s ", err);
      res.render('pages/edit-career-history', {
        userinfo: userinfo,
        message: message,

        data: rows,
      });
    });


  });

  app.post('/edit-career-history', function(req, res) {

    var chEntYear = req.body.chEntYear;
    var chLeftYear = req.body.chLeftYear;
    var chPosition = req.body.chPosition;
    var chCompany = req.body.chCompany;

    if (req.body.chEntYear == '' || req.body.chEntYear == undefined) chEntYear = "-";
    if (req.body.chLeftYear == '' || req.body.chLeftYear == undefined) chLeftYear = "-";
    if (req.body.chPosition == '' || req.body.chPosition == undefined) chPosition = "-";
    if (req.body.chCompany == '' || req.body.chCompany == undefined) chCompany = "-";

    console.log(req.user.id);

    var sql = "INSERT INTO project.careerhistory (chUserAI_ID, chEntYear, chLeftYear, chPosition, chCompany) VALUES ('" + req.user.id + "', '" + chEntYear + "', '" + chLeftYear + "', '" + chPosition + "', '" + chCompany + "');";



    con.query(sql, function(err, rows) {
      if (err)
        console.log("Error Selecting : %s ", err);
    });
    var message = encodeURIComponent('เพิ่มเรียบร้อยแล้ว');
    res.redirect('/edit-career-history?message=' + message);



  });


  app.get('/edit-career-history/delete/:chID', function(req, res) {
    var userinfo = req.user;
    var message = req.query.message;
    var chID = req.params.chID;

    var sql = 'DELETE FROM project.careerhistory WHERE (chID = ' + chID + ');';
    console.log(sql);
    con.query(sql, function(err, rows) {

      if (err)
        console.log("Error Selecting : %s ", err);
      var message = encodeURIComponent('ลบเรียบร้อยแล้ว');
      res.redirect('/edit-career-history?message=' + message)
    });


  });


}
