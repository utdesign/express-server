var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
	var title = "Welcome to TI Energy Conservation Project";	
	res.render('index', { title: title });
});
/*
router.get('/getConnectedDevice', function(req, res, next) {

	var text_data = "";
	
	fs.watchFile('files/MAC.txt', function (curr, prev) {
		var readstream = fs.createReadStream("files/MAC.txt");

		readstream.on('data', function(data){
			text_data += data;
		});

		readstream.on('end', function(data){
			var texts = text_data.split("\n");
			
			texts.forEach(function(d){
				d = "device/" + d;
			});
			
			if (!res.headersSent) 
				res.send(texts);
			res.end();
		});
	});
	
	res.render('index', { title: title });
});*/

module.exports = router;
