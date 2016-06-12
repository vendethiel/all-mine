var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
	content: String,
	user_id: String,
	username: String,
	article_id: String,
	date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', commentSchema);