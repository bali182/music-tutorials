import { faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { css } from 'emotion'
import { sample } from 'lodash'
import React, { PureComponent } from 'react'
import { PolySynth, Sequence, start, Transport } from 'tone'
import { createDefaultSynth } from '../audio/defaultSynth'
import { createRandomChord, playSequence } from '../audio/sequence'
import { Button, ButtonKind } from '../ux/Button'
import { Card } from '../ux/Card'
import { CardContent, ContentDirection } from '../ux/CardContent'
import { CardHeader } from '../ux/CardHeader'
import { CardTitle } from '../ux/CardTitle'
import { ChordsEarTraining } from '../ux/ChordEarTraining/ChordsEarTraining'
import { ChordType } from '../ux/ChordEarTraining/ChordType'
import { colors, spacing } from '../ux/constants'

type ChordEarTrainingPageProps = {
  chordTypes: ChordType[]
}

type ChordEarTrainingPageState = {
  sequence: Sequence
  chordType: ChordType
  guesses: ChordType[]
}

const intervalContainerStyle = css({
  marginBottom: spacing.l,
  width: '100%',
})

const tutorialStyle = css({
  listStyleType: 'disc',
  width: '100%',
  padding: spacing.s,
  paddingLeft: spacing.l,
})

const buttonRowStyle = css({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
})

const playButtonStyle = css({
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: '1px',
  marginRight: spacing.s,
})

const nextButtonStyle = css({
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: '1px',
})

const playButtonLabelStyle = css({
  marginLeft: spacing.s,
})

export class ChordEarTrainingPage extends PureComponent<ChordEarTrainingPageProps, ChordEarTrainingPageState> {
  private synth: PolySynth = createDefaultSynth()
  state: ChordEarTrainingPageState = this.getNextState()

  private playInterval = () => playSequence(this.state.sequence)

  private onGuess = (interval: ChordType) => {
    this.setState({ guesses: this.state.guesses.concat([interval]) })
  }

  private onNext = () => {
    this.state.sequence.stop()
    this.state.sequence.dispose()
    this.setState(this.getNextState())
  }

  componentDidMount() {
    start()
    Transport.start()
    Transport.bpm.value = 30
  }

  componentWillUnmount() {
    this.state.sequence.stop()
    this.state.sequence.dispose()
  }

  render() {
    const { guesses, chordType } = this.state
    const { chordTypes } = this.props
    const correctGuess = guesses.indexOf(chordType) >= 0
    return (
      <Card>
        <CardHeader color={colors.blue}>
          <CardTitle>Chords</CardTitle>
        </CardHeader>
        <CardContent direction={ContentDirection.Vertical}>
          <ul className={tutorialStyle}>
            <li>Listen to the chord, and pick the correct one from below!</li>
            <li>Try playing it on your instrument!</li>
            <li>Try humming/singing along!</li>
          </ul>
        </CardContent>
        <CardContent direction={ContentDirection.Vertical}>
          <div className={intervalContainerStyle}>
            <ChordsEarTraining
              correctChordType={chordType}
              chordTypes={chordTypes}
              guesses={guesses}
              onGuess={this.onGuess}
            />
          </div>
          <div className={buttonRowStyle}>
            <Button onClick={this.playInterval} className={playButtonStyle} kind={ButtonKind.Secondary}>
              <FontAwesomeIcon icon={faVolumeUp} />
              <span className={playButtonLabelStyle}>Play chord</span>
            </Button>
            <Button
              onClick={this.onNext}
              className={nextButtonStyle}
              disabled={!correctGuess}
              kind={ButtonKind.Primary}>
              <span className={playButtonLabelStyle}>Next chord</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  private getNextState(): ChordEarTrainingPageState {
    const chordType = sample(this.props.chordTypes)
    return {
      chordType,
      guesses: [],
      sequence: createRandomChord(chordType, false)(this.synth),
    }
  }
}
