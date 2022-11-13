const Member = require('./member.model')(sequelize)
const Tag = require('./tag.model')(sequelize)

module.exports = (sequelize, Sequelize) => {
  const Task = sequelize.define("Task", {
    task_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    task_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.ENUM,
      values: ['Completed', 'Not Started', 'In Progress'],
      default: 'Not Started'
    },
    due_date: {
      type: Sequelize.DATE
    },
    priority: {
      type: Sequelize.INTEGER,
      validate: {
        min: 1,
        max: 5
      }
    }
  });
  Task.belongsTo(Member);
  Task.belongsToMany(Tag, { through: 'TagTask' });

  return Task;
};