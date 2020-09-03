/** @file Component representing a multi-selectable group of icons. */

import htm from "../vendor/htm.js";
import { Component, createElement } from "../vendor/preact.js";

const html = htm.bind(createElement);

/**
 * @template {string} T
 * @typedef {object} Props
 * @property {{id: T, name: string, iconUrl: string}[]} options
 *    Array of options.
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
 * @extends {Component<Props<T>, State<T>>}
 */
export class MultiSelectIcons extends Component {
  /** @param {Props<T>} props */
  constructor(props) {
    super(props);

    const selected = /** @type {State<T>['selected']} */ ({});
    for (const { id } of props.options) {
      selected[id] = false;
    }
    this.state = { selected };
  }

  /**
   * Called when an option's state changes.
   * @param {T} optionId ID of the changed option.
   * @param {InputEvent} event
   */
  onOptionInput(optionId, event) {
    if (!event.target) return;

    const isChecked = /** @type {HTMLInputElement} */ (event.target).checked;
    this.setState(
      (prevState) => ({
        ...prevState,
        selected: { ...prevState.selected, [optionId]: isChecked },
      }),
      () => {
        this.props.onSelectChange({ ...this.state.selected });
      }
    );
    event.preventDefault();
  }

  /** @return {ReturnType<html>} */
  render() {
    return html`
      <div class="multi-select-icons">
        ${this.props.options.map(
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
                onInput=${this.onOptionInput.bind(this, option.id)}
              />
              <img
                class="multi-select-icons__option-icon"
                alt="${option.name}"
                src="${option.iconUrl}"
              />
            </label>
          `
        )}
      </div>
    `;
  }
}
