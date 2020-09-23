import { getIntervalName } from '../Intervals/getIntervalName'

export function getChordIntervalName(interval: number): string {
  return interval === 0 ? 'Root' : getIntervalName(interval)
}
