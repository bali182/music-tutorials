import React, { PureComponent } from 'react'
import { css } from 'emotion'

const headlineStyle = (alignment: string) =>
  css({
    fontSize: '2em',
    fontWeight: 'bold',
    width: '100%',
    textAlign: alignment as any,
  })

type HeadlineProps = {
  text: string
  alignment: string
}

export class Headline extends PureComponent<HeadlineProps> {
  render() {
    const { text, alignment } = this.props
    return <h1 className={headlineStyle(alignment)}>{text}</h1>
  }
}
