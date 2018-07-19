HotsDialog.htmlGenerators.templates = {
  "dialog-skills": "<img class=\"hots-current-hero-icon\" src=\"{{{iconUrl}}}\" data-hero-id=\"{{id}}\" alt=\"{{name}} ({{type}} {{roleName}})\" title=\"{{name}} ({{type}} {{roleName}})\">\n{{#skills}}\n<img class=\"hots-skill-icon\" src=\"{{{iconUrl}}}\" alt=\"{{type}} - {{name}}\" title=\"{{type}} - {{name}}\" data-hero-id=\"{{id}}\" data-skill-index=\"{{index}}\">\n{{/skills}}",
  "dialog-talents": "{{#talents}}\n<li class=\"hots-talentset__group\"><span class=\"hots-talentset__group-title\">{{talentLevel}}레벨</span>\n  {{#talentGroup}}\n  <img class=\"hots-talent-icon\" src=\"{{{iconUrl}}}\" alt=\"{{name}} ({{type}} - 레벨 {{talentLevel}})\" title=\"{{name}} ({{type}} - 레벨 {{talentLevel}})\" data-hero-id=\"{{id}}\" data-talent-level=\"{{talentLevel}}\" data-talent-index=\"{{index}}\">\n  {{/talentGroup}}\n  <input type=\"button\" class=\"hots-talentset__group-add-all\" data-hero-id=\"{{id}}\" data-talent-level=\"{{talentLevel}}\" value=\"모두 넣기\">\n</li>\n{{/talents}}",
  "dialog": "<div class=\"hots-dialog\">\n  <section class=\"hots-dialog__section hots-dialog-options\">\n    <label class=\"hots-dialog-option\">\n      <input type=\"checkbox\" id=\"hots-dialog-option-add-version\" checked>\n      <span class=\"hots-dialog-option__description\">히오스 패치 버전 포함</span>\n    </label>\n  </section>\n  <section class=\"hots-dialog__section hots-hero-filters\">\n    {{#filterGroups}}\n    <fieldset class=\"hots-hero-filter-group\">\n      <legend class=\"hots-hero-filter-group__description\">{{name}}: </legend>\n      {{#filters}}\n      <label class=\"hero-filter\">\n        <input type=\"checkbox\" data-filter-type=\"{{type}}\" value=\"{{value}}\">\n        <img class=\"hero-filter__content\" src=\"{{{iconUrl}}}\" alt=\"{{name}}\" title=\"{{name}}\">\n      </label>\n      {{/filters}}\n    </fieldset>\n    {{/filterGroups}}\n  </section>\n\n  <section class=\"hots-dialog__section hots-hero-icons\">\n    {{#heroes}}\n    <img class=\"hots-hero-icon\" src=\"{{{iconUrl}}}\" data-hero-id=\"{{id}}\" alt=\"{{name}} ({{type}} {{roleName}})\" title=\"{{name}} ({{type}} {{roleName}})\">\n    {{/heroes}}\n  </section>\n  <section class=\"hots-dialog__section hots-skillset\"></section>\n  <ul class=\"hots-dialog__section hots-talentset\"></ul>\n  <section class=\"hots-dialog__section hots-dialog-version\">\n    루리웹 히어로즈 오브 더 스톰 공략툴 v{{appVersion}}\n  </section>\n</div>",
  "insert-hero": "<details data-ruliweb-hots-version=\"{{appVersion}}\" class=\"ruliweb-hots-hero-table\" style=\"display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;border:2px solid #47a;background:#135;color:#ffd\">\n  <summary style=\"float:left;padding:.5em;WIDTH:64px;HEIGHT:64px;background:url({{iconUrl}}) center/64px no-repeat\" title=\"[클릭하여 접기/펼치기] {{name}} - {{type}} {{roleName}}\"></summary>\n  <div style=\"float:left;display:flex;flex-flow:column;WIDTH:50em;max-WIDTH:calc(100% - 64px - 1em);min-HEIGHT:calc(64px + 1em)\">\n    <div style=\"display:flex;flex-wrap:wrap;font-weight:700;text-align:center;background:#011;color:#add\">\n      <div style=\"padding:.5em;flex:2 14em;border:solid #47a;border-WIDTH:0 0 1px 1px\">{{name}}</div>\n      <div style=\"padding:.5em;flex:1 7em;border:solid #47a;border-WIDTH:0 0 1px 1px\">{{type}} {{roleName}}</div>\n    </div>\n    <div style=\"flex:1;padding:.5em;text-align:left;color:#efe;border-left:1px solid #47a;background:#134\">\n      {{#skills}}\n      <img style=\"WIDTH:48px;margin:0 .25em\" src=\"{{{iconUrl}}}\" alt=\"{{type}} - {{name}}\" title=\"{{type}} - {{name}}\">\n      {{/skills}}{{#hotsVersion}}\n      <div style=\"text-align:right;font-size:.8em;color:#cca;font-style:italic\">패치 {{hotsVersion}}</div>{{/hotsVersion}}\n    </div>\n  </div>\n</details>",
  "insert-skill-stats": "{{#hasStats}}<br>\n{{#manaCost}}\n<br><img src=\"http://i1.ruliweb.com/img/18/07/07/164741ab46719dc2c.png\" alt=\"마나\" title=\"마나\" style=\"WIDTH:1.1em;HEIGHT:1.1em;vertical-align:sub\">&nbsp;<span style=\"color:#4be\"><b>마나</b> {{manaCost}}</span>\n{{/manaCost}}\n{{#lifeCost}}\n<br><img src=\"http://i1.ruliweb.com/img/18/07/07/164741ab38d19dc2c.png\" alt=\"생명력\" title=\"생명력\" style=\"WIDTH:1.1em;HEIGHT:1.1em;vertical-align:sub\">&nbsp;<span style=\"color:#5d2\"><b>생명력</b> {{lifeCost}}</span>\n{{/lifeCost}}\n{{#energyCost}}\n<br><img src=\"http://i1.ruliweb.com/img/18/07/07/164741ab5f219dc2c.png\" alt=\"{{energyCostName}}\" title=\"{{energyCostName}}\" style=\"WIDTH:1.1em;HEIGHT:1.1em;vertical-align:sub\">&nbsp;<span style=\"color:#ee3\"><b>{{energyCostName}}</b> {{energyCost}}</span>\n{{/energyCost}}\n{{#cooldown}}\n<br><img src=\"http://i3.ruliweb.com/img/18/07/07/164741ab52c19dc2c.png\" alt=\"재사용 대기시간\" title=\"재사용 대기시간\" style=\"WIDTH:1.1em;HEIGHT:1.1em;vertical-align:sub\">&nbsp;<span style=\"color:#ddd\"><b>재사용 대기시간</b> {{cooldown}}초</span>\n{{/cooldown}}\n{{#rechargeCooldown}}\n<br><img src=\"http://i3.ruliweb.com/img/18/07/07/164741ab52c19dc2c.png\" alt=\"충전 대기시간\" title=\"충전 대기시간\" style=\"WIDTH:1.1em;HEIGHT:1.1em;vertical-align:sub\">&nbsp;<span style=\"color:#ddd\"><b>충전 대기시간</b> {{rechargeCooldown}}초</span>\n{{/rechargeCooldown}}\n{{#extras.length}}\n<br><img src=\"http://i3.ruliweb.com/img/18/07/07/164748d2b0519dc2c.png\" alt=\"기타 수치\" title=\"기타 수치\" style=\"WIDTH:1.1em;HEIGHT:1.1em;vertical-align:sub\">&nbsp;<span style=\"color:#d90\">{{#extras}}<b>{{name}}</b> {{value}} {{/extras}}</span>\n{{/extras.length}}\n{{/hasStats}}",
  "insert-skill": "<details data-ruliweb-hots-version=\"{{appVersion}}\" class=\"ruliweb-hots-skill-table\" style=\"display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;border:2px solid #85d;background:#418;color:#fdf\">\n  <summary style=\"float:left;padding:.5em;WIDTH:64px;HEIGHT:64px;background:url({{iconUrl}}) center/64px no-repeat\" title=\"[클릭하여 접기/펼치기] {{type}} - {{name}}\"></summary>\n  <div style=\"float:left;display:flex;flex-flow:column;WIDTH:50em;max-WIDTH:calc(100% - 64px - 1em);min-HEIGHT:calc(64px + 1em)\">\n    <div style=\"display:flex;flex-wrap:wrap;font-weight:700;text-align:center;background:#103;color:#fbf\">\n      <div style=\"padding:.5em;flex:3 15em;border:solid #85d;border-WIDTH:0 0 1px 1px\">{{name}}</div>\n      <div style=\"padding:.5em;flex:1 6em;border:solid #85d;border-WIDTH:0 0 1px 1px\">{{type}}</div>\n    </div>\n    <div style=\"flex:1;padding:.5em;text-align:left;color:#efe;border-left:1px solid #85d;background:#214\">\n      {{{description}}}{{> stats}}{{#hotsVersion}}\n      <div style=\"text-align:right;font-size:.8em;color:#cca;font-style:italic\">패치 {{hotsVersion}}</div>{{/hotsVersion}}\n    </div>\n  </div>\n</details>",
  "insert-talent": "<details data-ruliweb-hots-version=\"{{appVersion}}\" class=\"ruliweb-hots-talent-table\" style=\"display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;border:2px solid #55d;background:#118;color:#bef\">\n  <summary style=\"float:left;padding:.5em;WIDTH:48px;HEIGHT:48px;background:url({{iconUrl}}) center/48px no-repeat\" title=\"[클릭하여 접기/펼치기] {{name}} ({{type}} - 레벨 {{level}})\"></summary>\n  <div style=\"float:left;display:flex;flex-flow:column;WIDTH:50em;min-HEIGHT:calc(64px + 1em);max-WIDTH:calc(100% - 48px - 1em)\">\n    <div style=\"display:flex;flex-wrap:wrap;font-weight:700;text-align:center;background:#003;color:#6ce\">\n      <div style=\"padding:.5em;flex:2 14em;border:solid #55d;border-WIDTH:0 0 1px 1px\">{{name}}</div>\n      <div style=\"padding:.5em;flex:1 7em;border:solid #55d;border-WIDTH:0 0 1px 1px\">{{type}}</div>\n    </div>\n    <div style=\"flex:1;padding:.5em;text-align:left;color:#efe;border-left:1px solid #55d;background:#114\">\n      {{{description}}}{{> stats}}{{#hotsVersion}}\n      <div style=\"text-align:right;font-size:.8em;color:#cca;font-style:italic\">패치 {{hotsVersion}}</div>{{/hotsVersion}}\n    </div>\n  </div>\n</details>"
}