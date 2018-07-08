# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

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