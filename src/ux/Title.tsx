import React, { PureComponent, ReactNode } from 'react'
import { css } from 'emotion'
import classNames from 'classnames'

const titleStyle = css({
  label: 'title',
  display: 'block',
  fontSize: '1.5em',
  fontWeight: 'bold',
  opacity: 1,
})

type TitleProps = {
  children: ReactNode
  className?: string
}

export class Title extends PureComponent<TitleProps> {
  render() {
    const { children, className } = this.props
    return <div className={classNames(titleStyle, className)}>{children}</div>
  }
}
