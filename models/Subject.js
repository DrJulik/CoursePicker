const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	shortcode: {
		type: String,
	},
	department: {
		type: String,
	},

	courses: [
		{
			id: {
				type: String,
			},
			title: {
				type: String,
			},
			shortcode: {
				type: String,
			},
			credits: {
				type: String,
			},
		},
	],
});

module.exports = mongoose.model("subject", SubjectSchema);
