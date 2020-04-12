import React from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby'
import { css } from '@emotion/core'
import { rhythm } from '../gatsby-plugin-theme-ui/typography'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'
import '../__generated__/gatsby-types'

const IndexPage = (): JSX.Element => {
  const data = useStaticQuery<GatsbyTypes.PagesQuery>(graphql`
    query Pages {
      allMarkdownRemark {
        totalCount
        edges {
          node {
            id
            frontmatter {
              title
              date(formatString: "MMMM DD, YYYY")
            }
            excerpt
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <h4>
        {data.allMarkdownRemark.totalCount}
        {` Posts`}
      </h4>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <div key={node.id}>
          <h3
            css={css`
              margin-bottom: ${rhythm(1 / 4)};
            `}
          >
            {node?.frontmatter?.title}
            <span
              css={css`
                color: #bbb;
              `}
            >
              {` — ${node?.frontmatter?.date}`}
            </span>
          </h3>
          <p>{node.excerpt}</p>
        </div>
      ))}
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  )
}

export default IndexPage
