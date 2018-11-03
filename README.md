# ruliweb-hots

루리웹에 히오스 정보글을 쓸 수 있게 해 주는 크롬 / 파이어폭스 확장 프로그램입니다.

* [크롬 확장 프로그램 설치](https://chrome.google.com/webstore/detail/cnglbnilhbknecgmekgagelljoljcbfe)
* [파이어폭스 확장 프로그램 설치](https://addons.mozilla.org/ko/firefox/addon/루리웹-히어로즈-오브-더-스톰-공략툴/) (베타)


# How to build

```bash
git clone https://github.com/pastelmind/ruliweb-hots.git
cd ruliweb-hots
npm install
npm run build
```

Note: This project uses hard links to keep data files and dependencies in sync.  
Note: All npm scripts expect a Unix-like shell environment. Windows users may need to set npm's `script-shell` configuration to Git Bash.


# Organization

* `api`: 히어로즈 오브 더 스톰 데이터(`hots.json`)를 다루는 데 쓰이는 여러 Node.js 스크립트를 모아놓은 디렉토리
* `chrome-ext`: 크롬 확장 프로그램(extension)에 관련된 파일
    * `src`: 확장 프로그램 소스
    * `tests`: 확장 프로그램 테스트 관련 파일
    * `publishing`: 크롬 웹 스토어에 배포하는 일과 관련된 파일
* `scripts`: 프로젝트를 관리하는 데 필요한 여러 Node.js 스크립트를 모아놓은 디렉토리
* `docs`: GitHub Pages를 사용하기 위해 만든 디렉토리 (설명서 아님!)


# npm Scripts

* `npm run build`: Package the Chrome extension source into a ZIP file which can be uploaded to the Chrome Web Store.
* `npm run watch`: Watch `./chrome-ext/templates/` on background and rebuild `./chrome-ext/src/js/templates.js` when anything changes.
* `npm run link-dep`: Creates hard links to 3rd-party dependencies in `node_modules/`. This script is automatically called by `npm install`.
* `npm run validate-data`: Validates `hots.json`. This script is called by `npm test`.


# Dependencies

* 웹 브라우저 확장 프로그램
    * [tingle.js](https://robinparisi.github.io/tingle/)
    * [mustache.js](https://github.com/janl/mustache.js)
    * [microtip](https://github.com/ghosh/microtip/)
* 서버 스크립트
    * [Node.js](https://nodejs.org/)
    * [axios](https://github.com/axios/axios)
    * [yazl](https://github.com/thejoshwolfe/yazl)
    * 자세한 것은 [package.json](package.json) 참조


# Development Guidelines

1. 공략툴은 사용법을 배우기 쉽고 편리해야 합니다.
2. 공략툴로 생성한 모든 HTML은 누구나 쉽게 보고 이용할 수 있어야 합니다.
    1. 주요 웹 브라우저의 최신 버전에서 동일하게 동작해야 합니다.
        * Internet Explorer, Edge는 `<details>`, `<summary>` 요소를 지원하지 않습니다. 두 태그는 공략툴의 핵심 기능인 **표 접기/펴기**에 필수적이므로, 이 문제에 대하여 별다른 조치를 취하지 않을 예정입니다.
    2. 모바일 환경을 PC보다 우선 배려해야 합니다.
        * 많은 사람들은 스마트폰, 태블릿 등을 통해 루리웹을 비롯한 여러 웹 사이트에 접속합니다. 따라서 작은 화면에 친화적이지 못한 HTML/CSS 코드를 생성하면 많은 사용자에게 불편을 끼칠 수 있습니다.