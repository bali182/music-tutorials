import { css } from 'emotion'
import React, { PureComponent } from 'react'
import { spacing } from '../constants'
import { IntervalWithInverseButton } from './IntervalWithInverseButton'

const intervalsStyle = css({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
})

const intervalButtonContainerStyle = css({
  label: 'intervalButtonContainer',
  marginBottom: spacing.xs,
})

export type IntervalsWithInverseProps = {
  intervals?: number[]
  onIntervalClicked: (interval: number, isInverse: boolean) => void
}

export class IntervalsWithInverse extends PureComponent<IntervalsWithInverseProps> {
  private renderInterval(interval: number) {
    return (
      <div className={intervalButtonContainerStyle} key={interval}>
        <IntervalWithInverseButton interval={interval} onClick={this.props.onIntervalClicked} />
      </div>
    )
  }
  render() {
    const { intervals } = this.props
    return <div className={intervalsStyle}>{intervals.map((semitones: number) => this.renderInterval(semitones))}</div>
  }
}
