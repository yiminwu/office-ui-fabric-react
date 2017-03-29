import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { IButtonProps } from './IButtonProps';

export class ButtonContextualMenuExample extends React.Component<IButtonProps, {}> {
  public render() {
    let { disabled } = this.props;

    return (
      <div className='ms-ContextualMenuButtonsExample'>
        <div>
          <DefaultButton
            data-automation-id='test'
            disabled={ disabled }
            icon='Add'
            text='New'
            menuProps={ {
              items: [
                {
                  key: 'emailMessage',
                  name: 'Email message',
                  icon: 'Mail'
                },
                {
                  key: 'calendarEvent',
                  name: 'Calendar event',
                  icon: 'Calendar'
                }
              ]
            }
            }
          >
          </DefaultButton>
        </div>
      </div>
    );
  }
}