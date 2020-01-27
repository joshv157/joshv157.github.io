const express = require('express');
const router = express.Router();
const __dir = 'public';

const ImageSet = require('../models/image_set');
const Thumbnail = require('../models/thumbnail');
const one_day = 1000 * 60 * 60 * 24;
/* GET home page. */
router.get('/', function (req, res) {
	res.sendFile('index', {root: __dir});
});

router.get('/home', function (req, res) {
	if (!req.session.access) return res.redirect('/');

	let query = ImageSet.find({});
	query.sort({upload_date: 'ascending'});
	query.exec(function (err, result) {
		let date_iter = result[0].upload_date;
		let day_list = [{name: date_iter.toLocaleString(), set: []}];
		result.forEach(function (r) {
			if (!((r.upload_date - date_iter) / one_day < 1)) {
				date_iter = r.upload_date;
				day_list.push({name: date_iter.toLocaleString(), set: []});
			}
			day_list[day_list.length - 1]["set"].push({model_id: r._id, thumbnail: r.main_thumbnail});
		});
		res.render('home', {day: day_list});
	});
});

router.get('/model/:id', function (req, res) {
	ImageSet.findOne({_id: req.params.id}, function (err, image_set) {
		if (err || !image_set) {
			return res.status(404).json({status: "error", error: err ? err.toString() : "Image Set not found"});
		}
		res.render('model', {
			image_thumbnail: image_set.thumbnails,
			bio: image_set.bio,
			title: image_set.title
		});
	})
});

router.get('/thumbnail/:id', function (req, res) {
	Thumbnail.findOne({_id: req.params.id}, function (err, thumbnail) {
		if (err || !thumbnail) {
			return res.status(404).json({status: "error", error: err ? err.toString() : "Image not found"});
		}
		res.type("image/jpeg").send(Buffer.from(thumbnail.thumbnail));
	})
});

router.get('/full/:id', function (req, res) {
	Thumbnail.findOne({_id: req.params.id}, function (err, thumbnail) {
		if (err || !thumbnail) {
			return res.status(404).json({status: "error", error: err ? err.toString() : "Image not found"});
		}
		res.type("image/jpeg").send(Buffer.from(thumbnail.full));
	})
});

router.post('/check', function (req, res) {
	let pass = req.body.passcode;
	console.log(pass);
	if (pass === "Shelly") {
		req.session.access = true;
		res.json({success: true});
	} else {
		res.json({success: false})
	}
});

router.get(/(javascript)|(stylesheets)|(resources)/, function (req, res) {
	let i = req.path.search(/(javascript)|(stylesheets)|(resources)/);
	res.sendFile(req.path.substr(i), {root: __dir});
});

module.exports = router;
