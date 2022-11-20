const router = require("express").Router();
const User = require("../controllers/user.controller");

module.exports = (app, passport) => {

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
      return next();
    res.status(401).send("Not Authorized");
  }

  //User Signup
  router.post("/signup", passport.authenticate('local-signup', { failureMessage: true }),
  function (req, res) {
    res.status(200).send("Success");
  });

  // User Login
  router.post("/login", passport.authenticate('local-signin', { failureMessage: true }),
    function (req, res) {
    res.redirect('/dashboard/' + req.user.user_id);
  });

  // User Logout
  router.get("/logout", function(req, res) {
    req.session.destroy(function(err) {
      res.status(200).send("Success");
    });
  });

  // Verify User
  router.get("/verify", User.verify);

  // Dashboard
  router.get("/dashboard/:user_id", isLoggedIn, User.dashboard);

  app.use('/', router);
};
