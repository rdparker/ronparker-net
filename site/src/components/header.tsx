// @jsx jsx
import React from 'react'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { jsx } from 'theme-ui'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import colors from '../gatsby-plugin-theme-ui/colors'
import { rhythm } from '../gatsby-plugin-theme-ui/typography'

interface Props {
  siteTitle: string
  subtitle: string
}

const Header = (props: Props): JSX.Element => {
  const { siteTitle, subtitle } = props
  return (
    <header
      sx={{
        backgroundColor: `primary`,
        marginBottom: rhythm(1),
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `${rhythm(1)} 1.0875rem`,
        }}
      >
        <h1 style={{ margin: 0 }}>
          <Link
            className="no-underline reverse-color"
            to="/"
            sx={{
              color: `${colors.background} !important`,
              textDecoration: `none`,
              ml: '-0.1em', // This aligns the body of R, ignoring the serif
              ':hover, :active': { color: `${colors.muted} !important` },
            }}
          >
            {siteTitle}
          </Link>
        </h1>
        <h4
          sx={{
            margin: 0,
            paddingTop: rhythm(1 / 4),
            color: `${colors.darken}`,
          }}
        >
          {subtitle}
        </h4>
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
  subtitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
  subtitle: ``,
}

export default Header
