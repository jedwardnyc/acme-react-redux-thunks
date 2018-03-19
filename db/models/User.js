const { Sequelize } = require('../conn');
const conn = require('../conn');

const User = conn.define('user', {
  firstName: {
    allowNull: false,
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
    }
  },
  lastName: {
    allowNull: false,
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
    }
  },
  username: {
    type: Sequelize.STRING,
    unique: true,
  },
});

module.exports = User; 