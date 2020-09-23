import { Interval, Note, Scale } from '@tonaljs/tonal'
import { range, sample } from 'lodash'
import { Sequence, PolySynth, start, Transport } from 'tone'
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
  Transport.stop()
  sequence.stop()
  Transport.start()
  sequence.start()
}

export const createRandomInterval = (range: number, scaleRoot: string = 'c4') => (synth: PolySynth): Sequence => {
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
