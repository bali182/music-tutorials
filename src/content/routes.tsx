import React, { ComponentType } from 'react'
import { ConfigurableProps, ConfiguratorProps } from '../configuration/configurationTypes'
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

export type RouteDescriptor = {
  id: string
  label: string
  children?: RouteDescriptor[]
  configComponent?: ComponentType<ConfiguratorProps<any>>
  component?: ComponentType<ConfigurableProps<any>>
}

export const routes: RouteDescriptor[] = allWithQualifiedIds([
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
        id: 'ear-training',
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
        id: 'ear-training',
        label: 'Ear training',
        children: [
          {
            id: 'triads',
            label: 'Triads (Major, minor, diminished, augmented)',
            component: () => (
              <ChordEarTrainingPage
                chordTypes={[ChordType.DiminishedTriad, ChordType.MajorTriad, ChordType.MinorTriad]}
              />
            ),
          },
          {
            id: 'sevenths',
            label: 'Extended 7th chords',
            component: () => <ChordEarTrainingPage chordTypes={[ChordType.MajorSeventh, ChordType.MinorSeventh]} />,
          },
          {
            id: 'ninths',
            label: 'Extended 9th chords',
            component: () => <ChordEarTrainingPage chordTypes={[ChordType.MajorNinth, ChordType.MinorNinth]} />,
          },
          {
            id: 'suspended',
            label: 'Suspended (sus2, sus4) chords',
            component: () => <ChordEarTrainingPage chordTypes={[ChordType.Suspended2, ChordType.Suspended4]} />,
          },
        ],
      },
    ],
  },
])

export const flatRoutes = flattenRoutes(routes)
