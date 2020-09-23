import React, { PureComponent, ReactNode } from 'react'
import { css } from 'emotion'

export enum ContentDirection {
  Horizontal = 'Horizontal',
  Vertical = 'Vertical',
}

const cardContentStyle = (direction: ContentDirection) =>
  css({
    label: 'card-content',
    margin: '18px 14px 0px 14px',
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
