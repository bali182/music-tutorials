import React, { PureComponent } from 'react'
import { Content, ContentDirection } from '../ux/Content'
import { TextBlock } from '../ux/TextBlock'

export class IntervalsIntroPage extends PureComponent {
  render() {
    return (
      <Content direction={ContentDirection.Vertical}>
        <TextBlock>Intervals reffer to the difference in pitch between two musical notes.</TextBlock>
      </Content>
    )
  }
}
