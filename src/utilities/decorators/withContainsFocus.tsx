import * as React from 'react';
import { BaseDecorator } from './BaseDecorator';

export function withContainsFocus<P extends { containsFocus?: boolean }, S>(ComposedComponent: (new (props: P, ...args: any[]) => (React.Component<P, S>))): any {

  return class WithContainsFocusComponent extends BaseDecorator<P & { containsFocus? }, { containsFocus?: boolean }> {
    public refs: {
      [key: string]: React.ReactInstance,
    };

    private _newContainsFocus: boolean;
    private _delayedSetContainsFocus: () => void;

    constructor() {
      super();

      this.state = {
        containsFocus: false
      };

      this._delayedSetContainsFocus = this._async.debounce(this._setContainsFocus, 20);
      this._updateComposedComponentRef = this._updateComposedComponentRef.bind(this);
    }

    public componentWillUnmount() {
      this._async.dispose();
    }

    public render() {
      let { containsFocus } = this.state;

      return (
        <div ref='root' onFocus={ this._handleFocus.bind(this) } onBlur={ this._handleBlur.bind(this) }>
          <ComposedComponent ref={ this._updateComposedComponentRef } containsFocus={ containsFocus } {...this.props} />
        </div>
      );
    }

    public forceUpdate() {
      this._composedComponentInstance.forceUpdate();
    }

    private _handleFocus(ev) {
      this._newContainsFocus = true;
      this._delayedSetContainsFocus();
    }

    private _handleBlur(ev) {
      this._newContainsFocus = false;
      this._delayedSetContainsFocus();
    }

    private _setContainsFocus() {
      if (this.state.containsFocus !== this._newContainsFocus) {
        this.setState({ containsFocus: this._newContainsFocus });
      }
    }
  };
}
