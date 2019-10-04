//load bcrypt
var bCrypt = require('bcrypt-nodejs');
var env = require('dotenv').config()
var soap = require('soap');
const chalk = require('chalk');

module.exports = function(passport, user) {
  var User = user;
  var LocalStrategy = require('passport-local').Strategy;
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findByPk(id).then(function(user) {
      if (user) {
        done(null, user.get());
      } else {
        done(user.errors, null);
      }
    });
  });


  passport.use('local-signup', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },

    function(req, email, password, done) {
      var generateHash = function(password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
      };

      User.findOne({
        where: {
          email: email
        }
      }).then(function(user) {
        if (user) {
          return done(null, false, {
            message: 'That email is already taken'
          });
        } else {

          var userPassword = generateHash(password);
          var data = {
            email: email,
            password: userPassword,
            firstname: req.body.firstname,
            lastname: req.body.lastname,

            nameIDHuman: req.body.nameIDHuman,
            engFirstName: req.body.engFirstName,
            engLastName: req.body.engLastName,
            prefix: req.body.prefix,
            academicPositions: req.body.academicPositions,
            nationality: req.body.nationality,
            birthday: req.body.birthday,
            telNumber: req.body.telNumber,
            fristDayJoin: req.body.fristDayJoin,
            dayLeft: req.body.dayLeft,
            userPermission: req.body.userPermission,

            country: req.body.country,
            university: req.body.university,
            faculty: req.body.faculty,
            department: req.body.department,
            subdepartment: req.body.subdepartment,
          };

          User.create(data).then(function(newUser, created) {
            if (!newUser) {
              return done(null, false);
            }
            if (newUser) {
              return done(null, newUser);
            }
          });
        }
      });
    }

  ));


  //LOCAL SIGNIN
  passport.use('local-signin', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField: 'wifiID',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function(req, wifiID, password, done) {
      var User = user;



      var url = 'http://172.20.0.37/AdRmutt.asmx?WSDL';
      var args = {apikey: 'vo6iydknris,[6[zk',userName:wifiID,passWord:password};

      soap.createClient(url, function(err, client) {
          client.CheckValid(args, function(err, result) {
            console.log(JSON.stringify(result));

            if(result.CheckValidResult=="true"){
              console.log(chalk.blue('true'));

              User.findOne({
                where: {
                  wifiID: wifiID
                }
              }).then(function(user) {
                if (!user) {
                  console.log(chalk.red('Email does not exist'));

                  var data = {
                    wifiID: req.body.wifiID,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    profilePic:"default-profile.jpg",
                  };

                  User.create(data).then(function(newUser, created) {
                    if (!newUser) {
                      return done(null, false);
                    }
                    if (newUser) {
                      return done(null, newUser);
                    }
                  });



                }else{
                  var userinfo = user.get();
                  return done(null, userinfo);
                }


              }).catch(function(err) {
                console.log("Error:", err);
                return done(null, false, {
                  message: 'Something went wrong with your Signin'
                });
              });


            }
            else {
              console.log(chalk.red('false'));
            }

          });
      });




    }
  ));











}
