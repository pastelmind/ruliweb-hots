/**
 * @file Tests for the HeroMenu component.
 */

import TLP from "@testing-library/preact";
import htm from "htm";
import jsdomGlobal from "jsdom-global";
import { h } from "preact";
import should from "should";
import sinon from "sinon";

import { _c } from "../../scripts/type-util.js";
import { HeroMenu } from "../src/js/components/hero-menu.js";

import { shouldNotEqual } from "./js/helpers.js";

/**
 * @typedef {import("../src/js/components/hero-menu.js").Props} Props
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

describe("HeroMenu", () => {
  const heroes = {
    /** @type {Props["heroes"][string]} */
    Romeo: {
      name: "Romeo Montague",
      title: "Man in love",
      icon: "icon_romeo",
      newRole: _c("melee_assassin"),
      universe: _c("nexus"),
      stats: [],
      id: "Romeo",
      iconUrl: "https://example.com/romeo.png",
      roleName: "근접 암살자",
      universeName: "시공의 폭풍",
      units: [],
      skills: [],
      talents: {},
    },
    /** @type {Props["heroes"][string]} */
    Juliet: {
      name: "Juliet Capulet",
      title: "Woman in love",
      icon: "icon_juliet",
      newRole: _c("tank"),
      universe: _c("starcraft"),
      stats: [],
      id: "Juliet",
      iconUrl: "https://example.com/juliet.png",
      roleName: "전사",
      universeName: "스타크래프트",
      units: [],
      skills: [],
      talents: {},
    },
  };

  const ptrHeroes = {
    // Hero added in PTR
    /** @type {Props["ptrHeroes"][string]} */
    Hamlet: {
      name: "Hamlet of Denmark",
      title: "Mad prince",
      icon: "icon_hamlet",
      newRole: _c("bruiser"),
      universe: _c("diablo"),
      stats: [],
      id: "Hamlet",
      iconUrl: "https://example.com/hamlet.png",
      roleName: "투사",
      universeName: "디아블로",
      units: [],
      skills: [],
      talents: {},
    },
    // Hero changed in PTR
    /** @type {Props["ptrHeroes"][string]} */
    Juliet: {
      ...heroes.Juliet,
      name: "Juliet Capulet, DEAD",
      title: "Woman who committed suicide",
      icon: "icon_juliet_death",
      newRole: _c("ranged_assassin"),
      universe: _c("overwatch"),
      iconUrl: "https://example.com/juliet_dead.png",
    },
  };

  it("should show icons, tooltips, and badges for each hero", () => {
    /** @type {Props["activeFilters"]} */
    const activeFilters = { newRole: [], universe: [] };

    const { getAllByRole, getByLabelText, getByRole } = render(html`
      <${HeroMenu}
        heroes=${heroes}
        ptrHeroes=${ptrHeroes}
        activeFilters=${activeFilters}
      />
    `);

    // TODO: Maybe I should use <input type="image"> instead of plain <img>
    // so that I can utilize more proper ARIA roles, e.g. "button".
    const romeoIcon = getByRole("img", { name: new RegExp(heroes.Romeo.name) });
    const julietIcon = getByRole("img", {
      name: new RegExp(heroes.Juliet.name),
    });
    const hamletIcon = getByRole("img", {
      name: new RegExp(ptrHeroes.Hamlet.name),
    });

    romeoIcon.should.have.property("src", heroes.Romeo.iconUrl);
    julietIcon.should.have.property("src", heroes.Juliet.iconUrl);
    hamletIcon.should.have.property("src", ptrHeroes.Hamlet.iconUrl);

    // Hero icons should be sorted by hero ID
    getAllByRole("img").should.eql([hamletIcon, julietIcon, romeoIcon]);

    // Check for existence and order of tooltips
    const romeoTooltipEl = getByLabelText(new RegExp(heroes.Romeo.name));
    const julietTooltipEl = getByLabelText(new RegExp(heroes.Juliet.name));
    const hamletTooltipEl = getByLabelText(new RegExp(ptrHeroes.Hamlet.name));

    getAllByRole("tooltip").should.eql([
      julietTooltipEl,
      romeoTooltipEl,
      hamletTooltipEl,
    ]);

    // Check tooltip text: hero name, role, PTR added/changed status

    // Romeo is a hero on live with no changes in PTR
    const romeoTooltip = romeoTooltipEl.getAttribute("aria-label");
    should(romeoTooltip).containEql(heroes.Romeo.roleName);
    should(romeoTooltip).not.containEql("PTR");
    should(romeoTooltip).not.containEql("변경");

    // Juliet is existing hero with changes in PTR
    const julietTooltip = julietTooltipEl.getAttribute("aria-label");
    should(julietTooltip).containEql(heroes.Juliet.roleName);
    should(julietTooltip).containEql("PTR");
    should(julietTooltip).containEql("변경");

    // Hamlet is new hero in PTR
    const hamletTooltip = hamletTooltipEl.getAttribute("aria-label");
    should(hamletTooltip).containEql(ptrHeroes.Hamlet.roleName);
    should(hamletTooltip).containEql("PTR");
    should(hamletTooltip).containEql("추가");

    // Check badges

    // Romeo is a hero on live with no changes in PTR
    const romeoRoot = romeoIcon.parentElement;
    shouldNotEqual(romeoRoot, null);
    should.not.exist(TLP.queryByText(romeoRoot, "PTR"));
    should.not.exist(TLP.queryByText(romeoRoot, "NEW"));

    // Juliet is existing hero with changes in PTR
    const julietRoot = julietIcon.parentElement;
    shouldNotEqual(julietRoot, null);
    TLP.getByText(julietRoot, "PTR");
    should.not.exist(TLP.queryByText(julietRoot, "NEW"));

    // Hamlet is new hero in PTR
    const hamletRoot = hamletIcon.parentElement;
    shouldNotEqual(hamletRoot, null);
    TLP.queryByText(hamletRoot, "NEW");
    should.not.exist(TLP.queryByText(hamletRoot, "PTR"));

    // Check highlighting: If no filter is set, all heroes should be highlighted
    getAllByRole("img")
      .map((img) => Number(getComputedStyle(img).opacity))
      .should.eql([0, 0, 0]);
  });

  it("should highlight heroes that pass the filters", () => {
    /** @type {Props["activeFilters"]} */
    const activeFilters = {
      newRole: ["tank", "bruiser"],
      universe: ["starcraft"],
    };

    const { getByRole } = render(html`
      <${HeroMenu}
        heroes=${heroes}
        ptrHeroes=${ptrHeroes}
        activeFilters=${activeFilters}
      />
    `);

    // Romeo: "melee_assassin", "nexus" -> not highlighted
    const romeoIcon = getByRole("img", { name: new RegExp(heroes.Romeo.name) });
    Number(getComputedStyle(romeoIcon).opacity).should.be.above(0);

    // Juliet: "tank", "starcraft" -> highlighted
    const julietIcon = getByRole("img", {
      name: new RegExp(heroes.Juliet.name),
    });
    Number(getComputedStyle(julietIcon).opacity).should.equal(0);

    // Hamlet: "bruiser", "diablo" -> not highlighted (dark)
    const hamletIcon = getByRole("img", {
      name: new RegExp(ptrHeroes.Hamlet.name),
    });
    Number(getComputedStyle(hamletIcon).opacity).should.be.above(0);
  });

  describe("onClickHero() callback", () => {
    it("should be passed a live hero if ptrMode is falsy", () => {
      /** @type {Props["activeFilters"]} */
      const activeFilters = {
        newRole: ["tank", "bruiser"],
        universe: ["starcraft"],
      };

      const clickHeroHandler = sinon.spy();

      const { getByRole } = render(html`
        <${HeroMenu}
          heroes=${heroes}
          ptrHeroes=${ptrHeroes}
          activeFilters=${activeFilters}
          onClickHero=${clickHeroHandler}
        />
      `);

      clickHeroHandler.should.not.be.called();

      fireEvent.click(
        getByRole("img", { name: new RegExp(heroes.Romeo.name) })
      );
      clickHeroHandler.should.be.calledOnce();
      clickHeroHandler.firstCall.args.should.have.length(1);
      clickHeroHandler.firstCall.args[0].should.be.equal(heroes.Romeo);

      fireEvent.click(
        getByRole("img", { name: new RegExp(heroes.Juliet.name) })
      );
      clickHeroHandler.should.be.calledTwice();
      clickHeroHandler.secondCall.args.should.have.length(1);
      clickHeroHandler.secondCall.args[0].should.be.equal(heroes.Juliet);

      fireEvent.click(
        getByRole("img", { name: new RegExp(ptrHeroes.Hamlet.name) })
      );
      clickHeroHandler.should.be.calledThrice();
      clickHeroHandler.thirdCall.args.should.have.length(1);
      clickHeroHandler.thirdCall.args[0].should.be.equal(ptrHeroes.Hamlet);
    });

    it("should be passed a PTR hero if ptrMode is truthy", () => {
      /** @type {Props["activeFilters"]} */
      const activeFilters = { newRole: [], universe: [] };

      const clickHeroHandler = sinon.spy();

      const { getByRole } = render(html`
        <${HeroMenu}
          heroes=${heroes}
          ptrHeroes=${ptrHeroes}
          activeFilters=${activeFilters}
          onClickHero=${clickHeroHandler}
          ptrMode=${true}
        />
      `);

      clickHeroHandler.should.not.be.called();

      fireEvent.click(
        getByRole("img", { name: new RegExp(ptrHeroes.Juliet.name) })
      );
      clickHeroHandler.should.be.calledOnce();
      clickHeroHandler.firstCall.args.should.have.length(1);
      clickHeroHandler.firstCall.args[0].should.be.equal(ptrHeroes.Juliet);
    });
  });
});
