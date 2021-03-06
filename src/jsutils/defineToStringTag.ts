/**
 * @fileoverview
 * @author john.hou | 870301137@qq.com
 * @version 1.0.0 | 2020-01-14 | john.hou      // initial version
 */

export default function defineToStringTag (classObject: Class) {
  if (typeof Symbol === 'function' && Symbol.toStringTag) {
    Object.defineProperty(classObject.prototype, Symbol.toStringTag, {
      get() {
        return this.constructor.name
      }
    })
  }
}
