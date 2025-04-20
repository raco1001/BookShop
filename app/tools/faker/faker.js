const express = require('express')
const router = express.Router()
const { faker } = require('@faker-js/faker')

router.route('/user').get((req, res) => {
  res.status(200).json({
    id: faker.string.uuid(),
    fullName: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    contact: faker.phone.number(),
  })
})

router.route('/users').get((req, res) => {
  const count = req.query.count
  const users = []
  for (let i = 0; i < count; i++) {
    users.push({
      id: faker.string.uuid(),
      fullName: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      contact: faker.phone.number(),
    })
  }
  res.status(200).json(users)
})

module.exports = router
