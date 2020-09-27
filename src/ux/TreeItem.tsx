import React, { Fragment, PureComponent, ReactNode } from 'react'
import { css } from 'emotion'
import { colors, spacing, transition } from './constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons'

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

const iconStyle = ({ isActive }: TreeItemProps) =>
  css({
    label: 'treeItem-icon',
    marginRight: spacing.xs,
    path: {
      color: isActive ? colors.white : 'inherit',
    },
  })

const labelStyle = ({ isActive, isParent }: TreeItemProps) =>
  css({
    display: 'inline-block',
    label: 'treeItem-label',
    fontWeight: isParent ? 'bold' : 'normal',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '1px',
    color: isActive ? colors.white : 'inherit',
  })

const treeItemStyle = ({ level, isActive }: TreeItemProps) =>
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
  private onArrowClick = (e: React.MouseEvent) => {
    const { onToggle, id, isOpen, isParent } = this.props
    if (isParent) {
      e.stopPropagation()
    }
    onToggle(id, !isOpen)
  }
  private onClick = () => {
    const { onSelect, id } = this.props
    onSelect(id)
  }

  private renderIcon() {
    const { isParent, isOpen } = this.props
    if (!isParent) {
      return null
    }
    const icon = isOpen ? faChevronDown : faChevronRight
    return <FontAwesomeIcon className={iconStyle(this.props)} icon={icon} onClick={this.onArrowClick} />
  }

  private renderLabel() {
    const { label } = this.props
    return <div className={labelStyle(this.props)}>{label}</div>
  }

  private renderChildren() {
    const { children, isOpen } = this.props
    return isOpen ? children : null
  }

  render() {
    return (
      <Fragment>
        <div className={treeItemStyle(this.props)} onClick={this.onClick}>
          {this.renderLabel()}
          {this.renderIcon()}
        </div>
        {this.renderChildren()}
      </Fragment>
    )
  }
}
