const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema(
    {
        name : {
            type : String,
        },
        subject : {
            type : String,
        },
    
        message: {
            type: String,
            }
    }
);

module.exports = mongoose.model("Feedback",FeedbackSchema);
