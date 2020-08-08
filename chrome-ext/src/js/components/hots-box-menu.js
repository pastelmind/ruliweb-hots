/** @file Menu component for selecting and pasting HotsBoxes. */

import { animateFlyingBox, getOffsetToViewport } from "../hots-dialog-util.js";
import htm from "../vendor/htm.js";
import { Fragment, createElement } from "../vendor/preact.js";

/**
 * @typedef {import("../../../../api/src/hero").Hero} Hero
 * @typedef {import("../../../../api/src/skill").Skill} Skill
 * @typedef {import("../../../../api/src/talent").Talent} Talent
 * @typedef {import('../hots-dialog-renderer').Renderer} Renderer
 */

const html = htm.bind(createElement);

/**
 * @typedef {object} Props
 * @property {?Hero} hero Currently selected Hero object
 * @property {(hero: Hero) => Element[]} onPasteHero Called when the user clicks
 *    on a hero. Argument is the clicked Hero object.
 *    Must return an array of pasted elements.
 * @property {(skill: Skill) => Element[]} onPasteSkill Called when the user
 *    clicks on a skill. Argument is the clicked Skill object.
 *    Must return an array of pasted elements.
 * @property {(talent: Talent) => Element[]} onPasteTalent Called when the user
 *    clicks on a talent. Argument is the clicked Talent object.
 *    Must return an array of pasted elements.
 * @property {(talents: Talent[]) => Element[]} onPasteTalentGroup Called when
 *    the user clicks on a talent group. Argument is array of Talent objects.
 *    Must return an array of pasted elements.
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
   * @param {Hero} hero
   * @param {Event} event
   */
  function pasteHeroWithEffect(hero, event) {
    const [pastedElement] = props.onPasteHero(hero);
    animatePasteEffect(pastedElement, event.target);
  }

  /**
   * @param {Skill} skill
   * @param {Event} event
   */
  function pasteSkillWithEffect(skill, event) {
    const [pastedElement] = props.onPasteSkill(skill);
    animatePasteEffect(pastedElement, event.target);
  }

  /**
   * @param {Talent} talent
   * @param {Event} event
   */
  function pasteTalentWithEffect(talent, event) {
    const [pastedElement] = props.onPasteTalent(talent);
    animatePasteEffect(pastedElement, event.target);
  }

  /**
   * @param {Talent[]} talentGroup
   * @param {Event} event
   */
  function pasteTalentGroupWithEffect(talentGroup, event) {
    const [pastedElement] = props.onPasteTalentGroup(talentGroup);
    animatePasteEffect(pastedElement, event.target);
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
            onClick=${pasteHeroWithEffect.bind(null, hero)}
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
                onClick=${pasteSkillWithEffect.bind(null, skill)}
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
                      onClick=${pasteTalentWithEffect.bind(null, talent)}
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

/**
 * Creates a flying box effect when pasting.
 * @param {Element | undefined} injectedElement Element that was pasted. If
 *    undefined, this function will do nothing.
 * @param {EventTarget | null} clickedElement Element that was triggered by the user
 */
function animatePasteEffect(injectedElement, clickedElement) {
  if (!injectedElement || !isElement(clickedElement)) return;

  const { left: endX, top: endY } = getOffsetToViewport(injectedElement);
  animateFlyingBox(clickedElement, endX, endY);
}

// eslint-disable-next-line valid-jsdoc -- TypeScript syntax
/**
 * @param {EventTarget | null} o
 * @return {o is Element}
 */
function isElement(o) {
  return o != null && "tagName" in o;
}
