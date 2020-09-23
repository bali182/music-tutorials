import { css } from 'emotion'
import React, { PureComponent } from 'react'
import { Route, Switch } from 'react-router-dom'
import { colors } from '../ux/constants'
import { flatRoutes } from './routes'

const contentStyle = css({
  label: 'content',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  alignContent: 'center',
  justifyContent: 'center',
  justifyItems: 'center',
  backgroundColor: colors.lightGreen,
})

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
      <div className={contentStyle}>
        <Switch>
          {this.renderRoutes()}
          <Route path="/" exact={true} component={FallbackRoute} />
        </Switch>
      </div>
    )
  }
}
