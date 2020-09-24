import React, { ComponentType } from 'react'
import { ChordEarTrainingPage } from '../pages/ChordEarTrainingPage'
import { IntervalEarTrainingPage } from '../pages/IntervalEarTrainingPage'
import { ChordType } from '../ux/ChordEarTraining/ChordType'
import { allWithQualifiedIds, flattenRoutes } from './routeUtils'

export type RouteDescriptor = {
  id: string
  label: string
  children?: RouteDescriptor[]
  component?: ComponentType
}

export const routes: RouteDescriptor[] = allWithQualifiedIds([
  {
    id: 'intervals',
    label: 'Intervals',
    children: [
      {
        id: 'theory',
        label: 'Theory',
        children: [
          { id: 'intervals-in-an-octave', label: 'Intervals in an octave' },
          { id: 'extended-intervals', label: 'Extended intervals' },
          { id: 'inversions-of-intervals', label: 'Inversions of intervals' },
        ],
      },
      {
        id: 'ear-training',
        label: 'Ear training',
        children: [
          {
            id: 'major-and-minor-seconds',
            label: 'Major and minor 2nd',
            component: () => <IntervalEarTrainingPage intervals={[1, 2]} />,
          },
          {
            id: 'major-and-minor-thirds',
            label: 'Major and minor 3rd',
            component: () => <IntervalEarTrainingPage intervals={[3, 4]} />,
          },
          {
            id: 'seconds-and-thirds',
            label: '2nd and 3rd',
            component: () => <IntervalEarTrainingPage intervals={[1, 2, 3, 4]} />,
          },
          {
            id: 'perfect-fourth-and-fifth',
            label: 'Perfect 4th, tritone and perfect 5th',
            component: () => <IntervalEarTrainingPage intervals={[5, 6, 7]} />,
          },
          {
            id: 'seconds-thirds-fourths-fifths',
            label: '2nd, 3rd, 4th, and 5th',
            component: () => <IntervalEarTrainingPage intervals={[1, 2, 3, 4, 5, 6, 7]} />,
          },
          {
            id: 'major-and-minor-sixths',
            label: 'Major and minor 6th',
            component: () => <IntervalEarTrainingPage intervals={[8, 9]} />,
          },
          {
            id: 'seconds-thirds-fourths-fifths-sixths',
            label: '2nd, 3rd, 4th, 5th and 6th',
            component: () => <IntervalEarTrainingPage intervals={[1, 2, 3, 4, 5, 6, 7, 8, 9]} />,
          },
          {
            id: 'major-and-minor-sevenths',
            label: 'Major and minor 7th',
            component: () => <IntervalEarTrainingPage intervals={[10, 11]} />,
          },
          {
            id: 'intervals-in-octave',
            label: 'All intervals in an octave',
            component: () => <IntervalEarTrainingPage intervals={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]} />,
          },
        ],
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
          { id: 'triads', label: 'Triads (Major, minor, diminished, augmented)' },
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
