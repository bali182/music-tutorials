import {
  FretboardModel,
  StringModel,
  MarkerModel,
  MarkerKind,
  FretboardTheme,
  FretboardOrientation,
  SelectionModel,
} from './FretboardModel'
import head from 'lodash/head'
import last from 'lodash/last'
import isNil from 'lodash/isNil'
import range from 'lodash/range'
import {
  isMarkerSelection,
  isFretboardSelection,
  isStringSelection,
  isInterpolatedStringThicknessModel,
  isUniformStringThicknessModel,
} from './TypeGuards'

type MarkerMap = {
  [stringId: string]: { [fret: number]: MarkerModel }
}

type StringIndexMap = {
  [stringId: string]: number
}

export class FretboardModelUtil {
  private readonly model: FretboardModel
  private readonly theme: FretboardTheme
  private readonly markerMap: MarkerMap
  private readonly stringMap: StringIndexMap
  private readonly pure: boolean
  private readonly _hasUnfrettedMarker: boolean
  private readonly selection: SelectionModel
  private readonly hoverSelection: SelectionModel

  constructor(
    model: FretboardModel,
    theme: FretboardTheme,
    selection: SelectionModel,
    hoverSelection: SelectionModel,
    pure: boolean
  ) {
    this.model = model
    this.theme = theme
    this.pure = pure
    this.selection = selection
    this.hoverSelection = hoverSelection

    this.markerMap = this.buildMarkerMap()
    this.stringMap = this.buildStringMap()
    this._hasUnfrettedMarker = this.computeHasUnfrettedMarker()
  }

  private buildMarkerMap(): MarkerMap {
    const { markers } = this.getModel()
    const map: MarkerMap = {}
    for (let i = 0; i < markers.length; i += 1) {
      const marker = markers[i]
      if (isNil(map[marker.stringId])) {
        map[marker.stringId] = {}
      }
      map[marker.stringId][marker.fret] = marker
    }
    return map
  }

  private buildStringMap(): StringIndexMap {
    const { strings } = this.getModel()
    return strings.reduce((map: StringIndexMap, model, index) => ({ ...map, [model.id]: index }), {})
  }

  getFretLabelY(): number {
    const theme = this.getTheme()
    if (this.isFretLabelVisible()) {
      return theme.fretLabelFontSize / 2
    }
    return null
  }

  getFretLabelX(): number {
    const model = this.getModel()
    if (this.isFretLabelVisible()) {
      return this.getFretWireX(model.firstVisibleFret)
    }
    return null
  }

  getTopOverhang(): number {
    const theme = this.getTheme()
    const topStringThickness = this.getTopStringThickness()
    const fretLabelPadding = this.isFretLabelVisible() ? theme.fretLabelFontSize * 1.2 : 0
    return Math.max(Math.round(topStringThickness / 2), theme.markerRadius, fretLabelPadding)
  }

  private getBottomOverhang(): number {
    const theme = this.getTheme()
    const bottomStringThickness = this.getBottomStringThickness()
    return Math.max(bottomStringThickness / 2, theme.markerRadius)
  }

  private computeHasUnfrettedMarker(): boolean {
    const model = this.getModel()
    return model.markers.some((marker) => marker.fret === 0)
  }

  private hasUnfrettedMarker() {
    return this._hasUnfrettedMarker
  }

  private getUnfrettedMarkerSpace(): number {
    const theme = this.getTheme()
    if (this.hasUnfrettedMarker() || !this.isPure()) {
      // A full marker width plus a half so there's space between the marker and the nut
      return theme.markerRadius * 2 + theme.markerToNutSpace
    }
    return 0
  }

  private getVisibleNutWidth(): number {
    const theme = this.getTheme()
    return this.isNutVisible() ? theme.nutWidth : 0
  }

  private getStartOverhang(): number {
    const theme = this.getTheme()
    return this.isNutVisible() ? 0 : theme.stringOverhang
  }

  private getEndOverhang(): number {
    const theme = this.getTheme()
    return theme.stringOverhang
  }

  private getNormalizedFretIndex(fret: number): number {
    const model = this.getModel()
    if (model.firstVisibleFret === 0) {
      return fret
    }
    return Math.max(0, fret - model.firstVisibleFret)
  }

  getSelection(): SelectionModel {
    return this.selection
  }

  getHoverSelection(): SelectionModel {
    return this.hoverSelection
  }

  getModel(): FretboardModel {
    return this.model
  }

  getTheme(): FretboardTheme {
    return this.theme
  }

  isPure(): boolean {
    return this.pure
  }

  isFretLabelVisible(): boolean {
    return this.getTheme().showFretLabel && this.getModel().firstVisibleFret > 0
  }

  private getMarkerColor(kind: MarkerKind): string {
    const theme = this.getTheme()
    switch (kind) {
      case MarkerKind.Pimary:
        return theme.primaryMarkerColor
      default:
        return theme.defaultMarkerColor
    }
  }

  getMarkerFillColor(marker: MarkerModel): string {
    if (marker.muted) {
      return 'none'
    }
    if (marker.fret === 0) {
      return 'rgba(255, 255, 255, 0.01)'
    }
    return this.getMarkerColor(marker.kind)
  }

  getMarkerStrokeColor(marker: MarkerModel): string {
    if (!marker.muted && marker.fret > 0) {
      return 'none'
    }
    return this.getMarkerColor(marker.kind)
  }

  getMarkerStrokeWidth(marker: MarkerModel): number {
    const theme = this.getTheme()
    if (marker.muted) {
      return theme.mutedMarkerStrokeWidth
    }
    if (marker.fret === 0) {
      return theme.hollowMarkerStrokeWidth
    }
    return 0
  }

  getMarkerFontColor(marker: MarkerModel): string {
    const theme = this.getTheme()
    if (marker.muted) {
      return null
    }
    if (marker.fret === 0) {
      return this.getMarkerColor(marker.kind)
    }
    switch (marker.kind) {
      case MarkerKind.Pimary:
        return theme.primaryMarkerFontColor
      default:
        return theme.defaultMarkerFontColor
    }
  }

  getMarkerFontSize(marker: MarkerModel): number {
    const theme = this.getTheme()
    if (marker.muted) {
      return null
    }
    return theme.markerFontSize
  }

  getMarkerFontFamily(marker: MarkerModel): string {
    const theme = this.getTheme()
    return theme.markerFontFamily
  }

  protected getMarkerMap(): MarkerMap {
    return this.markerMap
  }

  getStringIds(): string[] {
    const model = this.getModel()
    return model.strings.map((string) => string.id)
  }

  getFrets(forMarker: boolean): number[] {
    const model = this.getModel()
    if (model.firstVisibleFret === 0) {
      return range(model.firstVisibleFret, model.lastVisibleFret + 1)
    }
    const needsZeroFret = !this.isPure() || this.hasUnfrettedMarker()
    const firstVisibleFret = forMarker ? model.firstVisibleFret + 1 : model.firstVisibleFret
    const defaultFrets = range(firstVisibleFret, model.lastVisibleFret + 1)
    return needsZeroFret ? [0].concat(defaultFrets) : defaultFrets
  }

  getViewportWidth(): number {
    const theme = this.getTheme()

    const fretCount = this.getFretCount()
    // No frets provided, nothing to do here
    if (fretCount <= 0) {
      return 0
    }

    const fretsWidth = fretCount * theme.fretWidth
    const endOverhangWidth = this.getEndOverhang()
    const startOverhangWidth = this.getStartOverhang()
    const nutWidth = this.getVisibleNutWidth()
    const unfrettedMarkerWidth = this.getUnfrettedMarkerSpace()

    return fretsWidth + startOverhangWidth + nutWidth + endOverhangWidth + unfrettedMarkerWidth
  }

  getViewportHeight(): number {
    const theme = this.getTheme()

    const stringsCount = this.getStringsCount()
    // No strings provided nothing to do here
    if (stringsCount === 0) {
      return 0
    }
    const stringsHeight = (stringsCount - 1) * theme.stringSpacing
    const topOverhang = this.getTopOverhang()
    const bottomOverhang = this.getBottomOverhang()
    return stringsHeight + topOverhang + bottomOverhang
  }

  getString(stringId: string): StringModel {
    const stringIndex = this.stringMap[stringId]
    const model = this.getModel()
    return isNil(stringIndex) ? null : model.strings[stringIndex]
  }

  getStringByIndex(index: number): StringModel {
    return this.model.strings[index]
  }

  getStringIndex(stringId: string): number {
    const stringIndex = this.stringMap[stringId]
    return isNil(stringIndex) ? null : stringIndex
  }

  getStringY(stringId: string): number {
    const theme = this.getTheme()
    const topOverhang = this.getTopOverhang()
    const index = this.getStringIndex(stringId)
    const basePosition = theme.stringSpacing * index
    return topOverhang + basePosition
  }
  getStringX1(stringId: string): number {
    const unfrettedMarkerSpace = this.getUnfrettedMarkerSpace()
    return unfrettedMarkerSpace
  }
  getStringX2(stringId: string): number {
    // TODO
    return this.getViewportWidth()
  }

  getStringAreaHeight(): number {
    const model = this.getModel()
    const theme = this.getTheme()
    return model.strings.length * theme.stringSpacing
  }

  private linearInterpolation(start: number, end: number, ratio: number): number {
    return Math.floor((1 - ratio) * start + ratio * end)
  }

  getStringThickness(stringId: string): number {
    const { stringThickness } = this.getTheme()
    if (isInterpolatedStringThicknessModel(stringThickness)) {
      const model = this.getModel()
      const index = this.getStringIndex(stringId)
      return this.linearInterpolation(
        stringThickness.topStringThickness,
        stringThickness.bottomStringThickness,
        index / model.strings.length
      )
    } else if (isUniformStringThicknessModel(stringThickness)) {
      return stringThickness.thickness
    }
    return 1
  }

  getTopStringThickness(): number {
    const model = this.getModel()
    return this.getStringThickness(head(model.strings).id)
  }

  getBottomStringThickness(): number {
    const model = this.getModel()
    return this.getStringThickness(last(model.strings).id)
  }

  getFretCount(): number {
    const model = this.getModel()

    return model.lastVisibleFret - model.firstVisibleFret
  }
  getStringsCount(): number {
    const model = this.getModel()

    return model.strings.length
  }

  getFretWireX(fret: number): number {
    const theme = this.getTheme()

    const fretIndex = this.getNormalizedFretIndex(fret)
    const baseXPosition = fretIndex * theme.fretWidth
    const nutWidth = this.isNutVisible() ? theme.nutWidth : 0
    const startOverhangWidth = this.isNutVisible() ? 0 : theme.stringOverhang
    const unfrettedMarkerSpace = this.getUnfrettedMarkerSpace()
    return baseXPosition + nutWidth + startOverhangWidth + unfrettedMarkerSpace
  }
  getFretWireY1(fret: number): number {
    return this.getTopOverhang()
  }
  getFretWireY2(fret: number): number {
    return this.getViewportHeight() - this.getBottomOverhang()
  }

  isNutVisible(): boolean {
    const model = this.getModel()

    return model.firstVisibleFret === 0
  }

  getNutX(): number {
    // TODO
    const theme = this.getTheme()
    const unfrettedMarkerSpace = this.getUnfrettedMarkerSpace()
    return theme.nutWidth / 2 + unfrettedMarkerSpace
  }
  getNutY1(): number {
    // TODO
    return this.getTopOverhang()
  }
  getNutY2(): number {
    // TODO
    return this.getViewportHeight() - this.getBottomOverhang()
  }

  getMarker(stringId: string, fret: number): MarkerModel {
    const markerMap = this.getMarkerMap()
    const mapForString = markerMap[stringId]
    if (isNil(mapForString)) {
      return null
    }
    const marker = mapForString[fret]
    return isNil(marker) ? null : marker
  }

  getMarkerX(fret: number): number {
    const model = this.getModel()
    const theme = this.getTheme()

    // Unfretted marker
    if (fret === 0) {
      return 0
    }
    // Fretted marker
    const fretsWidth = (fret - model.firstVisibleFret - 1) * theme.fretWidth
    const halfFretWidthToCenter = theme.fretWidth / 2
    const nutWidth = this.getVisibleNutWidth()
    const startOverhangWidth = this.getStartOverhang()
    const unfrettedMarkerSpace = this.getUnfrettedMarkerSpace()
    const adjustment = -theme.markerRadius

    return fretsWidth + halfFretWidthToCenter + nutWidth + startOverhangWidth + unfrettedMarkerSpace + adjustment
  }

  getMarkerY(stringId: string): number {
    const theme = this.getTheme()

    const stringIndex = this.getStringIndex(stringId)
    const singingsHeight = stringIndex * theme.stringSpacing
    const topOverhang = this.getTopOverhang()
    const adjustment = -theme.markerRadius

    return singingsHeight + topOverhang + adjustment
  }

  getOrientationTransform(): string {
    const model = this.getModel()
    return model.orientation === FretboardOrientation.LeftHanded ? 'scale(-1,1)' : undefined
  }

  getTextXMultiplier(): number {
    const model = this.getModel()
    return model.orientation === FretboardOrientation.LeftHanded ? -1 : 1
  }

  ifNotPure<T>(item: T): T {
    return this.isPure() ? null : item
  }

  isMarkerSelected(markerId: string): boolean {
    const selection = this.getSelection()
    return isMarkerSelection(selection) && selection.markerId === markerId
  }

  isMarkerHovered(markerId: string): boolean {
    const hoverSelection = this.getHoverSelection()
    return isMarkerSelection(hoverSelection) && hoverSelection.markerId === markerId
  }

  isStringSelected(stringId: string): boolean {
    const selection = this.getSelection()
    return isStringSelection(selection) && selection.stringId === stringId
  }

  isStringHovered(stringId: string): boolean {
    const selection = this.getHoverSelection()
    return isStringSelection(selection) && selection.stringId === stringId
  }

  isFretboardSelected(fretboard: FretboardModel): boolean {
    const selection = this.getSelection()
    return isFretboardSelection(selection)
  }
}
