import { ComponentType } from 'react'
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
      { id: 'introduction', label: 'Introduction' },
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
          { id: 'custom-practice', label: 'Custom practice' },
          { id: 'major-and-minor-seconds', label: 'Major and minor seconds' },
          { id: 'major-and-minor-thirds', label: 'Major and minor thirds' },
          { id: 'seconds-and-thirds', label: 'Seconds and thirds' },
          { id: 'perfect-fourth-and-fifth', label: 'Perfect fourth and fifth' },
          { id: 'seconds-thirds-fourths-fifths', label: 'Seconds, thirds, fourths and fifths' },
          { id: 'major-and-minor-sixths', label: 'Major and minor sixths' },
          { id: 'seconds-thirds-fourths-fifths-sixths', label: 'Seconds, thirds, fourths, fifths and sixths' },
          { id: 'major-and-minor-sevenths', label: 'Major and minor sevenths' },
          { id: 'intervals-in-octave', label: 'All intervals in an octave' },
        ],
      },
    ],
  },
  {
    id: 'chords',
    label: 'Chords',
    children: [
      { id: 'introduction', label: 'Introduction' },
      { id: 'triads', label: 'Triads (Major, minor, diminished, augmented)' },
      { id: 'sevenths', label: 'Extended 7th chords' },
      { id: 'ninths', label: 'Extended 9th chords' },
      { id: 'suspended', label: 'Suspended (sus2, sus4 and add9) chords' },
    ],
  },
])

export const flatRoutes = flattenRoutes(routes)
