/**
 * Constructs the HotS hero/skill/talent selection dialog.
 * Can be run in Node.js or in the browser.
 */

'use strict';

(root => {
  const heroFilters = {
    universe: {
      name: '세계관',
      filters: {
        'warcraft': '워크래프트',
        'starcraft': '스타크래프트',
        'diablo': '디아블로',
        'classic': '블리자드 고전',
        'overwatch': '오버워치',
      },
    },
    newRole: {
      name: '역할',
      filters: {
        tank: '전사',
        bruiser: '투사',
        ranged_assassin: '원거리 암살자',
        melee_assassin: '근접 암살자',
        healer: '치유사',
        support: '지원가',
      },
    },
  };

  /**
   * Retrieves the renderering templates.
   * @return {Promise<Object<string, string>>} Object mapping template names
   *    to template strings
   * @throws {Error} Template cannot be loaded.
   */
  async function loadTemplates() {
    const templateJsonPath = chrome.runtime.getURL('templates.json');
    const response = await fetch(templateJsonPath);
    if (response.ok) return response.json();
    throw new Error(
      `Cannot retrieve ${templateJsonPath}, ` +
      `got ${response.status} ${response.statusText}`
    );
  }

  const HotsDialog = {
    heroFilters,
    loadTemplates,

    /**
     * Launch the hero/skill/talent selection dialog.
     */
    async launchDialog() {
      if (!this.dialog) {
        const templates = await this.loadTemplates();
        const data = await new Promise((resolve, reject) => {
          chrome.storage.local.get(
            ['heroes', 'hotsVersion', 'ptrHeroes', 'hotsPtrVersion'],
            data => {
              if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
              resolve(data);
            }
          );
        });

        this.dialog = new this.Dialog(templates, data, this.heroFilters);
      }

      this.dialog.open();
    },
  };


  if (typeof module !== 'undefined' && module.exports) {
    // Node.js
    module.exports = exports = {
      ...HotsDialog,
      Dialog: require('./hots-dialog-dialog'),
      DialogContent: require('./hots-dialog-content'),
      HtmlPaster: require('./hots-dialog-paster'),
      Renderer: require('./hots-dialog-renderer'),
      util: require('./hots-dialog-util'),
      components: {
        HeroMenu: require('./components/hero-menu'),
        MultiSelectIcons: require('./components/multi-select-icons'),
      },
    };
  } else {
    // Browser globals
    root.HotsDialog =
      root.HotsDialog ? Object.assign(root.HotsDialog, HotsDialog) : HotsDialog;
  }

  // Obtain the global context (`this` works in both Chrome and Firefox)
})(this); // eslint-disable-line no-invalid-this
