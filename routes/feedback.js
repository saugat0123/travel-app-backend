const express = require("express");
const  router = express.Router();
const { protect } = require("../middleware/auth");

const {
    addFeedback
   } = require("../controllers/feedback");

router.post("/add/feedback", protect, addFeedback);

module.exports = router