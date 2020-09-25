import React, { PureComponent } from 'react'
import { Card } from '../ux/Card'
import { CardContent, ContentDirection } from '../ux/CardContent'
import { CardHeader } from '../ux/CardHeader'
import { CardTitle } from '../ux/CardTitle'
import { TextBlock } from '../ux/TextBlock'

export class IntervalsIntroPage extends PureComponent {
  render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Intervals</CardTitle>
        </CardHeader>
        <CardContent direction={ContentDirection.Vertical}>
          <TextBlock>Intervals reffer to the difference in pitch between two musical notes.</TextBlock>
        </CardContent>
      </Card>
    )
  }
}
