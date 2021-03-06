/**
 * @fileoverview
 * @author john.hou | 870301137@qq.com
 * @version 1.0.0 | 2020-01-15 | john.hou      // initial version
 */

type Class<T = {}> = new (...args: any[]) => T

type PromiseOrValue<T> = Promise<T> | T
