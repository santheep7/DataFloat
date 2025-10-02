const Feedback = require("../Models/Feedback");
const User = require('../Models/User')
const Sentiment = require("sentiment"); 
const sentiment = new Sentiment();

const createFeedback = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const userId = req.user.id; 

    if (rating == null || !comment || !comment.trim()) {
      return res.status(400).json({ message: "Rating and Comment are required" });
    }

    //sentiment
    const analysis = sentiment.analyze(comment);
    let sentimentLabel = "Neutral";
    if (analysis.score > 0) sentimentLabel = "Positive";
    else if (analysis.score < 0) sentimentLabel = "Negative";

    const newFeedback = new Feedback({
      userId,
      rating,
      comment,
      sentiment: sentimentLabel,
    });

    await newFeedback.save();
    res.status(201).json({ message: "Feedback submitted", feedback: newFeedback });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate("userId", "name email");
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFeedbackByUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const feedbacks = await Feedback.find({ userId });
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getSentimentSummary = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    let positive = 0, neutral = 0, negative = 0;

    feedbacks.forEach(f => {
      if (f.sentiment === "Positive") positive++;
      else if (f.sentiment === "Neutral") neutral++;
      else if (f.sentiment === "Negative") negative++;
    });

    let overall = "Neutral";
    if (positive > negative && positive > neutral) overall = "Positive";
    else if (negative > positive && negative > neutral) overall = "Negative";

    res.status(200).json({
      positive,
      neutral,
      negative,
      totalFeedbacks: feedbacks.length,
      overall
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createFeedback, getAllFeedback, getFeedbackByUser,getSentimentSummary };
