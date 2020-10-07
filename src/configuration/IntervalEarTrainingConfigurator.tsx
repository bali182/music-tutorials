import { css } from 'emotion'
import { range } from 'lodash'
import React, { Fragment, PureComponent } from 'react'
import { spacing } from '../ux/constants'
import { getIntervalName } from '../ux/Intervals/getIntervalName'
import { ConfigurationSection } from './ConfigurationSection'
import { ConfiguratorProps, IntervalEarTrainingConfiguration } from './configurationTypes'

const intervals = range(0, 13)

const selectorBlockStyle = css({
  paddingTop: spacing.xxs,
  paddingBottom: spacing.xxs,
  display: 'flex',
  flexDirection: 'row',
  alignContent: 'center',
  alignItems: 'center',
  justifyItems: 'center',
})

export class IntervalEarTrainingConfigurator extends PureComponent<
  ConfiguratorProps<IntervalEarTrainingConfiguration>
> {
  private onArpeggiateChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = this.nonNullValue()
    const { onChange } = this.props
    onChange({ ...value, arpeggiate: Boolean(e.target.checked) })
  }
  private onIntervalChanged = (interval: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const { onChange } = this.props
    const isSelected = Boolean(e.target.checked)
    const value = this.nonNullValue()
    const intervals = isSelected
      ? Array.from(new Set(value.intervals).add(interval))
      : value.intervals.filter((i) => i !== interval)
    const sortedIntervals = intervals.sort((a, b) => a - b)
    onChange({ ...value, intervals: sortedIntervals })
  }

  private nonNullValue() {
    const { value } = this.props
    const nonNullValue = value || { arpeggiate: false, intervals: [] }
    return nonNullValue
  }

  private renderIntervals() {
    const value = this.nonNullValue()
    return intervals.map((interval) => (
      <div key={interval} className={selectorBlockStyle}>
        <input
          type="checkbox"
          checked={value.intervals.indexOf(interval) >= 0}
          onChange={this.onIntervalChanged(interval)}
        />
        <span>{getIntervalName(interval)}</span>
      </div>
    ))
  }

  private renderArpeggiate() {
    const value = this.nonNullValue()
    return (
      <div className={selectorBlockStyle}>
        <input type="checkbox" checked={value.arpeggiate} onChange={this.onArpeggiateChanged} />
        <span>{value.arpeggiate ? 'Will arpeggiate' : 'Will not arpeggiate'}</span>
      </div>
    )
  }

  render() {
    return (
      <Fragment>
        <ConfigurationSection title="Intervals" description="Select the intervals you want to occur in the training.">
          {this.renderIntervals()}
        </ConfigurationSection>
        <ConfigurationSection
          title="Arpeggiate"
          description="If turned on, you will hear the individual notes of the interval, otherwise just the notes played at the same time.">
          {this.renderArpeggiate()}
        </ConfigurationSection>
      </Fragment>
    )
  }
}
