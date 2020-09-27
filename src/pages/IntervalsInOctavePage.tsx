import React, { PureComponent } from 'react'
import { range } from 'lodash'
import { PolySynth, Sequence, start, Transport } from 'tone'
import { Card } from '../ux/Card'
import { CardContent, ContentDirection } from '../ux/CardContent'
import { CardHeader } from '../ux/CardHeader'
import { CardTitle } from '../ux/CardTitle'
import { Intervals } from '../ux/Intervals/Intervals'
import { createDefaultSynth } from '../audio/defaultSynth'
import { createInterval, playSequence } from '../audio/sequence'

export class IntervalsInOctavePage extends PureComponent {
  private synth: PolySynth = createDefaultSynth()
  private sequence: Sequence = null

  private playInterval = (interval: number) => {
    if (this.sequence !== null) {
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

  render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Intervals in an octave</CardTitle>
        </CardHeader>
        <CardContent direction={ContentDirection.Vertical}>
          <Intervals
            intervals={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
            onGuess={this.playInterval}
            correctInterval={null}
            guesses={[]}
          />
        </CardContent>
      </Card>
    )
  }
}
