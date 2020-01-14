/**
 * @fileoverview
 * @author john.hou | 870301137@qq.com
 * @version 1.0.0 | 2020-01-13 | john.hou      // initial version
 */

import { ParseOption } from '../../language/parser'
import { Source } from '../../language/source'
import { BuildSchemaOptions } from './interface'

export * from './interface'

/**
 * 用来直接从 source doment 来创建 GraphQL schema 的辅助方法
 * @param source
 * @param options
 */
export function buildSchema(source: string | Source, options?: BuildSchemaOptions & ParseOption) {

}
