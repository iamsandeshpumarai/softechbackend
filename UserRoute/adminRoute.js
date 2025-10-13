const express = require('express')
const {Userdetails,AdminPanel,AdminChecker, AdminLogout} = require('../Controller/AdminController')
const adminMiddleware = require('../middleware/Middleware')
const Router = express.Router()

Router.post('/adminlogin',AdminPanel)
Router.get('/userdata',Userdetails)
Router.get('/check',adminMiddleware,AdminChecker)
Router.get('/logout',AdminLogout)

module.exports = Router