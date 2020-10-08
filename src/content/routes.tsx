import React, { ComponentType } from 'react'
import { ChordEarTrainingConfigurator } from '../configuration/ChordEarTrainingConfigurator'
import { ConfigurableProps, ConfigurationTemplate, ConfiguratorProps } from '../configuration/configurationTypes'
import { IntervalEarTrainingConfigurator } from '../configuration/IntervalEarTrainingConfigurator'
import { ChordEarTrainingPage } from '../pages/ChordEarTrainingPage'
import { IntervalEarTrainingPage } from '../pages/IntervalEarTrainingPage'
import { IntervalsInOctavePage } from '../pages/IntervalsInOctavePage'
import { IntervalsIntroPage } from '../pages/IntervalsIntroPage'
import { InversionsOfIntervalsPage } from '../pages/InversionsOfIntervalsPage'
import { PentatonicPage } from '../pages/PentatonicPage'
import { TriadsPage } from '../pages/TriadsPage'
import { ChordType } from '../ux/ChordEarTraining/ChordType'
import { allWithQualifiedIds, flattenRoutes } from './routeUtils'

export type RouteDescriptor<T = any> = {
  id: string
  label: string
  templates?: ConfigurationTemplate<T>[]
  children?: RouteDescriptor[]
  configComponent?: ComponentType<ConfiguratorProps<T>>
  component?: ComponentType<ConfigurableProps<T>>
}

export const routes: RouteDescriptor<any>[] = allWithQualifiedIds([
  {
    id: 'scales',
    label: 'Scales',
    children: [{ id: 'pentatonic-scale', label: 'Pentatonic scale', component: PentatonicPage as any }],
  },
  {
    id: 'intervals',
    label: 'Intervals',
    component: IntervalsIntroPage as any,
    children: [
      {
        id: 'theory',
        label: 'Theory',
        children: [
          { id: 'intervals-in-an-octave', label: 'Intervals in an octave', component: IntervalsInOctavePage as any },
          {
            id: 'inversions-of-intervals',
            label: 'Inversions of intervals',
            component: InversionsOfIntervalsPage as any,
          },
          { id: 'extended-intervals', label: 'Extended intervals' },
        ],
      },
      {
        id: 'intervals-ear-training',
        label: 'Ear training',
        component: IntervalEarTrainingPage,
        configComponent: IntervalEarTrainingConfigurator,
      },
    ],
  },
  {
    id: 'chords',
    label: 'Chords',
    children: [
      {
        id: 'theory',
        label: 'Theory',
        children: [
          { id: 'triads', label: 'Triads (Major, minor, diminished, augmented)', component: TriadsPage as any },
          { id: 'sevenths', label: 'Extended 7th chords' },
          { id: 'ninths', label: 'Extended 9th chords' },
          { id: 'suspended', label: 'Suspended (sus2, sus4 and add9) chords' },
        ],
      },
      {
        id: 'chords-ear-training',
        label: 'Ear training',
        component: ChordEarTrainingPage,
        configComponent: ChordEarTrainingConfigurator,
      },
    ],
  },
])

export const flatRoutes = flattenRoutes(routes)
