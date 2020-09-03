/**
 * @file Tests for the HeroMenu component.
 */

import TLP from "@testing-library/preact";
import htm from "htm";
import jsdomGlobal from "jsdom-global";
import { h } from "preact";
import should from "should";
import sinon from "sinon";

import { HeroMenu } from "../src/js/components/hero-menu.js";

import { matcher, shouldNotEqual } from "./js/helpers.js";

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

describe("HeroMenu", () => {
  /** @type {Props["icons"]} */
  const icons = [
    {
      id: "Romeo",
      url: "https://example.com/romeo.png",
      title: "Romeo Montague (Man in love)",
      isHighlighted: true,
    },
    {
      id: "Juliet",
      title: "Juliet Capulet (Woman in love)",
      url: "https://example.com/juliet.png",
      isHighlighted: false,
      ptrStatus: "changed",
    },
    {
      id: "Hamlet",
      title: "Hamlet of Denmark (Mad prince)",
      url: "https://example.com/hamlet.png",
      isHighlighted: true,
      ptrStatus: "new",
    },
  ];

  it("should show icons, tooltips, and badges for each hero", () => {
    const { getAllByRole, getByLabelText, getByRole } = render(html`
      <${HeroMenu} icons=${icons} />
    `);

    // Check for existence, order, and highlighting of icon buttons

    const romeoBtn = getByRole("button", { name: matcher(icons[0].title) });
    const julietBtn = getByRole("button", { name: matcher(icons[1].title) });
    const hamletBtn = getByRole("button", { name: matcher(icons[2].title) });

    getAllByRole("button").should.eql([romeoBtn, julietBtn, hamletBtn]);

    romeoBtn.should.have.property("src", icons[0].url);
    julietBtn.should.have.property("src", icons[1].url);
    hamletBtn.should.have.property("src", icons[2].url);

    // Check highlighting
    Number(getComputedStyle(romeoBtn).opacity).should.eql(1);
    Number(getComputedStyle(julietBtn).opacity).should.be.below(1);
    Number(getComputedStyle(hamletBtn).opacity).should.eql(1);

    // Check for existence and order of tooltips
    const romeoTooltipEl = getByLabelText(matcher(icons[0].title));
    const julietTooltipEl = getByLabelText(matcher(icons[1].title));
    const hamletTooltipEl = getByLabelText(matcher(icons[2].title));

    getAllByRole("tooltip").should.eql([
      romeoTooltipEl,
      julietTooltipEl,
      hamletTooltipEl,
    ]);

    // Check tooltip text: hero name, role, PTR added/changed status

    // Romeo is a hero on live with no changes in PTR
    const romeoTooltip = romeoTooltipEl.getAttribute("aria-label");
    should(romeoTooltip).containEql(icons[0].title);
    should(romeoTooltip).not.containEql("PTR");
    should(romeoTooltip).not.containEql("변경");

    // Juliet is existing hero with changes in PTR
    const julietTooltip = julietTooltipEl.getAttribute("aria-label");
    should(julietTooltip).containEql(icons[1].title);
    should(julietTooltip).containEql("PTR");
    should(julietTooltip).containEql("변경");

    // Hamlet is new hero in PTR
    const hamletTooltip = hamletTooltipEl.getAttribute("aria-label");
    should(hamletTooltip).containEql(icons[2].title);
    should(hamletTooltip).containEql("PTR");
    should(hamletTooltip).containEql("추가");

    // Check badges

    // Romeo is a hero on live with no changes in PTR
    const romeoRoot = romeoBtn.parentElement;
    shouldNotEqual(romeoRoot, null);
    should.not.exist(TLP.queryByText(romeoRoot, "PTR"));
    should.not.exist(TLP.queryByText(romeoRoot, "NEW"));

    // Juliet is existing hero with changes in PTR
    const julietRoot = julietBtn.parentElement;
    shouldNotEqual(julietRoot, null);
    TLP.getByText(julietRoot, "PTR");
    should.not.exist(TLP.queryByText(julietRoot, "NEW"));

    // Hamlet is new hero in PTR
    const hamletRoot = hamletBtn.parentElement;
    shouldNotEqual(hamletRoot, null);
    TLP.queryByText(hamletRoot, "NEW");
    should.not.exist(TLP.queryByText(hamletRoot, "PTR"));
  });

  it("should call onClickHero() if a hero icon is clicked", () => {
    const clickHeroHandler = sinon.spy();

    const { getByRole } = render(html`
      <${HeroMenu} icons=${icons} onClickHero=${clickHeroHandler} />
    `);

    clickHeroHandler.should.not.be.called();

    fireEvent.click(getByRole("button", { name: matcher(icons[0].title) }));
    clickHeroHandler.should.be.calledOnce();
    clickHeroHandler.firstCall.args.should.have.length(1);
    clickHeroHandler.firstCall.args[0].should.be.equal(icons[0].id);

    fireEvent.click(getByRole("button", { name: matcher(icons[2].title) }));
    clickHeroHandler.should.be.calledTwice();
    clickHeroHandler.secondCall.args.should.have.length(1);
    clickHeroHandler.secondCall.args[0].should.be.equal(icons[2].id);

    fireEvent.click(getByRole("button", { name: matcher(icons[1].title) }));
    clickHeroHandler.should.be.calledThrice();
    clickHeroHandler.thirdCall.args.should.have.length(1);
    clickHeroHandler.thirdCall.args[0].should.be.equal(icons[1].id);
  });
});
