import { Scale } from '@tonaljs/tonal'
import { css } from 'emotion'
import React, { PureComponent } from 'react'
import { Card } from '../ux/Card'
import { CardContent, ContentDirection } from '../ux/CardContent'
import { CardHeader } from '../ux/CardHeader'
import { CardTitle } from '../ux/CardTitle'
import { spacing } from '../ux/constants'
import { ScaleView } from '../ux/ScaleView/ScaleView'
import { TextBlock } from '../ux/TextBlock'

const leftAligner = css({
  alignSelf: 'flex-start',
})

export class TriadsPage extends PureComponent {
  render() {
    return (
      <Card>
        <CardContent direction={ContentDirection.Vertical}>
          <TextBlock></TextBlock>
          <div className={leftAligner}>
            <ScaleView notes={Scale.get('c major').notes} highlightedNotes={[0, 2, 4]} />
          </div>
          <div className={leftAligner}>
            <ScaleView notes={Scale.get('c chromatic').notes} highlightedNotes={[0, 4, 7]} />
          </div>
        </CardContent>
      </Card>
    )
  }
}
