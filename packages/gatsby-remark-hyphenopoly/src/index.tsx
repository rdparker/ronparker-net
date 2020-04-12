import visit from 'unist-util-visit'
import toString from 'mdast-util-to-string'
import type { Node } from 'unist'
import Hyphenopoly from 'hyphenopoly'

interface ModuleArg {
  markdownAST: Node
}

const hyphenator = Hyphenopoly.config({
  sync: true,
  require: ['en-us'],
  hyphen: '\u00AD',
})

function hyphenate(text: string): string {
  return hyphenator(text)
}

module.exports = ({ markdownAST }: ModuleArg): Node => {
  visit(markdownAST, 'text', (node: Node) => {
    node.value = hyphenate(toString(node))
  })

  return markdownAST
}
