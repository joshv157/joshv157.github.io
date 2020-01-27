const mongoose = require('mongoose');
const shortid = require('shortid');
const Schema = mongoose.Schema;

const thumbnailSchema = new Schema({
	_id: {type: String, default: shortid.generate},
	thumbnail: Buffer,
	full: Buffer
});

module.exports = mongoose.model('Thumbnail', thumbnailSchema);