import React, { PureComponent } from 'react'
import { Card } from '../ux/Card'
import { CardContent, ContentDirection } from '../ux/CardContent'
import { CardHeader } from '../ux/CardHeader'
import { CardTitle } from '../ux/CardTitle'
import { Intervals } from '../ux/Intervals/Intervals'

export class IntervalsInOctavePage extends PureComponent {
  render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Intervals in an octave</CardTitle>
        </CardHeader>
        <CardContent direction={ContentDirection.Vertical}>
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
