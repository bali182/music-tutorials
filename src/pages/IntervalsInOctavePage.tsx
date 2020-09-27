import React, { PureComponent } from 'react'
import { isNil } from 'lodash'
import { PolySynth, Sequence, start, Transport } from 'tone'
import { Content, ContentDirection } from '../ux/Content'
import { Intervals } from '../ux/Intervals/Intervals'
import { createDefaultSynth } from '../audio/defaultSynth'
import { createInterval, playSequence } from '../audio/sequence'

export class IntervalsInOctavePage extends PureComponent {
  private synth: PolySynth = createDefaultSynth()
  private sequence: Sequence = null

  private playInterval = (interval: number) => {
    if (!isNil(this.sequence)) {
      this.sequence.stop()
      this.sequence.dispose()
    }
    this.sequence = createInterval('c4', interval)(this.synth)
    playSequence(this.sequence)
  }

  componentDidMount() {
    start()
    Transport.start()
    Transport.bpm.value = 30
  }

  componentWillUnmount() {
    if (!isNil(this.sequence)) {
      this.sequence.stop()
      this.sequence.dispose()
    }
  }

  render() {
    return (
      <Content direction={ContentDirection.Vertical}>
        <Intervals
          intervals={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
          onGuess={this.playInterval}
          correctInterval={null}
          guesses={[]}
        />
      </Content>
    )
  }
}
