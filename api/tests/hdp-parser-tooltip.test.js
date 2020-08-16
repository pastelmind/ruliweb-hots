/** @file Tests for HeroesDataParser HeroData Merge script */

import { strict as assert } from "assert";

import {
  extractAbilityCostFragment,
  extractCooldownFragment,
  parseTooltip,
} from "../src/hdp-parser-tooltip.js";

describe("parseTooltip()", () => {
  it("should parse plain strings as-is", () => {
    assert.strictEqual(parseTooltip("Hello, world!"), "Hello, world!");
  });

  it("should remove data tags with special values", () => {
    assert.strictEqual(
      parseTooltip(
        'Regenerate <c val="bfd4fd">30%</c> maximum Health over <c val="bfd4fd">4</c> seconds.'
      ),
      "Regenerate 30% maximum Health over 4 seconds."
    );
    // Variants of "Passive:"
    assert.strictEqual(
      parseTooltip('<c val="00ff90">지속 효과</c>:'),
      "지속 효과:"
    );
    assert.strictEqual(
      parseTooltip('<c val="00ff90">지속 효과:</c>'),
      "지속 효과:"
    );
    assert.strictEqual(
      parseTooltip('<c val="00ff90">지속 효과: </c>테스트'),
      "지속 효과: 테스트"
    );
    // Two variants of "Quest:"
    assert.strictEqual(parseTooltip('<c val="e4b800">Quest</c>:'), "Quest:");
    assert.strictEqual(parseTooltip('<c val="e4b800">Quest:</c>'), "Quest:");
  });

  it("should convert other data tags to <span>", () => {
    assert.strictEqual(
      parseTooltip('<c val="ffff80">Human</c>'),
      '<span style="color:#ffff80">Human</span>'
    );
    assert.strictEqual(
      parseTooltip('<c val="D65CFF">Worgen</c>'),
      '<span style="color:#d65cff">Worgen</span>'
    );
    assert.strictEqual(
      parseTooltip('<c val="ff0000">Breath of Fire</c>'),
      '<span style="color:#ff0000">Breath of Fire</span>'
    );
    assert.strictEqual(
      parseTooltip('<c val="e1c72c">Keg Smash</c>'),
      '<span style="color:#e1c72c">Keg Smash</span>'
    );
    assert.strictEqual(
      parseTooltip('<c val="ff5858">Combo Point</c>'),
      '<span style="color:#ff5858">Combo Point</span>'
    );
    assert.strictEqual(
      parseTooltip('<c val="00DFDF">Reaper\'s Mark</c>'),
      '<span style="color:#00dfdf">Reaper\'s Mark</span>'
    );
    assert.strictEqual(
      parseTooltip('<c val="FF8B8B">Desperation</c>'),
      '<span style="color:#ff8b8b">Desperation</span>'
    );
    assert.strictEqual(
      parseTooltip('<c val="FFF5C2">Zeal</c>'),
      '<span style="color:#fff5c2">Zeal</span>'
    );

    // Don't remove Weapon Mode: Phase Bomb / Repeater Cannon
    assert.strictEqual(
      parseTooltip('<c val="00ff90">무기 모드: 연발포</c>'),
      '<span style="color:#00ff90">무기 모드: 연발포</span>'
    );
    assert.strictEqual(
      parseTooltip('<c val="00ff90">무기 모드: 위상 폭탄</c>'),
      '<span style="color:#00ff90">무기 모드: 위상 폭탄</span>'
    );
  });

  it("should handle color gradients", () => {
    assert.strictEqual(
      parseTooltip(
        '<s val="cbe8ff-ffffff" name="StandardTooltipHeader">Compound Ability</s>'
      ),
      '<span style="color:#cbe8ff;text-shadow:0 0 1px #ffffff">Compound Ability</span>'
    );
    assert.strictEqual(
      parseTooltip('<c val="d8ab80-87564b">World Breaker</c>'),
      '<span style="color:#d8ab80;text-shadow:0 0 1px #87564b">World Breaker</span>'
    );
    assert.strictEqual(
      parseTooltip('<c val="ef6e28-ad231e">Destroyer</c>'),
      '<span style="color:#ef6e28;text-shadow:0 0 1px #ad231e">Destroyer</span>'
    );
  });

  it("should replace <n/> with newline", () => {
    assert.strictEqual(
      parseTooltip("Line 1<n/>Line 2<n/><n/>Line 3"),
      "Line 1\nLine 2\n\nLine 3"
    );
  });

  it("should handle jongsung rules correctly", () => {
    assert.strictEqual(
      parseTooltip(
        '<c val="bfd4fd">49</c><lang rule="jongsung">으로,로</lang>'
      ),
      "49로"
    );
    assert.strictEqual(
      parseTooltip(
        '<c val="bfd4fd">50</c><lang rule="jongsung">으로,로</lang>'
      ),
      "50으로"
    );

    // Jongsung after percent sign is fixed
    assert.strictEqual(
      parseTooltip(
        '<c val="bfd4fd">49%</c><lang rule="jongsung">으로,로</lang>'
      ),
      "49%로"
    );
    assert.strictEqual(
      parseTooltip(
        '<c val="bfd4fd">50%</c><lang rule="jongsung">으로,로</lang>'
      ),
      "50%로"
    );
  });

  it("should replace scaling indicators with percentages", () => {
    assert.strictEqual(
      parseTooltip("Deals 300~~0.04~~ damage"),
      "Deals 300(+4%) damage"
    );
    assert.strictEqual(parseTooltip("125.25~~0.055~~"), "125.25(+5.5%)");
  });

  it("should handle jongsung rules with scaling indicators", () => {
    assert.strictEqual(
      parseTooltip(
        '<c val="bfd4fd">112~~0.03~~</c><lang rule="jongsung">으로,로</lang>'
      ),
      "112(+3%)로"
    );
    assert.strictEqual(
      parseTooltip(
        '<c val="bfd4fd">256~~0.04~~</c><lang rule="jongsung">으로,로</lang>'
      ),
      "256(+4%)으로"
    );
  });

  it("should handle typos made by Blizzard", () => {
    assert.strictEqual(parseTooltip('<c al="bfd4fd">typo</c>'), "typo");
    assert.strictEqual(
      parseTooltip('<c val="#Tooltip Numbers">typo</c>'),
      "typo"
    );
  });

  it("should trim each line AND leading/trailing newlines", () => {
    assert.strictEqual(parseTooltip(" \n foo \n   bar \n "), "foo\nbar");
    assert.strictEqual(
      parseTooltip(" <n/> foo <n/>   bar <n/><n/> "),
      "foo\nbar"
    );
  });
});

describe("extractCooldownFragment()", () => {
  it("should parse cooldowns correctly", () => {
    assert.deepStrictEqual(extractCooldownFragment("Cooldown: 1 second"), {
      cooldown: 1,
    });
    assert.deepStrictEqual(extractCooldownFragment("Cooldown: 2.5 seconds"), {
      cooldown: 2.5,
    });
  });

  it("should parse charge cooldowns", () => {
    assert.deepStrictEqual(
      extractCooldownFragment("Charge Cooldown: 12 seconds"),
      { rechargeCooldown: 12 }
    );
  });

  it("should parse per-ally cooldowns", () => {
    assert.deepStrictEqual(
      extractCooldownFragment("Cooldown: 21 seconds per ally"),
      { cooldownPerAlly: 21 }
    );
  });

  it("should ignore XML tags", () => {
    assert.deepStrictEqual(
      extractCooldownFragment('Cooldown: <c val="bfd4fd">5 seconds</c>'),
      { cooldown: 5 }
    );
  });
});

describe("extractAbilityCostFragment()", () => {
  it("should parse mana cost", () => {
    assert.deepStrictEqual(extractAbilityCostFragment("Mana: 52.5"), {
      manaCost: 52.5,
    });
  });

  it("should parse mana cost per second", () => {
    assert.deepStrictEqual(extractAbilityCostFragment("Mana: 13 per second"), {
      manaCostPerSecond: 13,
    });
  });

  it("should parse fury cost", () => {
    assert.deepStrictEqual(extractAbilityCostFragment("Fury: 47"), {
      extras: { 분노: 47 },
    });
  });

  it("should parse brew cost", () => {
    assert.deepStrictEqual(extractAbilityCostFragment("Brew: 16"), {
      extras: { 취기: 16 },
    });
  });

  it("should parse energy cost", () => {
    assert.deepStrictEqual(extractAbilityCostFragment("Energy: 73"), {
      extras: { 기력: 73 },
    });
  });

  it("should parse energy cost per second", () => {
    assert.deepStrictEqual(
      extractAbilityCostFragment("Energy: 12 per second"),
      {
        extras: { 기력: "초당 12" },
      }
    );
  });

  it("should ignore XML tags", () => {
    assert.deepStrictEqual(
      extractAbilityCostFragment('<s val="bfd4fd">Mana: 25</s>'),
      { manaCost: 25 }
    );
  });
});
