const conn = require('./conn');
const User = require('./models/User');
const faker = require('faker');

const syncAndSeed = () => {
  conn.sync({force: true})
    .then(()=>{
      return Promise.all([
        User.create({firstName: 'Jacob', lastName: 'Rico', username: faker.internet.userName('Jacob',"Rico")}),
        User.create({firstName: 'John', lastName: 'Doe', username: faker.internet.userName('John', 'Doe')}),
        User.create({firstName: 'Peter', lastName: 'Parker', username: 'DefintelyxNOTxSpiderman'}),
      ])
    })
}

module.exports = {
  syncAndSeed,
  User
}

