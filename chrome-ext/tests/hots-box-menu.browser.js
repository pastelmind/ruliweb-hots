/**
 * @file In-browser preview of the HotsBoxMenu component.
 */

import { _c } from "../../scripts/type-util.js";
import { HotsBoxMenu } from "../src/js/components/hots-box-menu.js";
import htm from "../src/js/vendor/htm.js";
import { h, render } from "../src/js/vendor/preact.js";

const html = htm.bind(h);

/**
 * @typedef {preact.ComponentProps<HotsBoxMenu>} Props
 */

/** @type {Props["hero"]} */
const hero = {
  id: "JayGatsbyHeroId",
  name: "Jay Gatsby",
  icon: "hero_icon_gatsby",
  iconUrl: "./images/gatsby.png",
  title: "Rejected Millionaire",
  newRole: "support",
  roleName: "지원가",
  universe: "warcraft",
  universeName: "워크래프트",
  stats: [],
  units: [],
  skills: [],
  talents: {},
};
hero.skills = [
  {
    index: 0,
    id: "SkillHoldPartyId",
    name: "Hold Extravagant Party",
    icon: "skill_icon_hold_party",
    iconUrl: "./images/party.png",
    type: "Q",
    typeName: "Q",
    typeNameLong: "Q",
    description:
      "Hold an over-the-top lavish party, attracting men and girls like moths to a bright light.\n\nPassive: You are rich.",
    tooltipDescription: "Hold a really fancy party",
    shortDescription: "Hold a really fancy party",
    manaCost: 100,
    rechargeCooldown: 24 * 60 * 60,
    heroId: hero.id,
    heroName: hero.name,
  },
  {
    index: 1,
    id: "SkillDriveId",
    name: "Drive Vehicle",
    icon: "skill_icon_drive",
    iconUrl: "./images/drive.png",
    type: "E",
    typeName: "E",
    typeNameLong: "E",
    description: "Basic driving skills.\n\nDo NOT swap seats with your lover!",
    tooltipDescription: "Driving a car",
    shortDescription: "Driving a car",
    heroId: hero.id,
    heroName: hero.name,
  },
];
// I'm not sure why TypeScript demands we use _c() here, even though we didn't
// need them in hots-box-menu.test.js.
hero.talents["4"] = [
  {
    level: 4,
    index: 0,
    id: "TalentAskNeighborForInvitationId",
    name: "Ask Neighbor to Invite You",
    icon: "talent_ask_neighbor",
    iconUrl: "./images/invitation.png",
    type: _c("active"),
    manaCost: 250,
    cooldown: 1250,
    upgradeFor: _c("W"),
    typeName: "W",
    typeNameLong: "능력 강화 (W)",
    description:
      "Ask your neighbor to invite you to his home. You've been waiting for this moment for a long time...",
    tooltipDescription: "Ask your neighbor to invite you",
    shortDescription: "Ask your neighbor to invite you",
    heroId: hero.id,
    heroName: hero.name,
  },
  {
    level: 4,
    index: 0,
    id: "TalentReunionId",
    name: "The Reunion",
    icon: "talent_reunion",
    iconUrl: "./images/reunion.png",
    type: _c("passive"),
    typeName: "지속 효과",
    typeNameLong: "지속 효과",
    description: "Reunite with your former lover. Happy end?",
    tooltipDescription: "Reunite with former lover",
    shortDescription: "Reunite with former lover",
    heroId: hero.id,
    heroName: hero.name,
  },
];
hero.talents["11"] = [
  {
    level: 11,
    index: 0,
    id: "TalentBelieveInGreenLightId",
    name: "Believe in the Green Light",
    icon: "talent_believe_green_light",
    iconUrl: "./images/green-light.png",
    type: _c("passive"),
    upgradeFor: _c("Q"),
    typeName: "Q",
    typeNameLong: "능력 강화 (Q)",
    description:
      "Believe in your unattainable ideals, unlike the rest of the rabble who are busy breaking things carelessly or chasing after wealth.",
    tooltipDescription: "Believe in the green light across the dock",
    shortDescription: "Believe in the green light across the dock",
    heroId: hero.id,
    heroName: hero.name,
  },
];

/** @type {Props} */
const props = {
  hero,
  onPasteHero: makeFake("onPasteHero"),
  onPasteSkill: makeFake("onPasteSkill"),
  onPasteTalent: makeFake("onPasteTalent"),
  onPasteTalentGroup: makeFake("onPasteTalentGroup"),
};

const target = document.getElementById("main");
if (target) {
  render(html`<${HotsBoxMenu} ...${props} />`, target);
} else {
  console.error("Cannot find #main");
}

/**
 * @param {string} name Name of the stubbed callback
 * @return {function(...unknown): void}
 */
function makeFake(name) {
  return (...args) => {
    console.log(`${name}() called with arguments: %o`, args);
  };
}
