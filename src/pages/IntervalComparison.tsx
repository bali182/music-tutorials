import React, { PureComponent } from 'react'
import { PolySynth, Sequence } from 'tone'
import { createDefaultSynth } from '../audio/defaultSynth'
import { createRandomInterval, playSequence } from '../audio/sequence'
import { Button } from '../ux/Button'

type IntervalComparisonState = {
  sequence: Sequence
  name: string
}

export class IntervalComparison extends PureComponent {
  private synth: PolySynth = createDefaultSynth(4)
  private sequence: Sequence = createRandomInterval([1, 2], 'a3')(this.synth)

  private playPiano = () => {
    this.sequence.dispose()
    this.sequence = createRandomInterval([1, 2], 'a3')(this.synth)
    playSequence(this.sequence)
  }

  render() {
    return (
      <div>
        <Button onClick={this.playPiano}>Play interval</Button>
      </div>
    )
  }
}
