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
  borderRightWidth: '1px',
  borderRightColor: colors.lightGray,
  borderRightStyle: 'solid',
  width: '300px',
  height: '100vh !important',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 0,
  flexShrink: 0,
})

export class SidePanel extends PureComponent<SidePanelProps, SidePanelState> {
  render() {
    const { children } = this.props
    return <div className={sidePanelStyle}>{children}</div>
  }
}
