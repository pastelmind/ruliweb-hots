HotsDialog.htmlGenerators.templates = {"dialog-skills":"{{#skills}}\r\n<img class=\"hots-skill-icon\" src=\"{{{iconUrl}}}\" alt=\"{{type}} - {{name}}\" title=\"{{type}} - {{name}}\" data-hero-id=\"{{id}}\" data-skill-index=\"{{index}}\">\r\n{{/skills}}","dialog-talents":"{{#talents}}\r\n<li class=\"hots-talentset__group\"><span class=\"hots-talentset__group-title\">{{talentLevel}}레벨</span>\r\n  {{#talentGroup}}\r\n  <img class=\"hots-talent-icon\" src=\"{{{iconUrl}}}\" alt=\"{{name}} ({{type}} - 레벨 {{talentLevel}})\" title=\"{{name}} ({{type}} - 레벨 {{talentLevel}})\" data-hero-id=\"{{id}}\" data-talent-level=\"{{talentLevel}}\" data-talent-index=\"{{index}}\">\r\n  {{/talentGroup}}\r\n</li>\r\n{{/talents}}","dialog":"<div class=\"hots-dialog\">\r\n  <section class=\"hots-dialog__section hots-dialog-options\">\r\n    <label class=\"hots-dialog-option\">\r\n      <input type=\"checkbox\" id=\"hots-dialog-option-add-version\" checked>\r\n      <span class=\"hots-dialog-option__description\">히오스 패치 버전 포함</span>\r\n    </label>\r\n  </section>\r\n  <section class=\"hots-dialog__section hots-hero-filters\">\r\n    {{#filterGroups}}\r\n    <fieldset class=\"hots-hero-filter-group\">\r\n      <legend class=\"hots-hero-filter-group__description\">{{name}}: </legend>\r\n      {{#filters}}\r\n      <label class=\"hero-filter\">\r\n        <input type=\"checkbox\" data-filter-type=\"{{type}}\" value=\"{{value}}\">\r\n        <img class=\"hero-filter__content\" src=\"{{{iconUrl}}}\" alt=\"{{name}}\" title=\"{{name}}\">\r\n      </label>\r\n      {{/filters}}\r\n    </fieldset>\r\n    {{/filterGroups}}\r\n  </section>\r\n\r\n  <section class=\"hots-dialog__section hots-hero-icons\">\r\n    {{#heroes}}\r\n    <img class=\"hots-hero-icon\" src=\"{{{iconUrl}}}\" data-hero-id=\"{{id}}\" alt=\"{{name}} ({{type}} {{roleName}})\" title=\"{{name}} ({{type}} {{roleName}})\">\r\n    {{/heroes}}\r\n  </section>\r\n  <section class=\"hots-dialog__section hots-skillset\"></section>\r\n  <ul class=\"hots-dialog__section hots-talentset\"></ul>\r\n  <section class=\"hots-dialog__section hots-dialog-version\">\r\n    루리웹 히어로즈 오브 더 스톰 공략툴 v{{appVersion}}\r\n  </section>\r\n</div>","insert-hero":"<table style=\"border: 2px solid #76d; background-color: #112; color: #efe; font-family: sans-serif\">\r\n  <tr style=\"background-color: #224\">\r\n    <td rowspan=\"2\" style=\"padding: .5em; border: 1px solid #76d; WIDTH: 64px; vertical-align: top; background-color: #118\">\r\n      <img style=\"WIDTH: 100%\" src=\"{{{hero.iconUrl}}}\" alt=\"{{hero.name}} ({{hero.type}})\" title=\"{{hero.name}} ({{hero.type}})\">\r\n    </td>\r\n    <td style=\"padding: .5em; border: 1px solid #76d; text-align: center\">\r\n      <b style=\"color: #6ce\">{{hero.name}}</b>\r\n    </td>\r\n    <td style=\"padding: .5em; border: 1px solid #76d; text-align: center; WIDTH: 10em\">\r\n      <b style=\"color: #6ce\">{{hero.type}}</b>\r\n    </td>\r\n  </tr>\r\n  <tr>\r\n    <td colspan=\"2\" style=\"padding: .5em; border: 1px solid #76d\">\r\n      {{#hero.skills}}\r\n      <img style=\"WIDTH: 48px; margin: 0 .25em\" src=\"{{{iconUrl}}}\" alt=\"{{type}} - {{name}}\" title=\"{{type}} - {{name}}\">\r\n      {{/hero.skills}}\r\n      {{#hotsVersion}}<div style=\"text-align: right; font-size: .8em; font-style: italic; color: #cca\">패치 {{hotsVersion}}</div>{{/hotsVersion}}\r\n    </td>\r\n  </tr>\r\n</table>","insert-skill-stats":"{{#hasStats}}<br>\r\n{{#manaCost}}\r\n<br><img style=\"WIDTH: 1.1em; HEIGHT: 1.1em; vertical-align: sub\" src=\"http://i1.ruliweb.com/img/18/07/07/164741ab46719dc2c.png\" alt=\"마나\" title=\"마나\">&nbsp;<span style=\"color: #4be\"><b>마나</b> {{manaCost}}</span>\r\n{{/manaCost}}\r\n{{#lifeCost}}\r\n<br><img style=\"WIDTH: 1.1em; HEIGHT: 1.1em; vertical-align: sub\" src=\"http://i1.ruliweb.com/img/18/07/07/164741ab38d19dc2c.png\" alt=\"생명력\" title=\"생명력\">&nbsp;<span style=\"color: #5d2\"><b>생명력</b> {{lifeCost}}</span>\r\n{{/lifeCost}}\r\n{{#energyCost}}\r\n<br><img style=\"WIDTH: 1.1em; HEIGHT: 1.1em; vertical-align: sub\" src=\"http://i1.ruliweb.com/img/18/07/07/164741ab5f219dc2c.png\" alt=\"{{energyCostName}}\" title=\"{{energyCostName}}\">&nbsp;<span style=\"color: #ee3\"><b>{{energyCostName}}</b> {{energyCost}}</span>\r\n{{/energyCost}}\r\n{{#cooldown}}\r\n<br><img style=\"WIDTH: 1.1em; HEIGHT: 1.1em; vertical-align: sub\" src=\"http://i3.ruliweb.com/img/18/07/07/164741ab52c19dc2c.png\" alt=\"재사용 대기시간\" title=\"재사용 대기시간\">&nbsp;<span style=\"color: #ddd\"><b>재사용 대기시간</b> {{cooldown}}초</span>\r\n{{/cooldown}}\r\n{{#rechargeCooldown}}\r\n<br><img style=\"WIDTH: 1.1em; HEIGHT: 1.1em; vertical-align: sub\" src=\"http://i3.ruliweb.com/img/18/07/07/164741ab52c19dc2c.png\" alt=\"충전 대기시간\" title=\"충전 대기시간\">&nbsp;<span style=\"color: #ddd\"><b>충전 대기시간</b> {{rechargeCooldown}}초</span>\r\n{{/rechargeCooldown}}\r\n{{#extras.length}}\r\n<br><img style=\"WIDTH: 1.1em; HEIGHT: 1.1em; vertical-align: sub\" src=\"http://i3.ruliweb.com/img/18/07/07/164748d2b0519dc2c.png\" alt=\"기타 수치\" title=\"기타 수치\">&nbsp;<span style=\"color: #d90\">{{#extras}}<b>{{name}}</b> {{value}} {{/extras}}</span>\r\n{{/extras.length}}\r\n{{/hasStats}}","insert-skill":"<div class=\"ruliweb-hots-skill-table\" style=\"display: flex; flex-wrap: wrap; border: solid #85d; border-WIDTH: 2px 1px 1px 2px; max-WIDTH: 60em; background: #85d; font-family: sans-serif; text-align: center\">\r\n  <div style=\"flex: 1; border: inherit; border-WIDTH: 0 1px 1px 0; padding: .5em; background: #418\">\r\n    <img style=\"WIDTH: 64px\" src=\"{{{iconUrl}}}\" alt=\"{{type}} - {{name}}\" title=\"{{type}} - {{name}}\"> </div>\r\n  <div style=\"flex: 999 21em; display: flex; flex-flow: column\">\r\n    <div style=\"display: flex; flex-wrap: wrap; background: #103; color: #fbf; font-weight: bold\">\r\n      <div style=\"flex: 3 15em; display: flex; align-items: center; justify-content: center; border: solid #85d; border-WIDTH: 0 1px 1px 0; padding: .5em\">{{name}}</div>\r\n      <div style=\"flex: 1 6em; display: flex; align-items: center; justify-content: center; border: solid #85d; border-WIDTH: 0 1px 1px 0; padding: .5em\">{{type}}</div>\r\n    </div>\r\n    <div style=\"flex: 1; border: solid #85d; border-WIDTH: 0 1px 1px 0; padding: .5em; background: #214; color: #efe; text-align: left\">\r\n      {{{description}}}{{> stats}}{{#hotsVersion}}\r\n      <div style=\"text-align: right; font-size: .8em; color: #cca; font-style: italic\">패치 {{hotsVersion}}</div>{{/hotsVersion}}\r\n    </div>\r\n  </div>\r\n</div>","insert-talent":"<div class=\"ruliweb-hots-talent-table\" style=\"display: flex; flex-wrap: wrap; border: solid #55d; border-WIDTH: 2px 1px 1px 2px; max-WIDTH: 60em; background: #55d; font-family: sans-serif; text-align: center\">\r\n  <div style=\"flex: 1; border: inherit; border-WIDTH: 0 1px 1px 0; padding: .5em; background: #118\">\r\n    <img style=\"WIDTH: 48px\" src=\"{{{iconUrl}}}\" alt=\"{{name}} ({{type}} - 레벨 {{level}})\" title=\"{{name}} ({{type}} - 레벨 {{level}})\"> </div>\r\n  <div style=\"flex: 999 22em; display: flex; flex-flow: column\">\r\n    <div style=\"display: flex; flex-wrap: wrap; background: #003; color: #6ce; font-weight: bold\">\r\n      <div style=\"flex: 2 14em; display: flex; align-items: center; justify-content: center; border: solid #55d; border-WIDTH: 0 1px 1px 0; padding: .5em\">{{name}}</div>\r\n      <div style=\"flex: 1 7em; display: flex; align-items: center; justify-content: center; border: solid #55d; border-WIDTH: 0 1px 1px 0; padding: .5em\">{{type}}</div>\r\n    </div>\r\n    <div style=\"flex: 1; border: solid #55d; border-WIDTH: 0 1px 1px 0; padding: .5em; background: #114; color: #efe; text-align: left\">\r\n      {{{description}}}{{> stats}}{{#hotsVersion}}\r\n      <div style=\"text-align: right; font-size: .8em; color: #cca; font-style: italic\">패치 {{hotsVersion}}</div>{{/hotsVersion}}\r\n    </div>\r\n  </div>\r\n</div>"}