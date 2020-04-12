import escapeHtml from 'lodash.escape'
import unified from 'unified'
import parse from 'remark-parse'
import toString from 'mdast-util-to-string'

// Safely convert Markdown-syntax, inline code to HTML, including
// recognizing and handling escaped backticks (\`) as Markdown does,
// treating them as plain backtick characters, not code markers.
//
// The basic algorithm is to replace each pair of unescaped backticks
// with the proper code tags.
//
// A simple RegExp replacement will not work, because we may be
// matching against titles like:
//
//      Special Handling Required for `&amp;`
//
// and have to deal with escaped backticks like:
//
//      Backticks (\`) Generate `code` Tags
//
// so a loop is used instead.
export function markdownCodeToPrismHtml(s: string): string {
  // Since the result may be passed to dangerouslySetInnerHTML, escape
  // all HTML in the string to avoid code injection, XSS, etc.
  let safeString = escapeHtml(s)
  // After HTML escaping, we need to look for backticks in their
  // escaped form.
  const backtick = escapeHtml('`')
  // Escaped backticks (`\) should not be treated as code
  const escapedBacktick = new RegExp(`\\\\${backtick}`, 'g')
  // Only unescaped backticks should.  This handles matching a
  // backtick non-backslash character.  The preceding character is
  // captured, so it can be emitted in the replacement.
  const unescapedBacktick = new RegExp(`([^\\\\])${backtick}`)
  // This looks for a pair of unescaped backticks, but we do not use
  // `unescapedBacktick` because the capture groups do not work with
  // test.  It will not recognize any matches.
  const unescapedPair = new RegExp(`[^\\\\]${backtick}.*[^\\\\]${backtick}`)
  while (unescapedPair.test(safeString)) {
    safeString = safeString
      .replace(unescapedBacktick, '$1<code class="language-text">')
      .replace(unescapedBacktick, '$1</code>')
  }
  return safeString.replace(escapedBacktick, backtick)
}

export const removeMarkdown = (s: string): string =>
  toString(unified().use(parse).parse(s))
