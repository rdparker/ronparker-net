import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import '../__generated__/gatsby-types'

const IndexPage = (): JSX.Element => (
  <Layout>
    <SEO title="Home" />
    <h1>Hey Everyone</h1>
    <p>
      This is my new website and there will be much more coming in the future,
      but for now I&rsquo;ll leave you with a simple offering,{' '}
      <Link to="god/bible/when-easter-and-creation-collide">
        When Easter and Creation Collide
      </Link>
      .
    </p>
  </Layout>
)

export default IndexPage
