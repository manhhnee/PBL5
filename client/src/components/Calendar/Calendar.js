import classNames from 'classnames/bind';

import { useState } from 'react';

import styles from './Calendar.module.scss';

const cx = classNames.bind(styles);

function Calendar() {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const month_names = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0);
  };

  const getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28;
  };

  const generateCalendar = () => {
    const days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // get first day of month
    const first_day = new Date(year, month, 1);

    const days = [];
    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
      if (i >= first_day.getDay()) {
        days.push(i - first_day.getDay() + 1);
      } else {
        days.push('');
      }
    }

    return days;
  };

  const days = generateCalendar(month, year);
  return (
    <div className={cx('calendar')}>
      <div className={cx('calendar-header')}>
        <span className={cx('month-picker')} onClick={() => setShowMonthPicker(!showMonthPicker)}>
          {month_names[month]}
        </span>
        <div className={cx('year-picker')}>
          <span className={cx('year-change')} onClick={() => setYear(year - 1)}>
            &lt;
          </span>
          <span className={cx('year')}>{year}</span>
          <span className={cx('year-change')} onClick={() => setYear(year + 1)}>
            &gt;
          </span>
        </div>
      </div>
      <div className={cx('calendar-body')}>
        <div className={cx('calendar-week-day')}>
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>
        <div className={cx('calendar-days')}>
          {days.map((day, index) => (
            <div
              key={index}
              className={
                day === ''
                  ? ''
                  : cx(
                      'calendar-day',
                      `${
                        day === new Date().getDate() &&
                        month === new Date().getMonth() &&
                        year === new Date().getFullYear()
                          ? 'curr-date'
                          : ''
                      }`,
                    )
              }
            >
              {day}
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          ))}
        </div>
      </div>
      {showMonthPicker && (
        <div className={cx('month-list')}>
          {month_names.map((month_name, index) => (
            <div
              key={index}
              className={cx('month-list-item')}
              onClick={() => {
                setMonth(index);
                setShowMonthPicker(false);
              }}
            >
              <div className={cx('month-name')}>{month_name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Calendar;
