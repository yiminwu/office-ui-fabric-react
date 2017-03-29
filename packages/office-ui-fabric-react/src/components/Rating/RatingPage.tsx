import * as React from 'react';
import {
  ExampleCard,
  ComponentPage,
  IComponentDemoPageProps,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { RatingBasicExample } from './examples/Rating.Basic.Example';

const RatingBasicExampleCode = require('!raw-loader!./examples/Rating.Basic.Example.tsx') as string;

export class RatingPage extends React.Component<IComponentDemoPageProps, {}> {
  public render() {
    return (
      <ComponentPage
        title='Rating'
        componentName='RatingExample'
        exampleCards={
          <ExampleCard title='Rating' code={ RatingBasicExampleCode }>
            <RatingBasicExample />
          </ExampleCard>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/lib/components/Rating/Rating.Props.ts')
            ] }
          />
        }
        overview={
          <div>
            <p>
              Ratings provide insight regarding others’ opinions and experiences with a product, helping users make more-informed purchasing decisions. Users can also rate products they’ve purchased.
            </p>
          </div>
        }
        bestPractices={
          <div></div>
        }
        dos={
          <div>
            <ul>
              <li>Make it clear which product the rating pertains to by making sure the layout and grouping are clear when several products are on the page.</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Don’t use the rating component for data that has a continuous range, such as the brightness of a photo. Instead, use a slider.</li>
            </ul>
          </div>
        }
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }
}
