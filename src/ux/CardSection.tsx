import React, { PureComponent, ReactNode, Children } from 'react'
import { css } from 'emotion'
import { CardContainer } from './CardContainer'
import { Headline } from './Headline'

const cardSectionStyle = css({
  label: 'card-section',
  display: 'flex',
  flexDirection: 'column',
})

type CardContainerProps = {
  children: ReactNode
  itemsPerRow: number
  title: string
}

export class CardSection extends PureComponent<CardContainerProps> {
  render() {
    const { children, itemsPerRow, title } = this.props
    return (
      <div className={cardSectionStyle}>
        <Headline text={title} alignment="left" />
        <CardContainer itemsPerRow={itemsPerRow}>{children}</CardContainer>
      </div>
    )
  }
}
