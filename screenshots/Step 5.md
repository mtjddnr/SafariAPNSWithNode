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
     
