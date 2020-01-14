/**
 * @fileoverview
 * @author john.hou | 870301137@qq.com
 * @version 1.0.0 | 2020-01-14 | john.hou      // initial version
 */

import devAssert from '../devAssert'

describe('devAssert test suite', () => {
  const msg = '1 + 1 should be equal with 2'
  test('when `condition` is falsely throw an error', () => {
    expect(() => {
      devAssert(1 + 1 < 2, msg)
    }).toThrow(new Error(msg))
  })

  test('when `condition` is truely return undefined', () => {
    expect(devAssert(1 + 1 === 2, msg)).toBeUndefined()
  })
})
