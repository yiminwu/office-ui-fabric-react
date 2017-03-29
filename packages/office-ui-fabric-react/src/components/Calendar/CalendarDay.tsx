import * as React from 'react';
import {
  BaseComponent,
  KeyCodes,
  css,
  getId,
  getRTL,
  getRTLSafeKeyCode
} from '../../Utilities';
import { ICalendarStrings } from './Calendar.Props';
import { DayOfWeek, DateRangeType } from '../../utilities/dateValues/DateValues';
import { FocusZone } from '../../FocusZone';

import {
  addDays,
  addWeeks,
  addMonths,
  compareDates,
  compareDatePart,
  getDateRangeArray,
  isInDateRangeArray
} from '../../utilities/dateMath/DateMath';

const styles: any = require('./Calendar.scss');

const DAYS_IN_WEEK = 7;

export interface IDayInfo {
  key: string;
  date: string;
  originalDate: Date;
  isInMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  onSelected: () => void;
}

export interface ICalendarDayProps {
  strings: ICalendarStrings;
  selectedDate: Date;
  navigatedDate: Date;
  onSelectDate: (date: Date, selectedDateRangeArray?: Date[]) => void;
  onNavigateDate: (date: Date, focusOnNavigatedDay: boolean) => void;
  firstDayOfWeek: DayOfWeek;
  dateRangeType: DateRangeType;
  autoNavigateOnSelection: boolean;
}

export interface ICalendarDayState {
  activeDescendantId?: string;
  weeks?: IDayInfo[][];
}

export class CalendarDay extends BaseComponent<ICalendarDayProps, ICalendarDayState> {
  public refs: {
    [key: string]: React.ReactInstance;
    navigatedDay: HTMLElement;
  };

  public constructor(props: ICalendarDayProps) {
    super(props);

    this.state = {
      activeDescendantId: getId('DatePickerDay-active'),
      weeks: this._getWeeks(props.navigatedDate, props.selectedDate)
    };

    this._onSelectNextMonth = this._onSelectNextMonth.bind(this);
    this._onSelectPrevMonth = this._onSelectPrevMonth.bind(this);
  }

  public componentWillReceiveProps(nextProps: ICalendarDayProps) {
    this.setState({
      weeks: this._getWeeks(nextProps.navigatedDate, nextProps.selectedDate)
    });
  }

  public render() {
    let { activeDescendantId, weeks } = this.state;
    let { firstDayOfWeek, strings, navigatedDate, onSelectDate } = this.props;

    return (
      <div className={ css('ms-DatePicker-dayPicker', styles.dayPicker) }>
        <div className={ css('ms-DatePicker-header', styles.header) }>
          <div className={ css('ms-DatePicker-month', styles.month) }>{ strings.months[navigatedDate.getMonth()] }</div>
          <div className={ css('ms-DatePicker-year', styles.year) }>{ navigatedDate.getFullYear() }</div>
        </div>
        <div className={ css('ms-DatePicker-monthComponents', styles.monthComponents) }>
          <div className={ css('ms-DatePicker-navContainer', styles.navContainer) }>
            <span
              className={ css('ms-DatePicker-prevMonth js-prevMonth', styles.prevMonth) }
              onClick={ this._onSelectPrevMonth }
              onKeyDown={ this._onKeyDown.bind(this, this._onSelectPrevMonth) }
              tabIndex={ 0 }>
              <i className={ css('ms-Icon', { 'ms-Icon--ChevronLeft': !getRTL(), 'ms-Icon--ChevronRight': getRTL() }) } />
            </span >
            <span
              className={ css('ms-DatePicker-nextMonth js-nextMonth', styles.nextMonth) }
              onClick={ this._onSelectNextMonth }
              onKeyDown={ this._onKeyDown.bind(this, this._onSelectNextMonth) }
              tabIndex={ 0 }>
              <i className={ css('ms-Icon', { 'ms-Icon--ChevronLeft': getRTL(), 'ms-Icon--ChevronRight': !getRTL() }) } />
            </span >
          </div >
          <div className={ css('ms-DatePicker-headerToggleView js-showMonthPicker', styles.headerToggleView) } />
        </div >
        <FocusZone>
          <table
            className={ css('ms-DatePicker-table', styles.table) }
            role='grid'
            aria-readonly='true'
            aria-multiselectable='false'
            aria-activedescendant={ activeDescendantId }
          >
            <thead>
              <tr>
                { strings.shortDays.map((val, index) =>
                  <th
                    className={ css('ms-DatePicker-weekday', styles.weekday) }
                    scope='col'
                    key={ index }
                    title={ strings.days[(index + firstDayOfWeek) % DAYS_IN_WEEK] }
                  >
                    { strings.shortDays[(index + firstDayOfWeek) % DAYS_IN_WEEK] }
                  </th>) }
              </tr>
            </thead>
            <tbody>
              { weeks.map((week, weekIndex) =>
                <tr key={ weekIndex }>
                  { week.map((day, dayIndex) =>
                    <td role='presentation' key={ day.key }>
                      <div
                        className={ css(
                          'ms-DatePicker-day',
                          styles.day,
                          {
                            ['ms-DatePicker-day--infocus ' + styles.dayIsFocused]: day.isInMonth,
                            ['ms-DatePicker-day--outfocus ' + styles.dayIsUnfocused]: !day.isInMonth,
                            ['ms-DatePicker-day--today ' + styles.dayIsToday]: day.isToday,
                            ['ms-DatePicker-day--highlighted ' + styles.dayIsHighlighted]: day.isSelected
                          }) }
                        role='gridcell'
                        onClick={ day.onSelected }
                        onKeyDown={ (ev: React.KeyboardEvent<HTMLElement>) =>
                          this._navigateMonthEdge(ev, day.originalDate, weekIndex, dayIndex) }
                        aria-selected={ day.isSelected }
                        id={ compareDates(navigatedDate, day.originalDate) ? activeDescendantId : null }
                        data-is-focusable={ true }
                        ref={ compareDates(navigatedDate, day.originalDate) ? 'navigatedDay' : null }
                        key={ compareDates(navigatedDate, day.originalDate) ? 'navigatedDay' : null } >
                        { day.date }
                      </div>
                    </td>
                  ) }
                </tr>
              ) }
            </tbody>
          </table>
        </FocusZone>
      </div >
    );
  }

  public focus() {
    if (this.refs.navigatedDay) {
      this.refs.navigatedDay.tabIndex = 0;
      this.refs.navigatedDay.focus();
    }
  }

  private _navigateMonthEdge(ev: React.KeyboardEvent<HTMLElement>, date: Date, weekIndex: number, dayIndex: number) {
    if (weekIndex === 0 && ev.which === KeyCodes.up) {
      this.props.onNavigateDate(addWeeks(date, -1), true);
      ev.preventDefault();
    } else if (weekIndex === (this.state.weeks.length - 1) && ev.which === KeyCodes.down) {
      this.props.onNavigateDate(addWeeks(date, 1), true);
      ev.preventDefault();
    } else if (dayIndex === 0 && ev.which === getRTLSafeKeyCode(KeyCodes.left)) {
      this.props.onNavigateDate(addDays(date, -1), true);
      ev.preventDefault();
    } else if (dayIndex === (DAYS_IN_WEEK - 1) && ev.which === getRTLSafeKeyCode(KeyCodes.right)) {
      this.props.onNavigateDate(addDays(date, 1), true);
      ev.preventDefault();
    }
  }

  private _onKeyDown(callback: () => void, ev: React.KeyboardEvent<HTMLElement>) {
    if (ev.which === KeyCodes.enter) {
      callback();
    }
  }

  private _onSelectDate(selectedDate: Date) {
    let { onSelectDate, dateRangeType, firstDayOfWeek, navigatedDate, autoNavigateOnSelection } = this.props;

    let dateRange = getDateRangeArray(selectedDate, dateRangeType, firstDayOfWeek);
    if (onSelectDate != null) {
      onSelectDate(selectedDate, dateRange);
    }

    // Navigate to next or previous month if needed
    if (autoNavigateOnSelection && selectedDate.getMonth() !== navigatedDate.getMonth()) {
      let compareResult = compareDatePart(selectedDate, navigatedDate);
      if (compareResult < 0) {
        this._onSelectPrevMonth();
      } else if (compareResult > 0) {
        this._onSelectNextMonth();
      }
    }
  }

  private _onSelectNextMonth() {
    this.props.onNavigateDate(addMonths(this.props.navigatedDate, 1), false);
  }

  private _onSelectPrevMonth() {
    this.props.onNavigateDate(addMonths(this.props.navigatedDate, -1), false);
  }

  private _getWeeks(navigatedDate: Date, selectedDate: Date): IDayInfo[][] {
    let { firstDayOfWeek, dateRangeType } = this.props;
    let date = new Date(navigatedDate.getFullYear(), navigatedDate.getMonth(), 1);
    let today = new Date();
    let weeks = [];
    let week;

    // Cycle the date backwards to get to the first day of the week.
    while (date.getDay() !== firstDayOfWeek) {
      date.setDate(date.getDate() - 1);
    }

    // a flag to indicate whether all days of the week are in the month
    let isAllDaysOfWeekOutOfMonth = false;

    let selectedDates = getDateRangeArray(selectedDate, dateRangeType, firstDayOfWeek);

    for (let weekIndex = 0; !isAllDaysOfWeekOutOfMonth; weekIndex++) {
      week = [];

      isAllDaysOfWeekOutOfMonth = true;

      for (let dayIndex = 0; dayIndex < DAYS_IN_WEEK; dayIndex++) {
        let originalDate = new Date(date.toString());
        let dayInfo = {
          key: date.toString(),
          date: date.getDate(),
          originalDate: originalDate,
          isInMonth: date.getMonth() === navigatedDate.getMonth(),
          isToday: compareDates(today, date),
          isSelected: isInDateRangeArray(date, selectedDates),
          onSelected: this._onSelectDate.bind(this, originalDate)
        };

        week.push(dayInfo);

        if (dayInfo.isInMonth) {
          isAllDaysOfWeekOutOfMonth = false;
        }

        date.setDate(date.getDate() + 1);
      }

      if (!isAllDaysOfWeekOutOfMonth) {
        weeks.push(week);
      }
    }

    return weeks;
  }
}
