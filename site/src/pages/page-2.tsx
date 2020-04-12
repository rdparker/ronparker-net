import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'

const SecondPage = (): JSX.Element => (
  <Layout>
    <SEO title="Page two" />
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <p>
      {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
      <b>Leading</b> (pronounced “ledding”) is the typographer’s word for line
      spacing, named for the lead shims that were once inserted between rows of
      typeset characters. Possibly, you have played with the controls in your
      word processor and seen how text looks with single or double line spacing
      selected? Manuscripts are generally created double-spaced, not only so
      editors have a place to write comments above the text, but because they’re
      easier to read that way. Convention suggests a leading value of 50%—that’s
      50% larger than (1.5 times the size of) your chosen typeface. In other
      words, if you’re using 12-point type, start with 18 point leading. From
      there, make fine adjustments to account for the typeface itself. I like to
      set a full block of text with my selected typeface and type size, then
      expand the leading so the last line sits perfectly on the bottom of the
      text box.
    </p>
    <p>
      Here are samples of 12 point Centaur Regular set to different leading
      specifications. Type sizes and leading are commonly specified with a slash
      between them. 12-point type at 18-point leading is notated as 12/18.
    </p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default SecondPage
