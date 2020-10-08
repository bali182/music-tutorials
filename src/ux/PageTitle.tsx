import React, { Component } from 'react'

interface DocumentTitleProps {
  title: string
}

export class DocumentTitle extends Component<DocumentTitleProps> {
  private oldTitle: string = document.title

  componentWillUnmount(): void {
    document.title = this.oldTitle
  }

  render() {
    document.title = this.props.title
    return null
  }
}
