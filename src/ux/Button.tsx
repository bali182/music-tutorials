import React, { PureComponent, ReactNode } from 'react'
import { css } from 'emotion'
import { colors, transition } from './constants'
import classNames from 'classnames'

export enum ButtonKind {
  Primary = 'Primary',
  Secondary = 'Secondary',
}

export type ButtonProps = {
  children: ReactNode
  disabled?: boolean
  className?: string
  kind?: ButtonKind
  onClick?: () => void
}

const buttonStyle = (kind: ButtonKind) =>
  css({
    label: 'button',
    background: kind === ButtonKind.Primary ? colors.blue : colors.gray,
    fontWeight: 'bold',
    fontSize: '1em',
    borderRadius: '28px',
    border: 'none',
    cursor: 'pointer',
    padding: '16px 31px',
    textDecoration: 'none',
    outline: 'none',
    width: '100%',
    whiteSpace: 'nowrap',
    transition: transition.default,
    borderWidth: '2px',
    borderStyle: 'solid',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    borderColor: colors.transparent,
    ':hover': {
      transform: 'scale(1.05, 1.05)',
    },
    ':focus': {
      borderColor: kind === ButtonKind.Primary ? colors.darkBlue : colors.darkGray,
    },
    ':disabled': {
      background: colors.lightGray,
      transform: 'none',
    },
    '*': {
      color: '#ffffff',
    },
  })

export class Button extends PureComponent<ButtonProps> {
  render() {
    const { children, disabled, onClick, className, kind } = this.props
    return (
      <button
        disabled={Boolean(disabled)}
        className={classNames(buttonStyle(kind), className)}
        onClick={onClick}
        tabIndex={0}>
        {children}
      </button>
    )
  }

  static defaultProps: Partial<ButtonProps> = {
    kind: ButtonKind.Secondary,
  }
}
