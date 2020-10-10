import { isNil } from 'lodash'
import React, { ComponentType } from 'react'
import { ChordEarTrainingConfigurator } from '../configuration/ChordEarTrainingConfigurator'
import {
  ChordEarTrainingConfiguration,
  ConfigurableProps,
  ConfigurationTemplate,
  ConfiguratorProps,
  IntervalEarTrainingConfiguration,
} from '../configuration/configurationTypes'
import { IntervalEarTrainingConfigurator } from '../configuration/IntervalEarTrainingConfigurator'
import { ChordEarTrainingPage } from '../pages/ChordEarTrainingPage'
import { IntervalEarTrainingPage } from '../pages/IntervalEarTrainingPage'
import { IntervalsInOctavePage } from '../pages/IntervalsInOctavePage'
import { IntervalsIntroPage } from '../pages/IntervalsIntroPage'
import { InversionsOfIntervalsPage } from '../pages/InversionsOfIntervalsPage'
import { NotePracticingPage } from '../pages/NotePracticingPage'
import { PentatonicPage } from '../pages/PentatonicPage'
import { allWithQualifiedIds, flattenRoutes } from './routeUtils'

export type RouteDescriptor<T = any> = {
  id: string
  label: string
  templates?: ConfigurationTemplate<T>[]
  children?: RouteDescriptor[]
  configComponent?: ComponentType<ConfiguratorProps<T>>
  isConfigValid?: (config: T) => boolean
  component?: ComponentType<ConfigurableProps<T>>
}

export const routes: RouteDescriptor<any>[] = allWithQualifiedIds([
  {
    id: 'training-tools',
    label: 'Training tools',
    children: [
      {
        id: 'intervals-ear-training',
        label: 'Intervals ear training',
        component: IntervalEarTrainingPage,
        isConfigValid: (config: IntervalEarTrainingConfiguration) =>
          !isNil(config) && !isNil(config.intervals) && config.intervals.length > 0,
        configComponent: IntervalEarTrainingConfigurator,
      },
      {
        id: 'chords-ear-training',
        label: 'Chords ear training',
        component: ChordEarTrainingPage,
        isConfigValid: (config: ChordEarTrainingConfiguration) =>
          !isNil(config) && !isNil(config.chordsTypes) && config.chordsTypes.length > 0,
        configComponent: ChordEarTrainingConfigurator,
      },
      {
        id: 'notes-training',
        label: 'Notes training',
        component: NotePracticingPage as any,
      },
    ],
  },
  {
    id: 'theory-visualisation',
    label: 'Theory visualisation',
    children: [
      {
        id: 'intervals-in-an-octave',
        label: 'Intervals in an octave',
        component: IntervalsInOctavePage as any,
      },
      {
        id: 'inversions-of-intervals',
        label: 'Inversions of intervals',
        component: InversionsOfIntervalsPage as any,
      },
      {
        id: 'pentatonic-scale',
        label: 'Pentatonic scale',
        component: PentatonicPage as any,
      },
    ],
  },
])

export const flatRoutes = flattenRoutes(routes)
