1. 개발자 사이트에 들어갑니다. [iOS 개발](https://developer.apple.com/devcenter/ios/index.action) 아니면 [Mac 개발](https://developer.apple.com/devcenter/mac/index.action)

2. Certificates, Identifiers & Profiles Page로 이동

3. Website Push IDs 메뉴 선택

 ![1 1](https://f.cloud.github.com/assets/581101/1700968/d16dbbdc-6038-11e3-89e9-85bc83a2e763.png)

4. 생성

 식별자는 반드시 `web.`으로 시작해야 합니다.
![1 4](https://f.cloud.github.com/assets/581101/1700977/4b9bddee-6039-11e3-9fd2-794611bc3422.png)
![1 4 2](https://f.cloud.github.com/assets/581101/1701007/615b7e76-603b-11e3-92c6-f30ff39bf96d.png)
![1 4 3](https://f.cloud.github.com/assets/581101/1701006/615ae038-603b-11e3-9017-12c57dc36b8a.png)
![1 4 4](https://f.cloud.github.com/assets/581101/1701008/615c2524-603b-11e3-975e-42a3c9255efe.png)

5. 인증서 요청하기 (요청 파일 생성)

 `키체인 접근.app`을 실행
![1 5 1 kor](https://f.cloud.github.com/assets/581101/1701396/6618cc5a-6056-11e3-8caa-4dfe4db5d775.png)
![1 5 2 kor](https://f.cloud.github.com/assets/581101/1701395/66189e56-6056-11e3-9176-79f95b8d7094.png)

6. 인증서 요청하기 (요청 파일 업로드)

 4.에서 추가한 Push ID를 선택하고 Edit합니다.
![1 6 1](https://f.cloud.github.com/assets/581101/1701032/d90b0b52-603c-11e3-9772-39bac58f30f4.png)
![1 6 2](https://f.cloud.github.com/assets/581101/1701031/d90aeadc-603c-11e3-85ac-6bf37c72127f.png)
![1 6 3](https://f.cloud.github.com/assets/581101/1701033/d90b5b5c-603c-11e3-8ec6-abeecc7dd952.png)
![1 6 4](https://f.cloud.github.com/assets/581101/1701034/d90d9c3c-603c-11e3-9200-0d39aa7676bc.png)

7. 요청 파일 업로드가 끝나면 인증서를 받을수 있습니다.
![1 7 1](https://f.cloud.github.com/assets/581101/1701040/1507fd90-603d-11e3-807b-50548ce34c77.png)

8. 다운받은 인증서를 `키체인 접근.app`에 넣고 내보내기를 합니다. 개인 정보 교환(.p12)으로 저장합니다.
![1 8 1 kor](https://f.cloud.github.com/assets/581101/1701408/2180e7b6-6057-11e3-967c-6a943b11161f.png)


저장한 개인 정보 교환(.p12)파일은 나중에 푸시를 보낼때 애플 서버에 접속시 인증용으로 사용됩니다.
