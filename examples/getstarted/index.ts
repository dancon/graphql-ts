/**
 * @fileoverview
 * @author houquan | houquan@bytedance.com
 * @version 1.0.0 | 2020-01-13 | houquan      // initial version
 */

import { graphql, buildSchema } from 'graphql'

const schema = buildSchema(`
  type Query {
    hello: String
  }
`)

const root = {
  hello: () => {
    return 'Hello, GraphQL'
  }
}

graphql(schema, '{ hello }', root).then((response) => {
  console.log(response)
})
