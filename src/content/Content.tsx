import React, { PureComponent } from 'react'
import { Route, Switch } from 'react-router-dom'
import { flatRoutes } from './routes'

class FallbackRoute extends PureComponent {
  render() {
    return <div>Working on it :)</div>
  }
}

export class Content extends PureComponent {
  private renderRoutes() {
    return flatRoutes.map((route) => (
      <Route key={route.id} path={route.id} exact={true} component={route.component || FallbackRoute} />
    ))
  }
  render() {
    return (
      <Switch>
        {this.renderRoutes()}
        <Route path="/" exact={true} component={FallbackRoute} />
      </Switch>
    )
  }
}
