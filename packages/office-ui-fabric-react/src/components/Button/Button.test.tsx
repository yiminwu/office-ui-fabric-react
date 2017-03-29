/* tslint:disable:no-unused-variable */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
/* tslint:enable:no-unused-variable */

import * as ReactTestUtils from 'react-addons-test-utils';
import { Button } from './Button';

let { expect } = chai;

describe('Button', () => {

  it('can render without an onClick.', () => {
    const button = ReactTestUtils.renderIntoDocument<any>(
      <Button>Hello</Button>
    );
    const renderedDOM = ReactDOM.findDOMNode(button as React.ReactInstance);
    console.log(renderedDOM.tagName);
    expect(renderedDOM.tagName).equals('BUTTON', 'A Button with no onClick renders as a span');
  });

  it('can render with an onClick.', () => {
    let onClick = () => null;

    const button = ReactTestUtils.renderIntoDocument<any>(
      <Button onClick={ onClick }>Hello</Button>
    );
    const renderedDOM = ReactDOM.findDOMNode(button as React.ReactInstance);
    console.log(renderedDOM.tagName);
    expect(renderedDOM.tagName).equals('BUTTON', 'A Button with onClick renders as a button');
  });

  it('can render with an href', () => {
    const button = ReactTestUtils.renderIntoDocument<any>(
      <Button href='http://www.microsoft.com' target='_blank'>Hello</Button>
    );
    const renderedDOM = ReactDOM.findDOMNode(button as React.ReactInstance);
    console.log(renderedDOM.tagName);
    expect(renderedDOM.tagName).equals('A', 'A Button with an href renders as an anchor');
  });

});
