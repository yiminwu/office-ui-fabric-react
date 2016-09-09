import * as React from 'react';
import { IColumn, CheckboxVisibility } from './DetailsList.Props';
import { DetailsRowCheck, IDetailsRowCheckProps } from './DetailsRowCheck';
import { GroupSpacer } from '../GroupedList/GroupSpacer';
import { DetailsRowFields } from './DetailsRowFields';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { ISelection, SelectionMode, SELECTION_CHANGE } from '../../utilities/selection/interfaces';
import { EventGroup } from '../../utilities/eventGroup/EventGroup';
import { shallowCompare, assign } from '../../utilities/object';
import { css } from '../../utilities/css';
import {
  IDragDropHelper,
  IDragDropEvents,
  IDragDropOptions,
} from './../../utilities/dragdrop/interfaces';
import { IViewport } from '../../utilities/decorators/withViewport';
import './DetailsRow.scss';

export interface IDetailsRowProps extends React.Props<DetailsRow> {
  item: any;
  itemIndex: number;
  columns: IColumn[];
  selectionMode: SelectionMode;
  selection: ISelection;
  eventsToRegister?: [{ eventName: string, callback: (item?: any, index?: number, event?: any) => void }];
  onDidMount?: (row?: DetailsRow) => void;
  onWillUnmount?: (row?: DetailsRow) => void;
  onRenderCheck?: (props: IDetailsRowCheckProps) => JSX.Element;
  onRenderItemColumn?: (item?: any, index?: number, column?: IColumn) => any;
  dragDropEvents?: IDragDropEvents;
  dragDropHelper?: IDragDropHelper;
  groupNestingDepth?: number;
  viewport?: IViewport;
  checkboxVisibility?: CheckboxVisibility;
  getRowAriaLabel?: (item: any) => string;
  checkButtonAriaLabel?: string;
}

export interface IDetailsRowSelectionState {
  isSelected: boolean;
  anySelected: boolean;
}

export interface IDetailsRowState {
  selectionState?: IDetailsRowSelectionState;
  columnMeasureInfo?: {
    index: number;
    column: IColumn;
    onMeasureDone: (measuredWidth: number) => void;
  };
  isDropping?: boolean;
  groupNestingDepth?: number;
}

const DEFAULT_DROPPING_CSS_CLASS = 'is-dropping';

export class DetailsRow extends React.Component<IDetailsRowProps, IDetailsRowState> {
  public refs: {
    [key: string]: React.ReactInstance,
    root: HTMLElement,
    cellMeasurer: HTMLElement
  };

  private _events: EventGroup;
  private _hasSetFocus: boolean;
  private _droppingClassNames: string;
  private _hasMounted: boolean;
  private _dragDropKey: string;

  constructor(props) {
    super(props);

    this.state = {
      selectionState: this._getSelectionState(props),
      columnMeasureInfo: null,
      isDropping: false,
      groupNestingDepth: props.groupNestingDepth
    };

    this._hasSetFocus = false;

    this._events = new EventGroup(this);
    this._droppingClassNames = '';
    this._updateDroppingState = this._updateDroppingState.bind(this);
  }

  public componentDidMount() {
    let { dragDropHelper } = this.props;
    if (dragDropHelper) {
      dragDropHelper.subscribe(this.refs.root, this._events, this._getRowDragDropOptions());
    }

    this._events.on(this.props.selection, SELECTION_CHANGE, this._onSelectionChanged);

    if (this.props.onDidMount && this.props.item) {
      // If the item appears later, we should wait for it before calling this method.
      this._hasMounted = true;
      this.props.onDidMount(this);
    }
  }

  public componentDidUpdate() {
    let state = this.state;
    let { item, onDidMount } = this.props;
    let { columnMeasureInfo } = state;

    if (columnMeasureInfo && columnMeasureInfo.index >= 0) {
      let newWidth = this.refs.cellMeasurer.getBoundingClientRect().width;

      columnMeasureInfo.onMeasureDone(newWidth);

      this.setState({
        columnMeasureInfo: null
      });
    }

    if (item && onDidMount && !this._hasMounted) {
      this._hasMounted = true;
      onDidMount(this);
    }
  }

  public componentWillUnmount() {
    let { item, onWillUnmount, dragDropHelper } = this.props;

    this._events.dispose();

    // Only call the onWillUnmount callback if we have an item.
    if (onWillUnmount && item) {
      onWillUnmount(this);
    }

    if (dragDropHelper) {
      dragDropHelper.unsubscribe(this.refs.root, this._dragDropKey);
    }
  }

  public componentWillReceiveProps(newProps: IDetailsRowProps) {
    this.setState({
      selectionState: this._getSelectionState(newProps),
      groupNestingDepth: newProps.groupNestingDepth
    });
  }

  public render() {
    let {
      columns,
      dragDropEvents,
      item,
      itemIndex,
      onRenderCheck = this._onRenderCheck,
      onRenderItemColumn,
      selectionMode,
      viewport,
      checkboxVisibility,
      getRowAriaLabel,
      checkButtonAriaLabel,
      selection
    } = this.props;
    let { selectionState: { isSelected, anySelected }, columnMeasureInfo, isDropping, groupNestingDepth } = this.state;
    let isDraggable = Boolean(dragDropEvents && dragDropEvents.canDrag && dragDropEvents.canDrag(item));
    let droppingClassName = isDropping ? (this._droppingClassNames ? this._droppingClassNames : DEFAULT_DROPPING_CSS_CLASS) : '';
    let ariaLabel = getRowAriaLabel ? getRowAriaLabel(item) : null;
    let canSelect = selection.canSelectItem(item);

    return (
      <div
        ref='root'
        role='row'
        aria-label= { ariaLabel }
        className={ css('ms-DetailsRow ms-u-fadeIn400', droppingClassName, {
          'is-selected': isSelected,
          'is-check-visible': checkboxVisibility === CheckboxVisibility.always
        }) }
        data-is-focusable={ true }
        data-selection-index={ itemIndex }
        data-item-index={ itemIndex }
        data-is-draggable={ isDraggable }
        data-automationid='DetailsRow'
        style={ { minWidth: viewport ? viewport.width : 0 } }
        aria-selected={ isSelected }
        >
        <FocusZone direction={ FocusZoneDirection.horizontal }>
          { (selectionMode !== SelectionMode.none) && (
            <span role='gridcell'>
              { onRenderCheck({
                isSelected,
                anySelected,
                ariaLabel: checkButtonAriaLabel,
                canSelect
              }) }
            </span>
          ) }

          { GroupSpacer({ count: groupNestingDepth }) }

          { item && (
            <DetailsRowFields
              columns={ columns }
              item={ item }
              itemIndex={ itemIndex }
              onRenderItemColumn={ onRenderItemColumn } />
          ) }

          { columnMeasureInfo && (
            <span className='ms-DetailsRow-cellMeasurer ms-DetailsRow-cell' ref='cellMeasurer'>
              <DetailsRowFields
                columns={ [ columnMeasureInfo.column ] }
                item={ item }
                itemIndex={ itemIndex }
                onRenderItemColumn={ onRenderItemColumn } />
            </span>
          ) }
        </FocusZone>
      </div>
    );
  }

  /**
   * measure cell at index. and call the call back with the measured cell width when finish measure
   *
   * @param {number} index (the cell index)
   * @param {(width: number) => void} onMeasureDone (the call back function when finish measure)
   */
  public measureCell(index: number, onMeasureDone: (width: number) => void) {
    let column = assign({}, this.props.columns[index]) as IColumn;

    column.minWidth = 0;
    column.maxWidth = 999999;

    delete column.calculatedWidth;

    this.setState({
      columnMeasureInfo: {
        index,
        column,
        onMeasureDone
      }
    });
  }

  public focus() {
    if (this.refs && this.refs.root) {
      this.refs.root.tabIndex = 0;
      this.refs.root.focus();
    }
  }

  protected _onRenderCheck(props: IDetailsRowCheckProps) {
    return <DetailsRowCheck { ...props } />;
  }

  private _getSelectionState(props: IDetailsRowProps): IDetailsRowSelectionState {
    let { itemIndex, selection } = props;

    return {
      isSelected: selection.isIndexSelected(itemIndex),
      anySelected: selection.getSelectedCount() > 0
    };
  }

  private _onSelectionChanged() {
    let selectionState = this._getSelectionState(this.props);

    if (!shallowCompare(selectionState, this.state.selectionState)) {
      this.setState({
        selectionState: selectionState
      });
    }
  }

  private _getRowDragDropOptions(): IDragDropOptions {
    let { item, itemIndex, dragDropEvents, eventsToRegister } = this.props;
    this._dragDropKey = 'row-' + itemIndex;
    let options = {
      key: this._dragDropKey,
      eventMap: eventsToRegister,
      selectionIndex: itemIndex,
      context: { data: item, index: itemIndex },
      canDrag: dragDropEvents.canDrag,
      canDrop: dragDropEvents.canDrop,
      onDragStart: dragDropEvents.onDragStart,
      updateDropState: this._updateDroppingState
    };
    return options;
  }

  /**
   * update isDropping state based on the input value, which is used to change style during drag and drop
   *
   * when change to true, that means drag enter. we will add default dropping class name
   * or the custom dropping class name (return result from onDragEnter) to the root elemet.
   *
   * when change to false, that means drag leave. we will remove the dropping class name from root element.
   *
   * @private
   * @param {boolean} newValue (new isDropping state value)
   * @param {DragEvent} event (the event trigger dropping state change which can be dragenter, dragleave etc)
   */
  private _updateDroppingState(newValue: boolean, event: DragEvent) {
    let { selectionState, isDropping } = this.state;
    let { dragDropEvents, item } = this.props;

    if (!newValue) {
      if (dragDropEvents.onDragLeave) {
        dragDropEvents.onDragLeave(item, event);
      }
    } else {
      if (dragDropEvents.onDragEnter) {
        this._droppingClassNames = dragDropEvents.onDragEnter(item, event);
      }
    }

    if (isDropping !== newValue) {
      this.setState({ selectionState: selectionState, isDropping: newValue });
    }
  }
}
