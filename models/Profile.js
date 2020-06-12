const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
	},
	location: {
		type: String,
	},
	major: {
		type: String,
		required: true,
	},
	bio: {
		type: String,
	},
	dob: {
		type: Date,
	},
	contact_info: {
		type: String,
	},
	courses: [
		{
			title: {
				type: String,
			},
			shortcode: {
				type: String,
			},
			department: {
				type: String,
			},
			credits: {
				type: Number,
			},
			course_director: {
				type: String,
			},
			description: {
				type: String,
				default: false,
			},
			available: {
				type: String,
			},
			sections: [
				{
					id: {
						type: Number,
					},
					code: {
						type: String,
					},
					time: {
						type: String,
					},
					professor: {
						type: String,
					},
					location: {
						type: String,
					},
				},
			],
		},
	],
	social: {
		twitter: {
			type: String,
		},
		facebook: {
			type: String,
		},
		linkedin: {
			type: String,
		},
		instagram: {
			type: String,
		},
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("profile", ProfileSchema);
