import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { DatePickerBasicExample } from './examples/DatePicker.Basic.Example';
import { DatePickerRequiredExample } from './examples/DatePicker.Required.Example';
import { DatePickerInputExample } from './examples/DatePicker.Input.Example';

const DatePickerBasicExampleCode = require('!raw-loader!./examples/DatePicker.Basic.Example.tsx') as string;
const DatePickerRequiredExampleCode = require('!raw-loader!./examples/DatePicker.Required.Example.tsx') as string;
const DatePickerInputExampleCode = require('!raw-loader!./examples/DatePicker.Input.Example.tsx') as string;

export class DatePickerPage extends React.Component<IComponentDemoPageProps, {}> {
  public render() {
    return (
      <ComponentPage
        title='DatePicker'
        componentName='DatePickerExample'
        exampleCards={
          <div>
            <ExampleCard title='DatePicker' code={ DatePickerBasicExampleCode }>
              <DatePickerBasicExample />
            </ExampleCard>
            <ExampleCard title='DatePicker as required field' code={ DatePickerRequiredExampleCode }>
              <DatePickerRequiredExample />
            </ExampleCard>
            <ExampleCard title='DatePicker allows input date string' code={ DatePickerInputExampleCode }>
              <DatePickerInputExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/lib/components/DatePicker/DatePicker.Props.ts')
            ] }
          />
        }
        overview={
          <div>
            <p>
              The DatePicker component enables a user to pick a date value.
            </p>
          </div>
        }
        bestPractices={
          <div></div>
        }
        dos={
          <div>
            <ul>
              <li>Use the control as a single entity.</li>
              <li>Set the default date to the current date unless a specific date is required for context (e.g. the date of the conference).</li>
              <li>The control is designed to resize relative to available screen width. Allow it to render in either wide or narrow as appropriate.</li>
              <li>When the control is engaged, the DatePicker renders as a flyout and has defined widths (300px -narrow and 440px – wide). Plan your UI implementation accordingly.</li>
              <li>The control renders date in a specific format. If allowing for manual entry of date, provide helper text in the appropriate format.</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Don't attempt to break apart year from month/day selectors. If granularity is required, use the Dropdown control or something similar.</li>
              <li>Don't attempt to force resize the control in any way.</li>
              <li>Don't force the control to render one mode vs. the other (year or month/day)</li>
              <li>The flyout selector is a light dismiss control. Don't modify this behavior in any way.</li>
            </ul>
          </div>
        }
        related={
          <a href='https://dev.office.com/fabric-js/Components/DatePicker/DatePicker.html'>Fabric JS</a>
        }
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }

}
