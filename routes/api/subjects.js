const express = require("express");
const router = express.Router();
const Subject = require("../../models/Subject");

// @route   GET api/subjects
// @desc    Test route
// @access  Public
router.get("/", async (req, res) => {
	try {
		const profiles = await Subject.find();
		res.json(profiles);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// @route    GET api/subjects/:id
// @desc     Get subjects by ID
// @access   Public
router.get("/:id", async (req, res) => {
	try {
		const subject = await Subject.findById(req.params.id);

		if (!subject) {
			return res.status(404).json({ msg: "Subject not found" });
		}

		res.json(subject);
	} catch (err) {
		console.error(err.message);
		if (err.kind === "ObjectId") {
			return res.status(404).json({ msg: "Subject not found" });
		}
		res.status(500).send("Server Error");
	}
});

module.exports = router;
