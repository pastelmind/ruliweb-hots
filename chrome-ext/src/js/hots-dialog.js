/**
 * Constructs the HotS hero/skill/talent selection dialog.
 * Can be run in Node.js or in the browser.
 */

'use strict';

/**
 * Collection of HotS data loaded from hots.json
 * @typedef {import("../../../api/src/hots-data")} HotsData
 */

/**
 * @typedef {import("../../../api/src/hero")} Hero
 */


const HotsDialog = {
  /**
   * Set by `openHotsDialog()`
   * @type {HotsData}
   */
  data: null,

  /** @type {(fragment: DocumentFragment) => void} */
  docFragmentInjectorCallback: null,

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
    },
    newRole: {
      name: '역할군 (신규)',
      filters: {
        tank: 'Tank',
        bruiser: 'Bruiser',
        healer: 'Healer',
        support: 'Support',
        melee_assassin: 'Melee Assassin',
        ranged_assassin: 'Ranged Assassin',
      },
    },
  },

  /**
   * Launch the hero/skill/talent selection dialog
   * @param {(node: DocumentFragment) => void} docFragmentInjectorCallback Callback that accepts a DocumentFragment containing the generated table
   */
  launchDialog(docFragmentInjectorCallback) {
    //Snapshot currently selected area
    this.docFragmentInjectorCallback = docFragmentInjectorCallback;

    if (!this.dialog) {
      this.dialog = new tingle.modal({
        cssClass: ['hots-dialog-container'],
        onOpen() {
          //Temporarily deactivate PToDivReplacer in editor-iframe.js
          const frameWindow = HotsDialog.util.getSelectedChildWindow();
          if (frameWindow && frameWindow.pToDivReplacer)
            frameWindow.pToDivReplacer.deactivate();
        },
        onClose() {
          //Reactivate PToDivReplacer in editor-iframe.js
          const frameWindow = HotsDialog.util.getSelectedChildWindow();
          if (frameWindow && frameWindow.pToDivReplacer)
            frameWindow.pToDivReplacer.activate();

          //Circumvent a bug in Firefox where closing and immediately re-opening
          //the dialog causes its contents to be selected.
          const selection = window.getSelection();
          if (selection)
            selection.collapseToEnd();
        },
      });

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
    /** @type {HTMLInputElement} */
    const addVersionCheckbox = optionsSection.querySelector('#hots-dialog-option-add-version');
    /** @type {HTMLInputElement} */
    const usePtrCheckbox = optionsSection.querySelector('#hots-dialog-option-use-ptr');
    /** @type {HTMLInputElement} */
    const useSimpleHeroTableCheckbox = optionsSection.querySelector('#hots-dialog-option-simple-hero-table');
    /** @type {HTMLInputElement} */
    const iconSizeRange = optionsSection.querySelector('#hots-dialog-option-icon-size');
    /** @type {HTMLOutputElement} */
    const iconSizeOutput = optionsSection.querySelector(`output[for=${iconSizeRange.id}]`);

    const heroIconElems = heroIconsSection.querySelectorAll('.hots-hero-icon');
    /** @type {NodeListOf<HTMLInputElement>} */
    const heroFilterCheckboxes = heroFilterSection.querySelectorAll('.hero-filter input[type=checkbox]');

    //Add click handler for hero filters
    for (const checkbox of heroFilterCheckboxes) {
      checkbox.addEventListener('change', () =>
        this.updateHeroIcons(
          heroIconElems,
          heroFilterCheckboxes,
          hotsData.heroes,
          hotsData.ptrHeroes,
          usePtrCheckbox.checked
        ));
    }

    //Add change handler for icon size input
    iconSizeRange.addEventListener('input', event => {
      const iconSize = event.target.value;
      iconSizeOutput.textContent = `${iconSize}\xD7${iconSize}px`;
    });
    iconSizeRange.dispatchEvent(new Event('input'));

    //Add click handler for hero icons
    heroIconsSection.addEventListener('click', event => {
      if (!(event.target && event.target.classList.contains('hots-hero-icon'))) return;
      const heroId = event.target.dataset.heroId;   //data-hero-id

      const hero = this.selectedHero = this.getHeroDataById(heroId, usePtrCheckbox.checked);
      console.assert(hero, `Cannot find hero with ID: ${heroId}`);

      skillsetSection.innerHTML = this.htmlGenerators.generateSkillIcons(hero);
      talentsetSection.innerHTML = this.htmlGenerators.generateTalentList(hero);
    });

    //Check if PTR data is available
    if (hotsData.ptrHeroes && Object.keys(hotsData.ptrHeroes).length) {
      //Add click handler for "Use PTR" checkbox
      usePtrCheckbox.addEventListener('change', event => {
        this.updateHeroIcons(
          heroIconElems,
          heroFilterCheckboxes,
          hotsData.heroes,
          hotsData.ptrHeroes,
          usePtrCheckbox.checked
        );

        if (!this.selectedHero) return;

        const heroId = this.selectedHero.id;
        const hero = this.selectedHero = this.getHeroDataById(heroId, usePtrCheckbox.checked);
        console.assert(hero, `Cannot find hero with ID: ${heroId}`);

        skillsetSection.innerHTML = this.htmlGenerators.generateSkillIcons(hero);
        talentsetSection.innerHTML = this.htmlGenerators.generateTalentList(hero);
      });
    }
    else {
      //Disable "Use PTR" checkbox
      usePtrCheckbox.checked = false;
      usePtrCheckbox.disabled = true;
      usePtrCheckbox.closest('.hots-dialog-option').setAttribute('aria-label', 'PTR 서버 패치 정보가 없습니다');
    }

    //Add event handlers for selected hero icon and skill icons
    skillsetSection.addEventListener('click', event => {
      if (!(event.target)) return;

      const isHeroIcon = event.target.classList.contains('hots-current-hero-icon');
      const isSkillIcon = event.target.classList.contains('hots-skill-icon');

      if (isHeroIcon || isSkillIcon) {
        //data-hero-id, data-is-ptr, data-skill-index
        const { heroId, isPtr, skillIndex } = event.target.dataset;
        const version = addVersionCheckbox.checked ? this.getHotsVersion(isPtr) : '';

        const hero = this.getHeroDataById(heroId, isPtr);
        const iconSize = iconSizeRange.value;

        let html;
        if (isHeroIcon)
          html = this.htmlGenerators.generateHeroInfoTable(hero, iconSize, iconSize, version, useSimpleHeroTableCheckbox.checked);
        else    //isSkillIcon
          html = this.htmlGenerators.generateSkillInfoTable(hero.skills[skillIndex], iconSize, version);

        this.injectHtmlInEditor(html, event.target);
      }
    });

    //Add event handlers for talent icons
    talentsetSection.addEventListener('click', event => {
      if (!(event.target)) return;

      const isTalentIcon = event.target.classList.contains('hots-talent-icon');
      const isTalentGroupButton = event.target.classList.contains('hots-talentset__group-add-all');

      if (isTalentIcon || isTalentGroupButton) {
        //data-hero-id, data-is-ptr, data-talent-level, data-talent-index
        const { heroId, isPtr, talentLevel, talentIndex } = event.target.dataset;
        const version = addVersionCheckbox.checked ? this.getHotsVersion(isPtr) : '';

        const hero = this.getHeroDataById(heroId, isPtr);
        const iconSize = iconSizeRange.value;

        const talentGroup = hero.talents[talentLevel];

        //TODO De-duplicate code
        let html;
        if (isTalentIcon)
          html = this.htmlGenerators.generateTalentInfoTable(talentGroup[talentIndex], iconSize, version);
        else    //isTalentGroupButton
          html = this.htmlGenerators.generateTalentGroupInfoTable(talentGroup, iconSize, version);

        this.injectHtmlInEditor(html, event.target);
      }
    });

    return dialogFragment;
  },

  /**
   * Updates the hero icons, filtered by `heroFilterCheckboxes`.
   * @param {Iterable<Element>} heroIconElems Array of hero icon elements
   * @param {Iterable<HTMLInputElement>} heroFilterCheckboxes Array of checkbox <input> elements
   * @param {{ [heroId: string]: Hero }} heroes All heroes in the live server
   * @param {{ [heroId: string]: Hero }} ptrHeroes New or changed heroes in the PTR
   * @param {boolean} selectPtrOnly If truthy, only highlight heroes that are new or changed in the PTR
   */
  updateHeroIcons(heroIconElems, heroFilterCheckboxes, heroes, ptrHeroes, selectPtrOnly) {
    //Generate a collection of active filters
    const activeFilters = {};

    for (const filterType in this.heroFilters)
      activeFilters[filterType] = new Set;

    for (const checkbox of heroFilterCheckboxes)
      if (checkbox.checked)
        activeFilters[checkbox.dataset.filterType].add(checkbox.value); //data-filter-type

    //Toggle CSS class of each hero icon
    for (const heroIconElem of heroIconElems) {
      const { heroId, isPtr } = heroIconElem.dataset; //data-hero-id, data-is-ptr
      const hero = (isPtr ? ptrHeroes : heroes)[heroId];
      heroIconElem.classList.toggle('hots-hero-icon--excluded', !testHero(hero, activeFilters, selectPtrOnly));
    }

    //Helper function
    function testHero(hero, activeFilters, selectPtrOnly) {
      if (selectPtrOnly && !(hero.hasPtrChanges || hero.isPtr))
        return false;

      for (const filterType in activeFilters) {
        const filterSet = activeFilters[filterType];
        const heroAttribute = hero[filterType];

        //Keep this hero if the filterSet is empty
        if (!filterSet.size) continue;

        let isMatched = false;

        //Keep this hero if there is a filter that matches him/her/it/them.
        for (const filter of activeFilters[filterType])
          //Hardcoded workaround for Orphea
          //TODO remove if Blizzard ever adds a stylized Nexus universe icon
          if (heroAttribute.includes(filter) || (heroAttribute === 'nexus' && filter === 'classic'))
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

  /**
   * Injects the given HTML string into the WYSIWYG editor, at the selection
   * which was saved when the dialog was launched.
   * @param {string} html HTML string
   * @param {Element} eventTarget Element that was triggered by the user
   */
  injectHtmlInEditor(html, eventTarget) {
    //Add padding to help editing
    html += '&nbsp;';

    const docFragment = this.util.createDocumentFragmentFromHtml(document, html);
    const firstInjectedElement = docFragment.children[0];

    this.docFragmentInjectorCallback(docFragment);

    const { left: endX, top: endY } = this.util.getOffsetToViewport(firstInjectedElement);

    this.util.animateFlyingBox(eventTarget, endX, endY);
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
     * @param {number=} iconSize Hero icon size in pixels (default: 64)
     * @param {number=} skillIconSize Skill i size in pixels (default: 48)
     * @param {string=} hotsVersion (optional) HotS version string to display
     * @param {boolean} isSimpleTable If truthy, generate a simplified table
     * @return {string} HTML source
     */
    generateHeroInfoTable(hero, iconSize = 64, skillIconSize = 48, hotsVersion, isSimpleTable) {
      const heroView = Object.create(hero);

      //Set universe icon offset
      heroView.universeIconOffset = {
        classic: '0%',
        starcraft: '20%',
        diablo: '40%',
        warcraft: '60%',
        overwatch: '80%',
        nexus: '100%',
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
        skillGroup.skills = skillGroup.skills.map(skill => this.generateSkillTalentView(skill, skillIconSize));

      heroView.hotsVersion = hotsVersion;
      heroView.iconSize = iconSize;
      heroView.appVersion = chrome.runtime.getManifest().version;
      heroView.isForHeroTable = true;
      heroView.isSimpleHeroTable = heroView.isSimpleSkillTable = !!isSimpleTable;

      return Mustache.render(this.templates['insert-hero'], heroView, {
        skill: this.templates['insert-skill'],
        stats: this.templates['insert-skill-stats']
      });
    },

    /**
     * Generates a table of skill information to be injected into a page.
     * @param {Skill} skill Skill data
     * @param {number=} iconSize Icon size in pixels (default: 64)
     * @param {string=} hotsVersion (optional) HotS version string to display
     * @return {string} HTML source
     */
    generateSkillInfoTable(skill, iconSize = 64, hotsVersion) {
      return Mustache.render(
        this.templates['insert-skill'],
        this.generateSkillTalentView(skill, iconSize, hotsVersion),
        { stats: this.templates['insert-skill-stats'] }
      );
    },

    /**
     * Generates a table of talent information to be injected into a page.
     * @param {Talent} talent Talent data
     * @param {number=} iconSize Icon size in pixels (default: 48)
     * @param {string=} hotsVersion (optional) HotS version string to display
     * @return {string} HTML source
     */
    generateTalentInfoTable(talent, iconSize = 48, hotsVersion) {
      const talentView = this.generateSkillTalentView(talent, iconSize, hotsVersion);
      talentView.isTalent = true;

      return Mustache.render(
        this.templates['insert-skill'],
        talentView,
        { stats: this.templates['insert-skill-stats'] }
      );
    },

    /**
     * Generates a row of talent tables from a talent group.
     * @param {Talent[]} talentGroup Talent group
     * @param {number=} iconSize Icon size in pixels (default: 48)
     * @param {string=} hotsVersion (optional) HotS version string to display
     * @return {string} HTML source
     */
    generateTalentGroupInfoTable(talentGroup, iconSize = 48, hotsVersion) {
      return talentGroup.map(talent => this.generateTalentInfoTable(talent, iconSize, hotsVersion)).join('&nbsp;');
    },

    /**
     * Generates a Mustache-compatible view from a Skill or Talent.
     * This is an internal method called by other generator methods.
     * @package
     * @param {Skill | Talent} skill Skill or Talent object
     * @param {number=} iconSize Icon size in pixels (default: 48)
     * @param {string=} hotsVersion (optional) HotS version string
     */
    generateSkillTalentView(skill, iconSize = 48, hotsVersion) {
      const view = Object.create(skill);
      view.hotsVersion = hotsVersion;
      view.iconSize = iconSize;
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
     * Returns the window object of the currently selected child frame. If none
     * can be found, returns `undefined`.
     * @return {Window} Window object of the currently selected child frame.
     */
    getSelectedChildWindow() {
      return Array.from(window).find(childWindow => childWindow.getSelection().rangeCount);
    },

    /**
     * Captures WYSIWYG editor's <iframe> and returns a callback that can inject
     * a DOM Node in it.
     * @return {(fragment: DocumentFragment) => void} A callback that injects the given DocumentFragment into the
     * WYSIWYG editor.
     */
    getHtmlInjectorAtSelectedPosition() {
      const selectedWindow = HotsDialog.util.getSelectedChildWindow();

      if (!selectedWindow)
        throw new Error('선택된 프레임을 찾을 수 없습니다.');

      return fragment => {
        const range = getSelectedRange(selectedWindow);
        if (!range.collapsed)
          range.deleteContents();

        //Inject HTML into page
        range.insertNode(fragment);

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
      const templateElement = document.createElement('template');
      templateElement.innerHTML = html;
      return templateElement.content;
    },


    /**
     * Creates an animated flying box that initially covers an element, and
     * flies to the target coordinates while minimizing to a single point.
     * @param {Element} startElem Element that the flying box starts at
     * @param {number} endX Final X position of the flying box, relative to the viewport
     * @param {number} endY Final Y position of the flying box, relative to the viewport
     */
    animateFlyingBox(startElem, endX, endY) {
      const startRect = startElem.getBoundingClientRect();
      const flyingBox = document.createElement('div');
      flyingBox.appendChild(startElem.cloneNode());

      Object.assign(flyingBox.style, {
        position: 'fixed',
        width: startRect.width + 'px',
        height: startRect.height + 'px',
        left: startRect.left + 'px',
        top: startRect.top + 'px',
        zIndex: 9999,           //Appear over all elements (tingle.js uses z-index === 1000)
        pointerEvents: 'none'   //Prevent accidental clicks on flying box from triggering event listeners
      });

      document.body.appendChild(flyingBox);

      const computedStyle = window.getComputedStyle(flyingBox);
      (function startFlyingAnimation() {
        //Wait until the browser has computed the initial styles (required for Firefox)
        //See https://stackoverflow.com/q/20747591 for more info
        if (computedStyle.position !== flyingBox.style.position)
          setTimeout(startFlyingAnimation, 5);
        else {
          Object.assign(flyingBox.style, {
            transition: '1s',
            transform: 'scale(0)',
            left: endX + 'px',
            top: endY + 'px'
          });

          setTimeout(() => flyingBox.remove(), 1000);
        }
      })();
    },


    /**
     * Computes the given element's offset relative to the viewport, taking into
     * account offsets of containing <iframe> elements.
     * @param {Element} element DOM element
     * @return {{ left: number, top: number }} Offset of `element` relative to the viewport, measured in pixels
     */
    getOffsetToViewport(element) {
      let { left, top } = element.getBoundingClientRect();

      //Add offset of containing <iframe>s
      let { frameElement } = element.ownerDocument.defaultView;
      while (frameElement) {
        const { left: frameLeft, top: frameTop } = frameElement.getBoundingClientRect();
        left += frameLeft;
        top += frameTop;
        ({ frameElement } = frameElement.ownerDocument.defaultView);
      }

      return { left, top };
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
    HotsDialog.launchDialog(HotsDialog.util.getEditorDocumentFragmentInjector());
}


//For testing in Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = exports = HotsDialog;
}