import { isNil } from 'lodash'
import React, { PureComponent } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { SidePanel } from '../ux/SidePanel'
import { Tree } from '../ux/Tree'
import { TreeItem } from '../ux/TreeItem'
import { routes, RouteDescriptor } from './routes'

type NavigationPanelProps = RouteComponentProps

type NavigationPanelState = {
  treeState: { [id: string]: boolean }
}

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
        <Tree>{this.renderTreeItems(routes, 0)}</Tree>
      </SidePanel>
    )
  }
}

export const NavigationPanel = withRouter(_NavigationPanel)
