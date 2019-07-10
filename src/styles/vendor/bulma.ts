import bulmaStyles from './bulma.scss?mod'

/**
 * This file is to map bulma CSS classes to TS. Am doing this for 2 reasons;
 * 1: camelCasing not supported in prod (purgeCSS issue) so avoids janky syntax of composing bulma["some class"]
 * 2: Better intellisense as I can import bulma from here and autocomplete on classes I want to use
 * FYI the fallback strings are just so we get nice Jest snapshots rather than a bunch of undefined
 * css classes.
 */

const bulma = {
  // Layout
  container: bulmaStyles.container || 'container',
  is4: bulmaStyles['is-4'] || 'is4',
  is6: bulmaStyles['is-6'] || 'is6',
  isRight: bulmaStyles['is-right'] || 'isRight',

  // Levels
  level: bulmaStyles.level || 'level',
  levelLeft: bulmaStyles['level-left'] || 'levelLeft',
  levelRight: bulmaStyles['level-right'] || 'levelRight',

  // Tiles
  tile: bulmaStyles.tile || 'tile',
  isParent: bulmaStyles['is-parent'] || 'isParent',
  isChild: bulmaStyles['is-child'] || 'isChild',
  isAncestor: bulmaStyles['is-ancestor'] || 'isAncestor',
  isVertical: bulmaStyles['is-vertical'] || 'isVertical',

  // Columns
  columns: bulmaStyles.columns || 'columns',
  column: bulmaStyles.column || 'column',
  isMultiLine: bulmaStyles['is-multiline'] || 'isMultiLine',
  isHalfTablet: bulmaStyles['is-half-tablet'] || 'isHalfTablet',
  isThirdDesktop: bulmaStyles['is-one-third-desktop'] || 'isThirdDesktop',
  isQuarterWidescreen: bulmaStyles['is-one-quarter-widescreen'] || 'isQuarterWidescreen',
  isQuarterFullhd: bulmaStyles['is-one-quarter-fullhd'] || 'isQuarterFullhd',

  // Utility classes
  isMedium: bulmaStyles['is-medium'] || 'isMedium',
  isRounded: bulmaStyles['is-rounded'] || 'isRounded',
  isPrimary: bulmaStyles['is-primary'] || 'isPrimary',
  isSecondary: bulmaStyles['is-secondary'] || 'isSecondary',
  isLoading: bulmaStyles['is-loading'] || 'isLoading',
  isDanger: bulmaStyles['is-danger'] || 'isDanger',
  isActive: bulmaStyles['is-active'] || 'isActive',

  // Form
  button: bulmaStyles['button'] || 'button',
  field: bulmaStyles.field || 'field',
  input: bulmaStyles.input || 'input',
  textarea: bulmaStyles.textarea || 'textarea',
  control: bulmaStyles.control || 'control',

  // Card
  card: bulmaStyles.card || 'card',
  cardImage: bulmaStyles['card-image'] || 'cardImage',
  cardContent: bulmaStyles['card-content'] || 'cardContent',

  // Media
  media: bulmaStyles.media || 'media',
  mediaLeft: bulmaStyles['media-left'] || 'mediaLeft',
  mediaContent: bulmaStyles['is-48x48'] || 'mediaContent',

  // Image
  image: bulmaStyles.image || 'image',
  is4by3: bulmaStyles['is-4by3'] || 'is4by3',
  is48x48: bulmaStyles[''] || 'is48x48',

  // Titles
  title: bulmaStyles.title || 'title',
  subtitle: bulmaStyles.subtitle || 'subtitle',

  // Typography
  isH1: bulmaStyles['is-h1'] || 'isH1',
  isH2: bulmaStyles['is-h2'] || 'isH2',
  isH3: bulmaStyles['is-h3'] || 'isH3',
  isH4: bulmaStyles['is-h4'] || 'isH4',
  isH5: bulmaStyles['is-h5'] || 'isH5',
  isH6: bulmaStyles['is-h6'] || 'isH6',
  content: bulmaStyles.content || 'content',

  // Navbar
  navbar: bulmaStyles.navbar || 'navbar',
  navbarBrand: bulmaStyles['navbar-brand'] || 'navbarBrand',
  navbarItem: bulmaStyles['navbar-item'] || 'navbarItem',
  navbarLink: bulmaStyles['navbar-link'] || 'navbarLink',
  navbarDropdown: bulmaStyles['navbar-dropdown'] || 'navbarDropdown',
  navbarDivider: bulmaStyles['navbar-divider'] || 'navbarDivider',
  navbarStart: bulmaStyles['navbar-start'] || 'navbarStart',
  navbarEnd: bulmaStyles['navbar-end'] || 'navbarEnd',

  // Menu
  hasDropdown: bulmaStyles.hasDropdown || 'hasDropdown',

  // Tabs
  tabs: bulmaStyles.tabs || 'tabs',
  isToggle: bulmaStyles['is-toggle'] || 'isToggle',
  isFullwidth: bulmaStyles['is-fullwidth'] || 'isFullwidth',

  notification: bulmaStyles.notification || 'notification'
}

export default bulma
