import React, { PureComponent } from 'react'
import { Card } from '../ux/Card'
import { CardContent, ContentDirection } from '../ux/CardContent'
import { spacing } from '../ux/constants'
import { Headline } from '../ux/Headline'
import { IntervalsWithInverse } from '../ux/Intervals/IntervalsWithInverse'
import { Spacer } from '../ux/Spacer'

export class InversionsOfIntervalsPage extends PureComponent {
  render() {
    return (
      <Card>
        <CardContent direction={ContentDirection.Vertical}>
          <Headline text="Inversions of intervals" alignment="left" />
          <Spacer space={spacing.m} />
          <IntervalsWithInverse intervals={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]} />
        </CardContent>
      </Card>
    )
  }
}
