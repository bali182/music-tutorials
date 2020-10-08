import { faCog, faCogs } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { css } from 'emotion'
import { isNil } from 'lodash'
import React, { PureComponent } from 'react'
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom'
import { ConfigurationDialog } from '../configuration/ConfigurationDialog'
import { EmptyConfig } from '../configuration/EmptyConfig'
import { FallbackPage } from '../pages/FallbackPage'
import { Button, ButtonKind } from '../ux/Button'
import { Dialog } from '../ux/Dialog'
import { Header } from '../ux/Header'
import { DocumentTitle } from '../ux/PageTitle'
import { Title } from '../ux/Title'
import { flatRoutes, RouteDescriptor } from './routes'

const pageContentStyle = css({
  label: 'pageContent',
  width: '100%',
  height: '100vh',
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'column',
})

const titleStyle = css({
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: '1px',
})

type PageContentState = {
  isConfigurationOpen: boolean
}

export class _PageContent extends PureComponent<RouteComponentProps, PageContentState> {
  state: PageContentState = {
    isConfigurationOpen: false,
  }

  private getPageTitle(route: RouteDescriptor) {
    return route?.label || 'Unknown page'
  }
  private getActiveRoute(): RouteDescriptor {
    const { location } = this.props
    return flatRoutes.find((route) => route.id === location.pathname)
  }
  private onConfigurationOpened = () => {
    this.setState({ isConfigurationOpen: true })
  }
  private onConfigurationClosed = () => {
    this.setState({ isConfigurationOpen: false })
  }
  private onConfigurationSaved = (id: string) => (value: any) => {
    localStorage.setItem(id, JSON.stringify(value))
    this.onConfigurationClosed()
  }

  private renderRoutes(configuration: any) {
    return flatRoutes.map((route) => (
      <Route
        key={route.id}
        path={route.id}
        exact={true}
        render={() => (isNil(route.component) ? <FallbackPage /> : <route.component configuration={configuration} />)}
      />
    ))
  }
  private renderConfigButton(route: RouteDescriptor) {
    if (isNil(route?.configComponent)) {
      return null
    }
    return (
      <Button icon={faCog} grow={false} kind={ButtonKind.Primary} onClick={this.onConfigurationOpened}>
        Configure
      </Button>
    )
  }
  private renderConfigDialog(route: RouteDescriptor, configuration: any) {
    const { isConfigurationOpen } = this.state
    if (isNil(route?.configComponent)) {
      return null
    }
    return (
      <ConfigurationDialog
        value={configuration}
        isOpen={isConfigurationOpen}
        ConfigComponent={route.configComponent}
        onClose={this.onConfigurationClosed}
        onSave={this.onConfigurationSaved(route.id)}
      />
    )
  }
  private renderContent(route: RouteDescriptor, config: any) {
    const { isConfigurationOpen } = this.state
    if (isConfigurationOpen) {
      return null
    }
    if (
      !isConfigurationOpen &&
      !isNil(route?.configComponent) &&
      !isNil(route?.isConfigValid) &&
      !route.isConfigValid(config)
    ) {
      return <EmptyConfig label="Click here to configure the tool!" onClick={this.onConfigurationOpened} />
    }
    return this.renderRoutes(config)
  }
  render() {
    const route = this.getActiveRoute()
    const config = JSON.parse(localStorage.getItem(route?.id))
    return (
      <div className={pageContentStyle}>
        <DocumentTitle title={route?.label} />
        <Header>
          <Title className={titleStyle}>{this.getPageTitle(route)}</Title>
          {this.renderConfigButton(route)}
        </Header>
        {this.renderConfigDialog(route, config)}
        <Switch>
          {this.renderContent(route, config)}
          <Route path="/" exact={true} component={FallbackPage} />
        </Switch>
      </div>
    )
  }
}

export const PageContent = withRouter(_PageContent)
