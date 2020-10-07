import { css } from 'emotion'
import React, { PureComponent, ReactNode } from 'react'
import { colors, spacing } from '../ux/constants'

type ConfigurationSectionProps = {
  title: string
  description: string
  children: ReactNode
}

const titleStyle = css({ fontWeight: 'bold', marginTop: spacing.s, marginBottom: spacing.xs })
const descriptionStyle = css({ color: colors.darkGray })
const contentStyle = css({ marginTop: spacing.s, marginBottom: spacing.s })

export class ConfigurationSection extends PureComponent<ConfigurationSectionProps> {
  render() {
    const { title, description, children } = this.props
    return (
      <div>
        <div className={titleStyle}>{title}</div>
        <div className={descriptionStyle}>{description}</div>
        <div className={contentStyle}>{children}</div>
      </div>
    )
  }
}
