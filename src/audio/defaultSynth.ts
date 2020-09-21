import { PolySynth, Synth } from 'tone'

export function createDefaultSynth(maxPolyphony: number = 32) {
  const synth = new PolySynth(Synth, {
    oscillator: {
      type: 'sine4',
      volume: -6,
    },
    envelope: {
      attack: 0.01,
      decay: 0.5,
      sustain: 0.1,
      release: 1,
    },
  })
  synth.maxPolyphony = maxPolyphony
  return synth.toDestination()
}
