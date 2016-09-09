import * as React from 'react';
import {
  Dropdown
} from '../../../../index';
import './Dropdown.Basic.Example.scss';

export class DropdownBasicExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='ms-DropdownBasicExample'>
        <Dropdown
          label='Basic example:'
          options={
            [
              { key: 'A', text: 'Option a' },
              { key: 'B', text: 'Option b' },
              { key: 'C', text: 'Option c' },
              { key: 'D', text: 'Option d' },
              { key: 'E', text: 'Option e' },
              { key: 'F', text: 'Option f' },
              { key: 'G', text: 'Option g' },
              { key: 'H', text: 'Option h', isSelected: true },
              { key: 'I', text: 'Option i' },
              { key: 'J', text: 'Option j' },
            ]
          }
        />

        <Dropdown
          label='Disabled example:'
          options={
            [
              { key: 'A', text: 'Option a' },
              { key: 'B', text: 'Option b', isSelected: true },
              { key: 'C', text: 'Option c' },
              { key: 'D', text: 'Option d' },
              { key: 'E', text: 'Option e' },
              { key: 'F', text: 'Option f' },
              { key: 'G', text: 'Option g' },
            ]
          }
          disabled={ true }
        />
      </div>
    );
  }

}
