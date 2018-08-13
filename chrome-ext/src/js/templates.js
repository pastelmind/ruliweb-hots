HotsDialog.htmlGenerators.templates = {
  "dialog-skills": "<div class=\"hots-current-hero-icon-wrapper\" aria-label=\"{{name}} ({{type}} {{roleName}})\" data-microtip-position=\"top\" role=\"tooltip\">\n  <img class=\"hots-current-hero-icon\" src=\"{{{iconUrl}}}\" data-hero-id=\"{{id}}\" data-is-ptr=\"{{isPtr}}\" alt=\"{{name}} ({{type}} {{roleName}})\">\n</div>\n{{#skills}}\n<div class=\"hots-skill-icon-wrapper\" aria-label=\"{{typeName}} - {{name}}\" data-microtip-position=\"top\" role=\"tooltip\">\n  <img class=\"hots-skill-icon\" src=\"{{{iconUrl}}}\" alt=\"{{typeName}} - {{name}}\" data-hero-id=\"{{id}}\" data-is-ptr=\"{{isPtr}}\" data-skill-index=\"{{index}}\">\n</div>\n{{/skills}}",
  "dialog-talents": "{{#talents}}\n<li class=\"hots-talentset__group\"><span class=\"hots-talentset__group-title\">{{talentLevel}}레벨</span>\n  {{#talentGroup}}\n  <div class=\"hots-talent-icon-wrapper\" aria-label=\"{{name}}&#xa;({{typeNameLong}} - 레벨 {{talentLevel}})\" data-microtip-position=\"top\" role=\"tooltip\">\n    <img class=\"hots-talent-icon\" src=\"{{{iconUrl}}}\" alt=\"{{name}} ({{typeNameLong}} - 레벨 {{talentLevel}})\" data-hero-id=\"{{id}}\" data-is-ptr=\"{{isPtr}}\" data-talent-level=\"{{talentLevel}}\" data-talent-index=\"{{index}}\">\n  </div>\n  {{/talentGroup}}\n  <input type=\"button\" class=\"hots-talentset__group-add-all\" data-hero-id=\"{{id}}\" data-is-ptr=\"{{isPtr}}\" data-talent-level=\"{{talentLevel}}\" value=\"모두 넣기\">\n</li>\n{{/talents}}",
  "dialog": "<div class=\"hots-dialog\">\n  <section class=\"hots-dialog__section hots-dialog-options\">\n    <label class=\"hots-dialog-option\">\n      <input type=\"checkbox\" id=\"hots-dialog-option-add-version\" checked>\n      <span class=\"hots-dialog-option__description\">히오스 패치 버전 포함</span>\n    </label>\n    <label class=\"hots-dialog-option\" aria-label=\"PTR 서버 패치 정보를 사용합니다\" data-microtip-position=\"top\" role=\"tooltip\">\n      <input type=\"checkbox\" id=\"hots-dialog-option-use-ptr\">\n      <span class=\"hots-dialog-option__description\">PTR 적용</span>\n    </label>\n    <label class=\"hots-dialog-option\" data-microtip-position=\"top\" role=\"tooltip\" aria-label=\"영웅의 기술을 간략하게 표시하고 능력치를 생략합니다.&#xA;여러 개의 영웅 표를 넣을 때 용량을 아낄 수 있습니다.\">\n      <input type=\"checkbox\" id=\"hots-dialog-option-simple-hero-table\">\n      <span class=\"hots-dialog-option__description\">간단한 영웅 표 생성</span>\n    </label>\n  </section>\n  <section class=\"hots-dialog__section hots-hero-filters\">\n    {{#filterGroups}}\n    <section class=\"hots-hero-filter-group\">\n      <header class=\"hots-hero-filter-group__description\">{{name}}: </header>\n      {{#filters}}\n      <label class=\"hero-filter\" aria-label=\"{{name}}\" data-microtip-position=\"top\" role=\"tooltip\">\n        <input type=\"checkbox\" data-filter-type=\"{{type}}\" value=\"{{value}}\">\n        <img class=\"hero-filter__content\" src=\"{{{iconUrl}}}\" alt=\"{{name}}\">\n      </label>\n      {{/filters}}\n    </section>\n    {{/filterGroups}}\n  </section>\n\n  <section class=\"hots-dialog__section hots-hero-icons\">\n    {{#heroes}}\n    <div class=\"hots-hero-icon-wrapper\" data-microtip-position=\"top\" role=\"tooltip\" aria-label=\"{{name}} ({{type}} {{roleName}}){{#hasPtrChanges}}&#xA;이 영웅은 PTR에서 변경되었습니다{{/hasPtrChanges}}{{#isPtr}}&#xA;이 영웅은 PTR에 추가되었습니다{{/isPtr}}\">\n      <img class=\"hots-hero-icon\" src=\"{{{iconUrl}}}\" data-hero-id=\"{{id}}\" data-is-ptr=\"{{isPtr}}\" alt=\"{{name}} ({{type}} {{roleName}})\">\n      {{#hasPtrChanges}}<span class=\"hots-hero-icon-badge hots-hero-icon-badge--ptr-changes\">PTR</span>{{/hasPtrChanges}}\n      {{#isPtr}}        <span class=\"hots-hero-icon-badge hots-hero-icon-badge--new\">NEW</span>        {{/isPtr}}\n    </div>\n    {{/heroes}}\n  </section>\n  <section class=\"hots-dialog__section hots-skillset\"></section>\n  <ul class=\"hots-dialog__section hots-talentset\"></ul>\n  <section class=\"hots-dialog__section hots-dialog-version\">\n    루리웹 히어로즈 오브 더 스톰 공략툴 v{{appVersion}}\n  </section>\n</div>",
  "insert-hero": "<details data-ruliweb-hots-version=\"{{appVersion}}\" class=\"ruliweb-hots-hero-table\" style=\"display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;border:2px solid #426;border-image:linear-gradient(#135,#426) 1;background:#101;color:#ffd;line-HEIGHT:normal\">\n  <summary style=\"float:left;WIDTH:64px;HEIGHT:64px;padding:.5em;background:url({{&iconUrl}}) center/cover no-repeat content-box\" title=\"[클릭하여 접기/펼치기] {{name}} - {{type}} {{roleName}}\"></summary>\n\n  <section style=\"float:left;max-WIDTH:calc(100% - 64px - 1em);background:linear-gradient(#214,#102);WIDTH:calc(50em - 64px - 1em);min-HEIGHT:calc(64px + 1em);box-sizing:border-box;padding:1em\">\n    <div style=\"display:flex\">\n      <div style=\"flex:none;align-self:center;margin-right:.5em;WIDTH:2em;HEIGHT:2em;text-indent:100%;white-space:nowrap;overflow:hidden;background:url(http://i3.ruliweb.com/img/18/08/02/164f661194b19dc2c.png) {{universeIconOffset}} 0/cover\" title=\"{{universeName}}\">{{universeName}}</div>\n      <h2 style=\"font-size:1.5em;text-shadow:0 0 1em #09f;margin:0\">{{name}}</h2>\n    </div>\n    <div style=\"font-size:1.2em;color:#6cf\"><b>{{type}} {{roleName}}</b></div>\n  </section>\n\n  <section style=\"background:linear-gradient(#214,#102);padding:.5em;clear:both;box-sizing:border-box;WIDTH:50em;max-WIDTH:100%;border-top:1px solid #426\">\n    {{#skillGroups}}\n    <div style=\"display:flex\">\n      <h3 style=\"margin:0;flex:0 2 5em;align-self:center;display:block;min-WIDTH:3em;font-size:1.2em;text-shadow:0 0 1em #09f;text-align:center\">{{title}}</h3>\n      <div style=\"flex:1 30em;WIDTH:5em;display:flex;flex-wrap:wrap;align-items:flex-end;padding:5px 5px 0 0;overflow:auto\">\n        {{#skills}}{{> skill}}{{/skills}}\n      </div>\n    </div>\n    {{/skillGroups}}\n  </section>\n\n  {{^isSimpleHeroTable}}\n  <section style=\"background:linear-gradient(#214,#102);padding:.5em 0 0 .5em;box-sizing:border-box;WIDTH:50em;max-WIDTH:100%;border-top:1px solid #426\">\n    {{#units}}\n    <table style=\"display:inline-table;margin:0 .5em .5em 0;border:2px solid #76d;border-collapse:collapse;background:#112;text-align:center\">\n      <thead style=\"background:#224\">\n        {{#unitName}}\n        <tr>\n          <th colspan=\"3\" style=\"border:1px solid #76d;padding:.4em;font:bold 1em sans-serif;color:#ffd;text-shadow:0 0 1em #09f\">{{unitName}}</th>\n        </tr>\n        {{/unitName}}\n        <tr>\n          <th style=\"border:1px solid #76d;padding:.4em;color:#6ce;font:bold 1em sans-serif\">능력치</th>\n          <th style=\"border:1px solid #76d;padding:.4em;color:#6ce;font:bold 1em sans-serif\">1레벨 (성장률)</th>\n          <th style=\"border:1px solid #76d;padding:.4em;color:#6ce;font:bold 1em sans-serif\">20레벨</th>\n        </tr>\n      </thead>\n      <tbody>\n        {{#stats}}\n        <tr>\n          <td style=\"border:1px solid #76d;color:#efe;font:1em sans-serif;padding:.4em .4em .4em 2em;text-align:initial;background:url({{&iconUrl}}) .4em/1.3em no-repeat\">{{name}}{{#altName}} ({{altName}}){{/altName}}</td>\n          {{^level1}}<td colspan=\"2\" style=\"border:1px solid #76d;padding:.4em;color:#efe;font:1em sans-serif\">{{value}}</td>{{/level1}}\n          {{#percentScaling}}<td style=\"border:1px solid #76d;padding:.4em;color:#efe;font:1em sans-serif\">{{level1}} (+{{percentScaling}}%)</td>{{/percentScaling}}\n          {{#levelAdd}}<td style=\"border:1px solid #76d;padding:.4em;color:#efe;font:1em sans-serif\">{{level1}} (+{{levelAdd}})</td>{{/levelAdd}}\n          {{#level20}}<td style=\"border:1px solid #76d;padding:.4em;color:#efe;font:1em sans-serif\">{{level20}}</td>{{/level20}}\n        </tr>\n        {{/stats}}\n      </tbody>\n    </table>\n    {{/units}}\n  </section>\n  {{/isSimpleHeroTable}}\n\n  {{#hotsVersion}}<footer style=\"text-align:right;font-size:.8em;color:#cca;padding-right:1em\"><i>패치 {{hotsVersion}}</i></footer>{{/hotsVersion}}\n</details>",
  "insert-skill-stats": "{{#hasStats}}<br>\n{{#manaCost}}\n<br><span style=\"padding-left:1.5em;color:#4be;background:url(http://i1.ruliweb.com/img/18/07/07/164741ab46719dc2c.png) .15em/1em no-repeat\"><b>마나</b> {{manaCost}}</span>\n{{/manaCost}}\n{{#manaCostPerSecond}}\n<br><span style=\"padding-left:1.5em;color:#4be;background:url(http://i1.ruliweb.com/img/18/07/07/164741ab46719dc2c.png) .15em/1em no-repeat\"><b>마나</b> 초당 {{manaCostPerSecond}}</span>\n{{/manaCostPerSecond}}\n{{#lifeCost}}\n<br><span style=\"padding-left:1.5em;color:#5d2;background:url(http://i1.ruliweb.com/img/18/07/07/164741ab38d19dc2c.png) .15em/1em no-repeat\"><b>생명력</b> {{lifeCost}}</span>\n{{/lifeCost}}\n{{#energyCost}}\n<br><span style=\"padding-left:1.5em;color:#ee3;background:url(http://i1.ruliweb.com/img/18/07/07/164741ab5f219dc2c.png) .15em/1em no-repeat\"><b>{{energyCostName}}</b> {{energyCost}}</span>\n{{/energyCost}}\n{{#cooldown}}\n<br><span style=\"padding-left:1.5em;color:#ddd;background:url(http://i2.ruliweb.com/img/18/07/23/164c2a1709319dc2c.png) 0/1.3em no-repeat\"><b>재사용 대기시간</b> {{cooldown}}초</span>\n{{/cooldown}}\n{{#rechargeCooldown}}\n<br><span style=\"padding-left:1.5em;color:#ddd;background:url(http://i2.ruliweb.com/img/18/07/23/164c2a1709319dc2c.png) 0/1.3em no-repeat\"><b>충전 대기시간</b> {{rechargeCooldown}}초</span>\n{{/rechargeCooldown}}\n{{#extras.length}}\n<br><span style=\"padding-left:1.5em;color:#d90;background:url(http://i3.ruliweb.com/img/18/07/07/164748d2b0519dc2c.png) 0/1.3em no-repeat\">{{#extras}}<b>{{name}}</b> {{value}} {{/extras}}</span>\n{{/extras.length}}\n{{/hasStats}}",
  "insert-skill": "{{#isTalent}}\n<details data-ruliweb-hots-version=\"{{appVersion}}\" class=\"ruliweb-hots-talent-table\" style=\"display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;padding:.5em;border:2px solid #55d;background:linear-gradient(#118,#003);color:#bef\">\n  <summary style=\"float:left;WIDTH:48px;HEIGHT:48px;background:url({{&iconUrl}}) center/cover\" title=\"[클릭하여 접기/펼치기] {{name}} ({{typeNameLong}} - 레벨 {{level}})\"></summary>\n  <div style=\"float:left;WIDTH:50em;padding-left:1em;max-WIDTH:calc(100% - 48px - 1em)\">\n{{/isTalent}}\n{{^isTalent}}\n{{#isForHeroTable}}\n<details style=\"display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;border:2px solid #85d;padding:.5em;background:linear-gradient(#214,#102);color:#6cf;margin:0 0 5px 5px;border-image:linear-gradient(#8df,#ccd) 1\">\n  <summary style=\"float:left;WIDTH:48px;HEIGHT:48px;background:url({{&iconUrl}}) center/cover\" title=\"[클릭하여 접기/펼치기] {{typeName}} - {{name}}\"></summary>\n  <div style=\"float:left;WIDTH:50em;padding-left:1em;max-WIDTH:calc(100% - 48px - 1em)\">\n{{/isForHeroTable}}\n{{^isForHeroTable}}\n<details data-ruliweb-hots-version=\"{{appVersion}}\" class=\"ruliweb-hots-skill-table\" style=\"display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;border:2px solid #85d;padding:.5em;background:linear-gradient(#214,#102);color:#6cf\">\n  <summary style=\"float:left;WIDTH:64px;HEIGHT:64px;background:url({{&iconUrl}}) center/cover\" title=\"[클릭하여 접기/펼치기] {{typeName}} - {{name}}\"></summary>\n  <div style=\"float:left;WIDTH:50em;max-WIDTH:calc(100% - 64px - 1em);padding-left:1em\">\n{{/isForHeroTable}}\n{{/isTalent}}\n    <div style=\"display:flex;flex-wrap:wrap\">\n      <div style=\"flex:3 15em;padding-bottom:.5em\">\n        <b style=\"font-size:1.1em\">{{name}}</b>\n        {{^isForHeroTable}}<br><small>{{heroName}}{{#isTalent}} - 레벨 {{level}}{{/isTalent}}</small>{{/isForHeroTable}}\n      </div>\n      <div style=\"flex:1 5em;text-align:right;padding-bottom:.5em\">\n        {{#isTypeClassBasic}}  <b style=\"display:inline-block;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;white-space:nowrap;color:#87d\">{{/isTypeClassBasic}}\n        {{#isTypeClassHeroic}} <b style=\"display:inline-block;border-radius:.3em;padding:.2em .4em;white-space:nowrap;border:.1em solid #da7;color:#da7\"> {{/isTypeClassHeroic}}\n        {{#isTypeClassPassive}}<b style=\"display:inline-block;border-radius:.3em;padding:.2em .4em;white-space:nowrap;border:.1em solid #6ba;color:#6ba\">{{/isTypeClassPassive}}\n        {{#isTypeClassActive}} <b style=\"display:inline-block;border-radius:.3em;padding:.2em .4em;white-space:nowrap;border:.1em solid #d7a;color:#d7a\"> {{/isTypeClassActive}}\n          {{#upgradeFor}}\n            {{#isTypeClassBasic}}  <img src=\"http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png\" alt=\"능력 강화\" title=\"능력 강화\" style=\"HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom\">{{/isTypeClassBasic}}\n            {{#isTypeClassHeroic}} <img src=\"http://i2.ruliweb.com/img/18/08/07/1651405069c19dc2c.png\" alt=\"능력 강화\" title=\"능력 강화\" style=\"HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom\">{{/isTypeClassHeroic}}\n            {{#isTypeClassPassive}}<img src=\"http://i1.ruliweb.com/img/18/08/07/1651405088419dc2c.png\" alt=\"능력 강화\" title=\"능력 강화\" style=\"HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom\">{{/isTypeClassPassive}}\n            {{#isTypeClassActive}} <img src=\"http://i3.ruliweb.com/img/18/08/11/165246b734f19dc2c.png\" alt=\"능력 강화\" title=\"능력 강화\" style=\"HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom\">{{/isTypeClassActive}}\n          {{/upgradeFor}}\n          {{typeName}}\n        {{#isTypeClassBasic}}  </b>{{/isTypeClassBasic}}\n        {{#isTypeClassHeroic}} </b>{{/isTypeClassHeroic}}\n        {{#isTypeClassPassive}}</b>{{/isTypeClassPassive}}\n        {{#isTypeClassActive}} </b>{{/isTypeClassActive}}\n      </div>\n    </div>\n    <div style=\"color:#bcc\">\n      {{#isSimpleSkillTable}}{{{shortDescription}}}{{/isSimpleSkillTable}}\n      {{^isSimpleSkillTable}}{{{description}}}{{> stats}}{{/isSimpleSkillTable}}\n    </div>\n    {{#hotsVersion}}<footer style=\"text-align:right;font-size:.8em;color:#cca\"><i>패치 {{hotsVersion}}</i></footer>{{/hotsVersion}}\n{{#isTalent}}\n  </div>\n</details>\n{{/isTalent}}\n{{^isTalent}}\n{{#isForHeroTable}}\n  </div>\n</details>\n{{/isForHeroTable}}\n{{^isForHeroTable}}\n  </div>\n</details>\n{{/isForHeroTable}}\n{{/isTalent}}"
}