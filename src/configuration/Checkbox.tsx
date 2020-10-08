import { nanoid } from 'nanoid'
import React, { Fragment, PureComponent } from 'react'

type CheckboxProps = {
  value: boolean
  onChange: (value: boolean) => void
  label: string
}

export class Checkbox extends PureComponent<CheckboxProps> {
  private id: string = `checkbox_${nanoid()}`

  private onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { onChange, value } = this.props
    onChange(!value)
  }

  render() {
    const { value, label } = this.props
    return (
      <Fragment>
        <input type="checkbox" checked={value} onChange={this.onChange} id={this.id} />
        <label htmlFor={this.id}>{label}</label>
      </Fragment>
    )
  }
}
