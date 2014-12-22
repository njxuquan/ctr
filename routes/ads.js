//ads controller : validate params/ construction return data

var restify = require('restify');
var adsModel = require('./../models/ads.js');

//add a new ad 
exports.add = function(req, res, next) {
	//validate
	var count = 0;
	for (var i in req.params) {
		count++;
	};
	if (count == 0) {
		return next(new restify.InvalidArgumentError('请求数据不合法'));
	};

	//model method
	adsModel.add(req.params, function(err, retObj) {
		if (err) {
			//TODO : overload owner error util
			return next(new restify.InvalidArgumentError('写入出错'));
		} else{
			//construction return data
			res.status(201);
			res.send(retObj);
		};
	});
};

//del ad
exports.del = function(req, res, next) {
	//validate
	if (req.params.id == '') {
		return next(new restify.InvalidArgumentError('请求数据不合法'));
	};

	//call model method
	adsModel.del(req.params, function(err, retObj) {
		if (err) {
			//TODO : overload owner error util
			return next(new restify.InvalidArgumentError('删除出错')); 
		} else{
			res.status(200);
			res.send(retObj);
		};
	});
};

exports.get = function(req, res, next) {
	//validate
	if (req.params.id == '') {
		return next(new restify.InvalidArgumentError('请求数据不合法'));
	};

	//call model method
	adsModel.get(req.params, function(err, retObj) {
		if (err) {
			//TODO : overload owner error util
			return next(new restify.InvalidArgumentError('查询出错')); 
		} else{
			console.log(retObj);
			var count = 0;
			for (var i in retObj) {
				count++;
			};
			if (count == 0) {
				res.status(204);
				res.send('no data');
			} else {
				res.status(200);
				res.send(retObj);
			};
		};
	});
}

exports.list = function(req, res, next) {
	res.send(req.params);
}

exports.resume = function(req, res, next) {
	console.log(req.params);
	res.send(req.url);
}

exports.suspend = function(req, res, next) {
	res.send(req.params);
}

exports.click = function(req, res, next) {
	res.send(req.params);
}
