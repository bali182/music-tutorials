import React, { PureComponent } from 'react'

type SpacerProps = {
  space: string
}

export class Spacer extends PureComponent<SpacerProps> {
  render() {
    return <div style={{ margin: this.props.space }} />
  }
}
