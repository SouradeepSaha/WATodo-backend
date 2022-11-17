const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

// User signup
exports.signup = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
};

// User login
exports.login = (req, res) => {

};


// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const user_id = req.params.id;

  Member.destroy({
    where: { user_id: user_id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          message: "Member deleted"
        });
      } else { // Code should not reach here
        res.status(500).send({
          message: `Cannot delete member with user_id=${user_id}. Maybe member was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Member with id=" + user_id
      });
    });
};
