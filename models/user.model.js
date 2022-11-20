module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("User", {
    user_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isAlphanumeric: true
      }
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        is: /^[a-z ,.'-]+$/i
      }
    },
    verified: {
      type: Sequelize.BOOLEAN,
      default: false
    }
  });
  User.prototype.validatePassword = function (password) {
    return this.password === password;
  };
  return User;
};