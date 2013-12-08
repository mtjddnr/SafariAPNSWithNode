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
     
See https://github.com/mtjddnr/SafariAPNSWithNode/blob/master/node_https_server.js