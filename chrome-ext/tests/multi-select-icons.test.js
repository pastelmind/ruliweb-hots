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
      iconUrl: "https://example.com/author/charlotte-perkins-gilman.png",
    },
    {
      id: "mansfield",
      name: "Katherine Mansfield",
      iconUrl: "https://example.com/author/katherine-mansfield.png",
    },
    {
      id: "chopin",
      name: "Kate Chopin",
      iconUrl: "https://example.com/author/kate-chopin.png",
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

    for (const option of options) {
      const img = getByRole("img", { name: option.name });
      img.should.have.property("src", option.iconUrl);
    }

    // TODO: Uncomment this when checkboxes become visible to assistive tech
    // queryAllByRole("checkbox", { checked: true }).should.be.empty();
    // queryAllByRole("checkbox", { checked: false }).should.have.length(
    //   options.length
    // );
  });

  it("should call onSelectChange() when checkboxes are clicked", async () => {
    const selectChangeHandler = sinon.spy();

    const { getByRole } = render(html`
      <${MultiSelectIcons}
        options=${options}
        onSelectChange=${selectChangeHandler}
      />
    `);

    selectChangeHandler.should.not.be.called();

    // TODO: Change this to accessing checkbox by label
    fireEvent.click(getByRole("img", { name: options[2].name }));
    // The current implementation of <MultiSelectIcons> fires the callback
    // *after* updating internal state, which is probably why we need await here.
    // It also possibly makes the form less responsive. This is undesireable.
    // To solve it, we should make <MultiSelectIcons> a *fully* controlled
    // component; i.e. its checkbox states are driven entirely by props.
    // TODO: Refactor <MultiSelectIcons>, then eliminate awaits
    await waitFor(() => selectChangeHandler.should.be.calledOnce());
    selectChangeHandler.firstCall.should.be.calledWithExactly([options[2].id]);

    fireEvent.click(getByRole("img", { name: options[0].name }));
    await waitFor(() => selectChangeHandler.should.be.calledTwice());
    selectChangeHandler.secondCall.should.be.calledWithExactly([
      options[0].id,
      options[2].id,
    ]);

    // Turn off option 2
    fireEvent.click(getByRole("img", { name: options[2].name }));
    await waitFor(() => selectChangeHandler.should.be.calledThrice());
    selectChangeHandler.thirdCall.should.be.calledWithExactly([options[0].id]);
  });
});
