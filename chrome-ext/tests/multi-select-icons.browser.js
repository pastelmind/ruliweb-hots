/**
 * @file In-browser preview of the MultiSelectIcons component.
 */

import { MultiSelectIcons } from "../src/js/components/multi-select-icons.js";
import htm from "../src/js/vendor/htm.js";
import { h, render } from "../src/js/vendor/preact.js";

import { makeFake } from "./js/browser-helpers.js";

const html = htm.bind(h);

/**
 * @typedef {"gilman" | "mansfield" | "chopin"} AuthorId
 */

/**
 * @template T
 * @typedef {import("../src/js/components/multi-select-icons.js").Props<T>} Props
 */

/** @type {Props<AuthorId>} */
const props = {
  options: [
    {
      id: "gilman",
      name: "Charlotte Perkins Gilman",
      iconUrl: "./images/gilman.jpg",
    },
    {
      id: "mansfield",
      name: "Katherine Mansfield",
      iconUrl: "./images/mansfield.jpg",
    },
    {
      id: "chopin",
      name: "Kate Chopin",
      iconUrl: "./images/chopin.jpg",
    },
  ],
  onSelectChange: makeFake("onSelectChange"),
};

const target = document.getElementById("main");
if (target) {
  render(html`<${MultiSelectIcons} ...${props} />`, target);
} else {
  console.error("Cannot find #main");
}
