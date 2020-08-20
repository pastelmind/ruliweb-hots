#!/usr/bin/env node

/**
 * Import/export icon URLs fro HTML listfiles and hots.json
 */

import { promises as fsPromises } from "fs";
import path from "path";
import { fileURLToPath } from "url";

import program from "commander";

/**
 * @typedef {import("../generated-types/hots").RuliwebHotSDataset} RuliwebHotSDataset
 */

/**
 * Intermediate format for exporting icon URLs. Icons are grouped by portraits,
 * hero-specific skill/talent icons, shared and unused icons.
 * @typedef {Object} IconUrlGroups
 * @prop {Map<string, string>} portraits
 * Hero portrait icons, mapped by icon ID => URL and sorted by hero name.
 * @prop {Map<string, Map<string, string>>} skillsAndTalents
 * Skill/talent icons specific to each hero, mapped by hero ID => icon ID => URL
 * and sorted by hero name / icon ID.
 * @prop {Map<string, string>} shared
 * Skill/talent icons shared by multiple heroes, mapped by icon ID => URL and
 * sorted by ID.
 * @prop {Map<string, string>} unused
 * Unused icons, mapped by icon ID => URL and sorted by ID.
 */

// -------- Main code -------- //

const { readFile, writeFile } = fsPromises;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_JSON_PATH = path.join(__dirname, "../docs/hots.json");

program
  .command("import <listfiles...>")
  .description("Import icon URLs from <img> tags in one or more HTML listfiles")
  .option(
    "-i, --input-json [jsonfile]",
    "Source HotS JSON file to read from",
    DEFAULT_JSON_PATH
  )
  .option(
    "-o, --output-json [jsonfile]",
    "Target HotS JSON file to write to (default: same file specified by -i)"
  )
  .option("-f, --force", "Overwrite icon IDs whose URLs have changed")
  .option(
    "-k, --skip-same-url",
    "Don't add new icons whose URLs are already used by existing icons"
  )
  .action(importListfiles);

program
  .command("export <listfile>")
  .description("Export icon URLs as <img> tags to a HTML listfile")
  .option(
    "-i, --input-json [jsonfile]",
    "Source HotS JSON file to read from",
    DEFAULT_JSON_PATH
  )
  .action(exportListfile);

program
  .command("clean")
  .description("Remove unused icon URLs in the HotS JSON file")
  .option(
    "-i, --input-json [jsonfile]",
    "Source HotS JSON file to read from",
    DEFAULT_JSON_PATH
  )
  .option(
    "-o, --output-json [jsonfile]",
    "Target HotS JSON file to write to (default: same file specified by -i)"
  )
  .action(cleanUnusedIcons);

program.on("command:*", () => program.help());

program.parse(process.argv);

if (process.argv.length <= 2) program.help();

/**
 * Import icons from one or more HTML listfiles into HotS JSON.
 * @param {string[]} listfiles One or more paths to listfiles
 * @param {Object} options
 * @param {string} options.inputJson JSON file to read from
 * @param {string=} options.outputJson JSON file to write to
 * @param {boolean=} options.force If truthy, always overwrite icon URLs.
 * @param {boolean=} options.skipSameUrl If truthy, do not add an icon if its
 *    URL is already used by another icon.
 */
async function importListfiles(listfiles, options) {
  try {
    console.log("Reading HotS JSON from", options.inputJson);
    const hotsData = await loadHotsData(options.inputJson);

    const listfileContents = await Promise.all(
      listfiles.map((file) => {
        console.log("Importing", file);
        return readFile(file, "utf8");
      })
    );

    for (const listfileHtml of listfileContents) {
      const iconUrls = extractIconUrlsFromHtml(listfileHtml);

      importIconUrls(
        hotsData,
        iconUrls.icons,
        options.force,
        options.skipSameUrl
      );
      importUnidentifiedIconUrls(hotsData, iconUrls.unknownIcons);
    }

    const outputJsonPath = options.outputJson || options.inputJson;
    await saveHotsData(outputJsonPath, hotsData);
    console.log("HotS JSON saved to", outputJsonPath);
  } catch (e) {
    console.error(e);
    process.exitCode = 1;
  }
}

/**
 * Export icons from HotS JSON to HTML listfile.
 * @param {string} listfile Path to listfile
 * @param {{ inputJson: string }} options Options object
 */
async function exportListfile(listfile, options) {
  try {
    console.log("Reading HotS JSON from", options.inputJson);
    const hotsData = await loadHotsData(options.inputJson);

    const iconUrlGroups = exportIconUrls(hotsData);
    const listfileHtml = generateIconListfileHtml(iconUrlGroups, hotsData, 300);

    await writeFile(listfile, listfileHtml);
    console.log("Listfile saved to", listfile);
  } catch (e) {
    console.error(e);
    process.exitCode = 1;
  }
}

/**
 * Removes unused icons in the HotS JSON file.
 * @param {{ inputJson: string, outputJson: string, }} options Options object
 */
async function cleanUnusedIcons(options) {
  try {
    console.log("Reading HotS JSON from", options.inputJson);
    const hotsData = await loadHotsData(options.inputJson);

    const iconUrlGroups = exportIconUrls(hotsData);
    for (const iconId of iconUrlGroups.unused.keys()) {
      delete hotsData.iconUrls[iconId];
    }

    console.log("Deleted", iconUrlGroups.unused.size, "unused icon(s)");

    const outputJsonPath = options.outputJson || options.inputJson;
    await saveHotsData(outputJsonPath, hotsData);
    console.log("HotS JSON saved to", outputJsonPath);
  } catch (e) {
    console.error(e);
    process.exitCode = 1;
  }
}

// -------- Support functions -------- //

/**
 * Loads a JSON file as a HotsData object.
 * Warning: Does NOT actually validate the data!
 * @param {string} path Path to the JSON file
 * @return {Promise<RuliwebHotSDataset>}
 */
async function loadHotsData(path) {
  return /** @type {RuliwebHotSDataset} */ (JSON.parse(
    await readFile(path, "utf8")
  ));
}

/**
 * Writes a HotsData object to a file.
 * @param {string} path Path to the JSON file
 * @param {RuliwebHotSDataset} hotsData
 */
async function saveHotsData(path, hotsData) {
  await writeFile(path, JSON.stringify(hotsData, null, 2));
}

/**
 * Merges the given icon URL list into the HotsData object.
 * @param {RuliwebHotSDataset} hotsData HotsData object to merge the icon URLs
 * @param {Map<string, string>} iconUrls List of icon URLs mapped by ID
 * @param {boolean} overwrite If truthy, overwrite conflicting URLs with new
 *    ones. Default is `false`.
 * @param {boolean} skipSameUrl If truthy, do not add new icons if an existing
 *    icon already has the same URL. Default is `false`.
 */
function importIconUrls(
  hotsData,
  iconUrls,
  overwrite = false,
  skipSameUrl = false
) {
  /** @type {Map<string, string>} */
  const iconUrlToId = new Map();
  if (skipSameUrl) {
    for (const [iconId, url] of Object.entries(hotsData.iconUrls)) {
      if (!iconUrlToId.has(url)) {
        iconUrlToId.set(url, iconId);
      }
    }
  }

  for (const [iconId, url] of iconUrls) {
    if (iconUrlToId.has(url)) {
      console.log(
        `Ignore icon ${iconId}: ${url} is already used by ID = `,
        iconUrlToId.get(url)
      );
      continue;
    }

    const oldIconUrl = hotsData.iconUrls[iconId];
    if (oldIconUrl) {
      if (oldIconUrl === url) continue;
      else if (overwrite) {
        console.log(
          `Overwrite icon URL for ${iconId}: ${oldIconUrl} => ${url}`
        );
        iconUrlToId.delete(oldIconUrl);
      } else {
        console.warn(
          `Ignore icon ${iconId}: ` +
            `URL already set to ${oldIconUrl}, ignoring ${url}`
        );
        continue;
      }
    }

    hotsData.iconUrls[iconId] = url;
    if (skipSameUrl) {
      iconUrlToId.set(url, iconId);
    }
  }
}

/**
 * Merges a list of icon URLs, whose IDs are unknown, into the HotsData object.
 * If a URL is not already in the HotsData object, it is assigned a unique ID.
 * @param {RuliwebHotSDataset} hotsData HotsData object to merge the icon URLs
 * @param {Iterable<string>} unidentifiedIconUrls List of icon URLs whose IDs
 *    are unknown
 */
function importUnidentifiedIconUrls(hotsData, unidentifiedIconUrls) {
  const knownIconUrls = new Set(Object.values(hotsData.iconUrls));

  let unusedIdIndex = 0;
  let unusedId;
  for (const url of unidentifiedIconUrls) {
    if (!knownIconUrls.has(url)) {
      do {
        unusedId = "unused" + unusedIdIndex++;
      } while (unusedId in hotsData.iconUrls);

      hotsData.iconUrls[unusedId] = url;
    }
  }
}

/**
 * Extracts all icon URLs, grouped by hero.
 * @param {RuliwebHotSDataset} hotsData Contents of hots.json
 * @return {IconUrlGroups} Icon URLs grouped
 */
function exportIconUrls(hotsData) {
  /** @type {Map<string, string>} */
  const portraits = new Map();
  /** @type {Map<string, Map<string, string>>} */
  const skillsAndTalents = new Map();

  /** @type {Map<string, string>} */
  const unusedIconUrls = new Map(Object.entries(hotsData.iconUrls));
  /** @type {Map<string, Set<string>>} */
  const heroesUsingSkillIcons = new Map();

  // Sort icons by hero name
  const sortedHeroes = [
    ...Object.entries(hotsData.heroes),
    ...Object.entries(hotsData.ptrHeroes || {}),
  ].sort(([, heroA], [, heroB]) => heroA.name.localeCompare(heroB.name, "en"));

  for (const [heroId, hero] of sortedHeroes) {
    if (hero.icon in hotsData.iconUrls) {
      portraits.set(hero.icon, hotsData.iconUrls[hero.icon]);
      unusedIconUrls.delete(hero.icon);
    }

    let skillTalentIconUrls = skillsAndTalents.get(heroId);
    if (!skillTalentIconUrls) {
      skillsAndTalents.set(heroId, (skillTalentIconUrls = new Map()));
    }

    const allSkillsAndTalents = [
      ...hero.skills,
      ...Object.values(hero.talents).flat(),
    ];

    for (const skillOrTalent of allSkillsAndTalents) {
      if (skillOrTalent.icon in hotsData.iconUrls) {
        let heroesUsingIcon = heroesUsingSkillIcons.get(skillOrTalent.icon);
        if (!heroesUsingIcon) {
          heroesUsingSkillIcons.set(
            skillOrTalent.icon,
            (heroesUsingIcon = new Set())
          );
        }
        heroesUsingIcon.add(heroId);

        skillTalentIconUrls.set(
          skillOrTalent.icon,
          hotsData.iconUrls[skillOrTalent.icon]
        );
        unusedIconUrls.delete(skillOrTalent.icon);
      }
    }
  }

  // Extract shared skill/talent icons to their own group
  /** @type {Map<string, string>} */
  const sharedIconUrls = new Map();
  for (const [iconId, heroesUsingIcon] of heroesUsingSkillIcons) {
    if (heroesUsingIcon.size > 1) {
      sharedIconUrls.set(iconId, hotsData.iconUrls[iconId]);
      for (const heroId of heroesUsingIcon) {
        const skillTalentIconUrls = skillsAndTalents.get(heroId);
        if (skillTalentIconUrls) {
          skillTalentIconUrls.delete(iconId);
        }
      }
    }
  }

  return {
    portraits,
    skillsAndTalents,
    shared: new Map(
      [...sharedIconUrls.entries()].sort(([iconIdA], [iconIdB]) =>
        iconIdA.localeCompare(iconIdB)
      )
    ),
    unused: new Map(
      [...unusedIconUrls.entries()].sort(([iconIdA], [iconIdB]) =>
        iconIdA.localeCompare(iconIdB)
      )
    ),
  };
}

/**
 * Converts icon URL groups into listfile HTML. Skill and talent icons are split
 * into subgroups, while each of portraits, shared and unused icons are put in a
 * subgroup of their own.
 * @param {IconUrlGroups} iconUrlGroups Icon URL group object generated by
 *    `extractIconUrls()`
 * @param {RuliwebHotSDataset} hotsData HotsData object used to generate the
 *    icon URL groups
 * @param {number} iconSubgroupMaxSize Max number of skill/talent icons per
 *    subgroup. Default is 200.
 * @return {string} HTML source of listfile
 */
function generateIconListfileHtml(
  iconUrlGroups,
  hotsData,
  iconSubgroupMaxSize = 200
) {
  let listfileHtml = "";

  listfileHtml +=
    `<!-- Hero portrait(s): ${iconUrlGroups.portraits.size} -->` +
    `\n\n` +
    [...iconUrlGroups.portraits].map(iconUrlToImg).join("\n");

  // Generate skill/talent icon subgroups
  /** @type {Map<string, Map<string, string>>} */
  let currentSubgroup = new Map();
  const skillTalentIconSubgroups = [currentSubgroup];
  let iconSubgroupSize = 0;
  for (const [heroId, iconUrls] of iconUrlGroups.skillsAndTalents) {
    if (iconSubgroupSize + iconUrls.size > iconSubgroupMaxSize) {
      iconSubgroupSize = 0;
      skillTalentIconSubgroups.push((currentSubgroup = new Map()));
    }

    iconSubgroupSize += iconUrls.size;
    currentSubgroup.set(heroId, iconUrls);
  }

  // Generate HTML from each subgroup
  let cumulativeIconCount = 0;
  for (const [subgroupIndex, subgroup] of skillTalentIconSubgroups.entries()) {
    const heroIconGroups = [...subgroup.entries()];
    const iconCount = heroIconGroups.reduce(
      (iconCount, [, iconUrls]) => iconCount + iconUrls.size,
      0
    );

    listfileHtml +=
      `\n\n\n<!-- Section ${subgroupIndex + 1}: ` +
      `${heroIconGroups.length} hero(es), ${iconCount} icon(s) ` +
      `(${cumulativeIconCount + 1} ~ ${(cumulativeIconCount += iconCount)}) ` +
      `-->\n\n` +
      heroIconGroups
        .map(([heroId, iconUrls]) => {
          const hero =
            hotsData.heroes[heroId] || (hotsData.ptrHeroes || {})[heroId];
          return (
            `<p>${hero.name}</p>\n` +
            [...iconUrls].map(iconUrlToImg).join("\n") +
            "\n\n"
          );
        })
        .join("");
  }

  listfileHtml +=
    `\n\n\n<!-- Shared icon(s): ` +
    `${iconUrlGroups.shared.size} -->\n\n` +
    [...iconUrlGroups.shared.entries()].map(iconUrlToImg).join("\n");

  listfileHtml +=
    `\n\n\n<!-- Unused icon(s): ` +
    `${iconUrlGroups.unused.size} -->\n\n` +
    [...iconUrlGroups.unused.entries()].map(iconUrlToImg).join("\n");

  return listfileHtml;

  /**
   * Helper function: Create an HTML <img> tag from an icon's ID and URL.
   * @param {[string, string]} arg
   * @return {string} HTML of <img> tag
   */
  function iconUrlToImg(arg) {
    const [iconId, url] = arg;
    return `<img src="${url}" alt="${iconId}.png" title="${iconId}.png">`;
  }
}

/**
 * Extracts icon URLs from `<img>` tags in the given HTML. If an icon does not
 * have a unique, non-empty ID, it is placed in the `unknownIcons` set.
 * @param {string} html HTML string
 * @return {{ icons: Map<string, string>, unknownIcons: Set<string> }} `icons`
 *    is a mapping of icon ID => URL
 */
function extractIconUrlsFromHtml(html) {
  const iconUrls = { icons: new Map(), unknownIcons: new Set() };

  for (const img of html.match(/<img.*?>/gi) || []) {
    const srcMatch = img.match(/src="(.*?)"/i);
    const altMatch = img.match(/alt="(.*?)(?:\.\w+)?"/i);

    if (!srcMatch) {
      console.warn("No src attribute in", img);
      continue;
    }

    const url = srcMatch[1];

    if (!altMatch) {
      console.warn("No alt text for", url);
      iconUrls.unknownIcons.add(url);
    } else {
      const iconId = altMatch[1];

      if (iconUrls.icons.has(iconId)) {
        if (iconUrls.icons.get(iconId) !== url) {
          console.warn(
            `Icon URL conflict in listfile: ID = ${iconId} already has URL = ` +
              `${iconUrls.icons.get(iconId)}, ignoring ${url}`
          );
        }
      } else iconUrls.icons.set(iconId, url);
    }
  }

  return iconUrls;
}
