// Borrowed this technique of underlining links without them crossing
// descenders from Tufte CSS,
//
//   https://github.com/edwardtufte/tufte-css/blob/gh-pages/tufte.css
//
// The original technique comes from Adam Schwartz.
import colors from './colors'

const linkColor = 'inherit'
const underlineColor = 'currentcolor'

export default {
  /* Links: replicate underline that clears descenders */
  'a:link, a:visited': {
    color: `${linkColor}`,
  },

  '.no-underline:link, a.anchor.before, a.anchor.after': {
    background: `unset`,
    textShadow: `unset`,
  },

  'a:link, a:link > code, .underline, .hover-underline:hover': {
    textDecoration: `none`,
    background:
      `-webkit-linear-gradient(${colors.background}, ${colors.background}), ` +
      `-webkit-linear-gradient(${colors.background}, ${colors.background}), ` +
      `-webkit-linear-gradient(${underlineColor}, ${underlineColor}),` +
      `linear-gradient(${colors.background}, ${colors.background}), ` +
      `linear-gradient(${colors.background}, ${colors.background}), ` +
      `linear-gradient(${underlineColor}, ${underlineColor})`,
    '-webkit-background-size': `0.05em 1px, 0.05em 1px, 1px 1px`,
    '-moz-background-size': `0.05em 1px, 0.05em 1px, 1px 1px`,
    backgroundSize: `0.05em 1px, 0.05em 1px, 1px 1px`,
    backgroundRepeat: `no-repeat, no-repeat, repeat-x`,
    textShadow:
      `0.03em 0 ${colors.background}, -0.03em 0 ${colors.background}, ` +
      `0 0.03em ${colors.background}, 0 -0.03em ${colors.background}, ` +
      `0.06em 0 ${colors.background}, -0.06em 0 ${colors.background}, ` +
      `0.09em 0 ${colors.background}, -0.09em 0 ${colors.background}, ` +
      `0.12em 0 ${colors.background}, -0.12em 0 ${colors.background}, ` +
      `0.15em 0 ${colors.background}, -0.15em 0 ${colors.background}`,
    backgroundPosition: `0% 93%, 100% 93%, 0% 93%`,
  },

  '@media screen and (-webkit-min-device-pixel-ratio: 0)': {
    'a:link, .underline, .hover-underline:hover': {
      backgroundPositionY: `87%, 87%, 87%`,
    },
  },

  'a:link::selection, a:link::-moz-selection': {
    textShadow:
      `0.03em 0 ${colors.accent}, -0.03em 0 ${colors.accent}, ` +
      `0 0.03em ${colors.accent}, 0 -0.03em ${colors.accent}, ` +
      `0.06em 0 ${colors.accent}, -0.06em 0 ${colors.accent}, ` +
      `0.09em 0 ${colors.accent}, -0.09em 0 ${colors.accent}, ` +
      `0.12em 0 ${colors.accent}, -0.12em 0 ${colors.accent}, ` +
      `0.15em 0 ${colors.accent}, -0.15em 0 ${colors.accent}`,
    background: `${colors.accent}`,
  },
}
