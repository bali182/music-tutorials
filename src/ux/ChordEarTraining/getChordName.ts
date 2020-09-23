import { ChordType } from './ChordType'

export function getChordName(type: ChordType): string {
  switch (type) {
    case ChordType.DiminishedTriad:
      return 'Diminished triad'
    case ChordType.HalfDiminished:
      return 'Half diminished'
    case ChordType.MajorNinth:
      return 'Major 9'
    case ChordType.MajorSeventh:
      return 'Major 7'
    case ChordType.MajorTriad:
      return 'Major triad'
    case ChordType.MinorNinth:
      return 'Minor 9'
    case ChordType.MinorSeventh:
      return 'Minor 7'
    case ChordType.MinorTriad:
      return 'Minor triad'
    case ChordType.Suspended2:
      return 'Suspended 2'
    case ChordType.Suspended4:
      return 'Suspended 4'
  }
}
