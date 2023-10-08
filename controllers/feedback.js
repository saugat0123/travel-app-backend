const ErrorResponse = require("../utils/errorResponse");
const Feedback = require("../model/feedback");
const asyncHandler = require("../middleware/async");

exports.addFeedback = asyncHandler(async (req, res, next) => {
    const feedback = await Feedback.create(req.body);
  
    if (!feedback) {
      return next(new ErrorResponse("Error adding feedback"), 404);
    }
  
    res.status(201).json({
      success: true,
      data: feedback,
    });
  });