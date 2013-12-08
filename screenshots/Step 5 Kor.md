 * 애플 푸시 서버에 접속하고 푸시를 보내는 방법은  iOS APNS와 동일합니다. ([node-apn](https://github.com/argon/node-apn)모듈을 사용할수 있습니다.)
 * 데이터 길이 제한 등 규칙은 같습니다. (256 bytes)
 * iOS APNS와 달리 개발용 서버를 제공하지 않기 때문에 운영 서버로 바로 사용합니다. (gateway.push.apple.com works)
 * 새로운 키: `action`, `url-args`
 * 예제
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
 * `url-args`: 앞서 정해둔 `urlFormatString`에 들어갈 인자 값입니다.
    
 urlFormatString이 `http://www.host.com/?id=%@&code=%@`라고 할경우 유저가 알림을 클릭하면 사파리는 `http://www.host.com/?id=bording&code=A998` 같은 경로로 이동합니다.
 
  * `url-args`에서 사용할 데이터 타입을 주의하세요.
 
     urlFormatString에서 `%@`같은 Object 타입을 사용하게 해놨는데 `url-args`에서 Int형으로 보낸다면  보내지는 JSON구조는 `"url-args": [ 1234 ]`와 같이 될것이고 `[NSString stringWithFormat:"http://www.host.com/?id=%@", 1234]` 같은 상황이 벌어져서 타입 불일치로 메세지가 무시됩니다.
   
  * `url-args`의 인자 갯수를 주의 하세요.
    
     urlFormatString에서 사용한 인자 갯수가 `url-args`의 갯수와 일치해야 합니다.
     
