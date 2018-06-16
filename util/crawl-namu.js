#!/usr/bin/env node

'use strict';

const articleNames = [
  'D.Va(히어로즈 오브 더 스톰)',
  '가로쉬(히어로즈 오브 더 스톰)',
  '가즈로(히어로즈 오브 더 스톰)',
  '겐지(히어로즈 오브 더 스톰)',
  '굴단(히어로즈 오브 더 스톰)',
  '그레이메인(히어로즈 오브 더 스톰)',
  '길 잃은 바이킹(히어로즈 오브 더 스톰)',
  '나지보',
  '노바(히어로즈 오브 더 스톰)',
  '누더기(히어로즈 오브 더 스톰)',
  '데커드(히어로즈 오브 더 스톰)',
  '데하카(히어로즈 오브 더 스톰)',
  '도살자(히어로즈 오브 더 스톰)',
  '디아블로(히어로즈 오브 더 스톰)',
  '라그나로스(히어로즈 오브 더 스톰)',
  '레가르(히어로즈 오브 더 스톰)',
  '레오릭(히어로즈 오브 더 스톰)',
  '레이너(히어로즈 오브 더 스톰)',
  '렉사르(히어로즈 오브 더 스톰)',
  '루나라',
  '루시우(히어로즈 오브 더 스톰)',
  '리 리(히어로즈 오브 더 스톰)',
  '리밍(히어로즈 오브 더 스톰)',
  '마이에브(히어로즈 오브 더 스톰)',
  '말티엘(히어로즈 오브 더 스톰)',
  '말퓨리온(히어로즈 오브 더 스톰)',
  '머키',
  '메디브(히어로즈 오브 더 스톰)',
  '모랄레스 중위',
  '무라딘(히어로즈 오브 더 스톰)',
  '바리안(히어로즈 오브 더 스톰)',
  '바리안(히어로즈 오브 더 스톰)',
  '발라(히어로즈 오브 더 스톰)',
  '발리라(히어로즈 오브 더 스톰)',
  '블레이즈(히어로즈 오브 더 스톰)',
  '빛나래',
  '사무로(히어로즈 오브 더 스톰)',
  '소냐(히어로즈 오브 더 스톰)',
  '스랄(히어로즈 오브 더 스톰)',
  '스투코프(히어로즈 오브 더 스톰)',
  '실바나스(히어로즈 오브 더 스톰)',
  '아나(히어로즈 오브 더 스톰)',
  '아눕아락(히어로즈 오브 더 스톰)',
  '아르타니스(히어로즈 오브 더 스톰)',
  '아바투르(히어로즈 오브 더 스톰)',
  '아서스(히어로즈 오브 더 스톰)',
  '아우리엘(히어로즈 오브 더 스톰)',
  '아즈모단(히어로즈 오브 더 스톰)',
  '알라라크(히어로즈 오브 더 스톰)',
  '알렉스트라자(히어로즈 오브 더 스톰)',
  '요한나',
  '우서(히어로즈 오브 더 스톰)',
  '이렐(히어로즈 오브 더 스톰)',
  '일리단(히어로즈 오브 더 스톰)',
  '자가라(히어로즈 오브 더 스톰)',
  '자리야(히어로즈 오브 더 스톰)',
  '정예 타우렌 족장',
  '정크랫(히어로즈 오브 더 스톰)',
  '제라툴(히어로즈 오브 더 스톰)',
  '제이나(히어로즈 오브 더 스톰)',
  '줄(히어로즈 오브 더 스톰)',
  '줄진(히어로즈 오브 더 스톰)',
  '첸(히어로즈 오브 더 스톰)',
  '초갈(히어로즈 오브 더 스톰)',
  '초갈(히어로즈 오브 더 스톰)',
  '캘타스(히어로즈 오브 더 스톰)',
  '케리건(히어로즈 오브 더 스톰)',
  '켈투자드(히어로즈 오브 더 스톰)',
  '크로미(히어로즈 오브 더 스톰)',
  '타이커스(히어로즈 오브 더 스톰)',
  '태사다르(히어로즈 오브 더 스톰)',
  '트레이서(히어로즈 오브 더 스톰)',
  '티란데(히어로즈 오브 더 스톰)',
  '티리엘(히어로즈 오브 더 스톰)',
  '폴스타트(히어로즈 오브 더 스톰)',
  '프로비우스',
  '피닉스(히어로즈 오브 더 스톰)',
  '한조(히어로즈 오브 더 스톰)',
  '해머 상사'
];

const wget = require('wget-improved');
const fs = require('fs');

const tempDir = process.argv[2] || 'temp/namu-dump/';
fs.stat(tempDir, (err, stats) => {

  if (err) {
    console.error(err);
    return;
  }

  if (!stats.isDirectory()) {
    console.error('"' + tempDir + '" is not a directory');
    return;
  }

  console.log('Will download articles to', tempDir);

  downloadArticles(articleNames);
});


function downloadArticles(articleNames) {
  const articleName = articleNames.pop();
  if (!articleName) return;

  const articleUrl = 'https://namu.wiki/raw/' + encodeURIComponent(articleName);
  const filePath = tempDir + '/' + articleName.replace('(히어로즈 오브 더 스톰)', '') + '.txt';

  const delay = Math.floor(Math.random() * 10000); //To avoid triggering HTTP 429 Too Many Requests

  setTimeout(() => {
    // //Create file in place to prevent some weird errors
    // fs.createWriteStream(filePath);

    const download = wget.download(articleUrl, filePath);

    download.on('error', err => {
      console.error('Failed to retrieve', articleUrl, err);
      downloadArticles(articleNames);
    });
    download.on('start', (fileSize) => {
      console.log('Begin downloading', articleUrl, 'to', filePath, '(content-length: ' + fileSize + ')');
    });
    download.on('end', (result) => {
      console.log('Successfully downloaded', articleUrl, result);
      downloadArticles(articleNames);
    });

  }, delay);

  console.log('Set delay to', delay);
}
