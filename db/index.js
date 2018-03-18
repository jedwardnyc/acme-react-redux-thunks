const conn = require('./conn');
const User = require('./models/User');
const faker = require('faker');

const syncAndSeed = () => {
  conn.sync({force: true})
    .then(()=>{
      return Promise.all([
        User.create({firstName: 'Jacob', lastName: 'Rico', username: faker.internet.userName('Jacob',"Rico")}),
        User.create({firstName: faker.name.firstName(), lastName: faker.name.lastName(), username: faker.internet.userName()}),
        User.create({firstName: faker.name.firstName(), lastName: faker.name.lastName(), username: faker.internet.userName()}),
        User.create({firstName: faker.name.firstName(), lastName: faker.name.lastName(), username: faker.internet.userName()}),
      ])
    })
}

module.exports = {
  syncAndSeed,
  User
}

