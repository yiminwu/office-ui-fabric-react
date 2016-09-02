import * as React from 'react';
import { BaseDecorator } from './BaseDecorator';

export interface IWithResponsiveModeState {
  responsiveMode?: ResponsiveMode;
}

export enum ResponsiveMode {
  small = 0,
  medium = 1,
  large = 2,
  xLarge = 3,
  xxLarge = 4,
  xxxLarge = 5
}

const RESPONSIVE_MAX_CONSTRAINT = [
  479,
  639,
  1023,
  1365,
  1919,
  99999999
];

export function withResponsiveMode<P extends { responsiveMode?: ResponsiveMode }, S>(ComposedComponent: (new (props: P, ...args: any[]) => React.Component<P, S>)): any {

  return class WithResponsiveMode extends BaseDecorator<P, IWithResponsiveModeState> {
    constructor() {
      super();
      this._updateComposedComponentRef = this._updateComposedComponentRef.bind(this);

      this.state = {
        responsiveMode: this._getResponsiveMode()
      };
    }

    public componentWillMount() {
      this._events.on(window, 'resize', () => {
        let responsiveMode = this._getResponsiveMode();

        if (responsiveMode !== this.state.responsiveMode) {
          this.setState({
            responsiveMode: responsiveMode
          });
        }
      });
    }

    public componentWillUnmount() {
      this._events.dispose();
    }

    public render() {
      let { responsiveMode } = this.state;

      return (
        <ComposedComponent ref={ this._updateComposedComponentRef } responsiveMode={ responsiveMode } { ...this.props } />
      );
    }

    private _getResponsiveMode(): ResponsiveMode {
      let responsiveMode = ResponsiveMode.small;

      while (window.innerWidth > RESPONSIVE_MAX_CONSTRAINT[responsiveMode]) {
        responsiveMode++;
      }

      return responsiveMode;
    }
  };
}
