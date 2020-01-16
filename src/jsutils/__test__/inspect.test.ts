/**
 * @fileoverview
 * @author john.hou | 870301137@qq.com
 * @version 1.0.0 | 2020-01-17 | john.hou      // initial version
 */

import inspect from '../inspect'
import defineToJSON from '../defineToJSON'
import defineToStringTag from '../defineToStringTag'

describe(`jsutil/inspect`, () => {
  class Test {
    name: string = 'jonson'
  }

  defineToStringTag(Test)

  defineToJSON(Test, function (this: Test) {
    return `name-${this.name}`
  })

  const t = new Test()
  const expectedStr = 'name-jonson'

  test(`class with custom inspect function`, () => {
    expect(inspect(t)).toEqual(expectedStr)
  })

  function namedFn () {}
  test(`named function`, () => {
    expect(inspect(namedFn)).toEqual(`[function namedFn]`)
  })

  test(`anonymous function`, () => {
    expect(inspect(() => {})).toEqual(`[function]`)
  })

  test(`string`, () => {
    const str = `inspect a string`
    expect(inspect(str)).toEqual(`"${str}"`)
  })

  test(`null`, () => {
    expect(inspect(null)).toEqual('null')
  })

  const obj = {
    level1: {
      level2: t
    }
  }
  test(`more the 2 nest level with custom inspect`, () => {
    expect(inspect(obj)).toEqual(`{level1: {level2: name-jonson}}`)
  })

  const obj1 = {
    level1: 'test'
  }

  test(`normal object`, () => {
    expect(inspect(obj1)).toEqual(`{level1: "test"}`)
  })

  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  test(`11 items array`, () => {
    expect(inspect(arr)).toEqual(`[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, ... 1 more item]`)
  })
  const arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  test(`12 items array`, () => {
    expect(inspect(arr1)).toEqual(`[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, ... 2 more items]`)
  })
  const arr2 = [1, 2, 3]
  test(`3 items array`, () => {
    expect(inspect(arr2)).toEqual(`[1, 2, 3]`)
  })
})
