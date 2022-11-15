const dbConfig = require("../config/db.config.js");

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

var connected = false, callbackList = [];
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.members = require("./member.model.js")(sequelize, DataTypes);
db.tasks = require("./task.model.js")(sequelize, DataTypes);
db.tags = require("./tag.model.js")(sequelize, DataTypes);
// db.tagtasks = require("./TagTask.model.js")(sequelize, DataTypes); // tried this to see if we can access through table, but didn't work


db.tags.belongsToMany(db.tasks, { through: 'TagTask' });
db.tags.belongsTo(db.members);

db.tasks.belongsToMany(db.tags, { through: 'TagTask' });
db.tasks.belongsTo(db.members);

module.exports = db;