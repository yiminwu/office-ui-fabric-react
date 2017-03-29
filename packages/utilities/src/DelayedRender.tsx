import * as React from 'react';

export interface IDelayedRenderProps extends React.Props<any> {
  /**
   * Number of milliseconds to delay rendering children.
   * @default 0
   */
  delay?: number;
}

export interface IDelayedRenderState {
  /**
   * Whether the component is rendered or not.
   */
  isRendered: boolean;
}

/**
 * Utility component for delaying the render of a child component after a given delay. This component
 * requires a single child component; don't pass in many components. Wrap multiple components in a DIV
 * if necessary.
 *
 * @example
 * <DelayedRender delay={ 3000 }>
 *  <div className='foo-List-loadingSpinner'>
 *    <p>I am loading</p>
 *    <Spinner />
 *  </div>
 * </DelayedRender>
 */
export class DelayedRender extends React.Component<IDelayedRenderProps, IDelayedRenderState> {
  public static defaultProps = {
    delay: 0
  };

  private _timeoutId;

  constructor(props: IDelayedRenderProps) {
    super(props);
    this.state = {
      isRendered: false
    };
  }

  public componentDidMount() {
    let { delay } = this.props;
    this._timeoutId = setTimeout(() => {
      this.setState({
        isRendered: true
      });
    }, delay);
  }

  public componentWillUnmount() {
    clearTimeout(this._timeoutId);
  }

  public render() {
    return this.state.isRendered ? React.Children.only(this.props.children) : null;
  }
}
