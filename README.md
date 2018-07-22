# ruliweb-hots
루리웹에 히오스 정보글을 쓸 수 있게 해 주는 크롬 확장 프로그램

[설치하러 가기](https://chrome.google.com/webstore/detail/cnglbnilhbknecgmekgagelljoljcbfe)

# How to build

```bash
git clone -c core.symlinks=true https://github.com/pastelmind/ruliweb-hots.git
cd ruliweb-hots
npm install
npm run build
```

Note: This project uses symbolic links. Windows users may require administrator privileges.  
Note: All npm scripts expect a Unix-like shell environment. Windows users may need to set npm's `script-shell` configuration to Git Bash.

# Organization
* `api-server`: 히어로즈 오브 더 스톰 데이터(`hots.json`)를 다루는 데 쓰이는 여러 Node.js 스크립트를 모아놓은 디렉토리
* `chrome-ext`: 크롬 확장 프로그램(extension)에 관련된 파일
    * `src`: 확장 프로그램 소스
    * `tests`: 확장 프로그램 테스트 관련 파일
    * `publishing`: 크롬 웹 스토어에 배포하는 일과 관련된 파일
* `scripts`: 프로젝트를 관리하는 데 필요한 여러 Node.js 스크립트를 모아놓은 디렉토리
* `docs`: GitHub Pages를 사용하기 위해 만든 디렉토리 (설명서 아님!)

# npm Scripts
* `npm run build`: Package the Chrome extension source into a ZIP file which can be uploaded to the Chrome Web Store.
* `npm run watch`: Watch `./chrome-ext/templates/` on background and rebuild `./chrome-ext/src/js/templates.js` when anything changes.
* `npm run crawl-namu`: Run the NamuWiki crawl script. For usage, run `npm run crawl-namu -- --help` .
* `npm run validate-data`: Validates `hots.json`. This script is called by `npm test`.

# Dependencies
* 크롬 확장 프로그램
    * [axios](https://github.com/axios/axios)
    * [tingle.js](https://robinparisi.github.io/tingle/)
    * [mustache.js](https://github.com/janl/mustache.js)
* 서버 스크립트
    * [Node.js](https://nodejs.org/)
    * [axios](https://github.com/axios/axios)
    * PowerShell (ZIP 파일 생성용)
    * 자세한 것은 [package.json](package.json) 참조