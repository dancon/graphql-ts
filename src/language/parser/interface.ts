/**
 * @fileoverview
 * @author john.hou | 870301137@qq.com
 * @version 1.0.0 | 2020-01-13 | john.hou      // initial version
 */

export interface ParseOption {
  /**
   * 默认情况下， parser 创建的 AST 节点都会有该节点对应源码中的位置
   * 之所以设置该选项，是用来关闭默认行为以提高性能或者测试
   */
  noLocation?: boolean

  /**
   * 将在 V16 移除
   * 这是一个历史遗留问题，设置为 true, parser 将处理定义在 SDL 中的空字段
   */
  allowLegacySDLEmptyFields?: boolean

  /**
   * 将在 V16 移除
   * 用来处理历史遗留问题, 当 implements 多个 interface 时，多个 interface 之间最新语法为通过 & 来分割, 老版可以使用空格，这个设置主要用来兼容这中情况
   * https://spec.graphql.org/draft/#sec-Interfaces
   */
  allowLegacySDLImplementsInterfaces?: boolean

  /**
   * 实验功能，处理 Fragment 定义中的变量
   * https://github.com/graphql/graphql-spec/issues/204
   */
  experimentalFragmentVariables?: boolean
}


export type OperationTypeNode = 'query' | 'mutation' | 'subscription'
