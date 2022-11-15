module.exports = (sequelize, Sequelize) => {
const TagTask = sequelize.define('TagTask', {});
    return TagTask;
};

// can be deleted in the end, tried this to see if we can access through table but did not work
