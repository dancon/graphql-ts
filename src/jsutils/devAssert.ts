/**
 * @fileoverview
 * @author john.hou | 870301137@qq.com
 * @version 1.0.0 | 2020-01-14 | john.hou      // initial version
 */

/**
 * 开发环境断言，当 condition 为 falsely 时，抛出一个错误
 * @param condition
 * @param message
 */
export default function devAssert(condition: unknown, message: string) {
  const booleanCondition = Boolean(condition)
  if (!booleanCondition) {
    throw new Error(message)
  }
}
