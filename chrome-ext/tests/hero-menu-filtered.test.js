/**
 * @file Tests for the HeroMenuFiltered component.
 */

import TLP from "@testing-library/preact";
import htm from "htm";
import jsdomGlobal from "jsdom-global";
import { h } from "preact";
import "should";
import sinon from "sinon";

import { _c } from "../../scripts/type-util.js";
import { HeroMenuFiltered } from "../src/js/components/hero-menu-filtered.js";

import { matcher } from "./js/helpers.js";

/**
 * @typedef {preact.ComponentProps<typeof HeroMenuFiltered>} Props
 */

const { fireEvent, render, waitFor } = TLP;
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
          <style>
          /* Workaround for JSDOM bug where default opacity is not calculated */
          * {
            opacity: 1;
          }
          </style>
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

describe("HeroMenuFiltered", () => {
  const heroes = {
    /** @type {Props["heroes"][string]} */
    Romeo: {
      name: "Romeo Montague",
      iconUrl: "https://example.com/romeo.png",
      newRole: _c("melee_assassin"),
      universe: _c("nexus"),
      roleName: "근접 암살자",
    },
    /** @type {Props["heroes"][string]} */
    Juliet: {
      name: "Juliet Capulet",
      iconUrl: "https://example.com/juliet.png",
      newRole: _c("tank"),
      universe: _c("starcraft"),
      roleName: "전사",
    },
  };
  const ptrHeroes = {
    // Hero added in PTR
    /** @type {Props["ptrHeroes"][string]} */
    Hamlet: {
      name: "Hamlet of Denmark",
      iconUrl: "https://example.com/hamlet.png",
      newRole: _c("bruiser"),
      universe: _c("diablo"),
      roleName: "투사",
    },
    // Hero changed in PTR
    /** @type {Props["ptrHeroes"][string]} */
    Juliet: {
      name: "Juliet Capulet, DEAD",
      iconUrl: "https://example.com/juliet_dead.png",
      newRole: _c("ranged_assassin"),
      universe: _c("overwatch"),
      roleName: "원거리 암살자",
    },
  };

  it("should show filterable hero icons", async function () {
    // Disable timeout
    // TODO: Try removing this when this test case becomes synchronous
    // eslint-disable-next-line no-invalid-this
    this.timeout(0);

    const { getByRole } = render(html`
      <${HeroMenuFiltered} heroes=${heroes} ptrHeroes=${ptrHeroes} />
    `);

    // Check for existence, order, and highlighting of hero icon buttons

    const romeoBtn = getByRole("button", { name: matcher(heroes.Romeo.name) });
    const julietBtn = getByRole("button", {
      name: matcher(heroes.Juliet.name),
    });
    const hamletBtn = getByRole("button", {
      name: matcher(ptrHeroes.Hamlet.name),
    });

    // Check for existence of hero filter buttons
    const filterGroupUniverse = getByRole("group", { name: matcher("세계관") });
    const filterGroupRole = getByRole("group", { name: matcher("역할") });

    const toggleButtons = {
      warcraft: TLP.getByRole(filterGroupUniverse, "button", {
        name: "워크래프트",
      }),
      starcraft: TLP.getByRole(filterGroupUniverse, "button", {
        name: "스타크래프트",
      }),
      diablo: TLP.getByRole(filterGroupUniverse, "button", {
        name: "디아블로",
      }),
      overwatch: TLP.getByRole(filterGroupUniverse, "button", {
        name: "오버워치",
      }),
      classic: TLP.getByRole(filterGroupUniverse, "button", {
        name: "블리자드 고전",
      }),
      tank: TLP.getByRole(filterGroupRole, "button", { name: "전사" }),
      bruiser: TLP.getByRole(filterGroupRole, "button", { name: "투사" }),
      meleeAssassin: TLP.getByRole(filterGroupRole, "button", {
        name: "근접 암살자",
      }),
      rangedAssassin: TLP.getByRole(filterGroupRole, "button", {
        name: "원거리 암살자",
      }),
      healer: TLP.getByRole(filterGroupRole, "button", { name: "치유사" }),
      support: TLP.getByRole(filterGroupRole, "button", { name: "지원가" }),
    };

    // Hero icons should be sorted by ID
    TLP.getAllByRole(
      getByRole("group", { name: "영웅 목록" }),
      "button"
    ).should.eql([hamletBtn, julietBtn, romeoBtn]);

    romeoBtn.should.have.property("src", heroes.Romeo.iconUrl);
    julietBtn.should.have.property("src", heroes.Juliet.iconUrl);
    hamletBtn.should.have.property("src", ptrHeroes.Hamlet.iconUrl);

    // Initially, all icons should be highlighted
    Number(getComputedStyle(romeoBtn).opacity).should.eql(1);
    Number(getComputedStyle(julietBtn).opacity).should.eql(1);
    Number(getComputedStyle(hamletBtn).opacity).should.eql(1);

    // Disable a hero universe filter
    console.log("Before firing event");
    fireEvent.click(toggleButtons.starcraft);
    // Manually wait for the DOM change, because Preact Testing Library fails to
    // flush rendering updates. This is because PTL uses the wrong copy of
    // Preact in Node.js v12
    // See: https://github.com/testing-library/preact-testing-library/issues/28
    //
    // Because my components are using the _vendored_ copy of Preact, I can't
    // preact/test-utils either. This requires the following fix:
    //    https://github.com/pastelmind/ruliweb-hots/issues/89
    // TODO: Change this test code when this issue is resolved
    await waitFor(() =>
      Number(
        getComputedStyle(TLP.getByRole(toggleButtons.starcraft, "img")).opacity
      ).should.be.below(1)
    );
    // This should grey out SC heroes, and the filter icon itself
    Number(getComputedStyle(romeoBtn).opacity).should.eql(1);
    Number(getComputedStyle(julietBtn).opacity).should.be.below(1);
    Number(getComputedStyle(hamletBtn).opacity).should.eql(1);

    // Disable a hero role filter
    fireEvent.click(toggleButtons.meleeAssassin);
    // This should grey out melee assassin heroes, and the filter icon itself
    await waitFor(() =>
      Number(
        getComputedStyle(TLP.getByRole(toggleButtons.starcraft, "img")).opacity
      ).should.be.below(1)
    );
    Number(getComputedStyle(romeoBtn).opacity).should.be.below(1);
    Number(getComputedStyle(julietBtn).opacity).should.be.below(1);
    Number(getComputedStyle(hamletBtn).opacity).should.eql(1);
    Number(
      getComputedStyle(TLP.getByRole(toggleButtons.meleeAssassin, "img"))
        .opacity
    ).should.be.below(1);

    // Re-enable the hero universe filter
    fireEvent.click(toggleButtons.starcraft);
    // This should make SC heroes, and the filter icon itself, active again
    await waitFor(() =>
      Number(
        getComputedStyle(TLP.getByRole(toggleButtons.starcraft, "img")).opacity
      ).should.eql(1)
    );
    Number(getComputedStyle(romeoBtn).opacity).should.be.below(1);
    Number(getComputedStyle(julietBtn).opacity).should.eql(1);
    Number(getComputedStyle(hamletBtn).opacity).should.eql(1);
  });

  it("should prioritize PTR heroes if shouldUsePtr is set", () => {
    const { getByRole } = render(html`
      <${HeroMenuFiltered}
        heroes=${heroes}
        ptrHeroes=${ptrHeroes}
        shouldUsePtr=${true}
      />
    `);

    // Check for existence, order, and highlighting of icon buttons

    const romeoBtn = getByRole("button", { name: matcher(heroes.Romeo.name) });
    const julietBtn = getByRole("button", {
      name: matcher(ptrHeroes.Juliet.name),
    });
    const hamletBtn = getByRole("button", {
      name: matcher(ptrHeroes.Hamlet.name),
    });

    romeoBtn.should.have.property("src", heroes.Romeo.iconUrl);
    julietBtn.should.have.property("src", ptrHeroes.Juliet.iconUrl);
    hamletBtn.should.have.property("src", ptrHeroes.Hamlet.iconUrl);

    // Only heroes in the PTR should be highlighted
    Number(getComputedStyle(romeoBtn).opacity).should.be.below(1);
    Number(getComputedStyle(julietBtn).opacity).should.eql(1);
    Number(getComputedStyle(hamletBtn).opacity).should.eql(1);
  });

  it("should call onClickHero() if a hero icon is clicked", () => {
    const clickHeroHandler = sinon.spy();

    const { getByRole } = render(html`
      <${HeroMenuFiltered}
        heroes=${heroes}
        ptrHeroes=${ptrHeroes}
        onClickHero=${clickHeroHandler}
      />
    `);

    clickHeroHandler.should.not.be.called();

    fireEvent.click(getByRole("button", { name: matcher(heroes.Romeo.name) }));
    clickHeroHandler.should.be.calledOnce();
    clickHeroHandler.firstCall.args.should.have.length(1);
    clickHeroHandler.firstCall.args[0].should.be.equal("Romeo");

    fireEvent.click(getByRole("button", { name: matcher(heroes.Juliet.name) }));
    clickHeroHandler.should.be.calledTwice();
    clickHeroHandler.secondCall.args.should.have.length(1);
    clickHeroHandler.secondCall.args[0].should.be.equal("Juliet");

    fireEvent.click(
      getByRole("button", { name: matcher(ptrHeroes.Hamlet.name) })
    );
    clickHeroHandler.should.be.calledThrice();
    clickHeroHandler.thirdCall.args.should.have.length(1);
    clickHeroHandler.thirdCall.args[0].should.be.equal("Hamlet");
  });
});
