import { css } from 'emotion'
import React, { PureComponent } from 'react'
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom'
import { CardHeader } from '../ux/CardHeader'
import { CardTitle } from '../ux/CardTitle'
import { flatRoutes } from './routes'

const contentStyle = css({
  label: 'content',
  width: '100%',
  height: '100vh',
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'column',
})

class FallbackRoute extends PureComponent {
  render() {
    return <div>Working on it :)</div>
  }
}

export class _Content extends PureComponent<RouteComponentProps> {
  private renderRoutes() {
    return flatRoutes.map((route) => (
      <Route key={route.id} path={route.id} exact={true} component={route.component || FallbackRoute} />
    ))
  }
  private getPageTitle() {
    const { location } = this.props
    return flatRoutes.find((route) => route.id === location.pathname)?.label || 'Unknown page'
  }
  render() {
    return (
      <div className={contentStyle}>
        <CardHeader>
          <CardTitle>{this.getPageTitle()}</CardTitle>
        </CardHeader>
        <Switch>
          {this.renderRoutes()}
          <Route path="/" exact={true} component={FallbackRoute} />
        </Switch>
      </div>
    )
  }
}

export const Content = withRouter(_Content)
