var https = require('https');
var fs = require('fs');
var qs = require('querystring');
var redis = require("redis");

var options = { 
	key:    fs.readFileSync('https_private.key'),
	cert:   fs.readFileSync('https_certificate.crt'),
	ca:     fs.readFileSync('https_ComodoUTNSGCCA.crt'),
	requestCert:        true,
	rejectUnauthorized: false
};
https.createServer(options, callBack).listen(443);
var redisClient = redis.createClient(6379, 'localhost');

function callBack(req, res) {  
	var commands = req.url.split("/");
	console.log(req.socket.remoteAddress + " : " + req.method + " " + req.url);
	
	if (commands[1] != 'v1') {		
		res.writeHead(404);
		res.end();
		return;
	}
	
	
	var code = commands[2];
	
	/* https://host/v1/pushPackages/[WebId]  */
	if (code == "pushPackages") {
		var path = __dirname + "/pushPackages.zip";
		if (fs.existsSync(path) == false) {
			res.writeHead(404);
			res.end();
			return;
		} 
			
		fs.readFile(path, function(error, data){
			res.writeHead(200, { 'Content-Type' : 'application/zip'});
			res.end(data);
		});
	
		return;
	}
	
	/* https://host/v1/log */
	if (code == "log") {
		console.log(req.headers);
		var body = '';
		req.on('data', function (data) {
			body += data;
		});
		req.on('end', function () {
			var POST = qs.parse(body);
			console.log(POST);

			res.writeHead(200);
			res.end();
		});
		return;	
	}
		
	/* https://host/v1/devices/[deviceToken]/registrations/[websitePushID] */
	if (code == "devices" && commands[4] == "registrations") {
		var deviceToken = commands[3];
		var webId = commands[5];
		
		if (req.method == 'POST') {
			//add device into database
							  	
			  	var data = {
					tokens: [ deviceToken ],
					title: "Title",
					message: "Hello world",
					action: "View",
					"url-args": [""]
				};
				
				redisClient.publish("push", JSON.stringify(data));
				
		} else if (req.method == 'DELETE') {
			//delete device info from database
		}
		res.writeHead(200);
		res.end();
		return;
	}	
	
	res.writeHead(404);
	res.end();
	
}
 
