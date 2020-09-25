import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { css } from 'emotion'
import React, { Fragment, PureComponent } from 'react'
import { colors, spacing } from '../constants'

const scaleViewStyle = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
})

const noteStyle = (isHighlighted: boolean) =>
  css({
    backgroundColor: isHighlighted ? colors.orange : colors.blue,
    borderRadius: spacing.m,
    color: colors.white,
    padding: spacing.s,
    width: '60px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '1.2em',
  })
const arrowStyle = css({
  margin: spacing.s,
})

type ScaleViewProps = {
  notes: string[]
  highlightedNotes: number[]
}

export class ScaleView extends PureComponent<ScaleViewProps> {
  private renderNode(note: string, isHighlighted: boolean, isLast: boolean) {
    return (
      <Fragment>
        <div className={noteStyle(isHighlighted)}>{note}</div>
        {isLast ? null : <FontAwesomeIcon icon={faArrowRight} className={arrowStyle} />}
      </Fragment>
    )
  }

  render() {
    const { notes, highlightedNotes } = this.props
    return (
      <div className={scaleViewStyle}>
        {notes.map((note, idx) => this.renderNode(note, highlightedNotes.indexOf(idx) >= 0, idx === notes.length - 1))}
      </div>
    )
  }
}
