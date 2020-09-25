import { css } from 'emotion'
import { isNil, startsWith } from 'lodash'
import React, { PureComponent } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { colors, spacing } from '../ux/constants'
import { SidePanel } from '../ux/SidePanel'
import { Tree } from '../ux/Tree'
import { TreeItem } from '../ux/TreeItem'
import { routes, RouteDescriptor, flatRoutes } from './routes'

type NavigationPanelProps = RouteComponentProps

type NavigationPanelState = {
  treeState: { [id: string]: boolean }
}

const headerStyle = css({
  padding: spacing.s,
  borderBottomColor: colors.lightGray,
  borderBottomStyle: 'solid',
  borderBottomWidth: '1px',
  height: '80px',
})

const titleStyle = css({
  fontWeight: 'bold',
  fontSize: '2em',
  marginBottom: spacing.xs,
})

const subtitleStyle = css({
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
    treeState: this.buildTreeState(),
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
          <h1 className={titleStyle}>Guitar</h1>
          <h2 className={subtitleStyle}>Practice, theory, ear training</h2>
        </div>
        <div className={scrollAreaStyle}>
          <Tree>{this.renderTreeItems(routes, 0)}</Tree>
        </div>
      </SidePanel>
    )
  }

  private buildTreeState(): { [id: string]: boolean } {
    const { location } = this.props
    return flatRoutes
      .filter((route) => startsWith(location.pathname, route.id))
      .reduce((routes, { id }) => ({ ...routes, [id]: true }), {})
  }
}

export const NavigationPanel = withRouter(_NavigationPanel)
