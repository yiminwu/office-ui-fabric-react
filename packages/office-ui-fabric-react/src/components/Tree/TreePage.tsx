import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';


export class TreePage extends React.Component<IComponentDemoPageProps, any> {
  public render() {
    return (
      <ComponentPage
        title='Tree'
        componentName='TreeExample'
        exampleCards={
          <div>
            Test
          </div>
        }

        overview={
          <div>
            <p>Tree overview</p>
          </div>
        }
        bestPractices={
          <div></div>
        }
        dos={
          <div>
            <ul>
              <li></li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li></li>
            </ul>
          </div>
        }
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }
}
