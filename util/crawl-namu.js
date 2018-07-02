#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');
const axios = require('axios');
const entities = new require('html-entities').AllHtmlEntities;
const namu2hots = require('./src/namu2hots');
const { Hero } = require('./src/models');


/**
 * Abstract base class that can take an image name and do something with it.
 */
class ImageNameConverter {
  constructor() { this.urls = {}; }

  /**
   * Add additional name-URL pairs to be tracked by the converter.
   * @param {Object.<string,string>} urls Mapping of image name => image URL
   */
  addUrls(urls) { Object.assign(this.urls, urls); }

  /**
   * Convert the image name to some other value.
   * @abstract
   * @param {string} name Image name
   * @return {Promise<string>} Value that will be assigned to the image URL property
   */
  async convert(name) { throw new Error('Not implemented'); }
}

/**
 * Class that downloads the image and computes its hash.
 */
class CachedImageHasher extends ImageNameConverter {
  constructor() {
    super();
    this.hashes = {};
  }

  /**
   * Downloads the image matching the given name and returns its sha1 hash.
   * @param {string} name Image name
   * @return {Promise<string>} sha1 hash string
   */
  async convert(name) {
    if (!(name in this.hashes)) {
      assert(name in this.urls, name + ' is not associated with any known image URL');
      const arrBuffer = await downloadArrayBuffer(this.urls[name]);
      this.hashes[name] = computeHash(arrBuffer);
    }

    return this.hashes[name];
  }
}

/**
 * Class that downloads and saves the image.
 */
class CachedImageDownloader extends ImageNameConverter {
  /**
   * @param {string} downloadDir Directory to save the images in.
   */
  constructor(downloadDir) {
    super();
    this.downloadDir = path.resolve(downloadDir);
    this.downloaded = {};
  }

  /**
   * Downloads and saves the image that matches the given name.
   * @param {string} name Image name
   */
  async convert(name) {
    if (name in this.downloaded) return;

    assert(name in this.urls, name + ' is not associated with any known image URL');
    const arrBuffer = await downloadArrayBuffer(this.urls[name]);

    const savePath = path.join(this.downloadDir, name.replace('파일:', ''));
    fs.writeFileSync(savePath, Buffer.from(arrBuffer));

    this.downloaded[name] = true;
  }
}


const articleNames = new Set([
  'D.Va(히어로즈 오브 더 스톰)',
  '가로쉬(히어로즈 오브 더 스톰)',
  '가즈로(히어로즈 오브 더 스톰)',
  '겐지(히어로즈 오브 더 스톰)',
  '굴단(히어로즈 오브 더 스톰)',
  '그레이메인',
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
  '카라짐',
  '카시아',
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
].sort());

if (articleNames.size !== 79)
  console.warn('articleNames.size === %d, expected %d', articleNames.size, 79);


const tempDir = path.normalize(process.argv[2] || 'temp/namu-dump');

(async function () {
  const imageDownloader = new CachedImageDownloader('temp/namu-images/');

  for (const articleName of articleNames) {
    try {
      const hero = await crawlHeroData(articleName);
      const namuImageUrls = await crawlImageUrls(articleName);

      imageDownloader.addUrls(namuImageUrls);

      if (hero instanceof Hero) //Normal hero
        forEachIconAsync(hero, imageDownloader);
      else {  //Cho'Gall
        forEachIconAsync(hero.cho, imageDownloader);
        forEachIconAsync(hero.gall, imageDownloader);
      }
    } catch (e) {
      console.error(e);
    }
  }
})();


/**
 * Downloads the raw article and parses hero data.
 * @param {string} articleName
 * @return {Promise<any>} Hero object for most heroes, `{ cho, gall }` for Cho'Gall
 */
async function crawlHeroData(articleName) {
  //Avg 3-second delay with 20% variance
  const sleepDuration = Math.floor(3000 * (.8 + .4 * Math.random()));
  process.stdout.write(`Will download ${articleName} after ${sleepDuration} milliseconds...`);
  await delay(sleepDuration);
  console.log('commencing');

  const rawArticleResponse = await axios.get(
    'https://namu.wiki/raw/' + encodeURIComponent(articleName),
    { responseType: 'text' }
  );

  const namuMarkup = rawArticleResponse.data;

  //Exception: Cho'Gall is two heroes in one
  if (articleName.includes('초갈'))
    return namu2hots.parseChoGallPage(namuMarkup);
  else
    return namu2hots.parseHeroPage(namuMarkup);
}


/**
 * Downloads the HTML article and parses NamuWiki images.
 * @param {string} articleName
 * @return {Promise<Object.<string,string>>} Key-value mapping of NamuWiki image name => image URL.
 */
async function crawlImageUrls(articleName) {
  const htmlArticleResponse = await axios.get(
    'https://namu.wiki/w/' + encodeURIComponent(articleName),
    { responseType: 'text' }
  );

  return extractImgAltTextToUrl(htmlArticleResponse.data);
}

/**
 * Creates a promise that resolves after a given delay.
 * @param {number} milliseconds Time to wait
 * @param {*} [value] (Optional) value to resolve with
 */
async function delay(milliseconds, value) {
  return new Promise(resolve => { setTimeout(resolve, milliseconds, value); });
}

/**
 * Extracts src and alt attributes from <img> tags in the given HTML.
 * Will decode HTML entities in both src and alt text
 * @param {string} html HTML document source
 * @return {Object.<string, string>} A mapping of alt text: src, or null if there is no <img> tag
 */
function extractImgAltTextToUrl(html) {
  const imgTags = html.match(/<img.*?>/g);
  if (!imgTags)
    return null;

  const imgAltTextToUrlMapping = {};
  imgTags.forEach(imgTag => {
    const srcMatch = /src=['"](.*?)['"]/.exec(imgTag);
    const altMatch = /alt=['"](.*?)['"]/.exec(imgTag);
    if (!srcMatch || !altMatch)
      return;

    const src = entities.decode(srcMatch[1]);
    const altText = entities.decode(altMatch[1]);
    imgAltTextToUrlMapping[altText] = 'https:' + src;
  });

  return imgAltTextToUrlMapping;
}

/**
 * Downloads the URL and returns its contents.
 * @param {string} url
 * @return {Promise<ArrayBuffer>}
 */
async function downloadArrayBuffer(url) {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  return response.data;
}

/**
 * Computes the sha1 hash of the given buffer.
 * @param {ArrayBuffer} arrayBuffer
 * @return {string} sha1 hash string
 */
function computeHash(arrayBuffer) {
  const hash = crypto.createHash('sha1');
  hash.write(Buffer.from(arrayBuffer));
  return hash.digest('hex');
}

/**
 * Applies `converter.convert()` to the iconUrl of every skill/talent of the
 * given hero object.
 * @param {Hero} hero
 * @param {ImageNameConverter} converter
 */
async function forEachIconAsync(hero, converter) {
  for (const skill of hero.skills) {
    try {
      skill.iconUrl = await converter.convert(skill.iconUrl);
    } catch (e) {
      console.error(e);
    }
  }

  for (const talentLevel in hero.talents) {
    for (const talent of hero.talents[talentLevel]) {
      try {
        talent.iconUrl = await converter.convert(talent.iconUrl);
      } catch (e) {
        console.error(e);
      }
    }
  }
}