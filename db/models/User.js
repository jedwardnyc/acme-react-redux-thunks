const { Sequelize } = require('../conn');
const conn = require('../conn');

const User = conn.define('user', {
  firstName: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
    }
  },
  lastName: {
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