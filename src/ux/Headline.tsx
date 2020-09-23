import React, { PureComponent } from 'react'
import { css } from 'emotion'

const headlineStyle = (alignment: string) =>
  css({
    fontSize: '40px',
    fontWeight: 'bold',
    margin: '30px 10px',
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
