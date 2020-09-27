import { flatMap, uniqBy } from 'lodash'
import { sixGuitarStrings } from '../defaultStrings'
import { MarkerKind, MarkerModel } from '../FretboardModel'
import { shape1, shape2, shape3, shape4, shape5 } from './tuples'

function tuplesAsMarkers(tuples: [number, number][]): MarkerModel[] {
  return flatMap(tuples, ([fret1, fret2], index) => {
    const stringId = sixGuitarStrings[index].id
    const marker1: MarkerModel = {
      type: 'marker',
      id: `${stringId}-${fret1}`,
      fret: fret1,
      kind: MarkerKind.Pimary,
      label: '',
      muted: false,
      stringId,
    }
    const marker2: MarkerModel = {
      type: 'marker',
      id: `${stringId}-${fret2}`,
      fret: fret2,
      kind: MarkerKind.Pimary,
      label: '',
      muted: false,
      stringId,
    }
    return [marker1, marker2]
  })
}

export const shape1Markers = tuplesAsMarkers(shape1)
export const shape2Markers = tuplesAsMarkers(shape2)
export const shape3Markers = tuplesAsMarkers(shape3)
export const shape4Markers = tuplesAsMarkers(shape4)
export const shape5Markers = tuplesAsMarkers(shape5)
export const allPentatonicMarkers = uniqBy(
  [...shape1Markers, ...shape2Markers, ...shape3Markers, ...shape4Markers, ...shape5Markers],
  (marker) => marker.id
)
