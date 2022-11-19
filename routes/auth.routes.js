var router = require("express").Router();

module.exports = app => {

  // User Signup
  router.post("/signup", passport.authenticate('local-signup', {
    successRedirect: '/dashboard',
    failureRedirect: '/signup'
    }
  ));

  router.post("/login", passport.authenticate('local-signin', {
    successRedirect: '/dashboard',
    failureRedirect: '/signin'
  }
  ));

  // User Logout
  router.get("/logout", User.logout);

  // Delete a User with id
  router.delete("/:id", User.delete);

  app.use('/', router);
};
