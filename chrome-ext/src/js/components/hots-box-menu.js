/** @file Menu component for selecting and pasting HotsBoxes. */

/**
 * @typedef {import("../../../../api/src/hero").Hero} Hero
 * @typedef {import("../../../../api/src/skill").Skill} Skill
 * @typedef {import("../../../../api/src/talent").Talent} Talent
 * @typedef {import('../hots-dialog-renderer').Renderer} Renderer
 */

import _htm from '../htm.js';
import {
  createElement as _createElement,
  Fragment as _Fragment,
} from '../preact.js';

/** @type {import('htm')['default']} */
const htm = _htm;
/** @type {import('preact')['createElement']} */
const createElement = _createElement;
/** @type {import('preact')['Fragment']} */
const Fragment = _Fragment;

const html = htm.bind(createElement);

import {animateFlyingBox, getOffsetToViewport} from '../hots-dialog-util.js';

/**
 * A menu of clickable hero icons.
 * @param {Object} props
 * @param {Hero} props.hero Currently selected Hero object
 * @param {function (Hero): Element[]} props.onPasteHero Called when the
 *    user clicks on a hero. Argument is the clicked Hero object.
 *    Must return an array of pasted elements.
 * @param {function (Skill): Element[]} props.onPasteSkill Called when the
 *    user clicks on a skill. Argument is the clicked Skill object.
 *    Must return an array of pasted elements.
 * @param {function (Talent): Element[]} props.onPasteTalent Called when the
 *    user clicks on a talent. Argument is the clicked Talent object.
 *    Must return an array of pasted elements.
 * @param {function (Talent[]): Element[]} props.onPasteTalentGroup Called
 *    when the user clicks on a talent group. Argument is array of Talent
 *    objects. Must return an array of pasted elements.
 * @return {Object} DOM content to render
 */
export function HotsBoxMenu(props) {
  const {hero} = props;
  if (!hero) return html`<${Fragment}/>`;

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

  return html`
    <${Fragment}>
      <div class="hots-dialog__section hots-skillset" key=${hero.id}>
        <div class="hots-current-hero-icon-wrapper"
          aria-label="${hero.name} (${hero.roleName})"
          data-microtip-position="top" role="tooltip">
          <img class="hots-current-hero-icon" src="${hero.iconUrl}"
            alt="${hero.name} (${hero.roleName})"
            onClick=${(e) => pasteHeroWithEffect(hero, e)}/>
        </div>
        ${Object.values(hero.skills).map((skill) => html`
          <div class="hots-skill-icon-wrapper"
            aria-label="${
              `${skill.typeName} - ${skill.name}\n${skill.tooltipDescription}`
            }"
            data-microtip-position="top" role="tooltip">
            <img class="hots-skill-icon" src="${skill.iconUrl}"
              alt="${skill.typeName} - ${skill.name}"
              onClick=${(e) => pasteSkillWithEffect(skill, e)}/>
          </div>
        `)}
      </div>
      <ul class="hots-dialog__section hots-talentset"  key=${hero.id}>
        ${Object.entries(hero.talents).map(([level, talentGroup]) => html`
          <li class="hots-talentset__group">
            <span class="hots-talentset__group-title">${level}레벨</span>
            ${talentGroup.map((talent) => html`
              <div class="hots-talent-icon-wrapper"
                aria-label="${
                  `${talent.name}\n` +
                  `(${talent.typeNameLong} - 레벨 ${level})\n` +
                  talent.tooltipDescription
                }"
                data-microtip-position="top" role="tooltip">
                <img class="hots-talent-icon" src="${talent.iconUrl}"
                  alt="${talent.name} (${talent.typeNameLong} - 레벨 ${level})"
                  onClick=${(e) => pasteTalentWithEffect(talent, e)}
                />
              </div>
            `)}
            <div class="hots-talentset__group-buttonset">
              <input type="button" class="hots-talentset__group-add-all"
                value="모두 넣기"
                onClick=${(e) => pasteTalentGroupWithEffect(talentGroup, e)}/>
            </div>
          </li>
        `)}
      </ul>
    <//>
  `;
}

/**
 * Creates a flying box effect when pasting.
 * @param {Element} injectedElement Element that was pasted
 * @param {Element} clickedElement Element that was triggered by the user
 */
function animatePasteEffect(injectedElement, clickedElement) {
  const {left: endX, top: endY} = getOffsetToViewport(injectedElement);
  animateFlyingBox(clickedElement, endX, endY);
}
