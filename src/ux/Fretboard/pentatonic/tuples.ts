function translateShape(shape: [number, number][], amount: number): [number, number][] {
  return shape.map(([fret1, fret2]): [number, number] => [fret1 + amount, fret2 + amount])
}

export const shape1: [number, number][] = translateShape(
  [
    [1, 4],
    [1, 3],
    [1, 3],
    [1, 3],
    [1, 4],
    [1, 4],
  ],
  1
)

export const shape2: [number, number][] = translateShape(
  [
    [4, 6],
    [3, 6],
    [3, 6],
    [3, 5],
    [4, 6],
    [4, 6],
  ],
  1
)

export const shape3: [number, number][] = translateShape(
  [
    [6, 8],
    [6, 8],
    [6, 8],
    [5, 8],
    [6, 9],
    [6, 8],
  ],
  1
)

export const shape4: [number, number][] = translateShape(
  [
    [8, 11],
    [8, 11],
    [8, 10],
    [8, 10],
    [9, 11],
    [8, 11],
  ],
  1
)

export const shape5: [number, number][] = translateShape(
  [
    [11, 13],
    [11, 13],
    [10, 13],
    [10, 13],
    [11, 13],
    [11, 13],
  ],
  1
)
