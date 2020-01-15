/**
 * @fileoverview
 * @author john.hou | 870301137@qq.com
 * @version 1.0.0 | 2020-01-15 | john.hou      // initial version
 */

// 用来定义在 graphql 在 Node.js 环境下运行时用来调试打印时自定义的输出，more details: https://nodejs.org/dist/latest-v12.x/docs/api/util.html#util_util_inspect_custom
const nodejsCustomInspectSymbol = typeof Symbol === 'function' && typeof Symbol.for === 'function' ? Symbol.for('nodejs.util.inspect.custom') : undefined

export default nodejsCustomInspectSymbol
