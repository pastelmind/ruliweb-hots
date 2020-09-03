/**
 * @file Tests for the MultiSelectIcons component.
 */

import TLP from "@testing-library/preact";
import htm from "htm";
import jsdomGlobal from "jsdom-global";
import { h } from "preact";
import "should";
import sinon from "sinon";

import { MultiSelectIcons } from "../src/js/components/multi-select-icons.js";

/**
 * @template T
 * @typedef {import("../src/js/components/multi-select-icons.js").Props<T>} Props
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

describe("MultiSelectIcons", () => {
  /**
   * @typedef {"gilman" | "mansfield" | "chopin"} AuthorId
   */

  /** @type {Props<AuthorId>["options"]} */
  const options = [
    {
      id: "gilman",
      name: "Charlotte Perkins Gilman",
      url: "https://example.com/author/charlotte-perkins-gilman.png",
    },
    {
      id: "mansfield",
      name: "Katherine Mansfield",
      url: "https://example.com/author/katherine-mansfield.png",
      isSelected: false,
    },
    {
      id: "chopin",
      name: "Kate Chopin",
      url: "https://example.com/author/kate-chopin.png",
      isSelected: true,
    },
  ];

  it("should render checkboxes for each option", () => {
    const { getByRole } = render(
      html`<${MultiSelectIcons} options=${options} />`
    );

    // Currently, this query does not work because the checkboxes are hidden
    // from assistive technologies with "display: none".
    // TODO: Uncomment this when checkboxes become visible to assistive tech
    // const checkboxes = getAllByRole("checkbox");
    // checkboxes.should.have.length(options.length);

    const imgs = options.map(({ name }) => getByRole("img", { name }));

    imgs[0].should.have.property("src", options[0].url);
    imgs[1].should.have.property("src", options[1].url);
    imgs[2].should.have.property("src", options[2].url);

    // Check highlighting
    Number(getComputedStyle(imgs[0]).opacity).should.be.below(1);
    Number(getComputedStyle(imgs[1]).opacity).should.be.below(1);
    Number(getComputedStyle(imgs[2]).opacity).should.eql(1);

    // TODO: Uncomment this when checkboxes become visible to assistive tech
    // queryAllByRole("checkbox", { checked: true }).should.be.empty();
    // queryAllByRole("checkbox", { checked: false }).should.have.length(
    //   options.length
    // );
  });

  it("should call onSelectChange() when checkboxes are clicked", () => {
    const selectChangeHandler = sinon.spy();

    const { getByRole } = render(html`
      <${MultiSelectIcons}
        options=${options}
        onSelectChange=${selectChangeHandler}
      />
    `);

    selectChangeHandler.should.not.be.called();

    // Turn on option 0
    // TODO: Change this to accessing checkbox by label
    fireEvent.click(getByRole("img", { name: options[0].name }));
    waitFor(() => selectChangeHandler.should.be.calledOnce());
    selectChangeHandler.firstCall.should.be.calledWithExactly({
      [options[0].id]: true,
      [options[1].id]: false,
      [options[2].id]: true,
    });

    // Turn off option 2
    // Note: Since this is a controlled component, the previous change should
    // not be saved
    fireEvent.click(getByRole("img", { name: options[2].name }));
    waitFor(() => selectChangeHandler.should.be.calledTwice());
    selectChangeHandler.secondCall.should.be.calledWithExactly({
      [options[0].id]: false,
      [options[1].id]: false,
      [options[2].id]: false,
    });
  });
});
