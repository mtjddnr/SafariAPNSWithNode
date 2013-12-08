var https = require('https');
var fs = require('fs');
var qs = require('querystring');

var options = { 
	key:    fs.readFileSync('private.key'),
	cert:   fs.readFileSync('certificate.crt'),
	ca:     fs.readFileSync('ComodoUTNSGCCA.crt'),
	requestCert:        true,
	rejectUnauthorized: false
};
https.createServer(options, callBack).listen(8000);

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
		break;
	}
		
	/* https://host/v1/devices/[deviceToken]/registrations/[websitePushID] */
	if (code == "devices" && commands[4] == "registrations") {
		var deviceToken = commands[3];
		var webId = commands[5];
		
		if (req.method == 'POST') {
			//add device into database
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
 
