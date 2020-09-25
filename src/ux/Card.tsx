import React, { PureComponent, ReactNode } from 'react'
import { css } from 'emotion'
import classNames from 'classnames'

const cardStyle = css({
  label: 'card',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all .4s cubic-bezier(0.175, 0.885, 0, 1)',
  background: '#fff',
  borderRadius: '12px',
})

type CardProps = {
  children: ReactNode
  className?: string
}

export class Card extends PureComponent<CardProps> {
  render() {
    const { children, className } = this.props
    return <div className={classNames(cardStyle, className)}>{children}</div>
  }
}
