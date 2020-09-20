import React, { PureComponent, ReactNode } from 'react'
import { css } from 'emotion'
import { colors, spacing, shadow } from './constants'

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
  borderRightWidth: '1px',
  borderRightStyle: 'solid',
  width: '250px',
  height: '100vh !important',
  overflowY: 'auto',
})

export class SidePanel extends PureComponent<SidePanelProps, SidePanelState> {
  render() {
    const { children } = this.props
    return <div className={sidePanelStyle}>{children}</div>
  }
}
