import * as React from 'react';
import {
  BaseComponent,
  KeyCodes,
  autobind,
  css,
  getRTL
} from '../../Utilities';
import { FocusZone } from '../../FocusZone';
import { Callout, DirectionalHint } from '../../Callout';
import { Selection, SelectionZone, SelectionMode } from '../../utilities/selection/index';
import { Suggestions } from './Suggestions/Suggestions';
import { ISuggestionsProps } from './Suggestions/Suggestions.Props';
import { SuggestionsController } from './Suggestions/SuggestionsController';
import { IBasePickerProps } from './BasePicker.Props';
import { BaseAutoFill } from './AutoFill/BaseAutoFill';
import { IPickerItemProps } from './PickerItem.Props';
const styles: any = require('./BasePicker.scss');

export interface IBasePickerState {
  items?: any;
  suggestedDisplayValue?: string;
  moreSuggestionsAvailable?: boolean;
  suggestionsVisible?: boolean;
  suggestionsLoading?: boolean;
}

export class BasePicker<T, P extends IBasePickerProps<T>> extends BaseComponent<P, IBasePickerState> {

  protected selection: Selection;

  protected root: HTMLElement;
  protected input: BaseAutoFill;
  protected focusZone: FocusZone;
  protected suggestionElement: Suggestions<T>;

  protected suggestionStore: SuggestionsController<T>;
  protected SuggestionOfProperType = Suggestions as new (props: ISuggestionsProps<T>) => Suggestions<T>;
  protected loadingTimer: number;
  protected currentPromise: PromiseLike<any>;

  constructor(basePickerProps: P) {
    super(basePickerProps);

    let items: T[] = basePickerProps.defaultSelectedItems || [];

    this.suggestionStore = new SuggestionsController<T>();
    this.selection = new Selection({ onSelectionChanged: () => this.onSelectionChange() });
    this.selection.setItems(items);
    this.state = {
      items: items,
      suggestedDisplayValue: '',
      moreSuggestionsAvailable: false
    };
  }

  public get items(): T[] {
    return this.state.items;
  }

  public componentWillReceiveProps(newProps: IBasePickerProps<T>, newState: IBasePickerState) {
    if (newState.items && newState.items !== this.state.items) {
      this.selection.setItems(newState.items);
    }
  }

  public componentDidMount() {
    this.selection.setItems(this.state.items);
  }

  public focus() {
    this.focusZone.focus();
  }
  @autobind
  public dismissSuggestions() {
    this.setState({ suggestionsVisible: false });
  }

  public completeSuggestion() {
    if (this.suggestionStore.hasSelectedSuggestion()) {
      this.addItem(this.suggestionStore.currentSuggestion.item);
      this.updateValue('');
      this.input.clear();
    }
  }

  public render() {
    let { suggestedDisplayValue } = this.state;
    let {
      className,
      inputProps
    } = this.props;

    return (
      <div
        ref={ this._resolveRef('root') }
        className={ css(
          'ms-BasePicker',
          className ? className : '') }
        onKeyDown={ this.onKeyDown }>
        <SelectionZone selection={ this.selection } selectionMode={ SelectionMode.multiple }>
          <FocusZone
            ref={ this._resolveRef('focusZone') }
            className={ css('ms-BasePicker-text', styles.pickerText) }>
            { this.renderItems() }
            <BaseAutoFill
              { ...inputProps }
              className={ css('ms-BasePicker-input', styles.pickerInput) }
              ref={ this._resolveRef('input') }
              onFocus={ this.onInputFocus }
              onInputValueChange={ this.onInputChange }
              suggestedDisplayValue={ suggestedDisplayValue }
              aria-activedescendant={ 'sug-' + this.suggestionStore.currentIndex }
              aria-owns='suggestion-list'
              aria-expanded='true'
              aria-haspopup='true'
              autoCapitalize='off'
              autoComplete='off'
              role='combobox' />
          </FocusZone>
        </SelectionZone>
        { this.renderSuggestions() }
      </div>
    );
  }

  protected renderSuggestions(): JSX.Element {
    let TypedSuggestion = this.SuggestionOfProperType;
    return this.state.suggestionsVisible ? (
      <Callout
        isBeakVisible={ false }
        gapSpace={ 0 }
        targetElement={ this.root }
        onDismiss={ this.dismissSuggestions }
        directionalHint={ getRTL() ? DirectionalHint.bottomRightEdge : DirectionalHint.bottomLeftEdge }>
        <TypedSuggestion
          onRenderSuggestion={ this.props.onRenderSuggestionsItem }
          onSuggestionClick={ this.onSuggestionClick }
          suggestions={ this.suggestionStore.getSuggestions() }
          ref={ this._resolveRef('suggestionElement') }
          onGetMoreResults={ this.onGetMoreResults }
          moreSuggestionsAvailable={ this.state.moreSuggestionsAvailable }
          isLoading={ this.state.suggestionsLoading }
          { ...this.props.pickerSuggestionsProps }
        />
      </Callout>
    ) : (null);
  }

  protected renderItems(): JSX.Element[] {
    let { onRenderItem } = this.props;
    let { items } = this.state;
    return items.map((item, index) => onRenderItem({
      item,
      index,
      key: index + this._getTextFromItem(item),
      selected: this.selection.isIndexSelected(index),
      onRemoveItem: () => this.removeItem(item),
      onItemChange: this.onItemChange
    }));
  }

  protected resetFocus(index: number) {
    let { items } = this.state;

    if (items.length) {
      let newEl: HTMLElement = this.root.querySelectorAll('[data-selection-index]')[Math.min(index, items.length - 1)] as HTMLElement;

      if (newEl) {
        this.focusZone.focusElement(newEl);
      }
    } else {
      this.input.focus();
    }
  }

  protected onSuggestionSelect() {
    if (this.suggestionStore.currentSuggestion) {
      let currentValue: string = this.input.value;
      let itemValue: string = this._getTextFromItem(this.suggestionStore.currentSuggestion.item, currentValue);
      this.setState({ suggestedDisplayValue: itemValue });
    }
  }

  protected onSelectionChange() {
    this.forceUpdate();
  }

  protected updateSuggestions(suggestions: any[]) {
    this.suggestionStore.updateSuggestions(suggestions);
    this.forceUpdate();
  }

  protected updateValue(updatedValue: string) {
    let suggestions: T[] | PromiseLike<T[]> = this.props.onResolveSuggestions(updatedValue, this.state.items);
    let suggestionsArray: T[] = suggestions as T[];
    let suggestionsPromiseLike: PromiseLike<T[]> = suggestions as PromiseLike<T[]>;

    // Check to see if the returned value is an array, if it is then just pass it into the next function.
    // If the returned value is not an array then check to see if it's a promise or PromiseLike. If it is then resolve it asynchronously.
    if (Array.isArray(suggestionsArray)) {
      this.resolveNewValue(updatedValue, suggestionsArray);
    } else if (suggestionsPromiseLike && suggestionsPromiseLike.then) {
      if (!this.loadingTimer) {
        this.loadingTimer = this._async.setTimeout(() => this.setState({
          suggestionsLoading: true
        }), 500);
      }

      this.setState({
        suggestionsVisible: this.input.value !== '' && this.input.inputElement === document.activeElement
      });
      // Ensure that the promise will only use the callback if it was the most recent one.
      let promise: PromiseLike<T[]> = this.currentPromise = suggestionsPromiseLike;
      promise.then((newSuggestions: T[]) => {
        if (promise === this.currentPromise) {
          this.resolveNewValue(updatedValue, newSuggestions);
          if (this.loadingTimer) {
            this._async.clearTimeout(this.loadingTimer);
            this.loadingTimer = undefined;
          }
        }
      });
    }
  }

  protected resolveNewValue(updatedValue: string, suggestions: T[]) {
    this.suggestionStore.updateSuggestions(suggestions);
    let itemValue: string = undefined;

    if (this.suggestionStore.currentSuggestion) {
      itemValue = this._getTextFromItem(this.suggestionStore.currentSuggestion.item, updatedValue);
    }

    this.setState({
      suggestionsLoading: false,
      suggestedDisplayValue: itemValue,
      suggestionsVisible: this.input.value !== '' && this.input.inputElement === document.activeElement
    });
  }

  protected onChange() {
    if (this.props.onChange) {
      this.props.onChange(this.state.items);
    }
  }

  @autobind
  protected onInputChange(value: string) {
    this.updateValue(value);
    this.setState({ moreSuggestionsAvailable: true });
  }

  @autobind
  protected onSuggestionClick(ev: React.MouseEvent<HTMLElement>, item: any, index: number) {
    this.addItemByIndex(index);
  }

  @autobind
  protected onInputFocus(ev: React.FocusEvent<HTMLInputElement | BaseAutoFill>) {
    this.selection.setAllSelected(false);
    if (this.input.value) {
      this.setState({ suggestionsVisible: true });
    }
  }

  @autobind
  protected onKeyDown(ev: React.KeyboardEvent<HTMLElement>) {
    let value = this.input.value;

    switch (ev.which) {
      case KeyCodes.escape:
        if (this.state.suggestionsVisible) {
          this.dismissSuggestions();
          ev.preventDefault();
          ev.stopPropagation();
        }
        break;

      case KeyCodes.tab:
      case KeyCodes.enter:
        if (!ev.shiftKey && value && this.suggestionStore.hasSelectedSuggestion() && this.state.suggestionsVisible) {
          this.completeSuggestion();
          ev.preventDefault();
          ev.stopPropagation();
        }

        break;

      case KeyCodes.backspace:
        this.onBackspace(ev);
        break;

      case KeyCodes.up:
        if (ev.target === this.input.inputElement && this.suggestionStore.previousSuggestion() && this.state.suggestionsVisible) {
          ev.preventDefault();
          ev.stopPropagation();
          this.onSuggestionSelect();
        }
        break;

      case KeyCodes.down:
        if (ev.target === this.input.inputElement && this.state.suggestionsVisible) {
          if (this.suggestionStore.nextSuggestion()) {
            ev.preventDefault();
            ev.stopPropagation();
            this.onSuggestionSelect();
          }
        }
        break;
    }
  }

  @autobind
  protected onItemChange(changedItem: T, index: number) {
    let { items } = this.state;

    if (index >= 0) {
      let newItems: T[] = items;
      newItems[index] = changedItem;

      this.setState({ items: newItems }, () => this.onChange());
    }
  }

  @autobind
  protected onGetMoreResults() {
    if (this.props.onGetMoreResults) {
      let suggestions: T[] | PromiseLike<T[]> = this.props.onGetMoreResults(this.input.value, this.state.items);
      let suggestionsArray: T[] = suggestions as T[];
      let suggestionsPromiseLike: PromiseLike<T[]> = suggestions as PromiseLike<T[]>;

      if (Array.isArray(suggestionsArray)) {
        this.updateSuggestions(suggestionsArray);
      } else if (suggestionsPromiseLike.then) {
        suggestionsPromiseLike.then((newSuggestions: T[]) => this.updateSuggestions(newSuggestions));
      }
    }
    this.input.focus();
    this.setState({ moreSuggestionsAvailable: false });
  }

  @autobind
  protected addItemByIndex(index: number): void {
    this.addItem(this.suggestionStore.getSuggestionAtIndex(index).item);
    this.input.clear();
    this.updateValue('');
  }

  @autobind
  protected addItem(item: T) {
    let newItems: T[] = this.state.items.concat([item]);
    this.selection.setItems(newItems);
    this.setState({ items: newItems }, () => this.onChange());
  }

  @autobind
  protected removeItem(item: IPickerItemProps<T>) {
    let { items } = this.state;
    let index: number = items.indexOf(item);

    if (index >= 0) {
      let newItems: T[] = items.slice(0, index).concat(items.slice(index + 1));

      this.selection.setItems(newItems);
      this.setState({ items: newItems }, () => this.onChange());
    }
  }

  @autobind
  protected removeItems(itemsToRemove: any[]) {
    let { items } = this.state;
    let newItems: T[] = items.filter(item => itemsToRemove.indexOf(item) === -1);
    let firstItemToRemove = this.selection.getSelection()[0];
    let index: number = items.indexOf(firstItemToRemove);

    this.selection.setItems(newItems);

    this.setState({ items: newItems }, () => {
      this.resetFocus(index);
      this.onChange();
    });
  }

  // This is protected because we may expect the backspace key to work differently in a different kind of picker.
  // This lets the subclass override it and provide it's own onBackspace. For an example see the BasePickerListBelow
  protected onBackspace(ev: React.KeyboardEvent<HTMLElement>) {
    if (this.state.items.length && !this.input.isValueSelected && this.input.cursorLocation === 0) {
      if (this.selection.getSelectedCount() > 0) {
        this.removeItems(this.selection.getSelection());
      } else {
        this.removeItem(this.state.items[this.state.items.length - 1]);
      }
    }
  }

  private _getTextFromItem(item: T, currentValue?: string): string {
    if (this.props.getTextFromItem) {
      return this.props.getTextFromItem(item, currentValue);
    } else {
      return '';
    }
  }
}

export class BasePickerListBelow<T, P extends IBasePickerProps<T>> extends BasePicker<T, P> {
  public render() {
    let { suggestedDisplayValue } = this.state;
    let {
      className,
      inputProps
    } = this.props;

    return (
      <div>
        <div ref={ this._resolveRef('root') }
          className={ css('ms-BasePicker', className ? className : '') }
          onKeyDown={ this.onKeyDown }>
          <SelectionZone selection={ this.selection }
            selectionMode={ SelectionMode.multiple }>
            <div className={ css('ms-BasePicker-text', styles.pickerText) }>
              <BaseAutoFill
                { ...inputProps }
                className={ css('ms-BasePicker-input', styles.pickerInput) }
                ref={ this._resolveRef('input') }
                onFocus={ this.onInputFocus }
                onInputValueChange={ this.onInputChange }
                suggestedDisplayValue={ suggestedDisplayValue }
                aria-activedescendant={ 'sug-' + this.suggestionStore.currentIndex }
                aria-owns='suggestion-list'
                aria-expanded='true'
                aria-haspopup='true'
                autoCapitalize='off'
                autoComplete='off'
                role='combobox'
              />
            </div>
          </SelectionZone>
        </div>
        { this.renderSuggestions() }
        <FocusZone ref={ this._resolveRef('focusZone') }
          className='ms-BasePicker-selectedItems'
          isInnerZoneKeystroke={ this._isFocusZoneInnerKeystroke } >
          { this.renderItems() }
        </FocusZone>

      </div>
    );
  }

  protected onBackspace(ev: React.KeyboardEvent<HTMLElement>) {
    // override the existing backspace method to not do anything because the list items appear below.
  }

  @autobind
  private _isFocusZoneInnerKeystroke(ev: React.KeyboardEvent<HTMLElement>): boolean {
    switch (ev.which) {
      case KeyCodes.down:
        return true;
    }
    return false;
  }
}
