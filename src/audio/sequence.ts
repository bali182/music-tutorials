import { Interval, Note, Scale, transpose } from '@tonaljs/tonal'
import { sample } from 'lodash'
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
  sequence.stop()
  Transport.start()
  sequence.start()
}

export const createRandomInterval = (range: number, scaleRoot: string = 'a3') => (synth: PolySynth): Sequence => {
  const scale = Scale.get(`${scaleRoot} chromatic`)
  const interval = Interval.fromSemitones(range)
  const noteA = sample(scale.notes)
  const noteB = Note.transpose(noteA, interval)
  const sequence = createSequence(synth, [
    { note: noteA, duration: '8n' },
    { note: noteB, duration: '8n' },
    { note: [noteA, noteB], duration: '4n' },
  ])
  return sequence
}

export const createRandomChord = (chordType: ChordType, playNotes: boolean, scaleRoot: string = 'a3') => (
  synth: PolySynth
): Sequence => {
  const scale = Scale.get(`${scaleRoot} chromatic`)
  const relativeIntervals = getChordIntervals(chordType)
  const intervals = relativeIntervals
    .map((_, idx) => relativeIntervals.slice(0, idx + 1).reduce((a, b) => a + b, 0))
    .map((range) => Interval.fromSemitones(range))
  const root = sample(scale.notes)
  const notes = intervals.map((interval) => transpose(root, interval))
  if (playNotes) {
    return createSequence(synth, [
      ...notes.map((note): AudioNote => ({ note, duration: '8n' })),
      { note: notes, duration: '4n' },
    ])
  }
  return createSequence(
    synth,
    notes.map((note): AudioNote => ({ note, duration: '8n' }))
  )
}
