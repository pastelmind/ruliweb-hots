/** @file Menu component for selecting and pasting HotsBoxes. */

import htm from "../vendor/htm.js";
import { Fragment, createElement } from "../vendor/preact.js";

const html = htm.bind(createElement);

/**
 * @typedef {import("../decorate-hots-data.js").DecoratedHero} DecoratedHero
 * @typedef {import("../decorate-hots-data.js").DecoratedSkill} DecoratedSkill
 * @typedef {import("../decorate-hots-data.js").DecoratedTalent} DecoratedTalent
 * @typedef {import("../hots-dialog-renderer.js").Renderer} Renderer
 */

/**
 * @typedef {object} Props
 * @property {?DecoratedHero} hero Currently selected DecoratedHero object
 * @property {(hero: DecoratedHero, clickedElement: HTMLElement) => void} onPasteHero
 *    Called when the user clicks on a hero.
 * @property {(skill: DecoratedSkill, clickedElement: HTMLElement) => void} onPasteSkill
 *    Called when the user clicks on a skill.
 * @property {(talent: DecoratedTalent, clickedElement: HTMLElement) => void} onPasteTalent
 *    Called when the user clicks on a talent.
 * @property {(talents: DecoratedTalent[], clickedElement: HTMLElement) => void} onPasteTalentGroup
 *    Called when the user clicks on a talent group.
 */

/**
 * A menu of clickable hero icons.
 * @param {Props} props
 * @return {preact.VNode<Props>} DOM content to render
 */
export function HotsBoxMenu(props) {
  const { hero } = props;
  if (!hero) return /** @type {preact.VNode<Props>} */ (html`<${Fragment} />`);

  /**
   * @param {DecoratedHero} hero
   * @param {Event} event
   */
  function pasteHero(hero, event) {
    if (!(event.target instanceof HTMLElement)) {
      throw new Error("Event target is not a HTMLElement");
    }
    props.onPasteHero(hero, event.target);
  }

  /**
   * @param {DecoratedSkill} skill
   * @param {Event} event
   */
  function pasteSkill(skill, event) {
    if (!(event.target instanceof HTMLElement)) {
      throw new Error("Event target is not a HTMLElement");
    }
    props.onPasteSkill(skill, event.target);
  }

  /**
   * @param {DecoratedTalent} talent
   * @param {Event} event
   */
  function pasteTalent(talent, event) {
    if (!(event.target instanceof HTMLElement)) {
      throw new Error("Event target is not a HTMLElement");
    }
    props.onPasteTalent(talent, event.target);
  }

  /**
   * @param {DecoratedTalent[]} talentGroup
   * @param {Event} event
   */
  function pasteTalentGroupWithEffect(talentGroup, event) {
    if (!(event.target instanceof HTMLElement)) {
      throw new Error("Event target is not a HTMLElement");
    }
    props.onPasteTalentGroup(talentGroup, event.target);
  }

  return /** @type {preact.VNode<Props>} */ (html`
    <${Fragment}>
      <div class="hots-dialog__section hots-skillset" key=${hero.id}>
        <div
          class="hots-current-hero-icon-wrapper"
          aria-label="${hero.name} (${hero.roleName})"
          data-microtip-position="top"
          role="tooltip"
        >
          <img
            class="hots-current-hero-icon"
            src="${hero.iconUrl}"
            alt="${hero.name} (${hero.roleName})"
            onClick=${pasteHero.bind(null, hero)}
          />
        </div>
        ${Object.values(hero.skills).map(
          (skill) => html`
            <div
              class="hots-skill-icon-wrapper"
              aria-label="${`${skill.typeName} - ${skill.name}\n${skill.tooltipDescription}`}"
              data-microtip-position="top"
              role="tooltip"
            >
              <img
                class="hots-skill-icon"
                src="${skill.iconUrl}"
                alt="${skill.typeName} - ${skill.name}"
                onClick=${pasteSkill.bind(null, skill)}
              />
            </div>
          `
        )}
      </div>
      <ul class="hots-dialog__section hots-talentset" key=${hero.id}>
        ${Object.entries(hero.talents).map(
          ([level, talentGroup]) => html`
            <li class="hots-talentset__group">
              <span class="hots-talentset__group-title">${level}레벨</span>
              ${talentGroup.map(
                (talent) => html`
                  <div
                    class="hots-talent-icon-wrapper"
                    aria-label="${`${talent.name}\n` +
                    `(${talent.typeNameLong} - 레벨 ${level})\n` +
                    talent.tooltipDescription}"
                    data-microtip-position="top"
                    role="tooltip"
                  >
                    <img
                      class="hots-talent-icon"
                      src="${talent.iconUrl}"
                      alt="${talent.name} (${talent.typeNameLong} - 레벨 ${level})"
                      onClick=${pasteTalent.bind(null, talent)}
                    />
                  </div>
                `
              )}
              <div class="hots-talentset__group-buttonset">
                <input
                  type="button"
                  class="hots-talentset__group-add-all"
                  value="모두 넣기"
                  onClick=${pasteTalentGroupWithEffect.bind(null, talentGroup)}
                />
              </div>
            </li>
          `
        )}
      </ul>
    <//>
  `);
}
