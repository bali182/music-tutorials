import { css } from 'emotion'
import React, { PureComponent } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { Content } from './Content'
import { NavigationPanel } from './NavigationPanel'

const appStyle = css({
  label: 'app',
  display: 'flex',
  flexDirection: 'row',
})

export class App extends PureComponent {
  render() {
    return (
      <HashRouter>
        <div className={appStyle}>
          <NavigationPanel />
          <Content />
        </div>
      </HashRouter>
    )
  }
}
