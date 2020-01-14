/**
 * @fileoverview the interface of buildASTSchema
 * @author john.hou | 870301137@qq.com
 * @version 1.0.0 | 2020-01-13 | john.hou      // initial version
 */

import { GraphQLSchemaValidationOptions } from '../../type/schema'

export interface BuildSchemaOptions extends GraphQLSchemaValidationOptions {
  // 一个已经配置的选项，将在 v16 移除，默认 false
  commentDescriptions?: boolean

  assumeValidSDL?: boolean
}
