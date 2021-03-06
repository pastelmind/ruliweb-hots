/**
 * @file In-browser preview of the HeroMenu component.
 */

import { HeroMenu } from "../src/js/components/hero-menu.js";
import htm from "../src/js/vendor/htm.js";
import { h, render } from "../src/js/vendor/preact.js";

import { makeFake } from "./js/browser-helpers.js";

const html = htm.bind(h);

/**
 * @typedef {preact.ComponentProps<HeroMenu>} Props
 */

/** @type {Props["icons"]} */
const icons = [
  {
    id: "Romeo",
    url: "./images/romeo.png",
    title: "Romeo Montague (Man in love)",
    isHighlighted: true,
  },
  {
    id: "Juliet",
    title: "Juliet Capulet (Woman in love)",
    url: "./images/juliet.png",
    isHighlighted: false,
    ptrStatus: "changed",
  },
  {
    id: "Hamlet",
    title: "Hamlet of Denmark (Mad prince)",
    url: "./images/hamlet.png",
    isHighlighted: true,
    ptrStatus: "new",
  },
];

const target = document.getElementById("main");
if (target) {
  render(
    html`<${HeroMenu} icons=${icons} onClickHero=${makeFake("onClickHero")} />`,
    target
  );
} else {
  console.error("Cannot find #main");
}
