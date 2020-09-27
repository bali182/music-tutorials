import { css } from 'emotion'
import React, { PureComponent } from 'react'
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom'
import { Header } from '../ux/Header'
import { Title } from '../ux/Title'
import { flatRoutes } from './routes'

const pageContentStyle = css({
  label: 'pageContent',
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

export class _PageContent extends PureComponent<RouteComponentProps> {
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
      <div className={pageContentStyle}>
        <Header>
          <Title>{this.getPageTitle()}</Title>
        </Header>
        <Switch>
          {this.renderRoutes()}
          <Route path="/" exact={true} component={FallbackRoute} />
        </Switch>
      </div>
    )
  }
}

export const PageContent = withRouter(_PageContent)
