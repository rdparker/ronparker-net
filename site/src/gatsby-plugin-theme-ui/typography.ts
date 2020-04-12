import Typography, { VerticalRhythm } from 'typography'
import sternGroveTheme from 'typography-theme-stern-grove'
import merge from 'lodash.merge'
import colors from './colors'
import links from './links'

const { prism } = colors

// This leans heavily on the Baskerville CSS Font Stack
// https://www.cssfontstack.com/Baskerville.
const baskervilleFontStack = [
  'Libre Baskerville',
  'Baskerville',
  'Baskerville Old Face',
  'Hoefler Text',
  'Garamond',
  'Times New Roman',
  ...sternGroveTheme.bodyFontFamily,
]

const typographyTheme = merge(sternGroveTheme, {
  // fontSizes: [ 10, 10, 21, 27, 33, 48 ],
  baseFontSize: 21,
  scaleRatio: 48 / 21,
  // Convention may be a baseLineHeight of 1.5 and Tufte CSS uses 1.42 (10 / 7),
  // but given the line width as well as the density and complexity of Libre
  // Baskerville, I find 5 / 3 (1.67) looks better and is more readable.
  baseLineHeight: 5 / 3,
  bodyColor: colors.text,
  headerColor: colors.secondary,
  bodyFontFamily: baskervilleFontStack,
  headerFontFamily: baskervilleFontStack,
  headerWeight: 700,
  blockMarginBottom: 3 / 5, // Inverse of baseLineHeight, giving baseFontSize

  overrideThemeStyles: ({ rhythm }: VerticalRhythm) => {
    return {
      p: {
        textAlign: 'justify',
      },
      // Used by gatsby-remark-smallcaps to give proper sizing to all-cap
      // abbreviations and words.
      '.caps': {
        fontVariantCaps: 'all-small-caps',
      },

      // There are two sets of margins here.  I think the smaller looks better
      // in the example I created.  The larger number in case I'm really decide
      // to go with a hard rhythm although h2 may be a touch off of that (it's
      // scaled based on Tufte CSS.  Maintaining rhythm may also require
      // adjusting blockMarginBottom above.
      'h1,h2,h3,h4,h5,h6': {
        fontStyle: 'italic',
        marginTop: '2.85714rem',
        // marginTop: "3.33333rem",
        lineHeight: 1,
      },

      h1: {
        fontStyle: 'normal !important',
        marginBottom: '1.0714rem',
        // marginBottom: "1.25rem",
      },

      h2: {
        marginTop: '1.5rem !important',
        // marginTop: "1.75rem !important"
      },

      h3: {
        marginTop: '1.42857rem !important',
        // marginTop: "1.66667rem !important"
      },

      blockquote: {
        color: `${colors.text}`,
        fontSize: '21px',
        padding: '0 35px',
        background: 'none',
        borderLeft: 'none',
      },

      'blockquote footer': {
        fontSize: '0.78571rem',
        textAlign: 'right',
      },

      // Underline links without crossing descenders.
      ...links,

      '::selection': {
        background: `${colors.accent}`,
        color: `${colors.background}`,
      },
      '::-moz-selection': {
        background: `${colors.accent}`,
        color: `${colors.background}`,
      },

      // The gatsby-remark-prismjs plugin does not use PrismJS's line highlighting
      // plugin.  See
      //
      //    https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-remark-prismjs#user-content-line-highlighting-1
      //
      // for details.
      //

      // These Gatsby blocks are modified from the examples at
      //
      //   https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-remark-prismjs
      //
      // Add back the container background-color, border-radius, padding, margin
      // and overflow that we removed from <pre>.
      '.gatsby-highlight': {
        backgroundColor: `${prism.background}`,
        borderRadius: `3px`,
        margin: `${rhythm(3 / 5)} 0`,
        padding: `${rhythm(0.5)} 1em`,
        overflow: `auto`,
      },

      '.gatsby-highlight pre[class*="language-"]': {
        margin: `0`,
        padding: `0`,
        overflow: 'initial',
        float: `left`,
        minWidth: `100%`,
      },

      // This highlighting is adapted from:
      //
      //   https://prismjs.com/plugins/line-highlight/prism-line-highlight.css
      //
      // The line-number portion may be brought over later, if I start using them.
      '.gatsby-highlight-code-line': {
        display: `block`,
        marginRight: `-1em`,
        marginLeft: `-1em`,
        paddingRight: `1em`,
        paddingLeft: `0.75em`,
        borderLeft: `0.25em solid ${prism.accent}`,
        left: '0',
        right: '0',
        background: `${prism.highlight}`,
      },
    }
  },
})

// This is for integration with theme-ui.
export const theme = typographyTheme

const typography = new Typography(typographyTheme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

// Export helper functions
export const { scale, rhythm, options } = typography
export default typography
