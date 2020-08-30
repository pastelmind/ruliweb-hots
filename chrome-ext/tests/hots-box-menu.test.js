/**
 * @file Tests for the HotsBoxMenu component.
 */

import TLP from "@testing-library/preact";
import htm from "htm";
import jsdomGlobal from "jsdom-global";
import { h } from "preact";
import should from "should";
import "should-sinon";
import sinon from "sinon";

import { HotsBoxMenu } from "../src/js/components/hots-box-menu.js";

import { matcher, shouldNotEqual } from "./js/helpers.js";

/**
 * @typedef {import("../src/js/components/hots-box-menu.js").Props} Props
 */

const { fireEvent, render } = TLP;
const html = htm.bind(h);

before(
  /**
   * @this Mocha.Context
   * @param {Mocha.Done} done
   */
  function (done) {
    this.timeout(0); // Disable Mocha's timeout

    this.cleanup = jsdomGlobal(
      `
      <html>
        <head>
          <link rel="stylesheet" href="../src/css/ruliweb-hots.css">
        </head>
      </html>
      `,
      {
        resources: "usable",
        url: import.meta.url,
      }
    );

    // Wait for JSDOM to load external stylesheet
    window.onload = () => {
      done();
    };
  }
);

after(
  /** @this Mocha.Context */ function () {
    this.cleanup();
  }
);

describe("HotsBoxMenu", () => {
  /** @type {Props["hero"]} */
  const hero = {
    id: "JayGatsbyHeroId",
    name: "Jay Gatsby",
    icon: "hero_icon_gatsby",
    iconUrl: "https://example.com/hero/jay-gatsby.png",
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
      iconUrl: "https://example.com/skill/hold-party.png",
      type: "Q",
      typeName: "Q",
      typeNameLong: "Q",
      description:
        "Hold an over-the-top lavish party, attracting men and girls like moths to a bright light.\n\nPassive: You are rich.",
      tooltipDescription:
        "Hold an over-the-top lavish party, attracting men and girls like moths to a bright light.\n\nPassive: You are rich.",
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
      iconUrl: "https://example.com/skill/drive.png",
      type: "E",
      typeName: "E",
      typeNameLong: "E",
      description:
        "Basic driving skills.\n\nDo NOT swap seats with your lover!",
      tooltipDescription:
        "Basic driving skills.<br><br>Do NOT swap seats with your lover!",
      shortDescription: "Driving a car",
      heroId: hero.id,
      heroName: hero.name,
    },
  ];
  hero.talents["4"] = [
    {
      level: 4,
      index: 0,
      id: "TalentAskNeighborForInvitationId",
      name: "Ask Neighbor to Invite You",
      icon: "talent_ask_neighbor",
      iconUrl: "https://example.com/talent/ask-neighbor.png",
      type: "active",
      manaCost: 250,
      cooldown: 1250,
      upgradeFor: "W",
      typeName: "W",
      typeNameLong: "능력 강화 (W)",
      description:
        "Believe in your unattainable ideals, unlike the rest of the rabble who are busy breaking things carelessly or chasing after wealth.",
      tooltipDescription:
        "Believe in your unattainable ideals, unlike the rest of the rabble who are busy breaking things carelessly or chasing after wealth.",
      shortDescription: "Believe in the green light across the dock",
      heroId: hero.id,
      heroName: hero.name,
    },
    {
      level: 4,
      index: 0,
      id: "TalentReunionId",
      name: "The Reunion",
      icon: "talent_reunion",
      iconUrl: "https://example.com/talent/the-reunion.png",
      type: "passive",
      typeName: "지속 효과",
      typeNameLong: "지속 효과",
      description: "Reunite with your former lover. Happy end?",
      tooltipDescription: "Reunite with your former lover. Happy end?",
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
      iconUrl: "https://example.com/talent/green-light.png",
      type: "passive",
      upgradeFor: "Q",
      typeName: "Q",
      typeNameLong: "능력 강화 (Q)",
      description:
        "Believe in your unattainable ideals, unlike the rest of the rabble who are busy breaking things carelessly or chasing after wealth.",
      tooltipDescription:
        "Believe in your unattainable ideals, unlike the rest of the rabble who are busy breaking things carelessly or chasing after wealth.",
      shortDescription: "Believe in the green light across the dock",
      heroId: hero.id,
      heroName: hero.name,
    },
  ];

  it("should show nothing if no hero is given", () => {
    const { queryAllByRole } = render(html`<${HotsBoxMenu} hero=${null} />`);

    queryAllByRole("img").should.be.empty();
    queryAllByRole("tooltip").should.be.empty();
  });

  it("should show icons with tooltips for the hero, skills, and talents", () => {
    const { getAllByRole, getByRole } = render(
      html`<${HotsBoxMenu} hero=${hero} />`
    );

    // Check for existence of hero icon
    const heroIcon = getByRole("img", { name: matcher(hero.name) });
    heroIcon.should.have.property("src", hero.iconUrl);

    // Check hero icon tooltip
    const heroIconTooltipEl = getByRole("tooltip", {
      name: matcher(hero.name),
    });
    shouldNotEqual(heroIconTooltipEl, null);
    const heroIconTooltip = heroIconTooltipEl.getAttribute("aria-label");
    should(heroIconTooltip).containEql(hero.name);
    should(heroIconTooltip).containEql(hero.roleName);

    // Check skills
    for (const skill of hero.skills) {
      // Check for existence of icon
      const skillIcon = getByRole("img", { name: matcher(skill.name) });
      skillIcon.should.have.property("src", skill.iconUrl);

      // Check tooltip
      const skillIconTooltipEl = getByRole("tooltip", {
        name: matcher(skill.name),
      });
      const skillIconTooltip = skillIconTooltipEl.getAttribute("aria-label");
      should(skillIconTooltip).containEql(skill.typeName);
      should(skillIconTooltip).containEql(skill.tooltipDescription);
    }

    // Check talents
    for (const [tierName, tierArray] of Object.entries(hero.talents)) {
      for (const talent of tierArray) {
        // Check for existence of icon
        const talentIcon = getByRole("img", { name: matcher(talent.name) });
        talentIcon.should.have.property("src", talent.iconUrl);

        const talentIconRoot = talentIcon.parentElement;
        shouldNotEqual(talentIconRoot, null);
        const talentIconTooltip = talentIconRoot.getAttribute("aria-label");
        should(talentIconTooltip).containEql(talent.name);
        should(talentIconTooltip).containEql(talent.typeNameLong);
        should(talentIconTooltip).containEql(`레벨 ${tierName}`);
        should(talentIconTooltip).containEql(talent.tooltipDescription);
      }
    }

    // Check talent group buttons
    getAllByRole("button", { name: "모두 넣기" }).should.have.length(
      Object.keys(hero.talents).length
    );
  });

  it("should call callback if a hero/skill/talent icon, or talent group is clicked", () => {
    const pasteHeroHandler = sinon.spy();
    const pasteSkillHandler = sinon.spy();
    const pasteTalentHandler = sinon.spy();
    const pasteTalentGroupHandler = sinon.spy();

    const { getAllByRole, getByRole } = render(html`
      <${HotsBoxMenu}
        hero=${hero}
        onPasteHero=${pasteHeroHandler}
        onPasteSkill=${pasteSkillHandler}
        onPasteTalent=${pasteTalentHandler}
        onPasteTalentGroup=${pasteTalentGroupHandler}
      />
    `);

    // Test hero icon click
    pasteHeroHandler.should.not.be.called();

    const heroIcon = getByRole("img", { name: matcher(hero.name) });
    fireEvent.click(heroIcon);
    // Cannot use should.be.calledOnce() because it touches localStorage for
    // reasons I cannot fathom (possibly because the spy was called with a JSDOM
    // object as one of its arguments?), which causes JSDOM to throw up.
    pasteHeroHandler.calledOnce.should.be.true();
    pasteHeroHandler.firstCall.args.should.have.length(2);
    pasteHeroHandler.firstCall.args[0].should.equal(hero);
    pasteHeroHandler.firstCall.args[1].should.eql(heroIcon);

    // Test skill icon click
    const [skill0, skill1] = hero.skills;
    pasteSkillHandler.should.not.be.called();

    const skill1Icon = getByRole("img", { name: matcher(skill1.name) });
    fireEvent.click(skill1Icon);
    pasteSkillHandler.calledOnce.should.be.true();
    pasteSkillHandler.firstCall.args.should.have.length(2);
    pasteSkillHandler.firstCall.args[0].should.equal(skill1);
    pasteSkillHandler.firstCall.args[1].should.eql(skill1Icon);

    const skill0Icon = getByRole("img", { name: matcher(skill0.name) });
    fireEvent.click(skill0Icon);
    pasteSkillHandler.calledTwice.should.be.true();
    pasteSkillHandler.secondCall.args.should.have.length(2);
    pasteSkillHandler.secondCall.args[0].should.equal(skill0);
    pasteSkillHandler.secondCall.args[1].should.eql(skill0Icon);

    // Test talent icon click
    const [talentA, talentB] = hero.talents["4"];
    const [talentC] = hero.talents["11"];
    pasteTalentHandler.should.not.be.called();

    const talentBIcon = getByRole("img", { name: matcher(talentB.name) });
    fireEvent.click(talentBIcon);
    pasteTalentHandler.calledOnce.should.be.true();
    pasteTalentHandler.firstCall.args.should.have.length(2);
    pasteTalentHandler.firstCall.args[0].should.equal(talentB);
    pasteTalentHandler.firstCall.args[1].should.eql(talentBIcon);

    const talentAIcon = getByRole("img", { name: matcher(talentA.name) });
    fireEvent.click(talentAIcon);
    pasteTalentHandler.calledTwice.should.be.true();
    pasteTalentHandler.secondCall.args.should.have.length(2);
    pasteTalentHandler.secondCall.args[0].should.equal(talentA);
    pasteTalentHandler.secondCall.args[1].should.eql(talentAIcon);

    const talentCIcon = getByRole("img", { name: matcher(talentC.name) });
    fireEvent.click(talentCIcon);
    pasteTalentHandler.calledThrice.should.be.true();
    pasteTalentHandler.thirdCall.args.should.have.length(2);
    pasteTalentHandler.thirdCall.args[0].should.equal(talentC);
    pasteTalentHandler.thirdCall.args[1].should.eql(talentCIcon);

    // Test talent group buttons
    const talentGroupButtons = getAllByRole("button", { name: "모두 넣기" });
    pasteTalentGroupHandler.should.not.be.called();

    fireEvent.click(talentGroupButtons[1]);
    pasteTalentGroupHandler.calledOnce.should.be.true();
    pasteTalentGroupHandler.firstCall.args.should.have.length(2);
    pasteTalentGroupHandler.firstCall.args[0].should.equal(hero.talents["11"]);
    pasteTalentGroupHandler.firstCall.args[1].should.eql(talentGroupButtons[1]);

    fireEvent.click(talentGroupButtons[0]);
    pasteTalentGroupHandler.calledTwice.should.be.true();
    pasteTalentGroupHandler.secondCall.args.should.have.length(2);
    pasteTalentGroupHandler.secondCall.args[0].should.equal(hero.talents["4"]);
    pasteTalentGroupHandler.secondCall.args[1].should.eql(
      talentGroupButtons[0]
    );
  });
});
