/* eslint-disable @typescript-eslint/camelcase */
import colors from './src/gatsby-plugin-theme-ui/colors'

module.exports = {
  siteMetadata: {
    title: `Ron Parker`,
    subtitle: `God.  Tech.  Life.`,
    description: `Ron Parker.  God.  Tech.  Life.`,
    author: `Ron Parker`,
  },
  plugins: [
    `gatsby-plugin-react-helmet-async`,
    {
      resolve: `gatsby-plugin-typegen`,
      options: {
        emitSchema: {
          'src/__generated__/gatsby-introspection.json': true,
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-hyphenopoly`,
          `gatsby-remark-smallcaps`,
          {
            resolve: `gatsby-remark-images`,
          },
          {
            resolve: `gatsby-remark-smartypants`,
            options: {
              dashes: 'oldschool',
            },
          },
          {
            resolve: `gatsby-remark-embed-snippet`,
            options: {
              directory: `${__dirname}`,
            },
          },
          // This must come before gatsby-remark-prismjs, otherwise you
          // may hit https://github.com/gatsbyjs/gatsby/issues/5764.
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: { isIconAfterHeader: true },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              // This separates the language name from inline code.
              // U+203A SINGLE RIGHT-POINTING ANGLE QUOTATION MARK
              inlineCodeMarker: `›`,
            },
          },
        ],
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Ron Parker Online`,
        short_name: `Ron Parker`,
        start_url: `/`,
        background_color: colors.background,
        theme_color: colors.primary,
        display: `minimal-ui`,
        icon: `src/images/icon.png`,
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-plugin-theme-ui`,
    `gatsby-plugin-typescript`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/gatsby-plugin-theme-ui/typography`,
        omitGoogleFont: true,
      },
    },
    `gatsby-theme-style-guide`,
  ],
}
