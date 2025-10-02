const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const userRoute = require('./Router/UserRoute')
const FeedbackRoute = require('./Router/FeedbackRoute')
const app = express()
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
require('dotenv').config()


// connection
const dbconnect = async()=>{
    try{
        await mongoose.connect(process.env.Database)
        console.log("Database connected succesfully..!")
    }catch(error){
        console.log("Database connection error",error)
    }
}
dbconnect()
app.use('/api/user',userRoute)
app.use('/api/feedback',FeedbackRoute)
const port = process.env.PORT || 9000;
app.listen(port,()=>{
    console.log("Server running on Port :9000 successfully")
})
// app.use('/api/use')