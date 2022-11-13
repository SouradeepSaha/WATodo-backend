const member = require("../controllers/task.controller.js");
var router = require("express").Router();

module.exports = app => {
  // Member Signup
  router.post("/signup", member.signup);

  // Member Login
  router.get("/login", task.login);

  // Delete a Member with id
  router.delete("/:id", task.delete);

  app.use('/tasks', router);
};
