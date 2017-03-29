/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-addons-test-utils';

let { expect } = chai;

import { Slider } from './Slider';

describe('Slider', () => {

  it('renders a slider', () => {
    let component = ReactTestUtils.renderIntoDocument(
      <Slider label='slider' />
    );
    let renderedDOM = ReactDOM.findDOMNode(component as React.ReactInstance);
    let labelElement = renderedDOM.querySelector('.ms-Label');

    expect(labelElement.textContent).to.equal('slider');
  });

  it('can slide to default min/max and execute onChange', () => {
    let changedValue;
    let onChange = (val) => {
      changedValue = val;
    };
    let component = ReactTestUtils.renderIntoDocument<React.ReactInstance>(
      <Slider
        onChange={ onChange }
        />
    );

    let renderedDOM = ReactDOM.findDOMNode(component as React.ReactInstance);
    let sliderLine = renderedDOM.querySelector('.ms-Slider-line');
    let sliderThumb = renderedDOM.querySelector('.ms-Slider-slideBox');

    sliderLine.getBoundingClientRect = () => ({
      left: 0,
      top: 0,
      right: 100,
      bottom: 40,
      width: 100,
      height: 40
    });

    ReactTestUtils.Simulate.mouseDown(sliderThumb, {
      type: 'mousedown',
      clientX: 100,
      clientY: 0
    });

    // Default max is 10.
    expect(changedValue).equals(10);

    ReactTestUtils.Simulate.mouseDown(sliderThumb, {
      type: 'mousedown',
      clientX: 0,
      clientY: 0
    });

    // Default min is 0.
    expect(changedValue).equals(0);
  });

  it('has type=button on all buttons', () => {
    let component = ReactTestUtils.renderIntoDocument<React.ReactInstance>(
      <Slider />
    );

    let renderedDOM = ReactDOM.findDOMNode(component as React.ReactInstance);
    let allButtons = renderedDOM.querySelectorAll('button');

    for (let i = 0; i < allButtons.length; i++) {
      let button = allButtons[i];

      expect(button.getAttribute('type')).equals('button');
    }
  });

});
