import React, { PureComponent, ReactNode } from 'react'
import { css } from 'emotion'
import { colors, spacing, transition } from './constants'
import classNames from 'classnames'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { isNil } from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export enum ButtonKind {
  Primary = 'Primary',
  Secondary = 'Secondary',
}

export type ButtonProps = {
  children: ReactNode
  disabled?: boolean
  className?: string
  kind?: ButtonKind
  grow?: boolean
  icon?: IconDefinition
  onClick?: () => void
}

const buttonStyle = (kind: ButtonKind, grow: boolean) =>
  css({
    label: 'button',
    background: kind === ButtonKind.Primary ? colors.blue : colors.gray,
    fontWeight: 'bold',
    fontSize: '1em',
    borderRadius: '28px',
    border: 'none',
    cursor: 'pointer',
    padding: '8px 31px',
    textDecoration: 'none',
    outline: 'none',
    width: grow ? '100%' : 'auto',
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
    color: colors.white,
    ':hover': {
      transform: 'scale(1.05, 1.05)',
    },
    ':focus': {
      borderColor: kind === ButtonKind.Primary ? colors.lightBlue : colors.darkGray,
    },
    ':disabled': {
      background: colors.lightGray,
      transform: 'none',
    },
    '*': {
      color: colors.white,
    },
  })

const iconStyle = css({
  marginRight: spacing.s,
})

export class Button extends PureComponent<ButtonProps> {
  private renderIcon() {
    const { icon } = this.props
    if (!isNil(icon)) {
      return <FontAwesomeIcon icon={icon} className={iconStyle} />
    }
    return null
  }
  render() {
    const { children, disabled, onClick, className, kind, grow } = this.props
    return (
      <button
        disabled={Boolean(disabled)}
        className={classNames(buttonStyle(kind, grow), className)}
        onClick={onClick}
        tabIndex={0}>
        {this.renderIcon()}
        {children}
      </button>
    )
  }

  static defaultProps: Partial<ButtonProps> = {
    kind: ButtonKind.Secondary,
    grow: true,
  }
}
