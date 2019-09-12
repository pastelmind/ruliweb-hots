/** @file Component representing a multi-selectable group of icons. */
'use strict';

((root, require) => {
  const isNodeJs = typeof require === 'function';
  /** @type {import('htm')} */
  const htm = isNodeJs ? require('htm') : root.htm;
  /** @type {import('preact')} */
  const preact = isNodeJs ? require('preact') : root.preact;

  const html = htm.bind(preact.createElement);
  const { Component } = preact;

  /** Represents a multi-selectable group of icons. */
  class MultiSelectIcons extends Component {
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
        prevState => ({
          ...prevState,
          selected: {
            ...prevState.selected,
            [optionId]: event.target.checked,
          },
        }),
        () => {
          const selectedIds = this.props.options
            .filter(o => this.state.selected[o.id])
            .map(o => o.id);
          this.props.onSelectChange(selectedIds);
        }
      );
      event.preventDefault();
    }

    /** @return {Object} DOM content to render */
    render() {
      return html`
        <div class="multi-select-icons">
          ${this.props.options.map(option => html`
            <label key=${option.id} class="multi-select-icons__option"
              aria-label="${option.name}"
              data-microtip-position="top" role="tooltip">
              <input type="checkbox"
                onInput=${event => this.onOptionInput(event, option.id)}/>
              <img class="multi-select-icons__option-icon" alt="${option.name}"
                src="${option.iconUrl}"/>
            </label>
          `)}
        </div>
      `;
    }
  }

  if (typeof module === 'object' && module.exports) {
    // Node.js
    module.exports = exports = MultiSelectIcons;
  } else {
    // Browser globals
    const HotsDialog = (root.HotsDialog = root.HotsDialog || {});
    const components = (HotsDialog.components = HotsDialog.components || {});
    components.MultiSelectIcons = MultiSelectIcons;
  }

  // Obtain the global context (`this` works in both Chrome and Firefox)
})(this); // eslint-disable-line no-invalid-this
