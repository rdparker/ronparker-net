---
title: Dealing with the `componentWillMount` Warning
description: Here is how to fix the componentWillMount warning when running
  Gatsby in development mode.
date: 2020-02-04
---

When running a [Gatsby][1] website in development mode you are likely to see the
following warning in the browser's console.

<!-- markdownlint-disable line-length -->
```text
    Warning: componentWillMount has been renamed, and is not recommended for use. See https://fb.me/react-async-component-lifecycle-hooks for details.

    * Move code with side effects to componentDidMount, and set initial state in the constructor.
    * Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 17.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.

    Please update the following components: SideEffect(NullComponent)
```
<!-- markdownlint-enable line-length -->

This is because the current version of [react-helmet][2], which is
used by the SEO component in [gatsby-starter-default][3], has a nested
dependency on v1 of [react-side-effect][4], which in turn calls the
`js›componentWillMount` method.  The problem is being tracked as
[Gatsby issue 17865][5] and upstream as [React Helmet issue 413][6].

Fortunately, there is a simple solution as [pointed out on
GitHub][solution] by [apolopena](https://github.com/apolopena).  Swap
out react-helmet and [gatsby-plugin-react-helmet][7] with
[react-helmet-async][8] and [gatsby-plugin-react-helmet-async][9]
respectively.

[solution]: (https://github.com/gatsbyjs/gatsby/issues/17865#issuecomment-559141860)

Update to the asynchronous node modules:

```shell
yarn add react-helmet-async gatsby-plugin-react-helmet-async
yarn remove react-helmet gatsby-plugin-react-helmet
```

Replace the old plugin in `gatsby-config.js`

```js{2}
plugins: [
  `gatsby-plugin-react-helmet-async`,
  ...
]
```

Then, in the SEO component, replace the helmet `import`

```js{3}
import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet-async'
import { useStaticQuery, graphql } from 'gatsby'
```

and restart your development server

```shell
yarn develop
```

That's all there is to it.

[1]: https://gatsbyjs.org
[2]: https://github.com/nfl/react-helmet
[3]: https://github.com/gatsbyjs/gatsby-starter-default
[4]: https://github.com/gaearon/react-side-effect
[5]: https://github.com/gatsbyjs/gatsby/issues/17865
[6]: https://github.com/nfl/react-helmet/issues/413
[7]: https://www.gatsbyjs.org/packages/gatsby-plugin-react-helmet/
[8]: https://github.com/staylor/react-helmet-async
[9]: https://www.gatsbyjs.org/packages/gatsby-plugin-react-helmet-async/
