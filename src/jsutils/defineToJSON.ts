/**
 * @fileoverview
 * @author john.hou | 870301137@qq.com
 * @version 1.0.0 | 2020-01-15 | john.hou      // initial version
 */

import nodejsCustomInspectSymbol from './nodejsCustomInspectSymbol'

/**
 * 给自定的 Class 或者 Function 添加 toJSON 和 inspect 方法，方便调试，默认是 toString
 * @param classObject
 * @param fn
 */
export default function defineToJSON(classObject: Class | Function, fn: () => unknown = classObject.prototype.toString) {
  classObject.prototype.toJSON = fn

  // 为了兼容 Node.js 6.4.0 以前的版本，所以两个方法都添加了, 详情可以参考：
  // https://nodejs.org/dist/latest-v12.x/docs/api/deprecations.html#deprecations_dep0079_custom_inspection_function_on_objects_via_inspect
  // https://stackoverflow.com/questions/59745257/i-find-a-object-prototype-inspect-code-snippet-in-graphql-graphql-js-repo-wha
  classObject.prototype.inspect = fn
  if (nodejsCustomInspectSymbol) {
    classObject.prototype[nodejsCustomInspectSymbol] = fn
  }
}
