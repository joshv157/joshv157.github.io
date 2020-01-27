const mongoose = require('mongoose');
const shortid = require('shortid');
const Schema = mongoose.Schema;

const imageSetSchema = new Schema({
	_id: {type: String, default: shortid.generate},
	title: String,
	thumbnails: [String],
	main_thumbnail: String,
	bio: String,
	upload_date: Date
});

module.exports = mongoose.model('ImageSet', imageSetSchema);