import { css } from 'emotion'
import React, { PureComponent } from 'react'
import { spacing } from '../constants'
import { ChordButton } from './ChordButton'
import { ChordType } from './ChordType'

const chordsStyle = css({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
})

const chordButtonContainerStyle = css({
  label: 'chordEarTraining',
  marginBottom: spacing.xs,
})

export type ChordEarTrainingProps = {
  correctChordType: ChordType
  chordTypes: ChordType[]
  guesses: ChordType[]
  onGuess: (chordType: ChordType) => void
}

export class ChordsEarTraining extends PureComponent<ChordEarTrainingProps> {
  private onChordTypeClicked = (chordType: ChordType) => () => {
    if (this.props.guesses.indexOf(chordType) < 0) {
      this.props.onGuess(chordType)
    }
  }

  private renderChordType(chordType: ChordType) {
    const { chordTypes, correctChordType, guesses } = this.props
    return (
      <div className={chordButtonContainerStyle} key={chordType}>
        <ChordButton
          chordType={chordType}
          isEnabled={chordTypes.indexOf(chordType) >= 0}
          isError={guesses.indexOf(chordType) >= 0 && chordType !== correctChordType}
          isSuccess={guesses.indexOf(chordType) >= 0 && chordType === correctChordType}
          onClick={this.onChordTypeClicked(chordType)}
        />
      </div>
    )
  }
  render() {
    const { chordTypes } = this.props
    return (
      <div className={chordsStyle}>{chordTypes.map((chordType: ChordType) => this.renderChordType(chordType))}</div>
    )
  }
}
