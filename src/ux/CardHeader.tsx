import React, { PureComponent, ReactNode } from 'react'
import { css } from 'emotion'
import { colors } from './constants'

const cardHeaderStyle = css({
  label: 'card-header',
  width: '100%',
  color: '#fff',
  height: '80px',
  display: 'flex',
  flexShrink: 0,
  flexDirection: 'column',
  justifyContent: 'center',
  borderBottomColor: colors.lightGray,
  borderBottomStyle: 'solid',
  borderBottomWidth: '1px',
})

type CardHeaderProps = {
  children: ReactNode
}

export class CardHeader extends PureComponent<CardHeaderProps> {
  render() {
    const { children } = this.props
    return <div className={cardHeaderStyle}>{children}</div>
  }
}
