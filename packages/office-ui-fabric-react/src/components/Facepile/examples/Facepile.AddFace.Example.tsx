import * as React from 'react';
import {
  Facepile,
  IFacepileProps,
  OverflowButtonType
} from 'office-ui-fabric-react/lib/Facepile';
import { facepilePersonas } from './FacepileExampleData';

export interface IFacepileAddFaceExampleState {
  numberOfFaces: number;
}

export class FacepileAddFaceExample extends React.Component<any, IFacepileAddFaceExampleState> {
  public constructor() {
    super();

    this.state = {
      numberOfFaces: 0
    };
  }

  public render() {
    let { numberOfFaces } = this.state;
    let facepileProps: IFacepileProps = {
      personas: facepilePersonas.slice(0, numberOfFaces),
      maxDisplayablePersonas: 5,
      overflowButtonProps: {},
      overflowButtonType: OverflowButtonType.descriptive,
      showAddButton: true,
      addButtonProps: {
        ariaLabel: 'Add a new person',
        onClick: (ev: React.MouseEvent<HTMLButtonElement>) => this.setState({
          numberOfFaces: this.state.numberOfFaces + 1
        })
      }
    };

    return (
      <Facepile {...facepileProps} />
    );
  }
}