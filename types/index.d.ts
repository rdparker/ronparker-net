/* eslint-disable @typescript-eslint/camelcase */
declare module 'mdast-util-to-string' {
  import type { Node } from 'unist'

  function mdast_util_to_string(node: Node): string
  export = mdast_util_to_string
}
