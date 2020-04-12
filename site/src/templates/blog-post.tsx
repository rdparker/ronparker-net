/* TODO:  Figure out how to add PropType runtime checking for the page query. */
import React from 'react'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { jsx } from 'theme-ui'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { markdownCodeToPrismHtml, removeMarkdown } from '../utils/title'
import colors from '../gatsby-plugin-theme-ui/colors'

export const query = graphql`
  query BlogPost($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        description
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`

interface Props {
  data: {
    markdownRemark: {
      frontmatter: {
        title: string
        description?: string
        date?: string
      }
      excerpt?: string
      html: string
    }
  }
}

const BlogPost = ({ data }: Props): JSX.Element => {
  const post = data.markdownRemark
  const title = markdownCodeToPrismHtml(post.frontmatter.title)
  const seoTitle = removeMarkdown(post.frontmatter.title)
  const date = post.frontmatter.date && (
    <p style={{ color: `${colors.darken}` }}>{post.frontmatter.date}</p>
  )

  return (
    <Layout>
      <SEO
        title={seoTitle}
        description={post.frontmatter.description || post.excerpt}
      />
      <div>
        {/* eslint-disable react/no-danger */}
        <h1 dangerouslySetInnerHTML={{ __html: title }} />
        {date}
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        {/* eslint-enable react/no-danger */}
      </div>
    </Layout>
  )
}

export default BlogPost
