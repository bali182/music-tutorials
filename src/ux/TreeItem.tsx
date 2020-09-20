import React, { Fragment, PureComponent, ReactNode } from 'react'
import { css, Interpolation } from 'emotion'
import { colors, spacing } from './constants'
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

const iconStyle = css({
  label: 'treeItem-icon',
  marginRight: spacing.xs,
})

const labelStyle = css({
  display: 'inline-block',
  label: 'treeItem-label',
})

const activeLabelStyle: Interpolation = {
  color: colors.blue,
  fontWeight: 'bold',
  textDecoration: 'underline',
}

const treeItemStyle = (level: number, isActive: boolean) =>
  css({
    label: 'treeItem',
    paddingLeft: `calc(${level} * ${spacing.m})`,
    display: 'flex',
    flexDirection: 'row',
    marginTop: spacing.s,
    marginBottom: spacing.s,
    cursor: 'pointer',
    flexShrink: 0,
    ':hover': {
      [`.${labelStyle}`]: activeLabelStyle,
    },
    ...(isActive ? { [`.${labelStyle}`]: activeLabelStyle } : {}),
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
    const { isParent, isOpen } = this.props
    const icon = !isParent ? faGuitar : isOpen ? faChevronDown : faChevronRight
    return <FontAwesomeIcon className={iconStyle} icon={icon} onClick={this.onArrowClick} />
  }

  private renderLabel() {
    const { label } = this.props
    return (
      <div className={labelStyle} onClick={this.onLabelClick}>
        {label}
      </div>
    )
  }

  private renderChildren() {
    const { children, isOpen } = this.props
    return isOpen ? children : null
  }

  render() {
    const { level, label, isActive } = this.props
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
