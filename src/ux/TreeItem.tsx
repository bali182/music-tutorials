import React, { Fragment, PureComponent, ReactNode } from 'react'
import { css, Interpolation } from 'emotion'
import { colors, spacing, transition } from './constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronRight, faGuitar } from '@fortawesome/free-solid-svg-icons'

type TreeItemProps = {
  id: string
  children?: ReactNode
  label: string
  level: number
  isOpen: boolean
  isActive: boolean
  isParent: boolean
  onToggle: (id: string, isOpen: boolean) => void
  onSelect: (id: string) => void
}

const iconStyle = (isActive: boolean) =>
  css({
    label: 'treeItem-icon',
    marginRight: spacing.xs,
    path: {
      color: isActive ? colors.white : 'inherit',
    },
  })

const labelStyle = (isActive: boolean) =>
  css({
    display: 'inline-block',
    label: 'treeItem-label',
    color: isActive ? colors.white : 'inherit',
  })

const treeItemStyle = (level: number, isActive: boolean) =>
  css({
    label: 'treeItem',
    padding: spacing.s,
    marginLeft: `calc(${level} * ${spacing.m})`,
    display: 'flex',
    flexDirection: 'row',
    color: isActive ? colors.white : 'inherit',
    cursor: 'pointer',
    borderRadius: spacing.l,
    backgroundColor: isActive ? colors.blue : colors.transparent,
    transition: transition.default,
    flexShrink: 0,
    ':hover': {
      [`.${labelStyle}`]: {
        color: isActive ? colors.white : colors.blue,
        fontWeight: 'bold',
      },
    },
  })

export class TreeItem extends PureComponent<TreeItemProps> {
  private onArrowClick = () => {
    const { onToggle, id, isOpen } = this.props
    onToggle(id, !isOpen)
  }
  private onLabelClick = () => {
    const { onSelect, id } = this.props
    onSelect(id)
  }

  private renderIcon() {
    const { isParent, isOpen, isActive } = this.props
    const icon = !isParent ? faGuitar : isOpen ? faChevronDown : faChevronRight
    return <FontAwesomeIcon className={iconStyle(isActive)} icon={icon} onClick={this.onArrowClick} />
  }

  private renderLabel() {
    const { label, isActive } = this.props
    return (
      <div className={labelStyle(isActive)} onClick={this.onLabelClick}>
        {label}
      </div>
    )
  }

  private renderChildren() {
    const { children, isOpen } = this.props
    return isOpen ? children : null
  }

  render() {
    const { level, isActive } = this.props
    return (
      <Fragment>
        <div className={treeItemStyle(level, isActive)}>
          {this.renderIcon()}
          {this.renderLabel()}
        </div>
        {this.renderChildren()}
      </Fragment>
    )
  }
}
