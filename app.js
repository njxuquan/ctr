var restify = require('restify')
	,routes = require('./routes')
	,ads = require('./routes/ads')
	,config = require('./config/config');

var server = restify.createServer({
	name:'CTR restful server',
	version:'0.0.1'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser({
	mapParams:true
}));

//server.get(/^\/((.*)(\.)(.+))*$/, restify.serveStatic({directory:'public', default:"index.html"}));

/*
server.get(/^\/([a-zA-Z0-9_\.~-]+)\/(.*)\/(.*)/, function(req, res, next){
	console.log(req.params);
	res.send("testing......");
	next();
});
*/

server.post('/ads', ads.add);
server.del('/ads/:id', ads.del);
server.get('/ads/:id', ads.get);
server.get('/ads', ads.list);
server.put('/ads/:id/status/1', ads.resume);
server.put('/ads/:id/status/0', ads.suspend);
server.put('ads/:id/click', ads.click);

server.listen(3000, function(){
	console.log('%s listening at %s', server.name, server.url);
});