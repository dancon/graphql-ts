/**
 * @fileoverview
 * @author john.hou | 870301137@qq.com
 * @version 1.0.0 | 2020-05-26 | john.hou      // initial version
 */

/**
 * 源码中，使用 flow 定义类型，使用 {| ... |} 这种语法定义一个明确属性的对象
 * more details: https://flow.org/en/docs/types/objects/#toc-exact-object-types
 */

import { Source, GraphQLSchema, GraphQLFieldResolver, GraphQLTypeResolver, ExecutionResult, execute, validateSchema, parse, validate } from 'graphql'

export interface GraphQLArgs {
  schema: GraphQLSchema,
  source: string | Source,
  rootValue?: unknown,
  contextValue?: unknown,
  variableValues?: Readonly<Record<string, unknown>> | null
  operationName?: string | null
  fieldResolver?: GraphQLFieldResolver<any, any> | null
  typeResolver?: GraphQLTypeResolver<any, any> | null
}

export function graphql(args: GraphQLArgs): Promise<ExecutionResult>
export function graphql(
  schema: GraphQLSchema,
  source: string | Source,
  rootValue?: unknown,
  contextValue?: unknown,
  variableValues?: Readonly<Record<string, unknown>> | null,
  operationName?: string | null,
  fieldResolver?: GraphQLFieldResolver<any, any> | null,
  typeResolver?: GraphQLTypeResolver<any, any> | null
): Promise<ExecutionResult>
export function graphql(
  schemaOrArgs: any,
  source?: any,
  rootValue?: any,
  contextValue?: any,
  variableValues?: any,
  operationName?: any,
  fieldResolver?: any,
  typeResolver?: any
): any {
  return new Promise((resolve) => {
    resolve(arguments.length === 1
      ? graphqlImpl(schemaOrArgs as GraphQLArgs) as Promise<ExecutionResult>
      : graphqlImpl({
        schema: schemaOrArgs as GraphQLSchema,
        source,
        rootValue,
        contextValue,
        variableValues,
        operationName,
        fieldResolver,
        typeResolver
      }) as Promise<ExecutionResult>)
  })
}

function graphqlImpl(args: GraphQLArgs): PromiseOrValue<ExecutionResult> {
  const {
    schema,
    source,
    rootValue,
    contextValue,
    variableValues,
    operationName,
    fieldResolver,
    typeResolver
  } = args

  // 校验 schema
  const schemaValidationErrors = validateSchema(schema)
  if (schemaValidationErrors.length > 0) {
    return {
      errors: schemaValidationErrors
    }
  }

  // parse
  let document
  try {
    document = parse(source)
  } catch(syntaxError) {
    return {
      errors: [ syntaxError ]
    }
  }

  // 再次校验
  const validationErrors = validate(schema, document)
  if (validationErrors.length > 0) {
    return {
      errors: validationErrors
    }
  }

  return execute({
    schema,
    document,
    rootValue,
    contextValue,
    variableValues,
    operationName,
    fieldResolver,
    typeResolver
  })
}
