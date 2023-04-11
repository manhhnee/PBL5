import classNames from 'classnames/bind';

import styles from './Staff.module.scss';
import Sidebar from '~/components/Sidebar/Sidebar';
import Button from '~/components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRectangleList } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Staff() {
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

  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

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

  const currentDate = new Date();
  return (
    <div className={cx('wrapper')}>
      <Sidebar />
      <div className={cx('container')}>
        <div className={cx('header')}>
          <span className={cx('date')}>
            Ngày {currentDate.getDate()} Tháng {currentDate.getMonth() + 1} Năm {currentDate.getFullYear()}, Thứ{' '}
            {currentDate.getDay() + 1}
          </span>
          <span className={cx('name')}>Xin chào, Hồ Hưng</span>
          <div className={cx('states')}>
            <Button
              className={cx('btn-state1')}
              leftIcon={<FontAwesomeIcon className={cx('icon')} icon={faRectangleList} />}
            >
              <span className={cx('number')}>4</span>
              <span className={cx('state')}>Đơn hàng đang chờ</span>
            </Button>
            <Button
              className={cx('btn-state2')}
              leftIcon={<FontAwesomeIcon className={cx('icon')} icon={faRectangleList} />}
            >
              <span className={cx('number')}>4</span>
              <span className={cx('state')}>Đang vận chuyển</span>
            </Button>
            <Button
              className={cx('btn-state3')}
              leftIcon={<FontAwesomeIcon className={cx('icon')} icon={faRectangleList} />}
            >
              <span className={cx('number')}>4</span>
              <span className={cx('state')}>Giao thành công</span>
            </Button>
          </div>
        </div>
      </div>
      <div className={cx('calender')}>
        <div className={cx('calendar-header')}>
          <span className={cx('month-picker')}>{month_names[month]}</span>
          <div className={cx('year-picker')}>
            <span className={cx('year')}>{year}</span>
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
            {generateCalendar().map((day, index) => (
              <div
                key={index}
                className={cx(
                  'calendar-day',
                  `${day === new Date().getDate() && month === new Date().getMonth() ? 'curr-date' : ''}`,
                )}
              >
                {day}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Staff;
