import { css } from 'emotion'
import React, { Fragment, PureComponent } from 'react'
import { spacing } from '../ux/constants'

type ListMultiSelectProps<T> = {
  options: T[]
  values: T[]
  stringify: (item: T) => string
  onChange: (values: T[]) => void
}

const selectorBlockStyle = css({
  paddingTop: spacing.xxs,
  paddingBottom: spacing.xxs,
  display: 'flex',
  flexDirection: 'row',
  alignContent: 'center',
  alignItems: 'center',
  justifyItems: 'center',
})

export class ListMultiSelect<T> extends PureComponent<ListMultiSelectProps<T>> {
  private onChange = (value: T) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const { onChange, values, options } = this.props
    const isSelected = values.indexOf(value) < 0
    const newValues = isSelected ? new Set(values).add(value) : new Set(values.filter((val) => val !== value))
    // Keep original order
    const sortedIntervals = options.filter((option) => newValues.has(option))
    onChange(sortedIntervals)
  }

  private renderSelectors() {
    const { values, options, stringify } = this.props
    return options.map((option, idx) => (
      <div key={`${stringify(option)}_${idx}`} className={selectorBlockStyle}>
        <input type="checkbox" checked={values.indexOf(option) >= 0} onChange={this.onChange(option)} />
        <span>{stringify(option)}</span>
      </div>
    ))
  }
  render() {
    return <Fragment>{this.renderSelectors()}</Fragment>
  }
}
