'use strict'

/** Represents a hero. */
class Hero {
  /**
   * Create a new hero.
   * @param {(string|number)} id A value that uniquely identifies a hero.
   * @param {(string)} name Name of the hero.
   */
  constructor(id, name = null) {
    this.id = id;
    this.name = name;
    this.skills = [];
    this.talents = {};
  }
}

/** Represents a single skill or talent. */
class Skill {
  /**
   * Create a new skill/talent.
   * @param {(string|number)} heroId ID of the hero that uses this skill/talent.
   * @param {string} name Name of the skill/talent.
   */
  constructor(heroId = null, name = null) {
    this.heroId = heroId;
    this.name = name;
    this.type = null;
    this.description = '';
    this.cooldown = 0;
    this.manaCost = 0;
    this.level = 0;
    this.extras = {};
  }
}

function parseHeroMarkdown(markdown) {
  const heroes = [];
  let hero = null, skill = null, talentLevel = -1, isSkillSection = true;

  markdown.split('\n').forEach((line, lineNum) => {
    let titleMatch, listMatch;
    if (titleMatch = line.match(/^(#+)\s*(.*?)\s*$/)) { //Is a header
      const hashCount = titleMatch[1].length, titleText = titleMatch[2];

      switch (hashCount) {
        case 1: //Is next hero
          hero = new Hero(heroes.length, titleText);
          heroes.push(hero);
          break;

        case 2: //Is talent/skill section
          if (/^(기술|특성)$/.test(titleText))
            isSkillSection = (titleText === '기술');
          else
            console.warn(`Line ${lineNum} is not a skill/talent section:`, line)
          break;

        case 3: //Is a skill or talent level group
          if (isSkillSection) {
            skill = new Skill(hero.id, titleText);
            hero.skills.push(skill);
          }
          else {
            const talentLevelMatch = titleText.match(/^레벨 (\d+)$/);
            if (talentLevelMatch)
              talentLevel = parseInt(talentLevelMatch[1]);
            else
              console.warn(`Line ${lineNum} is neither a skill nor a talent level group:`, line);
          }
          break;

        case 4: //Is a talent
          skill = new Skill(hero.id, titleText);
          skill.level = talentLevel;
          if (!(talentLevel in hero.talents))
            hero.talents[talentLevel] = [skill];
          else
            hero.talents[talentLevel].push(skill);
          break;

        default:
          console.warn(`Line ${lineNum} has too many hash signs (#):`, line);
      }
    }
    else if (listMatch = line.match(/^\* (.+?)\s*$/)) { //Is a list
      if (listMatch = line.match(/^\* (.+?): (.+?)\s*$/)) {
        const extraName = listMatch[1], extraValue = listMatch[2];
        if (extraName === '유형')
          skill.type = extraValue;
        else if (extraName === '재사용 대기시간')
          skill.cooldown = parseFloat(extraValue);
        else if (extraName === '마나')
          skill.manaCost = parseInt(extraValue);
        else
          skill.extras[extraName] = extraValue;
      }
      else
        console.warn(`Line ${lineNum} is unrecognized list format:`, line);
    }
    else {  //Is a plain line
      skill.description += line.trim() + '\n';
    }
  });
  
  //Trim skill/talent descriptions
  heroes.forEach(hero => {
    hero.skills.forEach(skill => skill.description = skill.description.trim());
    for (const talentLevel in hero.talents)
      hero.talents[talentLevel].forEach(talent => talent.description = talent.description.trim());
  });

  return heroes;
}


//For testing on Node.js
if (require && module && require.main === module) {
  const fs = require('fs');

  const markdown = fs.readFileSync('docs/heroes.md').toString('utf8');
  const heroes = parseHeroMarkdown(markdown);
  fs.writeFileSync('output.json', JSON.stringify(heroes, null, 2));
  console.log('Complete!');
}