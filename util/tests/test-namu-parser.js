#!/usr/bin/env node

/**
 * Test script for namu2hots, intended to be called from the command line.
 */

'use strict';

const fs = require('fs');
const rewire = require('rewire');
const namu2hots = rewire('../src/namu2hots.js');


const Tests = {
  testTableParser(namuMarkup) {
    return namu2hots.__get__('parseTables')(
      namu2hots.__get__('removeTableMarkup')(namuMarkup)
    );
  },

  testColorSpanRemove(namuMarkup) {
    return namu2hots.__get__('removeColorSpanMarkup')(
      namuMarkup,
      ['#eefee7', '#ffffff', '#ffd700']
    );
  },

  testRemoveImages(namuMarkup) {
    return namu2hots.__get__('removeImages')(
      namuMarkup,
      namu2hots.COMMON_IMAGES
    );
  },

  testRemoveBold(namuMarkup) {
    return namu2hots.__get__('removeBoldFormatting')(namuMarkup);
  },

  testRemoveAnchors(namuMarkup) {
    return namu2hots.__get__('removeAnchors')(namuMarkup);
  },

  testSections(namuMarkup) {
    return namu2hots.__get__('parseSections')(namuMarkup);
  },

  testComposite(namuMarkup) {
    namuMarkup = namu2hots.__get__('removeColorSpanMarkup')(
      namuMarkup,
      namu2hots.__get__('COMMON_TEXT_COLORS')
    );

    namuMarkup = namu2hots.__get__('removeTableMarkup')(namuMarkup);
    // namuMarkup = namu2hots.__get__('removeImages')(namuMarkup, namu2hots.COMMON_IMAGES);
    namuMarkup = namu2hots.__get__('removeAnchors')(namuMarkup);
    // namuMarkup = namu2hots.__get__('removeBoldFormatting')(namuMarkup);

    const sections = namu2hots.__get__('parseSections')(namuMarkup);

    for (const header in sections)
      sections[header] = namu2hots.__get__('parseTables')(sections[header]);

    return sections;
  },

  testParseHero(namuMarkup) {
    return namu2hots.__get__('parseHeroPage')(namuMarkup);
  }
};

function runTests() {
  const test = process.argv[2];
  if (test) {
    const filePath = process.argv[3] || 'temp/namu-dump/D.Va.txt';
    const namuMarkup = fs.readFileSync(filePath, 'utf8');

    const testName = ('test' + test).toLowerCase();
    let matchFound = false;
    for (const testFuncName in Tests) {
      if (testFuncName.toLowerCase() === testName) {
        matchFound = true;

        console.log(`Running test: ${testFuncName}()  (input size is ${namuMarkup.length} characters)`)

        let result = Tests[testFuncName](namuMarkup);

        let resultFile;
        if (typeof result === 'string')
          resultFile = 'temp/output.txt';
        else {
          resultFile = 'temp/output.json';
          result = JSON.stringify(result, null, 2);
        }

        fs.writeFileSync(resultFile, result);

        console.log(`Test finished, results written to ${resultFile} (output size: ${result.length} characters)`);
        break;
      }
    }

    if (matchFound)
      return;

    console.log(test + ' does not match any test available\n');
  }

  console.log('Available tests:');
  for (const testFuncName in Tests)
    console.log('\t' + testFuncName.toLowerCase().replace('test', ''));
}


if (require.main === module) {
  runTests();
}