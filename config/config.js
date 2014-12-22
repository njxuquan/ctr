//config info : ex redis/mongodb/mysql

//mongodb
var mongodb = require('mongoose');
var uri = 'mongodb://localhost/ctr';
mongodb.connect(uri);
module.exports.mongodb = mongodb;

//redis