var con = require('./connect-db.js'); /*เชื่อมต่อฐานข้อมูล*/
var bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');
var base64Img = require('base64-img');

module.exports = function(app) {

  app.get('/profile/:id', function(req, res) {

    var message = req.query.message;
    var userinfo = req.user;

    var fullid = req.params.id;

    var shortid = parseInt(fullid.split("-", 1));

    var sql0 = "SELECT userExpertiseID FROM project.users where id = " + shortid + ";";
    con.query(sql0, function(err, results) {

      if (err) console.log("Error Selecting : %s ", err);



      var sql = "SELECT * FROM project.expertise order by expertiseName;" +
        "SELECT * FROM project.subexpertise where subExpertiseID=" + results[0].userExpertiseID + " order by subExpertiseName;" +
        "SELECT * FROM project.workplace;" +
        "SELECT * FROM project.educationhistory where ehUserAI_ID = " + shortid + " order by ehGraduateYear DESC;" +
        "SELECT * FROM project.careerhistory where chUserAI_ID = " + shortid + " order by chEntYear DESC; " +

        "SELECT * FROM project.users  where id = " + shortid + ";" +

        "SELECT * FROM project.portfolio where pfoUserAI_ID = " + shortid + " and pfoCatagoryID = 'โครงการ' order by pfoYears DESC limit 0, 5;" +
        "SELECT * FROM project.portfolio where pfoUserAI_ID = " + shortid + " and pfoCatagoryID = 'บริการวิชาการ' order by pfoYears DESC limit 0, 5;" +
        "SELECT * FROM project.portfolio where pfoUserAI_ID = " + shortid + " and pfoCatagoryID = 'รางวัล' order by pfoYears DESC limit 0, 5;" +
        "SELECT * FROM project.portfolio where pfoUserAI_ID = " + shortid + " and pfoCatagoryID = 'อื่น ๆ' order by pfoYears DESC limit 0, 5;" +

        "SELECT COUNT(pfoID)  as countPFOType1  FROM project.portfolio where pfoUserAI_ID = " + shortid + " and pfoCatagoryID = 'โครงการ' ;" +
        "SELECT COUNT(pfoID)  as countPFOType2  FROM project.portfolio where pfoUserAI_ID = " + shortid + " and pfoCatagoryID = 'บริการวิชาการ' ;" +
        "SELECT COUNT(pfoID)  as countPFOType3  FROM project.portfolio where pfoUserAI_ID = " + shortid + " and pfoCatagoryID = 'รางวัล' ;" +
        "SELECT COUNT(pfoID)  as countPFOType4  FROM project.portfolio where pfoUserAI_ID = " + shortid + " and pfoCatagoryID = 'อื่น ๆ' ;";

      con.query(sql, function(err, results) {

        console.log(results[5][0]);

        if (err) console.log("Error Selecting : %s ", err);

        res.render('pages/profile', {
          message: message,
          userinfo: userinfo,

          expertise: results[0],
          subexpertise: results[1],
          workplace: results[2],
          educateData: results[3],
          expData: results[4],

          userData: results[5][0],

          portfolioDataType1: results[6],
          portfolioDataType2: results[7],
          portfolioDataType3: results[8],
          portfolioDataType4: results[9],

          countAllPFOType1: results[10][0],
          countAllPFOType2: results[11][0],
          countAllPFOType3: results[12][0],
          countAllPFOType4: results[13][0],
        });

      });

    });

  });

  app.get('/profile', function(req, res) {
    var message = req.query.message;
    var userinfo = req.user;
    var userinfoexpert = req.user.userExpertiseID;

    var sql = "SELECT * FROM project.expertise order by expertiseName;" +
      "SELECT * FROM project.subexpertise  where subExpertiseID=" + userinfoexpert + " order by subExpertiseName;" +
      "SELECT * FROM project.workplace;" +
      "SELECT * FROM project.educationhistory where ehUserAI_ID = " + req.user.id + " order by ehGraduateYear DESC;" +
      "SELECT * FROM project.careerhistory where chUserAI_ID = " + req.user.id + " order by chEntYear DESC; ";

    con.query(sql, function(err, results) {
      if (err) console.log("Error Selecting : %s ", err);

      res.render('pages/profile', {
        message: message,
        userinfo: userinfo,

        expertise: results[0],
        subexpertise: results[1],
        workplace: results[2],
        educateData: results[3],
        expData: results[4],
      });

    });

  });

  app.get('/edit-profile', function(req, res) {
    var userinfo = req.user;
    var message = req.query.message;

    res.render('pages/edit-profile', {
      userinfo: userinfo,
      message: message,
    });
  });


  app.get('/edit-workinfo', function(req, res) {
    var message = req.query.message;
    var sql = "SELECT * FROM project.workplace order by wpName;"

    con.query(sql, function(err, results) {
      console.log(sql);
      if (err) console.log("Error Selecting : %s ", err);
      console.log(results);

      var userinfo = req.user;
      res.render('pages/edit-workinfo', {
        message: message,
        userinfo: userinfo,
        allworkplace: results,
      });

    });


  });

  app.get('/edit-expertise', function(req, res) {
    var userinfo = req.user;
    var message = req.query.message;

    var userinfoexpert = req.user.userExpertiseID;
    console.log(userinfoexpert);



    if (userinfoexpert == '' || userinfoexpert == null || userinfoexpert == undefined) {
      var sql = "SELECT * FROM project.expertise order by expertiseName; ";
      con.query(sql, function(err, results) {
        if (err) console.log("Error Selecting : %s ", err);

        res.render('pages/edit-expertise', {
          message: message,
          userinfo: userinfo,

          expertise: results,
        });

      });
    }

    if (userinfoexpert >= 0) {
      var sql = "SELECT * FROM project.expertise order by expertiseName;SELECT * FROM project.subexpertise  where subExpertiseID=" +
        userinfoexpert + " order by subExpertiseName  ";
      con.query(sql, function(err, results) {
        if (err) console.log("Error Selecting : %s ", err);

        res.render('pages/edit-expertise', {
          message: message,
          userinfo: userinfo,

          expertise: results[0],
          subexpertise: results[1],
        });

      });
    }





  });

  app.get('/create-bs-cards', function(req, res) {
    var message = req.query.message;
    var userinfo = req.user;




    res.render('pages/create-bs-cards', {
      message: message,
      userinfo: userinfo,


    });



  });





  app.post('/edit-profile', function(req, res) {



    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var facebook = req.body.facebook;
    var instagram = req.body.instagram;
    var twitter = req.body.twitter;
    var line = req.body.line;

    if (req.body.firstname == '' || req.body.firstname == undefined) firstname = "-";
    if (req.body.lastname == '' || req.body.lastname == undefined) lastname = "-";
    if (req.body.facebook == '' || req.body.facebook == undefined) facebook = "-";
    if (req.body.instagram == '' || req.body.instagram == undefined) instagram = "-";
    if (req.body.twitter == '' || req.body.twitter == undefined) twitter = "-";
    if (req.body.line == '' || req.body.line == undefined) line = "-";

    console.log("แก้ไขข้อมูลที่ ID : " + req.user.id);

     if (!(req.body.base64img)) {

      var sql0 = "UPDATE project.users  SET firstname ='" + firstname +
        "',lastname ='" + lastname +
        "',facebook ='" + facebook +
        "',instagram ='" + instagram +
        "',twitter ='" + twitter +
        "',line ='" + line +

        "' WHERE id ='" + req.user.id + "' ";

      con.query(sql0, function(err, rows) {
        if (err)
          console.log("Error Selecting : %s ", err);
        console.log("แก้ไขข้อมูลส่วนตัวกรณีไม่มีรูปภาพ");
      });

    } else {
      const base64Image = req.body.base64img;

      var imgname = 'profileIMG_'+req.user.id;
      var imgnamePNG ='profileIMG_'+req.user.id+'.png';

      base64Img.img(base64Image, './public/userprofile/', imgname, function(err, filepath) {});

      // var fileInput = req.files.fileInput;
      // var imageName = req.files.fileInput.name;
      // var imagetype = req.files.fileInput.mimetype;
      // var imageNameWithoutspace = imageName.replace(/\s/g, '');
      // var dr2 = (imageNameWithoutspace);
      // console.log(imagetype);
      //
      // startup_image.mv('./public/userprofile/' + req.user.id + imageNameWithoutspace, function(err) {
      //   if (startup_image == null) {
      //     console.log(err);
      //   } else {
      //     console.log('./public/userprofile/' + req.user.id + imageNameWithoutspace + "\t" + "uploaded");
      //   }
      // });

      var sql1 = "UPDATE project.users  SET firstname ='" + firstname +
        "',lastname ='" + lastname +
        "',facebook ='" + facebook +
        "',instagram ='" + instagram +
        "',twitter ='" + twitter +
        "',line ='" + line +
        "',profilePic ='" + imgnamePNG +

        "' WHERE id ='" + req.user.id + "' ";

      con.query(sql1, function(err, rows) {
        if (err)
          console.log("Error Selecting : %s ", err);
      });

    }


    var message = encodeURIComponent('แก้ไขข้อมูลเรียบร้อยแล้ว');
    res.redirect('/edit-profile?message=' + message);

  });

  app.post('/edit-expertise', function(req, res) {

    var userExpertiseID = req.body.userExpertiseID;
    var userSubExpertiseID = req.body.userSubExpertiseID;
    var userSkill = req.body.userSkill;

    console.log(userExpertiseID);
    console.log(userSubExpertiseID);
    console.log(userSkill);

    if (req.body.userExpertiseID == '' || req.body.userExpertiseID == undefined) {
      var message = encodeURIComponent('err A01');
      res.redirect('/edit-expertise?message=' + message);
    }
    if (req.body.userSubExpertiseID == '' || req.body.userSubExpertiseID == undefined) {
      var message = encodeURIComponent('err A02');
      res.redirect('/edit-expertise?message=' + message);
    }

    if (req.body.userSkill == '' || req.body.userSkill == undefined) userSkill = "-";

    console.log(req.user.id);

    var sql = "UPDATE project.users  SET userExpertiseID ='" + userExpertiseID +
      "',userSubExpertiseID ='" + userSubExpertiseID +
      "',userSkill ='" + userSkill +

      "' WHERE id ='" + req.user.id + "' ";



    con.query(sql, function(err, rows) {
      if (err)
        console.log("Error Selecting : %s ", err);
    });

    var message = encodeURIComponent('แก้ไขข้อมูลเรียบร้อยแล้ว');
    res.redirect('/edit-expertise?message=' + message);

  });

  app.post('/edit-workinfo', function(req, res) {

    var userPosition = req.body.userPosition;
    var userWpID = parseInt(req.body.userWpID);
    var userSubWpName = req.body.userSubWpName;
    var userWorkTel = req.body.userWorkTel;
    var userWorkEmail = req.body.userWorkEmail;
    var userWorkAddress = req.body.userWorkAddress;

    if (req.body.userPosition == '' || req.body.userPosition == undefined) userPosition = "-";
    if (req.body.userSubWpName == '' || req.body.userSubWpName == undefined) userSubWpName = "-";
    if (req.body.userWpID == '' || req.body.userWpID == undefined) userWpID = "29";
    if (req.body.userWorkTel == '' || req.body.userWorkTel == undefined) userWorkTel = "-";
    if (req.body.userWorkEmail == '' || req.body.userWorkEmail == undefined) userWorkEmail = "-";
    if (req.body.userWorkAddress == '' || req.body.userWorkAddress == undefined) userWorkAddress = "-";

    console.log(req.user.id);

    var sql = "UPDATE project.users  SET userPosition ='" + userPosition +
      "',userWpID ='" + userWpID +
      "',userSubWpName ='" + userSubWpName +
      "',userWorkTel ='" + userWorkTel +
      "',userWorkEmail ='" + userWorkEmail +
      "',userWorkAddress ='" + userWorkAddress +

      "' WHERE id ='" + req.user.id + "' ";



    con.query(sql, function(err, rows) {
      if (err)
        console.log("Error Selecting : %s ", err);
    });

    var message = encodeURIComponent('แก้ไขข้อมูลเรียบร้อยแล้ว');
    res.redirect('/edit-workinfo?message=' + message);

  });








  //for ajax req data
  app.get('/edit-expertise-data', function(req, res) {
    var userinfo = req.user;
    var expertiseSelectData = req.query.expertiseSelectData;

    var sql = "SELECT * FROM project.subexpertise where subExpertiseID = " + expertiseSelectData + " order by subExpertiseName  ;"

    con.query(sql, function(err, results) {
      console.log(sql);
      if (err) console.log("Error Selecting : %s ", err);
      console.log(results);
      res.send(results);

    });



  });

  app.get('/getotherpfotype1', function(req, res) {
    var valPFOType1Showon = req.query.valPFOType1Showon;
    var userid = req.query.userid;

    var sql = "SELECT * FROM project.portfolio where pfoUserAI_ID = " + userid + " and pfoCatagoryID = 'โครงการ' order by pfoYears DESC limit " + valPFOType1Showon + ", 5;"

    con.query(sql, function(err, results) {
      console.log(sql);
      if (err) console.log("Error Selecting : %s ", err);

      res.send(results);
    });
  });

  app.get('/getotherpfotype2', function(req, res) {
    var valPFOType2Showon = req.query.valPFOType1Showon;
    var userid = req.query.userid;

    var sql = "SELECT * FROM project.portfolio where pfoUserAI_ID = " + userid + " and pfoCatagoryID = 'บริการวิชาการ' order by pfoYears DESC limit " + valPFOType2Showon + ", 5;"

    con.query(sql, function(err, results) {
      console.log(sql);
      if (err) console.log("Error Selecting : %s ", err);

      res.send(results);
    });
  });

  app.get('/getotherpfotype3', function(req, res) {
    var valPFOType3Showon = req.query.valPFOType1Showon;
    var userid = req.query.userid;

    var sql = "SELECT * FROM project.portfolio where pfoUserAI_ID = " + userid + " and pfoCatagoryID = 'บริการวิชาการ' order by pfoYears DESC limit " + valPFOType2Showon + ", 5;"

    con.query(sql, function(err, results) {
      console.log(sql);
      if (err) console.log("Error Selecting : %s ", err);

      res.send(results);
    });
  });

  app.get('/getotherpfotype4', function(req, res) {
    var valPFOType4Showon = req.query.valPFOType4Showon;
    var userid = req.query.userid;

    var sql = "SELECT * FROM project.portfolio where pfoUserAI_ID = " + userid + " and pfoCatagoryID = 'อื่น ๆ' order by pfoYears DESC limit " + valPFOType4Showon + ", 5;"

    con.query(sql, function(err, results) {
      console.log(sql);
      if (err) console.log("Error Selecting : %s ", err);

      res.send(results);
    });
  });


  app.get('/getuserdata', function(req, res) {
    var userinfo = req.user;
    var beginshow = req.query.beginshow;

    var sql = "SELECT id,profilePic,firstname,lastname,userPosition,userSubWpName FROM project.users orders  limit " + beginshow + ",10;"

    con.query(sql, function(err, results) {
      console.log(sql);
      if (err) console.log("Error Selecting : %s ", err);

      res.send(results);

    })
  });



}
