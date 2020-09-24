import { css, cx } from 'emotion'
import React, { PureComponent } from 'react'
import { colors, shadow, spacing, transition } from '../constants'
import { getIntervalName } from './getIntervalName'

type IntervalButtonProps = {
  interval: number
  isEnabled: boolean
  isError: boolean
  isSuccess: boolean
  onClick: () => void
}

const successStyle = css({
  backgroundColor: colors.green,
})

const errorStyle = css({
  backgroundColor: colors.red,
})

const intervalButtonStyle = (active: boolean) =>
  css({
    label: 'intervalButton',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: spacing.l,
    overflow: 'hidden',
    transition: transition.default,
    boxShadow: shadow.small,
    cursor: active ? 'pointer' : 'not-allowed !important',
    ':hover': {
      transform: active ? 'scale(1.03, 1.03)' : 'none',
      boxShadow: shadow.default,
    },
    zIndex: 2,
  })

const intervalNameStyle = (interval: number, active: boolean) =>
  css({
    label: 'intervalButton-name',
    backgroundColor: active ? colors.blue : colors.lightGray,
    flex: interval + 1,
    padding: spacing.s,
    color: active ? colors.white : colors.gray,
    fontWeight: 'bold',
    borderTopRightRadius: spacing.l,
    borderBottomRightRadius: spacing.l,
  })

const intervalLabelStyle = (interval: number, active: boolean) =>
  css({
    label: 'intervalButton-label',
    flex: 20 - interval,
    padding: spacing.s,
    textAlign: 'right',
    color: active ? 'inherit' : colors.gray,
  })

export class IntervalButton extends PureComponent<IntervalButtonProps> {
  render() {
    const { isEnabled, onClick, interval, isSuccess, isError } = this.props
    const buttonStyle = cx(intervalButtonStyle(isEnabled), isSuccess ? successStyle : null, isError ? errorStyle : null)
    return (
      <div className={buttonStyle} onClick={isEnabled ? onClick : null}>
        <div className={intervalNameStyle(interval, isEnabled)}>{getIntervalName(interval)}</div>
        <div className={intervalLabelStyle(interval, isEnabled)}>{interval} Semitones</div>
      </div>
    )
  }
}
