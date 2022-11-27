
const db = require('../models');
const { DataTypes, json } = require("sequelize")
const User = require('../models/user.model.js')(db.sequelize, DataTypes)
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bCrypt = require('bcryptjs');
const transporter = require("../email/email");
const { validationResult } = require('express-validator');

passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},
function (req, email, password, done) {
  const validationErrors = validationResult(req);
  console.log(validationErrors);
  if (validationErrors.errors.length > 0) {
    console.log(validationErrors.errors);
    return done(null, false, { message: JSON.stringify(validationErrors) });
  }
  var generateHash = function(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
  };
  User.findOne({
    where: {
      email: email
    }
  }).then(function (user) {
    if (user) {
      return done(null, false, {
        message: 'The email is already taken'
      });
    } else {
      var userPassword = generateHash(password);
      var verificationCode = Math.floor(100000 + Math.random() * 900000);
      var name = req.body.name;
      var data = {
        email: email,
        password: userPassword,
        name: name,
        username: req.body.username,
        verificationCode: verificationCode
      };
      User.create(data).then(function(newUser, created) {
        if (!newUser) {
          return done(null, false);
        }
        if (newUser) {
          return done(null, newUser);

          message = {
            from: "Team@whattodo.com",
            to: email,
            subject: "Verification Code for WhatToDO",
            text: "Hello " + name + ",\nWelcome to WhatToDo! Your verification code is " + verificationCode + ".\n\nSincerely,\nWhatToDo Team"
          }
          transporter.sendMail(message, function (err, info) {
            if (err) {
              console.log(err)
              return done(null, false, {
                message: "Failed to send email. Please try again later."
              });
            } else {
              console.log(info);
              return done(null, newUser);
            }
          });
        }
      });
    }
  });
}
));

passport.use('local-signin', new LocalStrategy(
  {
    // by default, local strategy uses username and password, we will override with email
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
  },
  function (req, email, password, done) {
    const validationErrors = validationResult(req);
    if (validationErrors.errors.length > 0) {
      console.log(validationErrors.errors);
      return done(null, false, { message: JSON.stringify(validationErrors) });
    }
    var isValidPassword = function(userpass, password) {
      return bCrypt.compareSync(password, userpass);
    }
    User.findOne({
      where: {
        email: email
      }
    }).then(function(user) {
      if (!user) {
        return done(null, false, {
          message: 'Email does not exist'
        });
      }
      if (!isValidPassword(user.password, password)) {
        return done(null, false, {
          message: 'Incorrect password.'
        });
      }
      if (!user.verified) {
        return done(null, false, {
          message: 'User not verified'
        });
      }
      var userinfo = user.get();
      return done(null, userinfo);
    }).catch(function(err) {
      console.log("Error:", err);
      return done(null, false, {
        message: 'Something went wrong with your Login'
      });
    });
  }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    User.findByPk(user.user_id).then(function (user) {
      if (user) {
        done(null, user.get());
      } else {
        done(user.errors, null);
      }
    });
  });