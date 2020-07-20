/**
 * @fileoverview
 * @author john.hou | 870301137@qq.com
 * @version 1.0.0 | 2020-07-10 | john.hou      // initial version
 */

import Koa from 'koa'
import { ApolloServer, gql } from 'apollo-server-koa'

const typeDefs = gql`
  type Query {
    hello: Hello
  }

  type Hello {
    name: String!
    age: Int!
  }
`

interface Hello {
  name: string
  a: number
}

const resolvers = {
  Query: {
    hello() {
      return {
        name: 'hello world',
        a: 10
      }
    }
  },
  Hello: {
    age(hello: Hello) {
      return hello.a + 10
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers })
const app = new Koa()

server.applyMiddleware({ app })

app.listen(4000, () => {
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
})
