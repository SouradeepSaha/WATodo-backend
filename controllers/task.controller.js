const db = require("../models");
const Task = db.Tasks;
const Op = db.Sequelize.Op;

// Create and Save a new Task
exports.create = (req, res) => {
     // Validate request
    if (!req.body.task_name || !req.body.user_id) {
    res.status(400).send({
      message: "Some task information is missing!"
    });
    return;
    }

    // create a task
    const task = {
        MemberUserId: req.body.user_id,
        task_name: req.body.task_name,
        description: req.body.description,
        status: req.body.status,
        created: req.body.created,
        due_date: req.body.due_date,
        priority: req.body.priority
    };
    console.log(task);

    // Save Task in database
    Task.create(task)
    .then(() => {
      res.status(201).send({
        message:
          "Task created successfully."
      });;
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the task."
      });
    });

};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {

};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {

};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {

};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {

};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {

};
