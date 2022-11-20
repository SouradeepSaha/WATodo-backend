
const db = require('../models');
const { DataTypes } = require("sequelize")
const User = require('../models/user.model.js')(db.sequelize, DataTypes)
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bCrypt = require('bcryptjs');

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, email, password, done) {
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
        var data = {
          email: email,
          password: userPassword,
          name: req.body.name,
          username: req.body.username
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

passport.use('local-signin', new LocalStrategy(
  {
      // by default, local strategy uses username and password, we will override with email
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
  },
  function(req, email, password, done) {
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