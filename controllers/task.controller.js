const db = require("../models");
const Task = db.Tasks;
const Op = db.Sequelize.Op;

console.log('Hello World!')
// Create, Delete, Update, Find One, Find all

// Create and Save a new Task
exports.create = (req, res) => {
     // Validate request
     // check for null values too? "!due_date"?
    if (!req.body.task_name || !req.body.user_id || req.body.description || req.body.status || req.body.created || req.body.due_date || req.body.priority) {
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
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the task."
      });
    });

};

// List of all tasks embedded with users
exports.findAll = async (req, res) => {
    const paramUserId = req.params.user_id;
    console.log(paramUserId);

    try {
      const taskIds = await db.sequelize.query(`
        select distinct task_id, task_name, description, status, created, due_date, priority from Tasks
        where MemberUserId = ${paramUserId}`
      );
      console.log("taskIds:", taskIds);

      const taskIdsPrimmed = taskIds[0];

      let response = [];
      
      for(let i = 0; i < tagIdsPrimmed.length; i++) {
        const taskIds = await db.sequelize.query(`
          select TaskTaskId from TagTask
          where TaskTagId = ${tagIdsPrimmed[i]["task_id"]}      
        `, { type: QueryTypes.SELECT });
        response.push({
          task_id: taskIdsPrimmed[i]["tag_id"],
          task_name: taskIdsPrimmed[i]["task_name"],
          description: taskIdsPrimmed[i]["description"],
          status: taskIdsPrimmed[i]["status"],
          created: taskIdsPrimmed[i]["created"],
          due_date: taskIdsPrimmed[i]["due_date"],
          priority: taskIdsPrimmed[i]["priority"],
          tasks: taskIds
        })
      }

      res.send(response);
    } catch(err) {      
        res.status(500).send({
          message:
            err.message || `Some error occurred while retrieving ${paramUserId}'s tasks.`
        });
    }
};

// Find a single Task with a task_id
exports.findOne = (req, res) => {
  const paramTaskid = req.params.task_id;

  Task.findByPk(paramTaskid)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Task with task_id=${paramTaskid}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Task with task_id=" + paramTaskid
      });
    });
};

// Update a task by the id in the request
exports.update = (req, res) => {
  const task_id = req.params.task_id;

  Task.update(req.body, {
    where: { task_id: task_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Task was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Task with task_id=${task_id}. Maybe task was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating task with id=" + task_id
      });
    });
};

// Delete a task with the specified task_id in the request
exports.delete = (req, res) => {
    const paramTaskid = req.params.task_id;

    Task.destroy({
      where: { task_id: paramTaskid }
    })
      .then(num => {
        if (num == 1) { // number of destroyed rows
          res.send({
            message: "Task was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete task with id=${paramTaskid}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Task with id=" + paramTaskid
        });
      });
};

