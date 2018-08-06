#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const util = require('util');
const axios = require('axios');
const program = require('commander');
const namu2hots = require('./src/namu2hots');
const Hero = require('./src/hero');
const CachedUrlHasher = require('./src/cached-url-hasher');
const HeroTransformers = require('./src/hero-transformers');

const setTimeoutAsync = util.promisify(setTimeout);

const urlHasher = new CachedUrlHasher;


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

/**
 * Enum for commands
 * @enum {number}
 */
const Commands = {
  SAVE_IMAGES: 1,
  SAVE_JSON: 2
};

if (require.main === module) {
  let cmd = null;

  const defaultSaveImagesDir = path.join(__dirname, '../temp/namu-images/');

  program.command('save-images [savedir]')
    .description(`Download and save images from NamuWiki to [savedir] (default: ${defaultSaveImagesDir})`)
    .action((saveDir = defaultSaveImagesDir) => {
      cmd = {
        type: Commands.SAVE_IMAGES,
        saveDir: path.normalize(saveDir)
      };
    });

  const defaultSaveJsonPath = path.join(__dirname, '../temp/hots.json');

  program.command('save-json <hots_ver> [savepath]')
    .description(`Parse and save hero data (JSON) marked as <hots_ver> to [jsonfile] (default: ${defaultSaveJsonPath})`)
    .option('-p, --hero-portraits [jsonfile]', 'Load hero portrait from [jsonfile]', path.join(__dirname, 'data/hero-portraits.json'))
    .option('-l, --image-url-list <listfile>', 'Replace skill/talent icon names with image URLs in <listfile>')
    .action((hotsVersion, saveJsonPath, options) => {
      cmd = {
        type: Commands.SAVE_JSON,
        hotsVersion,
        saveJsonPath: path.normalize(saveJsonPath || defaultSaveJsonPath),
        imageUrlListFile: options.imageUrlList
      };

      //Test JSON path early to catch errors
      fs.writeFileSync(cmd.saveJsonPath, 'test');

      //Load portraits early to catch errors
      if (options.heroPortraits)
        cmd.heroPortraits = JSON.parse(fs.readFileSync(options.heroPortraits));
    });

  program.parse(process.argv);

  if (!cmd)
    program.help();

  mainAsync(cmd).catch(error => console.error(error));
}

async function mainAsync(cmd) {
  const converters = [];
  let unusedUrls = null;

  if (cmd.type === Commands.SAVE_IMAGES) {
    converters.push(HeroTransformers.getNamuIconUrlAdder(articleNames));
    converters.push(HeroTransformers.getSkillAndTalentIconDownloader(cmd.saveDir));
  }
  else if (cmd.type === Commands.SAVE_JSON) {
    if (cmd.imageUrlListFile) {
      converters.push(HeroTransformers.getNamuIconUrlAdder(articleNames));
      converters.push(HeroTransformers.getSkillAndTalentIconHasher(urlHasher));

      //Parse all image URLs in the listfile
      const hostedImageUrls = parseImageUrlsFromFile(cmd.imageUrlListFile);
      const hashToHostedUrl = await generateHashToUrlMapping(hostedImageUrls);
      const hashToImageMatcher = HeroTransformers.getSkillAndTalentIconHashMatcher(hashToHostedUrl);
      converters.push(async hero => { unusedUrls = hashToImageMatcher(hero); });
    }
  }
  else
    throw new Error('Unknown command: ' + cmd.type);

  const heroes = await crawlArticles(articleNames, converters);

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
  if (cmd.type === Commands.SAVE_JSON) {
    const outputJson = { hotsVersion: cmd.hotsVersion, heroes: Hero.compact(heroes) };
    fs.writeFileSync(cmd.saveJsonPath, JSON.stringify(outputJson, null, 2));
    console.log('Hero data saved to', cmd.saveJsonPath);
  }

  if (unusedUrls && unusedUrls.size) {
    console.warn('The following URLs from the listfile were not matched with any icon:');
    for (const url of unusedUrls)
      console.warn('- ' + url);
  }
}


/**
 * Asynchronously crawls all articles and generates a collection of hero data.
 * @param {Iterable<string>} articleNames
 * @param {HeroTransformCallback[]=} heroTransformers
 * @return {Promise<Object.<string, Hero>} A collection of hero ID => Hero object
 */
async function crawlArticles(articleNames, heroTransformers = []) {
  const heroes = {};

  const crawlPromises = [];
  let activeCrawlerCount = 0;

  for (const articleName of articleNames) {
    crawlPromises.push((async () => {
      try {
        console.log(`Crawling ${articleName} [${++activeCrawlerCount} active]...`);
        const heroArray = await crawlHeroData(articleName);

        for (const hero of heroArray) {
          heroes[hero.id] = hero;
          hero.articleName = articleName;
          for (const transformer of heroTransformers)
            await transformer(hero);
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
 * @return {Promise<Hero[]]>} Array that contains a single hero object, or two in case of Cho'Gall
 */
async function crawlHeroData(articleName) {
  const rawArticleResponse = await axios.get(
    'https://namu.wiki/raw/' + encodeURIComponent(articleName),
    { responseType: 'text' }
  );

  const namuMarkup = rawArticleResponse.data;

  //Exception: Cho'Gall is two heroes in one
  if (articleName.includes('초갈')) {
    const choGall = namu2hots.parseChoGallPage(namuMarkup);
    return [choGall.cho, choGall.gall];
  }
  else
    return [namu2hots.parseHeroPage(namuMarkup)];
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

  const CHUNK_SIZE = 20;  //Load images concurrently in chunks of 20 to avoid hammering the servers too hard

  for (let i = 0; i < urls.length; i += CHUNK_SIZE) {
    const hashPromises = urls.slice(i, i + CHUNK_SIZE).map(url => (async () => {
      try {
        const hash = await urlHasher.hash(url);

        if (hash in hashToUrls)
          console.warn(`\nDuplicate image: ${url}\n is identical to ${hashToUrls[hash]}`);
        else {
          hashToUrls[hash] = url;
          process.stdout.write('.');
        }
      }
      catch (e) { console.error('\n', e); } //Report and consume error
    })());

    await Promise.all(hashPromises);  //Wait for all requests to resolve
    await setTimeoutAsync(500);       //0.5s delay
  }

  console.log('done');
  return hashToUrls;
}