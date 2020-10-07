import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { css } from 'emotion'
import React, { Component, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { colors, shadow, spacing, transition } from './constants'

export const DefaultDomId = 'dialog-root'

const dialogHostStyle = (open: boolean) =>
  css({
    backgroundColor: `rgba(0,0,0,${open ? 0.5 : 0})`,
    pointerEvents: open ? 'all' : 'none',
    position: 'fixed',
    top: '0px',
    left: '0px',
    width: '100vw',
    height: '100vh',
    transition: transition.default,
  })

const dialogStyle = css({
  backgroundColor: colors.white,
  borderRadius: spacing.s,
  padding: spacing.l,
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '600px',
  maxWidth: '100%',
  boxShadow: shadow.default,
})
const dialogHeaderStyle = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  alignContent: 'center',
  justifyItems: 'center',
})
const dialogTitleStyle = css({
  fontWeight: 'bold',
  fontSize: '1.5em',
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: '1px',
})
const dialogContentStyle = css({})

const closeIconStyle = css({
  cursor: 'pointer',
})

type DialogProps = {
  children: ReactNode
  title: string
  open: boolean
  targetDomId?: string
  onClose: () => void
}

export class Dialog extends Component<DialogProps> {
  private renderContent() {
    const { title, children, onClose } = this.props
    return (
      <div className={dialogStyle}>
        <div className={dialogHeaderStyle}>
          <h1 className={dialogTitleStyle}>{title}</h1>
          <FontAwesomeIcon icon={faTimes} onClick={onClose} className={closeIconStyle} />
        </div>
        <div className={dialogContentStyle}>{children}</div>
      </div>
    )
  }

  render() {
    const { open } = this.props
    return createPortal(
      <div className={dialogHostStyle(open)}>{open ? this.renderContent() : null}</div>,
      document.getElementById(DefaultDomId)
    )
  }

  static defaultProps: Partial<DialogProps> = {
    targetDomId: DefaultDomId,
  }
}
