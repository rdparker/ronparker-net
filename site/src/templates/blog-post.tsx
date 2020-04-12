/* TODO:  Figure out how to add PropType runtime checking for the page query. */
import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { markdownCodeToPrismHtml, removeMarkdown } from '../utils/title'

export const query = graphql`
  query BlogPost($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        description
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

  return (
    <Layout>
      <SEO
        title={seoTitle}
        description={post.frontmatter.description || post.excerpt}
      />
      <div>
        {/* eslint-disable react/no-danger */}
        <h1 dangerouslySetInnerHTML={{ __html: title }} />
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        {/* eslint-enable react/no-danger */}
      </div>
    </Layout>
  )
}

export default BlogPost
