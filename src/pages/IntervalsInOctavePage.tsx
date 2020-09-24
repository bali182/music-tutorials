import React, { PureComponent } from 'react'
import { Card } from '../ux/Card'
import { CardContent, ContentDirection } from '../ux/CardContent'
import { spacing } from '../ux/constants'
import { Headline } from '../ux/Headline'
import { Intervals } from '../ux/Intervals/Intervals'
import { Spacer } from '../ux/Spacer'

export class IntervalsInOctavePage extends PureComponent {
  render() {
    return (
      <Card>
        <CardContent direction={ContentDirection.Vertical}>
          <Headline text="Intervals in an octave" alignment="left" />
          <Spacer space={spacing.m} />
          <Intervals
            intervals={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
            onGuess={null}
            correctInterval={null}
            guesses={[]}
          />
        </CardContent>
      </Card>
    )
  }
}
