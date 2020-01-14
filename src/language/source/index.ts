/**
 * @fileoverview
 * @author john.hou | 870301137@qq.com
 * @version 1.0.0 | 2020-01-14 | john.hou      // initial version
 */

import devAssert from '../../jsutils/devAssert'
import defineToStringTag from '../../jsutils/defineToStringTag'
import { Location } from './interface'

export * from './interface'

/**
 * 该类用来表示 GraphQL 输入的源码信息
 * name 和 locationOffset 都是可选的，name 用来表示源码文件名，locationOffset 用来表示源码文件中，graphql 输入开始的位置
 * 对于一些客户端将 graphql 保存在源码文件中的场景比较有用（笔者觉得：无所谓客户端还是服务端，只要将 graphql 保存在源码文件中，用来记录元数据，这个类都会比较有用）
 * 比如有这么一个文件：foo.graphql 里面保存着 graphql, 并且是从第 40 行开始，这时候，构建 Source 对象,
 * name: 'foo.graphql'
 * locationOffset: { line: 40, column: 1 }
 *
 * 注意 locationOffset.line 和 locationOffset.column 都是 1-indexed 而不是 0-indexed
 */
export class Source {
  body: string
  name: string
  locationOffset: Location

  constructor(body: string, name?: string, locationOffset?: Location) {
    this.body = body
    this.name = name ?? 'GraphQL request'
    this.locationOffset = locationOffset ?? { line: 1, column: 1 }

    devAssert(this.locationOffset.line > 0, 'line in locationOffset is 1-indexed and must be positive.')
    devAssert(this.locationOffset.column > 0, 'column in locationOffset is 1-indexed and must be positive.')
  }
}

defineToStringTag(Source)
