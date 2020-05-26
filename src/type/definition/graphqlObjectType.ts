/**
 * @fileoverview
 * @author john.hou | 870301137@qq.com
 * @version 1.0.0 | 2020-05-26 | john.hou      // initial version
 * @description
 * more detail: https://graphql.org/learn/schema/#object-types-and-fields
 */

export interface GraphQLObjectTypeConfig<TSource = any, TContext = any> {
  name: string

}

/**
 * 在我们日常的 GraphQL 开发中，大部分类型定义可能都是 ObjectType
 *
 * """类型描述"""
 * type Character {
 *  name: String!
 *  appearsIn: [Episode!]!
 * }
 */
export class GraphQLObjectType {
  name!: string  // 如上例中的 Character
  description?: string | null // 如上例中的注释

  constructor(config: Readonly<GraphQLObjectTypeConfig>) {
    this.name = config.name
  }
}
