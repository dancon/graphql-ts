/**
 * @fileoverview
 * @author john.hou | 870301137@qq.com
 * @version 1.0.0 | 2020-01-17 | john.hou      // initial version
 */

import nodejsCustomInspectSymbol from './nodejsCustomInspectSymbol'

const MAX_ARRAY_LENGTH = 10
const MAX_RECURSIVE_DEPTH = 2

export default function inspect (value: unknown): string {
  return formatValue(value, [])
}

function formatValue(value: unknown, seenValues: any[]): string {
  switch (typeof value) {
    case 'string':
      return JSON.stringify(value)
    case 'function':
      return value.name ? `[function ${value.name}]` : `[function]`
    case 'object':
      if (value === null) {
        return 'null'
      }
      return formatObjectValue(value, seenValues)
    default:
      return String(value)
  }
}

function formatObjectValue(value: Record<any, any>, previouslySeenValues: any[]) {
  if (previouslySeenValues.indexOf(value) !== -1) {
    return `[Circular]`
  }

  const seenValues = [ ...previouslySeenValues, value ]
  const customInspectFn = getCustomFn(value)

  if (customInspectFn !== undefined) {
    const customValue = customInspectFn.call(value)

    if (customValue !== value) {
      return typeof customValue === 'string'
        ? customValue
        : formatValue(customValue, seenValues)
    }
  } else if (Array.isArray(value)) {
    return formatArray(value, seenValues)
  }

  return formatObject(value, seenValues)
}

function formatObject (obj: Record<any, any>, seenValues: any[]) {
  const keys = Object.keys(obj)
  if (keys.length === 0) {
    return '{}'
  }

  if (seenValues.length > MAX_RECURSIVE_DEPTH) {
    return `[${getObjectTag(obj)}]`
  }

  const properties = keys.map((key) => {
    const value = formatValue(obj[key], seenValues)
    return `${key}: ${value}`
  })

  return `{${properties.join(', ')}}`
}

function formatArray (arr: any[], seenValues: any[]) {
  if (arr.length === 0) {
    return '[]'
  }

  if (seenValues.length > MAX_RECURSIVE_DEPTH) {
    return '[Array]'
  }

  const len = Math.min(MAX_ARRAY_LENGTH, arr.length)
  const remaining = arr.length - len
  const items = []

  for (let i = 0; i < len; i ++) {
    items.push(formatValue(arr[i], seenValues))
  }

  if (remaining === 1) {
    items.push('... 1 more item')
  } else if (remaining > 1) {
    items.push(`... ${remaining} more items`)
  }

  return `[${items.join(', ')}]`
}

// 用来获取用户自定义的 inspect fn
function getCustomFn (obj: Record<any, any>) {
  // TODO: 思考：这么做是否是为了考虑 undefined 的情况，必定 defineToJSON 会定义 inspact 和 nodeCustomInspectSymbo 两个
  const customInspectFn = obj[String(nodejsCustomInspectSymbol)]

  if (typeof customInspectFn === 'function') {
    return customInspectFn
  }

  if (typeof obj.inspect === 'function') {
    return obj.inspect
  }
}

function getObjectTag (obj: Record<any, any>) {
  const tag = Object.prototype.toString.call(obj).replace(/^\[object /, '').replace(/]$/, '')

  if (tag === 'Object' && typeof obj.constructor === 'function') {
    const name = obj.constructor.name
    if (typeof name === 'string' && name !== '') {
      return name
    }
  }

  return tag
}
