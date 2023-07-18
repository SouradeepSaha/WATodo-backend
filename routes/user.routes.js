const User = require("../controllers/user.controller");
var router = require("express").Router();

module.exports = app => {
  // Delete a User with id
  router.delete("/:id", User.delete);

  app.use('/user', router);
};
