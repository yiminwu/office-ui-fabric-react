import * as React from 'react';
import { DocumentCardPage } from 'office-ui-fabric-react/lib/components/DocumentCard/DocumentCardPage';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { ComponentPage } from '../../components/ComponentPage/ComponentPage';

export class DocumentCardComponentPage extends React.Component<any, any> {
  public render() {
    return (
      <div ref='pageElement'>
        <ComponentPage>
          <PageHeader pageTitle='DocumentCard' backgroundColor='#038387'
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
          <DocumentCardPage isHeaderVisible={ false } />
        </ComponentPage>
      </div>
    );
  }
}
