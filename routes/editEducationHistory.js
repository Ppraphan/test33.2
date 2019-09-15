var con = require('./connect-db.js'); /*เชื่อมต่อฐานข้อมูล*/
var bodyParser = require('body-parser');

module.exports = function(app) {

  app.get('/edit-education-history', function(req, res) {
    var userinfo = req.user;
    var message = req.query.message;

    var sql = "select * from project.educationalbackground , project.educationhistory where project.educationhistory.ehEducateLavel = project.educationalbackground.ebID and ehUserAI_ID = "+ req.user.id +";" +
      "SELECT * FROM project.educationalbackground;";

    con.query(sql, function(err, results) {

      if (err)
        console.log("Error Selecting : %s ", err);
      res.render('pages/edit-education-history', {
        userinfo: userinfo,
        message: message,

        listEducateHist: results[0],
        listEducateBG: results[1],
      });
    });


  });

  app.post('/edit-education-history', function(req, res) {

    var ehGraduateYear = req.body.ehGraduateYear;
    var ehEducateLavel = req.body.ehEducateLavel;
    var ehEducationalBackground = req.body.ehEducationalBackground;
    var ehCollegeName = req.body.ehCollegeName;

    if (req.body.ehGraduateYear == '' || req.body.ehGraduateYear == undefined) ehGraduateYear = "-";
    if (req.body.ehEducateLavel == '' || req.body.ehEducateLavel == undefined) ehEducateLavel = "-";
    if (req.body.ehEducationalBackground == '' || req.body.ehEducationalBackground == undefined) ehEducationalBackground = "-";
    if (req.body.ehCollegeName == '' || req.body.ehCollegeName == undefined) ehCollegeName = "-";

    console.log(req.user.id);

    var sql = "INSERT INTO project.educationhistory (ehUserAI_ID, ehGraduateYear, ehEducateLavel, ehEducationalBackground, ehCollegeName) VALUES ('" + req.user.id + "', '" + ehGraduateYear + "', '" + ehEducateLavel + "', '" + ehEducationalBackground + "', '" + ehCollegeName + "');";

console.log(sql);

    con.query(sql, function(err, rows) {
      if (err)
        console.log("Error Selecting : %s ", err);
    });
    var message = encodeURIComponent('เพิ่มเรียบร้อยแล้ว');
    res.redirect('/edit-education-history?message=' + message);



  });


  app.get('/edit-education-history/delete/:ehID', function(req, res) {
    var userinfo = req.user;
    var message = req.query.message;
    var ehID = req.params.ehID;

    var sql = 'DELETE FROM project.educationhistory WHERE (ehID = ' + ehID + ');';
    console.log(sql);
    con.query(sql, function(err, rows) {

      if (err)
        console.log("Error Selecting : %s ", err);
      var message = encodeURIComponent('ลบเรียบร้อยแล้ว');
      res.redirect('/edit-education-history?message=' + message)
    });


  });


}
