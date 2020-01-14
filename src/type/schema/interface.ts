/**
 * @fileoverview
 * @author john.hou | 870301137@qq.com
 * @version 1.0.0 | 2020-01-13 | john.hou      // initial version
 */

export interface GraphQLSchemaValidationOptions  {
  // 当使用已经启动的服务的内省结果来构建 schema 的时候，我们可以将该值置为 true, 因为这种情况下，只要内省值有正常返回，结果就是合法的，所以，这种情况下，传 true
  // 默认为 false
  assumeValid?: boolean
}
