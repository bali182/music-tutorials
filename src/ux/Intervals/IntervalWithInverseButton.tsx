import { faArrowsAltH } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { css, cx } from 'emotion'
import React, { PureComponent } from 'react'
import { colors, shadow, spacing, transition } from '../constants'
import { getIntervalName } from './getIntervalName'

type IntervalWithInverseButtonProps = {
  interval: number
}

const intervalButtonStyle = css({
  label: 'intervalButton',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  backgroundColor: colors.white,
  borderRadius: spacing.l,
  overflow: 'hidden',
  transition: transition.default,
  boxShadow: shadow.small,
  ':hover': {
    transform: 'scale(1.03, 1.03)',
    boxShadow: shadow.default,
  },
  zIndex: 2,
})

const intervalNameStyle = (interval: number, isInverse: boolean) =>
  css({
    label: 'intervalButton-name',
    backgroundColor: isInverse ? colors.orange : colors.blue,
    flex: interval,
    padding: spacing.s,
    color: colors.white,
    fontWeight: 'bold',
    borderRadius: spacing.l,
    textAlign: isInverse ? 'right' : 'left',
    ':first-of-type': {
      marginRight: spacing.xs,
    },
    ':last-of-type': {
      marginLeft: spacing.xs,
    },
  })

export class IntervalWithInverseButton extends PureComponent<IntervalWithInverseButtonProps> {
  render() {
    const { interval } = this.props
    return (
      <div className={intervalButtonStyle}>
        <div className={intervalNameStyle(interval, false)}>{getIntervalName(interval)}</div>
        <FontAwesomeIcon icon={faArrowsAltH} />
        <div className={intervalNameStyle(12 - interval, true)}>{getIntervalName(12 - interval)}</div>
      </div>
    )
  }
}
