const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB, process.env.USER, process.env.PASSWORD, {
  host: process.env.DBHOST,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, DataTypes);
db.tasks = require("./task.model.js")(sequelize, DataTypes);
db.tags = require("./tag.model.js")(sequelize, DataTypes);


db.tags.belongsToMany(db.tasks, { through: 'TagTasks' });
db.tags.belongsTo(db.users);

db.tasks.belongsToMany(db.tags, { through: 'TagTasks' });
db.tasks.belongsTo(db.users);

module.exports = db;