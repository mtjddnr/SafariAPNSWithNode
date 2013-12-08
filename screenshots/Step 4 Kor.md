
 * Javascript로 작성됩니다.
 
 ``` 
 window.safari.pushNotification.requestPermission(url, websitePushID, userInfo, callback);
 ```
 * `url`: 푸시 인증 서버의 URL주소입니다. (예 `https://push.host.com`)
 * `websitePushID`: Step 1.에서 생성한 Push ID입니다.
 * `userInfo`: 푸시 인증 서버로 보낼 데이터입니다.
 * `callback`: return function
 
예제
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