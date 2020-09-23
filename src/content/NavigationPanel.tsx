import { css } from 'emotion'
import { isNil } from 'lodash'
import React, { PureComponent } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { colors, gradients, shadow, spacing } from '../ux/constants'
import { SidePanel } from '../ux/SidePanel'
import { Tree } from '../ux/Tree'
import { TreeItem } from '../ux/TreeItem'
import { routes, RouteDescriptor } from './routes'

type NavigationPanelProps = RouteComponentProps

type NavigationPanelState = {
  treeState: { [id: string]: boolean }
}

const headerStyle = css({
  padding: spacing.s,
  backgroundColor: colors.blue,
})

const titleStyle = css({
  color: colors.white,
  fontWeight: 'bold',
  fontSize: '2em',
  marginBottom: spacing.xs,
})

const subtitleStyle = css({
  color: colors.white,
  fontWeight: 'normal',
  opacity: 0.9,
})

const scrollAreaStyle = css({
  overflowY: 'auto',
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: '1px',
})

export class _NavigationPanel extends PureComponent<NavigationPanelProps, NavigationPanelState> {
  state = {
    treeState: {},
  }

  private onRouteSelected = (route: string) => {
    const { history } = this.props
    history.push(route)
    this.onRouteToggled(route, true)
  }

  private onRouteToggled = (route: string, isOpen: boolean) => {
    this.setState({ treeState: { ...this.state.treeState, [route]: isOpen } })
  }

  private renderTreeItems(routes: RouteDescriptor[], level: number) {
    return routes.map((route) => this.renderTreeItem(route, level))
  }

  private renderTreeItem(route: RouteDescriptor, level: number) {
    const isParent = !isNil(route.children) && route.children.length > 0
    const { location } = this.props
    const { treeState } = this.state
    return (
      <TreeItem
        key={route.id}
        id={route.id}
        isOpen={Boolean(treeState[route.id])}
        isActive={location.pathname === route.id}
        level={level}
        label={route.label}
        onSelect={this.onRouteSelected}
        onToggle={this.onRouteToggled}
        isParent={isParent}>
        {isParent ? this.renderTreeItems(route.children, level + 1) : null}
      </TreeItem>
    )
  }

  render() {
    return (
      <SidePanel>
        <div className={headerStyle}>
          <h1 className={titleStyle}>Balázs Édes</h1>
          <h2 className={subtitleStyle}>Guitar and music theory</h2>
        </div>
        <div className={scrollAreaStyle}>
          <Tree>{this.renderTreeItems(routes, 0)}</Tree>
        </div>
      </SidePanel>
    )
  }
}

export const NavigationPanel = withRouter(_NavigationPanel)
