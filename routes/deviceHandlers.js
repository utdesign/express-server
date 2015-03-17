var express = require('express');
var router = express.Router();
var fs = require('fs');

/* 
 * GET 
 */
router.get('/:id', function(req, res, next) {
	var id = req.params.id;
	var title = "Device " + id+ ": TI CC3200 Launchpad";
	var host_name = req.hostname;

	var command_label = "Enter a command: ";

	//var image_link = req.protocol + "://" +host_name + ":3000/images/" + "launchpad-cc3200-launchxl-thumb2.png";
	var image_link = req.protocol + "://" +host_name + ":3000/images/" + "cc3200lppinmap.jpg";

	res.render('device_template', { title: title, id:id, image_link:image_link, command_label: command_label});
});

/*
 * AJAX calls to get texts
 */
router.get('/:id/getText', function(req, res, next) {
	var id = req.params.id;
	var host_name = req.hostname;
	if (req.query.hasOwnProperty("command")){
		var parameters = req.query.command;
		var tcp_to_http_file = "my_file2.txt";
		var writestream = fs.createWriteStream("files/" + tcp_to_http_file);
		writestream.once('open', function(fd) {
			writestream.write(parameters);
			writestream.end();
		});
	}
	
	var text_data = "";
	
	fs.watchFile('files/my_file.txt', function (curr, prev) {
		var http_to_tcp_file = "my_file.txt";
		var readstream = fs.createReadStream("files/" + http_to_tcp_file);

		readstream.on('data', function(data){
			text_data +=data;
		});

		readstream.on('end', function(data){
			var texts = text_data.split("\r");
			if (!res.headersSent) 
				res.send(texts[texts.length-2]);
			res.end();
		});
	});
});

module.exports = router;