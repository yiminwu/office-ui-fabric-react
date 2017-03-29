import * as React from 'react';
import { ColorTable } from '../../../components/ColorTable/ColorTable';
import { PageHeader } from '../../../components/PageHeader/PageHeader';
import { Table } from '../../../components/Table/Table';
const styles: any = require('./ColorsPage.module.scss');
const pageStyles: any = require('../../PageStyles.module.scss');
import { baseURL } from '../../../appConfig';

const accentColorsData = require('json!../../../data/colors-accent.json');
const colorClassesData = require('json!../../../data/colors-classes.json');
const neutralColorsData = require('json!../../../data/colors-neutral.json');
const themeColorsData = require('json!../../../data/colors-theme.json');

export class ColorsPage extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <PageHeader
          pageTitle='Colors'
          links={
            [
              {
                'text': 'Overview',
                'location': 'overview'
              },
              {
                'text': 'Implementation',
                'location': 'implementation'
              },
              {
                'text': 'Palettes',
                'location': 'palettes'
              }
            ]
          }
          backgroundColor='#006f94'
        />
        <div className={ pageStyles.u_maxTextWidth }>
          <h2 id='Overview'>Overview</h2>
          <p>Fabric includes 9 theme colors and 11 neutral colors. Each has helper classes for text, background, border, and hover states. When selecting colors, refer to the <a href={ baseURL + 'https://static2.sharepointonline.com/files/fabric/fabric-website/files/ColorAccessibility_29Sep2016.pdf' }>color accessibility guidance (PDF)</a> to ensure that your text can be ready by everyone.</p>
        </div>
        <h2 id='implementation'>Implementation</h2>
        <p>Colors can be applied to text, backgrounds, or borders using the following class name conventions:</p>
        <Table content={ colorClassesData } />

        <h2 id='palettes'>Color palettes</h2>

        <div className='ms-Grid ms-Grid--wide'>
          <div className='ms-Grid-row'>
            <div className='ms-Grid-col ms-u-sm12 ms-u-xl6'>
              <h3>Theme colors</h3>
              <ColorTable content={ themeColorsData } />
            </div>
            <div className='ms-Grid-col ms-u-sm12 ms-u-xl6'>
              <h3>Neutral colors</h3>
              <ColorTable content={ neutralColorsData } />
            </div>
          </div>
        </div>

        <h3>Accent colors</h3>
        <div className='ms-Grid ms-Grid--wide'>
          <div className='ms-Grid-row'>
            { accentColorsData.map((group, groupIndex) => (
              <div className='ms-Grid-col ms-u-sm12 ms-u-xl4 ms-u-xxl3'
                key={ groupIndex }>
                <div className={ styles.accentGroup }>
                  <h4>{ group.name }</h4>
                  <ColorTable content={ group.colors } />
                </div>
              </div>
            )) }
          </div>
        </div>
      </div>
    );
  }
}
