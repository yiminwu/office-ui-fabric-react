import * as React from 'react';
import { Button } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';

export class PanelNonModalExample extends React.Component<any, any> {

  constructor() {
    super();
    this.state = {
      showPanel: false
    };
  }

  public render() {
    return (
      <div>
        <Button description='Opens the Sample Panel' onClick={ this._showPanel.bind(this) }>Open Panel</Button>
        <Panel
          isBlocking={ false }
          isOpen={ this.state.showPanel }
          onDismiss={ this._closePanel.bind(this) }
          type={ PanelType.medium }
          headerText='Non-Modal Panel'
          closeButtonAriaLabel='Close'
        >
          <span className='ms-font-m'>Content goes here.</span>
        </Panel>
      </div>
    );
  }

  private _showPanel() {
    this.setState({ showPanel: true });
  }
  private _closePanel() {
    this.setState({ showPanel: false });
  }
}
