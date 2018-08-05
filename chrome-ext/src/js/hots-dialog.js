/**
 * Constructs the HotS hero/skill/talent selection dialog.
 * Can be run in Node.js or in the browser.
 */

'use strict';

/**
 * A collection of data that represents a skill.
 * @typedef {import("../../../api-server/src/skill")} Skill
 */

/**
 * A collection of data that represents a talent.
 * @typedef {import("../../../api-server/src/talent")} Talent
 */

/**
 * A collection of data that represents a hero.
 * @typedef {import("../../../api-server/src/hero")} Hero
 */

/**
 * A callback that injects the given HTML string into a desired position.
 * @callback HtmlStringInjector
 * @param {string} html
 * @return {void}
 */

/**
 * Collection of HotS data loaded from hots.json
 * @typedef {Object} HotsData
 * @prop {Object<string, Hero>} heroes Hero ID => hero data
 * @prop {Object<string, Hero>} ptrHeroes Hero ID => hero data
 * @prop {string} hotsVersion HotS version
 * @prop {string} hotsPtrVersion HotS PTR version
 */


const HotsDialog = {
  /**
   * Set by `openHotsDialog()`
   * @type {HotsData}
   */
  data: null,

  /** @type {HtmlStringInjector} */
  injectHtml: null,

  /** @type {Hero} */
  selectedHero: null,

  heroFilters: {
    'universe': {
      name: '세계관',
      filters: {
        'warcraft': '워크래프트',
        'starcraft': '스타크래프트',
        'diablo': '디아블로',
        'classic': '블리자드 고전',
        'overwatch': '오버워치'
      }
    },
    'role': {
      name: '역할',
      filters: {
        'warrior': '전사',
        'assassin': '암살자',
        'support': '지원가',
        'specialist': '전문가'
      }
    }
  },

  /**
   * Launch the hero/skill/talent selection dialog
   * @param {HtmlStringInjector} injector Callback that injects the given HTML fragment into the appropriate position
   */
  launchDialog(injector) {
    //Snapshot currently selected area
    this.injectHtml = injector;

    if (!this.dialog) {
      this.dialog = new tingle.modal({ cssClass: ['hots-dialog-container'] });

      this.dialog.setContent(this.buildDialogContent(this.data));
    }

    this.dialog.open();
  },

  /**
   * Generates the dialog content and attaches event handlers.
   * @param {HotsData} hotsData
   * @return {DocumentFragment} A collection of generated DOM elements
   */
  buildDialogContent(hotsData) {
    //Generate dialog
    const dialogFragment = this.util.createDocumentFragmentFromHtml(document,
      this.htmlGenerators.generateDialogContent(this.heroFilters, hotsData.heroes, hotsData.ptrHeroes));

    //Retrieve each dialog section
    const optionsSection = dialogFragment.querySelector('.hots-dialog-options');
    const heroFilterSection = dialogFragment.querySelector('.hots-hero-filters');
    const heroIconsSection = dialogFragment.querySelector('.hots-hero-icons');
    const skillsetSection = dialogFragment.querySelector('.hots-skillset');
    const talentsetSection = dialogFragment.querySelector('.hots-talentset');

    //Retrieve individual elements and element groups
    const addVersionCheckbox = optionsSection.querySelector('#hots-dialog-option-add-version');
    const usePtrCheckbox = optionsSection.querySelector('#hots-dialog-option-use-ptr');
    const heroIconElems = heroIconsSection.querySelectorAll('.hots-hero-icon');
    const heroFilterCheckboxes = heroFilterSection.querySelectorAll('.hero-filter input[type=checkbox]');

    //Add click handler for hero filters
    for (const checkbox of heroFilterCheckboxes) {
      checkbox.addEventListener('change', () =>
        this.updateHeroIcons(heroIconElems, heroFilterCheckboxes, hotsData.heroes));
    }

    //Add click handler for hero icons
    heroIconsSection.addEventListener('click', event => {
      if (!(event.target && event.target.classList.contains('hots-hero-icon'))) return;
      const heroId = event.target.dataset.heroId;   //data-hero-id

      const hero = this.selectedHero = this.getHeroDataById(heroId, usePtrCheckbox.checked);
      console.assert(hero, `Cannot find hero with ID: ${heroId}`);

      skillsetSection.innerHTML = this.htmlGenerators.generateSkillIcons(hero);
      talentsetSection.innerHTML = this.htmlGenerators.generateTalentList(hero);
    });

    //Add click handler for "Use PTR" checkbox
    usePtrCheckbox.addEventListener('change', event => {
      if (!this.selectedHero) return;

      const heroId = this.selectedHero.id;
      const hero = this.selectedHero = this.getHeroDataById(heroId, usePtrCheckbox.checked);
      console.assert(hero, `Cannot find hero with ID: ${heroId}`);

      skillsetSection.innerHTML = this.htmlGenerators.generateSkillIcons(hero);
      talentsetSection.innerHTML = this.htmlGenerators.generateTalentList(hero);
    });

    //Add event handlers for selected hero icon and skill icons
    skillsetSection.addEventListener('click', event => {
      if (!(event.target)) return;
      const iconElem = event.target;

      if (iconElem.classList.contains('hots-current-hero-icon')) {
        const heroId = iconElem.dataset.heroId; //data-hero-id
        const isPtr = iconElem.dataset.isPtr;   //data-is-ptr
        const hero = this.getHeroDataById(heroId, isPtr);

        const version = addVersionCheckbox.checked ? this.getHotsVersion(isPtr) : '';

        this.injectHtml(this.htmlGenerators.generateHeroInfoTable(hero, version));
      }
      else if (event.target.classList.contains('hots-skill-icon')) {
        const heroId = iconElem.dataset.heroId; //data-hero-id
        const isPtr = iconElem.dataset.isPtr;   //data-is-ptr
        const hero = this.getHeroDataById(heroId, isPtr);

        const skill = hero.skills[iconElem.dataset.skillIndex]; //data-skill-index

        const version = addVersionCheckbox.checked ? this.getHotsVersion(isPtr) : '';

        this.injectHtml(this.htmlGenerators.generateSkillInfoTable(skill, version));
      }
    });

    //Add event handlers for talent icons
    talentsetSection.addEventListener('click', event => {
      if (!(event.target)) return;
      const iconElem = event.target;

      if (iconElem.classList.contains('hots-talent-icon')) {
        const heroId = iconElem.dataset.heroId; //data-hero-id
        const isPtr = iconElem.dataset.isPtr;   //data-is-ptr
        const hero = this.getHeroDataById(heroId, isPtr);

        const talentGroup = hero.talents[iconElem.dataset.talentLevel]; //data-talent-level
        const talent = talentGroup[iconElem.dataset.talentIndex];       //data-talent-index

        const version = addVersionCheckbox.checked ? this.getHotsVersion(isPtr) : '';

        this.injectHtml(this.htmlGenerators.generateTalentInfoTable(talent, version));
      }
      else if (iconElem.classList.contains('hots-talentset__group-add-all')) {
        const heroId = iconElem.dataset.heroId; //data-hero-id
        const isPtr = iconElem.dataset.isPtr;   //data-is-ptr
        const hero = this.getHeroDataById(heroId, isPtr);

        const talentGroup = hero.talents[iconElem.dataset.talentLevel]; //data-talent-level

        const version = addVersionCheckbox.checked ? this.getHotsVersion(isPtr) : '';

        this.injectHtml(this.htmlGenerators.generateTalentGroupInfoTable(talentGroup, version));
      }
    });

    return dialogFragment;
  },

  /**
   * Updates the hero icons, filtered by `heroFilterCheckboxes`.
   * @param {Iterable<Element>} heroIconElems Array of hero icon elements
   * @param {Iterable<HTMLInputElement>} heroFilterCheckboxes Array of checkbox <input> elements
   * @param {Object.<string, Object>} heroes key => value pairs of hero ID => hero data
   */
  updateHeroIcons(heroIconElems, heroFilterCheckboxes, heroes) {
    //Generate a collection of active filters
    const activeFilters = {};

    for (const filterType in this.heroFilters)
      activeFilters[filterType] = new Set;

    for (const checkbox of heroFilterCheckboxes)
      if (checkbox.checked)
        activeFilters[checkbox.dataset.filterType].add(checkbox.value); //data-filter-type

    //Toggle CSS class of each hero icon
    for (const heroIconElem of heroIconElems) {
      const hero = heroes[heroIconElem.dataset.heroId]; //data-hero-id
      heroIconElem.classList.toggle('hots-hero-icon--excluded', !testHero(hero, activeFilters));
    }

    //Helper function
    function testHero(hero, activeFilters) {
      for (const filterType in activeFilters) {
        const filterSet = activeFilters[filterType];
        const heroAttribute = hero[filterType];

        //Keep this hero if the filterSet is empty
        if (!filterSet.size) continue;

        let isMatched = false;

        //Keep this hero if there is a filter that matches him/her/it/them.
        for (const filter of activeFilters[filterType])
          if (heroAttribute.includes(filter))
            isMatched = true;

        if (!isMatched) return false;
      }

      return true;
    }
  },

  /**
   * Get the hero data from the hero's ID. Searches for the hero ID first in the
   * live data, then in the PTR data.
   * @param {string} heroId Hero ID string
   * @param {boolean} preferPtr If truthy, use the PTR data first.
   * @return {Hero} Selected hero object
   */
  getHeroDataById(heroId, preferPtr = false) {
    if (preferPtr)
      return this.data.ptrHeroes[heroId] || this.data.heroes[heroId];
    else
      return this.data.heroes[heroId] || this.data.ptrHeroes[heroId];
  },

  /**
   * Retrieve the Heroes of the Storm version string for the dataset.
   * @param {boolean} isPtr If truthy, return the PTR version string instead.
   * @return {string} HotS version string
   */
  getHotsVersion(isPtr = false) {
    return isPtr ? this.data.hotsPtrVersion : this.data.hotsVersion;
  },

  /** Collection of methods that generate HTML source strings from templates */
  htmlGenerators: {
    /**
     * Object containing template name => template string.
     * This property is set by `./templates.js`
     * @type {Object<string, string>}
     */
    templates: null,

    /**
     * Generates the HTML source of the main dialog.
     * @param {Object<string, {name: string, filters: Object<string, string>}>} heroFilterGroups A collection of hero filter groups
     * @param {Object<string, Hero>} heroes Hero ID => hero data
     * @param {Object<string, Hero>} ptrHeroes Hero ID => hero data
     * @return {string} HTML source
     */
    generateDialogContent(heroFilterGroups, heroes, ptrHeroes) {
      //Prepare filter groups
      const filterGroups = [];
      for (const heroFilterGroupId in heroFilterGroups) {
        const heroFilterGroup = heroFilterGroups[heroFilterGroupId];

        const filters = [];
        for (const filterId in heroFilterGroup.filters) {
          filters.push({
            type: heroFilterGroupId,
            value: filterId,
            name: heroFilterGroup.filters[filterId],
            iconUrl: chrome.runtime.getURL(`/images/${heroFilterGroupId}-${filterId}.png`)
          });
        }

        filterGroups.push({ name: heroFilterGroup.name, filters });
      }

      //Create hero array
      const heroesArray = Object.values(heroes);

      //Load hero(es) available only in the PTR
      for (const ptrHeroId in ptrHeroes) {
        if (!(ptrHeroId in heroes))
          heroesArray.push(ptrHeroes[ptrHeroId]);
      }

      //Set roleName
      //TODO Move this logic to decorateHotsData()
      for (const hero of heroesArray) {
        for (const roleId in heroFilterGroups.role.filters)
          if (hero.role.includes(roleId))
            hero.roleName = (hero.roleName ? hero.roleName + ' / ' : '') + heroFilterGroups.role.filters[roleId];
      }

      //Sort heroes by name
      heroesArray.sort((heroA, heroB) => heroA.name.localeCompare(heroB.name, 'en'));

      return Mustache.render(this.templates['dialog'],
        { filterGroups, heroes: heroesArray, appVersion: chrome.runtime.getManifest().version });
    },

    /**
     * Generate a group of skill icons for the hero.
     * @param {Hero} hero Hero data
     * @return {string} HTML source
     */
    generateSkillIcons(hero) {
      return Mustache.render(this.templates['dialog-skills'], hero);
    },

    /**
     * Generate a list of talent icons for the hero, grouped by talent level.
     * @param {Hero} hero Hero data
     * @return {string} HTML source
     */
    generateTalentList(hero) {
      //Convert talent groups into nested arrays of objects
      const talents = Object.entries(hero.talents).map(
        ([talentLevel, talentGroup]) => ({ talentLevel, talentGroup })
      );

      return Mustache.render(this.templates['dialog-talents'], { talents, id: hero.id, isPtr: hero.isPtr });
    },

    /**
     * Generates a table of hero information to be injected into a page.
     * @param {Hero} hero Hero data
     * @param {string=} hotsVersion (optional) HotS version string to display
     * @return {string} HTML source
     */
    generateHeroInfoTable(hero, hotsVersion) {
      const heroView = Object.create(hero);

      //Set universe icon offset
      heroView.universeIconOffset = {
        'classic': '0%',
        'starcraft': '25%',
        'diablo': '50%',
        'warcraft': '75%',
        'overwatch': '100%'
      }[heroView.universe];

      //Generate skill groups
      const traits = { title: '고유 능력', skills: [] };
      const basicAbilities = { title: '일반 기술', skills: [] };
      const heroicAbilities = { title: '궁극기', skills: [] };

      heroView.skills.forEach(skill => {
        if (skill.type === 'D')
          traits.skills.push(skill);
        else if (skill.type === 'R')
          heroicAbilities.skills.push(skill);
        else
          basicAbilities.skills.push(skill);
      });

      for (const talentLevel in heroView.talents) {
        for (const talent of heroView.talents[talentLevel]) {
          if (talent.type === 'R')
            heroicAbilities.skills.push(talent);
        }
      }

      heroView.skillGroups = [traits, basicAbilities, heroicAbilities];

      for (const skillGroup of heroView.skillGroups)
        skillGroup.skills = skillGroup.skills.map(skill => this.generateSkillTalentView(skill));

      heroView.hotsVersion = hotsVersion;
      heroView.appVersion = chrome.runtime.getManifest().version;

      return Mustache.render(this.templates['insert-hero'], heroView, {
        skill: this.templates['insert-hero-skill'],
        stats: this.templates['insert-skill-stats']
      });
    },

    /**
     * Generates a table of skill information to be injected into a page.
     * @param {Skill} skill Skill data
     * @param {string=} hotsVersion (optional) HotS version string to display
     * @return {string} HTML source
     */
    generateSkillInfoTable(skill, hotsVersion) {
      return Mustache.render(
        this.templates['insert-skill'],
        this.generateSkillTalentView(skill, hotsVersion),
        { stats: this.templates['insert-skill-stats'] }
      );
    },

    /**
     * Generates a table of talent information to be injected into a page.
     * @param {Talent} talent Talent data
     * @param {string=} hotsVersion (optional) HotS version string to display
     * @return {string} HTML source
     */
    generateTalentInfoTable(talent, hotsVersion) {
      return Mustache.render(
        this.templates['insert-talent'],
        this.generateSkillTalentView(talent, hotsVersion),
        { stats: this.templates['insert-skill-stats'] }
      );
    },

    /**
     * Generates a row of talent tables from a talent group.
     * @param {Talent[]} talentGroup Talent group
     * @param {string=} hotsVersion (optional) HotS version string to display
     * @return {string} HTML source
     */
    generateTalentGroupInfoTable(talentGroup, hotsVersion) {
      return talentGroup.map(talent => this.generateTalentInfoTable(talent, hotsVersion)).join('&nbsp;');
    },

    /**
     * Generates a Mustache-compatible view from a Skill or Talent.
     * This is an internal method called by other generator methods.
     * @package
     * @param {Skill | Talent} skill Skill or Talent object
     * @param {string=} hotsVersion (optional) HotS version string
     */
    generateSkillTalentView(skill, hotsVersion) {
      const view = Object.create(skill);
      view.hotsVersion = hotsVersion;
      view.hasStats = !!(skill.cooldown || skill.rechargeCooldown || skill.manaCost);
      view.appVersion = chrome.runtime.getManifest().version;

      //Parse skill description
      view.description = skill.description
        .replace(/^[^\S\r\n]*(퀘스트|보상|반복\s*퀘스트)\s*(?=:)/gm,
          '<img style="HEIGHT: 1.3em; vertical-align: -20%" src="http://i1.ruliweb.com/img/18/07/08/164761a813c19dc2c.png" alt="$1" title="$1"> <b style="color: #fb0">$1</b>')
        .replace(/^[^\S\r\n]*(지속\s*효과)\s*(?=:)/gm, '<b style="color: #0e8">$1</b>')
        .replace(/\r?\n/g, '<br>');

      //Parse extra properties
      view.extras = [];

      for (const name in skill.extras) {
        if (name.includes('생명력'))
          view.lifeCost = skill.extras[name];
        else if (/기력|에너지|취기|분노/.test(name)) {
          view.energyCost = skill.extras[name];
          view.energyCostName = name;
        }
        else
          view.extras.push({ name, value: skill.extras[name] });

        view.hasStats = true;
      }

      return view;
    }
  },

  /** Collection of utility functions */
  util: {

    /**
     * Captures the currently selected position in a child frame of the current
     * window, and returns a callback that can inject HTML to it
     * @return {HtmlStringInjector} A callback that injects a valid HTML string
     * into the currently selected frame.
     */
    getHtmlInjectorAtSelectedPosition() {
      const selectedWindow = Array.from(window)
        .find(childWindow => childWindow.getSelection().rangeCount);

      if (!selectedWindow)
        throw new Error('선택된 프레임을 찾을 수 없습니다.');

      return html => {
        const range = getSelectedRange(selectedWindow);
        if (!range.collapsed)
          range.deleteContents();
        // splitAncestorElements(range);

        //Add padding to help editing
        html += '&nbsp;';

        const docFragment = this.createDocumentFragmentFromHtml(selectedWindow.document, html);
        range.insertNode(docFragment);

        //Deselect inserted HTML
        selectedWindow.getSelection().collapse(range.endContainer, range.endOffset);
      };

      /**
       * Helper function that retrieves the currently selected range
       * @param {Window} selectedWindow
       * @return {Range}
       */
      function getSelectedRange(selectedWindow) {
        const selection = selectedWindow.getSelection();
        let range = null;

        if (selection.rangeCount) {
          range = selection.getRangeAt(0);
          if ('HTML' !== range.startContainer.nodeName) //Weird edge case
            return range;
        }

        const document = selectedWindow.document;

        if (!range) {
          range = document.createRange();
          selection.addRange(range);
        }

        range.setStart(document.body, document.body.childNodes.length);
        range.setEnd(document.body, document.body.childNodes.length);
        return range;
      }
    },

    /**
     * Creates a DocumentFragment filled with the given HTML.
     * @param {Document} document Base document
     * @param {string} html HTML source
     * @return {DocumentFragment} DocumentFragment object
     */
    createDocumentFragmentFromHtml(document, html) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;

      const docFragment = document.createDocumentFragment();
      while (tempDiv.firstChild)
        docFragment.appendChild(tempDiv.firstChild);

      return docFragment;
    }
  }
};


/**
 * Load HotS data on first run and launch the Hots dialog.
 * This function is called when the right-click menu is selected.
 */
function openHotsDialog() {
  if (!HotsDialog.data) {
    chrome.storage.local.get(['heroes', 'hotsVersion', 'ptrHeroes', 'hotsPtrVersion'], data => {
      if (chrome.runtime.lastError)
        throw chrome.runtime.lastError;

      HotsDialog.data = data;  //Cache the data for subsequent calls
      openHotsDialog();
    });
  }
  else
    HotsDialog.launchDialog(HotsDialog.util.getHtmlInjectorAtSelectedPosition());
}


//For testing in Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = exports = HotsDialog;
}