/**
 * @typedef {import('micromark-util-types').Extension} Extension
 */

import {codes} from 'micromark-util-symbol'
import {directiveText} from './directive-text.js'

/**
 * 创建micromark扩展以启用指令语法。
 * 
 * 参考来自micromark-extension-directive
 *
 * @returns {Extension} “micromark”的扩展可以在“extensions”中传递，以启用指令语法。
 */
export function directive() {
  return {
    //https://github.com/micromark/micromark/tree/4346e010d537b05f622e636d001bd25c1140f6a1/packages/micromark-util-symbol
    text: {[codes.exclamationMark]: directiveText},//冒号codes.colon   感叹号codes.exclamationMark   参数https://github.com/micromark/micromark/blob/4346e010d537b05f622e636d001bd25c1140f6a1/packages/micromark-util-symbol/lib/values.js
  }
}