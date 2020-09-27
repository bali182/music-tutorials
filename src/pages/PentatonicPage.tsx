import React, { PureComponent } from 'react'
import { Card } from '../ux/Card'
import { CardContent, ContentDirection } from '../ux/CardContent'
import { sixGuitarStrings } from '../ux/Fretboard/defaultStrings'
import { defaultTheme } from '../ux/Fretboard/defaultTheme'
import { Fretboard } from '../ux/Fretboard/Fretboard'
import { FretboardModel, FretboardOrientation } from '../ux/Fretboard/FretboardModel'
import { allPentatonicMarkers } from '../ux/Fretboard/pentatonic/markers'
import { PentatonicShape } from '../ux/Fretboard/pentatonic/PentatonicShape'

export class PentatonicPage extends PureComponent {
  render() {
    const model: FretboardModel = {
      strings: sixGuitarStrings,
      firstVisibleFret: 1,
      lastVisibleFret: 14,
      id: 'pentatonic',
      markers: allPentatonicMarkers,
      orientation: FretboardOrientation.RightHanded,
      type: 'fretboard',
    }
    return (
      <Card>
        <CardContent direction={ContentDirection.Vertical}>
          <Fretboard pure={true} model={model} theme={defaultTheme}>
            <PentatonicShape />
          </Fretboard>
        </CardContent>
      </Card>
    )
  }
}
