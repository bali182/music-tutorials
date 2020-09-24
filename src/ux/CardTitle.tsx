import React, { PureComponent, ReactNode } from 'react'
import { css } from 'emotion'
import classNames from 'classnames'

const cardTitleStyle = css({
  label: 'card-title',
  display: 'block',
  fontSize: '1.5em',
  fontWeight: 'bold',
  color: '#fff',
  opacity: 1,
  margin: '14px 14px 8px 14px',
})

type CardTitleProps = {
  children: ReactNode
  className?: string
}

export class CardTitle extends PureComponent<CardTitleProps> {
  render() {
    const { children, className } = this.props
    return <div className={classNames(cardTitleStyle, className)}>{children}</div>
  }
}
