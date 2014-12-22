//ads model
var AdsModel = function(){};
module.exports = new AdsModel();

//get mongodb obj from config
var config = require('./../config/config.js');
var mongodb = config.mongodb

//init ad schema & model
var adSchema = new mongodb.Schema({
	content: {
		title: String,
		desc: String,
		url: String
	},
	taglist: Array,
	zone: Number,
	totalpv: Number,
	lastpvlist: Array,
	status: Number,
	ctr: Number
});
var adModel = mongodb.model('Ad', adSchema, 'Ad');

//add a new ad into mongodb
AdsModel.prototype.add = function(obj, callback) {
	/*
	process.nextTick(function(){
		var results = obj;
		//if (err) {
		//	return callback(err);
		//}
		callback(null, results);
	})
	*/
	adModel.create({
		content: {
			title: 'my first ad',
			desc: 'nodejs and mongodb',
			url: 'www.github.com'
		},
		taglist: ['nodejs','mongodb','restful'],
		zone: 100,
		totalpv: 0,
		lastpvlist: [0,0,0,0,0],
		status: 1,
		ctr: 0
	}, function(err, doc) {
		if (err) {
			return callback(err);
		}
		callback(null, doc);
	});
}

//del a ad from mongodb
AdsModel.prototype.del = function(obj, callback) {
	adModel.remove({
		_id: obj.id
	}, function(err, doc) {
		if (err) {
			return callback(err);
		}
		callback(null, 'del ok');
	});
}

//get a ad from mongodb
AdsModel.prototype.get = function(obj, callback) {
	adModel.find({
		_id: obj.id
	}, function(err, doc) {
		if (err) {
			return callback(err);
		}
		callback(null, doc);
	});
}