var express = require('express');
var router = express.Router();
var fs = require('fs');
var net = require('net');
var serverIP = '192.168.0.8';
var serverPort = 1337;

/** 
 * GET id Response
 */
router.get('/:id', function(req, res, next) {
	
	var text_data = "";

	/* Check the MAC Address of the device */
	var readstream = fs.createReadStream("files/MAC.txt");

	readstream.on('data', function(data){
		text_data += data;
	});

	readstream.on('end', function(data){
		var texts = text_data.split("\n");
		
		if (contains(texts, req.params.id)){
			/* Process the HTTP request */
			var id = req.params.id;
			var title = "Device " + id+ ": TI CC3200 Launchpad";
			var host_name = req.hostname;
			var command_label = "Enter a command: ";
			
			var image_link = req.protocol + "://" + host_name + ":3000/images/" + "cc3200lppinmap.jpg";

			res.render('device_template', { title: title, id:id, image_link:image_link, command_label: command_label});
		}
	});
});

/**
 * AJAX calls to send commands to the devices and get values
 */
 
router.get('/:id/getText', function(req, res, next) {
	
	var serverSocket = new net.Socket();
	
	/* Creating new Socket connecting to the TCP Server */		
	serverSocket.connect(serverPort,serverIP,function(){});
	
	/* Reading commands and writing to the socket */
	var id = req.params.id;
	var host_name = req.hostname;
	
	if (req.query.hasOwnProperty("command")) {
		var parameters = req.query.command;
		var text_data = "";
		
		/* Write the MAC Address of the device so that the TCP will recognize this device */
		//serverSocket.write("MAC HTTP " + id);		
		/* Process the command */
		
		if (parameters=='gph 6'){	// If this is the graphing command
			
			var dataArray = [];
				
			serverSocket.write("HTTP\r" + id + "\r" + parameters);
			serverSocket.on("data", function(data){
				text_data += data + "\n";
				
				var texts = text_data.split("\n");
				//console.log(texts);
				var msg = "";
				
				if (texts.length >= 2){				// If the data are all received
					text_data = "";					// Reset the text data
					msg = texts[texts.length-2];
					dataArray[dataArray.length] = {key: msg};
				}
				
				if (dataArray.length == 400){	// Receive 400 samples
					var dataArrayJSON = JSON.stringify(dataArray);
					
					if (!res.headerSent){
						res.send(dataArrayJSON);
						res.end();
					}
					serverSocket.write('HTTP\r' + id + '\rendg');	// End the graphing
					//serverSocket.end();
				}
			});
		}
		else {
			//serverSocket.setKeepAlive(false, 1000)
			// Writing to the socket
			//parameters = parameters.replace(" ", "\r");
			serverSocket.write("HTTP\r" + id + "\r" + parameters);

			// Getting the data from the socket
			serverSocket.on("data", function(data){
				text_data += data;
				if (!res.headerSent) 
					res.send(text_data);
				/*
				var texts = text_data.split("\r");
				console.log("DATA FROM HTTP" + texts);
				if (texts.length >= 2){					// If the data are all received
					text_data = ""; 					// Reset the text data
					res.send(texts[texts.length-2]);	// Send the text to the client
					//serverSocket.destroy();				// Destroy this socket
				}*/
			});
		}
	}
});

function convertHexToChars(hexBuffer){
	var msg = hexBuffer.toString('ascii');
	return msg;
}

function contains(a, obj) {
    var i = a.length;
    while (i--) {
       if (a[i] === obj) {
           return true;
       }
    }
    return false;
}

module.exports = router;