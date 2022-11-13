const tag = require("../controllers/tag.controller.js");
var router = require("express").Router();

module.exports = app => {
  // Create a new Tag
  router.post("/", tag.create);

  // Retrieve all Tags
  router.get("/", tag.findAll);

  // Retrieve a single Tag with id
  router.get("/:id", tag.findOne);

  // Update a Tag with id
  router.put("/:id", tag.update);

  // Delete a Tag with id
  router.delete("/:id", tag.delete);

  app.use('/tags', router);
};