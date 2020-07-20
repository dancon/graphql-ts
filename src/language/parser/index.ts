/**
 * @fileoverview
 * @author john.hou | 870301137@qq.com
 * @version 1.0.0 | 2020-01-13 | john.hou      // initial version
 */

import { Kind, Token, Lexer, syntaxError, DefinitionNode, Location } from 'graphql'
import { isPunctuatorTokenKind } from 'graphql/language/lexer'

import devAssert from '../../jsutils/devAssert'
import inspect from '../../jsutils/inspect'
import { TokenKind, TokenKindEnum } from '../tokenKind'

import { ParseOption, OperationTypeNode } from './interface'
import { Source } from '../source'

/**
 * 用来将 source 转化为 GraphQL Document
 * @param source
 * @param options
 */
export function parse(source: string | Source, options?: ParseOption) {
  const parser = new Parser(source, options)
  return parser.parseDocument()
}

export class Parser {
  private lexer!: Lexer
  private options?: ParseOption
  constructor(source: string | Source, options?: ParseOption) {
    const sourceObj = typeof source === 'string' ? new Source(source) : source

    devAssert(sourceObj instanceof Source, `Must provide Source. Received: ${inspect(sourceObj)}`)

    this.lexer = new Lexer(sourceObj)
    this.options = options
  }

  // TODO: 用来调试代码，之后需要删除
  move() {
    this.lexer.advance()
  }

  parseDocument () {
    return {
      kind: Kind.DOCUMENT,
      definitions: this.many(
        TokenKind.SOF,
        this.parseDefinition,
        TokenKind.EOF
      )
    }
  }

  parseDefinition() {
    if (this.peek(TokenKind.NAME)) {
      switch (this.lexer.token.value) {
        case 'query':
      }
    }


  }

  parseOperationDefinition() {
    const start = this.lexer.token

    // 在执行 this.many 的时候，会调用 this.exceptToken 将 SOF token 过滤掉
    // 如果是简写模式，则直接返回 operation type 为 query
    if (this.peek(TokenKind.BRACE_L)) {
      return {
        kind: Kind.OPERATION_DEFINITION,
        operation: 'query',
        name: undefined,  // 简写模式写，不能提供 operation name
        variableDefinitions: [],
        directives: [],
        selectionSet: this.parseSelectionSet(),
        loc: this.loc(start)
      }
    }

    const operation = this.parseOperationType()

  }

  /**
   * 用来返回 Operation Type
   * 编写 graphql query 语句的时候，我们可以使用简写模式，这时候，是可以不用指定 operation type 和 operation name 的
   * 这个方法是在 graphql query 不是简写模式，或者是其他类型的时候来调用的
   */
  parseOperationType(): OperationTypeNode {
    const operationToken = this.expectToken(TokenKind.NAME)

    switch(operationToken.value) {
      case 'query':
        return 'query'
      case 'mutation':
        return 'mutation'
      case 'subscription':
        return 'subscription'
    }

    throw this.unexpected(operationToken)
  }

  parseSelectionSet() {

  }

  loc (startToken: Token): Location | void {
    if (this.options?.noLocation !== true) {
      return new Location(startToken, this.lexer.lastToken, this.lexer.source)
    }
  }

  /**
   * 查看当前词法编译器中的下一个 token 是否为给定的类型
   * @param kind
   */
  peek(kind: TokenKindEnum) {
    return this.lexer.token.kind === kind
  }

  many<T> (
    openKind: TokenKindEnum,
    parseFn: () => T,
    closeKind: TokenKindEnum
  ): T[] {
    this.expectToken(openKind)
    const nodes: T[] = []

    do {
      nodes.push(parseFn.call(this))
    } while(!this.expectOptionalToken(closeKind))

    return nodes
  }

  /**
   * 如果词法解析器中的下个 token 是给定的类型，词法解析器游标向前一位，然后返回当前 token
   * 否则不进行任何 parser 状态的改变，抛一个语法错误
   */
  expectToken(kind: TokenKindEnum): Token {
    const token = this.lexer.token
    if (token.kind === kind) {
      this.lexer.advance()
      return token
    }

    throw syntaxError(this.lexer.source, token.start, `Expect ${getTokenKindDesc(kind)}, found ${getTokenDesc(token)}`)
  }

  /**
   * 和 expectToken 的作用一样，只不过不会抛出异常
   * @param kind
   */
  expectOptionalToken(kind: TokenKindEnum): Token | undefined {
    const token = this.lexer.token
    if (token.kind === kind) {
      this.lexer.advance()
      return token
    }

    return undefined
  }

  /**
   * 用来在收到一个预期之外的 token 的时候，抛出一个语法错误
   * @param atToken
   */
  unexpected(atToken?: Token | null) {
    const token = atToken ?? this.lexer.token

    return syntaxError(
      this.lexer.source,
      token.start,
      `Unexpected ${getTokenDesc(token)}`
    )
  }
}

/**
 * 获取 token 的字符创描述
 * @param token
 */
function getTokenDesc(token: Token) {
  const value = token.value
  // TODO: 删除 as 转换
  return `${getTokenKindDesc(token.kind as TokenKindEnum)} ${value != null ? `"${value}"` : ''}`
}

/**
 * 获取 token 类型的说明, 区分是否标点符号类型
 * @param kind
 */
function getTokenKindDesc(kind: TokenKindEnum) {
  return isPunctuatorTokenKind(kind) ? `"${kind}"` : kind
}

export * from './interface'
