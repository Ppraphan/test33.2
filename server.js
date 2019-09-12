//npm modules
var uuid = require('uuid/v4')
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var axios = require('axios');
var bcrypt = require('bcrypt-nodejs');
var express = require('express');
var app = express();
var mysql = require('mysql');
var fileUpload = require('express-fileupload');
var http = require('http');
var https = require('https');
var fs = require('fs');
var bodyParser = require("body-parser");
var url = require('url');
var querystring = require('querystring');
var busboy = require('connect-busboy');
const chalk = require('chalk');
// var env = require('dotenv').load()
var env = require('dotenv').config()
var exphbs = require('express-handlebars');


//connect database
var con = require('./routes/connect-db.js');

var options = {
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: 'Happy555$',
  database: 'project'
};

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  limit: '150mb',
  extended: false,
}));

var sessionStore = new MySQLStore(options);

//---- set the view engine to ejs
app.set('view engine', 'ejs', 'vue');

app.use(session({
  key: 'session_cookie_name',
  secret: 'session_cookie_secret',
  store: sessionStore,
  resave: true,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use(fileUpload({
  limits: {
    fileSize: 30000000
  },
}));

//...
app.use(busboy());

//Models
var models = require("./models");

//Routes
var authRoute = require('./routes/auth.js')(app, passport);

//Models
var models = require("./models");

require('./routes/deny.js')(app);

//load passport strategies
require('./config/passport/passport.js')(passport, models.user);

// กลุ่มบัญชีผู้ใช้
require('./routes/user.js')(app);

//กลุ่มบัญชีผู้ใช้
require('./routes/personal-info.js')(app, session);

//แกเไขประวัติการทำงาน
require('./routes/editCareerHistory.js')(app, session);

//กลุ่มผลงาน
app.get('/all-works', function(req, res) {
  var userinfo = req.user;
  res.render('pages/all-works', {
    userinfo: userinfo,
  });
});

app.get('/new-work', function(req, res) {
  var userinfo = req.user;
  res.render('pages/new-work', {
    userinfo: userinfo,
  });
});

app.get('/portforio', function(req, res) {
  var userinfo = req.user;
  res.render('pages/portforio', {
    userinfo: userinfo,
  });
});


//Sync Database
models.sequelize.sync().then(function() {
  console.log('Nice! Database looks fine')
}).catch(function(err) {
  console.log(err, "Something went wrong with the Database Update!")
});

app.listen(8080);

console.log(chalk.bold.hex('#B8FB3C')('8080 is Running...!'));
