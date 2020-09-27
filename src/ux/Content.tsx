import React, { PureComponent, ReactNode } from 'react'
import { css } from 'emotion'
import { spacing } from './constants'

export enum ContentDirection {
  Horizontal = 'Horizontal',
  Vertical = 'Vertical',
}

const contentStyle = (direction: ContentDirection) =>
  css({
    label: 'content',
    margin: spacing.l,
    display: 'flex',
    flexDirection: direction === ContentDirection.Vertical ? 'column' : 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    justifyItems: 'center',
    flexShrink: 0,
    ':last-child': {
      marginBottom: '18px',
    },
  })

type ContentProps = {
  children: ReactNode
  direction: ContentDirection
}

export class Content extends PureComponent<ContentProps> {
  render() {
    const { children, direction } = this.props
    return <div className={contentStyle(direction)}>{children}</div>
  }
}
