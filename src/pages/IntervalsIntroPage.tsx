import { css } from 'emotion'
import React, { PureComponent } from 'react'
import { Card } from '../ux/Card'
import { CardContent, ContentDirection } from '../ux/CardContent'
import { spacing } from '../ux/constants'
import { Headline } from '../ux/Headline'
import { Spacer } from '../ux/Spacer'
import { TextBlock } from '../ux/TextBlock'
import { UnorderedList } from '../ux/UnorderedList'

export class IntervalsIntroPage extends PureComponent {
  render() {
    return (
      <Card>
        <CardContent direction={ContentDirection.Vertical}>
          <Headline text="Intervals" alignment="left" />
          <Spacer space={spacing.m} />
          <TextBlock>
            <UnorderedList>
              <li>Intervals reffer to the difference in pitch between two musical notes</li>
              <li>
                Intervals (relevant to the guitar) are measured in semitones (exception to this is microtonal music)
              </li>
              <li>Simple intervals cover the distance of 12 or less semitones (an octave) between 2 notes</li>
              <li>Compound intervals cover more than 12 semitones (an octave) between 2 notes</li>
            </UnorderedList>
          </TextBlock>
        </CardContent>
      </Card>
    )
  }
}
