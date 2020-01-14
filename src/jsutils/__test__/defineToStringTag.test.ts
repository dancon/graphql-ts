/**
 * @fileoverview
 * @author john.hou | 870301137@qq.com
 * @version 1.0.0 | 2020-01-14 | john.hou      // initial version
 */

import defineToStringTag from '../defineToStringTag'

class Test {}
const t = new Test()

describe('defineToStringTag test suite', () => {
  const originObjString = '[object Object]'
  const tagedObjString = '[object Test]'

  test('it should be original string while not defined Symbom.toStringTag', () => {
    const str = Object.prototype.toString.call(t)
    expect(str).toBe(originObjString)
  })

  test('it should be taged string while define Symbol.toStringTag', () => {
    defineToStringTag(Test)
    const tagedT = new Test()
    const str = Object.prototype.toString.call(tagedT)

    expect(str).toBe(tagedObjString)
  })
})
