/**
 * @typedef {import('micromark-util-types').Construct} Construct
 * @typedef {import('micromark-util-types').Previous} Previous
 * @typedef {import('micromark-util-types').State} State
 * @typedef {import('micromark-util-types').TokenizeContext} TokenizeContext
 * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
 */

import {codes, types} from 'micromark-util-symbol'
import {factoryName} from './factory-name.js'

/** @type {Construct} */
export const directiveText = {
  tokenize: tokenizeDirectiveText,
  previous
}

/**
 * @this {TokenizeContext}
 * @type {Previous}
 */
function previous(this:any,code:any) {
  // If there is a previous code, there will always be a tail.
  return (
    code !== codes.colon ||
    this.events[this.events.length - 1][1].type === types.characterEscape
  )
}

/**
 * @this {TokenizeContext}
 * @type {Tokenizer}
 */
function tokenizeDirectiveText(this:any,effects:any, ok:any, nok:any) {
  const self = this

  return start

  /** @type {State} */
  function start(code:any) {
    effects.enter('directiveText')
    effects.enter('directiveTextMarker')
    effects.consume(code)
    effects.exit('directiveTextMarker')

    
    return factoryName.call(self, effects, afterName, nok, 'directiveTextName')
  }

  /** @type {State} */
  function afterName(code:any) {
    return code === codes.colon ? nok(code) : afterLabel(code)
  }

  /** @type {State} */
  function afterLabel(code:any) {
    return afterAttributes(code)
  }

  /** @type {State} */
  function afterAttributes(code:any) {
    effects.exit('directiveText')
    return ok(code)
  }
}


