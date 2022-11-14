const db = require("../models");
const Tags = db.Tag;

// Create and Save a new tag
exports.create = (req, res) => {
 // Validate request
 if (!req.body.tag_name || !req.body.color || !req.body.user_id) {
    res.status(400).send({
      message: "Some tag information is missing!"
    });
    return;
  }

  // Create a tag
  const tag = {
    userId: req.body.user_id,
    tag_name: req.body.tag_name,
    color: req.body.color,    
  };

  // Save tag in the database
  Tags.create(tag)
    .then(() => {
      res.status(201).send({
        message:
          "Tag created successfully."
      });;
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the tag."
      });
    });
};

// Retrieve all tags of a user from the database.
exports.findAll = (req, res) => {
    const paramUserId = req.params.user_id;
  
    Tags.findAll({ where: {
        userId: paramUserId
    } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || `Some error occurred while retrieving ${queryUserId}'s tags.`
        });
      });
};

// Find a single tag with tag_id
exports.findOne = (req, res) => {
    const paramTagid = req.params.tag_id;

    Tags.findByPk(paramTagid)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find tag with id=${paramTagid}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with id=" + paramTagid
        });
      });
};

// // Update a Tutorial by the id in the request
// exports.update = (req, res) => {

// };

// Delete a tag with the specified tag_id in the request
exports.delete = (req, res) => {
    const paramTagid = req.params.tag_id;

    Tags.destroy({
      where: { tag_id: paramTagid }
    })
      .then(num => {
        if (num == 1) { // number of destroyed rows
          res.send({
            message: "Tag was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete tag with id=${paramTagid}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + paramTagid
        });
      });
};

// // Delete all Tutorials from the database.
// exports.deleteAll = (req, res) => {

// };

