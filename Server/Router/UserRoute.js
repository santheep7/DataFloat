const express = require('express')
const { signin, signup, getUserCount } = require('../Controller/UserController')
const userRoute = express.Router()
userRoute.post('/Login',signin)
userRoute.post('/Register',signup)
userRoute.get('/count',getUserCount)

module.exports = userRoute