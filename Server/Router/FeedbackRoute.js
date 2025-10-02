const express = require('express')
const { getAllFeedback, getFeedbackByUser, createFeedback, getSentimentSummary } = require('../Controller/FeedbackController')
const verifyToken = require('../Auth/Jsonwebtoken')
const FeedbackRoute = express.Router()
FeedbackRoute.get('/getall',getAllFeedback)
FeedbackRoute.get('/getbyuser',getFeedbackByUser)
FeedbackRoute.post('/createfeedback',verifyToken,createFeedback)
FeedbackRoute.get('/summary',getSentimentSummary)

module.exports = FeedbackRoute