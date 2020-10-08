import { faCogs } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { css } from 'emotion'
import React, { PureComponent } from 'react'
import { spacing } from '../ux/constants'

const containerStyle = css({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  justifyItems: 'center',
  cursor: 'pointer',
})

const labelStyle = css({
  fontSize: '1.5em',
  marginTop: spacing.l,
})

type EmptyConfigProps = {
  onClick: () => void
  label: string
}

export class EmptyConfig extends PureComponent<EmptyConfigProps> {
  render() {
    const { onClick, label } = this.props
    return (
      <div className={containerStyle} onClick={onClick}>
        <FontAwesomeIcon icon={faCogs} size="10x" />
        <div className={labelStyle}>{label}</div>
      </div>
    )
  }
}
