import { visit } from 'unist-util-visit'

export function mermaid() {
  return function (tree, { data }) {
    visit(tree, 'code', (node) => {
      if (node.lang === 'mermaid') {
        node.type = 'html'
        node.value = `<pre class="mermaid">${node.value}</pre>`
      }
    })
  }
}
