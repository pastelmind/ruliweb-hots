#!/usr/bin/env node
'use strict';

/**
 * Package the extension source directory into a ZIP file
 */

const fs = require('fs');
const path = require('path');
const util = require('util');
const yazl = require('yazl');


const statAsync = util.promisify(fs.stat);
const readdirAsync = util.promisify(fs.readdir);
const readFileAsync = util.promisify(fs.readFile);


const packageVersion = process.env.npm_package_version;
if (!packageVersion)
  throw new Error(`Missing package version (value: ${packageVersion})`);

const extensionZip = new yazl.ZipFile();
const sourceDirPath = path.join(__dirname, 'src')
const targetZipPath = path.join(__dirname, `../build/ruliweb-hots.${packageVersion}.zip`);
const targetZipStream = fs.createWriteStream(targetZipPath);

(async () => {
  for (const filePath of await allFiles(sourceDirPath)) {
    const pathInZip = path.relative(sourceDirPath, filePath).replace(/\\/g, '/');
    const fileContents = await readFileAsync(filePath);
    extensionZip.addFile(filePath, pathInZip);
    // extensionZip.file(pathInZip, fileContents);
  }

  extensionZip.end();

  extensionZip.outputStream
    // .generateNodeStream({ type: 'nodebuffer', compression: 'DEFLATE', compressionOptions: { level: 9 } })
    .pipe(targetZipStream)
    .on('finish', () => {
      console.log('Extension has been packaged into ZIP file:', targetZipPath);
    });
})();


//-------- Support functions --------//

/**
 * Returns a list of paths to all files under the directory (recursive).
 * @param {string} dirPath Path to file or directory
 * @return {Promise<string[]>} Array of all files in dirPath (recursive)
 */
async function allFiles(dirPath) {
  const dirStats = await statAsync(dirPath);

  if (dirStats.isDirectory()) {
    const files = [];

    for (const fileName of await readdirAsync(dirPath))
      files.push(...await allFiles(path.join(dirPath, fileName)));

    return files;
  }
  else  //dirPath is a file
    return [dirPath];
}