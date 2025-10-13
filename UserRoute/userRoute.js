const express = require('express')
const {userData,deleteUser} = require('../Controller/UserController.js')
const Router = express.Router()

Router.post('/user',userData)
Router.delete('/user/:id',deleteUser)

module.exports = Router