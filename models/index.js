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

async function connectDB(){
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    connected = true;

    db.members = require("./member.model.js")(sequelize, DataTypes);
    db.tasks = require("./task.model.js")(sequelize, DataTypes);
    db.tags = require("./tag.model.js")(sequelize, DataTypes);

    db.tags.belongsToMany(db.tasks, { through: 'TagTask' });
    db.tags.belongsTo(db.members);

    db.tasks.belongsToMany(db.tags, { through: 'TagTask' });
    db.tasks.belongsTo(db.members);

    for(var i = 0; i < callbackList.length; i++){
      callbackList[i](db);
    }

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
connectDB();

module.exports = function(cb) {
  if(connected == true){
      cb(db);
  } else {
      callbackList.push(cb);
  }
}