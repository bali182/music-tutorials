import { faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { css } from 'emotion'
import { sample } from 'lodash'
import React, { Fragment, PureComponent } from 'react'
import { PolySynth, Sequence, start, Transport } from 'tone'
import { createDefaultSynth } from '../audio/defaultSynth'
import { createRandomInterval, playSequence } from '../audio/sequence'
import { Button, ButtonKind } from '../ux/Button'
import { Content, ContentDirection } from '../ux/Content'
import { spacing } from '../ux/constants'
import { Intervals } from '../ux/Intervals/Intervals'
import { TextBlock } from '../ux/TextBlock'
import { UnorderedList } from '../ux/UnorderedList'

type IntervalEarTrainingPageProps = {
  intervals: number[]
}

type IntervalEarTrainingPageState = {
  sequence: Sequence
  interval: number
  guesses: number[]
}

const intervalContainerStyle = css({
  width: '100%',
  marginBottom: spacing.l,
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

export class IntervalEarTrainingPage extends PureComponent<IntervalEarTrainingPageProps, IntervalEarTrainingPageState> {
  private synth: PolySynth = createDefaultSynth()
  state: IntervalEarTrainingPageState = this.getNextState()

  private playInterval = () => playSequence(this.state.sequence)

  private onGuess = (interval: number) => {
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
    const { guesses, interval } = this.state
    const { intervals } = this.props
    const correctGuess = guesses.indexOf(interval) >= 0
    return (
      <Fragment>
        <Content direction={ContentDirection.Vertical}>
          <TextBlock>
            <UnorderedList>
              <li>Listen to the interval, and pick the correct one from below!</li>
              <li>Try playing it on your instrument!</li>
              <li>Try humming/singing along!</li>
            </UnorderedList>
          </TextBlock>
        </Content>
        <Content direction={ContentDirection.Vertical}>
          <div className={intervalContainerStyle}>
            <Intervals correctInterval={interval} intervals={intervals} guesses={guesses} onGuess={this.onGuess} />
          </div>
          <div className={buttonRowStyle}>
            <Button onClick={this.playInterval} className={playButtonStyle} kind={ButtonKind.Secondary}>
              <FontAwesomeIcon icon={faVolumeUp} />
              <span className={playButtonLabelStyle}>Play interval</span>
            </Button>
            <Button
              onClick={this.onNext}
              className={nextButtonStyle}
              disabled={!correctGuess}
              kind={ButtonKind.Primary}>
              <span className={playButtonLabelStyle}>Next interval</span>
            </Button>
          </div>
        </Content>
      </Fragment>
    )
  }

  private getNextState(): IntervalEarTrainingPageState {
    const interval = sample(this.props.intervals)
    return {
      interval,
      guesses: [],
      sequence: createRandomInterval(interval)(this.synth),
    }
  }
}
