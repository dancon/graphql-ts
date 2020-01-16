/**
 * @fileoverview
 * @author john.hou | 870301137@qq.com
 * @version 1.0.0 | 2020-01-13 | john.hou      // initial version
 */

import devAssert from '../../jsutils/devAssert'
import inspect from '../../jsutils/inspect'

import { ParseOption } from './interface'
import { Source } from '../source'

/**
 * 用来将 source 转化为 GraphQL Document
 * @param source
 * @param options
 */
export function parse(source: string | Source, options?: ParseOption) {
  const parser = new Parser(source, options)
  return parser.parseDocument()
}

class Parser {
  constructor(source: string | Source, options?: ParseOption) {
    const sourceObj = typeof source === 'string' ? new Source(source) : source

    devAssert(sourceObj instanceof Source, `Must provide Source. Received: ${inspect(sourceObj)}`)
  }
  parseDocument () {}
}

export * from './interface'
