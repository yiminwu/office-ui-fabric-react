import * as React from 'react';
import './Slider.scss';
import { ISliderProps, ISlider } from './Slider.Props';
import { BaseComponent } from '../../common/BaseComponent';
import { KeyCodes } from '../../utilities/KeyCodes';
import { Label } from '../../Label';
import { css } from '../../utilities/css';
import { getRTL as isRTL, getRTLSafeKeyCode } from '../../utilities/rtl';
import { getId } from '../../utilities/object';
import { autobind } from '../../utilities/autobind';

export interface ISliderState {
  value?: number;
  renderedValue?: number;
}

export enum ValuePosition {
  Previous,
  Next
}

export class Slider extends BaseComponent<ISliderProps, ISliderState> implements ISlider {
  public static defaultProps: {} = {
    step: 1,
    min: 0,
    max: 10,
    showValue: true,
    disabled: false
  };

  public refs: {
    [key: string]: React.ReactInstance,
    root: HTMLElement,
    sliderLine: HTMLElement,
    thumb: HTMLElement
  };

  private _id: string;

  constructor(props?: ISliderProps) {
    super(props);

    this._id = getId('Slider');

    let value = props.value || props.defaultValue || props.min;

    this.state = {
      value: value,
      renderedValue: value
    };
  }

  /**
   * Invoked when a component is receiving new props. This method is not called for the initial render.
   */
  public componentWillReceiveProps(newProps: ISliderProps): void {

    if (newProps.value !== undefined) {
      let value = Math.max(newProps.min, Math.min(newProps.max, newProps.value));

      this.setState({
        value: value
      });
    }
  }

  public render(): React.ReactElement<{}> {
    const { min, max, label, showValue, disabled, className, ariaLabel } = this.props;
    const { value, renderedValue } = this.state;
    const thumbOffsetPercent: number = (renderedValue - min) / (max - min) * 100;

    const onMouseDownProp: {} = disabled ? {} : { onMouseDown: this._onMouseDownOrTouchStart };
    const onTouchStartProp: {} = disabled ? {} : { onTouchStart: this._onMouseDownOrTouchStart };
    const onKeyDownProp: {} = disabled ? {} : { onKeyDown: this._onKeyDown };

    return (
      <div
        className={ css('ms-Slider', className, {
          'ms-Slider-enabled': !disabled,
          'ms-Slider-disabled': disabled
        })}
        ref='root'>
        { label && (
        <Label { ...ariaLabel ? {} : {'htmlFor' : this._id} }>
          { label }
        </Label>
        ) }
        <div className='ms-Slider-container'>
          <div
            className={ css('ms-Slider-slideBox', {
              'ms-Slider-showValue': showValue,
              'ms-Slider-showTransitions': ( renderedValue === value )
            })}
            { ...disabled ? { } : { 'tabIndex': 0 } }
            id={ this._id }
            role='slider'
            aria-valuenow={ value }
            aria-valuemin={ min }
            aria-valuemax={ max }
            { ...onMouseDownProp }
            { ...onTouchStartProp }
            { ...onKeyDownProp }
            >
            <div
              ref='sliderLine'
              className='ms-Slider-line'
            >
              <span
                ref='thumb'
                className='ms-Slider-thumb'
                { ...ariaLabel ? { 'aria-label' : ariaLabel } : { } }
                style={ isRTL() ?
                  { 'right': thumbOffsetPercent + '%' } :
                  { 'left': thumbOffsetPercent + '%' } }
              />
              <span className='ms-Slider-active' style={ {'width': thumbOffsetPercent + '%'} }></span>
              <span className='ms-Slider-inactive' style={ {'width': (100 - thumbOffsetPercent) + '%'} }></span>
            </div>
          </div>
          { showValue && <label className='ms-Label ms-Slider-value'>{ value }</label> }
        </div>
      </div>
    ) as React.ReactElement<{}>;
  }

  public focus(): void {
      if (this.refs.thumb) {
          this.refs.thumb.focus();
      }
  }

  public get value(): number {
    return this.state.value;
  }

  @autobind
  private _onMouseDownOrTouchStart(event: MouseEvent | TouchEvent): void {
    if (event.type === 'mousedown') {
      this._events.on(window, 'mousemove', this._onMouseMoveOrTouchMove, true);
      this._events.on(window, 'mouseup', this._onMouseUpOrTouchEnd, true);
    } else if (event.type === 'touchstart') {
      this._events.on(window, 'touchmove', this._onMouseMoveOrTouchMove, true);
      this._events.on(window, 'touchend', this._onMouseUpOrTouchEnd, true);
    }

    this._onMouseMoveOrTouchMove(event, true);
  }

  @autobind
  private _onMouseMoveOrTouchMove(event: MouseEvent | TouchEvent, suppressEventCancelation?: boolean): void {
    const { max, min, step } = this.props;
    const steps: number = (max - min) / step;
    const sliderLength: number = this.refs.sliderLine.offsetWidth;
    const stepLength: number = sliderLength / steps;
    const sliderPositionRect: ClientRect = this.refs.sliderLine.getBoundingClientRect();
    let currentSteps: number;

    if (event.type === 'mousedown' || event.type === 'mousemove') {
      currentSteps = isRTL() ?
        (sliderPositionRect.right - (event as MouseEvent).clientX) / stepLength :
        ((event as MouseEvent).clientX - sliderPositionRect.left) / stepLength;
    } else if (event.type === 'touchstart' || event.type === 'touchmove') {
      currentSteps = isRTL() ?
        (sliderPositionRect.right - (event as TouchEvent).touches[0].clientX) / stepLength :
        ((event as TouchEvent).touches[0].clientX - sliderPositionRect.left) / stepLength;
    }

    let currentValue: number;
    let renderedValue: number;

    // The value shouldn't be bigger than max or be smaller than min.
    if (currentSteps > Math.floor(steps)) {
      renderedValue = currentValue = max;
    } else if (currentSteps < 0) {
      renderedValue = currentValue = min;
    } else {
      renderedValue = min + step * currentSteps;
      currentValue = min + step * Math.round(currentSteps);
    }

    this._updateValue(currentValue, renderedValue);

    if (!suppressEventCancelation) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  private _updateValue(value, renderedValue) {
    let valueChanged = value !== this.state.value;

    this.setState({
      value,
      renderedValue
    }, () => {
      if (valueChanged && this.props.onChange) {
        this.props.onChange(this.state.value);
      }
    });
  }

  @autobind
  private _onMouseUpOrTouchEnd(): void {

    // Synchronize the renderedValue to the actual value.
    this.setState({
      renderedValue: this.state.value
    });

    this._events.off();
  }

  @autobind
  private _onKeyDown(event: KeyboardEvent): void {
    const value: number = this.state.value;
    const { max, min, step } = this.props;

    let diff: number = 0;
    if (event.which === getRTLSafeKeyCode(KeyCodes.left)) {
      diff = -step;
    } else if (event.which === getRTLSafeKeyCode(KeyCodes.right)) {
      diff = step;
    } else {
      return;
    }
    const newValue: number = Math.min(max, Math.max(min, value + diff));

    this._updateValue(newValue, newValue);

    event.preventDefault();
    event.stopPropagation();
  }

}