#!/usr/bin/env node

/**
 * Combines the contents of all files in `templates/` and stores them as a
 * browser-side script in src/js/templates.js
 */


const fs = require('fs');
const path = require('path');
const juice = require('juice');
const minifyHtml = require('html-minifier').minify;


/**
 * List of CSS class names to preserve when inlining CSS.
 */
const CSS_CLASSES_PRESERVED = Object.freeze({
  'ruliweb-hots-hero-table': 0,
  'ruliweb-hots-skill-table': 0,
  'ruliweb-hots-talent-table': 0,
});


// -------- Main code -------- //

// Load a list of template files
const templatesDir = path.join(__dirname, 'templates/');
console.log('Using template dir:', templatesDir);
const fileNames = fs.readdirSync(templatesDir);

// Load CSS
const cssPath = path.join(templatesDir, 'css/insert-tables.css');
console.log('Using CSS file:', cssPath, '\n');
const css = fs.readFileSync(cssPath, 'utf8');

// Read and process the contents of each file and store it in an object
const templates = {};
for (const fileName of fileNames) {
  const filePath = path.join(templatesDir, fileName);
  if (fs.statSync(filePath).isDirectory()) continue;

  // Remove file extension
  const templateName = fileName.replace(/\.[^\.]+$/, '');
  console.assert(
    !(templateName in templates),
    'Duplicate template name found: ' + templateName
  );

  // Normalize CRLF to LF
  let template = fs.readFileSync(filePath, 'utf8').replace(/\r/g, '');
  console.log('Read template:', templateName.padEnd(20), 'from', filePath);

  // Check if the template is insertable content and should be CSS-inlined
  if (/^insert-/gi.test(templateName)) template = inlineCss(template, css);

  // Minify HTML
  templates[templateName] = minifyHtml(template, {
    collapseBooleanAttributes: true,
    ignoreCustomFragments: [/\{{2,3}.*?\}{2,3}/],
    minifyCSS: true,
    removeEmptyAttributes: true,
  });
}

// Save the templates as a JavaScript file
const assignTarget = 'HotsDialog.htmlGenerators.templates';
const outputFilePath = path.join(__dirname, 'src/js/templates.js');
fs.writeFileSync(
  outputFilePath, assignTarget + ' = ' + JSON.stringify(templates, null, 2)
);
console.log('\nTemplates written to', outputFilePath);
console.log('Once loaded, templates can be accessed with', assignTarget);


// -------- Support functions -------- //

/**
 * Convert all styles in the given HTML to inline CSS and removes unnecessary
 * CSS classes.
 * @param {string} html HTML source
 * @param {string} cssToInline Contents of stylesheet to use for inlining CSS
 * @return {string} Processed HTML
 */
function inlineCss(html, cssToInline) {
  // Convert CSS classes to inline CSS
  html = juice.inlineContent(html, cssToInline);

  // Postprocessing for inlined CSS
  html = stripCssClasses(html, CSS_CLASSES_PRESERVED);
  html = ruliwebCssFix(html);
  html = minifyCssFix(html);

  return html;
}

/**
 * Removes all CSS classes from each element, except for those in `whitelist`.
 * @param {string} html HTML source
 * @param {Object<string, *>} whitelist Object whose keys are CSS classes that
 *    should not be removed. Values are ignored.
 * @return {string} Modified HTML
 */
function stripCssClasses(html, whitelist = {}) {
  return html.replace(/\sclass="([^]*?)"/gi, (classAttr, classList) => {
    classList = classList.trim().split(/\s+/)
      .filter(cssClass => cssClass in whitelist).join(' ');
    return classList ? ` class="${classList}"` : '';
  });
}

/**
 * Applies the following fix(es):
 * - `width` or `height` in inline CSS are changed to uppercase.
 *   See https://github.com/pastelmind/ruliweb-hots/issues/16
 * @param {string} html HTML source
 * @return {string} Modified HTML
 */
function ruliwebCssFix(html) {
  return html.replace(/\sstyle="[^]*?"/gi, styleAttr =>
    styleAttr.replace(/width/gi, 'WIDTH').replace(/height/gi, 'HEIGHT'));
}

/**
 * Further minify CSS that has not been optimized by html-minifier.
 * Applies the following fix(es):
 * - Remove spaces between `width: {{...}}` or `height: {{...}}`
 * @param {*} html
 * @return {string}
 */
function minifyCssFix(html) {
  return html.replace(/(width|height):\s+/gi, '$1:');
}
