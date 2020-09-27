import { faArrowsAltH } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { css } from 'emotion'
import React, { PureComponent } from 'react'
import { colors, shadow, spacing, transition } from '../constants'
import { getIntervalName } from './getIntervalName'

type IntervalWithInverseButtonProps = {
  interval: number
  onClick: (interval: number, inverse: boolean) => void
}

const intervalButtonStyle = css({
  label: 'intervalButton',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  backgroundColor: colors.white,
  borderRadius: spacing.l,
  boxShadow: shadow.small,
  zIndex: 2,
})

const intervalNameStyle = (interval: number, isInverse: boolean) => {
  return css({
    label: 'intervalButton-name',
    backgroundColor: isInverse ? colors.orange : colors.blue,
    flex: interval,
    padding: spacing.s,
    color: colors.white,
    fontWeight: 'bold',
    borderRadius: spacing.l,
    textAlign: isInverse ? 'right' : 'left',
    transition: transition.default,
    cursor: 'pointer',
    ':first-of-type': {
      marginRight: spacing.xs,
    },
    ':last-of-type': {
      marginLeft: spacing.xs,
    },
    ':hover': {
      transform: 'scale(1.03)',
    },
  })
}

export class IntervalWithInverseButton extends PureComponent<IntervalWithInverseButtonProps> {
  private onClick = () => {
    const { interval, onClick } = this.props
    onClick(interval, false)
  }

  private onInverseClick = () => {
    const { interval, onClick } = this.props
    onClick(12 - interval, true)
  }

  render() {
    const { interval } = this.props
    return (
      <div className={intervalButtonStyle}>
        <div className={intervalNameStyle(interval, false)} onClick={this.onClick}>
          {getIntervalName(interval)}
        </div>
        <FontAwesomeIcon icon={faArrowsAltH} />
        <div className={intervalNameStyle(12 - interval, true)} onClick={this.onInverseClick}>
          {getIntervalName(12 - interval)}
        </div>
      </div>
    )
  }
}
