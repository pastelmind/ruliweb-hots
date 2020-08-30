/** @file Component for a menu of clickable hero icons. */

import htm from "../vendor/htm.js";
import { createElement } from "../vendor/preact.js";

const html = htm.bind(createElement);

/**
 * @typedef {object} IconData
 * @property {string} id Unique ID
 * @property {string} url Icon URL
 * @property {string} title Title of the icon. This is used as the alt text, and
 *    also used to generate the tooltip on mouse hover.
 * @property {boolean} isHighlighted If truthy, the icon is highlighted
 * @property {"new" | "changed"=} ptrStatus Describes whether the hero is new in
 *    the PTR (i.e. not in Live), or changed (exists both in PTR and Live).
 *    This is used to add badges on the icon, and to generate the tooltip text.
 */

/**
 * @typedef {object} Props
 * @property {IconData[]} icons Array of icon data objects to display
 * @property {(id: string) => void} props.onClickHero Called when the
 *    user clicks on a hero. Argument is the icon ID (hero ID).
 */

/**
 * A menu of clickable hero icons.
 * @param {Props} props
 * @return {preact.VNode<Props>} DOM content to render
 */
export function HeroMenu(props) {
  return /** @type {preact.VNode<Props>} */ (html`
    <div class="hots-dialog__section hots-hero-icons">
      ${props.icons.map((icon) => {
        let tooltip = icon.title;
        if (icon.ptrStatus === "new") {
          tooltip += "\n이 영웅은 PTR에 추가되었습니다";
        } else if (icon.ptrStatus === "changed") {
          tooltip += "\n이 영웅은 PTR에서 변경되었습니다";
        } else {
          console.assert(
            icon.ptrStatus === undefined,
            "Unexpected PTR status in %o",
            icon
          );
        }

        // <input type="image"> elements are Replaced Elements, which cannot
        // have pseudo-elements such as ::before and ::after. Because of this,
        // we cannot add Microtip.js tooltips directly on them, and must use a
        // wrapper <div> instead.
        // See:
        //  - https://developer.mozilla.org/en-US/docs/Web/CSS/Replaced_element
        //  - https://developer.mozilla.org/en-US/docs/Web/CSS/::after
        return html`
          <div
            class="hots-hero-icon-wrapper"
            aria-label="${tooltip}"
            data-microtip-position="top"
            role="tooltip"
          >
            <input
              class="hots-hero-icon
                ${!icon.isHighlighted && "hots-hero-icon--excluded"}"
              type="image"
              alt="${icon.title}"
              src="${icon.url}"
              onClick="${() => props.onClickHero(icon.id)}"
            />
            ${icon.ptrStatus &&
            html`
              <span
                class="hots-hero-icon-badge
                hots-hero-icon-badge--${icon.ptrStatus === "new"
                  ? "new"
                  : "ptr-changes"}"
              >
                ${icon.ptrStatus === "new" ? "NEW" : "PTR"}
              </span>
            `}
          </div>
        `;
      })}
    </div>
  `);
}
