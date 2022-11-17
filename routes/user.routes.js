const user = require("../controllers/task.controller.js");
var router = require("express").Router();

module.exports = app => {
  // User Signup
  router.post("/signup", user.signup);

  // User Login
  router.get("/login", user.login);

  // Delete a User with id
  router.delete("/:id", user.delete);

  app.use('/user', router);
};
