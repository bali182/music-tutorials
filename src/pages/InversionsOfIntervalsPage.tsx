import { isNil } from 'lodash'
import React, { PureComponent } from 'react'
import { PolySynth, Sequence, start, Transport } from 'tone'
import { createDefaultSynth } from '../audio/defaultSynth'
import { createInterval, createReverseInterval, playSequence } from '../audio/sequence'
import { Card } from '../ux/Card'
import { CardContent, ContentDirection } from '../ux/CardContent'
import { CardHeader } from '../ux/CardHeader'
import { CardTitle } from '../ux/CardTitle'
import { IntervalsWithInverse } from '../ux/Intervals/IntervalsWithInverse'

export class InversionsOfIntervalsPage extends PureComponent {
  private synth: PolySynth = createDefaultSynth()
  private sequence: Sequence = null

  private playInterval = (interval: number, isInverse: boolean) => {
    if (!isNil(this.sequence)) {
      this.sequence.stop()
      this.sequence.dispose()
    }
    this.sequence = isInverse
      ? createReverseInterval('c5', interval)(this.synth)
      : createInterval('c4', interval)(this.synth)
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
      <Card>
        <CardContent direction={ContentDirection.Vertical}>
          <IntervalsWithInverse
            intervals={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
            onIntervalClicked={this.playInterval}
          />
        </CardContent>
      </Card>
    )
  }
}
