/**
 * @fileoverview
 * @author john.hou | 870301137@qq.com
 * @version 1.0.0 | 2020-05-26 | john.hou      // initial version
 */

import { buildSchema } from 'graphql'

import { graphql } from '../index'

describe('graphql entrypoint', () => {
  test('graph', async () => {
    const schema = buildSchema(`
      type Query {
        hello: String
      }
    `)

    const query = `
      query {
        hello
      }
    `

    const root = {
      hello: () => `Hello, World!`
    }

    const response = await graphql(schema, query, root)

    expect(response.data?.hello).toEqual('Hello, World!')
  })
})
