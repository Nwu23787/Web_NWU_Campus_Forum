/**
 * @typedef {import('mdast').Root} Root
 *
 * @typedef {import('mdast-util-directive')} DoNotTouchAsThisImportIncludesDirectivesInTree
 */

//import {directive} from 'micromark-extension-directive'
//import {directiveFromMarkdown, directiveToMarkdown} from './mdast-util-directive'
//import {directiveFromMarkdown, directiveToMarkdown} from 'mdast-util-directive'
//import {directiveFromMarkdown} from 'mdast-util-directive'
//import {directiveToMarkdown} from './mdast-util-directive'
import {directive} from './syntax'
import {directiveFromMarkdown} from './mdast-util-directive'

/**
 * 支持通用指令提案的插件 !Extension
 * !video   应用!video[alt](url)  
 * !file    应用!file[alt](url)
 * 
 * 
 * 参考来自https://github.com/remarkjs/remark-directive
 *
 * @type {import('unified').Plugin<void[], Root>}
 */
export default function remarkExclamationMark(this: any) {
  const data = this.data()

  add('micromarkExtensions', directive())
  add('fromMarkdownExtensions', directiveFromMarkdown())
  //add('toMarkdownExtensions', directiveToMarkdown)

  /**
   * @param {string} field
   * @param {unknown} value
   */
  function add(field:any, value:any) {
    const list = /** @type {unknown[]} */ (
      // 其他扩展
      /* c8 ignore next 2 */
      data[field] ? data[field] : (data[field] = [])
    )

    list.push(value)
  }
}