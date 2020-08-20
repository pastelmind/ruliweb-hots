/**
 * @file Tools for parsing tooltips extracted and formatted by HeroesDataParser.
 */

import htmlparser2 from "htmlparser2";

import { isNotNullish, isNullish } from "../../scripts/type-util.js";

import { assert, deepEqual, equal, fail } from "./lazy-assert.js";

/**
 * @typedef {object} TagInfo
 * @property {string} name
 * @property {string=} closingTagName If given, emit a closing tag with this name
 * @property {string=} style If given, the "style" attribute to emit
 */

// Note: "00ff90" is used for "Passive:" and "Weapon Mode: Repeater Cannon/
// Phase Bomb". Since we do not want to strip out colors for the latter, we do
// not list "00ff90" here--it must be handled manually (see ontext()).
const VALS_TO_SKIP = new Set([
  "bfd4fd", // Numbers in tooltips
  "e4b800", // "Quest:" and "Reward:"
]);

/**
 * Parses a game tooltip, removing data tags or replacing them with <span> tags.
 * @param {string} tooltip
 * @return {string}
 */
export function parseTooltip(tooltip) {
  let result = "";
  /** @type {TagInfo[]} */
  const tagStack = [];

  const parser = new htmlparser2.Parser(
    {
      onopentag(name, attributes) {
        equal(
          tagStack.length,
          0,
          "Nested tags are not supported: in %o",
          tooltip
        );

        if (name === "n") {
          // Emit newline and skip
          result += "\n";
          tagStack.push({ name });
        } else if (name === "img") {
          // Skip tag
          tagStack.push({ name });
        } else if (name === "c" || name === "s") {
          // 'al' handles a typo made by Blizzard in 'LucioWallRideSlip'
          let { val, al, ...others } = attributes;
          if (isNotNullish(al)) {
            assert(
              isNullish(val),
              "Tag %o has both 'al' and 'val' attributes in %o",
              name,
              tooltip
            );
            val = al;
          }

          // Sanity check for val
          assert(
            isNotNullish(val),
            "Unexpected attribute value val=%o in tag %o in %o",
            val,
            name,
            tooltip
          );

          // Sanity check for other unexpected attributes
          for (const attributeName of Object.keys(others)) {
            console.assert(
              ["name", "validator"].includes(attributeName),
              `Unexpected attribute %o in tag %o in tooltip %o`,
              attributeName,
              name,
              tooltip
            );
          }

          // Handle a typo made by Blizzard Korea in 'NexusHunterTheThirst'
          if (val === "#Tooltip Numbers") {
            // Don't create a <span>
            tagStack.push({ name });
            return;
          }

          const valLower = val.toLowerCase();
          if (VALS_TO_SKIP.has(valLower)) {
            // Don't create a <span>
            tagStack.push({ name });
            return;
          }

          let style;
          // Handle color gradients introduced in HDP 4.0.0
          const colorGradientMatch = valLower.match(
            /^([\da-f]{6})-([\da-f]{6})$/
          );
          if (colorGradientMatch) {
            const [, color1, color2] = colorGradientMatch;
            assertIsValidColorCode(color1, tooltip);
            assertIsValidColorCode(color2, tooltip);

            style = `color:#${color1};text-shadow:0 0 1px #${color2}`;
          } else {
            // Fix for Verdant Spheres, which have a color of "ff00"
            const color = valLower === "ff00" ? "00ff00" : valLower;
            assertIsValidColorCode(color, tooltip);

            style = `color:#${color}`;
          }

          // We do not emit the <span> here, because we want to check the
          // contents of the <span> later. See ontext() for details.
          tagStack.push({ name, closingTagName: "span", style });
        } else if (name === "lang") {
          const { rule, ...others } = attributes;
          equal(
            rule,
            "jongsung",
            "Unexpected attribute value rule=%o in tag %o in %o",
            rule,
            name,
            tooltip
          );

          // Sanity check for other unexpected attributes
          for (const attributeName of Object.keys(others)) {
            console.warn(
              `Unexpected attribute %o in tag %o in tooltip %o`,
              attributeName,
              name,
              tooltip
            );
          }

          tagStack.push({ name });
        } else {
          fail("Unexpected opening tag %o in %o", name, tooltip);
        }
      },
      onclosetag(name) {
        const tagInfo = tagStack.pop();
        assert(
          tagInfo !== undefined,
          "Closing tag %o has no matching opening tag in %o",
          name,
          tooltip
        );
        equal(
          name,
          tagInfo.name,
          "Closing tag %o does not match opening tag %o in %o",
          name,
          tagInfo.name,
          tooltip
        );

        if (tagInfo.closingTagName !== undefined) {
          result += `</${tagInfo.closingTagName}>`;
        }
      },
      ontext(text) {
        // Handle jongsung rules
        const lastTag =
          tagStack.length > 0 ? tagStack[tagStack.length - 1] : undefined;
        if (lastTag) {
          if (lastTag.name === "lang") {
            const langTokens = text.split(",");
            deepEqual(
              langTokens,
              ["으로", "로"],
              "Unexpected lang tokens in %o in %o",
              text,
              tooltip
            );
            const [euloToken, loToken] = langTokens;

            // Retrieve the last parsed digit, ignoring scaling indicators
            const lastDigitMatch = /([\d%])(?:~~[^~]+~~)?$/.exec(result);
            assert(
              lastDigitMatch,
              "Cannot find trailing digit or percent sign before <lang></lang> in %o",
              tooltip
            );

            result += "036".includes(lastDigitMatch[1]) ? euloToken : loToken;
            return;
          }
          // Manually handle "00ff90"
          if (lastTag.name === "c" || lastTag.name === "s") {
            if (isNotNullish(lastTag.style)) {
              // Strip out the color tag for "Passive:"
              if (/^지속 효과:?\s*$/.test(text)) {
                equal(lastTag.style, "color:#00ff90", "Passive color changed?");
                // Don't emit opening <span> and also suppress closing </span>
                lastTag.closingTagName = undefined;
              } else {
                result += `<span style="${lastTag.style}">`;
              }
            }
          }
        }

        result += text;
      },
    },
    { xmlMode: true, lowerCaseTags: false }
  );

  parser.parseComplete(tooltip);
  equal(tagStack.length, 0, "Unclosed tag(s) in %o", tooltip);

  result = trimLines(result);

  // Normalize the number of newlines before a "Reward:" line
  result = result.replace(/\n+(\n보상:)/gi, "$1");

  return formatScalingIndicators(result);
}

/**
 * Replaces scaling indicators of the form `X~~Y~~` with `X(+Z%)`.
 *
 * @example
 *    formatScalingIndicators("125~~0.2~~");    // "125(+20%)"
 *    formatScalingIndicators("5.3~~0.045~~");  // "5.3(+4.5%)"
 *
 * @param {string} text
 * @return {string}
 */
function formatScalingIndicators(text) {
  return text.replace(/(\d+(?:\.\d+)?%?)~~([^~]+?)~~/gi, (
    _,
    /** @type {string} */ base,
    /** @type {string} */ scalingStr
  ) => {
    const percentSign = base.includes("%") ? "%" : "";
    const scaling = parseFloat(scalingStr);
    const scalingFactorPercent = Math.round(scaling * 10000) / 100;
    return `${base}${percentSign}(+${scalingFactorPercent}%)`;
  });
}

/**
 * Throws an exception if the string is not a valid 6-character RGB color code.
 * @param {string} color
 * @param {string} source String from which the color was extracted
 */
function assertIsValidColorCode(color, source) {
  assert(
    /^[\da-f]{6}$/.test(color),
    "Invalid color code %o in %o",
    color,
    source
  );
}

/**
 * Trims each line in a multi-line string, then trims the result.
 * @param {string} text
 * @return {string}
 */
function trimLines(text) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .join("\n")
    .trim();
}

/**
 * Parses a game tooltip, replacing `<n/>` with newlines. All other tags are
 * removed.
 * @param {string} tooltip
 * @return {string}
 */
export function parseShortTooltip(tooltip) {
  let result = "";
  const parser = new htmlparser2.Parser(
    {
      onopentag(name) {
        if (name === "n") result += "\n";
      },
      ontext(text) {
        result += text;
      },
    },
    { xmlMode: true }
  );
  parser.parseComplete(tooltip);

  return trimLines(result);
}

/**
 * @typedef {object} CooldownFragment
 * @property {number=} cooldown
 * @property {number=} rechargeCooldown
 * @property {number=} cooldownPerAlly
 */

/**
 * Extracts cooldown information from an (English) cooldown tooltip.
 * If the tooltip is `undefined`, returns `undefined` instead.
 * @param {string | undefined} cooldownTooltip
 * @return {CooldownFragment | undefined}
 */
export function extractCooldownFragment(cooldownTooltip) {
  if (isNullish(cooldownTooltip)) return undefined;

  const cooldownText = stripXmlTags(cooldownTooltip);

  const match = /^((?:charge )?cooldown):\s*(\d+(?:\.\d+)?)\s*seconds?\s*(.*)$/.exec(
    cooldownText.toLowerCase()
  );
  assert(match, "Cooldown pattern mismatch: %o", cooldownText);

  const [, cooldownTypeStr, cooldownStr, cooldownPostfix] = match;
  const cooldown = parseFloat(cooldownStr);

  if (cooldownPostfix === "per ally") {
    if (cooldownTypeStr === "cooldown") {
      return { cooldownPerAlly: cooldown };
    }

    fail(
      "Per-ally cooldowns are not supported for %o in %o",
      cooldownTypeStr,
      cooldownTooltip
    );
  } else if (cooldownPostfix) {
    console.warn(
      "Unknown cooldown postfix ignored: %o in %o",
      cooldownPostfix,
      cooldownTooltip
    );
  }

  if (cooldownTypeStr === "charge cooldown") {
    return { rechargeCooldown: cooldown };
  }
  return { cooldown };
}

/**
 * Ability cost fragment, which can be merged into a Skill or Talent object.
 * @typedef {object} AbilityCostFragment
 * @property {number} [manaCost]
 * @property {number} [manaCostPerSecond]
 * @property {Object<string, number | string>} [extras]
 */

/**
 * Extracts ability cost information from an (English) energy cost tooltip.
 * @param {string} energyTooltip
 * @return {AbilityCostFragment}
 */
export function extractAbilityCostFragment(energyTooltip) {
  assert(energyTooltip, "Empty energyTooltip detected: %o", energyTooltip);

  const energyText = stripXmlTags(energyTooltip);

  const match = /^(mana|fury|brew|energy):\s*(\d+(?:\.\d+)?)\s*(.*?)$/.exec(
    energyText.toLowerCase()
  );
  assert(match, "Ability cost pattern mismatch: %o", energyText);

  const [, abilityCostTypeStr, abilityCostStr, abilityCostPostfix] = match;
  const cost = parseFloat(abilityCostStr);

  if (abilityCostPostfix === "per second") {
    if (abilityCostTypeStr === "mana") {
      return { manaCostPerSecond: cost };
    }
    if (abilityCostTypeStr === "energy") {
      return { extras: { 기력: `초당 ${cost}` } };
    }

    fail(
      "Per-second costs are not supported for %o in %o",
      abilityCostTypeStr,
      energyTooltip
    );
  } else if (abilityCostPostfix) {
    console.warn(
      "Unknown ability cost postfix ignored: %o in %o",
      abilityCostPostfix,
      energyTooltip
    );
  }

  if (abilityCostTypeStr === "mana") {
    return { manaCost: cost };
  } else if (abilityCostTypeStr === "fury") {
    return { extras: { 분노: cost } };
  } else if (abilityCostTypeStr === "brew") {
    return { extras: { 취기: cost } };
  } else if (abilityCostTypeStr === "energy") {
    return { extras: { 기력: cost } };
  }
  fail("Unknown ability cost: %o in %o", abilityCostTypeStr, energyTooltip);
}

/**
 * Strips XML tags from the given text.
 * @param {string} str
 * @return {string}
 */
function stripXmlTags(str) {
  let result = "";
  const parser = new htmlparser2.Parser(
    {
      ontext(text) {
        result += text;
      },
    },
    { xmlMode: true }
  );
  parser.parseComplete(str);
  return result;
}
