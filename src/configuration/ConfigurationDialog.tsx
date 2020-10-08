import { css } from 'emotion'
import React, { ComponentType, PureComponent } from 'react'
import { Button, ButtonKind } from '../ux/Button'
import { spacing } from '../ux/constants'
import { Dialog } from '../ux/Dialog'
import { ConfiguratorProps } from './configurationTypes'

type ConfigurationDialogProps = {
  isOpen: boolean
  value: any
  onClose: () => void
  onSave: (value: any) => void
  ConfigComponent: ComponentType<ConfiguratorProps<any>>
}

type ConfigurationDialogState = {
  value: any
}

const buttonBarStyle = css({
  display: 'flex',
  flexDirection: 'row',
  marginTop: spacing.m,
})

const buttonStyle = css({
  ':first-of-type': {
    marginRight: spacing.xxs,
  },
  ':last-of-type': {
    marginLeft: spacing.xxs,
  },
})

export class ConfigurationDialog extends PureComponent<ConfigurationDialogProps, ConfigurationDialogState> {
  state = { value: this.props.value }

  componentDidUpdate(prevProps: ConfigurationDialogProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({ value: this.props.value })
    }
  }

  private onValueChanged = (value: any) => {
    this.setState({ value })
  }

  private onSave = () => {
    const { value } = this.state
    console.log('Saving config:', value)
    const { onSave } = this.props
    onSave(value)
  }

  private onClose = () => {
    const { onClose } = this.props
    onClose()
  }

  render() {
    const { isOpen, ConfigComponent } = this.props
    const { value } = this.state
    return (
      <Dialog open={isOpen} onClose={this.onClose} title="Configuration">
        <ConfigComponent onChange={this.onValueChanged} value={value} />
        <div className={buttonBarStyle}>
          <Button onClick={this.onSave} kind={ButtonKind.Primary} className={buttonStyle}>
            Save
          </Button>
          <Button onClick={this.onClose} kind={ButtonKind.Secondary} className={buttonStyle}>
            Cancel
          </Button>
        </div>
      </Dialog>
    )
  }
}
