import * as React from 'react';
import './ComponentPage.scss';

export interface IComponentPageProps extends React.Props<ComponentPage> {
}

export class ComponentPage extends React.Component<IComponentPageProps, {}> {
  public render() {
    return(
      <div className='ComponentPageWrapper'>
        { this.props.children }
      </div>
    );
  }
}