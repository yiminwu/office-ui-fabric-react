import * as React from 'react';
import { autobind, css } from '../../Utilities';
import { IColorPickerProps } from './ColorPicker.Props';
import { TextField } from '../../TextField';
import { ColorRectangle } from './ColorRectangle';
import { ColorSlider } from './ColorSlider';
import {
  IColor,
  MAX_COLOR_HUE,
  getColorFromString,
  updateA,
  updateH,
  updateSV
} from './colors';
const styles: any = require('./ColorPicker.scss');

export interface IColorPickerState {
  isOpen: boolean;
  color: IColor;
}

export interface IColor {
  r: number;
  g: number;
  b: number;
  a: number;
  h: number;
  s: number;
  v: number;
  hex: string;
  str: string;
}

export class ColorPicker extends React.Component<IColorPickerProps, IColorPickerState> {
  constructor(props: IColorPickerProps) {
    super(props);

    this.state = {
      color: getColorFromString(props.color)
    } as IColorPickerState;
  }

  public componentWillReceiveProps(newProps: IColorPickerProps) {
    if (newProps.color) {
      this._updateColor(getColorFromString(newProps.color));
    }
  }

  public render() {
    let { color } = this.state;

    return (
      <div className={ css('ms-ColorPicker', styles.root) }>
        <div className={ css('ms-ColorPicker-panel', styles.panel) }>
          <ColorRectangle color={ color } onSVChanged={ this._onSVChanged } />
          <ColorSlider
            className={ css('is-hue', styles.colorSliderIsHue) }
            minValue={ 0 }
            maxValue={ MAX_COLOR_HUE }
            initialValue={ color.h }
            onChanged={ this._onHChanged }
          />
          { !this.props.alphaSliderHidden && (
            <ColorSlider
              className={ css('is-alpha', styles.colorSliderIsAlpha) }
              overlayStyle={ { background: `linear-gradient(to right, transparent 0, ${color.str} 100%)` } }
              minValue={ 0 }
              maxValue={ 100 }
              initialValue={ color.a }
              onChanged={ this._onAChanged }
            />) }
          <table className='ms-ColorPicker-table' cellPadding='0' cellSpacing='0'>
            <thead>
              <tr className='ms-font-s'>
                <td>Hex</td>
                <td>Red</td>
                <td>Green</td>
                <td>Blue</td>
                { !this.props.alphaSliderHidden && (
                  <td>Alpha</td>) }
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <TextField className={ css('ms-ColorPicker-input', styles.input) } value={ color.hex } />
                </td>
                <td style={ { width: '18%' } }>
                  <TextField
                    className={ css('ms-ColorPicker-input', styles.input) }
                    value={ String(color.r) }
                  />
                </td>
                <td style={ { width: '18%' } }>
                  <TextField className={ css('ms-ColorPicker-input', styles.input) } value={ String(color.g) } />
                </td>
                <td style={ { width: '18%' } }>
                  <TextField className={ css('ms-ColorPicker-input', styles.input) } value={ String(color.b) } />
                </td>
                { !this.props.alphaSliderHidden && (
                  <td style={ { width: '18%' } }>
                    <TextField className={ css('ms-ColorPicker-input', styles.input) } value={ String(color.a) } />
                  </td>
                ) }
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  @autobind
  private _onSVChanged(s: number, v: number) {
    this._updateColor(updateSV(this.state.color, s, v));
  }

  @autobind
  private _onHChanged(h: number) {
    this._updateColor(updateH(this.state.color, h));
  }

  @autobind
  private _onAChanged(a: number) {
    this._updateColor(updateA(this.state.color, a));
  }

  private _updateColor(newColor: IColor) {
    let { onColorChanged } = this.props;

    if (newColor.str !== this.state.color.str) {
      this.setState({
        color: newColor
      } as IColorPickerState, () => {
        if (onColorChanged) {
          onColorChanged(newColor.str);
        }
      });
    }
  }
}
