const User = require("../controllers/task.controller.js");
var router = require("express").Router();

module.exports = app => {
  // User Signup
  router.post("/signup", User.signup);

  // User Login
  router.get("/login", User.login);

  // User Logout
  router.get("/logout", User.logout);

  // Delete a User with id
  router.delete("/:id", User.delete);

  app.use('/user', router);
};
