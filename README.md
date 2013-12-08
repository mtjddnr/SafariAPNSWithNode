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
 
```
See https://github.com/mtjddnr/SafariAPNSWithNode/blob/master/node_package_maker.js
```