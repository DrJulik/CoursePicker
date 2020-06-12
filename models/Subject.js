const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
	id: {
		type: Number,
		required: true,
	},
	title: {
		type: String,
		required: true,
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
