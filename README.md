# ruliweb-hots
루리웹에 히오스 정보글을 쓸 수 있게 해 주는 크롬 확장 프로그램

# Organization
* `chrome-ext`: 크롬 확장 프로그램(extension)에 관련된 파일
    * `src`: 확장 프로그램 소스
    * `tests`: 확장 프로그램 테스트 관련 파일
    * `publishing`: 크롬 웹 스토어에 배포하는 일과 관련된 파일
* `util`: 확장 프로그램이 사용하는 데이터를 준비하고 가공하는 Node.js 스크립트

# Dependencies
* 크롬 확장 프로그램
    * [jQuery](https://jquery.com/) 3.3.1
    * [jQuery UI](https://jqueryui.com/) 1.12.1 (Dot Luv theme)
    * [mustache.js](https://github.com/janl/mustache.js) 2.3.0
* 서버 스크립트
    * [Node.js](https://nodejs.org/)
    * 자세한 것은 package.json 참조