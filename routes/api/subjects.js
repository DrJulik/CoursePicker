const express = require("express");
const router = express.Router();

// @route   GET api/subjects
// @desc    Test route
// @access  Public
router.get("/", (req, res) => res.send("Subjects route"));

module.exports = router;
