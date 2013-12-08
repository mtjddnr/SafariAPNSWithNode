var apns = require('apn');
var redis = require("redis");

var options = {
    cert: null,                  /* Certificate file path */
    certData: null,                   /* String or Buffer containing certificate data, if supplied uses this instead of cert file path */
    key:  null,                   /* Key file path */
    keyData: null,                    /* String or Buffer containing key data, as certData */
    passphrase: "",                 /* A passphrase for the Key file */
    ca: null,                         /* String or Buffer of CA data to use for the TLS connection */
    pfx: "certificate.p12",                        /* File path for private key, certificate and CA certs in PFX or PKCS12 format. If supplied will be used instead of certificate and key above */
    pfxData: null,                    /* PFX or PKCS12 format data containing the private key, certificate and CA certs. If supplied will be used instead of loading from disk. */
    gateway: 'gateway.push.apple.com', //'gateway.push.apple.com',/* gateway address */
    port: 2195,                       /* gateway port */
    rejectUnauthorized: true,         /* Value of rejectUnauthorized property to be passed through to tls.connect() */
    enhanced: true,                   /* enable enhanced format */
    errorCallback: undefined,         /* Callback when error occurs function(err,notification) */
    cacheLength: 100,                 /* Number of notifications to cache for error purposes */
    autoAdjustCache: true,            /* Whether the cache should grow in response to messages being lost after errors. */
    connectionTimeout: 0,              /* The duration the socket should stay alive with no activity in milliseconds. 0 = Disabled. */
    maxConnections: 10
};


var apnsConnection = new apns.Connection(options);

/***********************************************************************
 * Redis
 */
var redisClientSubscriber = redis.createClient(6379, 'localhost');
redisClientSubscriber.subscribe("push");


redisClientSubscriber.on("message", function(channel, message) {
	
	var queryObj = JSON.parse(message);
		
	//애플로 전송
	for (var i in queryObj.tokens) {
		var note = new apns.Notification();
		//note.device = device;
		
		note.alert = {
			"title": queryObj.title,
	        "body": queryObj.message
		};
		if (queryObj.action) {
			note.alert["action"] = queryObj.action;
		}
		
		if (queryObj["url-args"]) {
			note.urlArgs = queryObj["url-args"];
		}
		note.device = new apns.Device(queryObj.tokens[i]);
		
		note.trim();
		
		apnsConnection.sendNotification(note);	
	}
	
});


apnsConnection.on('connected', function() {
    console.log(" Connected");
});

apnsConnection.on('transmitted', function(notification, device) {
	var message = JSON.stringify(notification.compiledPayload);
	var messageLength = Buffer.byteLength(message, 'utf-8');
	
    console.log("Notification transmitted to:" + device.token.toString('hex') + ", Length: " + messageLength);
	console.log(notification.compiledPayload);
});

apnsConnection.on('transmissionError', function(errCode, notification, device) {
    console.error("Notification caused error: " + errCode + " for device ", device, notification);
});

apnsConnection.on('timeout', function () {
    console.log("Connection Timeout");
});

apnsConnection.on('disconnected', function() {
    console.log("Disconnected from APNS");
});

apnsConnection.on('socketError', console.error);