import React, { PureComponent } from 'react'
import { css } from 'emotion'

const listStyle = css({
  listStyleType: 'disc',
  listStylePosition: 'inside',
  width: '100%',
})

export class UnorderedList extends PureComponent {
  render() {
    return <ul className={listStyle}>{this.props.children}</ul>
  }
}
