import { ChordType } from './ChordType'

export function getChordIntervals(type: ChordType): number[] {
  switch (type) {
    case ChordType.DiminishedTriad:
      return [0, 3, 3]
    case ChordType.HalfDiminished:
      return [0, 3, 3, 4]
    case ChordType.MajorNinth:
      return [0, 4, 3, 4, 3]
    case ChordType.MajorSeventh:
      return [0, 4, 3, 4]
    case ChordType.MajorTriad:
      return [0, 4, 3]
    case ChordType.MinorNinth:
      return [0, 3, 4, 3, 4]
    case ChordType.MinorSeventh:
      return [0, 3, 4, 3]
    case ChordType.MinorTriad:
      return [0, 3, 4]
    case ChordType.Suspended2:
      return [0, 2, 5]
    case ChordType.Suspended4:
      return [0, 5, 2]
  }
}
