---
title: Handling Embedded Code in a Markdown Title
description: How can you format inline code in a Markdown title?
  We will show you.
date: 2020-02-24
lang: en-us
---

Sometimes, I need to include the name of a function, class, or
variable in the title of a post.  [Dealing with the
`componentWillMount`&thinsp;Warning][1] is one such example.  The
problem is that [Gatsby][2], [remark][3], and the related plugins,
[gatsby-transformer-remark][4] and [gatsby-remark-prismjs][5] do not
support this natively.

When you use backticks (`) in the front-matter title of a Markdown
file:

```md
---
title: Dealing with the `componentWillMount` Warning
date: 2020-02-04
---
```

They will appear literally in the output:

[//]: # ' TODO:  I need some sort of MDX element to really make this'
[//]: # ' appear as an example, rather than looking like part of the'
[//]: # ' document itself.'

> ### Dealing with the \`componentWillMount\` Warning

So, how do we fix this?

## Possible Problems

The naïve approach is to pass the title through a Markdown processor
and then insert it using `html›dangerouslySetInnerHTML`.  There are
several problems with this approach.  Firstly, Markdown can contain
literal HTML elements including scripts and tracking pixels, which can
be security issues.  Secondly, some Markdown, like `md›## Header`
codes, will produce undesirable results in a title.  Finally, when
used in the HTML `html›title` tag any markup may be displayed
literally in search engine results.

So, my initial solution involved a simple regular expression to
replace backticks with the appropriate `html›code` tags, turning the
above `text›title` block into

```html
Dealing with the <code class="language-text">componentWillMount</code> Warning
```

This worked fine for the specific example, but then I realized it
would turn

```md
---
title: Escaping `&amp;` Must Be Handled Carefully
---
```

into

```html
Escaping <code class="language-text">&amp;</code> Must Be Handled Carefully
```

which would be displayed as

<!-- markdownlint-disable no-inline-html -->
> ### Escaping <code class="language-text">&amp;</code> Must Be Handled Carefully
<!-- markdownlint-enable no-inline-html -->

on the page.  This isn't at all what we want and there are problematic
scenarios as well.

We should be able to include HTML tags with the angle brackets around
them, e.g.

```md
---
title: Should We Still Use `<br />`?
---
```

or backticks in a non-code context, such as

[//]: # ' I use plain ```text here because prism colors it incorrectly.'

```text
---
title: Backticks (`) Generate HTML `code` Tags
---
```

All of these issues complicate the situation and make writing a simple
and accurate regular expression to do the job all but impossible.

## The Solution

Instead, treat the title like user-provided content that needs to be
rendered safely and securely.  This means performing proper HTML
escaping on it to avoid injection of code, URLs, and other unintended
content since `js›dangerouslySetInnerHTML` needs to be used to pass
HTML tags, like `html›code`, to React.

```js
import escapeHtml from 'lodash.escape'
...
function markdownCodeToPrismHtml(s) {
  var safeString = escapeHtml(s)
  ...
}
```

Since the string has been HTML-escaped, we have to look for backticks
in their escaped form too.

```js
// After HTML escaping, we need to look for backticks in their escaped form.
const backtick = escapeHtml('`')
```

Due to the overall complexity of what needs to be matched and what
should be ignored, we cannot use a simple `js›RegExp` to do the
replacement.  Instead, we will loop while there are a pair of
backticks and then replace them with the opening and closing
[Prism.js][6] `html›code` tags.

```js
const backtickPair = new RegExp(backtick + '.*' + backtick)
while (backtickPair.test(safeString)) {
  safeString = safeString
    .replace(backtick, '<code class="language-text">')
    .replace(backtick, '</code>')
}
```

This solves all of the issues in the [previous
section](#possible-problems) except for backticks in a non-code
context, like

```text
---
title: Backticks (\`) Generate HTML `code` Tags
---
```

which requires a little extra handling.  First we need a few patterns
for matching these escaped and unescaped backticks; and to check if
there are any pairs of unescaped backticks.

```js
const escapedBacktick = new RegExp(`\\\\${backtick}`, 'g')
const unescapedBacktick = new RegExp(`([^\\\\])${backtick}`)
const unescapedPair = new RegExp(`[^\\\\]${backtick}.*[^\\\\]${backtick}`)
```

The first is simple enough, but notice I have made it a global
`js›'g'` pattern, so that a single `js›replace()` call can remove all
of the backslashes.  The `js›unescapedBacktick` pattern captures the
character before the backtick to allow it to be used in the
replacement text.  Finally, `js›unescapedPair` pattern cannot contain
capture groups, because they will cause the call to `js›test` to fail
to match anything.  So, instead of `js›unescapedBacktick`, it uses
plain `js›backtick`.

Putting this all together changes the loop into

```js
while (unescapedPair.test(safeString)) {
  safeString = safeString
    .replace(unescapedBacktick, '$1<code class="language-text">')
    .replace(unescapedBacktick, '$1</code>')
}
```

and all that is left to do, is remove the backslashes from escaped
backticks:

```js
return safeString.replace(escapedBacktick, backtick)
```

[1]: ../componentWillMount/
[2]: https://www.gatsbyjs.org
[3]: https://remark.js.org
[4]: https://www.gatsbyjs.org/packages/gatsby-transformer-remark
[5]: https://www.gatsbyjs.org/packages/gatsby-remark-prismjs
[6]: https://prismjs.com

<!-- markdownlint-disable no-trailing-punctuation -->
## What about SEO?
<!-- markdownlint-enable no-trailing-punctuation -->

The other place Markdown front-matter titles are normally used is in
SEO-related headers.  This is somewhat simpler than inserting the
proper `html›code` tags with in the body of a page.  All we have to do
is strip any Markdown formatting pass the unformatted text on to the
SEO module.

We are already using remark to build this site.  It is a Markdown
processor powered by [plugins][7] and is part of the [unified][8]
collective.  The number of things it can do is amazing including
[compiling to HTML][9], [man pages][10], or an Abstract Syntax Tree,
AST, that you can manipulate.

[7]: https://github.com/remarkjs/remark/blob/master/doc/plugins.md#list-of-plugins
[8]: https://unifiedjs.com/
[9]: https://github.com/remarkjs/remark-html
[10]: https://github.com/remarkjs/remark-man

All we need it to do is strip the Markdown and give us plain text.
That should be easy.  Right?  Well, almost.

### Straining at a gnat and swallowing a camel

If you haven't used unified before it can be intimidating.  I know.  I
spent an evening running down pieces and parts of the [unified
collective][uc] trying to figure out how to do it myself before
running into a simple solution.

[uc]: https://unifiedjs.com/learn/guide/introduction-to-unified/#collective

It seemed that unified, remark, and friends were lacking a good
introduction for new users, but there is the [Intro to unified][itu],
which I looked at very early on, but it didn't really click for me.
Coming back to it while writing this, after finding the solution and
independently arriving at a basic understanding of unified, it does a
reasonable job, and may be what most users need.

The various members of the collective all maintain their own projects,
packages, plugins, and API documentation, which is what I spent most
of my time looking at.  From that perspective, they seem to assume you
already understand the various parts and how they fit together.

[itu]: https://unifiedjs.com/learn/guide/introduction-to-unified

Ultimately, there are three basic parts to processing text with
unified.  They are covered in the [How it comes together][hict]
section of the Intro.  The general process is _Parse_, _Transform_,
and _Stringify_.  There may be multiple steps within some and none in
others depending upon what you are doing.

[hict]: https://unifiedjs.com/learn/guide/introduction-to-unified/#how-it-comes-together

Each component within the collective generally has a single example
which uses other parts of the system.  Typically, there is a snippet
without much explanation of what is going on.  Cram this into the
blackbox and that comes out the other end.  But, it was [one of those
examples][11], in a seemingly unrelated part of the collective, where
I found the solution.

[11]: https://github.com/syntax-tree/mdast-util-to-string#use

### Stripping Markdown from a title

So, let's cut to the chase.  What do you need?  Basically three
things, unified to orchestrate stuff, a parser to convert Markdown to
an AST, and something to strip all the excess and convert that tree to
a string.  Our solution skips the transformation part of the _Parse_,
_Transform_, and _Stringify_ pipeline, because we don't really convert
between different markup languages or types of ASTs.

The parts we do need are found in unified, [remark-parse][12], and
[mdast-util-to-string][13].

[12]: https://github.com/remarkjs/remark/tree/master/packages/remark-parse
[13]: https://github.com/syntax-tree/mdast-util-to-string

```js
import unified from 'unified'
import parser from 'remark-parse'
import toString from 'mdast-util-to-string'
```

That last bit is an [mdast][14] utility, where mdast is the Markdown
Abstract Syntax Tree.  So, you can see we really are skipping the
_Transform_ step and are just parsing Markdown into mdast and then
converting that, less the markup, to a string.  The whole thing can be
expressed in a single line of code

```js
const removeMarkdown = s => toString(unified().use(parser).parse(s))
```

But, let's break it down a bit.  We tell `js›unified()` to
`js›.use(...)` the `js›remark-parse` `js›parser` and to use it to
`js›.parse(...)` the string `js›s`.  That produces the AST, which we
then pass to `js›mdast-util-to-string` aliased as `js›toString()`.

From the [API documentation][15]:

> `js›toString(node)`
>
> Get the text content of a [node][16].
>
> The algorithm checks [the] value of `node`, then `alt`, and finally
> `title`. If no value is found, the algorithm checks the children of
> node and joins them (without spaces or newlines).
>
> > This is not a markdown to plain-text library. Use
> > [`text›strip-markdown`][17] for that.

I may have been able to use `js›strip-markdown`, but from the
parenthetical "without spaces or newlines", I inferred that one the
differences between the two is that `js›strip-markdown` may return
multiple lines.  Whereas, `js›mdast-util-to-string` always returns a
single line of text, which is what we want.

## The End Result

This all results in two routines, `js›markdownCodeToPrismHtml` and
`js›removeMarkdown`.  For now they are is in my local
`src/utils/title.ts`, but I will likely move it into an [npm][npm]
package that I will publish it once my site goes live and you can
actually read this.

[npm]: https://www.npmjs.com

### Usage

The two routines are imported into in my page generator and used to
create two versions of the title

```js
import { markdownCodeToPrismHtml, removeMarkdown } from '../utils/title'
...
  const title = markdownCodeToPrismHtml(post.frontmatter.title)
  const seoTitle = removeMarkdown(post.frontmatter.title)
```

which are then passed to the `jsx›SEO` component and to
`jsx›dangerouslySetInnerHTML`

```jsx{4,8}
return (
  <Layout>
    <SEO
      title={seoTitle}
      description={post.frontmatter.description || post.excerpt}
    />
    <div>
      <h1 dangerouslySetInnerHTML={{ __html: title }} />
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  </Layout>
)
```

Like all good designs the usage is simple even if the original
development and library code are not.

## The Code Module

Everything explained piecewise above is brought together in
`src/utils/title.ts`:

`embed:src/utils/title.ts`

[14]: https://github.com/syntax-tree/mdast
[15]: https://github.com/syntax-tree/mdast-util-to-string#api
[16]: https://github.com/syntax-tree/mdast#nodes
[17]: https://github.com/remarkjs/strip-markdown
