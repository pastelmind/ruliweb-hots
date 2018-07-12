#!/usr/bin/env node

/**
 * @file Combines the contents of all files in `templates/` and stores them as
 * in src/js/templates.js
 */


const fs = require('fs');
const path = require('path');
const juice = require('juice');


juice.codeBlocks.mustacheCss = { start: '({{', end: '}})' };


//Load a list of template files
const templatesDir = path.join(__dirname, 'templates/');
console.log('Using template dir:', templatesDir);
const fileNames = fs.readdirSync(templatesDir);

//Load CSS
const cssPath = path.join(templatesDir, 'css/insert-tables.css');
console.log('Using CSS file:', cssPath, '\n');
const css = fs.readFileSync(cssPath, 'utf8');

//Read and process the contents of each file and store it in an object
const templates = {}
for (const fileName of fileNames) {
  const filePath = path.join(templatesDir, fileName);
  if (fs.statSync(filePath).isDirectory()) continue;

  const templateName = fileName.replace(/\.[^\.]+$/, ''); //Remove file extension
  if (templateName in templates)
    throw new Error('Duplicate template name:', templateName, '/ contents:', templates[templateName]);

  const rawTemplate = fs.readFileSync(filePath, 'utf8');
  console.log('Read template:', JSON.stringify(templateName) + ' '.repeat(Math.max(0, 20 - templateName.length)), 'from', filePath);

  //Covert CSS classes to inline CSS
  let template = juice.inlineContent(rawTemplate, css);

  //Did CSS inlining make a difference?
  if (rawTemplate !== template) {
    //Strip unnecessary CSS classes
    template = stripCssClasses(template, [
      'ruliweb-hots-hero-table',
      'ruliweb-hots-skill-table',
      'ruliweb-hots-talent-table'
    ]);
  }

  //Additional processing
  template = ruliwebCssFix(template);
  template = compactInlineCss(template);
  template = compactElements(template);

  templates[templateName] = template;
}

//Save the templates as a JavaScript file
const assignTarget = 'HotsDialog.htmlGenerators.templates';  //Target variable or object to assign the JSON to
const outputFilePath = path.join(__dirname, 'src/js/templates.js');
fs.writeFileSync(outputFilePath, assignTarget + ' = ' + JSON.stringify(templates, null, 2));
console.log('\nTemplates written to', outputFilePath);
console.log('Once loaded, templates can be accessed with', assignTarget);


/**
 * Removes all CSS classes from each element, except for those in `whitelist`.
 * If the `class` attribute is emptied by this, it is removed.
 * @param {string} html HTML source
 * @param {string[]=} whitelist CSS classes that should not be removed
 * @return {string} Modified HTML
 */
function stripCssClasses(html, whitelist = []) {
  whitelist = whitelist.map(cssClass => cssClass.toLowerCase());

  return html.replace(/\s*class="(.*?)"/gi, (classAttr, classList) => {
    classList = classList.split(/\s+/g).filter(cssClass => whitelist.includes(cssClass.toLowerCase())).join(' ');
    return classList ? ' class="' + classList + '" ' : ' ';
  });
}

/**
 * Applies the following fixes:
 * - `width` or `height` in inline CSS are changed to uppercase.
 *   See https://github.com/pastelmind/ruliweb-hots/issues/16
 * @param {string} html HTML source
 * @return {string} Modified HTML
 */
function ruliwebCssFix(html) {
  return html.replace(/\s*style=".*?"/gi, styleAttr =>
    styleAttr.replace(/width|height/gi, keyword => keyword.toUpperCase())
  );
}

/**
 * Removes trailing semicolon in inline CSS
 * @param {string} html HTML source
 * @return {string} Modified HTML
 */
function compactInlineCss(html) {
  return html.replace(/\s*style="(.*?);\s*"/gi, (styleAttr, css) => ` style="${css}"`);
}

/**
 * Removes extraneous spaces between element attributes
 * @param {string} html HTML source
 * @return {string} Modified HTML
 */
function compactElements(html) {
  return html.replace(/<(\w+)((?:\s+[\w\-]+(?:\=".*?")?)*)\s*>/gi, (match, elem, attrList) =>
    '<' + elem + (attrList ? attrList.match(/\s[\w\-]+(?:\=".*?")?/g).join('') : '') + '>'
  );
}