var mongoose = require('mongoose');

var articleSchema = new mongoose.Schema({
	title: String,
	content: String,
	user_id: String,
	date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Article', articleSchema);