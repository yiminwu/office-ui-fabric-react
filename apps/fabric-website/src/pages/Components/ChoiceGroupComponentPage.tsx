import * as React from 'react';
import { ChoiceGroupPage } from 'office-ui-fabric-react/lib/components/ChoiceGroup/ChoiceGroupPage';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { ComponentPage } from '../../components/ComponentPage/ComponentPage';

export class ChoiceGroupComponentPage extends React.Component<any, any> {
  public render() {
    return (
      <div ref='pageElement'>
        <ComponentPage>
          <PageHeader pageTitle='ChoiceGroup' backgroundColor='#038387'
            links={
              [
                {
                  'text': 'Overview',
                  'location': 'Overview'
                },
                {
                  'text': 'Variants',
                  'location': 'Variants'
                },
                {
                  'text': 'Implementation',
                  'location': 'Implementation'
                }
              ]
            } />
          <ChoiceGroupPage isHeaderVisible={ false } />
        </ComponentPage>
      </div>
    );
  }
}
