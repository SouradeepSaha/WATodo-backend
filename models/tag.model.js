const { sequelize } = require('.');

const Member = require('./member.model')(sequelize)
const Task = require('./task.model')(sequelize)

module.exports = (sequelize, Sequelize) => {
  const Tag = sequelize.define("Tag", {
    tag_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    tag_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    color: {
      type: Sequelize.STRING(6),
      default: "ffffff"
    },
  });
  Tag.belongsTo(Member, {foreignKey: "userId"});
  Tag.belongsToMany(Task, { through: 'TagTask' });

  return Tag;
};