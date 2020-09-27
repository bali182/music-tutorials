import React, { Fragment, PureComponent } from 'react'
import { colors } from '../../constants'
import { FretboardModelUtil } from '../FretboadModelUtil'
import { FretboardContext } from '../FretboardContext'
import { shape1, shape2, shape3, shape4, shape5 } from './tuples'

export class PentatonicShape extends PureComponent {
  private renderPolygon(util: FretboardModelUtil, tuples: [number, number][], color: string) {
    return tuples.map(([fretA, fretB], index) => {
      const { markerRadius, stringSpacing } = util.getTheme()
      const string = util.getStringByIndex(index)
      const baseY = util.getMarkerY(string.id)
      const x1 = util.getMarkerX(fretA) + markerRadius
      const x2 = util.getMarkerX(fretB) + markerRadius
      return (
        <rect
          key={string.id}
          x={x1}
          y={Math.ceil(baseY - markerRadius / 2)}
          width={x2 - x1}
          height={stringSpacing}
          fill={color}
          opacity={0.5}
        />
      )
    })
  }

  render() {
    return (
      <FretboardContext.Consumer>
        {({ util }) => (
          <Fragment>
            {this.renderPolygon(util, shape1, colors.blue)}
            {this.renderPolygon(util, shape2, colors.red)}
            {this.renderPolygon(util, shape3, colors.green)}
            {this.renderPolygon(util, shape4, colors.purple)}
            {this.renderPolygon(util, shape5, colors.orange)}
          </Fragment>
        )}
      </FretboardContext.Consumer>
    )
  }
}
