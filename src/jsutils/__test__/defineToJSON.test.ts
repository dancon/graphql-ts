/**
 * @fileoverview
 * @author john.hou | 870301137@qq.com
 * @version 1.0.0 | 2020-01-15 | john.hou      // initial version
 */

import { inspect } from 'util'
import defineToJSON from '../defineToJSON'

describe(`jsutils/defineToJSON test suite`, () => {
  class Test extends Object {
    name: string = 'john'
    age: number = 23
  }

  test('default fn should be toString', () => {
    defineToJSON(Test)
    const obj = new Test()
    const objStr = obj.toString()
    expect(JSON.stringify(obj)).toEqual(`"${objStr}"`)
    expect(inspect(obj)).toEqual(objStr)
  })

  test('custom fn', () => {
    defineToJSON(Test, function (this: Test) {
      return `${this.name}: ${this.age}`
    })
    const str = 'john: 23'
    const obj = new Test()
    expect(JSON.stringify(obj)).toEqual(`"${str}"`)
    expect(inspect(obj)).toEqual(str)
  })
})
