import React, { PureComponent } from 'react'
import { css } from 'emotion'

const textStyle = css({
  width: '100%',
  '*': {
    fontSize: '1em',
  },
})

export class TextBlock extends PureComponent {
  render() {
    return <div className={textStyle}>{this.props.children}</div>
  }
}
