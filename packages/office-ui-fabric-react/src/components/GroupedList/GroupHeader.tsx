import * as React from 'react';
import {
  autobind,
  css
} from '../../Utilities';
import { IGroupDividerProps } from './GroupedList.Props';
import { SelectionMode } from '../../utilities/selection/index';
import { Check } from '../../Check';
import { Icon } from '../../Icon';
import { GroupSpacer } from './GroupSpacer';
import { Spinner } from '../../Spinner';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
const styles: any = require('./GroupHeader.scss');

export interface IGroupHeaderState {
  isCollapsed: boolean;
  isLoadingVisible: boolean;
}

export class GroupHeader extends React.Component<IGroupDividerProps, IGroupHeaderState> {
  constructor(props: IGroupDividerProps) {
    super(props);

    this.state = {
      isCollapsed: this.props.group && this.props.group.isCollapsed,
      isLoadingVisible: false
    };
  }

  public componentWillReceiveProps(newProps) {
    if (newProps.group) {
      let newCollapsed = newProps.group.isCollapsed;
      let isGroupLoading = newProps.headerProps && newProps.headerProps.isGroupLoading;
      let newLoadingVisible = !newCollapsed && isGroupLoading && isGroupLoading(newProps.group);

      this.setState({
        isCollapsed: newCollapsed,
        isLoadingVisible: newLoadingVisible
      });
    }
  }

  public render() {
    let {
      group,
      groupLevel,
      viewport,
      selectionMode,
      loadingText,
      isSelected,
      selected,
      isCollapsedGroupSelectVisible
    } = this.props;
    let { isCollapsed, isLoadingVisible } = this.state;

    if (isCollapsedGroupSelectVisible === undefined) {
      isCollapsedGroupSelectVisible = true;
    }
    let canSelectGroup = selectionMode === SelectionMode.multiple;
    let isSelectionCheckVisible = canSelectGroup && (isCollapsedGroupSelectVisible || !(group && group.isCollapsed));
    let currentlySelected = isSelected || selected;
    return group && (
      <div
        className={ css('ms-GroupHeader', styles.root, {
          ['is-selected ' + styles.rootIsSelected]: currentlySelected
        }) }
        style={ viewport ? { minWidth: viewport.width } : {} }
        onClick={ this._onHeaderClick }
        aria-label={ group.ariaLabel || group.name }
        data-is-focusable={ true } >

        <FocusZone direction={ FocusZoneDirection.horizontal }>

          { isSelectionCheckVisible ? (
            <button
              type='button'
              className={ css('ms-GroupHeader-check', styles.check) }
              data-selection-toggle={ true }
              onClick={ this._onToggleSelectGroupClick } >
              <Check checked={ currentlySelected } />
            </button>
          ) : (selectionMode !== SelectionMode.none ? GroupSpacer({ count: 1 }) : null)
          }

          { GroupSpacer({ count: groupLevel }) }

          <div className={ css('ms-GroupHeader-dropIcon', styles.dropIcon) }>
            <Icon iconName='Tag' />
          </div>
          <button
            type='button'
            className={ css('ms-GroupHeader-expand', styles.expand) }
            onClick={ this._onToggleCollapse }>
            <Icon
              className={ css(
                isCollapsed && ('is-collapsed ' + styles.expandIsCollapsed)
              ) }
              iconName='ChevronDown'
            />
          </button>

          <div className={ css('ms-GroupHeader-title ms-font-xl', styles.title) }>
            <span>{ group.name }</span>
            {
              // hasMoreData flag is set when grouping is throttle by SPO server which in turn resorts to regular
              // sorting to simulate grouping behaviors, in which case group count is the number of items returned
              // so far. That's the reasons we need to use "+" to show we might have more items than count
              // indicates.
            }
            <span>({ group.count }{ group.hasMoreData && '+' })</span>
          </div>

          <div
            className={ css(
              'ms-GroupHeader-loading',
              styles.loading,
              isLoadingVisible && ('is-loading ' + styles.loadingIsVisible)
            ) }
          >
            <Spinner label={ loadingText } />
          </div>

        </FocusZone>
      </div>
    );
  }

  @autobind
  private _onToggleCollapse(ev: React.MouseEvent<HTMLElement>) {
    let { group, onToggleCollapse, isGroupLoading } = this.props;
    let { isCollapsed } = this.state;

    let newCollapsed = !isCollapsed;
    let newLoadingVisible = !newCollapsed && isGroupLoading && isGroupLoading(group);

    this.setState({
      isCollapsed: newCollapsed,
      isLoadingVisible: newLoadingVisible
    });
    if (onToggleCollapse) {
      onToggleCollapse(group);
    }

    ev.stopPropagation();
    ev.preventDefault();
  }

  @autobind
  private _onToggleSelectGroupClick(ev: React.MouseEvent<HTMLElement>) {
    let { onToggleSelectGroup, group } = this.props;

    if (onToggleSelectGroup) {
      onToggleSelectGroup(group);
    }

    ev.preventDefault();
    ev.stopPropagation();
  }

  @autobind
  private _onHeaderClick() {
    let { group, onGroupHeaderClick, onToggleSelectGroup } = this.props;

    if (onGroupHeaderClick) {
      onGroupHeaderClick(group);
    } else if (onToggleSelectGroup) {
      onToggleSelectGroup(group);
    }
  }
}
