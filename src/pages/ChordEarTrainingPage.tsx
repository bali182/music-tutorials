import { faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { css } from 'emotion'
import { sample } from 'lodash'
import React, { Fragment, PureComponent } from 'react'
import { PolySynth, Sequence, start, Transport } from 'tone'
import { createDefaultSynth } from '../audio/defaultSynth'
import { createRandomChord, playSequence } from '../audio/sequence'
import { Button, ButtonKind } from '../ux/Button'
import { Content, ContentDirection } from '../ux/Content'
import { ChordsEarTraining } from '../ux/ChordEarTraining/ChordsEarTraining'
import { ChordType } from '../ux/ChordEarTraining/ChordType'
import { spacing } from '../ux/constants'
import { TextBlock } from '../ux/TextBlock'
import { UnorderedList } from '../ux/UnorderedList'

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
      <Fragment>
        <Content direction={ContentDirection.Vertical}>
          <TextBlock>
            <UnorderedList>
              <li>Listen to the chord, and pick the correct one from below!</li>
              <li>Try playing it on your instrument!</li>
              <li>Try humming/singing along!</li>
            </UnorderedList>
          </TextBlock>
        </Content>
        <Content direction={ContentDirection.Vertical}>
          <div className={intervalContainerStyle}>
            <ChordsEarTraining
              correctChordType={chordType}
              chordTypes={chordTypes}
              guesses={guesses}
              onGuess={this.onGuess}
            />
          </div>
          <div className={buttonRowStyle}>
            <Button
              icon={faVolumeUp}
              onClick={this.playInterval}
              className={playButtonStyle}
              kind={ButtonKind.Secondary}>
              Play chord
            </Button>
            <Button
              onClick={this.onNext}
              className={nextButtonStyle}
              disabled={!correctGuess}
              kind={ButtonKind.Primary}>
              Next chord
            </Button>
          </div>
        </Content>
      </Fragment>
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
