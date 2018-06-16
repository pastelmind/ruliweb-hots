#!/usr/bin/env node

/**
 * Test script for namu2hots, intended to be called from the command line.
 */

'use strict';

const fs = require('fs');
const rewire = require('rewire');
const namu2hots = rewire('../src/namu2hots.js');


const Tests = {
  parseTable: 'parseTables',
  removeTableMarkup: 'removeTableMarkup',

  removeColorSpan(namuMarkup) {
    return namu2hots.__get__('removeColorSpanMarkup')(
      namuMarkup,
      namu2hots.__get__('COMMON_TEXT_COLORS')
    );
  },

  removeImages(namuMarkup) {
    return namu2hots.__get__('removeImages')(
      namuMarkup,
      namu2hots.COMMON_IMAGES
    );
  },

  removeBold: 'removeBoldFormatting',
  removeAnchors: 'removeAnchors',
  parseSections: 'parseSections',

  composite(namuMarkup) {
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
    return namu2hots.parseHeroPage(namuMarkup);
  }
};


function findTest(token) {
  token = token.toLowerCase();
  const matches = [];

  for (const testFuncName in Tests)
    if (testFuncName.toLowerCase().includes(token))
      matches.push(testFuncName);

  if (matches.length === 1)
    return matches[0];
  else if (matches.length === 0) {
    console.error(token, 'does not match a valid test name');
    return null;
  }
  else {
    console.error(token, 'matches multiple tests:', matches.join());
    return null;
  }
}


function executeTests(tests) {
  const filePath = process.argv[3] || 'temp/namu-dump/D.Va.txt';
  let data = fs.readFileSync(filePath, 'utf8');
  let dataLength = data.length;

  tests.forEach(testFuncName => {
    console.log(`Running test: ${testFuncName}(), input size is ${dataLength} characters.`)

    const testTarget = Tests[testFuncName];
    if (typeof testTarget === 'function')
      data = testTarget(data);
    else
      data = namu2hots.__get__(testTarget)(data);

    dataLength = (typeof data === 'string' ? data.length : JSON.stringify(data).length);
    console.log(`\tTest completed, output is ${typeof data} of ${dataLength} characters.`);
  });

  let resultFile;
  if (typeof data === 'string')
    resultFile = 'temp/output.txt';
  else {
    resultFile = 'temp/output.json';
    data = JSON.stringify(data, null, 2);
  }

  fs.writeFileSync(resultFile, data);
  console.log(`Test finished, results written to ${resultFile} (output size: ${data.length} characters)`);
}


function runTestScript() {
  const testArg = process.argv[2];

  if (testArg) {
    const testTokens = testArg.toLowerCase().split(',');
    const tests = [];

    for (let i = 0; i < testTokens.length; ++i) {
      const testFuncName = findTest(testTokens[i]);
      if (!testFuncName) {
        tests = []; //Don't perform any tests
        break;
      }
      else
        tests.push(testFuncName);
    }

    if (tests.length) {
      executeTests(tests);
      return;
    }
  }

  console.log('Available tests:');
  for (const testFuncName in Tests)
    console.log('\t' + testFuncName);
}


if (require.main === module) {
  runTestScript();
}