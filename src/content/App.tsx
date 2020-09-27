import { css } from 'emotion'
import React, { PureComponent } from 'react'
import { HashRouter } from 'react-router-dom'
import { PageContent } from './PageContent'
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
          <PageContent />
        </div>
      </HashRouter>
    )
  }
}
