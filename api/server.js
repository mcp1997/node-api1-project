// BUILD YOUR SERVER HERE
const express = require('express')
const User = require('./users/model')

const server = express()
server.use(express.json())

server.get('/api/users', (req, res) => {
  User.find()
    .then(users => {
      res.json(users)
    })
    .catch(err => {
      res.status(500).json({
        message: 'error getting users',
        err: err.message,
        stack: err.stack
      })
    })
})

server.get('/api/users/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if(!user) {
        res.status(404).json({
          message: "The user with the specified ID does not exist",
        })
      } else {
        res.json(user)
      }
    })
    .catch(err => {
      res.status(500).json({
        message: 'error getting user',
        err: err.message,
        stack: err.stack
      })
    })
})

server.post('/api/users', (req, res) => {
  const newUser = req.body
  if(!newUser.name || !newUser.bio) {
    res.status(400).json({
      message: 'Please provide name and bio for the user'
    })
  } else {
    User.insert(newUser)
      .then(user => {
        res.status(201).json(user)
      })
      .catch(err => {
        res.status(500).json({
          message: 'error creating user',
          err: err.message,
          stack: err.stack
        })
      })
  }
})

server.delete('/api/users/:id', (req, res) => {
  User.remove(req.params.id)
    .then(user => {
      if(!user) {
        res.status(404).json({
          message: "The user with the specified ID does not exist"
        })
      } else {
        res.json(user)
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "error deleting user",
        err: err.message,
        stack: err.stack
      })
    })
})

server.put('/api/users/:id', (req, res) => {
  const updatedUser = req.body
  if(!updatedUser.name || !updatedUser.bio) {
    res.status(400).json({
      message: 'Please provide name and bio for the user'
    })
  } else {
    User.update(req.params.id, updatedUser)
    .then(user => {
      if(!user) {
        res.status(404).json({
          message: "The user with the specified ID does not exist",
        })
      } else {
        res.json(user)
      }
    })
    .catch(err => {
      res.status(500).json({
        message: 'error updating user',
        err: err.message,
        stack: err.stack
      })
    })
  }
})

server.use('*', (req, res) => {
  res.status(404).json({
    message: 'not found'
  })
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
