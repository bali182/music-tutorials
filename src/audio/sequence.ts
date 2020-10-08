import { Interval, Note, Scale, transpose } from '@tonaljs/tonal'
import { isNil, sample } from 'lodash'
import { Sequence, PolySynth, start, Transport } from 'tone'
import { ChordType } from '../ux/ChordEarTraining/ChordType'
import { getChordIntervals } from '../ux/ChordEarTraining/getChordIntervals'
import { AudioNote } from './AudioNote'

export function createSequence(synth: PolySynth, notes: AudioNote[]): Sequence {
  return new Sequence({
    subdivision: '8n',
    loop: false,
    events: notes,
    callback: (time, note) => synth.triggerAttackRelease(note.note, note.duration, time),
  })
}

export function playSequence(sequence: Sequence) {
  start()
  Transport.stop()
  sequence?.stop()
  Transport.start()
  sequence?.start()
}

export function destroySequence(sequence: Sequence) {
  sequence?.stop()
  sequence?.dispose()
}

export const createInterval = (noteA: string, range: number, arpeggiate: boolean) => (synth: PolySynth): Sequence => {
  const interval = Interval.fromSemitones(range)
  const noteB = Note.transpose(noteA, interval)
  const sequence = createSequence(synth, [
    ...(arpeggiate
      ? [
          { note: noteA, duration: '8n' },
          { note: noteB, duration: '8n' },
        ]
      : []),
    { note: [noteA, noteB], duration: '4n' },
  ])
  return sequence
}

export const createReverseInterval = (noteB: string, range: number) => (synth: PolySynth): Sequence => {
  const interval = Interval.fromSemitones(range)
  const noteA = Note.transpose(Note.transpose(noteB, Interval.invert(interval)), '-8P')
  const sequence = createSequence(synth, [
    { note: noteA, duration: '8n' },
    { note: noteB, duration: '8n' },
    { note: [noteA, noteB], duration: '4n' },
  ])
  return sequence
}

export const createRandomInterval = (range: number, arpeggiate: boolean, scaleRoot: string = 'a3') => (
  synth: PolySynth
): Sequence => {
  const scale = Scale.get(`${scaleRoot} chromatic`)
  const noteA = sample(scale.notes)
  return createInterval(noteA, range, arpeggiate)(synth)
}

export const createRandomChord = (chordType: ChordType, arpeggiate: boolean, scaleRoot: string = 'a3') => (
  synth: PolySynth
): Sequence => {
  const scale = Scale.get(`${scaleRoot} chromatic`)
  const relativeIntervals = getChordIntervals(chordType)
  if (isNil(relativeIntervals)) {
    return null
  }
  const intervals = relativeIntervals
    .map((_, idx) => relativeIntervals.slice(0, idx + 1).reduce((a, b) => a + b, 0))
    .map((range) => Interval.fromSemitones(range))
  const root = sample(scale.notes)
  const notes = intervals.map((interval) => transpose(root, interval))
  const individuallyPlayedNotes = notes.map((note): AudioNote => ({ note, duration: '8n' }))
  const chordNotes = [{ note: notes, duration: '4n' }]
  return createSequence(synth, arpeggiate ? individuallyPlayedNotes.concat(chordNotes) : chordNotes)
}
