export type PromiseOrValue<T = any> = Promise<T> | T

export function isPromise(value: PromiseOrValue): boolean {
  return value != null && typeof value.then === 'function'
}
