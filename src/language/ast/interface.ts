/**
 * @fileoverview
 * @author john.hou | 870301137@qq.com
 * @version 1.0.0 | 2020-01-15 | john.hou      // initial version
 */

import { Location } from 'graphql'

export interface DocumentNode {
  readonly kink: 'Document'
  readonly loc?: Location
}

export interface NameNode {
  readonly kind: 'Name'
  readonly loc?: Location
  readonly value: string
}
