#!/usr/bin/env node

/**
 * @file Combines the contents of all files in `templates/` and stores them as
 * in src/js/templates.js
 */


const fs = require('fs');
const path = require('path');


//Load a list of template files
const templatesDir = path.join(__dirname, 'templates/');
console.log('Using template dir:', templatesDir);
const fileNames = fs.readdirSync(templatesDir);

//Read the contents of each file and store it in an object
const templates = {}
for (const fileName of fileNames) {
  const filePath = path.join(templatesDir, fileName);
  const templateName = fileName.replace(/\.[^\.]+$/, ''); //Remove file extension

  if (templateName in templates)
    throw new Error('Duplicate template name:', templateName,  '/ contents:', templates[templateName]);

  templates[templateName] = fs.readFileSync(filePath, 'utf8');
  console.log('Read template:', JSON.stringify(templateName) + ' '.repeat(Math.max(0, 20 - templateName.length)), 'from', filePath);
}

//Save the templates as a JavaScript file
const assignTarget = 'HotsDialog.htmlGenerators.templates';  //Target variable or object to assign the JSON to
const outputFilePath = path.join(__dirname, 'src/js/templates.js');
fs.writeFileSync(outputFilePath, assignTarget + ' = ' + JSON.stringify(templates));
console.log('Templates written to', outputFilePath);
console.log('Once loaded, templates can be accessed with', assignTarget);