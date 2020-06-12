const express = require("express");
const axios = require("axios");
const config = require("config");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
// bring in normalize to give us a proper url, regardless of what user entered
// const normalize = require("normalize-url");
const checkObjectId = require("../../middleware/checkObjectId");

const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Post = require("../../models/Post");

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get("/me", auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.user.id,
		}).populate("user", ["name", "avatar"]);

		if (!profile) {
			return res.status(400).json({ msg: "There is no profile for this user" });
		}

		res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post(
	"/",
	[auth, [check("major", "Major is required").not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const {
			courses,
			location,
			bio,
			major,
			dob,
			contact_info,
			twitter,
			instagram,
			linkedin,
			facebook,
		} = req.body;

		const profileFields = {
			user: req.user.id,
			location,
			bio,
			major,
			courses,
			dob,
			contact_info,
		};

		// Build social object and add to profileFields
		const socialfields = { twitter, instagram, linkedin, facebook };

		// for (const [key, value] of Object.entries(socialfields)) {
		// 	if (value && value.length > 0)
		// 		socialfields[key] = normalize(value, { forceHttps: true });
		// }
		profileFields.social = socialfields;

		try {
			// Using upsert option (creates new doc if no match is found):
			let profile = await Profile.findOneAndUpdate(
				{ user: req.user.id },
				{ $set: profileFields },
				{ new: true, upsert: true }
			);
			res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server Error");
		}
	}
);

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
router.get("/", async (req, res) => {
	try {
		const profiles = await Profile.find().populate("user", ["name", "avatar"]);
		res.json(profiles);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get(
	"/user/:user_id",
	checkObjectId("user_id"),
	async ({ params: { user_id } }, res) => {
		try {
			const profile = await Profile.findOne({
				user: user_id,
			}).populate("user", ["name", "avatar"]);

			if (!profile) return res.status(400).json({ msg: "Profile not found" });

			return res.json(profile);
		} catch (err) {
			console.error(err.message);
			return res.status(500).json({ msg: "Server error" });
		}
	}
);

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete("/", auth, async (req, res) => {
	try {
		// Remove user posts
		await Post.deleteMany({ user: req.user.id });
		// Remove profile
		await Profile.findOneAndRemove({ user: req.user.id });
		// Remove user
		await User.findOneAndRemove({ _id: req.user.id });

		res.json({ msg: "User deleted" });
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// @route    PUT api/profile/courses
// @desc     Add profile courses
// @access   Private
router.put("/courses", auth, async (req, res) => {
	const {
		title,
		shortcode,
		department,
		credits,
		course_director,
		description,
		available,
		sections,
	} = req.body;

	const newCourse = {
		title,
		shortcode,
		department,
		credits,
		course_director,
		description,
		available,
		sections,
	};

	try {
		const profile = await Profile.findOne({ user: req.user.id });

		profile.courses.unshift(newCourse);

		await profile.save();

		res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

router.delete("/courses/:course_id", auth, async (req, res) => {
	try {
		const foundProfile = await Profile.findOne({ user: req.user.id });

		foundProfile.courses = foundProfile.courses.filter(
			(course) => course._id.toString() !== req.params.course_id
		);

		await foundProfile.save();
		return res.status(200).json(foundProfile);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ msg: "Server error" });
	}
});

module.exports = router;
