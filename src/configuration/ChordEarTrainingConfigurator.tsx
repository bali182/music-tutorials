import React, { Fragment, PureComponent } from 'react'
import { ChordType } from '../ux/ChordEarTraining/ChordType'
import { getChordName } from '../ux/ChordEarTraining/getChordName'
import { Checkbox } from './Checkbox'
import { ConfigurationSection } from './ConfigurationSection'
import { ConfiguratorProps, ChordEarTrainingConfiguration } from './configurationTypes'
import { ListMultiSelect } from './ListMultiSelect'

const Chords = [
  ChordType.MajorTriad,
  ChordType.MinorTriad,
  ChordType.DiminishedTriad,
  ChordType.MajorSeventh,
  ChordType.MinorSeventh,
  ChordType.HalfDiminished,
  ChordType.MajorNinth,
  ChordType.MinorNinth,
  ChordType.Suspended2,
  ChordType.Suspended4,
]

export class ChordEarTrainingConfigurator extends PureComponent<ConfiguratorProps<ChordEarTrainingConfiguration>> {
  private onArpeggiateChanged = (arpeggiate: boolean) => {
    const { onChange } = this.props
    const value = this.nonNullValue()
    onChange({ ...value, arpeggiate })
  }
  private onChordChanged = (chords: ChordType[]) => {
    const { onChange } = this.props
    const value = this.nonNullValue()
    onChange({ ...value, chordsTypes: chords })
  }

  private nonNullValue(): ChordEarTrainingConfiguration {
    const { value } = this.props
    const nonNullValue = value || { arpeggiate: false, chordsTypes: [] }
    return nonNullValue
  }

  render() {
    const value = this.nonNullValue()
    return (
      <Fragment>
        <ConfigurationSection title="Chords" description="Select the chord types you want to occur in the training.">
          <ListMultiSelect
            values={value.chordsTypes}
            options={Chords}
            onChange={this.onChordChanged}
            stringify={getChordName}
          />
        </ConfigurationSection>
        <ConfigurationSection
          title="Arpeggiate"
          description="If turned on, you will hear the individual notes of the chord, otherwise just the notes played at the same time.">
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
