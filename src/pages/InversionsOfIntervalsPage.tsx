import React, { PureComponent } from 'react'
import { Card } from '../ux/Card'
import { CardContent, ContentDirection } from '../ux/CardContent'
import { CardHeader } from '../ux/CardHeader'
import { CardTitle } from '../ux/CardTitle'
import { IntervalsWithInverse } from '../ux/Intervals/IntervalsWithInverse'

export class InversionsOfIntervalsPage extends PureComponent {
  render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Inversions of intervals</CardTitle>
        </CardHeader>
        <CardContent direction={ContentDirection.Vertical}>
          <IntervalsWithInverse intervals={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]} />
        </CardContent>
      </Card>
    )
  }
}
