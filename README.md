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
 
#Step 1. Register Website Push ID
1. Visit https://developer.apple.com/devcenter/ios/index.action

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
![1 6 1](https://f.cloud.github.com/assets/581101/1701032/d90b0b52-603c-11e3-9772-39bac58f30f4.png)
![1 6 2](https://f.cloud.github.com/assets/581101/1701031/d90aeadc-603c-11e3-85ac-6bf37c72127f.png)
![1 6 3](https://f.cloud.github.com/assets/581101/1701033/d90b5b5c-603c-11e3-8ec6-abeecc7dd952.png)
![1 6 4](https://f.cloud.github.com/assets/581101/1701034/d90d9c3c-603c-11e3-9200-0d39aa7676bc.png)

7. Download Certificate
![1 7 1](https://f.cloud.github.com/assets/581101/1701040/1507fd90-603d-11e3-807b-50548ce34c77.png)

8. Add downloaded certificate file to Keychain.app and Export Certificate and Private Key (.p12)
![1 8 1](https://f.cloud.github.com/assets/581101/1701066/364fbda2-603e-11e3-8ee1-c45ddb15ed4c.png)

This Exported Personal Information Exchange (.p12) file will be used for Apple Push Server SSL connection


