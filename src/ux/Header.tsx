import React, { PureComponent, ReactNode } from 'react'
import { css } from 'emotion'
import { colors, spacing } from './constants'

const headerStyle = css({
  label: 'header',
  width: '100%',
  color: '#fff',
  height: '80px',
  display: 'flex',
  flexShrink: 0,
  flexDirection: 'row',
  alignItems: 'center',
  padding: spacing.m,
  borderBottomColor: colors.lightGray,
  borderBottomStyle: 'solid',
  borderBottomWidth: '1px',
})

type HeaderProps = {
  children: ReactNode
}

export class Header extends PureComponent<HeaderProps> {
  render() {
    const { children } = this.props
    return <div className={headerStyle}>{children}</div>
  }
}
