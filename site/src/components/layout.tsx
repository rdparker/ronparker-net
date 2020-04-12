/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import Header from './header'
import '../__generated__/gatsby-types'

interface Props {
  children: React.ReactNodeArray
}

const Layout = ({ children }: Props): JSX.Element => {
  const data = useStaticQuery<GatsbyTypes.SiteTitleQuery>(graphql`
    query SiteTitle {
      site {
        siteMetadata {
          title
          subtitle
        }
      }
    }
  `)

  const copyright = `© ${new Date().getFullYear()}`
  return (
    <>
      <Header
        siteTitle={data?.site?.siteMetadata?.title}
        subtitle={data?.site?.siteMetadata?.subtitle}
      />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0px 1.0875rem 1.45rem`,
          paddingTop: 0,
        }}
      >
        <main>{children}</main>
        <footer>
          {copyright}
          {`, Built with `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
