const express = require('express')
const {Userdetails,AdminPanel,AdminChecker} = require('../Controller/AdminController')
const adminMiddleware = require('../middleware/Middleware')
const Router = express.Router()

Router.post('/adminlogin',AdminPanel)
Router.get('/userdata',Userdetails)
Router.get('/check',adminMiddleware,AdminChecker)

module.exports = Router
