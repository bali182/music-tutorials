import { ChordType } from '../ux/ChordEarTraining/ChordType'

export type ConfiguratorProps<T> = {
  value: T
  onChange: (value: T) => void
}

export type ConfigurationTemplate<T> = {
  name: string
  template: T
}

export type ConfigurableProps<T> = {
  configuration: T
}

export type IntervalEarTrainingConfiguration = {
  intervals: number[]
  arpeggiate: boolean
}

export type ChordEarTrainingConfiguration = {
  chordsTypes: ChordType[]
  arpeggiate: boolean
}

export type NotesEarTrainingConfiguration = {
  notes: string[]
  time: number
}
