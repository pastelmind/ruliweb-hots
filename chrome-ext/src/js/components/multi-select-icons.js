/** @file Component representing a multi-selectable group of icons. */

import htm from "../vendor/htm.js";
import { createElement } from "../vendor/preact.js";

const html = htm.bind(createElement);

/**
 * @template {string} T
 * @typedef {object} OptionInfo
 * @property {T} id Unique ID of the option
 * @property {string} name Option name, used for alt text and icon tooltip
 * @property {string} url Icon URL
 * @property {boolean=} isSelected
 */

/**
 * @template {string} T
 * @typedef {object} Props
 * @property {OptionInfo<T>[]} options Array of options.
 * @property {(selected: Record<T, boolean>) => void} onSelectChange Called when
 *    the user toggles an option. Argument is a new object that maps each option
 *    ID to its status (`true` if checked, `false` if unchecked).
 */

/**
 * @template {string} T
 * @typedef {object} State
 * @property {Record<T, boolean>} selected
 */

/**
 * Represents a multi-selectable group of icons.
 * @template {string} T
 * @param {Props<T>} props
 * @return {preact.VNode<Props<T>>}
 */
export function MultiSelectIcons(props) {
  /**
   * Called when an option's state changes.
   * @param {T} optionId ID of the changed option.
   */
  function onOptionToggle(optionId) {
    const selected = /** @type {Record<T, boolean>} */ ({});
    for (const { id, isSelected = false } of props.options) {
      selected[id] = optionId === id ? !isSelected : isSelected;
    }
    props.onSelectChange(selected);
  }

  return /** @type {preact.VNode<Props<T>>} */ (html`
    <div class="multi-select-icons">
      ${props.options.map(
        (option) => html`
          <label
            key=${option.id}
            class="multi-select-icons__option"
            aria-label="${option.name}"
            data-microtip-position="top"
            role="tooltip"
          >
            <input
              type="checkbox"
              checked=${Boolean(option.isSelected)}
              onClick=${onOptionToggle.bind(null, option.id)}
            />
            <img
              class="multi-select-icons__option-icon"
              alt="${option.name}"
              src="${option.url}"
            />
          </label>
        `
      )}
    </div>
  `);
}
