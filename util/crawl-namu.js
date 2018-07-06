#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');
const util = require('util');
const axios = require('axios');
const program = require('commander');
const entities = new require('html-entities').AllHtmlEntities;
const namu2hots = require('./src/namu2hots');
const { Hero } = require('./src/models');

const setTimeoutAsync = util.promisify(setTimeout);
const writeFileAsync = util.promisify(fs.writeFile);

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
 * A class that converts the image name to a hosted URL, using the sha1 hash for
 * comparing images.
 */
class CachedImageToUrlConverter extends ImageNameConverter {
  /**
   * @param {Object.<string, string>} hashToHostedUrl Mapping of sha1 hash => hosted image URL.
   */
  constructor(hashToHostedUrl) {
    super();
    this.resolvedNames = {};
    this.nameToHash = {};
    this.hashToHostedUrl = hashToHostedUrl;
    this.unusedHostedUrls = new Set;
    for (const hashes in hashToHostedUrl)
      this.unusedHostedUrls.add(hashToHostedUrl[hashes]);
  }

  /**
   * Downloads the image matching the given name, computes its hash, which is
   * compared with hashes of hosted images. If a match is found, returns the
   * hosted image URL; otherwise, returns the original name.
   * @param {string} name Image name
   * @return {Promise<string>} URL of matching hosted image, or the original name.
   */
  async convert(name) {
    if (!(name in this.resolvedNames)) {
      if (!(name in this.nameToHash)) {
        assert(name in this.urls, name + ' is not associated with any known image URL');
        const arrBuffer = await downloadArrayBuffer(this.urls[name]);
        this.nameToHash[name] = computeHash(arrBuffer);
      }

      const hash = this.nameToHash[name];
      if (!(hash in this.hashToHostedUrl)) {
        console.error(name, 'does not match any hosted URL');
        return name;
      }

      this.resolvedNames[name] = this.hashToHostedUrl[hash];
      this.unusedHostedUrls.delete(this.hashToHostedUrl[hash]);
    }

    return this.resolvedNames[name];
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
   * @return {Promise<string>} Image name, unmodified.
   */
  async convert(name) {
    if (name in this.downloaded) return;

    assert(name in this.urls, name + ' is not associated with any known image URL');
    const arrayBuffer = await downloadArrayBuffer(this.urls[name]);
    this.downloaded[name] = true; //Prevent further downloads

    const savePath = path.join(this.downloadDir, name.replace('파일:', ''));
    await writeFileAsync(savePath, Buffer.from(arrayBuffer));
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


//-------- Script main logic --------//

if (require.main === module) {
  let cmd = null;
  const CMD_SAVE_IMAGES = 1, CMD_SAVE_JSON = 2;

  const defaultSaveImagesDir = path.normalize('temp/namu-images/');

  program.command('save-images [savedir]')
    .description(`Download and save images from NamuWiki to [savedir] (default: ${defaultSaveImagesDir})`)
    .action((saveDir = defaultSaveImagesDir) => {
      cmd = { type: CMD_SAVE_IMAGES, saveDir };
    });

  const defaultSaveJsonPath = path.normalize('temp/hots.json');

  program.command('save-json <hots_ver> [savepath]')
    .description(`Parse and save hero data (JSON) marked as <hots_ver> to [jsonfile] (default: ${defaultSaveJsonPath})`)
    .option('-p, --hero-portraits [jsonfile]', 'Load hero portrait from [jsonfile]', path.normalize('util/data/hero-portraits.json'))
    .option('-l, --image-url-list <listfile>', 'Replace skill/talent icon names with image URLs in <listfile>')
    .action((hotsVersion, saveJsonPath, options) => {
      saveJsonPath = saveJsonPath || defaultSaveJsonPath;
      cmd = {
        type: CMD_SAVE_JSON,
        hotsVersion,
        saveJsonPath,
        imageUrlListFile: options.imageUrlList
      };

      //Load portraits early to catch errors
      if (options.heroPortraits)
        cmd.heroPortraits = JSON.parse(fs.readFileSync(options.heroPortraits));
    });

  program.parse(process.argv);

  if (!cmd)
    program.help();

  (async () => {
    let converter = null;

    if (cmd.type === CMD_SAVE_IMAGES)
      converter = new CachedImageDownloader(cmd.saveDir);
    else if (cmd.type === CMD_SAVE_JSON) {
      if (cmd.imageUrlListFile) {
        //Parse all image URLs in the listfile
        const hostedImageUrls = parseImageUrlsFromFile(cmd.imageUrlListFile);
        const hashToHostedUrl = await generateHashToUrlMapping(hostedImageUrls);

        converter = new CachedImageToUrlConverter(hashToHostedUrl);
      }
    }
    else
      throw new Error('Unknown command: ' + cmd.type);

    const heroes = await crawlArticles(articleNames, converter);

    //Set portrait URLs
    if (cmd.heroPortraits) {
      for (const heroId in heroes) {
        if (heroId in cmd.heroPortraits)
          heroes[heroId].iconUrl = cmd.heroPortraits[heroId];
        else
          console.warn('Missing portrait for', heroes[heroId].name);
      }
    }

    //Save hero JSON
    if (cmd.type === CMD_SAVE_JSON) {
      const outputJson = { hotsVersion: cmd.hotsVersion, heroes: Hero.compact(heroes) };
      const jsonPath = path.normalize(cmd.saveJsonPath);
      fs.writeFileSync(jsonPath, JSON.stringify(outputJson, null, 2));
      console.log('Hero data saved to', jsonPath);
    }

    if (converter && converter.unusedHostedUrls && converter.unusedHostedUrls.size) {
      console.warn('The following URLs from the listfile were not matched with any icon:');
      for (const url of converter.unusedHostedUrls)
        console.warn('- ' + url);
    }
  })();
}


/**
 * Asynchronously crawls all articles and generates a collection of hero data.
 * @param {Iterable<string>} articleNames
 * @param {ImageNameConverter=} converter
 * @return {Promise<Object.<string, Hero>} A collection of hero ID => Hero object
 */
async function crawlArticles(articleNames, converter) {
  const heroes = {};

  const crawlPromises = [];
  let activeCrawlerCount = 0;

  for (const articleName of articleNames) {
    console.log(`Crawling ${articleName} [${++activeCrawlerCount} active]...`);

    crawlPromises.push((async () => {
      try {
        const heroData = await crawlHeroData(articleName);

        if (converter) {
          const namuImageUrls = await crawlImageUrls(articleName);
          converter.addUrls(namuImageUrls);
        }

        if (heroData instanceof Hero) { //Normal hero
          heroes[heroData.id] = heroData;
          if (converter)
            await forEachIconAsync(heroData, converter);
        }
        else {  //Cho'Gall
          for (const heroEntry in heroData) {
            const hero = heroData[heroEntry];
            heroes[hero.id] = hero;
            if (converter)
              await forEachIconAsync(hero, converter);
          }
        }

        console.log(`Finished crawling ${articleName} [${--activeCrawlerCount} active]`);
      }
      catch (e) {
        console.error(e);//Report and consume error
        --activeCrawlerCount;
      }
    })());

    //Avg 4-second delay with 20% variance, to prevent triggering 429 Too Many Requests error
    await setTimeoutAsync(Math.floor(4000 * (.8 + .4 * Math.random())));
  }

  //Wait until all crawl operations are resolved
  await Promise.all(crawlPromises);

  return heroes;
}

/**
 * Downloads the raw article and parses hero data.
 * @param {string} articleName
 * @return {Promise<Hero | { cho: Hero, gall: Hero }>} Hero object for most heroes, `{ cho, gall }` for Cho'Gall
 */
async function crawlHeroData(articleName) {
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
 * @throws Any errors thrown by `axios.get()`
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
 * Asynchronously applies `converter.convert()` to the iconUrl of every
 * skill/talent of the given hero object.
 * @param {Hero} hero
 * @param {ImageNameConverter} converter
 */
async function forEachIconAsync(hero, converter) {
  const converterPromises = [];

  for (const skill of hero.skills) {
    converterPromises.push(converter.convert(skill.iconUrl).then(
      iconUrl => skill.iconUrl = iconUrl,
      e => console.error(e) //Report and consume error
    ));
  }

  for (const talentLevel in hero.talents) {
    for (const talent of hero.talents[talentLevel]) {
      converterPromises.push(converter.convert(talent.iconUrl).then(
        iconUrl => talent.iconUrl = iconUrl,
        e => console.error(e) //Report and consume error
      ));
    }
  }

  //Wait until all operations are resolved
  await Promise.all(converterPromises);
}

/**
 * Extracts image URLs from the given listfile.
 * @param {string} listFilePath
 * @return {string[]} Array of image URLs, or an empty array if none is found.
 */
function parseImageUrlsFromFile(listFilePath) {
  const listFile = fs.readFileSync(listFilePath, 'utf8');
  return listFile.match(/http.+?\.(?:png|jpg|jpeg|gif|bmp)/gi) || [];
}

/**
 * Downloads and calculates the sha1 hash of each image.
 * @param {string[]} urls
 * @return {Promise<Object.<string, string>>} A mapping of sha1 hash => image URL.
 */
async function generateHashToUrlMapping(urls) {
  const hashToUrls = {};
  process.stdout.write('Retrieving hosted images...');

  //Load images concurrently in groups of 20 to avoid hammering the servers too hard
  let hashPromises = [];

  for (let i = 0; i < urls.length; ++i) {
    const url = urls[i];
    hashPromises.push(downloadArrayBuffer(url).then(
      arrayBuffer => {
        const hash = computeHash(arrayBuffer);

        if (hash in hashToUrls)
          console.warn(`\nDuplicate image: ${url}\n is identical to ${hashToUrls[hash]}`);
        else {
          hashToUrls[hash] = url;
          process.stdout.write('.');
        }
      },
      e => {
        console.error();
        console.error(e); //Report and consume error
      }
    ));

    if (i % 20 === 0 || i === urls.length - 1) {
      await Promise.all(hashPromises);  //Wait for all requests to resolve
      await setTimeoutAsync(500);  //0.5s delay
      hashPromises = [];
    }
  }

  console.log('done');
  return hashToUrls;
}