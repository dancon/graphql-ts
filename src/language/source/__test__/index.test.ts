/**
 * @fileoverview
 * @author john.hou | 870301137@qq.com
 * @version 1.0.0 | 2020-01-15 | john.hou      // initial version
 */

import { Source } from '../index'

describe('language/source test suite', () => {
  const gql = 'type Query{ hello: String }'
  const defaultName = 'GraphQL request'
  const defaultLocOffset = { line: 1, column: 1 }
  const fileName = 'test.grahql'
  const locationOffset = { line: 10, column: 1 }
  const source = new Source(gql)
  const fullParamSource = new Source(gql, fileName, locationOffset)

  test('Source toString should be `[object Source]`', () => {
    const stringTag = Object.prototype.toString.call(source)

    expect(stringTag).toBe('[object Source]')
  })

  test('default param test', () => {
    expect(source.body).toBe(gql)
    expect(source.name).toBe(defaultName)
    expect(source.locationOffset).toEqual(defaultLocOffset)
  })

  test('full paramed source', () => {
    expect(source.body).toBe(gql)
    expect(fullParamSource.name).toEqual(fileName)
    expect(fullParamSource.locationOffset).toEqual(locationOffset)
  })
})
