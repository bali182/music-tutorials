import React, { PureComponent, ReactNode } from 'react'
import { css } from 'emotion'
import { spacing } from './constants'

type TreeProps = {
  children: ReactNode
}

const treeStyle = css({
  label: 'tree',
  padding: spacing.m,
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
})

export class Tree extends PureComponent<TreeProps> {
  render() {
    const { children } = this.props
    return <div className={treeStyle}>{children}</div>
  }
}
