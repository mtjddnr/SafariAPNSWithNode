var fs = require('fs');
var crypto = require('crypto');
var execSync = require("exec-sync");
var rimraf = require('rimraf');
    
/////////////////////////////////////////////

var websiteName = "Back to the Mac";
var websitePushID = "web.com.tistory.macnews";
var allowedDomains = [
	"http://macnews.tistory.com"
];
var webServiceURL = "https://mini.smoon.kr";
var urlFormatString = "http://macnews.tistory.com/%@";

var certP12 = "certificate.p12";
var certPasswd = ""; //p12 password

/////////////////////////////////////////////

var raw_files = [
        'icon.iconset/icon_16x16.png',
        'icon.iconset/icon_16x16@2x.png',
        'icon.iconset/icon_32x32.png',
        'icon.iconset/icon_32x32@2x.png',
        'icon.iconset/icon_128x128.png',
        'icon.iconset/icon_128x128@2x.png'
];

var website = {
  "websiteName" : websiteName,
  "websitePushID" : websitePushID,
  "allowedDomains" : allowedDomains,
  "urlFormatString" : urlFormatString,
  "authenticationToken" : "51c799bcbf18289ee31ff2cbfe4afcd53f71f909", //any token to auth user
  "webServiceURL" : webServiceURL 
}

var manifest = {};

var path = __dirname + '/pushPackages';

if (fs.existsSync(path)) {
	rimraf.sync(path);
}

console.log("mkdir " + path);
fs.mkdirSync(path);
console.log("mkdir icon.iconset");
fs.mkdirSync(path + "/icon.iconset");


for (var i in raw_files) {
	console.log(raw_files[i]);
	execSync("cp '" + __dirname + '/' + raw_files[i] + "' '" + path + '/' + raw_files[i] + "'", true);
}

console.log("website.json");
fs.writeFileSync(path + '/website.json', JSON.stringify(website));

console.log("manifest.json");
raw_files.push("website.json");
for (var i in raw_files) {
	var file = raw_files[i];
	var sha1 = crypto.createHash('sha1');
	sha1.update(fs.readFileSync(path + '/' + file), 'binary');
	manifest[file] = sha1.digest('hex');
}

fs.writeFileSync(path + '/manifest.json', JSON.stringify(manifest));


execSync("openssl pkcs12 -in '" + certP12 + "' -nocerts -out 'private.pem' -passin pass:" + certPasswd + " -passout pass:" + certPasswd, true);
execSync("openssl pkcs12 -in '" + certP12 + "' -clcerts -nokeys -out 'cert.pem' -passin pass:" + certPasswd, true);

execSync("openssl smime -binary -sign -certfile AppleWWDRCA.pem -signer cert.pem -inkey private.pem -in '" + path + "/manifest.json' -out '" + path + "/signature' -outform DER -passin pass:" + certPasswd, true);



/////

raw_files.push("manifest.json");
raw_files.push("signature");

if (fs.existsSync(path + ".zip")) {
	fs.unlink(path + ".zip");
}


var archiver = require('archiver');
var output = fs.createWriteStream(path + ".zip");
var archive = archiver('zip');

archive.pipe(output);

console.log("building Package");
for (var i in raw_files) {
	var file = raw_files[i];
	archive.append(fs.createReadStream(path + "/" + file), { name: file });
}

archive.finalize(function(err, bytes) {
	if (err) {
		throw err;
	}
	
	console.log(bytes + ' total bytes');
	
	fs.unlink("cert.pem");
	fs.unlink("private.pem");
	rimraf.sync(path);
});

