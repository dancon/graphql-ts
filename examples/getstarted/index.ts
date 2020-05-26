/**
 * @fileoverview
 * @author john.hou | 870301137@qq.com
 * @version 1.0.0 | 2020-01-13 | john.hou      // initial version
 */

import { graphql, buildSchema } from 'graphql'

const schema = buildSchema(`
  type Query {
    hello: String
    person: Person!
  }

  """ human type """
  type Person {
    name: String!
    age: Int!
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
