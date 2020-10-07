import { ChordType } from '../ux/ChordEarTraining/ChordType'

export type ConfiguratorProps<T> = {
  value: T
  onChange: (value: T) => void
}

export type ConfigurableProps<T> = {
  configuration: T
}

export type IntervalEarTrainingConfiguration = {
  intervals: number[]
  arpeggiate: boolean
}

export type ChordEarTrainingConfiguration = {
  intervals: ChordType[]
  arpeggiate: boolean
}
