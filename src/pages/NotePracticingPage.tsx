import { isNil, sample } from 'lodash'
import React, { PureComponent } from 'react'
import { now } from 'tone'
import { ConfigurableProps, NotesEarTrainingConfiguration } from '../configuration/configurationTypes'
import { css, keyframes } from 'emotion'
import { colors, shadow, spacing } from '../ux/constants'
import { Transition } from 'react-spring/renderprops'
import { config } from 'react-spring'
import { Button, ButtonKind } from '../ux/Button'
import { faForward, faPause, faPlay } from '@fortawesome/free-solid-svg-icons'
import { createDefaultSynth } from '../audio/defaultSynth'
import { Content, ContentDirection } from '../ux/Content'
import { TextBlock } from '../ux/TextBlock'
import { UnorderedList } from '../ux/UnorderedList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const growAnimation = keyframes`
0% {
  width: 1%;
}
98% {
  width: 100%;
}`

const buttonStyle = css({
  marginRight: spacing.s,
})

const cardContainerStyle = css({
  marginTop: spacing.l,
  marginBottom: spacing.l,
  position: 'relative',
  width: '100%',
  height: '200px',
})

const cardStyle = css({
  width: '200px',
  height: '200px',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  borderRadius: spacing.m,
  boxShadow: shadow.default,
  color: colors.blue,
  fontSize: '4em',
  fontWeight: 'bold',
  transformOrigin: 'center',
  position: 'absolute',
  top: '0px',
  left: 'calc(50% - 100px)',
})

const cardContentStyle = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  alignContent: 'center',
  justifyContent: 'center',
  justifyItems: 'center',
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: '1px',
  position: 'relative',
})

const progressStyle = (time: number) =>
  css({
    position: 'absolute',
    bottom: '0px',
    height: '200px',
    backgroundColor: colors.blue,
    animation: `${growAnimation} ${time}ms linear`,
  })

const buttonContainerStyle = css({
  display: 'flex',
  alignItems: 'center',
  alignContent: 'center',
  justifyContent: 'center',
  justifyItems: 'center',
})

const notes = ['Ab', 'A', 'A#', 'Bb', 'B', 'C', 'C#', 'D#', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#']

type NotePracticingPageProps = ConfigurableProps<NotesEarTrainingConfiguration>
type NotePracticingPageState = {
  note: string
  timerHandle: any
}

export class NotePracticingPage extends PureComponent<NotePracticingPageProps, NotePracticingPageState> {
  private synth = createDefaultSynth()

  state: NotePracticingPageState = {
    note: null,
    timerHandle: null,
  }

  private onTick() {
    const note = this.getNextNote()
    this.synth.triggerAttackRelease(`${note}4`, '1n', now() + 0.2)
    this.setState({ note })
  }

  componentWillUnmount() {
    if (this.isRunning()) {
      this.onPause()
    }
  }
  private onStart = () => {
    this.onTick()
    const timerHandle = setInterval(() => this.onTick(), 5000)
    this.setState({ timerHandle })
  }

  private onPause = () => {
    clearInterval(this.state.timerHandle)
    this.setState({ timerHandle: null, note: null })
  }

  private onSkip = () => {
    const isRunning = this.isRunning()
    clearInterval(this.state.timerHandle)
    this.onTick()
    if (isRunning) {
      this.onStart()
    }
  }

  private isRunning() {
    return !isNil(this.state.timerHandle)
  }

  private getNextNote() {
    const { note } = this.state
    let nextNote = null
    do {
      nextNote = sample(notes)
    } while (nextNote === note)
    return nextNote
  }

  render() {
    const isRunning = this.isRunning()
    return (
      <div>
        <Content direction={ContentDirection.Vertical}>
          <TextBlock>
            <UnorderedList>
              <li>Try to find the given note on your guitar.</li>
              <li>First pick a slow speed and limit the amount of notes (or just look on a single string).</li>
              <li>Later you can increase the speed and add more notes.</li>
            </UnorderedList>
          </TextBlock>
        </Content>
        <div className={cardContainerStyle}>
          <Transition
            from={{ transform: 'translateX(-15vw)', opacity: 0 }}
            enter={{ transform: 'translateX(0px)', opacity: 1 }}
            leave={{ transform: 'translateX(15vw)', opacity: 0 }}
            items={[this.state.note]}
            config={config.default}>
            {(item) => (style) => (
              <div className={cardStyle} style={style}>
                {isRunning ? <div className={progressStyle(5000)} /> : null}
                <div className={cardContentStyle}>
                  {item ? <span>{item}</span> : <FontAwesomeIcon icon={faPause} size={'1x'} />}
                </div>
              </div>
            )}
          </Transition>
        </div>
        <div className={buttonContainerStyle}>
          <Button
            className={buttonStyle}
            grow={false}
            kind={ButtonKind.Secondary}
            icon={isRunning ? faPause : faPlay}
            onClick={isRunning ? this.onPause : this.onStart}>
            {isRunning ? 'Pause' : 'Start'}
          </Button>
          <Button grow={false} kind={ButtonKind.Secondary} icon={faForward} onClick={this.onSkip}>
            {'Skip'}
          </Button>
        </div>
      </div>
    )
  }

  static defaultProps: ConfigurableProps<NotesEarTrainingConfiguration> = {
    configuration: {
      notes: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
      time: 5000,
    },
  }
}
