import React, { PureComponent, ReactNode } from 'react'
import { css } from 'emotion'
import { colors } from './constants'
import classNames from 'classnames'

export type ButtonProps = {
  children: ReactNode
  disabled?: boolean
  className?: string
  onClick?: () => void
}

const buttonStyle = css({
  label: 'button',
  background: colors.gray,
  fontWeight: 'bold',
  fontSize: '16px',
  borderRadius: '28px',
  border: 'none',
  cursor: 'pointer',
  color: '#ffffff',
  padding: '16px 31px',
  textDecoration: 'none',
  outline: 'none',
  width: '100%',
  whiteSpace: 'nowrap',
  transition: 'all .4s cubic-bezier(0.175, 0.885, 0, 1)',
  borderWidth: '2px',
  borderStyle: 'solid',
  borderColor: colors.transparent,
  ':hover': {
    transform: 'scale(1.05, 1.05)',
  },
  ':focus': {
    borderColor: colors.darkGray,
  },
  ':disabled': {
    background: colors.lightGray,
    transform: 'none',
  },
})

export class Button extends PureComponent<ButtonProps> {
  render() {
    const { children, disabled, onClick, className } = this.props
    return (
      <button
        disabled={Boolean(disabled)}
        className={classNames(buttonStyle, className)}
        onClick={onClick}
        tabIndex={0}>
        {children}
      </button>
    )
  }
}
