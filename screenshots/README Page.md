Safari Apple Push Notification Service With Node
==================
[한국어[Korean]](https://github.com/mtjddnr/SafariAPNSWithNode/wiki/Home-Korean)

Documentation 
* [Notification Programming Guide for Websites](https://developer.apple.com/library/mac/documentation/NetworkingInternet/Conceptual/NotificationProgrammingGuideForWebsites/PushNotifications/PushNotifications.html)

Preparation
* Apple Developer Account
* [AppleWWDRCA.cer](https://developer.apple.com/certificationauthority/AppleWWDRCA.cer)
* Icon Image files
 
##Step 1. Register Website Push ID
1. Visit https://developer.apple.com/devcenter/ios/index.action or https://developer.apple.com/devcenter/mac/index.action

2. Certificates, Identifiers & Profiles Page

3. Website Push IDs

 ![1 1](https://f.cloud.github.com/assets/581101/1700968/d16dbbdc-6038-11e3-89e9-85bc83a2e763.png)

4. Add
Identifier must start with "web."
![1 4](https://f.cloud.github.com/assets/581101/1700977/4b9bddee-6039-11e3-9fd2-794611bc3422.png)
![1 4 2](https://f.cloud.github.com/assets/581101/1701007/615b7e76-603b-11e3-92c6-f30ff39bf96d.png)
![1 4 3](https://f.cloud.github.com/assets/581101/1701006/615ae038-603b-11e3-9017-12c57dc36b8a.png)
![1 4 4](https://f.cloud.github.com/assets/581101/1701008/615c2524-603b-11e3-975e-42a3c9255efe.png)

5. Prepare certSigningRequest file
Open Keychain.app
![1 5 1](https://f.cloud.github.com/assets/581101/1701029/d90956cc-603c-11e3-8410-7ebef208be13.png)
![1 5 2](https://f.cloud.github.com/assets/581101/1701030/d90989da-603c-11e3-9716-d5037b8f0990.png)

6. Upload certSigningRequest file.
Select and Edit
![1 6 1](https://f.cloud.github.com/assets/581101/1701032/d90b0b52-603c-11e3-9772-39bac58f30f4.png)
![1 6 2](https://f.cloud.github.com/assets/581101/1701031/d90aeadc-603c-11e3-85ac-6bf37c72127f.png)
![1 6 3](https://f.cloud.github.com/assets/581101/1701033/d90b5b5c-603c-11e3-8ec6-abeecc7dd952.png)
![1 6 4](https://f.cloud.github.com/assets/581101/1701034/d90d9c3c-603c-11e3-9200-0d39aa7676bc.png)

7. Download Certificate
![1 7 1](https://f.cloud.github.com/assets/581101/1701040/1507fd90-603d-11e3-807b-50548ce34c77.png)

8. Add downloaded certificate file to Keychain.app and Export Certificate and Private Key (.p12)
![1 8 1](https://f.cloud.github.com/assets/581101/1701066/364fbda2-603e-11e3-8ee1-c45ddb15ed4c.png)

This Exported Personal Information Exchange (.p12) file will be used for Apple Push Server SSL connection



##Step 2. Building the Push Package
1. Prepare Information for the `website.json`
 * `websiteName` : Name which will show on Notification
![2 1 1](https://f.cloud.github.com/assets/581101/1701108/3c667304-6041-11e3-9453-591a2aa4cb81.png)
 * `websitePushID` : Push Id you created in Step 1. 
 * `allowedDomains` : Website domains (ex: http://apple.com, http://www.apple.com User may enter the site with two different subdomains)
 * `urlFormatString` : URL to Safari when user clicks Notification. This is used as [NSString stringWithFormat:@"http://host/?id=%@&code=%@", ...
 * `authenticationToken` : User Identifer
 * `webServiceURL` : URL of this https server
 * Example
 
     ```
{
	"websiteName":"Back to the Mac",
	"websitePushID":"web.com.tistory.macnews",
	"allowedDomains":[
		"http://macnews.tistory.com"
	],
	"urlFormatString":"http://macnews.tistory.com/%@",
	"authenticationToken":"51c799bcbf18289ee31ff2cbfe4afcd53f71f909",
	"webServiceURL":"https://mini.smoon.kr"
}
     ```

2. Prepare icon.iconset images
 * `icon_16x16.png` : 16 x 16 pixels
 * `icon_16x16@2x.png` : 32 x 32 pixels
 * `icon_32x32.png` : 32 x 32 pixels
 * `icon_32x32@2x.png` : 64 x 64 pixels
 * `icon_128x128.png` : 128 x 128 pixels
 * `icon_128x128@2x.png` : 256 x 256 pixels
 
3. Prepare `manifest.json`
 * SHA1 Hash value  of 6 image files and `website.json`
 * Example
 
     ```
 {
	"icon.iconset/icon_16x16.png": "7b14c04ea0a1504877f41638ca86dbd2d9f2ff64",
	"icon.iconset/icon_16x16@2x.png": "c1cc15749c85424169d648b52f83efad11e636f6",
	"icon.iconset/icon_32x32.png": "c1cc15749c85424169d648b52f83efad11e636f6",
	"icon.iconset/icon_32x32@2x.png": "36254154c579dd1f24263629dba74786d6c8c2c5",
	"icon.iconset/icon_128x128.png": "23a08355e2e4650ad8cd620e0ccc935d00bbddb3",
	"icon.iconset/icon_128x128@2x.png": "44d3a3597c346a62c3828bb53202658c638e484f",
	"website.json": "8bdc6fd9589c575606e95d3ce09f79f95965b8c0"
 }
     ```

4. Build `signature` file
 * signature of `manifest.json` using PKCS #7 Sign

5. Compress the folder into a ZIP archive
 * package/
     * icon.iconset/
         *  `icon_16x16.png`
         * `icon_16x16@2x.png`
         * `icon_32x32.png`
         * `icon_32x32@2x.png`
         * `icon_128x128.png`
         * `icon_128x128@2x.png`
     * `website.json`
     * `manifest.json`
     * `signature`
     
 Content of zip should be
 ![2 5 1](https://f.cloud.github.com/assets/581101/1701202/c2109a38-6047-11e3-82e5-d0cf05522875.png)

See [node_package_maker.js](https://github.com/mtjddnr/SafariAPNSWithNode/blob/master/node_package_maker.js)

This will build pushPackages.zip

##Step 3. Configuring Your Web Service Endpoints
 * Endpoint server is not necessary to be the same web server (ex. http://www.site.com for the website, https://push.site.com for the endpoint server)
 * Endpoint server must use HTTPS and Self Signed Certificate is not acceptable.(so you have to use free certificate site like https://www.startssl.com/ or buy one)
 * Safari(user side) will connect your Endpoint server when
  * Ask a Package: 
     1. Safari will download your package (which is built in Step 3)
     2. Validate information with `website.json`
     3. If validation is successful, Requesting permission dialog will show up. Otherwise, it will ignore on User's screen and report message to your Endpoint server.
  * Register Device or remove device
     1. When user accepts requesting permission, Safari will send device token and other information to your Endpoint server.
     2. If it is registering, the method will be `POST`
     3. If it is unregistering, the method will be `DELETE`
  * Logging Errors
     1. When Error accrues, Safari will send report to your Endpoint server
     
See [node_https_server.js](https://github.com/mtjddnr/SafariAPNSWithNode/blob/master/node_https_server.js)

##Step 4. Requesting Permission

 * Javascript
 
 ``` 
 window.safari.pushNotification.requestPermission(url, websitePushID, userInfo, callback);
 ```
 * `url`: Address of Endpoint server (ex. `https://push.host.com`)
 * `websitePushID`: Push ID created in Step 1.
 * `userInfo`: Any user information to send to Endpoint Server.
 * `callback`: return function
 
Example
```
document.body.onload = function() {
    // Ensure that the user can receive Safari Push Notifications.
    if ('safari' in window && 'pushNotification' in window.safari) {
        var permissionData = window.safari.pushNotification.permission('web.com.example.domain');
        checkRemotePermission(permissionData);
    }
};
 
var checkRemotePermission = function (permissionData) {
    if (permissionData.permission === 'default') {
        // This is a new web service URL and its validity is unknown.
        window.safari.pushNotification.requestPermission(
            'https://domain.example.com', // The web service URL.
            'web.com.example.domain',     // The Website Push ID.
            {}, // Data that you choose to send to your server to help you identify the user.
            checkRemotePermission         // The callback function.
        );
    }
    else if (permissionData.permission === 'denied') {
        // The user said no.
    }
    else if (permissionData.permission === 'granted') {
        // The web service URL is a valid push provider, and the user said yes.
        // permissionData.deviceToken is now available to use.
    }
};
```


##Step 5. Push Notification
 * Same as iOS APNS (Great, we can use node-apn https://github.com/argon/node-apn)
 * Same rules as iOS APNS (Same length limit: maximum 256 bytes)
 * Do not connect to development environment server (only gateway.push.apple.com works)
 * New keys: `action`, `url-args`
 * Example
 ```
{
    "aps": {
        "alert": {
            "title": "Flight A998 Now Boarding",
            "body": "Boarding has begun for Flight A998.",
            "action": "View"
        },
        "url-args": ["boarding", "A998"]
    }
}
 
 ```
 * `url-args`: This is where your `urlFormatString` will be used to.
    
 If urlFormatString is "http://www.host.com/?id=%@&code=%@" and user clicks notification with upper example, Safari will navigate user to "http://www.host.com/?id=bording&code=A998"
 
  * Watch out data type in `url-args`.
 
     if you use `Integer` value in `url-args` and `%@` in urlFormatString, JSON will looks like
   `"url-args": [ 1234 ]` and notification will not work.
   
  * Watch out number of arguments.
    
     If you use two `%@` then you have to use two strings in `url-args`
     

