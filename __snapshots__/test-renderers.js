exports['HotsDialog.renderers Dialog templates generates dialog content correctly 1'] = `
<div class="hots-dialog">
  <section class="hots-dialog__section hots-dialog-options">
    <label class="hots-dialog-option hots-dialog-option--checkbox">
      <input type="checkbox" id="hots-dialog-option-add-version" checked>
      <span class="hots-dialog-option__description">히오스 패치 버전 포함</span>
    </label>
    <label class="hots-dialog-option hots-dialog-option--checkbox" aria-label="PTR 서버 패치 정보를 사용합니다" data-microtip-position="top" role="tooltip">
      <input type="checkbox" id="hots-dialog-option-use-ptr">
      <span class="hots-dialog-option__description">PTR 적용</span>
    </label>
    <label class="hots-dialog-option hots-dialog-option--checkbox" data-microtip-position="top" role="tooltip" aria-label="영웅의 기술을 간략하게 표시하고 능력치를 생략합니다.&#xA;여러 개의 영웅 표를 넣을 때 용량을 아낄 수 있습니다.">
      <input type="checkbox" id="hots-dialog-option-simple-hero-table">
      <span class="hots-dialog-option__description">간단한 영웅 표 생성</span>
    </label>
    <div class="hots-dialog-option-group">
      <label class="hots-dialog-option">
        <span class="hots-dialog-option__description">입력할 아이콘 크기</span>
        <input type="range" min="32" max="64" step="8" id="hots-dialog-option-icon-size">
        <output class="hots-dialog-option__description" for="hots-dialog-option-icon-size"></output>
      </label>
    </div>
  </section>
  <section class="hots-dialog__section hots-hero-filters">
    <section class="hots-hero-filter-group">
      <header class="hots-hero-filter-group__description">세계관: </header>
      <label class="hero-filter" aria-label="워크래프트" data-microtip-position="top" role="tooltip">
        <input type="checkbox" data-filter-type="universe" value="warcraft">
        <img class="hero-filter__content" src="../src//images/universe-warcraft.png" alt="워크래프트">
      </label>
      <label class="hero-filter" aria-label="스타크래프트" data-microtip-position="top" role="tooltip">
        <input type="checkbox" data-filter-type="universe" value="starcraft">
        <img class="hero-filter__content" src="../src//images/universe-starcraft.png" alt="스타크래프트">
      </label>
      <label class="hero-filter" aria-label="디아블로" data-microtip-position="top" role="tooltip">
        <input type="checkbox" data-filter-type="universe" value="diablo">
        <img class="hero-filter__content" src="../src//images/universe-diablo.png" alt="디아블로">
      </label>
      <label class="hero-filter" aria-label="블리자드 고전" data-microtip-position="top" role="tooltip">
        <input type="checkbox" data-filter-type="universe" value="classic">
        <img class="hero-filter__content" src="../src//images/universe-classic.png" alt="블리자드 고전">
      </label>
      <label class="hero-filter" aria-label="오버워치" data-microtip-position="top" role="tooltip">
        <input type="checkbox" data-filter-type="universe" value="overwatch">
        <img class="hero-filter__content" src="../src//images/universe-overwatch.png" alt="오버워치">
      </label>
    </section>
    <section class="hots-hero-filter-group">
      <header class="hots-hero-filter-group__description">역할: </header>
      <label class="hero-filter" aria-label="전사" data-microtip-position="top" role="tooltip">
        <input type="checkbox" data-filter-type="newRole" value="tank">
        <img class="hero-filter__content" src="../src//images/newRole-tank.png" alt="전사">
      </label>
      <label class="hero-filter" aria-label="투사" data-microtip-position="top" role="tooltip">
        <input type="checkbox" data-filter-type="newRole" value="bruiser">
        <img class="hero-filter__content" src="../src//images/newRole-bruiser.png" alt="투사">
      </label>
      <label class="hero-filter" aria-label="원거리 암살자" data-microtip-position="top" role="tooltip">
        <input type="checkbox" data-filter-type="newRole" value="ranged_assassin">
        <img class="hero-filter__content" src="../src//images/newRole-ranged_assassin.png" alt="원거리 암살자">
      </label>
      <label class="hero-filter" aria-label="근접 암살자" data-microtip-position="top" role="tooltip">
        <input type="checkbox" data-filter-type="newRole" value="melee_assassin">
        <img class="hero-filter__content" src="../src//images/newRole-melee_assassin.png" alt="근접 암살자">
      </label>
      <label class="hero-filter" aria-label="치유사" data-microtip-position="top" role="tooltip">
        <input type="checkbox" data-filter-type="newRole" value="healer">
        <img class="hero-filter__content" src="../src//images/newRole-healer.png" alt="치유사">
      </label>
      <label class="hero-filter" aria-label="지원가" data-microtip-position="top" role="tooltip">
        <input type="checkbox" data-filter-type="newRole" value="support">
        <img class="hero-filter__content" src="../src//images/newRole-support.png" alt="지원가">
      </label>
    </section>
  </section>

  <section class="hots-dialog__section hots-hero-icons">
    <div class="hots-hero-icon-wrapper" data-microtip-position="top" role="tooltip" aria-label="가즈로 (근접 암살자)">
      <img class="hots-hero-icon" src="http://i2.ruliweb.com/img/18/06/14/163fc227a1919dc2c.png" data-hero-id="Tinker" data-is-ptr="" alt="가즈로 (근접 암살자)">
      
      
    </div>
    <div class="hots-hero-icon-wrapper" data-microtip-position="top" role="tooltip" aria-label="렉사르 (투사)">
      <img class="hots-hero-icon" src="http://i3.ruliweb.com/img/18/06/14/163fc0e215b19dc2c.png" data-hero-id="Rexxar" data-is-ptr="" alt="렉사르 (투사)">
      
      
    </div>
    <div class="hots-hero-icon-wrapper" data-microtip-position="top" role="tooltip" aria-label="피닉스 (원거리 암살자)">
      <img class="hots-hero-icon" src="http://i2.ruliweb.com/img/18/06/14/163fc227f7919dc2c.png" data-hero-id="Fenix" data-is-ptr="" alt="피닉스 (원거리 암살자)">
      
      
    </div>
  </section>
  <section class="hots-dialog__section hots-skillset"></section>
  <ul class="hots-dialog__section hots-talentset"></ul>
  <section class="hots-dialog__section hots-dialog-version">
    루리웹 히어로즈 오브 더 스톰 공략툴 vapp version string
  </section>
</div>
`

exports['HotsDialog.renderers Dialog templates generates skill icons correctly 1'] = `
<div class="hots-current-hero-icon-wrapper" aria-label="가즈로 (근접 암살자)" data-microtip-position="top" role="tooltip">
  <img class="hots-current-hero-icon" src="http://i2.ruliweb.com/img/18/06/14/163fc227a1919dc2c.png" data-hero-id="Tinker" data-is-ptr="" alt="가즈로 (근접 암살자)">
</div>
<div class="hots-skill-icon-wrapper" aria-label="고유 능력 - 고물상&#xA;포탑과 적 구조물에서 고철이 떨어져, 획득 시 마나 회복 및 재사용 대기시간 감소" data-microtip-position="top" role="tooltip">
  <img class="hots-skill-icon" src="http://i3.ruliweb.com/img/18/07/02/1645956a7cb19dc2c.png" alt="고유 능력 - 고물상" data-hero-id="Tinker" data-is-ptr="" data-skill-index="0">
</div>
<div class="hots-skill-icon-wrapper" aria-label="Q - 잘나가! 포탑&#xA;주위 적들을 공격하는 포탑 설치" data-microtip-position="top" role="tooltip">
  <img class="hots-skill-icon" src="http://i2.ruliweb.com/img/18/07/02/1645956a00919dc2c.png" alt="Q - 잘나가! 포탑" data-hero-id="Tinker" data-is-ptr="" data-skill-index="1">
</div>
<div class="hots-skill-icon-wrapper" aria-label="사용 효과 - 집중 포화!&#xA;포탑에게 대상 공격 지시" data-microtip-position="top" role="tooltip">
  <img class="hots-skill-icon" src="http://i2.ruliweb.com/img/18/07/02/1645956a40719dc2c.png" alt="사용 효과 - 집중 포화!" data-hero-id="Tinker" data-is-ptr="" data-skill-index="2">
</div>
<div class="hots-skill-icon-wrapper" aria-label="W - 죽이는 레이저&#xA;오래 충전할수록 공격력과 사거리가 증가하는 레이저 발사" data-microtip-position="top" role="tooltip">
  <img class="hots-skill-icon" src="http://i3.ruliweb.com/img/18/07/02/1645956889519dc2c.png" alt="W - 죽이는 레이저" data-hero-id="Tinker" data-is-ptr="" data-skill-index="3">
</div>
<div class="hots-skill-icon-wrapper" aria-label="E - 터진다늄 폭탄&#xA;일정 지역 안의 적에게 피해를 주며 기절시키는 시한 폭탄을 던짐" data-microtip-position="top" role="tooltip">
  <img class="hots-skill-icon" src="http://i3.ruliweb.com/img/18/07/02/1645956af9a19dc2c.png" alt="E - 터진다늄 폭탄" data-hero-id="Tinker" data-is-ptr="" data-skill-index="4">
</div>

`

exports['HotsDialog.renderers Dialog templates generates talent list correctly 1'] = `
<li class="hots-talentset__group"><span class="hots-talentset__group-title">1레벨</span>
  <div class="hots-talent-icon-wrapper" aria-label="추가 TNT&#xa;(능력 강화 (E) - 레벨 1)&#xA;터진다늄 폭탄 공격력 증가" data-microtip-position="top" role="tooltip">
    <img class="hots-talent-icon" src="http://i3.ruliweb.com/img/18/07/02/1645956af9a19dc2c.png" alt="추가 TNT (능력 강화 (E) - 레벨 1)" data-hero-id="Tinker" data-is-ptr="" data-talent-level="1" data-talent-index="0">
  </div>
  <div class="hots-talent-icon-wrapper" aria-label="고철공장공장장&#xa;(능력 강화 (고유 능력) - 레벨 1)&#xA;고물상 마나 회복량 증가" data-microtip-position="top" role="tooltip">
    <img class="hots-talent-icon" src="http://i3.ruliweb.com/img/18/07/02/1645956a7cb19dc2c.png" alt="고철공장공장장 (능력 강화 (고유 능력) - 레벨 1)" data-hero-id="Tinker" data-is-ptr="" data-talent-level="1" data-talent-index="1">
  </div>
  <div class="hots-talent-icon-wrapper" aria-label="박! 살!&#xa;(능력 강화 (고유 능력) - 레벨 1)&#xA;고물상 재사용 대기시간 감소량 증가" data-microtip-position="top" role="tooltip">
    <img class="hots-talent-icon" src="http://i1.ruliweb.com/img/18/07/02/1645956abae19dc2c.png" alt="박! 살! (능력 강화 (고유 능력) - 레벨 1)" data-hero-id="Tinker" data-is-ptr="" data-talent-level="1" data-talent-index="2">
  </div>
  <div class="hots-talent-icon-wrapper" aria-label="고블린 수리법&#xa;(지속 효과 - 레벨 1)&#xA;퀘스트: 재생의 구슬 획득 시 생명력 재생량 증가" data-microtip-position="top" role="tooltip">
    <img class="hots-talent-icon" src="http://i1.ruliweb.com/img/18/07/02/16459530fdd19dc2c.png" alt="고블린 수리법 (지속 효과 - 레벨 1)" data-hero-id="Tinker" data-is-ptr="" data-talent-level="1" data-talent-index="3">
  </div>
  <div class="hots-talentset__group-buttonset">
    <input type="button" class="hots-talentset__group-add-all" data-hero-id="Tinker" data-is-ptr="" data-talent-level="1" value="모두 넣기">
  </div>
</li>
<li class="hots-talentset__group"><span class="hots-talentset__group-title">4레벨</span>
  <div class="hots-talent-icon-wrapper" aria-label="태엽장치 증기 주먹&#xa;(능력 강화 (Q) - 레벨 4)&#xA;퀘스트: 일반 공격 시 잘나가! 포탑 지속 시간 증가" data-microtip-position="top" role="tooltip">
    <img class="hots-talent-icon" src="http://i2.ruliweb.com/img/18/07/02/1645956a00919dc2c.png" alt="태엽장치 증기 주먹 (능력 강화 (Q) - 레벨 4)" data-hero-id="Tinker" data-is-ptr="" data-talent-level="4" data-talent-index="0">
  </div>
  <div class="hots-talent-icon-wrapper" aria-label="아크 반응로&#xa;(능력 강화 (E) - 레벨 4)&#xA;터진다늄 폭탄 재사용 대기시간 감소 및 잘나가! 포탑 충전" data-microtip-position="top" role="tooltip">
    <img class="hots-talent-icon" src="http://i3.ruliweb.com/img/18/07/02/1645956af9a19dc2c.png" alt="아크 반응로 (능력 강화 (E) - 레벨 4)" data-hero-id="Tinker" data-is-ptr="" data-talent-level="4" data-talent-index="1">
  </div>
  <div class="hots-talent-icon-wrapper" aria-label="죽은 적도 다시 보기&#xa;(능력 강화 (고유 능력) - 레벨 4)&#xA;적 돌격병이 일정 확률로 고철을 떨어트림" data-microtip-position="top" role="tooltip">
    <img class="hots-talent-icon" src="http://i3.ruliweb.com/img/18/07/02/1645956a7cb19dc2c.png" alt="죽은 적도 다시 보기 (능력 강화 (고유 능력) - 레벨 4)" data-hero-id="Tinker" data-is-ptr="" data-talent-level="4" data-talent-index="2">
  </div>
  <div class="hots-talent-icon-wrapper" aria-label="고용된 떡대들&#xa;(지속 효과 - 레벨 4)&#xA;주위 용병 강화 및 용병 상대 포탑 방어력 증가" data-microtip-position="top" role="tooltip">
    <img class="hots-talent-icon" src="http://i1.ruliweb.com/img/18/07/02/16459530ced19dc2c.png" alt="고용된 떡대들 (지속 효과 - 레벨 4)" data-hero-id="Tinker" data-is-ptr="" data-talent-level="4" data-talent-index="3">
  </div>
  <div class="hots-talentset__group-buttonset">
    <input type="button" class="hots-talentset__group-add-all" data-hero-id="Tinker" data-is-ptr="" data-talent-level="4" value="모두 넣기">
  </div>
</li>
<li class="hots-talentset__group"><span class="hots-talentset__group-title">7레벨</span>
  <div class="hots-talent-icon-wrapper" aria-label="완전 잘나가! 포탑&#xa;(능력 강화 (Q) - 레벨 7)&#xA;잘나가! 포탑이 여러 대상 공격" data-microtip-position="top" role="tooltip">
    <img class="hots-talent-icon" src="http://i2.ruliweb.com/img/18/07/02/1645956a00919dc2c.png" alt="완전 잘나가! 포탑 (능력 강화 (Q) - 레벨 7)" data-hero-id="Tinker" data-is-ptr="" data-talent-level="7" data-talent-index="0">
  </div>
  <div class="hots-talent-icon-wrapper" aria-label="기름 찌꺼기&#xa;(능력 강화 (Q) - 레벨 7)&#xA;잘나가! 포탑이 적들을 느려지게 함" data-microtip-position="top" role="tooltip">
    <img class="hots-talent-icon" src="http://i2.ruliweb.com/img/18/07/02/1645956a40719dc2c.png" alt="기름 찌꺼기 (능력 강화 (Q) - 레벨 7)" data-hero-id="Tinker" data-is-ptr="" data-talent-level="7" data-talent-index="1">
  </div>
  <div class="hots-talent-icon-wrapper" aria-label="과집중 코일&#xa;(능력 강화 (W) - 레벨 7)&#xA;죽이는 레이저 충전 속도 증가" data-microtip-position="top" role="tooltip">
    <img class="hots-talent-icon" src="http://i3.ruliweb.com/img/18/07/02/1645956889519dc2c.png" alt="과집중 코일 (능력 강화 (W) - 레벨 7)" data-hero-id="Tinker" data-is-ptr="" data-talent-level="7" data-talent-index="2">
  </div>
  <div class="hots-talentset__group-buttonset">
    <input type="button" class="hots-talentset__group-add-all" data-hero-id="Tinker" data-is-ptr="" data-talent-level="7" value="모두 넣기">
  </div>
</li>
<li class="hots-talentset__group"><span class="hots-talentset__group-title">10레벨</span>
  <div class="hots-talent-icon-wrapper" aria-label="로보고블린&#xa;(R - 레벨 10)&#xA;일반 공격력, 방어력, 이동 속도 증가" data-microtip-position="top" role="tooltip">
    <img class="hots-talent-icon" src="http://i2.ruliweb.com/img/18/07/02/16459569c9519dc2c.png" alt="로보고블린 (R - 레벨 10)" data-hero-id="Tinker" data-is-ptr="" data-talent-level="10" data-talent-index="0">
  </div>
  <div class="hots-talent-icon-wrapper" aria-label="중력폭탄 3000&#xa;(R - 레벨 10)&#xA;적들을 끌어당기며 피해를 줌" data-microtip-position="top" role="tooltip">
    <img class="hots-talent-icon" src="http://i3.ruliweb.com/img/18/07/02/1645956906119dc2c.png" alt="중력폭탄 3000 (R - 레벨 10)" data-hero-id="Tinker" data-is-ptr="" data-talent-level="10" data-talent-index="1">
  </div>
  <div class="hots-talentset__group-buttonset">
    <input type="button" class="hots-talentset__group-add-all" data-hero-id="Tinker" data-is-ptr="" data-talent-level="10" value="모두 넣기">
  </div>
</li>
<li class="hots-talentset__group"><span class="hots-talentset__group-title">13레벨</span>
  <div class="hots-talent-icon-wrapper" aria-label="E-848 차원 절단기&#xa;(능력 강화 (W) - 레벨 13)&#xA;죽이는 레이저가 적 무력화" data-microtip-position="top" role="tooltip">
    <img class="hots-talent-icon" src="http://i3.ruliweb.com/img/18/07/02/1645956889519dc2c.png" alt="E-848 차원 절단기 (능력 강화 (W) - 레벨 13)" data-hero-id="Tinker" data-is-ptr="" data-talent-level="13" data-talent-index="0">
  </div>
  <div class="hots-talent-icon-wrapper" aria-label="고블린 핵융합&#xa;(능력 강화 (W) - 레벨 13)&#xA;죽이는 레이저 공격력 증가" data-microtip-position="top" role="tooltip">
    <img class="hots-talent-icon" src="http://i3.ruliweb.com/img/18/07/02/16459568c7519dc2c.png" alt="고블린 핵융합 (능력 강화 (W) - 레벨 13)" data-hero-id="Tinker" data-is-ptr="" data-talent-level="13" data-talent-index="1">
  </div>
  <div class="hots-talent-icon-wrapper" aria-label="특대형 폭탄&#xa;(능력 강화 (E) - 레벨 13)&#xA;기절 또는 이동 불가 시 터진다늄 폭탄 시전" data-microtip-position="top" role="tooltip">
    <img class="hots-talent-icon" src="http://i3.ruliweb.com/img/18/07/02/1645956af9a19dc2c.png" alt="특대형 폭탄 (능력 강화 (E) - 레벨 13)" data-hero-id="Tinker" data-is-ptr="" data-talent-level="13" data-talent-index="2">
  </div>
  <div class="hots-talentset__group-buttonset">
    <input type="button" class="hots-talentset__group-add-all" data-hero-id="Tinker" data-is-ptr="" data-talent-level="13" value="모두 넣기">
  </div>
</li>
<li class="hots-talentset__group"><span class="hots-talentset__group-title">16레벨</span>
  <div class="hots-talent-icon-wrapper" aria-label="포탑 비축&#xa;(능력 강화 (Q) - 레벨 16)&#xA;잘나가! 포탑 충전 개수 증가" data-microtip-position="top" role="tooltip">
    <img class="hots-talent-icon" src="http://i2.ruliweb.com/img/18/07/02/1645956a00919dc2c.png" alt="포탑 비축 (능력 강화 (Q) - 레벨 16)" data-hero-id="Tinker" data-is-ptr="" data-talent-level="16" data-talent-index="0">
  </div>
  <div class="hots-talent-icon-wrapper" aria-label="완벽한 설계도&#xa;(능력 강화 (Q) - 레벨 16)&#xA;잘나가! 포탑 사거리 증가" data-microtip-position="top" role="tooltip">
    <img class="hots-talent-icon" src="http://i2.ruliweb.com/img/18/07/02/1645956a40719dc2c.png" alt="완벽한 설계도 (능력 강화 (Q) - 레벨 16)" data-hero-id="Tinker" data-is-ptr="" data-talent-level="16" data-talent-index="1">
  </div>
  <div class="hots-talent-icon-wrapper" aria-label="번갯불에 폭탄 구워먹기&#xa;(능력 강화 (E) - 레벨 16)&#xA;터진다늄 폭탄 2회 충전 가능" data-microtip-position="top" role="tooltip">
    <img class="hots-talent-icon" src="http://i3.ruliweb.com/img/18/07/02/1645956af9a19dc2c.png" alt="번갯불에 폭탄 구워먹기 (능력 강화 (E) - 레벨 16)" data-hero-id="Tinker" data-is-ptr="" data-talent-level="16" data-talent-index="2">
  </div>
  <div class="hots-talentset__group-buttonset">
    <input type="button" class="hots-talentset__group-add-all" data-hero-id="Tinker" data-is-ptr="" data-talent-level="16" value="모두 넣기">
  </div>
</li>
<li class="hots-talentset__group"><span class="hots-talentset__group-title">20레벨</span>
  <div class="hots-talent-icon-wrapper" aria-label="기계왕&#xa;(능력 강화 (R) - 레벨 20)&#xA;일반 공격력 및 방어력 증가" data-microtip-position="top" role="tooltip">
    <img class="hots-talent-icon" src="http://i2.ruliweb.com/img/18/07/02/16459569c9519dc2c.png" alt="기계왕 (능력 강화 (R) - 레벨 20)" data-hero-id="Tinker" data-is-ptr="" data-talent-level="20" data-talent-index="0">
  </div>
  <div class="hots-talent-icon-wrapper" aria-label="휴대용 블랙홀&#xa;(능력 강화 (R) - 레벨 20)&#xA;중력폭탄 반경 및 공격력 증가" data-microtip-position="top" role="tooltip">
    <img class="hots-talent-icon" src="http://i3.ruliweb.com/img/18/07/02/1645956906119dc2c.png" alt="휴대용 블랙홀 (능력 강화 (R) - 레벨 20)" data-hero-id="Tinker" data-is-ptr="" data-talent-level="20" data-talent-index="1">
  </div>
  <div class="hots-talent-icon-wrapper" aria-label="잘나가고 죽이는 레이저&#xa;(능력 강화 (W) - 레벨 20)&#xA;잘나가! 포탑이 죽이는 레이저 발사" data-microtip-position="top" role="tooltip">
    <img class="hots-talent-icon" src="http://i3.ruliweb.com/img/18/07/02/1645956889519dc2c.png" alt="잘나가고 죽이는 레이저 (능력 강화 (W) - 레벨 20)" data-hero-id="Tinker" data-is-ptr="" data-talent-level="20" data-talent-index="2">
  </div>
  <div class="hots-talent-icon-wrapper" aria-label="하늘에서 고철이 비처럼 내려와&#xa;(사용 효과 - 레벨 20)&#xA;사용 시 고철 생성" data-microtip-position="top" role="tooltip">
    <img class="hots-talent-icon" src="http://i1.ruliweb.com/img/18/07/02/1645956944819dc2c.png" alt="하늘에서 고철이 비처럼 내려와 (사용 효과 - 레벨 20)" data-hero-id="Tinker" data-is-ptr="" data-talent-level="20" data-talent-index="3">
  </div>
  <div class="hots-talentset__group-buttonset">
    <input type="button" class="hots-talentset__group-add-all" data-hero-id="Tinker" data-is-ptr="" data-talent-level="20" value="모두 넣기">
  </div>
</li>

`

exports['HotsDialog.renderers Inserted templates generates hero info table correctly 1'] = `
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-hero-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #426;border-image:linear-gradient(#135,#426) 1;background:#101;color:#ffd;line-HEIGHT:normal">
  <summary style="float:left;padding:4px;WIDTH:64px;HEIGHT:64px;background:url(http://i2.ruliweb.com/img/18/06/14/163fc227f7919dc2c.png) center/cover no-repeat content-box" title="[클릭하여 접기/펼치기] 피닉스 - 원거리 암살자"></summary>

  <section style="float:left;background:linear-gradient(#214,#102);box-sizing:border-box;padding:1em;WIDTH:calc(50em - 64px - 8px);max-WIDTH:calc(100% - 64px - 8px);min-HEIGHT:calc(64px + 8px)">
    <div style="display:flex">
      <div style="flex:none;align-self:center;margin-right:.5em;WIDTH:2em;HEIGHT:2em;text-indent:100%;white-space:nowrap;overflow:hidden;background:url(http://i3.ruliweb.com/img/18/11/14/1670ecc22fe19dc2c.png) 20% 0/cover" title="스타크래프트">스타크래프트</div>
      <h2 style="font-size:1.5em;text-shadow:0 0 1em #09f;margin:0">피닉스</h2>
    </div>
    <div style="font-size:1.2em;color:#6cf"><b>원거리 암살자</b></div>
  </section>

  <section style="background:linear-gradient(#214,#102);padding:.5em;clear:both;box-sizing:border-box;WIDTH:50em;max-WIDTH:100%;border-top:1px solid #426">
    <div style="display:flex">
      <h3 style="margin:0;flex:0 2 5em;align-self:center;display:block;min-WIDTH:3em;font-size:1.2em;text-shadow:0 0 1em #09f;text-align:center">고유 능력</h3>
      <div style="flex:1 30em;WIDTH:5em;display:flex;flex-wrap:wrap;align-items:flex-end;padding:5px 5px 0 0;overflow:auto">
<details style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf;margin:0 0 5px 5px;border-image:linear-gradient(#8df,#ccd) 1">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/1645954600319dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 고유 능력 - 보호막 축전기"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">보호막 축전기</b>
        
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <b style="display:inline-block">고유 능력</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      790(+4%)의 피해를 흡수하는 보호막을 영구히 얻습니다. 5초 동안 피해를 받지 않으면 초당 79(+4%)의 보호막이 재생됩니다.
    </div>
    
  </div>
</details>
      </div>
    </div>
    <div style="display:flex">
      <h3 style="margin:0;flex:0 2 5em;align-self:center;display:block;min-WIDTH:3em;font-size:1.2em;text-shadow:0 0 1em #09f;text-align:center">일반 기술</h3>
      <div style="flex:1 30em;WIDTH:5em;display:flex;flex-wrap:wrap;align-items:flex-end;padding:5px 5px 0 0;overflow:auto">
<details style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf;margin:0 0 5px 5px;border-image:linear-gradient(#8df,#ccd) 1">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/1645954582b19dc2c.png) center/cover" title="[클릭하여 접기/펼치기] Q - 플라스마 절단기"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">플라스마 절단기</b>
        
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <b style="display:inline-block">Q</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      대상 위치에 광선을 발사합니다. 광선은 피닉스를 중심으로 주위를 원형으로 두 번 돌며 적에게 140(+4%)의 피해를 주고 4초 동안 25% 느려지게 합니다.<br>
<br><span style="padding-left:1.5em;color:#ddd;background:url(http://i2.ruliweb.com/img/18/07/23/164c2a1709319dc2c.png) 0/1.3em no-repeat"><b>재사용 대기시간</b> 12초</span>
<br><span style="padding-left:1.5em;color:#d90;background:url(http://i3.ruliweb.com/img/18/07/07/164748d2b0519dc2c.png) 0/1.3em no-repeat"><b>회전 반경</b> 1.5 ~ 6 <b>너비</b> 0.7 <b>회전 시간</b> 1.5초 </span>

    </div>
    
  </div>
</details>
<details style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf;margin:0 0 5px 5px;border-image:linear-gradient(#8df,#ccd) 1">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i3.ruliweb.com/img/18/07/02/1645954738019dc2c.png) center/cover" title="[클릭하여 접기/펼치기] W - 무기 모드: 연발포"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">무기 모드: 연발포</b>
        
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <b style="display:inline-block">W</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      공격 속도가 150% 증가합니다.<br><br>사용하면 <span style="color: #00ff90">무기 모드: 위상 폭탄</span>으로 전환하여 일반 공격의 공격력 및 사거리가 증가하고 방사 피해를 주도록 변경됩니다.
    </div>
    
  </div>
</details>
<details style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf;margin:0 0 5px 5px;border-image:linear-gradient(#8df,#ccd) 1">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/16459546f9219dc2c.png) center/cover" title="[클릭하여 접기/펼치기] W - 무기 모드: 위상 폭탄"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">무기 모드: 위상 폭탄</b>
        
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <b style="display:inline-block">W</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      일반 공격의 사거리가 1.25 증가하고 25%의 추가 피해를 주며 대상 주위에 방사 피해를 줍니다.<br><br>사용하면 <span style="color: #00ff90">무기 모드: 연발포</span>로 전환하여 공격 속도가 증가합니다.
    </div>
    
  </div>
</details>
<details style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf;margin:0 0 5px 5px;border-image:linear-gradient(#8df,#ccd) 1">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/16459546bc719dc2c.png) center/cover" title="[클릭하여 접기/펼치기] E - 차원이동"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">차원이동</b>
        
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <b style="display:inline-block">E</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      대상 위치로 순간이동합니다. 0.5초 후에 이동하며, 이동 후 0.75초 후에 도착합니다.<br>
<br><span style="padding-left:1.5em;color:#ddd;background:url(http://i2.ruliweb.com/img/18/07/23/164c2a1709319dc2c.png) 0/1.3em no-repeat"><b>재사용 대기시간</b> 17초</span>
<br><span style="padding-left:1.5em;color:#d90;background:url(http://i3.ruliweb.com/img/18/07/07/164748d2b0519dc2c.png) 0/1.3em no-repeat"><b>사거리</b> 9 </span>

    </div>
    
  </div>
</details>
      </div>
    </div>
    <div style="display:flex">
      <h3 style="margin:0;flex:0 2 5em;align-self:center;display:block;min-WIDTH:3em;font-size:1.2em;text-shadow:0 0 1em #09f;text-align:center">궁극기</h3>
      <div style="flex:1 30em;WIDTH:5em;display:flex;flex-wrap:wrap;align-items:flex-end;padding:5px 5px 0 0;overflow:auto">
<details style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf;margin:0 0 5px 5px;border-image:linear-gradient(#8df,#ccd) 1">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/16459545c1319dc2c.png) center/cover" title="[클릭하여 접기/펼치기] R - 정화 개시"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">정화 개시</b>
        
      </div>
      
       <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #da7;color:#da7"> 
      
      
        <b style="display:inline-block">R</b>
      
       </div>
      
      
    </div>
    <div style="color:#bcc">
      
      1.5초 동안 정신을 집중하여 전방에 호를 그리듯 적 영웅을 포착합니다. 정신 집중이 끝나면 포착한 적 영웅들에게 각각 5발의 유도탄을 발사해 각각 89(+4%)의 피해를 줍니다. 느려진 대상에게는 50%의 추가 피해를 줍니다.<br>
<br><span style="padding-left:1.5em;color:#ddd;background:url(http://i2.ruliweb.com/img/18/07/23/164c2a1709319dc2c.png) 0/1.3em no-repeat"><b>재사용 대기시간</b> 90초</span>
<br><span style="padding-left:1.5em;color:#d90;background:url(http://i3.ruliweb.com/img/18/07/07/164748d2b0519dc2c.png) 0/1.3em no-repeat"><b>포착 반경</b> 13.25 <b>중심각</b> 180° </span>

    </div>
    
  </div>
</details>
<details style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf;margin:0 0 5px 5px;border-image:linear-gradient(#8df,#ccd) 1">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i1.ruliweb.com/img/18/07/02/1645954544319dc2c.png) center/cover" title="[클릭하여 접기/펼치기] R - 행성 분열기"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">행성 분열기</b>
        
      </div>
      
       <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #da7;color:#da7"> 
      
      
        <b style="display:inline-block">R</b>
      
       </div>
      
      
    </div>
    <div style="color:#bcc">
      
      0.5초 후, 전장을 가로지르는 광선을 발사하여 구조물이 아닌 적에게 4초 동안 0.25초마다 116(+4%)의 피해를 줍니다.<br>
<br><span style="padding-left:1.5em;color:#ddd;background:url(http://i2.ruliweb.com/img/18/07/23/164c2a1709319dc2c.png) 0/1.3em no-repeat"><b>재사용 대기시간</b> 100초</span>
<br><span style="padding-left:1.5em;color:#d90;background:url(http://i3.ruliweb.com/img/18/07/07/164748d2b0519dc2c.png) 0/1.3em no-repeat"><b>사거리</b> ∞ <b>너비</b> 2 </span>

    </div>
    
  </div>
</details>
      </div>
    </div>
  </section>

  <section style="background:linear-gradient(#214,#102);padding:.5em 0 0 .5em;box-sizing:border-box;WIDTH:50em;max-WIDTH:100%;border-top:1px solid #426">
    <table style="display:inline-table;margin:0 .5em .5em 0;border:2px solid #76d;border-collapse:collapse;background:#112;text-align:center">
      <thead style="background:#224">
        <tr>
          <th style="border:1px solid #76d;padding:.4em;color:#6ce;font:bold 1em sans-serif">능력치</th>
          <th style="border:1px solid #76d;padding:.4em;color:#6ce;font:bold 1em sans-serif">1레벨 (성장률)</th>
          <th style="border:1px solid #76d;padding:.4em;color:#6ce;font:bold 1em sans-serif">20레벨</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border:1px solid #76d;color:#efe;font:1em sans-serif;padding:.4em .4em .4em 2em;text-align:initial;background:url(http://i3.ruliweb.com/img/18/07/19/164b154ffe819dc2c.png) .4em/1.3em no-repeat">생명력</td>
          
          <td style="border:1px solid #76d;padding:.4em;color:#efe;font:1em sans-serif">1186 (+4%)</td>
          
          <td style="border:1px solid #76d;padding:.4em;color:#efe;font:1em sans-serif">2498</td>
        </tr>
        <tr>
          <td style="border:1px solid #76d;color:#efe;font:1em sans-serif;padding:.4em .4em .4em 2em;text-align:initial;background:url(http://i3.ruliweb.com/img/18/07/19/164b154ffe819dc2c.png) .4em/1.3em no-repeat">생명력 재생</td>
          
          <td style="border:1px solid #76d;padding:.4em;color:#efe;font:1em sans-serif">2.474 (+4%)</td>
          
          <td style="border:1px solid #76d;padding:.4em;color:#efe;font:1em sans-serif">5.213</td>
        </tr>
        <tr>
          <td style="border:1px solid #76d;color:#efe;font:1em sans-serif;padding:.4em .4em .4em 2em;text-align:initial;background:url(http://i2.ruliweb.com/img/18/07/21/164bb97668719dc2c.png) .4em/1.3em no-repeat">보호막</td>
          
          <td style="border:1px solid #76d;padding:.4em;color:#efe;font:1em sans-serif">790 (+4%)</td>
          
          <td style="border:1px solid #76d;padding:.4em;color:#efe;font:1em sans-serif">1665</td>
        </tr>
        <tr>
          <td style="border:1px solid #76d;color:#efe;font:1em sans-serif;padding:.4em .4em .4em 2em;text-align:initial;background:url(http://i2.ruliweb.com/img/18/07/07/164748d2a3b19dc2c.png) .4em/1.3em no-repeat">공격력 (연발포)</td>
          
          <td style="border:1px solid #76d;padding:.4em;color:#efe;font:1em sans-serif">86 (+4%)</td>
          
          <td style="border:1px solid #76d;padding:.4em;color:#efe;font:1em sans-serif">182</td>
        </tr>
        <tr>
          <td style="border:1px solid #76d;color:#efe;font:1em sans-serif;padding:.4em .4em .4em 2em;text-align:initial;background:url(http://i2.ruliweb.com/img/18/07/07/164748d2a3b19dc2c.png) .4em/1.3em no-repeat">공격력 (위상 폭탄)</td>
          
          <td style="border:1px solid #76d;padding:.4em;color:#efe;font:1em sans-serif">108 (+4%)</td>
          
          <td style="border:1px solid #76d;padding:.4em;color:#efe;font:1em sans-serif">227</td>
        </tr>
        <tr>
          <td style="border:1px solid #76d;color:#efe;font:1em sans-serif;padding:.4em .4em .4em 2em;text-align:initial;background:url(http://i1.ruliweb.com/img/18/07/07/164748d2bce19dc2c.png) .4em/1.3em no-repeat">공격 속도 (연발포)</td>
          <td colspan="2" style="border:1px solid #76d;padding:.4em;color:#efe;font:1em sans-serif">1.852</td>
          
          
          
        </tr>
        <tr>
          <td style="border:1px solid #76d;color:#efe;font:1em sans-serif;padding:.4em .4em .4em 2em;text-align:initial;background:url(http://i1.ruliweb.com/img/18/07/07/164748d2bce19dc2c.png) .4em/1.3em no-repeat">공격 속도 (위상 폭탄)</td>
          <td colspan="2" style="border:1px solid #76d;padding:.4em;color:#efe;font:1em sans-serif">0.741</td>
          
          
          
        </tr>
        <tr>
          <td style="border:1px solid #76d;color:#efe;font:1em sans-serif;padding:.4em .4em .4em 2em;text-align:initial;background:url(http://i3.ruliweb.com/img/18/07/07/164748d2b0519dc2c.png) .4em/1.3em no-repeat">사거리 (연발포)</td>
          <td colspan="2" style="border:1px solid #76d;padding:.4em;color:#efe;font:1em sans-serif">5.0</td>
          
          
          
        </tr>
        <tr>
          <td style="border:1px solid #76d;color:#efe;font:1em sans-serif;padding:.4em .4em .4em 2em;text-align:initial;background:url(http://i3.ruliweb.com/img/18/07/07/164748d2b0519dc2c.png) .4em/1.3em no-repeat">사거리 (위상 폭탄)</td>
          <td colspan="2" style="border:1px solid #76d;padding:.4em;color:#efe;font:1em sans-serif">6.25</td>
          
          
          
        </tr>
        <tr>
          <td style="border:1px solid #76d;color:#efe;font:1em sans-serif;padding:.4em .4em .4em 2em;text-align:initial;background:url(http://i3.ruliweb.com/img/18/07/07/164748d2c9219dc2c.png) .4em/1.3em no-repeat">이동 속도</td>
          <td colspan="2" style="border:1px solid #76d;padding:.4em;color:#efe;font:1em sans-serif">4.3984</td>
          
          
          
        </tr>
      </tbody>
    </table>
  </section>

  <footer style="text-align:right;font-size:.8em;color:#cca;padding-right:1em"><i>패치 HotS version (test data)</i></footer>
</details><details data-ruliweb-hots-version="app version string" class="ruliweb-hots-hero-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #426;border-image:linear-gradient(#135,#426) 1;background:#101;color:#ffd;line-HEIGHT:normal">
  <summary style="float:left;padding:4px;WIDTH:64px;HEIGHT:64px;background:url(http://i2.ruliweb.com/img/18/06/14/163fc227f7919dc2c.png) center/cover no-repeat content-box" title="[클릭하여 접기/펼치기] 피닉스 - 원거리 암살자"></summary>

  <section style="float:left;background:linear-gradient(#214,#102);box-sizing:border-box;padding:1em;WIDTH:calc(50em - 64px - 8px);max-WIDTH:calc(100% - 64px - 8px);min-HEIGHT:calc(64px + 8px)">
    <div style="display:flex">
      <div style="flex:none;align-self:center;margin-right:.5em;WIDTH:2em;HEIGHT:2em;text-indent:100%;white-space:nowrap;overflow:hidden;background:url(http://i3.ruliweb.com/img/18/11/14/1670ecc22fe19dc2c.png) 20% 0/cover" title="스타크래프트">스타크래프트</div>
      <h2 style="font-size:1.5em;text-shadow:0 0 1em #09f;margin:0">피닉스</h2>
    </div>
    <div style="font-size:1.2em;color:#6cf"><b>원거리 암살자</b></div>
  </section>

  <section style="background:linear-gradient(#214,#102);padding:.5em;clear:both;box-sizing:border-box;WIDTH:50em;max-WIDTH:100%;border-top:1px solid #426">
    <div style="display:flex">
      <h3 style="margin:0;flex:0 2 5em;align-self:center;display:block;min-WIDTH:3em;font-size:1.2em;text-shadow:0 0 1em #09f;text-align:center">고유 능력</h3>
      <div style="flex:1 30em;WIDTH:5em;display:flex;flex-wrap:wrap;align-items:flex-end;padding:5px 5px 0 0;overflow:auto">
<details style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf;margin:0 0 5px 5px;border-image:linear-gradient(#8df,#ccd) 1">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/1645954600319dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 고유 능력 - 보호막 축전기"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">보호막 축전기</b>
        
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <b style="display:inline-block">고유 능력</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      비전투 시 재생되는 보호막 영구히 획득
      
    </div>
    
  </div>
</details>
      </div>
    </div>
    <div style="display:flex">
      <h3 style="margin:0;flex:0 2 5em;align-self:center;display:block;min-WIDTH:3em;font-size:1.2em;text-shadow:0 0 1em #09f;text-align:center">일반 기술</h3>
      <div style="flex:1 30em;WIDTH:5em;display:flex;flex-wrap:wrap;align-items:flex-end;padding:5px 5px 0 0;overflow:auto">
<details style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf;margin:0 0 5px 5px;border-image:linear-gradient(#8df,#ccd) 1">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/1645954582b19dc2c.png) center/cover" title="[클릭하여 접기/펼치기] Q - 플라스마 절단기"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">플라스마 절단기</b>
        
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <b style="display:inline-block">Q</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      주위를 원형으로 도는 광선을 발사하여 적에게 피해를 주고 느려지게 함
      
    </div>
    
  </div>
</details>
<details style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf;margin:0 0 5px 5px;border-image:linear-gradient(#8df,#ccd) 1">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i3.ruliweb.com/img/18/07/02/1645954738019dc2c.png) center/cover" title="[클릭하여 접기/펼치기] W - 무기 모드: 연발포"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">무기 모드: 연발포</b>
        
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <b style="display:inline-block">W</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      공격 속도 증가
      
    </div>
    
  </div>
</details>
<details style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf;margin:0 0 5px 5px;border-image:linear-gradient(#8df,#ccd) 1">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/16459546f9219dc2c.png) center/cover" title="[클릭하여 접기/펼치기] W - 무기 모드: 위상 폭탄"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">무기 모드: 위상 폭탄</b>
        
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <b style="display:inline-block">W</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      일반 공격력 및 일반 공격 사거리 증가, 일반 공격 시 방사 피해
      
    </div>
    
  </div>
</details>
<details style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf;margin:0 0 5px 5px;border-image:linear-gradient(#8df,#ccd) 1">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/16459546bc719dc2c.png) center/cover" title="[클릭하여 접기/펼치기] E - 차원이동"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">차원이동</b>
        
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <b style="display:inline-block">E</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      대상 위치로 순간이동
      
    </div>
    
  </div>
</details>
      </div>
    </div>
    <div style="display:flex">
      <h3 style="margin:0;flex:0 2 5em;align-self:center;display:block;min-WIDTH:3em;font-size:1.2em;text-shadow:0 0 1em #09f;text-align:center">궁극기</h3>
      <div style="flex:1 30em;WIDTH:5em;display:flex;flex-wrap:wrap;align-items:flex-end;padding:5px 5px 0 0;overflow:auto">
<details style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf;margin:0 0 5px 5px;border-image:linear-gradient(#8df,#ccd) 1">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/16459545c1319dc2c.png) center/cover" title="[클릭하여 접기/펼치기] R - 정화 개시"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">정화 개시</b>
        
      </div>
      
       <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #da7;color:#da7"> 
      
      
        <b style="display:inline-block">R</b>
      
       </div>
      
      
    </div>
    <div style="color:#bcc">
      목표 포착 후 유도탄 포화
      
    </div>
    
  </div>
</details>
<details style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf;margin:0 0 5px 5px;border-image:linear-gradient(#8df,#ccd) 1">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i1.ruliweb.com/img/18/07/02/1645954544319dc2c.png) center/cover" title="[클릭하여 접기/펼치기] R - 행성 분열기"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">행성 분열기</b>
        
      </div>
      
       <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #da7;color:#da7"> 
      
      
        <b style="display:inline-block">R</b>
      
       </div>
      
      
    </div>
    <div style="color:#bcc">
      전장을 가로지르는 광선 발사
      
    </div>
    
  </div>
</details>
      </div>
    </div>
  </section>


  <footer style="text-align:right;font-size:.8em;color:#cca;padding-right:1em"><i>패치 HotS version (test data)</i></footer>
</details><details data-ruliweb-hots-version="app version string" class="ruliweb-hots-hero-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #426;border-image:linear-gradient(#135,#426) 1;background:#101;color:#ffd;line-HEIGHT:normal">
  <summary style="float:left;padding:4px;WIDTH:64px;HEIGHT:64px;background:url(http://i3.ruliweb.com/img/18/06/14/163fc0e215b19dc2c.png) center/cover no-repeat content-box" title="[클릭하여 접기/펼치기] 렉사르 - 투사"></summary>

  <section style="float:left;background:linear-gradient(#214,#102);box-sizing:border-box;padding:1em;WIDTH:calc(50em - 64px - 8px);max-WIDTH:calc(100% - 64px - 8px);min-HEIGHT:calc(64px + 8px)">
    <div style="display:flex">
      <div style="flex:none;align-self:center;margin-right:.5em;WIDTH:2em;HEIGHT:2em;text-indent:100%;white-space:nowrap;overflow:hidden;background:url(http://i3.ruliweb.com/img/18/11/14/1670ecc22fe19dc2c.png) 60% 0/cover" title="워크래프트">워크래프트</div>
      <h2 style="font-size:1.5em;text-shadow:0 0 1em #09f;margin:0">렉사르</h2>
    </div>
    <div style="font-size:1.2em;color:#6cf"><b>투사</b></div>
  </section>

  <section style="background:linear-gradient(#214,#102);padding:.5em;clear:both;box-sizing:border-box;WIDTH:50em;max-WIDTH:100%;border-top:1px solid #426">
    <div style="display:flex">
      <h3 style="margin:0;flex:0 2 5em;align-self:center;display:block;min-WIDTH:3em;font-size:1.2em;text-shadow:0 0 1em #09f;text-align:center">고유 능력</h3>
      <div style="flex:1 30em;WIDTH:5em;display:flex;flex-wrap:wrap;align-items:flex-end;padding:5px 5px 0 0;overflow:auto">
<details style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf;margin:0 0 5px 5px;border-image:linear-gradient(#8df,#ccd) 1">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i1.ruliweb.com/img/18/07/08/164758eadfc19dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 고유 능력 - 미샤, 집중해!"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">미샤, 집중해!</b>
        
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <b style="display:inline-block">고유 능력</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      <b style="color: #0e8">지속 효과</b>: 미샤의 이동 속도가 15% 증가합니다.<br><br>미샤에게 특정 적을 공격하거나 특정 위치로 이동해 대기하라고 명령합니다.<br><br>렉사르를 대상으로 사용하면 미샤가 렉사르에게 돌아오며 이 동안 미샤의 이동 속도가 30% 추가로 증가합니다.<br><br>미샤를 대상으로 사용하면 현재 위치에 대기합니다.
    </div>
    
  </div>
</details>
      </div>
    </div>
    <div style="display:flex">
      <h3 style="margin:0;flex:0 2 5em;align-self:center;display:block;min-WIDTH:3em;font-size:1.2em;text-shadow:0 0 1em #09f;text-align:center">일반 기술</h3>
      <div style="flex:1 30em;WIDTH:5em;display:flex;flex-wrap:wrap;align-items:flex-end;padding:5px 5px 0 0;overflow:auto">
<details style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf;margin:0 0 5px 5px;border-image:linear-gradient(#8df,#ccd) 1">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i1.ruliweb.com/img/18/07/02/164595f2c2019dc2c.png) center/cover" title="[클릭하여 접기/펼치기] Q - 기백 날리기"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">기백 날리기</b>
        
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <b style="display:inline-block">Q</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      일직선상의 적들에게 147(+4%)의 피해를 주고, 2초 동안 30% 느려지게 합니다.<br>
<br><span style="padding-left:1.5em;color:#4be;background:url(http://i1.ruliweb.com/img/18/07/07/164741ab46719dc2c.png) .15em/1em no-repeat"><b>마나</b> 40</span>
<br><span style="padding-left:1.5em;color:#ddd;background:url(http://i2.ruliweb.com/img/18/07/23/164c2a1709319dc2c.png) 0/1.3em no-repeat"><b>재사용 대기시간</b> 7초</span>
<br><span style="padding-left:1.5em;color:#d90;background:url(http://i3.ruliweb.com/img/18/07/07/164748d2b0519dc2c.png) 0/1.3em no-repeat"><b>사거리</b> 9.7 <b>너비</b> 1.25 </span>

    </div>
    
  </div>
</details>
<details style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf;margin:0 0 5px 5px;border-image:linear-gradient(#8df,#ccd) 1">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/164595f298219dc2c.png) center/cover" title="[클릭하여 접기/펼치기] W - 미샤, 돌진!"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">미샤, 돌진!</b>
        
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <b style="display:inline-block">W</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      미샤가 일직선상으로 돌진해서 적들에게 61(+4%)의 피해를 주고 1.25초 동안 기절시킵니다.<br>
<br><span style="padding-left:1.5em;color:#4be;background:url(http://i1.ruliweb.com/img/18/07/07/164741ab46719dc2c.png) .15em/1em no-repeat"><b>마나</b> 45</span>
<br><span style="padding-left:1.5em;color:#ddd;background:url(http://i2.ruliweb.com/img/18/07/23/164c2a1709319dc2c.png) 0/1.3em no-repeat"><b>재사용 대기시간</b> 10초</span>
<br><span style="padding-left:1.5em;color:#d90;background:url(http://i3.ruliweb.com/img/18/07/07/164748d2b0519dc2c.png) 0/1.3em no-repeat"><b>사거리</b> 7.5 <b>너비</b> 2.5 </span>

    </div>
    
  </div>
</details>
<details style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf;margin:0 0 5px 5px;border-image:linear-gradient(#8df,#ccd) 1">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/164595f27fe19dc2c.png) center/cover" title="[클릭하여 접기/펼치기] E - 야수 치료"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">야수 치료</b>
        
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <b style="display:inline-block">E</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      미샤의 생명력을 5초에 걸쳐 743(+4%) 회복시킵니다.<br>
<br><span style="padding-left:1.5em;color:#4be;background:url(http://i1.ruliweb.com/img/18/07/07/164741ab46719dc2c.png) .15em/1em no-repeat"><b>마나</b> 55</span>
<br><span style="padding-left:1.5em;color:#ddd;background:url(http://i2.ruliweb.com/img/18/07/23/164c2a1709319dc2c.png) 0/1.3em no-repeat"><b>재사용 대기시간</b> 10초</span>

    </div>
    
  </div>
</details>
      </div>
    </div>
    <div style="display:flex">
      <h3 style="margin:0;flex:0 2 5em;align-self:center;display:block;min-WIDTH:3em;font-size:1.2em;text-shadow:0 0 1em #09f;text-align:center">궁극기</h3>
      <div style="flex:1 30em;WIDTH:5em;display:flex;flex-wrap:wrap;align-items:flex-end;padding:5px 5px 0 0;overflow:auto">
<details style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf;margin:0 0 5px 5px;border-image:linear-gradient(#8df,#ccd) 1">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i1.ruliweb.com/img/18/07/02/164595f234119dc2c.png) center/cover" title="[클릭하여 접기/펼치기] R - 야수의 격노"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">야수의 격노</b>
        
      </div>
      
       <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #da7;color:#da7"> 
      
      
        <b style="display:inline-block">R</b>
      
       </div>
      
      
    </div>
    <div style="color:#bcc">
      
      미샤의 일반 공격력이 12초 동안 150% 증가합니다.<br>
<br><span style="padding-left:1.5em;color:#4be;background:url(http://i1.ruliweb.com/img/18/07/07/164741ab46719dc2c.png) .15em/1em no-repeat"><b>마나</b> 75</span>
<br><span style="padding-left:1.5em;color:#ddd;background:url(http://i2.ruliweb.com/img/18/07/23/164c2a1709319dc2c.png) 0/1.3em no-repeat"><b>재사용 대기시간</b> 50초</span>

    </div>
    
  </div>
</details>
<details style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf;margin:0 0 5px 5px;border-image:linear-gradient(#8df,#ccd) 1">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/164595f2f3319dc2c.png) center/cover" title="[클릭하여 접기/펼치기] R - 멧돼지를 풀어라"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">멧돼지를 풀어라</b>
        
      </div>
      
       <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #da7;color:#da7"> 
      
      
        <b style="display:inline-block">R</b>
      
       </div>
      
      
    </div>
    <div style="color:#bcc">
      
      모든 적 영웅을 추적하는 멧돼지 무리를 일정 방향으로 풀어 114(+4%)의 피해를 주고, 모습이 드러나게 하며, 5초 동안 40% 느려지게 합니다.<br>
<br><span style="padding-left:1.5em;color:#4be;background:url(http://i1.ruliweb.com/img/18/07/07/164741ab46719dc2c.png) .15em/1em no-repeat"><b>마나</b> 75</span>
<br><span style="padding-left:1.5em;color:#ddd;background:url(http://i2.ruliweb.com/img/18/07/23/164c2a1709319dc2c.png) 0/1.3em no-repeat"><b>재사용 대기시간</b> 60초</span>
<br><span style="padding-left:1.5em;color:#d90;background:url(http://i3.ruliweb.com/img/18/07/07/164748d2b0519dc2c.png) 0/1.3em no-repeat"><b>사거리</b> 25 <b>중심각</b> 50° </span>

    </div>
    
  </div>
</details>
      </div>
    </div>
  </section>

  <section style="background:linear-gradient(#214,#102);padding:.5em 0 0 .5em;box-sizing:border-box;WIDTH:50em;max-WIDTH:100%;border-top:1px solid #426">
    <table style="display:inline-table;margin:0 .5em .5em 0;border:2px solid #76d;border-collapse:collapse;background:#112;text-align:center">
      <thead style="background:#224">
        <tr>
          <th colspan="3" style="border:1px solid #76d;padding:.4em;font:bold 1em sans-serif;color:#ffd;text-shadow:0 0 1em #09f">렉사르</th>
        </tr>
        <tr>
          <th style="border:1px solid #76d;padding:.4em;color:#6ce;font:bold 1em sans-serif">능력치</th>
          <th style="border:1px solid #76d;padding:.4em;color:#6ce;font:bold 1em sans-serif">1레벨 (성장률)</th>
          <th style="border:1px solid #76d;padding:.4em;color:#6ce;font:bold 1em sans-serif">20레벨</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border:1px solid #76d;color:#efe;font:1em sans-serif;padding:.4em .4em .4em 2em;text-align:initial;background:url(http://i3.ruliweb.com/img/18/07/19/164b154ffe819dc2c.png) .4em/1.3em no-repeat">생명력</td>
          
          <td style="border:1px solid #76d;padding:.4em;color:#efe;font:1em sans-serif">1794 (+4%)</td>
          
          <td style="border:1px solid #76d;padding:.4em;color:#efe;font:1em sans-serif">3780</td>
        </tr>
        <tr>
          <td style="border:1px solid #76d;color:#efe;font:1em sans-serif;padding:.4em .4em .4em 2em;text-align:initial;background:url(http://i3.ruliweb.com/img/18/07/19/164b154ffe819dc2c.png) .4em/1.3em no-repeat">생명력 재생</td>
          
          <td style="border:1px solid #76d;padding:.4em;color:#efe;font:1em sans-serif">3.733 (+4%)</td>
          
          <td style="border:1px solid #76d;padding:.4em;color:#efe;font:1em sans-serif">7.866</td>
        </tr>
        <tr>
          <td style="border:1px solid #76d;color:#efe;font:1em sans-serif;padding:.4em .4em .4em 2em;text-align:initial;background:url(http://i3.ruliweb.com/img/18/07/19/164b15500ad19dc2c.png) .4em/1.3em no-repeat">마나</td>
          
          
          <td style="border:1px solid #76d;padding:.4em;color:#efe;font:1em sans-serif">500 (+10)</td>
          <td style="border:1px solid #76d;padding:.4em;color:#efe;font:1em sans-serif">690</td>
        </tr>
        <tr>
          <td style="border:1px solid #76d;color:#efe;font:1em sans-serif;padding:.4em .4em .4em 2em;text-align:initial;background:url(http://i3.ruliweb.com/img/18/07/19/164b15500ad19dc2c.png) .4em/1.3em no-repeat">마나 재생</td>
          
          
          <td style="border:1px solid #76d;padding:.4em;color:#efe;font:1em sans-serif">3 (+0.098)</td>
          <td style="border:1px solid #76d;padding:.4em;color:#efe;font:1em sans-serif">4.862</td>
        </tr>
        <tr>
          <td style="border:1px solid #76d;color:#efe;font:1em sans-serif;padding:.4em .4em .4em 2em;text-align:initial;background:url(http://i2.ruliweb.com/img/18/07/07/164748d2a3b19dc2c.png) .4em/1.3em no-repeat">공격력</td>
          
          <td style="border:1px solid #76d;padding:.4em;color:#efe;font:1em sans-serif">103 (+4%)</td>
          
          <td style="border:1px solid #76d;padding:.4em;color:#efe;font:1em sans-serif">217</td>
        </tr>
        <tr>
          <td style="border:1px solid #76d;color:#efe;font:1em sans-serif;padding:.4em .4em .4em 2em;text-align:initial;background:url(http://i1.ruliweb.com/img/18/07/07/164748d2bce19dc2c.png) .4em/1.3em no-repeat">공격 속도</td>
          <td colspan="2" style="border:1px solid #76d;padding:.4em;color:#efe;font:1em sans-serif">0.87</td>
          
          
          
        </tr>
        <tr>
          <td style="border:1px solid #76d;color:#efe;font:1em sans-serif;padding:.4em .4em .4em 2em;text-align:initial;background:url(http://i3.ruliweb.com/img/18/07/07/164748d2b0519dc2c.png) .4em/1.3em no-repeat">사거리</td>
          <td colspan="2" style="border:1px solid #76d;padding:.4em;color:#efe;font:1em sans-serif">5.5</td>
          
          
          
        </tr>
        <tr>
          <td style="border:1px solid #76d;color:#efe;font:1em sans-serif;padding:.4em .4em .4em 2em;text-align:initial;background:url(http://i3.ruliweb.com/img/18/07/07/164748d2c9219dc2c.png) .4em/1.3em no-repeat">이동 속도</td>
          <td colspan="2" style="border:1px solid #76d;padding:.4em;color:#efe;font:1em sans-serif">4.3984</td>
          
          
          
        </tr>
      </tbody>
    </table>
    <table style="display:inline-table;margin:0 .5em .5em 0;border:2px solid #76d;border-collapse:collapse;background:#112;text-align:center">
      <thead style="background:#224">
        <tr>
          <th colspan="3" style="border:1px solid #76d;padding:.4em;font:bold 1em sans-serif;color:#ffd;text-shadow:0 0 1em #09f">미샤</th>
        </tr>
        <tr>
          <th style="border:1px solid #76d;padding:.4em;color:#6ce;font:bold 1em sans-serif">능력치</th>
          <th style="border:1px solid #76d;padding:.4em;color:#6ce;font:bold 1em sans-serif">1레벨 (성장률)</th>
          <th style="border:1px solid #76d;padding:.4em;color:#6ce;font:bold 1em sans-serif">20레벨</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border:1px solid #76d;color:#efe;font:1em sans-serif;padding:.4em .4em .4em 2em;text-align:initial;background:url(http://i3.ruliweb.com/img/18/07/19/164b154ffe819dc2c.png) .4em/1.3em no-repeat">생명력</td>
          
          <td style="border:1px solid #76d;padding:.4em;color:#efe;font:1em sans-serif">1832 (+4%)</td>
          
          <td style="border:1px solid #76d;padding:.4em;color:#efe;font:1em sans-serif">3861</td>
        </tr>
        <tr>
          <td style="border:1px solid #76d;color:#efe;font:1em sans-serif;padding:.4em .4em .4em 2em;text-align:initial;background:url(http://i3.ruliweb.com/img/18/07/19/164b154ffe819dc2c.png) .4em/1.3em no-repeat">생명력 재생</td>
          
          <td style="border:1px solid #76d;padding:.4em;color:#efe;font:1em sans-serif">3.819 (+4%)</td>
          
          <td style="border:1px solid #76d;padding:.4em;color:#efe;font:1em sans-serif">8.045</td>
        </tr>
        <tr>
          <td style="border:1px solid #76d;color:#efe;font:1em sans-serif;padding:.4em .4em .4em 2em;text-align:initial;background:url(http://i2.ruliweb.com/img/18/07/07/164748d2a3b19dc2c.png) .4em/1.3em no-repeat">공격력</td>
          
          <td style="border:1px solid #76d;padding:.4em;color:#efe;font:1em sans-serif">64 (+4%)</td>
          
          <td style="border:1px solid #76d;padding:.4em;color:#efe;font:1em sans-serif">136</td>
        </tr>
        <tr>
          <td style="border:1px solid #76d;color:#efe;font:1em sans-serif;padding:.4em .4em .4em 2em;text-align:initial;background:url(http://i1.ruliweb.com/img/18/07/07/164748d2bce19dc2c.png) .4em/1.3em no-repeat">공격 속도</td>
          <td colspan="2" style="border:1px solid #76d;padding:.4em;color:#efe;font:1em sans-serif">0.833</td>
          
          
          
        </tr>
        <tr>
          <td style="border:1px solid #76d;color:#efe;font:1em sans-serif;padding:.4em .4em .4em 2em;text-align:initial;background:url(http://i3.ruliweb.com/img/18/07/07/164748d2b0519dc2c.png) .4em/1.3em no-repeat">사거리</td>
          <td colspan="2" style="border:1px solid #76d;padding:.4em;color:#efe;font:1em sans-serif">1.5</td>
          
          
          
        </tr>
        <tr>
          <td style="border:1px solid #76d;color:#efe;font:1em sans-serif;padding:.4em .4em .4em 2em;text-align:initial;background:url(http://i3.ruliweb.com/img/18/07/07/164748d2c9219dc2c.png) .4em/1.3em no-repeat">이동 속도</td>
          <td colspan="2" style="border:1px solid #76d;padding:.4em;color:#efe;font:1em sans-serif">5.0582</td>
          
          
          
        </tr>
      </tbody>
    </table>
  </section>

  <footer style="text-align:right;font-size:.8em;color:#cca;padding-right:1em"><i>패치 HotS version (test data)</i></footer>
</details><details data-ruliweb-hots-version="app version string" class="ruliweb-hots-hero-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #426;border-image:linear-gradient(#135,#426) 1;background:#101;color:#ffd;line-HEIGHT:normal">
  <summary style="float:left;padding:4px;WIDTH:64px;HEIGHT:64px;background:url(http://i3.ruliweb.com/img/18/06/14/163fc0e215b19dc2c.png) center/cover no-repeat content-box" title="[클릭하여 접기/펼치기] 렉사르 - 투사"></summary>

  <section style="float:left;background:linear-gradient(#214,#102);box-sizing:border-box;padding:1em;WIDTH:calc(50em - 64px - 8px);max-WIDTH:calc(100% - 64px - 8px);min-HEIGHT:calc(64px + 8px)">
    <div style="display:flex">
      <div style="flex:none;align-self:center;margin-right:.5em;WIDTH:2em;HEIGHT:2em;text-indent:100%;white-space:nowrap;overflow:hidden;background:url(http://i3.ruliweb.com/img/18/11/14/1670ecc22fe19dc2c.png) 60% 0/cover" title="워크래프트">워크래프트</div>
      <h2 style="font-size:1.5em;text-shadow:0 0 1em #09f;margin:0">렉사르</h2>
    </div>
    <div style="font-size:1.2em;color:#6cf"><b>투사</b></div>
  </section>

  <section style="background:linear-gradient(#214,#102);padding:.5em;clear:both;box-sizing:border-box;WIDTH:50em;max-WIDTH:100%;border-top:1px solid #426">
    <div style="display:flex">
      <h3 style="margin:0;flex:0 2 5em;align-self:center;display:block;min-WIDTH:3em;font-size:1.2em;text-shadow:0 0 1em #09f;text-align:center">고유 능력</h3>
      <div style="flex:1 30em;WIDTH:5em;display:flex;flex-wrap:wrap;align-items:flex-end;padding:5px 5px 0 0;overflow:auto">
<details style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf;margin:0 0 5px 5px;border-image:linear-gradient(#8df,#ccd) 1">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i1.ruliweb.com/img/18/07/08/164758eadfc19dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 고유 능력 - 미샤, 집중해!"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">미샤, 집중해!</b>
        
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <b style="display:inline-block">고유 능력</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      미샤에게 이동하거나 공격하라고 명령
      
    </div>
    
  </div>
</details>
      </div>
    </div>
    <div style="display:flex">
      <h3 style="margin:0;flex:0 2 5em;align-self:center;display:block;min-WIDTH:3em;font-size:1.2em;text-shadow:0 0 1em #09f;text-align:center">일반 기술</h3>
      <div style="flex:1 30em;WIDTH:5em;display:flex;flex-wrap:wrap;align-items:flex-end;padding:5px 5px 0 0;overflow:auto">
<details style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf;margin:0 0 5px 5px;border-image:linear-gradient(#8df,#ccd) 1">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i1.ruliweb.com/img/18/07/02/164595f2c2019dc2c.png) center/cover" title="[클릭하여 접기/펼치기] Q - 기백 날리기"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">기백 날리기</b>
        
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <b style="display:inline-block">Q</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      매를 날려 적들에게 피해를 주고 느려지게 함
      
    </div>
    
  </div>
</details>
<details style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf;margin:0 0 5px 5px;border-image:linear-gradient(#8df,#ccd) 1">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/164595f298219dc2c.png) center/cover" title="[클릭하여 접기/펼치기] W - 미샤, 돌진!"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">미샤, 돌진!</b>
        
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <b style="display:inline-block">W</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      미샤에게 돌진 명령을 내려 적들에게 피해를 주고 기절시킴
      
    </div>
    
  </div>
</details>
<details style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf;margin:0 0 5px 5px;border-image:linear-gradient(#8df,#ccd) 1">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/164595f27fe19dc2c.png) center/cover" title="[클릭하여 접기/펼치기] E - 야수 치료"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">야수 치료</b>
        
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <b style="display:inline-block">E</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      미샤 지속 치유
      
    </div>
    
  </div>
</details>
      </div>
    </div>
    <div style="display:flex">
      <h3 style="margin:0;flex:0 2 5em;align-self:center;display:block;min-WIDTH:3em;font-size:1.2em;text-shadow:0 0 1em #09f;text-align:center">궁극기</h3>
      <div style="flex:1 30em;WIDTH:5em;display:flex;flex-wrap:wrap;align-items:flex-end;padding:5px 5px 0 0;overflow:auto">
<details style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf;margin:0 0 5px 5px;border-image:linear-gradient(#8df,#ccd) 1">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i1.ruliweb.com/img/18/07/02/164595f234119dc2c.png) center/cover" title="[클릭하여 접기/펼치기] R - 야수의 격노"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">야수의 격노</b>
        
      </div>
      
       <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #da7;color:#da7"> 
      
      
        <b style="display:inline-block">R</b>
      
       </div>
      
      
    </div>
    <div style="color:#bcc">
      미샤 일반 공격력 증가
      
    </div>
    
  </div>
</details>
<details style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf;margin:0 0 5px 5px;border-image:linear-gradient(#8df,#ccd) 1">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/164595f2f3319dc2c.png) center/cover" title="[클릭하여 접기/펼치기] R - 멧돼지를 풀어라"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">멧돼지를 풀어라</b>
        
      </div>
      
       <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #da7;color:#da7"> 
      
      
        <b style="display:inline-block">R</b>
      
       </div>
      
      
    </div>
    <div style="color:#bcc">
      멧돼지 무리를 풀어 적 영웅들 사냥
      
    </div>
    
  </div>
</details>
      </div>
    </div>
  </section>


  <footer style="text-align:right;font-size:.8em;color:#cca;padding-right:1em"><i>패치 HotS version (test data)</i></footer>
</details><details data-ruliweb-hots-version="app version string" class="ruliweb-hots-hero-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #426;border-image:linear-gradient(#135,#426) 1;background:#101;color:#ffd;line-HEIGHT:normal">
  <summary style="float:left;padding:4px;WIDTH:64px;HEIGHT:64px;background:url(http://i2.ruliweb.com/img/18/06/14/163fc227a1919dc2c.png) center/cover no-repeat content-box" title="[클릭하여 접기/펼치기] 가즈로 - 근접 암살자"></summary>

  <section style="float:left;background:linear-gradient(#214,#102);box-sizing:border-box;padding:1em;WIDTH:calc(50em - 64px - 8px);max-WIDTH:calc(100% - 64px - 8px);min-HEIGHT:calc(64px + 8px)">
    <div style="display:flex">
      <div style="flex:none;align-self:center;margin-right:.5em;WIDTH:2em;HEIGHT:2em;text-indent:100%;white-space:nowrap;overflow:hidden;background:url(http://i3.ruliweb.com/img/18/11/14/1670ecc22fe19dc2c.png) 60% 0/cover" title="워크래프트">워크래프트</div>
      <h2 style="font-size:1.5em;text-shadow:0 0 1em #09f;margin:0">가즈로</h2>
    </div>
    <div style="font-size:1.2em;color:#6cf"><b>근접 암살자</b></div>
  </section>

  <section style="background:linear-gradient(#214,#102);padding:.5em;clear:both;box-sizing:border-box;WIDTH:50em;max-WIDTH:100%;border-top:1px solid #426">
    <div style="display:flex">
      <h3 style="margin:0;flex:0 2 5em;align-self:center;display:block;min-WIDTH:3em;font-size:1.2em;text-shadow:0 0 1em #09f;text-align:center">고유 능력</h3>
      <div style="flex:1 30em;WIDTH:5em;display:flex;flex-wrap:wrap;align-items:flex-end;padding:5px 5px 0 0;overflow:auto">
<details style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf;margin:0 0 5px 5px;border-image:linear-gradient(#8df,#ccd) 1">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i3.ruliweb.com/img/18/07/02/1645956a7cb19dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 고유 능력 - 고물상"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">고물상</b>
        
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <b style="display:inline-block">고유 능력</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      파괴된 적 구조물이나 직접 설치한 잘나가! 포탑에서 고철이 떨어집니다. 고철을 획득하면 3초에 걸쳐 30의 마나를 회복하고 이 동안 기술의 재사용 대기시간이 세 배 빨리 감소합니다.<br><br>고물상을 사용하면 대상 잘나가! 포탑을 해체해서 고철로 만듭니다.
    </div>
    
  </div>
</details>
      </div>
    </div>
    <div style="display:flex">
      <h3 style="margin:0;flex:0 2 5em;align-self:center;display:block;min-WIDTH:3em;font-size:1.2em;text-shadow:0 0 1em #09f;text-align:center">일반 기술</h3>
      <div style="flex:1 30em;WIDTH:5em;display:flex;flex-wrap:wrap;align-items:flex-end;padding:5px 5px 0 0;overflow:auto">
<details style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf;margin:0 0 5px 5px;border-image:linear-gradient(#8df,#ccd) 1">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/1645956a00919dc2c.png) center/cover" title="[클릭하여 접기/펼치기] Q - 잘나가! 포탑"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">잘나가! 포탑</b>
        
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <b style="display:inline-block">Q</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      64(+4%)의 피해를 주는 포탑을 설치합니다. 30초 동안 지속됩니다.<br><br>최대 2회 충전됩니다.<br>
<br><span style="padding-left:1.5em;color:#4be;background:url(http://i1.ruliweb.com/img/18/07/07/164741ab46719dc2c.png) .15em/1em no-repeat"><b>마나</b> 70</span>
<br><span style="padding-left:1.5em;color:#ddd;background:url(http://i2.ruliweb.com/img/18/07/23/164c2a1709319dc2c.png) 0/1.3em no-repeat"><b>충전 대기시간</b> 15초</span>
<br><span style="padding-left:1.5em;color:#d90;background:url(http://i3.ruliweb.com/img/18/07/07/164748d2b0519dc2c.png) 0/1.3em no-repeat"><b>사거리</b> 2 <b>크기</b> 가로 1 × 세로 1 </span>

    </div>
    
  </div>
</details>
<details style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf;margin:0 0 5px 5px;border-image:linear-gradient(#8df,#ccd) 1">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/1645956a40719dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 사용 효과 - 집중 포화!"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">집중 포화!</b>
        
      </div>
      
      
      
       <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #d7a;color:#d7a"> 
        <b style="display:inline-block">사용 효과</b>
      
      
      
       </div>
    </div>
    <div style="color:#bcc">
      
      주위의 잘나가! 포탑들이 대상을 집중 공격하게 만듭니다.<br>
<br><span style="padding-left:1.5em;color:#ddd;background:url(http://i2.ruliweb.com/img/18/07/23/164c2a1709319dc2c.png) 0/1.3em no-repeat"><b>재사용 대기시간</b> 1초</span>

    </div>
    
  </div>
</details>
<details style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf;margin:0 0 5px 5px;border-image:linear-gradient(#8df,#ccd) 1">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i3.ruliweb.com/img/18/07/02/1645956889519dc2c.png) center/cover" title="[클릭하여 접기/펼치기] W - 죽이는 레이저"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">죽이는 레이저</b>
        
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <b style="display:inline-block">W</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      충전 후 공격하여 일직선상의 적들에게 142(+4%)의 피해를 줍니다. 공격력과 사거리는 충전을 오래 할수록 증가하여 3초 후 최대 100% 증가합니다.<br><br>무한정 충전할 수 있습니다.<br>
<br><span style="padding-left:1.5em;color:#4be;background:url(http://i1.ruliweb.com/img/18/07/07/164741ab46719dc2c.png) .15em/1em no-repeat"><b>마나</b> 60</span>
<br><span style="padding-left:1.5em;color:#ddd;background:url(http://i2.ruliweb.com/img/18/07/23/164c2a1709319dc2c.png) 0/1.3em no-repeat"><b>재사용 대기시간</b> 12초</span>
<br><span style="padding-left:1.5em;color:#d90;background:url(http://i3.ruliweb.com/img/18/07/07/164748d2b0519dc2c.png) 0/1.3em no-repeat"><b>최대 사거리</b> 8 &#x2F; 12 &#x2F; 17 <b>너비</b> 1 &#x2F; 2 &#x2F; 5 </span>

    </div>
    
  </div>
</details>
<details style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf;margin:0 0 5px 5px;border-image:linear-gradient(#8df,#ccd) 1">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i3.ruliweb.com/img/18/07/02/1645956af9a19dc2c.png) center/cover" title="[클릭하여 접기/펼치기] E - 터진다늄 폭탄"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">터진다늄 폭탄</b>
        
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <b style="display:inline-block">E</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      폭탄을 설치해 2.5초 후에 대상 지역 안의 적들에게 242(+4%)의 피해를 주고 1.75초 동안 기절시킵니다.<br>
<br><span style="padding-left:1.5em;color:#4be;background:url(http://i1.ruliweb.com/img/18/07/07/164741ab46719dc2c.png) .15em/1em no-repeat"><b>마나</b> 60</span>
<br><span style="padding-left:1.5em;color:#ddd;background:url(http://i2.ruliweb.com/img/18/07/23/164c2a1709319dc2c.png) 0/1.3em no-repeat"><b>재사용 대기시간</b> 14초</span>
<br><span style="padding-left:1.5em;color:#d90;background:url(http://i3.ruliweb.com/img/18/07/07/164748d2b0519dc2c.png) 0/1.3em no-repeat"><b>사거리</b> 9.5 <b>피해 반경</b> 3 </span>

    </div>
    
  </div>
</details>
      </div>
    </div>
    <div style="display:flex">
      <h3 style="margin:0;flex:0 2 5em;align-self:center;display:block;min-WIDTH:3em;font-size:1.2em;text-shadow:0 0 1em #09f;text-align:center">궁극기</h3>
      <div style="flex:1 30em;WIDTH:5em;display:flex;flex-wrap:wrap;align-items:flex-end;padding:5px 5px 0 0;overflow:auto">
<details style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf;margin:0 0 5px 5px;border-image:linear-gradient(#8df,#ccd) 1">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/16459569c9519dc2c.png) center/cover" title="[클릭하여 접기/펼치기] R - 로보고블린"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">로보고블린</b>
        
      </div>
      
       <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #da7;color:#da7"> 
      
      
        <b style="display:inline-block">R</b>
      
       </div>
      
      
    </div>
    <div style="color:#bcc">
      
      사용하면 4초 동안 방어력이 30 증가하고 이동 속도가 30% 증가합니다.<br><br><b style="color: #0e8">지속 효과</b>: 일반 공격이 100%의 추가 피해를 줍니다.<br>
<br><span style="padding-left:1.5em;color:#ddd;background:url(http://i2.ruliweb.com/img/18/07/23/164c2a1709319dc2c.png) 0/1.3em no-repeat"><b>재사용 대기시간</b> 60초</span>

    </div>
    
  </div>
</details>
<details style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf;margin:0 0 5px 5px;border-image:linear-gradient(#8df,#ccd) 1">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i3.ruliweb.com/img/18/07/02/1645956906119dc2c.png) center/cover" title="[클릭하여 접기/펼치기] R - 중력폭탄 3000"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">중력폭탄 3000</b>
        
      </div>
      
       <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #da7;color:#da7"> 
      
      
        <b style="display:inline-block">R</b>
      
       </div>
      
      
    </div>
    <div style="color:#bcc">
      
      2초 후, 대상 지역 중앙으로 적들을 끌어당기며 261(+4%)의 피해를 줍니다.<br>
<br><span style="padding-left:1.5em;color:#4be;background:url(http://i1.ruliweb.com/img/18/07/07/164741ab46719dc2c.png) .15em/1em no-repeat"><b>마나</b> 100</span>
<br><span style="padding-left:1.5em;color:#ddd;background:url(http://i2.ruliweb.com/img/18/07/23/164c2a1709319dc2c.png) 0/1.3em no-repeat"><b>재사용 대기시간</b> 110초</span>
<br><span style="padding-left:1.5em;color:#d90;background:url(http://i3.ruliweb.com/img/18/07/07/164748d2b0519dc2c.png) 0/1.3em no-repeat"><b>사거리</b> 8 <b>피해 반경</b> 5 </span>

    </div>
    
  </div>
</details>
      </div>
    </div>
  </section>

  <section style="background:linear-gradient(#214,#102);padding:.5em 0 0 .5em;box-sizing:border-box;WIDTH:50em;max-WIDTH:100%;border-top:1px solid #426">
    <table style="display:inline-table;margin:0 .5em .5em 0;border:2px solid #76d;border-collapse:collapse;background:#112;text-align:center">
      <thead style="background:#224">
        <tr>
          <th style="border:1px solid #76d;padding:.4em;color:#6ce;font:bold 1em sans-serif">능력치</th>
          <th style="border:1px solid #76d;padding:.4em;color:#6ce;font:bold 1em sans-serif">1레벨 (성장률)</th>
          <th style="border:1px solid #76d;padding:.4em;color:#6ce;font:bold 1em sans-serif">20레벨</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border:1px solid #76d;color:#efe;font:1em sans-serif;padding:.4em .4em .4em 2em;text-align:initial;background:url(http://i3.ruliweb.com/img/18/07/19/164b154ffe819dc2c.png) .4em/1.3em no-repeat">생명력</td>
          
          <td style="border:1px solid #76d;padding:.4em;color:#efe;font:1em sans-serif">1899 (+4%)</td>
          
          <td style="border:1px solid #76d;padding:.4em;color:#efe;font:1em sans-serif">4001</td>
        </tr>
        <tr>
          <td style="border:1px solid #76d;color:#efe;font:1em sans-serif;padding:.4em .4em .4em 2em;text-align:initial;background:url(http://i3.ruliweb.com/img/18/07/19/164b154ffe819dc2c.png) .4em/1.3em no-repeat">생명력 재생</td>
          
          <td style="border:1px solid #76d;padding:.4em;color:#efe;font:1em sans-serif">3.957 (+4%)</td>
          
          <td style="border:1px solid #76d;padding:.4em;color:#efe;font:1em sans-serif">8.336</td>
        </tr>
        <tr>
          <td style="border:1px solid #76d;color:#efe;font:1em sans-serif;padding:.4em .4em .4em 2em;text-align:initial;background:url(http://i3.ruliweb.com/img/18/07/19/164b15500ad19dc2c.png) .4em/1.3em no-repeat">마나</td>
          
          
          <td style="border:1px solid #76d;padding:.4em;color:#efe;font:1em sans-serif">500 (+10)</td>
          <td style="border:1px solid #76d;padding:.4em;color:#efe;font:1em sans-serif">690</td>
        </tr>
        <tr>
          <td style="border:1px solid #76d;color:#efe;font:1em sans-serif;padding:.4em .4em .4em 2em;text-align:initial;background:url(http://i3.ruliweb.com/img/18/07/19/164b15500ad19dc2c.png) .4em/1.3em no-repeat">마나 재생</td>
          
          
          <td style="border:1px solid #76d;padding:.4em;color:#efe;font:1em sans-serif">3 (+0.098)</td>
          <td style="border:1px solid #76d;padding:.4em;color:#efe;font:1em sans-serif">4.862</td>
        </tr>
        <tr>
          <td style="border:1px solid #76d;color:#efe;font:1em sans-serif;padding:.4em .4em .4em 2em;text-align:initial;background:url(http://i2.ruliweb.com/img/18/07/07/164748d2a3b19dc2c.png) .4em/1.3em no-repeat">공격력</td>
          
          <td style="border:1px solid #76d;padding:.4em;color:#efe;font:1em sans-serif">99 (+4%)</td>
          
          <td style="border:1px solid #76d;padding:.4em;color:#efe;font:1em sans-serif">208</td>
        </tr>
        <tr>
          <td style="border:1px solid #76d;color:#efe;font:1em sans-serif;padding:.4em .4em .4em 2em;text-align:initial;background:url(http://i1.ruliweb.com/img/18/07/07/164748d2bce19dc2c.png) .4em/1.3em no-repeat">공격 속도</td>
          <td colspan="2" style="border:1px solid #76d;padding:.4em;color:#efe;font:1em sans-serif">1.25</td>
          
          
          
        </tr>
        <tr>
          <td style="border:1px solid #76d;color:#efe;font:1em sans-serif;padding:.4em .4em .4em 2em;text-align:initial;background:url(http://i3.ruliweb.com/img/18/07/07/164748d2b0519dc2c.png) .4em/1.3em no-repeat">사거리</td>
          <td colspan="2" style="border:1px solid #76d;padding:.4em;color:#efe;font:1em sans-serif">1.25</td>
          
          
          
        </tr>
        <tr>
          <td style="border:1px solid #76d;color:#efe;font:1em sans-serif;padding:.4em .4em .4em 2em;text-align:initial;background:url(http://i3.ruliweb.com/img/18/07/07/164748d2c9219dc2c.png) .4em/1.3em no-repeat">이동 속도</td>
          <td colspan="2" style="border:1px solid #76d;padding:.4em;color:#efe;font:1em sans-serif">4.3984</td>
          
          
          
        </tr>
      </tbody>
    </table>
  </section>

  <footer style="text-align:right;font-size:.8em;color:#cca;padding-right:1em"><i>패치 HotS version (test data)</i></footer>
</details><details data-ruliweb-hots-version="app version string" class="ruliweb-hots-hero-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #426;border-image:linear-gradient(#135,#426) 1;background:#101;color:#ffd;line-HEIGHT:normal">
  <summary style="float:left;padding:4px;WIDTH:64px;HEIGHT:64px;background:url(http://i2.ruliweb.com/img/18/06/14/163fc227a1919dc2c.png) center/cover no-repeat content-box" title="[클릭하여 접기/펼치기] 가즈로 - 근접 암살자"></summary>

  <section style="float:left;background:linear-gradient(#214,#102);box-sizing:border-box;padding:1em;WIDTH:calc(50em - 64px - 8px);max-WIDTH:calc(100% - 64px - 8px);min-HEIGHT:calc(64px + 8px)">
    <div style="display:flex">
      <div style="flex:none;align-self:center;margin-right:.5em;WIDTH:2em;HEIGHT:2em;text-indent:100%;white-space:nowrap;overflow:hidden;background:url(http://i3.ruliweb.com/img/18/11/14/1670ecc22fe19dc2c.png) 60% 0/cover" title="워크래프트">워크래프트</div>
      <h2 style="font-size:1.5em;text-shadow:0 0 1em #09f;margin:0">가즈로</h2>
    </div>
    <div style="font-size:1.2em;color:#6cf"><b>근접 암살자</b></div>
  </section>

  <section style="background:linear-gradient(#214,#102);padding:.5em;clear:both;box-sizing:border-box;WIDTH:50em;max-WIDTH:100%;border-top:1px solid #426">
    <div style="display:flex">
      <h3 style="margin:0;flex:0 2 5em;align-self:center;display:block;min-WIDTH:3em;font-size:1.2em;text-shadow:0 0 1em #09f;text-align:center">고유 능력</h3>
      <div style="flex:1 30em;WIDTH:5em;display:flex;flex-wrap:wrap;align-items:flex-end;padding:5px 5px 0 0;overflow:auto">
<details style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf;margin:0 0 5px 5px;border-image:linear-gradient(#8df,#ccd) 1">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i3.ruliweb.com/img/18/07/02/1645956a7cb19dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 고유 능력 - 고물상"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">고물상</b>
        
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <b style="display:inline-block">고유 능력</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      포탑과 적 구조물에서 고철이 떨어져, 획득 시 마나 회복 및 재사용 대기시간 감소
      
    </div>
    
  </div>
</details>
      </div>
    </div>
    <div style="display:flex">
      <h3 style="margin:0;flex:0 2 5em;align-self:center;display:block;min-WIDTH:3em;font-size:1.2em;text-shadow:0 0 1em #09f;text-align:center">일반 기술</h3>
      <div style="flex:1 30em;WIDTH:5em;display:flex;flex-wrap:wrap;align-items:flex-end;padding:5px 5px 0 0;overflow:auto">
<details style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf;margin:0 0 5px 5px;border-image:linear-gradient(#8df,#ccd) 1">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/1645956a00919dc2c.png) center/cover" title="[클릭하여 접기/펼치기] Q - 잘나가! 포탑"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">잘나가! 포탑</b>
        
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <b style="display:inline-block">Q</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      주위 적들을 공격하는 포탑 설치
      
    </div>
    
  </div>
</details>
<details style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf;margin:0 0 5px 5px;border-image:linear-gradient(#8df,#ccd) 1">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/1645956a40719dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 사용 효과 - 집중 포화!"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">집중 포화!</b>
        
      </div>
      
      
      
       <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #d7a;color:#d7a"> 
        <b style="display:inline-block">사용 효과</b>
      
      
      
       </div>
    </div>
    <div style="color:#bcc">
      포탑에게 대상 공격 지시
      
    </div>
    
  </div>
</details>
<details style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf;margin:0 0 5px 5px;border-image:linear-gradient(#8df,#ccd) 1">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i3.ruliweb.com/img/18/07/02/1645956889519dc2c.png) center/cover" title="[클릭하여 접기/펼치기] W - 죽이는 레이저"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">죽이는 레이저</b>
        
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <b style="display:inline-block">W</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      오래 충전할수록 공격력과 사거리가 증가하는 레이저 발사
      
    </div>
    
  </div>
</details>
<details style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf;margin:0 0 5px 5px;border-image:linear-gradient(#8df,#ccd) 1">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i3.ruliweb.com/img/18/07/02/1645956af9a19dc2c.png) center/cover" title="[클릭하여 접기/펼치기] E - 터진다늄 폭탄"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">터진다늄 폭탄</b>
        
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <b style="display:inline-block">E</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      일정 지역 안의 적에게 피해를 주며 기절시키는 시한 폭탄을 던짐
      
    </div>
    
  </div>
</details>
      </div>
    </div>
    <div style="display:flex">
      <h3 style="margin:0;flex:0 2 5em;align-self:center;display:block;min-WIDTH:3em;font-size:1.2em;text-shadow:0 0 1em #09f;text-align:center">궁극기</h3>
      <div style="flex:1 30em;WIDTH:5em;display:flex;flex-wrap:wrap;align-items:flex-end;padding:5px 5px 0 0;overflow:auto">
<details style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf;margin:0 0 5px 5px;border-image:linear-gradient(#8df,#ccd) 1">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/16459569c9519dc2c.png) center/cover" title="[클릭하여 접기/펼치기] R - 로보고블린"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">로보고블린</b>
        
      </div>
      
       <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #da7;color:#da7"> 
      
      
        <b style="display:inline-block">R</b>
      
       </div>
      
      
    </div>
    <div style="color:#bcc">
      일반 공격력, 방어력, 이동 속도 증가
      
    </div>
    
  </div>
</details>
<details style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf;margin:0 0 5px 5px;border-image:linear-gradient(#8df,#ccd) 1">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i3.ruliweb.com/img/18/07/02/1645956906119dc2c.png) center/cover" title="[클릭하여 접기/펼치기] R - 중력폭탄 3000"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">중력폭탄 3000</b>
        
      </div>
      
       <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #da7;color:#da7"> 
      
      
        <b style="display:inline-block">R</b>
      
       </div>
      
      
    </div>
    <div style="color:#bcc">
      적들을 끌어당기며 피해를 줌
      
    </div>
    
  </div>
</details>
      </div>
    </div>
  </section>


  <footer style="text-align:right;font-size:.8em;color:#cca;padding-right:1em"><i>패치 HotS version (test data)</i></footer>
</details>
`

exports['HotsDialog.renderers Inserted templates generates skill info table correctly 1'] = `
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-skill-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf">
  <summary style="float:left;WIDTH:64px;HEIGHT:64px;background:url(http://i2.ruliweb.com/img/18/07/02/1645954600319dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 고유 능력 - 보호막 축전기"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 64px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">보호막 축전기</b>
        <br><small>피닉스</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <b style="display:inline-block">고유 능력</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      790(+4%)의 피해를 흡수하는 보호막을 영구히 얻습니다. 5초 동안 피해를 받지 않으면 초당 79(+4%)의 보호막이 재생됩니다.
    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-skill-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf">
  <summary style="float:left;WIDTH:64px;HEIGHT:64px;background:url(http://i2.ruliweb.com/img/18/07/02/1645954600319dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 고유 능력 - 보호막 축전기"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 64px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">보호막 축전기</b>
        <br><small>피닉스</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <b style="display:inline-block">고유 능력</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      790(+4%)의 피해를 흡수하는 보호막을 영구히 얻습니다. 5초 동안 피해를 받지 않으면 초당 79(+4%)의 보호막이 재생됩니다.
    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-skill-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf">
  <summary style="float:left;WIDTH:64px;HEIGHT:64px;background:url(http://i2.ruliweb.com/img/18/07/02/1645954582b19dc2c.png) center/cover" title="[클릭하여 접기/펼치기] Q - 플라스마 절단기"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 64px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">플라스마 절단기</b>
        <br><small>피닉스</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <b style="display:inline-block">Q</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      대상 위치에 광선을 발사합니다. 광선은 피닉스를 중심으로 주위를 원형으로 두 번 돌며 적에게 140(+4%)의 피해를 주고 4초 동안 25% 느려지게 합니다.<br>
<br><span style="padding-left:1.5em;color:#ddd;background:url(http://i2.ruliweb.com/img/18/07/23/164c2a1709319dc2c.png) 0/1.3em no-repeat"><b>재사용 대기시간</b> 12초</span>
<br><span style="padding-left:1.5em;color:#d90;background:url(http://i3.ruliweb.com/img/18/07/07/164748d2b0519dc2c.png) 0/1.3em no-repeat"><b>회전 반경</b> 1.5 ~ 6 <b>너비</b> 0.7 <b>회전 시간</b> 1.5초 </span>

    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-skill-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf">
  <summary style="float:left;WIDTH:64px;HEIGHT:64px;background:url(http://i2.ruliweb.com/img/18/07/02/1645954582b19dc2c.png) center/cover" title="[클릭하여 접기/펼치기] Q - 플라스마 절단기"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 64px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">플라스마 절단기</b>
        <br><small>피닉스</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <b style="display:inline-block">Q</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      대상 위치에 광선을 발사합니다. 광선은 피닉스를 중심으로 주위를 원형으로 두 번 돌며 적에게 140(+4%)의 피해를 주고 4초 동안 25% 느려지게 합니다.<br>
<br><span style="padding-left:1.5em;color:#ddd;background:url(http://i2.ruliweb.com/img/18/07/23/164c2a1709319dc2c.png) 0/1.3em no-repeat"><b>재사용 대기시간</b> 12초</span>
<br><span style="padding-left:1.5em;color:#d90;background:url(http://i3.ruliweb.com/img/18/07/07/164748d2b0519dc2c.png) 0/1.3em no-repeat"><b>회전 반경</b> 1.5 ~ 6 <b>너비</b> 0.7 <b>회전 시간</b> 1.5초 </span>

    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-skill-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf">
  <summary style="float:left;WIDTH:64px;HEIGHT:64px;background:url(http://i3.ruliweb.com/img/18/07/02/1645954738019dc2c.png) center/cover" title="[클릭하여 접기/펼치기] W - 무기 모드: 연발포"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 64px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">무기 모드: 연발포</b>
        <br><small>피닉스</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <b style="display:inline-block">W</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      공격 속도가 150% 증가합니다.<br><br>사용하면 <span style="color: #00ff90">무기 모드: 위상 폭탄</span>으로 전환하여 일반 공격의 공격력 및 사거리가 증가하고 방사 피해를 주도록 변경됩니다.
    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-skill-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf">
  <summary style="float:left;WIDTH:64px;HEIGHT:64px;background:url(http://i3.ruliweb.com/img/18/07/02/1645954738019dc2c.png) center/cover" title="[클릭하여 접기/펼치기] W - 무기 모드: 연발포"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 64px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">무기 모드: 연발포</b>
        <br><small>피닉스</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <b style="display:inline-block">W</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      공격 속도가 150% 증가합니다.<br><br>사용하면 <span style="color: #00ff90">무기 모드: 위상 폭탄</span>으로 전환하여 일반 공격의 공격력 및 사거리가 증가하고 방사 피해를 주도록 변경됩니다.
    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-skill-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf">
  <summary style="float:left;WIDTH:64px;HEIGHT:64px;background:url(http://i2.ruliweb.com/img/18/07/02/16459546f9219dc2c.png) center/cover" title="[클릭하여 접기/펼치기] W - 무기 모드: 위상 폭탄"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 64px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">무기 모드: 위상 폭탄</b>
        <br><small>피닉스</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <b style="display:inline-block">W</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      일반 공격의 사거리가 1.25 증가하고 25%의 추가 피해를 주며 대상 주위에 방사 피해를 줍니다.<br><br>사용하면 <span style="color: #00ff90">무기 모드: 연발포</span>로 전환하여 공격 속도가 증가합니다.
    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-skill-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf">
  <summary style="float:left;WIDTH:64px;HEIGHT:64px;background:url(http://i2.ruliweb.com/img/18/07/02/16459546f9219dc2c.png) center/cover" title="[클릭하여 접기/펼치기] W - 무기 모드: 위상 폭탄"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 64px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">무기 모드: 위상 폭탄</b>
        <br><small>피닉스</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <b style="display:inline-block">W</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      일반 공격의 사거리가 1.25 증가하고 25%의 추가 피해를 주며 대상 주위에 방사 피해를 줍니다.<br><br>사용하면 <span style="color: #00ff90">무기 모드: 연발포</span>로 전환하여 공격 속도가 증가합니다.
    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-skill-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf">
  <summary style="float:left;WIDTH:64px;HEIGHT:64px;background:url(http://i2.ruliweb.com/img/18/07/02/16459546bc719dc2c.png) center/cover" title="[클릭하여 접기/펼치기] E - 차원이동"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 64px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">차원이동</b>
        <br><small>피닉스</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <b style="display:inline-block">E</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      대상 위치로 순간이동합니다. 0.5초 후에 이동하며, 이동 후 0.75초 후에 도착합니다.<br>
<br><span style="padding-left:1.5em;color:#ddd;background:url(http://i2.ruliweb.com/img/18/07/23/164c2a1709319dc2c.png) 0/1.3em no-repeat"><b>재사용 대기시간</b> 17초</span>
<br><span style="padding-left:1.5em;color:#d90;background:url(http://i3.ruliweb.com/img/18/07/07/164748d2b0519dc2c.png) 0/1.3em no-repeat"><b>사거리</b> 9 </span>

    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-skill-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf">
  <summary style="float:left;WIDTH:64px;HEIGHT:64px;background:url(http://i2.ruliweb.com/img/18/07/02/16459546bc719dc2c.png) center/cover" title="[클릭하여 접기/펼치기] E - 차원이동"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 64px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">차원이동</b>
        <br><small>피닉스</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <b style="display:inline-block">E</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      대상 위치로 순간이동합니다. 0.5초 후에 이동하며, 이동 후 0.75초 후에 도착합니다.<br>
<br><span style="padding-left:1.5em;color:#ddd;background:url(http://i2.ruliweb.com/img/18/07/23/164c2a1709319dc2c.png) 0/1.3em no-repeat"><b>재사용 대기시간</b> 17초</span>
<br><span style="padding-left:1.5em;color:#d90;background:url(http://i3.ruliweb.com/img/18/07/07/164748d2b0519dc2c.png) 0/1.3em no-repeat"><b>사거리</b> 9 </span>

    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-skill-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf">
  <summary style="float:left;WIDTH:64px;HEIGHT:64px;background:url(http://i1.ruliweb.com/img/18/07/08/164758eadfc19dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 고유 능력 - 미샤, 집중해!"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 64px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">미샤, 집중해!</b>
        <br><small>렉사르</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <b style="display:inline-block">고유 능력</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      <b style="color: #0e8">지속 효과</b>: 미샤의 이동 속도가 15% 증가합니다.<br><br>미샤에게 특정 적을 공격하거나 특정 위치로 이동해 대기하라고 명령합니다.<br><br>렉사르를 대상으로 사용하면 미샤가 렉사르에게 돌아오며 이 동안 미샤의 이동 속도가 30% 추가로 증가합니다.<br><br>미샤를 대상으로 사용하면 현재 위치에 대기합니다.
    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-skill-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf">
  <summary style="float:left;WIDTH:64px;HEIGHT:64px;background:url(http://i1.ruliweb.com/img/18/07/08/164758eadfc19dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 고유 능력 - 미샤, 집중해!"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 64px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">미샤, 집중해!</b>
        <br><small>렉사르</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <b style="display:inline-block">고유 능력</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      <b style="color: #0e8">지속 효과</b>: 미샤의 이동 속도가 15% 증가합니다.<br><br>미샤에게 특정 적을 공격하거나 특정 위치로 이동해 대기하라고 명령합니다.<br><br>렉사르를 대상으로 사용하면 미샤가 렉사르에게 돌아오며 이 동안 미샤의 이동 속도가 30% 추가로 증가합니다.<br><br>미샤를 대상으로 사용하면 현재 위치에 대기합니다.
    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-skill-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf">
  <summary style="float:left;WIDTH:64px;HEIGHT:64px;background:url(http://i1.ruliweb.com/img/18/07/02/164595f2c2019dc2c.png) center/cover" title="[클릭하여 접기/펼치기] Q - 기백 날리기"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 64px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">기백 날리기</b>
        <br><small>렉사르</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <b style="display:inline-block">Q</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      일직선상의 적들에게 147(+4%)의 피해를 주고, 2초 동안 30% 느려지게 합니다.<br>
<br><span style="padding-left:1.5em;color:#4be;background:url(http://i1.ruliweb.com/img/18/07/07/164741ab46719dc2c.png) .15em/1em no-repeat"><b>마나</b> 40</span>
<br><span style="padding-left:1.5em;color:#ddd;background:url(http://i2.ruliweb.com/img/18/07/23/164c2a1709319dc2c.png) 0/1.3em no-repeat"><b>재사용 대기시간</b> 7초</span>
<br><span style="padding-left:1.5em;color:#d90;background:url(http://i3.ruliweb.com/img/18/07/07/164748d2b0519dc2c.png) 0/1.3em no-repeat"><b>사거리</b> 9.7 <b>너비</b> 1.25 </span>

    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-skill-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf">
  <summary style="float:left;WIDTH:64px;HEIGHT:64px;background:url(http://i1.ruliweb.com/img/18/07/02/164595f2c2019dc2c.png) center/cover" title="[클릭하여 접기/펼치기] Q - 기백 날리기"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 64px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">기백 날리기</b>
        <br><small>렉사르</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <b style="display:inline-block">Q</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      일직선상의 적들에게 147(+4%)의 피해를 주고, 2초 동안 30% 느려지게 합니다.<br>
<br><span style="padding-left:1.5em;color:#4be;background:url(http://i1.ruliweb.com/img/18/07/07/164741ab46719dc2c.png) .15em/1em no-repeat"><b>마나</b> 40</span>
<br><span style="padding-left:1.5em;color:#ddd;background:url(http://i2.ruliweb.com/img/18/07/23/164c2a1709319dc2c.png) 0/1.3em no-repeat"><b>재사용 대기시간</b> 7초</span>
<br><span style="padding-left:1.5em;color:#d90;background:url(http://i3.ruliweb.com/img/18/07/07/164748d2b0519dc2c.png) 0/1.3em no-repeat"><b>사거리</b> 9.7 <b>너비</b> 1.25 </span>

    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-skill-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf">
  <summary style="float:left;WIDTH:64px;HEIGHT:64px;background:url(http://i2.ruliweb.com/img/18/07/02/164595f298219dc2c.png) center/cover" title="[클릭하여 접기/펼치기] W - 미샤, 돌진!"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 64px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">미샤, 돌진!</b>
        <br><small>렉사르</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <b style="display:inline-block">W</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      미샤가 일직선상으로 돌진해서 적들에게 61(+4%)의 피해를 주고 1.25초 동안 기절시킵니다.<br>
<br><span style="padding-left:1.5em;color:#4be;background:url(http://i1.ruliweb.com/img/18/07/07/164741ab46719dc2c.png) .15em/1em no-repeat"><b>마나</b> 45</span>
<br><span style="padding-left:1.5em;color:#ddd;background:url(http://i2.ruliweb.com/img/18/07/23/164c2a1709319dc2c.png) 0/1.3em no-repeat"><b>재사용 대기시간</b> 10초</span>
<br><span style="padding-left:1.5em;color:#d90;background:url(http://i3.ruliweb.com/img/18/07/07/164748d2b0519dc2c.png) 0/1.3em no-repeat"><b>사거리</b> 7.5 <b>너비</b> 2.5 </span>

    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-skill-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf">
  <summary style="float:left;WIDTH:64px;HEIGHT:64px;background:url(http://i2.ruliweb.com/img/18/07/02/164595f298219dc2c.png) center/cover" title="[클릭하여 접기/펼치기] W - 미샤, 돌진!"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 64px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">미샤, 돌진!</b>
        <br><small>렉사르</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <b style="display:inline-block">W</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      미샤가 일직선상으로 돌진해서 적들에게 61(+4%)의 피해를 주고 1.25초 동안 기절시킵니다.<br>
<br><span style="padding-left:1.5em;color:#4be;background:url(http://i1.ruliweb.com/img/18/07/07/164741ab46719dc2c.png) .15em/1em no-repeat"><b>마나</b> 45</span>
<br><span style="padding-left:1.5em;color:#ddd;background:url(http://i2.ruliweb.com/img/18/07/23/164c2a1709319dc2c.png) 0/1.3em no-repeat"><b>재사용 대기시간</b> 10초</span>
<br><span style="padding-left:1.5em;color:#d90;background:url(http://i3.ruliweb.com/img/18/07/07/164748d2b0519dc2c.png) 0/1.3em no-repeat"><b>사거리</b> 7.5 <b>너비</b> 2.5 </span>

    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-skill-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf">
  <summary style="float:left;WIDTH:64px;HEIGHT:64px;background:url(http://i2.ruliweb.com/img/18/07/02/164595f27fe19dc2c.png) center/cover" title="[클릭하여 접기/펼치기] E - 야수 치료"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 64px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">야수 치료</b>
        <br><small>렉사르</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <b style="display:inline-block">E</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      미샤의 생명력을 5초에 걸쳐 743(+4%) 회복시킵니다.<br>
<br><span style="padding-left:1.5em;color:#4be;background:url(http://i1.ruliweb.com/img/18/07/07/164741ab46719dc2c.png) .15em/1em no-repeat"><b>마나</b> 55</span>
<br><span style="padding-left:1.5em;color:#ddd;background:url(http://i2.ruliweb.com/img/18/07/23/164c2a1709319dc2c.png) 0/1.3em no-repeat"><b>재사용 대기시간</b> 10초</span>

    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-skill-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf">
  <summary style="float:left;WIDTH:64px;HEIGHT:64px;background:url(http://i2.ruliweb.com/img/18/07/02/164595f27fe19dc2c.png) center/cover" title="[클릭하여 접기/펼치기] E - 야수 치료"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 64px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">야수 치료</b>
        <br><small>렉사르</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <b style="display:inline-block">E</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      미샤의 생명력을 5초에 걸쳐 743(+4%) 회복시킵니다.<br>
<br><span style="padding-left:1.5em;color:#4be;background:url(http://i1.ruliweb.com/img/18/07/07/164741ab46719dc2c.png) .15em/1em no-repeat"><b>마나</b> 55</span>
<br><span style="padding-left:1.5em;color:#ddd;background:url(http://i2.ruliweb.com/img/18/07/23/164c2a1709319dc2c.png) 0/1.3em no-repeat"><b>재사용 대기시간</b> 10초</span>

    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-skill-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf">
  <summary style="float:left;WIDTH:64px;HEIGHT:64px;background:url(http://i3.ruliweb.com/img/18/07/02/1645956a7cb19dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 고유 능력 - 고물상"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 64px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">고물상</b>
        <br><small>가즈로</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <b style="display:inline-block">고유 능력</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      파괴된 적 구조물이나 직접 설치한 잘나가! 포탑에서 고철이 떨어집니다. 고철을 획득하면 3초에 걸쳐 30의 마나를 회복하고 이 동안 기술의 재사용 대기시간이 세 배 빨리 감소합니다.<br><br>고물상을 사용하면 대상 잘나가! 포탑을 해체해서 고철로 만듭니다.
    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-skill-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf">
  <summary style="float:left;WIDTH:64px;HEIGHT:64px;background:url(http://i3.ruliweb.com/img/18/07/02/1645956a7cb19dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 고유 능력 - 고물상"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 64px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">고물상</b>
        <br><small>가즈로</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <b style="display:inline-block">고유 능력</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      파괴된 적 구조물이나 직접 설치한 잘나가! 포탑에서 고철이 떨어집니다. 고철을 획득하면 3초에 걸쳐 30의 마나를 회복하고 이 동안 기술의 재사용 대기시간이 세 배 빨리 감소합니다.<br><br>고물상을 사용하면 대상 잘나가! 포탑을 해체해서 고철로 만듭니다.
    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-skill-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf">
  <summary style="float:left;WIDTH:64px;HEIGHT:64px;background:url(http://i2.ruliweb.com/img/18/07/02/1645956a00919dc2c.png) center/cover" title="[클릭하여 접기/펼치기] Q - 잘나가! 포탑"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 64px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">잘나가! 포탑</b>
        <br><small>가즈로</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <b style="display:inline-block">Q</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      64(+4%)의 피해를 주는 포탑을 설치합니다. 30초 동안 지속됩니다.<br><br>최대 2회 충전됩니다.<br>
<br><span style="padding-left:1.5em;color:#4be;background:url(http://i1.ruliweb.com/img/18/07/07/164741ab46719dc2c.png) .15em/1em no-repeat"><b>마나</b> 70</span>
<br><span style="padding-left:1.5em;color:#ddd;background:url(http://i2.ruliweb.com/img/18/07/23/164c2a1709319dc2c.png) 0/1.3em no-repeat"><b>충전 대기시간</b> 15초</span>
<br><span style="padding-left:1.5em;color:#d90;background:url(http://i3.ruliweb.com/img/18/07/07/164748d2b0519dc2c.png) 0/1.3em no-repeat"><b>사거리</b> 2 <b>크기</b> 가로 1 × 세로 1 </span>

    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-skill-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf">
  <summary style="float:left;WIDTH:64px;HEIGHT:64px;background:url(http://i2.ruliweb.com/img/18/07/02/1645956a00919dc2c.png) center/cover" title="[클릭하여 접기/펼치기] Q - 잘나가! 포탑"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 64px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">잘나가! 포탑</b>
        <br><small>가즈로</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <b style="display:inline-block">Q</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      64(+4%)의 피해를 주는 포탑을 설치합니다. 30초 동안 지속됩니다.<br><br>최대 2회 충전됩니다.<br>
<br><span style="padding-left:1.5em;color:#4be;background:url(http://i1.ruliweb.com/img/18/07/07/164741ab46719dc2c.png) .15em/1em no-repeat"><b>마나</b> 70</span>
<br><span style="padding-left:1.5em;color:#ddd;background:url(http://i2.ruliweb.com/img/18/07/23/164c2a1709319dc2c.png) 0/1.3em no-repeat"><b>충전 대기시간</b> 15초</span>
<br><span style="padding-left:1.5em;color:#d90;background:url(http://i3.ruliweb.com/img/18/07/07/164748d2b0519dc2c.png) 0/1.3em no-repeat"><b>사거리</b> 2 <b>크기</b> 가로 1 × 세로 1 </span>

    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-skill-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf">
  <summary style="float:left;WIDTH:64px;HEIGHT:64px;background:url(http://i2.ruliweb.com/img/18/07/02/1645956a40719dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 사용 효과 - 집중 포화!"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 64px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">집중 포화!</b>
        <br><small>가즈로</small>
      </div>
      
      
      
       <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #d7a;color:#d7a"> 
        <b style="display:inline-block">사용 효과</b>
      
      
      
       </div>
    </div>
    <div style="color:#bcc">
      
      주위의 잘나가! 포탑들이 대상을 집중 공격하게 만듭니다.<br>
<br><span style="padding-left:1.5em;color:#ddd;background:url(http://i2.ruliweb.com/img/18/07/23/164c2a1709319dc2c.png) 0/1.3em no-repeat"><b>재사용 대기시간</b> 1초</span>

    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-skill-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf">
  <summary style="float:left;WIDTH:64px;HEIGHT:64px;background:url(http://i2.ruliweb.com/img/18/07/02/1645956a40719dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 사용 효과 - 집중 포화!"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 64px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">집중 포화!</b>
        <br><small>가즈로</small>
      </div>
      
      
      
       <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #d7a;color:#d7a"> 
        <b style="display:inline-block">사용 효과</b>
      
      
      
       </div>
    </div>
    <div style="color:#bcc">
      
      주위의 잘나가! 포탑들이 대상을 집중 공격하게 만듭니다.<br>
<br><span style="padding-left:1.5em;color:#ddd;background:url(http://i2.ruliweb.com/img/18/07/23/164c2a1709319dc2c.png) 0/1.3em no-repeat"><b>재사용 대기시간</b> 1초</span>

    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-skill-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf">
  <summary style="float:left;WIDTH:64px;HEIGHT:64px;background:url(http://i3.ruliweb.com/img/18/07/02/1645956889519dc2c.png) center/cover" title="[클릭하여 접기/펼치기] W - 죽이는 레이저"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 64px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">죽이는 레이저</b>
        <br><small>가즈로</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <b style="display:inline-block">W</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      충전 후 공격하여 일직선상의 적들에게 142(+4%)의 피해를 줍니다. 공격력과 사거리는 충전을 오래 할수록 증가하여 3초 후 최대 100% 증가합니다.<br><br>무한정 충전할 수 있습니다.<br>
<br><span style="padding-left:1.5em;color:#4be;background:url(http://i1.ruliweb.com/img/18/07/07/164741ab46719dc2c.png) .15em/1em no-repeat"><b>마나</b> 60</span>
<br><span style="padding-left:1.5em;color:#ddd;background:url(http://i2.ruliweb.com/img/18/07/23/164c2a1709319dc2c.png) 0/1.3em no-repeat"><b>재사용 대기시간</b> 12초</span>
<br><span style="padding-left:1.5em;color:#d90;background:url(http://i3.ruliweb.com/img/18/07/07/164748d2b0519dc2c.png) 0/1.3em no-repeat"><b>최대 사거리</b> 8 &#x2F; 12 &#x2F; 17 <b>너비</b> 1 &#x2F; 2 &#x2F; 5 </span>

    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-skill-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf">
  <summary style="float:left;WIDTH:64px;HEIGHT:64px;background:url(http://i3.ruliweb.com/img/18/07/02/1645956889519dc2c.png) center/cover" title="[클릭하여 접기/펼치기] W - 죽이는 레이저"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 64px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">죽이는 레이저</b>
        <br><small>가즈로</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <b style="display:inline-block">W</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      충전 후 공격하여 일직선상의 적들에게 142(+4%)의 피해를 줍니다. 공격력과 사거리는 충전을 오래 할수록 증가하여 3초 후 최대 100% 증가합니다.<br><br>무한정 충전할 수 있습니다.<br>
<br><span style="padding-left:1.5em;color:#4be;background:url(http://i1.ruliweb.com/img/18/07/07/164741ab46719dc2c.png) .15em/1em no-repeat"><b>마나</b> 60</span>
<br><span style="padding-left:1.5em;color:#ddd;background:url(http://i2.ruliweb.com/img/18/07/23/164c2a1709319dc2c.png) 0/1.3em no-repeat"><b>재사용 대기시간</b> 12초</span>
<br><span style="padding-left:1.5em;color:#d90;background:url(http://i3.ruliweb.com/img/18/07/07/164748d2b0519dc2c.png) 0/1.3em no-repeat"><b>최대 사거리</b> 8 &#x2F; 12 &#x2F; 17 <b>너비</b> 1 &#x2F; 2 &#x2F; 5 </span>

    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-skill-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf">
  <summary style="float:left;WIDTH:64px;HEIGHT:64px;background:url(http://i3.ruliweb.com/img/18/07/02/1645956af9a19dc2c.png) center/cover" title="[클릭하여 접기/펼치기] E - 터진다늄 폭탄"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 64px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">터진다늄 폭탄</b>
        <br><small>가즈로</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <b style="display:inline-block">E</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      폭탄을 설치해 2.5초 후에 대상 지역 안의 적들에게 242(+4%)의 피해를 주고 1.75초 동안 기절시킵니다.<br>
<br><span style="padding-left:1.5em;color:#4be;background:url(http://i1.ruliweb.com/img/18/07/07/164741ab46719dc2c.png) .15em/1em no-repeat"><b>마나</b> 60</span>
<br><span style="padding-left:1.5em;color:#ddd;background:url(http://i2.ruliweb.com/img/18/07/23/164c2a1709319dc2c.png) 0/1.3em no-repeat"><b>재사용 대기시간</b> 14초</span>
<br><span style="padding-left:1.5em;color:#d90;background:url(http://i3.ruliweb.com/img/18/07/07/164748d2b0519dc2c.png) 0/1.3em no-repeat"><b>사거리</b> 9.5 <b>피해 반경</b> 3 </span>

    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-skill-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;border:2px solid #85d;padding:4px;background:linear-gradient(#214,#102) 0;color:#6cf">
  <summary style="float:left;WIDTH:64px;HEIGHT:64px;background:url(http://i3.ruliweb.com/img/18/07/02/1645956af9a19dc2c.png) center/cover" title="[클릭하여 접기/펼치기] E - 터진다늄 폭탄"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 64px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">터진다늄 폭탄</b>
        <br><small>가즈로</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <b style="display:inline-block">E</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      폭탄을 설치해 2.5초 후에 대상 지역 안의 적들에게 242(+4%)의 피해를 주고 1.75초 동안 기절시킵니다.<br>
<br><span style="padding-left:1.5em;color:#4be;background:url(http://i1.ruliweb.com/img/18/07/07/164741ab46719dc2c.png) .15em/1em no-repeat"><b>마나</b> 60</span>
<br><span style="padding-left:1.5em;color:#ddd;background:url(http://i2.ruliweb.com/img/18/07/23/164c2a1709319dc2c.png) 0/1.3em no-repeat"><b>재사용 대기시간</b> 14초</span>
<br><span style="padding-left:1.5em;color:#d90;background:url(http://i3.ruliweb.com/img/18/07/07/164748d2b0519dc2c.png) 0/1.3em no-repeat"><b>사거리</b> 9.5 <b>피해 반경</b> 3 </span>

    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>

`

exports['HotsDialog.renderers Inserted templates generates talent info table correctly 1'] = `
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/1645954582b19dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 향상된 조준 (능력 강화 (Q) - 레벨 1)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">향상된 조준</b>
        <br><small>피닉스 - 레벨 1</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">Q</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      <img style="HEIGHT: 1.3em; vertical-align: -20%" src="http://i1.ruliweb.com/img/18/07/08/164761a813c19dc2c.png" alt="퀘스트" title="퀘스트"> <b style="color: #fb0">퀘스트</b>: 플라스마 절단기가 적 영웅에게 적중할 때마다 일반 공격력이 0.5 증가하여 최대 60 증가합니다.<br><img style="HEIGHT: 1.3em; vertical-align: -20%" src="http://i1.ruliweb.com/img/18/07/08/164761a813c19dc2c.png" alt="보상" title="보상"> <b style="color: #fb0">보상</b>: 플라스마 절단기가 적 영웅에게 30회 이상 적중하면 플라스마 절단기가 1회 더 회전합니다.
    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/1645954582b19dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 향상된 조준 (능력 강화 (Q) - 레벨 1)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">향상된 조준</b>
        <br><small>피닉스 - 레벨 1</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">Q</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      <img style="HEIGHT: 1.3em; vertical-align: -20%" src="http://i1.ruliweb.com/img/18/07/08/164761a813c19dc2c.png" alt="퀘스트" title="퀘스트"> <b style="color: #fb0">퀘스트</b>: 플라스마 절단기가 적 영웅에게 적중할 때마다 일반 공격력이 0.5 증가하여 최대 60 증가합니다.<br><img style="HEIGHT: 1.3em; vertical-align: -20%" src="http://i1.ruliweb.com/img/18/07/08/164761a813c19dc2c.png" alt="보상" title="보상"> <b style="color: #fb0">보상</b>: 플라스마 절단기가 적 영웅에게 30회 이상 적중하면 플라스마 절단기가 1회 더 회전합니다.
    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/16459546f9219dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 광자 집중 (능력 강화 (W) - 레벨 1)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">광자 집중</b>
        <br><small>피닉스 - 레벨 1</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">W</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      연발포로 적 영웅에게 피해를 3회 주면 다음 위상 폭탄의 공격력이 150% 증가하고 방사 피해의 범위가 50% 증가합니다.
    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/16459546f9219dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 광자 집중 (능력 강화 (W) - 레벨 1)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">광자 집중</b>
        <br><small>피닉스 - 레벨 1</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">W</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      연발포로 적 영웅에게 피해를 3회 주면 다음 위상 폭탄의 공격력이 150% 증가하고 방사 피해의 범위가 50% 증가합니다.
    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i3.ruliweb.com/img/18/07/02/1645954738019dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 기동타격 (능력 강화 (W) - 레벨 1)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">기동타격</b>
        <br><small>피닉스 - 레벨 1</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">W</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      이동하면 다음 일반 공격이 35%의 추가 피해를 줍니다.
    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i3.ruliweb.com/img/18/07/02/1645954738019dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 기동타격 (능력 강화 (W) - 레벨 1)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">기동타격</b>
        <br><small>피닉스 - 레벨 1</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">W</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      이동하면 다음 일반 공격이 35%의 추가 피해를 줍니다.
    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i3.ruliweb.com/img/18/07/02/1645954738019dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 목표 확인 (능력 강화 (W) - 레벨 4)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">목표 확인</b>
        <br><small>피닉스 - 레벨 4</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">W</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      느려진 적 영웅을 연발포로 일반 공격하면 이동 속도가 4초 동안 10% 증가하여 최대 40% 증가합니다.
    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i3.ruliweb.com/img/18/07/02/1645954738019dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 목표 확인 (능력 강화 (W) - 레벨 4)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">목표 확인</b>
        <br><small>피닉스 - 레벨 4</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">W</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      느려진 적 영웅을 연발포로 일반 공격하면 이동 속도가 4초 동안 10% 증가하여 최대 40% 증가합니다.
    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/16459546f9219dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 에너지 억제 (능력 강화 (W) - 레벨 4)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">에너지 억제</b>
        <br><small>피닉스 - 레벨 4</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">W</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      위상 폭탄이 활성화된 동안 플라스마 절단기로 느려진 적 영웅에게 일반 공격을 하면 주위 모든 적들을 4초 동안 35% 느려지게 합니다.
    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/16459546f9219dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 에너지 억제 (능력 강화 (W) - 레벨 4)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">에너지 억제</b>
        <br><small>피닉스 - 레벨 4</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">W</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      위상 폭탄이 활성화된 동안 플라스마 절단기로 느려진 적 영웅에게 일반 공격을 하면 주위 모든 적들을 4초 동안 35% 느려지게 합니다.
    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/16459546bc719dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 차원로 (능력 강화 (E) - 레벨 4)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">차원로</b>
        <br><small>피닉스 - 레벨 4</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">E</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      적 영웅을 처치하면 차원이동의 재사용 대기시간이 초기화됩니다.
    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/16459546bc719dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 차원로 (능력 강화 (E) - 레벨 4)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">차원로</b>
        <br><small>피닉스 - 레벨 4</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">E</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      적 영웅을 처치하면 차원이동의 재사용 대기시간이 초기화됩니다.
    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/1645954600319dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 긴급 프로토콜 (능력 강화 (고유 능력) - 레벨 4)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">긴급 프로토콜</b>
        <br><small>피닉스 - 레벨 4</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">고유 능력</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      보호막 축전기의 보호막이 파괴되면 이동 속도가 5초 동안 25% 증가합니다.
    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/1645954600319dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 긴급 프로토콜 (능력 강화 (고유 능력) - 레벨 4)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">긴급 프로토콜</b>
        <br><small>피닉스 - 레벨 4</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">고유 능력</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      보호막 축전기의 보호막이 파괴되면 이동 속도가 5초 동안 25% 증가합니다.
    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/1645954582b19dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 전술적 이점 (능력 강화 (Q) - 레벨 7)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">전술적 이점</b>
        <br><small>피닉스 - 레벨 7</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">Q</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      플라스마 절단기가 느려진 대상에게 35%의 추가 피해를 줍니다.
    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/1645954582b19dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 전술적 이점 (능력 강화 (Q) - 레벨 7)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">전술적 이점</b>
        <br><small>피닉스 - 레벨 7</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">Q</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      플라스마 절단기가 느려진 대상에게 35%의 추가 피해를 줍니다.
    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/16459546bc719dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 전술적 차원이동 (능력 강화 (E) - 레벨 7)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">전술적 차원이동</b>
        <br><small>피닉스 - 레벨 7</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">E</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      차원이동을 마친 후 연발포의 공격 속도가 4초 동안 175% 증가합니다.
    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/16459546bc719dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 전술적 차원이동 (능력 강화 (E) - 레벨 7)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">전술적 차원이동</b>
        <br><small>피닉스 - 레벨 7</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">E</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      차원이동을 마친 후 연발포의 공격 속도가 4초 동안 175% 증가합니다.
    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i3.ruliweb.com/img/18/07/02/1645954738019dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 동력 전환: 무기 (사용 효과 - 레벨 7)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">동력 전환: 무기</b>
        <br><small>피닉스 - 레벨 7</small>
      </div>
      
      
      
       <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #d7a;color:#d7a"> 
        <b style="display:inline-block">사용 효과</b>
      
      
      
       </div>
    </div>
    <div style="color:#bcc">
      
      사용하면 보호막 축전기의 보호막을 모두 소모합니다. 소모한 보호막에 비례하여 일반 공격력이 5초 동안 최대 80% 증가합니다.<br>
<br><span style="padding-left:1.5em;color:#ddd;background:url(http://i2.ruliweb.com/img/18/07/23/164c2a1709319dc2c.png) 0/1.3em no-repeat"><b>재사용 대기시간</b> 20초</span>

    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i3.ruliweb.com/img/18/07/02/1645954738019dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 동력 전환: 무기 (사용 효과 - 레벨 7)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">동력 전환: 무기</b>
        <br><small>피닉스 - 레벨 7</small>
      </div>
      
      
      
       <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #d7a;color:#d7a"> 
        <b style="display:inline-block">사용 효과</b>
      
      
      
       </div>
    </div>
    <div style="color:#bcc">
      
      사용하면 보호막 축전기의 보호막을 모두 소모합니다. 소모한 보호막에 비례하여 일반 공격력이 5초 동안 최대 80% 증가합니다.<br>
<br><span style="padding-left:1.5em;color:#ddd;background:url(http://i2.ruliweb.com/img/18/07/23/164c2a1709319dc2c.png) 0/1.3em no-repeat"><b>재사용 대기시간</b> 20초</span>

    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/16459545c1319dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 정화 개시 (R - 레벨 10)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">정화 개시</b>
        <br><small>피닉스 - 레벨 10</small>
      </div>
      
       <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #da7;color:#da7"> 
      
      
        <b style="display:inline-block">R</b>
      
       </div>
      
      
    </div>
    <div style="color:#bcc">
      
      1.5초 동안 정신을 집중하여 전방에 호를 그리듯 적 영웅을 포착합니다. 정신 집중이 끝나면 포착한 적 영웅들에게 각각 5발의 유도탄을 발사해 각각 89(+4%)의 피해를 줍니다. 느려진 대상에게는 50%의 추가 피해를 줍니다.<br>
<br><span style="padding-left:1.5em;color:#ddd;background:url(http://i2.ruliweb.com/img/18/07/23/164c2a1709319dc2c.png) 0/1.3em no-repeat"><b>재사용 대기시간</b> 90초</span>
<br><span style="padding-left:1.5em;color:#d90;background:url(http://i3.ruliweb.com/img/18/07/07/164748d2b0519dc2c.png) 0/1.3em no-repeat"><b>포착 반경</b> 13.25 <b>중심각</b> 180° </span>

    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/16459545c1319dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 정화 개시 (R - 레벨 10)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">정화 개시</b>
        <br><small>피닉스 - 레벨 10</small>
      </div>
      
       <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #da7;color:#da7"> 
      
      
        <b style="display:inline-block">R</b>
      
       </div>
      
      
    </div>
    <div style="color:#bcc">
      
      1.5초 동안 정신을 집중하여 전방에 호를 그리듯 적 영웅을 포착합니다. 정신 집중이 끝나면 포착한 적 영웅들에게 각각 5발의 유도탄을 발사해 각각 89(+4%)의 피해를 줍니다. 느려진 대상에게는 50%의 추가 피해를 줍니다.<br>
<br><span style="padding-left:1.5em;color:#ddd;background:url(http://i2.ruliweb.com/img/18/07/23/164c2a1709319dc2c.png) 0/1.3em no-repeat"><b>재사용 대기시간</b> 90초</span>
<br><span style="padding-left:1.5em;color:#d90;background:url(http://i3.ruliweb.com/img/18/07/07/164748d2b0519dc2c.png) 0/1.3em no-repeat"><b>포착 반경</b> 13.25 <b>중심각</b> 180° </span>

    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i1.ruliweb.com/img/18/07/02/1645954544319dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 행성 분열기 (R - 레벨 10)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">행성 분열기</b>
        <br><small>피닉스 - 레벨 10</small>
      </div>
      
       <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #da7;color:#da7"> 
      
      
        <b style="display:inline-block">R</b>
      
       </div>
      
      
    </div>
    <div style="color:#bcc">
      
      0.5초 후, 전장을 가로지르는 광선을 발사하여 구조물이 아닌 적에게 4초 동안 0.25초마다 116(+4%)의 피해를 줍니다.<br>
<br><span style="padding-left:1.5em;color:#ddd;background:url(http://i2.ruliweb.com/img/18/07/23/164c2a1709319dc2c.png) 0/1.3em no-repeat"><b>재사용 대기시간</b> 100초</span>
<br><span style="padding-left:1.5em;color:#d90;background:url(http://i3.ruliweb.com/img/18/07/07/164748d2b0519dc2c.png) 0/1.3em no-repeat"><b>사거리</b> ∞ <b>너비</b> 2 </span>

    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i1.ruliweb.com/img/18/07/02/1645954544319dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 행성 분열기 (R - 레벨 10)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">행성 분열기</b>
        <br><small>피닉스 - 레벨 10</small>
      </div>
      
       <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #da7;color:#da7"> 
      
      
        <b style="display:inline-block">R</b>
      
       </div>
      
      
    </div>
    <div style="color:#bcc">
      
      0.5초 후, 전장을 가로지르는 광선을 발사하여 구조물이 아닌 적에게 4초 동안 0.25초마다 116(+4%)의 피해를 줍니다.<br>
<br><span style="padding-left:1.5em;color:#ddd;background:url(http://i2.ruliweb.com/img/18/07/23/164c2a1709319dc2c.png) 0/1.3em no-repeat"><b>재사용 대기시간</b> 100초</span>
<br><span style="padding-left:1.5em;color:#d90;background:url(http://i3.ruliweb.com/img/18/07/07/164748d2b0519dc2c.png) 0/1.3em no-repeat"><b>사거리</b> ∞ <b>너비</b> 2 </span>

    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/16459546bc719dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 아다늄 장갑 (능력 강화 (E) - 레벨 13)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">아다늄 장갑</b>
        <br><small>피닉스 - 레벨 13</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">E</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      차원이동을 마친 후 방어력이 4초 동안 50 증가합니다.
    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/16459546bc719dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 아다늄 장갑 (능력 강화 (E) - 레벨 13)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">아다늄 장갑</b>
        <br><small>피닉스 - 레벨 13</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">E</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      차원이동을 마친 후 방어력이 4초 동안 50 증가합니다.
    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/1645954600319dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 감쇠장 (능력 강화 (고유 능력) - 레벨 13)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">감쇠장</b>
        <br><small>피닉스 - 레벨 13</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">고유 능력</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      보호막 축전기의 보호막이 지속되는 동안 기술 방어력이 20 증가합니다.
    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/1645954600319dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 감쇠장 (능력 강화 (고유 능력) - 레벨 13)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">감쇠장</b>
        <br><small>피닉스 - 레벨 13</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">고유 능력</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      보호막 축전기의 보호막이 지속되는 동안 기술 방어력이 20 증가합니다.
    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i1.ruliweb.com/img/18/07/02/164595463e119dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 신속 재충전 (능력 강화 (고유 능력) - 레벨 13)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">신속 재충전</b>
        <br><small>피닉스 - 레벨 13</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">고유 능력</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      생명력을 회복할 때마다 회복량의 60%만큼 보호막 축전기의 보호막이 재생됩니다.
    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i1.ruliweb.com/img/18/07/02/164595463e119dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 신속 재충전 (능력 강화 (고유 능력) - 레벨 13)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">신속 재충전</b>
        <br><small>피닉스 - 레벨 13</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">고유 능력</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      생명력을 회복할 때마다 회복량의 60%만큼 보호막 축전기의 보호막이 재생됩니다.
    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i1.ruliweb.com/img/18/07/02/164595467f219dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 보조 보호막 (능력 강화 (고유 능력) - 레벨 13)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">보조 보호막</b>
        <br><small>피닉스 - 레벨 13</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">고유 능력</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      최대 생명력이 10% 감소하지만 보호막 축전기의 보호막이 20% 증가합니다. 일반 공격을 하면 준 피해의 10%만큼 보호막이 재생됩니다.
    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i1.ruliweb.com/img/18/07/02/164595467f219dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 보조 보호막 (능력 강화 (고유 능력) - 레벨 13)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">보조 보호막</b>
        <br><small>피닉스 - 레벨 13</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">고유 능력</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      최대 생명력이 10% 감소하지만 보호막 축전기의 보호막이 20% 증가합니다. 일반 공격을 하면 준 피해의 10%만큼 보호막이 재생됩니다.
    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i3.ruliweb.com/img/18/07/02/1645954738019dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 맹공 (능력 강화 (W) - 레벨 16)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">맹공</b>
        <br><small>피닉스 - 레벨 16</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">W</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      연발포가 적 영웅에게 3회 적중할 때마다 대상의 최대 생명력의 6%만큼 추가 피해를 줍니다.
    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i3.ruliweb.com/img/18/07/02/1645954738019dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 맹공 (능력 강화 (W) - 레벨 16)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">맹공</b>
        <br><small>피닉스 - 레벨 16</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">W</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      연발포가 적 영웅에게 3회 적중할 때마다 대상의 최대 생명력의 6%만큼 추가 피해를 줍니다.
    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/1645954600319dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 광자 무기 (능력 강화 (고유 능력) - 레벨 16)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">광자 무기</b>
        <br><small>피닉스 - 레벨 16</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">고유 능력</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      보호막 축전기의 보호막이 지속되는 동안 공격력이 15% 증가합니다.
    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/1645954600319dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 광자 무기 (능력 강화 (고유 능력) - 레벨 16)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">광자 무기</b>
        <br><small>피닉스 - 레벨 16</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">고유 능력</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      보호막 축전기의 보호막이 지속되는 동안 공격력이 15% 증가합니다.
    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i1.ruliweb.com/img/18/07/02/16459475bf219dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 무기 과충전 (지속 효과 - 레벨 16)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">무기 과충전</b>
        <br><small>피닉스 - 레벨 16</small>
      </div>
      
      
      <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #6ba;color:#6ba">
      
        <b style="display:inline-block">지속 효과</b>
      
      
      </div>
      
    </div>
    <div style="color:#bcc">
      
      일반 공격을 할 때마다 기술의 재사용 대기시간이 0.5초 감소합니다.
    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i1.ruliweb.com/img/18/07/02/16459475bf219dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 무기 과충전 (지속 효과 - 레벨 16)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">무기 과충전</b>
        <br><small>피닉스 - 레벨 16</small>
      </div>
      
      
      <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #6ba;color:#6ba">
      
        <b style="display:inline-block">지속 효과</b>
      
      
      </div>
      
    </div>
    <div style="color:#bcc">
      
      일반 공격을 할 때마다 기술의 재사용 대기시간이 0.5초 감소합니다.
    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/1645954582b19dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 후속 공격 (능력 강화 (Q) - 레벨 20)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">후속 공격</b>
        <br><small>피닉스 - 레벨 20</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">Q</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      플라스마 절단기가 적 영웅에게 적중하면 0.5초 후에 대상 영웅에게 정화 개시 유도탄을 발사하여 89(+4%)의 피해를 줍니다. 느려진 대상에게는 50%의 추가 피해를 줍니다.
    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/1645954582b19dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 후속 공격 (능력 강화 (Q) - 레벨 20)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">후속 공격</b>
        <br><small>피닉스 - 레벨 20</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">Q</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      플라스마 절단기가 적 영웅에게 적중하면 0.5초 후에 대상 영웅에게 정화 개시 유도탄을 발사하여 89(+4%)의 피해를 줍니다. 느려진 대상에게는 50%의 추가 피해를 줍니다.
    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i3.ruliweb.com/img/18/07/02/1645954738019dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 특이점 장전 (능력 강화 (W) - 레벨 20)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">특이점 장전</b>
        <br><small>피닉스 - 레벨 20</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">W</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      연발포의 공격 속도가 100% 증가하고 위상 폭탄의 사거리가 1.25 증가합니다.
    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i3.ruliweb.com/img/18/07/02/1645954738019dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 특이점 장전 (능력 강화 (W) - 레벨 20)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">특이점 장전</b>
        <br><small>피닉스 - 레벨 20</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">W</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      연발포의 공격 속도가 100% 증가하고 위상 폭탄의 사거리가 1.25 증가합니다.
    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/1645954600319dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 굴하지 않는 정신 (능력 강화 (고유 능력) - 레벨 20)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">굴하지 않는 정신</b>
        <br><small>피닉스 - 레벨 20</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">고유 능력</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      죽음에 이르는 피해를 받으면 보호막 충전기의 보호막이 832(+4%) 재생됩니다. 이 효과는 120초에 한 번씩만 발동합니다.
    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/1645954600319dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 굴하지 않는 정신 (능력 강화 (고유 능력) - 레벨 20)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">굴하지 않는 정신</b>
        <br><small>피닉스 - 레벨 20</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">고유 능력</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      죽음에 이르는 피해를 받으면 보호막 충전기의 보호막이 832(+4%) 재생됩니다. 이 효과는 120초에 한 번씩만 발동합니다.
    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/164595f2aa219dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 쉬운 사냥감 (지속 효과 - 레벨 1)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">쉬운 사냥감</b>
        <br><small>렉사르 - 레벨 1</small>
      </div>
      
      
      <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #6ba;color:#6ba">
      
        <b style="display:inline-block">지속 효과</b>
      
      
      </div>
      
    </div>
    <div style="color:#bcc">
      
      미샤가 돌격병과 용병에게 주는 피해가 150% 증가하고, 돌격병과 용병을 상대로 방어력이 50 증가하여 받는 피해가 50% 감소합니다.
    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/164595f2aa219dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 쉬운 사냥감 (지속 효과 - 레벨 1)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">쉬운 사냥감</b>
        <br><small>렉사르 - 레벨 1</small>
      </div>
      
      
      <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #6ba;color:#6ba">
      
        <b style="display:inline-block">지속 효과</b>
      
      
      </div>
      
    </div>
    <div style="color:#bcc">
      
      미샤가 돌격병과 용병에게 주는 피해가 150% 증가하고, 돌격병과 용병을 상대로 방어력이 50 증가하여 받는 피해가 50% 감소합니다.
    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i1.ruliweb.com/img/18/07/02/164595f2c2019dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 맹금 (능력 강화 (Q) - 레벨 1)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">맹금</b>
        <br><small>렉사르 - 레벨 1</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">Q</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      기백 날리기가 돌격병에게 150%의 추가 피해를 줍니다.
    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i1.ruliweb.com/img/18/07/02/164595f2c2019dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 맹금 (능력 강화 (Q) - 레벨 1)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">맹금</b>
        <br><small>렉사르 - 레벨 1</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">Q</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      기백 날리기가 돌격병에게 150%의 추가 피해를 줍니다.
    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i1.ruliweb.com/img/18/07/02/164595f266519dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 섬광탄 (사용 효과 - 레벨 1)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">섬광탄</b>
        <br><small>렉사르 - 레벨 1</small>
      </div>
      
      
      
       <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #d7a;color:#d7a"> 
        <b style="display:inline-block">사용 효과</b>
      
      
      
       </div>
    </div>
    <div style="color:#bcc">
      
      대상 위치에 섬광탄을 발사해 20초 동안 주위를 드러냅니다.<br>
<br><span style="padding-left:1.5em;color:#ddd;background:url(http://i2.ruliweb.com/img/18/07/23/164c2a1709319dc2c.png) 0/1.3em no-repeat"><b>재사용 대기시간</b> 20초</span>
<br><span style="padding-left:1.5em;color:#d90;background:url(http://i3.ruliweb.com/img/18/07/07/164748d2b0519dc2c.png) 0/1.3em no-repeat"><b>사거리</b> 15 <b>시야 반경</b> 8 </span>

    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i1.ruliweb.com/img/18/07/02/164595f266519dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 섬광탄 (사용 효과 - 레벨 1)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">섬광탄</b>
        <br><small>렉사르 - 레벨 1</small>
      </div>
      
      
      
       <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #d7a;color:#d7a"> 
        <b style="display:inline-block">사용 효과</b>
      
      
      
       </div>
    </div>
    <div style="color:#bcc">
      
      대상 위치에 섬광탄을 발사해 20초 동안 주위를 드러냅니다.<br>
<br><span style="padding-left:1.5em;color:#ddd;background:url(http://i2.ruliweb.com/img/18/07/23/164c2a1709319dc2c.png) 0/1.3em no-repeat"><b>재사용 대기시간</b> 20초</span>
<br><span style="padding-left:1.5em;color:#d90;background:url(http://i3.ruliweb.com/img/18/07/07/164748d2b0519dc2c.png) 0/1.3em no-repeat"><b>사거리</b> 15 <b>시야 반경</b> 8 </span>

    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/164595f2aa219dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 굶주린 곰 (지속 효과 - 레벨 4)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">굶주린 곰</b>
        <br><small>렉사르 - 레벨 4</small>
      </div>
      
      
      <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #6ba;color:#6ba">
      
        <b style="display:inline-block">지속 효과</b>
      
      
      </div>
      
    </div>
    <div style="color:#bcc">
      
      미샤가 일반 공격으로 최대 생명력의 4.5%를 회복합니다.
    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/164595f2aa219dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 굶주린 곰 (지속 효과 - 레벨 4)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">굶주린 곰</b>
        <br><small>렉사르 - 레벨 4</small>
      </div>
      
      
      <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #6ba;color:#6ba">
      
        <b style="display:inline-block">지속 효과</b>
      
      
      </div>
      
    </div>
    <div style="color:#bcc">
      
      미샤가 일반 공격으로 최대 생명력의 4.5%를 회복합니다.
    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i1.ruliweb.com/img/18/07/02/16459530fdd19dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 수집 사냥꾼 (지속 효과 - 레벨 4)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">수집 사냥꾼</b>
        <br><small>렉사르 - 레벨 4</small>
      </div>
      
      
      <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #6ba;color:#6ba">
      
        <b style="display:inline-block">지속 효과</b>
      
      
      </div>
      
    </div>
    <div style="color:#bcc">
      
      <img style="HEIGHT: 1.3em; vertical-align: -20%" src="http://i1.ruliweb.com/img/18/07/08/164761a813c19dc2c.png" alt="퀘스트" title="퀘스트"> <b style="color: #fb0">퀘스트</b>: 재생의 구슬을 획득할 때마다 렉사르의 초당 생명력 재생량이 1.25 증가하여 최대 25 증가합니다.<br><img style="HEIGHT: 1.3em; vertical-align: -20%" src="http://i1.ruliweb.com/img/18/07/08/164761a813c19dc2c.png" alt="보상" title="보상"> <b style="color: #fb0">보상</b>: 재생의 구슬을 20개 이상 획득하면 렉사르와 미샤의 방어력이 10 증가합니다.
    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i1.ruliweb.com/img/18/07/02/16459530fdd19dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 수집 사냥꾼 (지속 효과 - 레벨 4)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">수집 사냥꾼</b>
        <br><small>렉사르 - 레벨 4</small>
      </div>
      
      
      <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #6ba;color:#6ba">
      
        <b style="display:inline-block">지속 효과</b>
      
      
      </div>
      
    </div>
    <div style="color:#bcc">
      
      <img style="HEIGHT: 1.3em; vertical-align: -20%" src="http://i1.ruliweb.com/img/18/07/08/164761a813c19dc2c.png" alt="퀘스트" title="퀘스트"> <b style="color: #fb0">퀘스트</b>: 재생의 구슬을 획득할 때마다 렉사르의 초당 생명력 재생량이 1.25 증가하여 최대 25 증가합니다.<br><img style="HEIGHT: 1.3em; vertical-align: -20%" src="http://i1.ruliweb.com/img/18/07/08/164761a813c19dc2c.png" alt="보상" title="보상"> <b style="color: #fb0">보상</b>: 재생의 구슬을 20개 이상 획득하면 렉사르와 미샤의 방어력이 10 증가합니다.
    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i1.ruliweb.com/img/18/07/02/1645948925919dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 추적자의 인내 (지속 효과 - 레벨 4)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">추적자의 인내</b>
        <br><small>렉사르 - 레벨 4</small>
      </div>
      
      
      <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #6ba;color:#6ba">
      
        <b style="display:inline-block">지속 효과</b>
      
      
      </div>
      
    </div>
    <div style="color:#bcc">
      
      6초마다 렉사르와 미샤의 물리 방어력이 75 증가하여 다음 영웅 일반 공격으로 받는 피해가 75% 감소합니다.<br><br>최대 2회 충전됩니다. 렉사르 또는 미샤가 일반 공격을 할 때마다 각자의 재사용 대기시간이 감소합니다.
    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i1.ruliweb.com/img/18/07/02/1645948925919dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 추적자의 인내 (지속 효과 - 레벨 4)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">추적자의 인내</b>
        <br><small>렉사르 - 레벨 4</small>
      </div>
      
      
      <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #6ba;color:#6ba">
      
        <b style="display:inline-block">지속 효과</b>
      
      
      </div>
      
    </div>
    <div style="color:#bcc">
      
      6초마다 렉사르와 미샤의 물리 방어력이 75 증가하여 다음 영웅 일반 공격으로 받는 피해가 75% 감소합니다.<br><br>최대 2회 충전됩니다. 렉사르 또는 미샤가 일반 공격을 할 때마다 각자의 재사용 대기시간이 감소합니다.
    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i3.ruliweb.com/img/18/07/02/164595f21aa19dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 생존 일지 (지속 효과 - 레벨 4)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">생존 일지</b>
        <br><small>렉사르 - 레벨 4</small>
      </div>
      
      
      <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #6ba;color:#6ba">
      
        <b style="display:inline-block">지속 효과</b>
      
      
      </div>
      
    </div>
    <div style="color:#bcc">
      
      렉사르가 살아 있는 1초마다 렉사르와 미샤의 최대 생명력이 2 증가합니다. 렉사르가 죽으면 이 증가량은 사라집니다.
    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i3.ruliweb.com/img/18/07/02/164595f21aa19dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 생존 일지 (지속 효과 - 레벨 4)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">생존 일지</b>
        <br><small>렉사르 - 레벨 4</small>
      </div>
      
      
      <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #6ba;color:#6ba">
      
        <b style="display:inline-block">지속 효과</b>
      
      
      </div>
      
    </div>
    <div style="color:#bcc">
      
      렉사르가 살아 있는 1초마다 렉사르와 미샤의 최대 생명력이 2 증가합니다. 렉사르가 죽으면 이 증가량은 사라집니다.
    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/164595f298219dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 야수의 상 (능력 강화 (W) - 레벨 7)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">야수의 상</b>
        <br><small>렉사르 - 레벨 7</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">W</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      미샤의 일반 공격이 미샤, 돌진!의 재사용 대기시간을 1.25초 감소시킵니다.
    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/164595f298219dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 야수의 상 (능력 강화 (W) - 레벨 7)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">야수의 상</b>
        <br><small>렉사르 - 레벨 7</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">W</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      미샤의 일반 공격이 미샤, 돌진!의 재사용 대기시간을 1.25초 감소시킵니다.
    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i1.ruliweb.com/img/18/07/02/164595f2c2019dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 마비의 발톱 (능력 강화 (Q) - 레벨 7)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">마비의 발톱</b>
        <br><small>렉사르 - 레벨 7</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">Q</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      기백 날리기의 감속 효과가 50%로 증가하고 지속 시간이  3.5초로 증가합니다.
    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i1.ruliweb.com/img/18/07/02/164595f2c2019dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 마비의 발톱 (능력 강화 (Q) - 레벨 7)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">마비의 발톱</b>
        <br><small>렉사르 - 레벨 7</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">Q</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      기백 날리기의 감속 효과가 50%로 증가하고 지속 시간이  3.5초로 증가합니다.
    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i1.ruliweb.com/img/18/07/02/164595f2d9719dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 날렵한 비행 (능력 강화 (Q) - 레벨 7)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">날렵한 비행</b>
        <br><small>렉사르 - 레벨 7</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">Q</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      기백 날리기의 사거리가 20% 증가합니다. 기백 날리기가 적 영웅에게 적중하면 소모한 마나를 돌려받고 재사용 대기시간이 2초 감소합니다.
    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i1.ruliweb.com/img/18/07/02/164595f2d9719dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 날렵한 비행 (능력 강화 (Q) - 레벨 7)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">날렵한 비행</b>
        <br><small>렉사르 - 레벨 7</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">Q</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      기백 날리기의 사거리가 20% 증가합니다. 기백 날리기가 적 영웅에게 적중하면 소모한 마나를 돌려받고 재사용 대기시간이 2초 감소합니다.
    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i1.ruliweb.com/img/18/07/02/164595f234119dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 야수의 격노 (R - 레벨 10)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">야수의 격노</b>
        <br><small>렉사르 - 레벨 10</small>
      </div>
      
       <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #da7;color:#da7"> 
      
      
        <b style="display:inline-block">R</b>
      
       </div>
      
      
    </div>
    <div style="color:#bcc">
      
      미샤의 일반 공격력이 12초 동안 150% 증가합니다.<br>
<br><span style="padding-left:1.5em;color:#4be;background:url(http://i1.ruliweb.com/img/18/07/07/164741ab46719dc2c.png) .15em/1em no-repeat"><b>마나</b> 75</span>
<br><span style="padding-left:1.5em;color:#ddd;background:url(http://i2.ruliweb.com/img/18/07/23/164c2a1709319dc2c.png) 0/1.3em no-repeat"><b>재사용 대기시간</b> 50초</span>

    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i1.ruliweb.com/img/18/07/02/164595f234119dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 야수의 격노 (R - 레벨 10)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">야수의 격노</b>
        <br><small>렉사르 - 레벨 10</small>
      </div>
      
       <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #da7;color:#da7"> 
      
      
        <b style="display:inline-block">R</b>
      
       </div>
      
      
    </div>
    <div style="color:#bcc">
      
      미샤의 일반 공격력이 12초 동안 150% 증가합니다.<br>
<br><span style="padding-left:1.5em;color:#4be;background:url(http://i1.ruliweb.com/img/18/07/07/164741ab46719dc2c.png) .15em/1em no-repeat"><b>마나</b> 75</span>
<br><span style="padding-left:1.5em;color:#ddd;background:url(http://i2.ruliweb.com/img/18/07/23/164c2a1709319dc2c.png) 0/1.3em no-repeat"><b>재사용 대기시간</b> 50초</span>

    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/164595f2f3319dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 멧돼지를 풀어라 (R - 레벨 10)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">멧돼지를 풀어라</b>
        <br><small>렉사르 - 레벨 10</small>
      </div>
      
       <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #da7;color:#da7"> 
      
      
        <b style="display:inline-block">R</b>
      
       </div>
      
      
    </div>
    <div style="color:#bcc">
      
      모든 적 영웅을 추적하는 멧돼지 무리를 일정 방향으로 풀어 114(+4%)의 피해를 주고, 모습이 드러나게 하며, 5초 동안 40% 느려지게 합니다.<br>
<br><span style="padding-left:1.5em;color:#4be;background:url(http://i1.ruliweb.com/img/18/07/07/164741ab46719dc2c.png) .15em/1em no-repeat"><b>마나</b> 75</span>
<br><span style="padding-left:1.5em;color:#ddd;background:url(http://i2.ruliweb.com/img/18/07/23/164c2a1709319dc2c.png) 0/1.3em no-repeat"><b>재사용 대기시간</b> 60초</span>
<br><span style="padding-left:1.5em;color:#d90;background:url(http://i3.ruliweb.com/img/18/07/07/164748d2b0519dc2c.png) 0/1.3em no-repeat"><b>사거리</b> 25 <b>중심각</b> 50° </span>

    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/164595f2f3319dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 멧돼지를 풀어라 (R - 레벨 10)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">멧돼지를 풀어라</b>
        <br><small>렉사르 - 레벨 10</small>
      </div>
      
       <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #da7;color:#da7"> 
      
      
        <b style="display:inline-block">R</b>
      
       </div>
      
      
    </div>
    <div style="color:#bcc">
      
      모든 적 영웅을 추적하는 멧돼지 무리를 일정 방향으로 풀어 114(+4%)의 피해를 주고, 모습이 드러나게 하며, 5초 동안 40% 느려지게 합니다.<br>
<br><span style="padding-left:1.5em;color:#4be;background:url(http://i1.ruliweb.com/img/18/07/07/164741ab46719dc2c.png) .15em/1em no-repeat"><b>마나</b> 75</span>
<br><span style="padding-left:1.5em;color:#ddd;background:url(http://i2.ruliweb.com/img/18/07/23/164c2a1709319dc2c.png) 0/1.3em no-repeat"><b>재사용 대기시간</b> 60초</span>
<br><span style="padding-left:1.5em;color:#d90;background:url(http://i3.ruliweb.com/img/18/07/07/164748d2b0519dc2c.png) 0/1.3em no-repeat"><b>사거리</b> 25 <b>중심각</b> 50° </span>

    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i1.ruliweb.com/img/18/07/02/1645948a1fd19dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 야생불곰 (지속 효과 - 레벨 13)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">야생불곰</b>
        <br><small>렉사르 - 레벨 13</small>
      </div>
      
      
      <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #6ba;color:#6ba">
      
        <b style="display:inline-block">지속 효과</b>
      
      
      </div>
      
    </div>
    <div style="color:#bcc">
      
      미샤가 주위 적들에게 초당 29(+4%)의 피해를 줍니다.<br>
<br><span style="padding-left:1.5em;color:#d90;background:url(http://i3.ruliweb.com/img/18/07/07/164748d2b0519dc2c.png) 0/1.3em no-repeat"><b>피해 반경</b> 2.5 </span>

    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i1.ruliweb.com/img/18/07/02/1645948a1fd19dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 야생불곰 (지속 효과 - 레벨 13)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">야생불곰</b>
        <br><small>렉사르 - 레벨 13</small>
      </div>
      
      
      <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #6ba;color:#6ba">
      
        <b style="display:inline-block">지속 효과</b>
      
      
      </div>
      
    </div>
    <div style="color:#bcc">
      
      미샤가 주위 적들에게 초당 29(+4%)의 피해를 줍니다.<br>
<br><span style="padding-left:1.5em;color:#d90;background:url(http://i3.ruliweb.com/img/18/07/07/164748d2b0519dc2c.png) 0/1.3em no-repeat"><b>피해 반경</b> 2.5 </span>

    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i1.ruliweb.com/img/18/07/02/164595f2c2019dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 매의 상 (능력 강화 (Q) - 레벨 13)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">매의 상</b>
        <br><small>렉사르 - 레벨 13</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">Q</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      기백 날리기가 적 영웅에게 적중하면 공격 속도가 3초 동안 125% 증가합니다. 미샤가 일반 공격을 할 때마다 이 효과의 지속 시간이 0.75초 증가합니다.
    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i1.ruliweb.com/img/18/07/02/164595f2c2019dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 매의 상 (능력 강화 (Q) - 레벨 13)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">매의 상</b>
        <br><small>렉사르 - 레벨 13</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">Q</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      기백 날리기가 적 영웅에게 적중하면 공격 속도가 3초 동안 125% 증가합니다. 미샤가 일반 공격을 할 때마다 이 효과의 지속 시간이 0.75초 증가합니다.
    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/164595f298219dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 광포한 야수 (능력 강화 (W) - 레벨 13)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">광포한 야수</b>
        <br><small>렉사르 - 레벨 13</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">W</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      렉사르와 미샤가 일반 공격을 할 때마다 다음 미샤, 돌진!의 공격력이 40% 증가하여 최대 400% 증가합니다.
    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/164595f298219dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 광포한 야수 (능력 강화 (W) - 레벨 13)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">광포한 야수</b>
        <br><small>렉사르 - 레벨 13</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">W</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      렉사르와 미샤가 일반 공격을 할 때마다 다음 미샤, 돌진!의 공격력이 40% 증가하여 최대 400% 증가합니다.
    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/164595f2aa219dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 사냥의 희열 (지속 효과 - 레벨 16)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">사냥의 희열</b>
        <br><small>렉사르 - 레벨 16</small>
      </div>
      
      
      <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #6ba;color:#6ba">
      
        <b style="display:inline-block">지속 효과</b>
      
      
      </div>
      
    </div>
    <div style="color:#bcc">
      
      렉사르의 일반 공격이 렉사르와 미샤의 이동 속도를 2초 동안 25% 증가시킵니다.
    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/164595f2aa219dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 사냥의 희열 (지속 효과 - 레벨 16)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">사냥의 희열</b>
        <br><small>렉사르 - 레벨 16</small>
      </div>
      
      
      <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #6ba;color:#6ba">
      
        <b style="display:inline-block">지속 효과</b>
      
      
      </div>
      
    </div>
    <div style="color:#bcc">
      
      렉사르의 일반 공격이 렉사르와 미샤의 이동 속도를 2초 동안 25% 증가시킵니다.
    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i1.ruliweb.com/img/18/07/02/16459530b9219dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 야성의 위압감 (사용 효과 - 레벨 16)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">야성의 위압감</b>
        <br><small>렉사르 - 레벨 16</small>
      </div>
      
      
      
       <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #d7a;color:#d7a"> 
        <b style="display:inline-block">사용 효과</b>
      
      
      
       </div>
    </div>
    <div style="color:#bcc">
      
      사용하면 렉사르와 미샤 주위 적 영웅과 소환수가 2.5초 동안 공격 속도가 50%, 이동 속도가 20% 감소합니다.<br><br><b style="color: #0e8">지속 효과</b>: 렉사르나 미샤를 공격하는 적 영웅과 소환수의 공격 속도가 2.5초 동안 20% 감소합니다.<br>
<br><span style="padding-left:1.5em;color:#ddd;background:url(http://i2.ruliweb.com/img/18/07/23/164c2a1709319dc2c.png) 0/1.3em no-repeat"><b>재사용 대기시간</b> 20초</span>
<br><span style="padding-left:1.5em;color:#d90;background:url(http://i3.ruliweb.com/img/18/07/07/164748d2b0519dc2c.png) 0/1.3em no-repeat"><b>효과 반경</b> 5 </span>

    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i1.ruliweb.com/img/18/07/02/16459530b9219dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 야성의 위압감 (사용 효과 - 레벨 16)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">야성의 위압감</b>
        <br><small>렉사르 - 레벨 16</small>
      </div>
      
      
      
       <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #d7a;color:#d7a"> 
        <b style="display:inline-block">사용 효과</b>
      
      
      
       </div>
    </div>
    <div style="color:#bcc">
      
      사용하면 렉사르와 미샤 주위 적 영웅과 소환수가 2.5초 동안 공격 속도가 50%, 이동 속도가 20% 감소합니다.<br><br><b style="color: #0e8">지속 효과</b>: 렉사르나 미샤를 공격하는 적 영웅과 소환수의 공격 속도가 2.5초 동안 20% 감소합니다.<br>
<br><span style="padding-left:1.5em;color:#ddd;background:url(http://i2.ruliweb.com/img/18/07/23/164c2a1709319dc2c.png) 0/1.3em no-repeat"><b>재사용 대기시간</b> 20초</span>
<br><span style="padding-left:1.5em;color:#d90;background:url(http://i3.ruliweb.com/img/18/07/07/164748d2b0519dc2c.png) 0/1.3em no-repeat"><b>효과 반경</b> 5 </span>

    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i3.ruliweb.com/img/18/07/02/164595f24cf19dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 죽은척하기 (사용 효과 - 레벨 16)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">죽은척하기</b>
        <br><small>렉사르 - 레벨 16</small>
      </div>
      
      
      
       <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #d7a;color:#d7a"> 
        <b style="display:inline-block">사용 효과</b>
      
      
      
       </div>
    </div>
    <div style="color:#bcc">
      
      죽은 흉내를 내서 5초 동안 무적 상태가 되고 대상으로 지정되지 않습니다. 지속 시간 동안 미샤를 조종합니다.<br>
<br><span style="padding-left:1.5em;color:#ddd;background:url(http://i2.ruliweb.com/img/18/07/23/164c2a1709319dc2c.png) 0/1.3em no-repeat"><b>재사용 대기시간</b> 35초</span>

    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i3.ruliweb.com/img/18/07/02/164595f24cf19dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 죽은척하기 (사용 효과 - 레벨 16)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">죽은척하기</b>
        <br><small>렉사르 - 레벨 16</small>
      </div>
      
      
      
       <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #d7a;color:#d7a"> 
        <b style="display:inline-block">사용 효과</b>
      
      
      
       </div>
    </div>
    <div style="color:#bcc">
      
      죽은 흉내를 내서 5초 동안 무적 상태가 되고 대상으로 지정되지 않습니다. 지속 시간 동안 미샤를 조종합니다.<br>
<br><span style="padding-left:1.5em;color:#ddd;background:url(http://i2.ruliweb.com/img/18/07/23/164c2a1709319dc2c.png) 0/1.3em no-repeat"><b>재사용 대기시간</b> 35초</span>

    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i1.ruliweb.com/img/18/07/02/164595f234119dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 정신의 결속 (능력 강화 (R) - 레벨 20)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">정신의 결속</b>
        <br><small>렉사르 - 레벨 20</small>
      </div>
      
       <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #da7;color:#da7"> 
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i2.ruliweb.com/img/18/08/07/1651405069c19dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">R</b>
      
       </div>
      
      
    </div>
    <div style="color:#bcc">
      
      야수의 격노의 지속 시간이 50% 증가하고 이 동안 미샤가 일반 공격으로 준 피해의 50%만큼 렉사르의 생명력이 회복됩니다.
    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i1.ruliweb.com/img/18/07/02/164595f234119dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 정신의 결속 (능력 강화 (R) - 레벨 20)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">정신의 결속</b>
        <br><small>렉사르 - 레벨 20</small>
      </div>
      
       <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #da7;color:#da7"> 
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i2.ruliweb.com/img/18/08/07/1651405069c19dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">R</b>
      
       </div>
      
      
    </div>
    <div style="color:#bcc">
      
      야수의 격노의 지속 시간이 50% 증가하고 이 동안 미샤가 일반 공격으로 준 피해의 50%만큼 렉사르의 생명력이 회복됩니다.
    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/164595f2f3319dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 살상 명령 (능력 강화 (R) - 레벨 20)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">살상 명령</b>
        <br><small>렉사르 - 레벨 20</small>
      </div>
      
       <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #da7;color:#da7"> 
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i2.ruliweb.com/img/18/08/07/1651405069c19dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">R</b>
      
       </div>
      
      
    </div>
    <div style="color:#bcc">
      
      멧돼지를 풀어라의 공격력이 50% 증가하고 대상들을 1.5초 동안 이동 불가 상태로 만듭니다.
    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/164595f2f3319dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 살상 명령 (능력 강화 (R) - 레벨 20)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">살상 명령</b>
        <br><small>렉사르 - 레벨 20</small>
      </div>
      
       <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #da7;color:#da7"> 
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i2.ruliweb.com/img/18/08/07/1651405069c19dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">R</b>
      
       </div>
      
      
    </div>
    <div style="color:#bcc">
      
      멧돼지를 풀어라의 공격력이 50% 증가하고 대상들을 1.5초 동안 이동 불가 상태로 만듭니다.
    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i3.ruliweb.com/img/18/07/02/1645947736619dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 칼림도어의 광란 (지속 효과 - 레벨 20)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">칼림도어의 광란</b>
        <br><small>렉사르 - 레벨 20</small>
      </div>
      
      
      <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #6ba;color:#6ba">
      
        <b style="display:inline-block">지속 효과</b>
      
      
      </div>
      
    </div>
    <div style="color:#bcc">
      
      렉사르의 일반 공격력이 10% 증가하고, 미샤의 일반 공격이 대상을 1.25초 동안 20% 느려지게 합니다.
    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i3.ruliweb.com/img/18/07/02/1645947736619dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 칼림도어의 광란 (지속 효과 - 레벨 20)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">칼림도어의 광란</b>
        <br><small>렉사르 - 레벨 20</small>
      </div>
      
      
      <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #6ba;color:#6ba">
      
        <b style="display:inline-block">지속 효과</b>
      
      
      </div>
      
    </div>
    <div style="color:#bcc">
      
      렉사르의 일반 공격력이 10% 증가하고, 미샤의 일반 공격이 대상을 1.25초 동안 20% 느려지게 합니다.
    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/16459474e1719dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 강화 가죽 (사용 효과 - 레벨 20)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">강화 가죽</b>
        <br><small>렉사르 - 레벨 20</small>
      </div>
      
      
      
       <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #d7a;color:#d7a"> 
        <b style="display:inline-block">사용 효과</b>
      
      
      
       </div>
    </div>
    <div style="color:#bcc">
      
      사용하면 렉사르와 미샤의 방어력이 4초 동안 75 증가하여 받는 피해가 75% 감소합니다.<br>
<br><span style="padding-left:1.5em;color:#ddd;background:url(http://i2.ruliweb.com/img/18/07/23/164c2a1709319dc2c.png) 0/1.3em no-repeat"><b>재사용 대기시간</b> 60초</span>

    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/16459474e1719dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 강화 가죽 (사용 효과 - 레벨 20)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">강화 가죽</b>
        <br><small>렉사르 - 레벨 20</small>
      </div>
      
      
      
       <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #d7a;color:#d7a"> 
        <b style="display:inline-block">사용 효과</b>
      
      
      
       </div>
    </div>
    <div style="color:#bcc">
      
      사용하면 렉사르와 미샤의 방어력이 4초 동안 75 증가하여 받는 피해가 75% 감소합니다.<br>
<br><span style="padding-left:1.5em;color:#ddd;background:url(http://i2.ruliweb.com/img/18/07/23/164c2a1709319dc2c.png) 0/1.3em no-repeat"><b>재사용 대기시간</b> 60초</span>

    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i3.ruliweb.com/img/18/07/02/1645956af9a19dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 추가 TNT (능력 강화 (E) - 레벨 1)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">추가 TNT</b>
        <br><small>가즈로 - 레벨 1</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">E</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      터진다늄 폭탄의 공격력이 폭발에 적중당한 대상 하나당 10% 증가하여 최대 100% 증가합니다.
    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i3.ruliweb.com/img/18/07/02/1645956af9a19dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 추가 TNT (능력 강화 (E) - 레벨 1)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">추가 TNT</b>
        <br><small>가즈로 - 레벨 1</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">E</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      터진다늄 폭탄의 공격력이 폭발에 적중당한 대상 하나당 10% 증가하여 최대 100% 증가합니다.
    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i3.ruliweb.com/img/18/07/02/1645956a7cb19dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 고철공장공장장 (능력 강화 (고유 능력) - 레벨 1)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">고철공장공장장</b>
        <br><small>가즈로 - 레벨 1</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">고유 능력</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      고철을 획득할 때 회복되는 마나가 100% 증가합니다.
    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i3.ruliweb.com/img/18/07/02/1645956a7cb19dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 고철공장공장장 (능력 강화 (고유 능력) - 레벨 1)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">고철공장공장장</b>
        <br><small>가즈로 - 레벨 1</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">고유 능력</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      고철을 획득할 때 회복되는 마나가 100% 증가합니다.
    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i1.ruliweb.com/img/18/07/02/1645956abae19dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 박! 살! (능력 강화 (고유 능력) - 레벨 1)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">박! 살!</b>
        <br><small>가즈로 - 레벨 1</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">고유 능력</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      고철을 수집하면 3초 동안 모든 기술의 재사용 대기시간이 네 배 빨리 감소합니다.
    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i1.ruliweb.com/img/18/07/02/1645956abae19dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 박! 살! (능력 강화 (고유 능력) - 레벨 1)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">박! 살!</b>
        <br><small>가즈로 - 레벨 1</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">고유 능력</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      고철을 수집하면 3초 동안 모든 기술의 재사용 대기시간이 네 배 빨리 감소합니다.
    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i1.ruliweb.com/img/18/07/02/16459530fdd19dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 고블린 수리법 (지속 효과 - 레벨 1)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">고블린 수리법</b>
        <br><small>가즈로 - 레벨 1</small>
      </div>
      
      
      <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #6ba;color:#6ba">
      
        <b style="display:inline-block">지속 효과</b>
      
      
      </div>
      
    </div>
    <div style="color:#bcc">
      
      <img style="HEIGHT: 1.3em; vertical-align: -20%" src="http://i1.ruliweb.com/img/18/07/08/164761a813c19dc2c.png" alt="퀘스트" title="퀘스트"> <b style="color: #fb0">퀘스트</b>: 재생의 구슬을 획득하면 초당 생명력 재생량이 1 증가하여 최대 25 증가합니다.<br><img style="HEIGHT: 1.3em; vertical-align: -20%" src="http://i1.ruliweb.com/img/18/07/08/164761a813c19dc2c.png" alt="보상" title="보상"> <b style="color: #fb0">보상</b>: 재생의 구슬을 25개 이상 획득하면 초당 생명력 재생량이 추가로 15 증가합니다.
    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i1.ruliweb.com/img/18/07/02/16459530fdd19dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 고블린 수리법 (지속 효과 - 레벨 1)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">고블린 수리법</b>
        <br><small>가즈로 - 레벨 1</small>
      </div>
      
      
      <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #6ba;color:#6ba">
      
        <b style="display:inline-block">지속 효과</b>
      
      
      </div>
      
    </div>
    <div style="color:#bcc">
      
      <img style="HEIGHT: 1.3em; vertical-align: -20%" src="http://i1.ruliweb.com/img/18/07/08/164761a813c19dc2c.png" alt="퀘스트" title="퀘스트"> <b style="color: #fb0">퀘스트</b>: 재생의 구슬을 획득하면 초당 생명력 재생량이 1 증가하여 최대 25 증가합니다.<br><img style="HEIGHT: 1.3em; vertical-align: -20%" src="http://i1.ruliweb.com/img/18/07/08/164761a813c19dc2c.png" alt="보상" title="보상"> <b style="color: #fb0">보상</b>: 재생의 구슬을 25개 이상 획득하면 초당 생명력 재생량이 추가로 15 증가합니다.
    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/1645956a00919dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 태엽장치 증기 주먹 (능력 강화 (Q) - 레벨 4)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">태엽장치 증기 주먹</b>
        <br><small>가즈로 - 레벨 4</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">Q</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      <img style="HEIGHT: 1.3em; vertical-align: -20%" src="http://i1.ruliweb.com/img/18/07/08/164761a813c19dc2c.png" alt="퀘스트" title="퀘스트"> <b style="color: #fb0">퀘스트</b>: 일반 공격을 할 때마다 현재 설치된 잘나가! 포탑의 지속 시간이 1.5초 증가합니다.<br><img style="HEIGHT: 1.3em; vertical-align: -20%" src="http://i1.ruliweb.com/img/18/07/08/164761a813c19dc2c.png" alt="보상" title="보상"> <b style="color: #fb0">보상</b>: 포탑의 지속 시간을 총 600초 이상 증가시키면 잘나가! 포탑의 충전 대기시간이 3초 감소합니다.
    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/1645956a00919dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 태엽장치 증기 주먹 (능력 강화 (Q) - 레벨 4)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">태엽장치 증기 주먹</b>
        <br><small>가즈로 - 레벨 4</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">Q</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      <img style="HEIGHT: 1.3em; vertical-align: -20%" src="http://i1.ruliweb.com/img/18/07/08/164761a813c19dc2c.png" alt="퀘스트" title="퀘스트"> <b style="color: #fb0">퀘스트</b>: 일반 공격을 할 때마다 현재 설치된 잘나가! 포탑의 지속 시간이 1.5초 증가합니다.<br><img style="HEIGHT: 1.3em; vertical-align: -20%" src="http://i1.ruliweb.com/img/18/07/08/164761a813c19dc2c.png" alt="보상" title="보상"> <b style="color: #fb0">보상</b>: 포탑의 지속 시간을 총 600초 이상 증가시키면 잘나가! 포탑의 충전 대기시간이 3초 감소합니다.
    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i3.ruliweb.com/img/18/07/02/1645956af9a19dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 아크 반응로 (능력 강화 (E) - 레벨 4)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">아크 반응로</b>
        <br><small>가즈로 - 레벨 4</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">E</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      터진다늄 폭탄의 재사용 대기시간이 2초 감소하고, 적 영웅에게 적중하면 잘나가! 포탑이 2회 충전됩니다.
    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i3.ruliweb.com/img/18/07/02/1645956af9a19dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 아크 반응로 (능력 강화 (E) - 레벨 4)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">아크 반응로</b>
        <br><small>가즈로 - 레벨 4</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">E</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      터진다늄 폭탄의 재사용 대기시간이 2초 감소하고, 적 영웅에게 적중하면 잘나가! 포탑이 2회 충전됩니다.
    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i3.ruliweb.com/img/18/07/02/1645956a7cb19dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 죽은 적도 다시 보기 (능력 강화 (고유 능력) - 레벨 4)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">죽은 적도 다시 보기</b>
        <br><small>가즈로 - 레벨 4</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">고유 능력</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      주위에서 죽은 적 돌격병이 15% 확률로 고철을 떨어트립니다.
    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i3.ruliweb.com/img/18/07/02/1645956a7cb19dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 죽은 적도 다시 보기 (능력 강화 (고유 능력) - 레벨 4)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">죽은 적도 다시 보기</b>
        <br><small>가즈로 - 레벨 4</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">고유 능력</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      주위에서 죽은 적 돌격병이 15% 확률로 고철을 떨어트립니다.
    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i1.ruliweb.com/img/18/07/02/16459530ced19dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 고용된 떡대들 (지속 효과 - 레벨 4)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">고용된 떡대들</b>
        <br><small>가즈로 - 레벨 4</small>
      </div>
      
      
      <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #6ba;color:#6ba">
      
        <b style="display:inline-block">지속 효과</b>
      
      
      </div>
      
    </div>
    <div style="color:#bcc">
      
      우두머리를 제외한 주위 아군 용병들의 공격력이 50% 증가합니다. 잘나가! 포탑이 돌격병과 용병을 상대로 방어력이 50 증가하여 받는 피해가 50% 감소합니다.<br>
<br><span style="padding-left:1.5em;color:#d90;background:url(http://i3.ruliweb.com/img/18/07/07/164748d2b0519dc2c.png) 0/1.3em no-repeat"><b>효과 반경</b> 9 </span>

    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i1.ruliweb.com/img/18/07/02/16459530ced19dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 고용된 떡대들 (지속 효과 - 레벨 4)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">고용된 떡대들</b>
        <br><small>가즈로 - 레벨 4</small>
      </div>
      
      
      <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #6ba;color:#6ba">
      
        <b style="display:inline-block">지속 효과</b>
      
      
      </div>
      
    </div>
    <div style="color:#bcc">
      
      우두머리를 제외한 주위 아군 용병들의 공격력이 50% 증가합니다. 잘나가! 포탑이 돌격병과 용병을 상대로 방어력이 50 증가하여 받는 피해가 50% 감소합니다.<br>
<br><span style="padding-left:1.5em;color:#d90;background:url(http://i3.ruliweb.com/img/18/07/07/164748d2b0519dc2c.png) 0/1.3em no-repeat"><b>효과 반경</b> 9 </span>

    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/1645956a00919dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 완전 잘나가! 포탑 (능력 강화 (Q) - 레벨 7)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">완전 잘나가! 포탑</b>
        <br><small>가즈로 - 레벨 7</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">Q</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      잘나가! 포탑이 최대 2명의 추가 대상에게 60%의 피해를 줍니다.<br>
<br><span style="padding-left:1.5em;color:#d90;background:url(http://i3.ruliweb.com/img/18/07/07/164748d2b0519dc2c.png) 0/1.3em no-repeat"><b>추가 공격 사거리</b> 7.5 <b>발사각</b> 80° </span>

    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/1645956a00919dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 완전 잘나가! 포탑 (능력 강화 (Q) - 레벨 7)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">완전 잘나가! 포탑</b>
        <br><small>가즈로 - 레벨 7</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">Q</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      잘나가! 포탑이 최대 2명의 추가 대상에게 60%의 피해를 줍니다.<br>
<br><span style="padding-left:1.5em;color:#d90;background:url(http://i3.ruliweb.com/img/18/07/07/164748d2b0519dc2c.png) 0/1.3em no-repeat"><b>추가 공격 사거리</b> 7.5 <b>발사각</b> 80° </span>

    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/1645956a40719dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 기름 찌꺼기 (능력 강화 (Q) - 레벨 7)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">기름 찌꺼기</b>
        <br><small>가즈로 - 레벨 7</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">Q</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      잘나가! 포탑의 공격이 적을 2초 동안 20% 느려지게 합니다.
    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/1645956a40719dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 기름 찌꺼기 (능력 강화 (Q) - 레벨 7)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">기름 찌꺼기</b>
        <br><small>가즈로 - 레벨 7</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">Q</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      잘나가! 포탑의 공격이 적을 2초 동안 20% 느려지게 합니다.
    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i3.ruliweb.com/img/18/07/02/1645956889519dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 과집중 코일 (능력 강화 (W) - 레벨 7)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">과집중 코일</b>
        <br><small>가즈로 - 레벨 7</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">W</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      죽이는 레이저가 두 배 빨리 충전되고 마나 소모량이 30 감소합니다.
    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i3.ruliweb.com/img/18/07/02/1645956889519dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 과집중 코일 (능력 강화 (W) - 레벨 7)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">과집중 코일</b>
        <br><small>가즈로 - 레벨 7</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">W</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      죽이는 레이저가 두 배 빨리 충전되고 마나 소모량이 30 감소합니다.
    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/16459569c9519dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 로보고블린 (R - 레벨 10)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">로보고블린</b>
        <br><small>가즈로 - 레벨 10</small>
      </div>
      
       <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #da7;color:#da7"> 
      
      
        <b style="display:inline-block">R</b>
      
       </div>
      
      
    </div>
    <div style="color:#bcc">
      
      사용하면 4초 동안 방어력이 30 증가하고 이동 속도가 30% 증가합니다.<br><br><b style="color: #0e8">지속 효과</b>: 일반 공격이 100%의 추가 피해를 줍니다.<br>
<br><span style="padding-left:1.5em;color:#ddd;background:url(http://i2.ruliweb.com/img/18/07/23/164c2a1709319dc2c.png) 0/1.3em no-repeat"><b>재사용 대기시간</b> 60초</span>

    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/16459569c9519dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 로보고블린 (R - 레벨 10)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">로보고블린</b>
        <br><small>가즈로 - 레벨 10</small>
      </div>
      
       <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #da7;color:#da7"> 
      
      
        <b style="display:inline-block">R</b>
      
       </div>
      
      
    </div>
    <div style="color:#bcc">
      
      사용하면 4초 동안 방어력이 30 증가하고 이동 속도가 30% 증가합니다.<br><br><b style="color: #0e8">지속 효과</b>: 일반 공격이 100%의 추가 피해를 줍니다.<br>
<br><span style="padding-left:1.5em;color:#ddd;background:url(http://i2.ruliweb.com/img/18/07/23/164c2a1709319dc2c.png) 0/1.3em no-repeat"><b>재사용 대기시간</b> 60초</span>

    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i3.ruliweb.com/img/18/07/02/1645956906119dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 중력폭탄 3000 (R - 레벨 10)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">중력폭탄 3000</b>
        <br><small>가즈로 - 레벨 10</small>
      </div>
      
       <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #da7;color:#da7"> 
      
      
        <b style="display:inline-block">R</b>
      
       </div>
      
      
    </div>
    <div style="color:#bcc">
      
      2초 후, 대상 지역 중앙으로 적들을 끌어당기며 261(+4%)의 피해를 줍니다.<br>
<br><span style="padding-left:1.5em;color:#4be;background:url(http://i1.ruliweb.com/img/18/07/07/164741ab46719dc2c.png) .15em/1em no-repeat"><b>마나</b> 100</span>
<br><span style="padding-left:1.5em;color:#ddd;background:url(http://i2.ruliweb.com/img/18/07/23/164c2a1709319dc2c.png) 0/1.3em no-repeat"><b>재사용 대기시간</b> 110초</span>
<br><span style="padding-left:1.5em;color:#d90;background:url(http://i3.ruliweb.com/img/18/07/07/164748d2b0519dc2c.png) 0/1.3em no-repeat"><b>사거리</b> 8 <b>피해 반경</b> 5 </span>

    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i3.ruliweb.com/img/18/07/02/1645956906119dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 중력폭탄 3000 (R - 레벨 10)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">중력폭탄 3000</b>
        <br><small>가즈로 - 레벨 10</small>
      </div>
      
       <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #da7;color:#da7"> 
      
      
        <b style="display:inline-block">R</b>
      
       </div>
      
      
    </div>
    <div style="color:#bcc">
      
      2초 후, 대상 지역 중앙으로 적들을 끌어당기며 261(+4%)의 피해를 줍니다.<br>
<br><span style="padding-left:1.5em;color:#4be;background:url(http://i1.ruliweb.com/img/18/07/07/164741ab46719dc2c.png) .15em/1em no-repeat"><b>마나</b> 100</span>
<br><span style="padding-left:1.5em;color:#ddd;background:url(http://i2.ruliweb.com/img/18/07/23/164c2a1709319dc2c.png) 0/1.3em no-repeat"><b>재사용 대기시간</b> 110초</span>
<br><span style="padding-left:1.5em;color:#d90;background:url(http://i3.ruliweb.com/img/18/07/07/164748d2b0519dc2c.png) 0/1.3em no-repeat"><b>사거리</b> 8 <b>피해 반경</b> 5 </span>

    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i3.ruliweb.com/img/18/07/02/1645956889519dc2c.png) center/cover" title="[클릭하여 접기/펼치기] E-848 차원 절단기 (능력 강화 (W) - 레벨 13)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">E-848 차원 절단기</b>
        <br><small>가즈로 - 레벨 13</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">W</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      죽이는 레이저가 3초 동안 영웅을 50% 느려지게 하고 영웅이 아닌 대상을 기절시킵니다.
    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i3.ruliweb.com/img/18/07/02/1645956889519dc2c.png) center/cover" title="[클릭하여 접기/펼치기] E-848 차원 절단기 (능력 강화 (W) - 레벨 13)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">E-848 차원 절단기</b>
        <br><small>가즈로 - 레벨 13</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">W</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      죽이는 레이저가 3초 동안 영웅을 50% 느려지게 하고 영웅이 아닌 대상을 기절시킵니다.
    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i3.ruliweb.com/img/18/07/02/16459568c7519dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 고블린 핵융합 (능력 강화 (W) - 레벨 13)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">고블린 핵융합</b>
        <br><small>가즈로 - 레벨 13</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">W</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      죽이는 레이저를 1초 더 충전해서 공격력을 추가로 100% 증가시킬 수 있습니다.
    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i3.ruliweb.com/img/18/07/02/16459568c7519dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 고블린 핵융합 (능력 강화 (W) - 레벨 13)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">고블린 핵융합</b>
        <br><small>가즈로 - 레벨 13</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">W</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      죽이는 레이저를 1초 더 충전해서 공격력을 추가로 100% 증가시킬 수 있습니다.
    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i3.ruliweb.com/img/18/07/02/1645956af9a19dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 특대형 폭탄 (능력 강화 (E) - 레벨 13)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">특대형 폭탄</b>
        <br><small>가즈로 - 레벨 13</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">E</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      터진다늄 폭탄의 폭발 반경이 30% 증가합니다. 기절하거나 이동 불가 상태가 되면 발 아래 터진다늄 폭탄을 떨어트립니다.<br><br>이 효과는 10초의 재사용 대기시간을 갖습니다.
    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i3.ruliweb.com/img/18/07/02/1645956af9a19dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 특대형 폭탄 (능력 강화 (E) - 레벨 13)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">특대형 폭탄</b>
        <br><small>가즈로 - 레벨 13</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">E</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      터진다늄 폭탄의 폭발 반경이 30% 증가합니다. 기절하거나 이동 불가 상태가 되면 발 아래 터진다늄 폭탄을 떨어트립니다.<br><br>이 효과는 10초의 재사용 대기시간을 갖습니다.
    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/1645956a00919dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 포탑 비축 (능력 강화 (Q) - 레벨 16)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">포탑 비축</b>
        <br><small>가즈로 - 레벨 16</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">Q</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      잘나가! 포탑 최대 충전 횟수가 2에서 3으로 증가합니다.
    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/1645956a00919dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 포탑 비축 (능력 강화 (Q) - 레벨 16)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">포탑 비축</b>
        <br><small>가즈로 - 레벨 16</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">Q</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      잘나가! 포탑 최대 충전 횟수가 2에서 3으로 증가합니다.
    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/1645956a40719dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 완벽한 설계도 (능력 강화 (Q) - 레벨 16)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">완벽한 설계도</b>
        <br><small>가즈로 - 레벨 16</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">Q</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      가즈로가 잘나가! 포탑의 사거리 내에 있는 동안 해당 포탑의 사거리가 25% 증가합니다.<br>
<br><span style="padding-left:1.5em;color:#d90;background:url(http://i3.ruliweb.com/img/18/07/07/164748d2b0519dc2c.png) 0/1.3em no-repeat"><b>효과 반경</b> 9 </span>

    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/1645956a40719dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 완벽한 설계도 (능력 강화 (Q) - 레벨 16)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">완벽한 설계도</b>
        <br><small>가즈로 - 레벨 16</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">Q</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      가즈로가 잘나가! 포탑의 사거리 내에 있는 동안 해당 포탑의 사거리가 25% 증가합니다.<br>
<br><span style="padding-left:1.5em;color:#d90;background:url(http://i3.ruliweb.com/img/18/07/07/164748d2b0519dc2c.png) 0/1.3em no-repeat"><b>효과 반경</b> 9 </span>

    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i3.ruliweb.com/img/18/07/02/1645956af9a19dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 번갯불에 폭탄 구워먹기 (능력 강화 (E) - 레벨 16)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">번갯불에 폭탄 구워먹기</b>
        <br><small>가즈로 - 레벨 16</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">E</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      터진다늄 폭탄을 2회 충전해서 사용할 수 있습니다.
    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i3.ruliweb.com/img/18/07/02/1645956af9a19dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 번갯불에 폭탄 구워먹기 (능력 강화 (E) - 레벨 16)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">번갯불에 폭탄 구워먹기</b>
        <br><small>가즈로 - 레벨 16</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">E</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      터진다늄 폭탄을 2회 충전해서 사용할 수 있습니다.
    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/16459569c9519dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 기계왕 (능력 강화 (R) - 레벨 20)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">기계왕</b>
        <br><small>가즈로 - 레벨 20</small>
      </div>
      
       <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #da7;color:#da7"> 
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i2.ruliweb.com/img/18/08/07/1651405069c19dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">R</b>
      
       </div>
      
      
    </div>
    <div style="color:#bcc">
      
      일반 공격이 100%의 추가 피해를 줍니다.<br><br><b style="color: #0e8">지속 효과</b>: 방어력이 25 증가합니다.
    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i2.ruliweb.com/img/18/07/02/16459569c9519dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 기계왕 (능력 강화 (R) - 레벨 20)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">기계왕</b>
        <br><small>가즈로 - 레벨 20</small>
      </div>
      
       <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #da7;color:#da7"> 
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i2.ruliweb.com/img/18/08/07/1651405069c19dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">R</b>
      
       </div>
      
      
    </div>
    <div style="color:#bcc">
      
      일반 공격이 100%의 추가 피해를 줍니다.<br><br><b style="color: #0e8">지속 효과</b>: 방어력이 25 증가합니다.
    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i3.ruliweb.com/img/18/07/02/1645956906119dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 휴대용 블랙홀 (능력 강화 (R) - 레벨 20)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">휴대용 블랙홀</b>
        <br><small>가즈로 - 레벨 20</small>
      </div>
      
       <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #da7;color:#da7"> 
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i2.ruliweb.com/img/18/08/07/1651405069c19dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">R</b>
      
       </div>
      
      
    </div>
    <div style="color:#bcc">
      
      중력폭탄 3000의 반경이 25% 증가하고 공격력이 50% 증가합니다.
    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i3.ruliweb.com/img/18/07/02/1645956906119dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 휴대용 블랙홀 (능력 강화 (R) - 레벨 20)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">휴대용 블랙홀</b>
        <br><small>가즈로 - 레벨 20</small>
      </div>
      
       <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #da7;color:#da7"> 
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i2.ruliweb.com/img/18/08/07/1651405069c19dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">R</b>
      
       </div>
      
      
    </div>
    <div style="color:#bcc">
      
      중력폭탄 3000의 반경이 25% 증가하고 공격력이 50% 증가합니다.
    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i3.ruliweb.com/img/18/07/02/1645956889519dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 잘나가고 죽이는 레이저 (능력 강화 (W) - 레벨 20)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">잘나가고 죽이는 레이저</b>
        <br><small>가즈로 - 레벨 20</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">W</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      죽이는 레이저를 사용하면 현재 설치된 모든 잘나가! 포탑들이 죽이는 레이저를 발사합니다. 포탑의 죽이는 레이저는 142(+4%)의 피해를 줍니다.<br>
<br><span style="padding-left:1.5em;color:#d90;background:url(http://i3.ruliweb.com/img/18/07/07/164748d2b0519dc2c.png) 0/1.3em no-repeat"><b>최대 사거리</b> 8 <b>너비</b> 1 </span>

    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i3.ruliweb.com/img/18/07/02/1645956889519dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 잘나가고 죽이는 레이저 (능력 강화 (W) - 레벨 20)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">잘나가고 죽이는 레이저</b>
        <br><small>가즈로 - 레벨 20</small>
      </div>
        <div style="flex:0 9 auto;border:.1em solid #87d;border-radius:.3em;padding:.2em .4em;word-break:keep-all;color:#87d">                                        
      
      
      
        <img alt="능력 강화" title="능력 강화" src="http://i1.ruliweb.com/img/18/08/07/1651405095119dc2c.png" style="HEIGHT:1.5em;margin:-1em -.2em 0 -.7em;vertical-align:bottom;max-WIDTH:none">
        <b style="display:inline-block">W</b>
        </div>
      
      
      
    </div>
    <div style="color:#bcc">
      
      죽이는 레이저를 사용하면 현재 설치된 모든 잘나가! 포탑들이 죽이는 레이저를 발사합니다. 포탑의 죽이는 레이저는 142(+4%)의 피해를 줍니다.<br>
<br><span style="padding-left:1.5em;color:#d90;background:url(http://i3.ruliweb.com/img/18/07/07/164748d2b0519dc2c.png) 0/1.3em no-repeat"><b>최대 사거리</b> 8 <b>너비</b> 1 </span>

    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i1.ruliweb.com/img/18/07/02/1645956944819dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 하늘에서 고철이 비처럼 내려와 (사용 효과 - 레벨 20)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">하늘에서 고철이 비처럼 내려와</b>
        <br><small>가즈로 - 레벨 20</small>
      </div>
      
      
      
       <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #d7a;color:#d7a"> 
        <b style="display:inline-block">사용 효과</b>
      
      
      
       </div>
    </div>
    <div style="color:#bcc">
      
      사용하면 5초에 걸쳐 주위에 5개의 고철을 생성합니다.<br>
<br><span style="padding-left:1.5em;color:#ddd;background:url(http://i2.ruliweb.com/img/18/07/23/164c2a1709319dc2c.png) 0/1.3em no-repeat"><b>재사용 대기시간</b> 60초</span>

    </div>
    
  </div>
</details>
<details data-ruliweb-hots-version="app version string" class="ruliweb-hots-talent-table" style="display:inline-block;max-WIDTH:100%;box-sizing:border-box;font-family:sans-serif;text-align:initial;padding:4px;border:2px solid #55d;background:linear-gradient(#118,#003) 0;color:#bef">
  <summary style="float:left;WIDTH:48px;HEIGHT:48px;background:url(http://i1.ruliweb.com/img/18/07/02/1645956944819dc2c.png) center/cover" title="[클릭하여 접기/펼치기] 하늘에서 고철이 비처럼 내려와 (사용 효과 - 레벨 20)"></summary>
  <div style="float:left;WIDTH:50em;padding-left:8px;max-WIDTH:calc(100% - 48px - 8px)">
    <div style="display:flex;align-items:flex-start;margin-bottom:.5em">
      <div style="flex:auto;padding-right:.5em">
        <b style="font-size:1.1em">하늘에서 고철이 비처럼 내려와</b>
        <br><small>가즈로 - 레벨 20</small>
      </div>
      
      
      
       <div style="flex:0 9 auto;border-radius:.3em;padding:.2em .4em;word-break:keep-all;border:.1em solid #d7a;color:#d7a"> 
        <b style="display:inline-block">사용 효과</b>
      
      
      
       </div>
    </div>
    <div style="color:#bcc">
      
      사용하면 5초에 걸쳐 주위에 5개의 고철을 생성합니다.<br>
<br><span style="padding-left:1.5em;color:#ddd;background:url(http://i2.ruliweb.com/img/18/07/23/164c2a1709319dc2c.png) 0/1.3em no-repeat"><b>재사용 대기시간</b> 60초</span>

    </div>
    <footer style="text-align:right;font-size:.8em;color:#cca"><i>패치 34.3</i></footer>
  </div>
</details>

`
