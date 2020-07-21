/**
 * @fileoverview
 * @author john.hou | 870301137@qq.com
 * @version 1.0.0 | 2020-07-15 | john.hou      // initial version
 */

import { Parser } from '..'

describe('parser', () => {
  test('parser.parseDocument', () => {
    const schemaSource = `
      type Query {
        hello: String
      }
    `

    const parser = new Parser(schemaSource)
    parser.parseDocument()

    expect(parser instanceof Parser).toBeTruthy()
  })

  test('parseOperationDefinition', () => {
    const query = `
      {
        hello
      }
    `
    const parser = new Parser(query)
    parser.parseOperationDefinition()
  })

  test('parseOperationType', () => {
    const query = `
      query {
        hello
      }
    `
    const parser = new Parser(query)
    parser.move()
    const optype = parser.parseOperationType()

    expect(optype).toEqual('query')
  })

  test('parseOperationName', () => {
    const queryWithName = `
      query helloName {
        hello
      }
    `

    const parser = new Parser(queryWithName)
    parser.move()
    parser.move()
    const optName = parser.parseName()

    expect(optName.value).toEqual('helloName')
  })
})

test('parseVariableDefinitions', () => {

})
