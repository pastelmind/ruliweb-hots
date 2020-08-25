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

import { shouldNotEqual } from "./js/helpers.js";

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
  // NOTE: Hero, skill, and icon names used in this test should not contain
  // special characters recognized by RegExp(). This is not a requirement of the
  // component, but a consequence of using RegExp() to loosely match DOM nodes
  // using DOM Testing Library's query functions.
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
    const heroIcon = getByRole("img", { name: new RegExp(hero.name) });
    heroIcon.should.have.property("src", hero.iconUrl);

    // Check hero icon tooltip
    const heroIconTooltipEl = getByRole("tooltip", {
      name: new RegExp(hero.name),
    });
    shouldNotEqual(heroIconTooltipEl, null);
    const heroIconTooltip = heroIconTooltipEl.getAttribute("aria-label");
    should(heroIconTooltip).containEql(hero.name);
    should(heroIconTooltip).containEql(hero.roleName);

    // Check skills
    for (const skill of hero.skills) {
      // Check for existence of icon
      const skillIcon = getByRole("img", { name: new RegExp(skill.name) });
      skillIcon.should.have.property("src", skill.iconUrl);

      // Check tooltip
      const skillIconTooltipEl = getByRole("tooltip", {
        name: new RegExp(skill.name),
      });
      const skillIconTooltip = skillIconTooltipEl.getAttribute("aria-label");
      should(skillIconTooltip).containEql(skill.typeName);
      should(skillIconTooltip).containEql(skill.tooltipDescription);
    }

    // Check talents
    for (const [tierName, tierArray] of Object.entries(hero.talents)) {
      for (const talent of tierArray) {
        // Check for existence of icon
        const talentIcon = getByRole("img", { name: new RegExp(talent.name) });
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
    // Currently, this component handles the post-paste animation effect.
    // This is not ideal, because each callback is required to return an array.
    // Instead, we could pass the clicked <img> element as the second argument
    // to each handler, and let the handler run the animation effect.
    // TODO: Move post-paste animation effect to <DialogContent>
    const pasteHeroHandler = sinon.fake.returns([]);
    const pasteSkillHandler = sinon.fake.returns([]);
    const pasteTalentHandler = sinon.fake.returns([]);
    const pasteTalentGroupHandler = sinon.fake.returns([]);

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

    fireEvent.click(getByRole("img", { name: new RegExp(hero.name) }));
    pasteHeroHandler.should.be.calledOnce();
    pasteHeroHandler.firstCall.args.should.have.length(1);
    pasteHeroHandler.firstCall.args[0].should.equal(hero);

    // Test skill icon click
    const [skill0, skill1] = hero.skills;
    pasteSkillHandler.should.not.be.called();

    fireEvent.click(getByRole("img", { name: new RegExp(skill1.name) }));
    pasteSkillHandler.should.be.calledOnce();
    pasteSkillHandler.firstCall.args.should.have.length(1);
    pasteSkillHandler.firstCall.args[0].should.equal(skill1);

    fireEvent.click(getByRole("img", { name: new RegExp(skill0.name) }));
    pasteSkillHandler.should.be.calledTwice();
    pasteSkillHandler.secondCall.args.should.have.length(1);
    pasteSkillHandler.secondCall.args[0].should.eql(skill0);

    // Test talent icon click
    const [talentA, talentB] = hero.talents["4"];
    const [talentC] = hero.talents["11"];
    pasteTalentHandler.should.not.be.called();

    fireEvent.click(getByRole("img", { name: new RegExp(talentB.name) }));
    pasteTalentHandler.should.be.calledOnce();
    pasteTalentHandler.firstCall.args.should.have.length(1);
    pasteTalentHandler.firstCall.args[0].should.equal(talentB);

    fireEvent.click(getByRole("img", { name: new RegExp(talentA.name) }));
    pasteTalentHandler.should.be.calledTwice();
    pasteTalentHandler.secondCall.args.should.have.length(1);
    pasteTalentHandler.secondCall.args[0].should.equal(talentA);

    fireEvent.click(getByRole("img", { name: new RegExp(talentC.name) }));
    pasteTalentHandler.should.be.calledThrice();
    pasteTalentHandler.thirdCall.args.should.have.length(1);
    pasteTalentHandler.thirdCall.args[0].should.equal(talentC);

    // Test talent group buttons
    const talentGroupButtons = getAllByRole("button", { name: "모두 넣기" });
    pasteTalentGroupHandler.should.not.be.called();

    fireEvent.click(talentGroupButtons[1]);
    pasteTalentGroupHandler.should.be.calledOnce();
    pasteTalentGroupHandler.firstCall.args.should.have.length(1);
    pasteTalentGroupHandler.firstCall.args[0].should.be.equal(
      hero.talents["11"]
    );

    fireEvent.click(talentGroupButtons[0]);
    pasteTalentGroupHandler.should.be.calledTwice();
    pasteTalentGroupHandler.secondCall.args.should.have.length(1);
    pasteTalentGroupHandler.secondCall.args[0].should.be.equal(
      hero.talents["4"]
    );
  });
});
