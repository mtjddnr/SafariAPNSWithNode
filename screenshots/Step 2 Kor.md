1. `website.json`에 들어갈 정보를 준비합니다.
 * `websiteName` : 알림창에 나타날 제목입니다.
![2 1 1 kor](https://f.cloud.github.com/assets/581101/1701425/1158060c-6058-11e3-98fe-a1b80da82ab5.png)
 * `websitePushID` : 1 단계에서 애플 개발자 사이트에서 생성한 Push ID입니다.
 * `allowedDomains` : 이 서비스를 사용할 사이트입니다. (예 http://apple.com, http://www.apple.com) 앞에 www사용 여부도 다른 도메인으로 인식되기 때문에 상황에 따라 둘다 필요할수있습니다.
 * `urlFormatString` : 사용자가 알림을 클릭하면 사파리에서 이동할 URL주소입니다. [NSString stringWithFormat:@"http://host/?id=%@&code=%@", ... 같이 포멧 형태로 사용됩니다.
 * `authenticationToken` : 사용자를 식별하기위한 값입니다.
 * `webServiceURL` : 이 푸시 서비스를 돌릴 서버의 URL주소입니다.
 * 예)
 
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

2. 이미지 준비 icon.iconset 
 * `icon_16x16.png` : 16 x 16 pixels
 * `icon_16x16@2x.png` : 32 x 32 pixels
 * `icon_32x32.png` : 32 x 32 pixels
 * `icon_32x32@2x.png` : 64 x 64 pixels
 * `icon_128x128.png` : 128 x 128 pixels
 * `icon_128x128@2x.png` : 256 x 256 pixels
 
3. `manifest.json` 준비
 * 6개의 이미지와 `website.json`의 SHA1 Hash 값
 * 예)
 
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

4. `signature` 파일을 만듭니다.
 * `manifest.json`파일을  PKCS #7 싸인값을 구합니다.

5. 위의 모든 파일들을 하나의 폴더에 아래와 같은 구조로 넣고 ZIP형식으로 압축합니다.
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
     
 ZIP파일의 내용 구조는 다음과 같아야 합니다.
 ![2 5 1](https://f.cloud.github.com/assets/581101/1701202/c2109a38-6047-11e3-82e5-d0cf05522875.png)

[node_package_maker.js](https://github.com/mtjddnr/SafariAPNSWithNode/blob/master/node_package_maker.js)에서 단계적으로 pushPackages.zip을 만들어줍니다.