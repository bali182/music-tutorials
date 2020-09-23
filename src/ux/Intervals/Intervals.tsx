import { css } from 'emotion'
import React, { PureComponent } from 'react'
import { spacing } from '../constants'
import { range } from 'lodash'
import { IntervalButton } from './IntervalButton'

const intervalsStyle = css({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
})

const intervalButtonContainerStyle = css({
  label: 'intervalButtonContainer',
  marginBottom: spacing.xs,
})

export type IntervalsProps = {
  intervals?: number[]
  correctInterval: number
  guesses: number[]
  onGuess: (interval: number) => void
}

export class Intervals extends PureComponent<IntervalsProps> {
  private onIntervalClicked = (interval: number) => () => {
    if (this.props.guesses.indexOf(interval) < 0) {
      this.props.onGuess(interval)
    }
  }

  private renderInterval(interval: number) {
    const { intervals, correctInterval, guesses } = this.props
    return (
      <div className={intervalButtonContainerStyle} key={interval}>
        <IntervalButton
          interval={interval}
          isEnabled={intervals.indexOf(interval) >= 0}
          isError={guesses.indexOf(interval) >= 0 && interval !== correctInterval}
          isSuccess={guesses.indexOf(interval) >= 0 && interval === correctInterval}
          onClick={this.onIntervalClicked(interval)}
        />
      </div>
    )
  }
  render() {
    const { intervals } = this.props
    return <div className={intervalsStyle}>{intervals.map((semitones: number) => this.renderInterval(semitones))}</div>
  }
}
