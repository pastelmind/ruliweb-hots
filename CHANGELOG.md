# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]


## [0.5.0] - 2018-07-13
### Added
- Added 'insert hero table' feature, generating a table of the hero's basic
  skills.
- Skill, talent, and hero tables can be expanded and collapsed with a click.
  Does not work in Internet Explorer and Edge (yet), which will always display
  an expanded table. See https://caniuse.com/#feat=details
- Inserted HTML tables can be quickly deleted in the editor with Ctrl + click.
- Added buttons that insert an entire row of talents (AKA talent groups).

### Changes
- Updated data with Heroes of the Storm v2.35.0 patch information.
- Inserted HTML table width has been slightly reduced.
- Inserted HTML tables are now `inline-block`, and can be mixed with text.
- Use CSS `background-image` instead of `<img>` to show icons. This is necessary
  to prevent launching a popup (enforced by Ruliweb) when clicking on an icon to
  expand/collapse a table.
- Added application version info at bottom of table.
- All inserted HTML now contain a Ruliweb-HotS version signature for debugging.
- Always run tests before building.
- Always generate a build after bumping version.
- Use [juice](https://github.com/Automattic/juice) to generate inline CSS i
  templates.
- Hero basic stats are added in `docs/hots.json`, but not usable in the
  extension yet.

### Fixed
- (none)


## [0.4.0] - 2018-07-09
### Added
- Ruliweb-HotS extension can now be used in Ruliweb MYPI pages.
- You can now choose (not) to insert the current HotS version string, by
  checking the option at the top of the dialog.
- Inserted skill/talent tables now have stats (mana cost, cooldown, ...)
- Quests are properly hightlighted, with a distinct icon.
- Fancy animations when clicking on any icon in the dialog.

### Changes
- Use new icon set, provided by a kind passer-by.
- Instead of `<table>`, use responsive tables that look good on small screens.
- Use antialiased sans-serif font instead of 돋움.
- HotS version string is placed inside the skill/talent description cell.
- Inserted tables are padded with line breaks to make editing easier.
- (Server) `npm` scripts use (Git) bash instead of Windows cmd.

### Fixed
- Inserted table icons retain their width and height in Ruliweb mobile.
- Skill and talent descriptions have proper number of newlines.
- Hero icons in the HotS dialog are properly ordered by name.
- Added mana costs for skills that use "X mana per second".
- Added some missing skills (traits and Z-skills).
- Fixed some skill descriptions.
- Varian is properly highlighted when selecting either 'Warrior' or 'Assassin'.