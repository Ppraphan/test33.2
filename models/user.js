module.exports = function(sequelize, Sequelize) {

  var User = sequelize.define('user', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userPermission: {
      type: Sequelize.STRING,
    },
    nameIDHuman: {
      type: Sequelize.INTEGER
    },
    firstname: {
      type: Sequelize.STRING,
    },
    lastname: {
      type: Sequelize.STRING,
    },
    engFirstName: {
      type: Sequelize.STRING,
    },
    engLastName: {
      type: Sequelize.STRING,
    },
    prefix: {
      type: Sequelize.STRING,
    },
    academicPositions: {
      type: Sequelize.STRING
    },
    nationality: {
      type: Sequelize.STRING
    },
    birthday: {
      type: Sequelize.STRING
    },
    telNumber: {
      type: Sequelize.STRING
    },
    fristDayJoin: {
      type: Sequelize.STRING
    },
    dayLeft: {
      type: Sequelize.STRING,
    },
    username: {
      type: Sequelize.TEXT
    },
    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: Sequelize.STRING,
    },
    last_login: {
      type: Sequelize.DATE
    },
    status: {
      type: Sequelize.ENUM('active', 'inactive'),
      defaultValue: 'active'
    },
    country: {
      type: Sequelize.STRING
    },
    university: {
      type: Sequelize.STRING
    },
    faculty: {
      type: Sequelize.STRING
    },
    department: {
      type: Sequelize.STRING
    },
    subdepartment: {
      type: Sequelize.STRING
    },
    profilePic: {
      type: Sequelize.TEXT
    },
    facebook: {
      type: Sequelize.TEXT
    },
    instagram: {
      type: Sequelize.TEXT
    },
    twitter: {
      type: Sequelize.TEXT
    },
    line: {
      type: Sequelize.TEXT
    },

    userPosition: {
      type: Sequelize.TEXT
    },
    userWpID: {
      type: Sequelize.INTEGER
    },
    userSubWpName: {
      type: Sequelize.TEXT
    },
    userWorkTel: {
      type: Sequelize.TEXT
    },
    userWorkEmail: {
      type: Sequelize.TEXT
    },
    userWorkAddress: {
      type: Sequelize.TEXT
    },
    userExpertiseID: {
      type: Sequelize.INTEGER
    },
    userSubExpertiseID: {
      type: Sequelize.TEXT
    },
    userSkill: {
      type: Sequelize.TEXT
    },
    wifiID: {
      type: Sequelize.TEXT
    },

  });

  return User;

}
