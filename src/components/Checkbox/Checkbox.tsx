import * as React from 'react';
import {
  ICheckbox,
  ICheckboxProps
} from './Checkbox.Props';
import { autobind } from '../../utilities/autobind';
import { css } from '../../utilities/css';
import { getId } from '../../utilities/object';
import './Checkbox.scss';

export class Checkbox extends React.Component<ICheckboxProps, {}> implements ICheckbox {
  public static defaultProps: ICheckboxProps = {
  };

  private _id: string;
  private _checkBox: HTMLInputElement;

  constructor(props: ICheckboxProps) {
    super(props);

    this._id = getId('checkbox-');
  }

  public render() {
    const {
      checked,
      className,
      defaultChecked,
      disabled,
      inputProps,
      label
    } = this.props;

    return (
      <div className={ css('ms-ChoiceField', className) }>
        <input
          { ...inputProps }
          { ...(checked !== undefined && { checked }) }
          { ...(defaultChecked !== undefined && { defaultChecked }) }
          disabled={ disabled }
          ref={ (el): HTMLInputElement => this._checkBox = el }
          id={ this._id }
          name={ this._id }
          className='ms-ChoiceField-input'
          type='checkbox'
          role='checkbox'
          onChange={ this._onChange }
          aria-checked={ checked }
        />
        <label htmlFor={ this._id } className='ms-ChoiceField-field'>
          { label && <span className='ms-Label'>{ label }</span> }
        </label>
      </div>
    );
  }

  public get checked(): boolean {
    return this._checkBox ? this._checkBox.checked : false;
  }

  public focus() {
      if (this._checkBox) {
          this._checkBox.focus();
      }
  }

  @autobind
  private _onChange(ev: React.FormEvent) {
    const { onChange } = this.props;
    const isChecked = (ev.target as HTMLInputElement).checked;

    if (onChange) {
      onChange(ev, isChecked);
    }
  }
}
