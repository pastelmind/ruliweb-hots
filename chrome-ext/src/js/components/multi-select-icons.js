/** @file Component representing a multi-selectable group of icons. */

import htm from "../vendor/htm.js";
import { Component, createElement } from "../vendor/preact.js";

const html = htm.bind(createElement);

/** Represents a multi-selectable group of icons. */
export class MultiSelectIcons extends Component {
  /**
   * @param {Object} props
   * @param {{id: string, name: string, iconUrl: string}[]} props.options
   *    Array of options.
   * @param {function (string[]): undefined} props.onSelectChange Called when
   *    the user toggles an option. Argument is an array of selected IDs.
   */
  constructor(props) {
    super(props);

    const selected = {};
    for (const { id } of props.options) {
      selected[id] = false;
    }
    this.state = { selected };
  }

  /**
   * Called when an option's state changes.
   * @param {Event} event
   * @param {string} optionId ID of the changed option.
   * @return {undefined}
   */
  onOptionInput(event, optionId) {
    this.setState(
      (prevState) => ({
        ...prevState,
        selected: {
          ...prevState.selected,
          [optionId]: event.target.checked,
        },
      }),
      () => {
        const selectedIds = this.props.options
          .filter((o) => this.state.selected[o.id])
          .map((o) => o.id);
        this.props.onSelectChange(selectedIds);
      }
    );
    event.preventDefault();
  }

  /** @return {Object} DOM content to render */
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
                onInput=${(event) => this.onOptionInput(event, option.id)}
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
