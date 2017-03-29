/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import {
  css
} from '../../Utilities';
const styles: any = require('./GroupSpacer.scss');

export interface IGroupSpacerProps {
  count: number;
}

const SPACER_WIDTH = 36;

export const GroupSpacer = (props: IGroupSpacerProps) =>
  props.count > 0 && (
    <span
      className={ css(
        'ms-GroupSpacer',
        styles.root
      ) }
      style={ { width: props.count * SPACER_WIDTH } }
    />
  );
