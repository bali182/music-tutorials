import React, { PureComponent, ReactNode } from 'react'
import { css } from 'emotion'
import { spacing } from './constants'

export enum ContentDirection {
  Horizontal = 'Horizontal',
  Vertical = 'Vertical',
}

const cardContentStyle = (direction: ContentDirection) =>
  css({
    label: 'card-content',
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

type CardContentProps = {
  children: ReactNode
  direction: ContentDirection
}

export class CardContent extends PureComponent<CardContentProps> {
  render() {
    const { children, direction } = this.props
    return <div className={cardContentStyle(direction)}>{children}</div>
  }
}
