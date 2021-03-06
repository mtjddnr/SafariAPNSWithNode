 * 운영하는 웹사이트 서버와 푸시 인증용 서버는 반드시 동일할 필요는 없습니다. (예 http://www.site.com for the website, https://push.site.com for the endpoint server) 심지어 도메인 자체가 달라도 지원됩니다.
 * 푸시 인증용 서버는 반드시 `HTTPS`를 사용해야하며 자체 발행이 아닌 정식 인증기관을 거쳐서 발행된 인증서를 사용해야만 합니다. (무료 인증서 발행 사이트를 이용하거나 https://www.startssl.com/, 구입을 해야합니다.)
 * 유저가 사용하는 사파리가 다음과 같을때 푸시 인증용 서버에 직접 접속을 할겁니다.
  * 패키지 요청: 
     1. 사파리는 인증시 Step 3.에서 만든 패키지(zip)파일을 다운로드 하도록 요청할것입니다.
     2. 패키지 파일 내부에 있는 `website.json` 정보를 토대로  검사를 합니다. (signature정보가 맞는지, 요청하는 사이트가 맞는지 등, 이 정보가 중간에 회손되었을 경우 signature 값이 다릅니다.)
     3. 검사를 끝내면 유저에게 창을 띄워서 알림 사용 여부를 묻습니다. 유저가 수락을 하면 기기 정보를 다시 푸시 인증 서버로 보내줍니다. 검사에서 실패했을 경우 아무런 메세지도 보여주지 않고 푸시 인증서버로 로그만 보내줍니다.
  * 기기 등록 및 제거:
     1. 유저가 수락 했을때 사파리는 기기를 식별할수 있는 토큰값과 추가 정보를 푸시 인증서버로 보냅니다.
     2. 기기 등록의 경우 `POST`메소드를 사용할 것이고.
     3. 기기 제거의 경우 `DELETE`메소드를 사용합니다.
  * 에러: 에러가 발생했을때 푸시 인증서버로 정보를 보내줍니다.
     
[node_https_server.js](https://github.com/mtjddnr/SafariAPNSWithNode/blob/master/node_https_server.js)를 참고