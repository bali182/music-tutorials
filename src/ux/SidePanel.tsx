import React, { PureComponent, ReactNode } from 'react'
import { css } from 'emotion'
import { colors, spacing, shadow, gradients } from './constants'

type SidePanelProps = {
  children: ReactNode
}

type SidePanelState = {
  isOpen: boolean
}

const sidePanelStyle = css({
  label: 'sidePanel',
  background: colors.white,
  boxShadow: shadow.default,
  borderRightColor: colors.lightGray,
  borderRightStyle: 'solid',
  width: '300px',
  height: '100vh !important',
  display: 'flex',
  flexDirection: 'column',
  zIndex: 1,
})

export class SidePanel extends PureComponent<SidePanelProps, SidePanelState> {
  render() {
    const { children } = this.props
    return <div className={sidePanelStyle}>{children}</div>
  }
}
