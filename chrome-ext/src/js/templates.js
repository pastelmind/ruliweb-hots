HotsDialog.htmlGenerators.templates = {
  "dialog-skills": "<div class=\"hots-current-hero-icon-wrapper\" aria-label=\"{{name}} ({{type}} {{roleName}})\" data-microtip-position=\"top\" role=\"tooltip\">\n  <img class=\"hots-current-hero-icon\" src=\"{{{iconUrl}}}\" data-hero-id=\"{{id}}\" alt=\"{{name}} ({{type}} {{roleName}})\">\n</div>\n{{#skills}}\n<div class=\"hots-skill-icon-wrapper\" aria-label=\"{{type}} - {{name}}\" data-microtip-position=\"top\" role=\"tooltip\">\n  <img class=\"hots-skill-icon\" src=\"{{{iconUrl}}}\" alt=\"{{type}} - {{name}}\" data-hero-id=\"{{id}}\" data-skill-index=\"{{index}}\">\n</div>\n{{/skills}}",
  "dialog-talents": "{{#talents}}\n<li class=\"hots-talentset__group\"><span class=\"hots-talentset__group-title\">{{talentLevel}}레벨</span>\n  {{#talentGroup}}\n  <div class=\"hots-talent-icon-wrapper\" aria-label=\"{{name}}&#xa;({{type}} - 레벨 {{talentLevel}})\" data-microtip-position=\"top\" role=\"tooltip\">\n    <img class=\"hots-talent-icon\" src=\"{{{iconUrl}}}\" alt=\"{{name}} ({{type}} - 레벨 {{talentLevel}})\" data-hero-id=\"{{id}}\" data-talent-level=\"{{talentLevel}}\" data-talent-index=\"{{index}}\">\n  </div>\n  {{/talentGroup}}\n  <input type=\"button\" class=\"hots-talentset__group-add-all\" data-hero-id=\"{{id}}\" data-talent-level=\"{{talentLevel}}\" value=\"모두 넣기\">\n</li>\n{{/talents}}",
  "dialog": "<div class=\"hots-dialog\">\n  <section class=\"hots-dialog__section hots-dialog-options\">\n    <label class=\"hots-dialog-option\">\n      <input type=\"checkbox\" id=\"hots-dialog-option-add-version\" checked>\n      <span class=\"hots-dialog-option__description\">히오스 패치 버전 포함</span>\n    </label>\n  </section>\n  <section class=\"hots-dialog__section hots-hero-filters\">\n    {{#filterGroups}}\n    <fieldset class=\"hots-hero-filter-group\">\n      <legend class=\"hots-hero-filter-group__description\">{{name}}: </legend>\n      {{#filters}}\n      <label class=\"hero-filter\" aria-label=\"{{name}}\" data-microtip-position=\"top\" role=\"tooltip\">\n        <input type=\"checkbox\" data-filter-type=\"{{type}}\" value=\"{{value}}\">\n        <img class=\"hero-filter__content\" src=\"{{{iconUrl}}}\" alt=\"{{name}}\">\n      </label>\n      {{/filters}}\n    </fieldset>\n    {{/filterGroups}}\n  </section>\n\n  <section class=\"hots-dialog__section hots-hero-icons\">\n    {{#heroes}}\n    <div class=\"hots-hero-icon-wrapper\" aria-label=\"{{name}} ({{type}} {{roleName}})\" data-microtip-position=\"top\" role=\"tooltip\">\n      <img class=\"hots-hero-icon\" src=\"{{{iconUrl}}}\" data-hero-id=\"{{id}}\" alt=\"{{name}} ({{type}} {{roleName}})\">\n    </div>\n    {{/heroes}}\n  </section>\n  <section class=\"hots-dialog__section hots-skillset\"></section>\n  <ul class=\"hots-dialog__section hots-talentset\"></ul>\n  <section class=\"hots-dialog__section hots-dialog-version\">\n    루리웹 히어로즈 오브 더 스톰 공략툴 v{{appVersion}}\n  </section>\n</div>",
  "insert-hero": "<button class=\"ruliweb-hots-table\" disabled style=\"border:none;margin:0;padding:0;text-align:left;cursor:auto\">\n  <details data-ruliweb-hots-version=\"{{appVersion}}\" class=\"ruliweb-hots-hero-table\" style=\"display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;border:2px solid #47a;background:#135;color:#ffd\">\n    <summary style=\"float:left;padding:.5em;WIDTH:64px;HEIGHT:64px;background:url({{iconUrl}}) center/cover no-repeat content-box\" title=\"[클릭하여 접기/펼치기] {{name}} - {{type}} {{roleName}}\"></summary>\n    <div style=\"float:left;display:flex;flex-flow:column;WIDTH:50em;max-WIDTH:calc(100% - 64px - 1em);min-HEIGHT:calc(64px + 1em)\">\n      <div style=\"display:flex;flex-wrap:wrap;font-weight:700;text-align:center;background:#011;color:#add\">\n        <div style=\"padding:.5em;flex:2 14em;border:solid #47a;border-WIDTH:0 0 1px 1px\">{{name}}</div>\n        <div style=\"padding:.5em;flex:1 7em;border:solid #47a;border-WIDTH:0 0 1px 1px\">{{type}} {{roleName}}</div>\n      </div>\n      <div style=\"flex:1;padding:.5em;text-align:left;color:#efe;border-left:1px solid #47a;background:#134\">\n        {{#skills}}\n        <img style=\"WIDTH:48px;margin:0 .25em\" src=\"{{{iconUrl}}}\" alt=\"{{type}} - {{name}}\" title=\"{{type}} - {{name}}\">\n        {{/skills}}{{#hotsVersion}}\n        <div style=\"text-align:right;font-size:.8em;color:#cca;font-style:italic\">패치 {{hotsVersion}}</div>{{/hotsVersion}}\n      </div>\n    </div>\n    <div style=\"WIDTH:50em;max-WIDTH:100%;box-sizing:border-box;clear:both;border-top:1px solid #47a;padding:.5em 0 0 .5em;background-color:#244\">\n      {{#units}}\n      <table style=\"display:inline-table;margin:0 .5em .5em 0;border:2px solid #76d;border-collapse:collapse;background:#112;text-align:center\">\n        <thead style=\"background:#224\">\n          {{#unitName}}\n          <tr>\n            <th colspan=\"3\" style=\"border:1px solid #76d;padding:.4em;color:#6ce;font:bold 1em sans-serif\">{{unitName}}</th>\n          </tr>\n          {{/unitName}}\n          <tr>\n            <th style=\"border:1px solid #76d;padding:.4em;color:#6ce;font:bold 1em sans-serif\">능력치</th>\n            <th style=\"border:1px solid #76d;padding:.4em;color:#6ce;font:bold 1em sans-serif\">1레벨 (성장률)</th>\n            <th style=\"border:1px solid #76d;padding:.4em;color:#6ce;font:bold 1em sans-serif\">20레벨</th>\n          </tr>\n        </thead>\n        <tbody>\n          {{#stats}}\n          <tr>\n            <td style=\"border:1px solid #76d;color:#efe;font:1em sans-serif;padding:.4em .4em .4em 2em;text-align:initial;background:url({{&iconUrl}}) .4em/1.3em no-repeat\">{{name}}{{#altName}} ({{altName}}){{/altName}}</td>\n            {{^level1}}<td colspan=\"2\" style=\"border:1px solid #76d;padding:.4em;color:#efe;font:1em sans-serif\">{{value}}</td>{{/level1}}\n            {{#percentScaling}}<td style=\"border:1px solid #76d;padding:.4em;color:#efe;font:1em sans-serif\">{{level1}} (+{{percentScaling}}%)</td>{{/percentScaling}}\n            {{#levelAdd}}<td style=\"border:1px solid #76d;padding:.4em;color:#efe;font:1em sans-serif\">{{level1}} (+{{levelAdd}})</td>{{/levelAdd}}\n            {{#level20}}<td style=\"border:1px solid #76d;padding:.4em;color:#efe;font:1em sans-serif\">{{level20}}</td>{{/level20}}\n          </tr>\n          {{/stats}}\n        </tbody>\n      </table>\n      {{/units}}\n    </div>\n  </details>\n</button>",
  "insert-skill-stats": "{{#hasStats}}<br>\n{{#manaCost}}\n<br><span style=\"padding-left:1.5em;color:#4be;background:url(http://i1.ruliweb.com/img/18/07/07/164741ab46719dc2c.png) .15em/1em no-repeat\"><b>마나</b> {{manaCost}}</span>\n{{/manaCost}}\n{{#lifeCost}}\n<br><span style=\"padding-left:1.5em;color:#5d2;background:url(http://i1.ruliweb.com/img/18/07/07/164741ab38d19dc2c.png) .15em/1em no-repeat\"><b>생명력</b> {{lifeCost}}</span>\n{{/lifeCost}}\n{{#energyCost}}\n<br><span style=\"padding-left:1.5em;color:#ee3;background:url(http://i1.ruliweb.com/img/18/07/07/164741ab5f219dc2c.png) .15em/1em no-repeat\"><b>{{energyCostName}}</b> {{energyCost}}</span>\n{{/energyCost}}\n{{#cooldown}}\n<br><span style=\"padding-left:1.5em;color:#ddd;background:url(http://i2.ruliweb.com/img/18/07/23/164c2a1709319dc2c.png) 0/1.3em no-repeat\"><b>재사용 대기시간</b> {{cooldown}}초</span>\n{{/cooldown}}\n{{#rechargeCooldown}}\n<br><span style=\"padding-left:1.5em;color:#ddd;background:url(http://i2.ruliweb.com/img/18/07/23/164c2a1709319dc2c.png) 0/1.3em no-repeat\"><b>충전 대기시간</b> {{rechargeCooldown}}초</span>\n{{/rechargeCooldown}}\n{{#extras.length}}\n<br><span style=\"padding-left:1.5em;color:#d90;background:url(http://i3.ruliweb.com/img/18/07/07/164748d2b0519dc2c.png) 0/1.3em no-repeat\">{{#extras}}<b>{{name}}</b> {{value}} {{/extras}}</span>\n{{/extras.length}}\n{{/hasStats}}",
  "insert-skill": "<button class=\"ruliweb-hots-table\" disabled style=\"border:none;margin:0;padding:0;text-align:left;cursor:auto\">\n  <details data-ruliweb-hots-version=\"{{appVersion}}\" class=\"ruliweb-hots-skill-table\" style=\"display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;border:2px solid #85d;background:#418;color:#fdf\">\n    <summary style=\"float:left;padding:.5em;WIDTH:64px;HEIGHT:64px;background:url({{iconUrl}}) center/cover no-repeat content-box\" title=\"[클릭하여 접기/펼치기] {{type}} - {{name}}\"></summary>\n    <div style=\"float:left;display:flex;flex-flow:column;WIDTH:50em;max-WIDTH:calc(100% - 64px - 1em);min-HEIGHT:calc(64px + 1em)\">\n      <div style=\"display:flex;flex-wrap:wrap;font-weight:700;text-align:center;background:#103;color:#fbf\">\n        <div style=\"padding:.5em;flex:3 15em;border:solid #85d;border-WIDTH:0 0 1px 1px\">{{name}}</div>\n        <div style=\"padding:.5em;flex:1 6em;border:solid #85d;border-WIDTH:0 0 1px 1px\">{{type}}</div>\n      </div>\n      <div style=\"flex:1;padding:.5em;text-align:left;color:#efe;border-left:1px solid #85d;background:#214\">\n        {{{description}}}{{> stats}}{{#hotsVersion}}\n        <div style=\"text-align:right;font-size:.8em;color:#cca;font-style:italic\">패치 {{hotsVersion}}</div>{{/hotsVersion}}\n      </div>\n    </div>\n  </details>\n</button>",
  "insert-talent": "<button class=\"ruliweb-hots-table\" disabled style=\"border:none;margin:0;padding:0;text-align:left;cursor:auto\">\n  <details data-ruliweb-hots-version=\"{{appVersion}}\" class=\"ruliweb-hots-talent-table\" style=\"display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;border:2px solid #55d;background:#118;color:#bef\">\n    <summary style=\"float:left;padding:.5em;WIDTH:48px;HEIGHT:48px;background:url({{iconUrl}}) center/cover no-repeat content-box\" title=\"[클릭하여 접기/펼치기] {{name}} ({{type}} - 레벨 {{level}})\"></summary>\n    <div style=\"float:left;display:flex;flex-flow:column;WIDTH:50em;min-HEIGHT:calc(64px + 1em);max-WIDTH:calc(100% - 48px - 1em)\">\n      <div style=\"display:flex;flex-wrap:wrap;font-weight:700;text-align:center;background:#003;color:#6ce\">\n        <div style=\"padding:.5em;flex:2 14em;border:solid #55d;border-WIDTH:0 0 1px 1px\">{{name}}</div>\n        <div style=\"padding:.5em;flex:1 7em;border:solid #55d;border-WIDTH:0 0 1px 1px\">{{type}}</div>\n      </div>\n      <div style=\"flex:1;padding:.5em;text-align:left;color:#efe;border-left:1px solid #55d;background:#114\">\n        {{{description}}}{{> stats}}{{#hotsVersion}}\n        <div style=\"text-align:right;font-size:.8em;color:#cca;font-style:italic\">패치 {{hotsVersion}}</div>{{/hotsVersion}}\n      </div>\n    </div>\n  </details>\n</button>"
}