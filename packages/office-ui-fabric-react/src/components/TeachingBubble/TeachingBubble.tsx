/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { BaseComponent, css } from '../../Utilities';
import { TeachingBubbleContent } from './TeachingBubbleContent';
import { ITeachingBubbleProps } from './TeachingBubble.Props';
import { Callout } from '../../Callout';
import { DirectionalHint } from '../../common/DirectionalHint';
const styles: any = require('./TeachingBubble.scss');

export interface ITeachingBubbleState {
  isTeachingBubbleVisible?: boolean;
}

export class TeachingBubble extends BaseComponent<ITeachingBubbleProps, ITeachingBubbleState> {

  // Specify default props values
  public static defaultProps = {
    calloutProps: {
      beakWidth: 16,
      gapSpace: 0,
      setInitialFocus: true,
      doNotLayer: false,
      directionalHint: DirectionalHint.rightCenter
    }
  };

  // Constructor
  constructor(props: ITeachingBubbleProps) {
    super(props);

    this.state = {
    };
  }

  public render() {
    let { calloutProps, targetElement } = this.props;

    return (
      <Callout
        className={ css('ms-TeachingBubble', styles.root) }
        ref={ this._resolveRef('_callout') }
        targetElement={ targetElement }
        {...calloutProps}
      >
        <TeachingBubbleContent { ...this.props } />
      </Callout>
    );
  }
}