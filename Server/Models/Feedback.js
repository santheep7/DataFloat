const mongoose = require('mongoose')
const FeedbackSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    rating:{
        type:Number,
        min:0,
        max:5,
        required:true,
    },
    comment:{
        type:String,
        required:true,
    },
    sentiment:{
        type:String,
        enum:["Positive","Negative","Neutral"],
         required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    }
})
module.exports = mongoose.model("Feedback", FeedbackSchema);
