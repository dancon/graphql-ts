/**
 * @fileoverview
 * @author john.hou | 870301137@qq.com
 * @version 1.0.0 | 2020-01-13 | john.hou      // initial version
 */

import { ParseOption } from './interface'
import { Source } from '../source'

/**
 * 用来将 source 转化为 GraphQL Document
 * @param source
 * @param options
 */
export function parse(source: string | Source, options?: ParseOption) {
  const parser = new Parser()
  return parser.parseDocument()
}

class Parser {
  parseDocument () {}
}

export * from './interface'
