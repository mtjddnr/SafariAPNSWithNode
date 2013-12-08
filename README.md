Safari Apple Push Notification Service With Node
==================

Documentation 
* https://developer.apple.com/library/mac/documentation/NetworkingInternet/Conceptual/NotificationProgrammingGuideForWebsites/PushNotifications/PushNotifications.html

Preparation
* Apple Developer Account
* Icon Image files
 * icon_16x16.png
 * icon_16x16@2x.png
 * icon_32x32.png
 * icon_32x32@2x.png
 * icon_128x128.png
 * icon_128x128@2x.png
 
Step 1. Register Website Push ID
* Wiki Page: https://github.com/mtjddnr/SafariAPNSWithNode/wiki/Step-1.-Register-Website-Push-ID

Step 2. Building the Push Package
* https://developer.apple.com/library/mac/documentation/NetworkingInternet/Conceptual/NotificationProgrammingGuideForWebsites/PushNotifications/PushNotifications.html#//apple_ref/doc/uid/TP40013225-CH3-SW7

1. Prepare Information for the `website.json`
 * `websiteName` : Name which will show on Notification (알림창에 나타날 제목)
![2 1 1](https://f.cloud.github.com/assets/581101/1701108/3c667304-6041-11e3-9453-591a2aa4cb81.png)
 * `websitePushID` : Push Id you created in Step 1. (1 단계에서 애플 개발자 사이트에서 등록한 아이디)
 * `allowedDomains` : Website domains (ex: http://apple.com, http://www.apple.com User may enter the site with two different subdomains) 사용할 웹사이트 도메인, 앞에 www사용 여부도 다른 도메인으로 인식되기 때문에 상황에 따라 둘다 필요하다.
 * `urlFormatString` : URL to Safari when user clicks Notification. This is used as [NSString stringWithFormat:@"http://host/?id=%@&code=%@", ...
 * `authenticationToken` : User Identifer
 * `webServiceURL` : URL of this https server
 
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



See https://github.com/mtjddnr/SafariAPNSWithNode/blob/master/node_package_maker.js
This will build pushPackages.zip