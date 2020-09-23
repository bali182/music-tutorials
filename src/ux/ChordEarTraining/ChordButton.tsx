import { css, cx } from 'emotion'
import React, { PureComponent } from 'react'
import { colors, shadow, spacing, transition } from '../constants'
import { ChordType } from './ChordType'
import { getChordIntervalName } from './getChordIntervalName'
import { getChordIntervals } from './getChordIntervals'
import { getChordName } from './getChordName'

const successStyle = css({
  backgroundColor: colors.green,
})

const errorStyle = css({
  backgroundColor: colors.red,
})

const chordButtonStyle = (active: boolean) =>
  css({
    label: 'chordButton',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: spacing.l,
    overflow: 'hidden',
    transition: transition.default,
    boxShadow: shadow.small,
    cursor: active ? 'pointer' : 'not-allowed !important',
    ':hover': {
      transform: active ? 'scale(1.05, 1.05)' : 'none',
      boxShadow: shadow.default,
    },
  })

const intervalContainerStyle = css({
  flexGrow: 3,
  flexShrink: 1,
  flexBasis: '1px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyItems: 'center',
  marginRight: spacing.xxs,
})

const intervalStyle = (interval: number) =>
  css({
    flexGrow: interval,
    flexShrink: 1,
    flexBasis: '1px',
    backgroundColor: colors.blue,
    borderRadius: spacing.m,
    paddingLeft: spacing.s,
    paddingRight: spacing.s,
    paddingTop: spacing.xs,
    paddingBottom: spacing.xs,
    color: colors.white,
    fontWeight: 'bold',
  })

const chordLabelStyle = (active: boolean) =>
  css({
    label: 'chordButton-label',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '1px',
    padding: spacing.s,
    fontWeight: 'bold',
    color: active ? 'inherit' : colors.gray,
  })

export type ChordButtonProps = {
  chordType: ChordType
  isEnabled: boolean
  isError: boolean
  isSuccess: boolean
  onClick: () => void
}

export class ChordButton extends PureComponent<ChordButtonProps> {
  render() {
    const { isEnabled, onClick, chordType, isSuccess, isError } = this.props
    const intervals = getChordIntervals(chordType)
    const buttonStyle = cx(chordButtonStyle(isEnabled), isSuccess ? successStyle : null, isError ? errorStyle : null)
    return (
      <div className={buttonStyle} onClick={isEnabled ? onClick : null}>
        <div className={chordLabelStyle(isEnabled)}>{getChordName(chordType)} chord</div>
        <div className={intervalContainerStyle}>
          {intervals.map((interval, idx) => (
            <div key={idx} className={intervalStyle(interval)}>
              {getChordIntervalName(interval)}
            </div>
          ))}
        </div>
      </div>
    )
  }
}
