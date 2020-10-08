import { range } from 'lodash'
import React, { Fragment, PureComponent } from 'react'
import { getIntervalName } from '../ux/Intervals/getIntervalName'
import { Checkbox } from './Checkbox'
import { ConfigurationSection } from './ConfigurationSection'
import { ConfiguratorProps, IntervalEarTrainingConfiguration } from './configurationTypes'
import { ListMultiSelect } from './ListMultiSelect'

const Intervals = range(0, 13)

export class IntervalEarTrainingConfigurator extends PureComponent<
  ConfiguratorProps<IntervalEarTrainingConfiguration>
> {
  private onArpeggiateChanged = (arpeggiate: boolean) => {
    const { onChange } = this.props
    const value = this.nonNullConfig()
    onChange({ ...value, arpeggiate })
  }
  private onIntervalChanged = (intervals: number[]) => {
    const { onChange } = this.props
    const value = this.nonNullConfig()
    onChange({ ...value, intervals })
  }

  private nonNullConfig() {
    const { value } = this.props
    const nonNullValue = value || { arpeggiate: false, intervals: [] }
    return nonNullValue
  }

  render() {
    const value = this.nonNullConfig()
    return (
      <Fragment>
        <ConfigurationSection title="Intervals" description="Select the intervals you want to occur in the training.">
          <ListMultiSelect
            values={value.intervals}
            options={Intervals}
            onChange={this.onIntervalChanged}
            stringify={getIntervalName}
          />
        </ConfigurationSection>
        <ConfigurationSection
          title="Arpeggiate"
          description="If turned on, you will hear the individual notes of the interval, otherwise just the notes played at the same time.">
          <Checkbox
            value={value.arpeggiate}
            label={value.arpeggiate ? 'Will arpeggiate' : 'Will not arpeggiate'}
            onChange={this.onArpeggiateChanged}
          />
        </ConfigurationSection>
      </Fragment>
    )
  }
}
