/**
 * @typedef {import('mdast').Nodes} Nodes
 * @typedef {import('mdast').Paragraph} Paragraph
 *
 * @typedef {import('mdast-util-from-markdown').CompileContext} CompileContext
 * @typedef {import('mdast-util-from-markdown').Extension} FromMarkdownExtension
 * @typedef {import('mdast-util-from-markdown').Handle} FromMarkdownHandle
 * @typedef {import('mdast-util-from-markdown').Token} Token
 *
 * @typedef {import('mdast-util-to-markdown').ConstructName} ConstructName
 * @typedef {import('mdast-util-to-markdown').Handle} ToMarkdownHandle
 * @typedef {import('mdast-util-to-markdown').Options} ToMarkdownExtension
 * @typedef {import('mdast-util-to-markdown').State} State
 *
 * @typedef {import('../index.js').Directives} Directives
 * @typedef {import('../index.js').LeafDirective} LeafDirective
 * @typedef {import('../index.js').TextDirective} TextDirective
 */



/**
 * 创建 `mdast-util-from-markdown` 扩展以启用 markdown 中的指令
 * .
 * 参考来自mdast-util-directive
 *
 * @returns {FromMarkdownExtension}
 */
export function directiveFromMarkdown() {
  return {
    canContainEols: ['textDirective'],
    enter: {

      directiveText: enterText,
    },
    exit: {

      directiveText: exit,
      directiveTextName: exitName
    }
  }
}


/**
 * @this {CompileContext}
 * @type {FromMarkdownHandle}
 */
function enterText(this:any,token:any) {
  enter.call(this, 'textDirective', token)
}

/**
 * @this {CompileContext}
 * @param {Directives['type']} type
 * @param {Token} token
 */
function enter(this:any,type:any, token:any) {
  this.enter({type, name: '', attributes: {}, children: []}, token)
}

/**
 * @this {CompileContext}
 * @param {Token} token
 */
function exitName(this:any,token:any) {
  const node = this.stack[this.stack.length - 1]

  node.name = this.sliceSerialize(token)
}



/**
 * @this {CompileContext}
 * @type {FromMarkdownHandle}
 */
function exit(this:any,token:any) {
  this.exit(token)
}



