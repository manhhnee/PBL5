import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRectangleList } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';

import styles from './Staff.module.scss';
import Sidebar from '~/components/Sidebar/Sidebar';
import Button from '~/components/Button/Button';
import config from '~/config';

const cx = classNames.bind(styles);

function Staff({ children }) {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [showMonthPicker, setShowMonthPicker] = useState(false);

  const [infor, setInfor] = useState({});

  function getJwtFromCookie() {
    //lấy token được lưu trong cookie ra
    const name = 'token=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return '';
  }

  useEffect(() => {
    fetch('http://localhost:5000/user/staff', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getJwtFromCookie()}`, // trả token về server để xử lí
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success === true) {
          setInfor(response.user);
        } else {
          alert('error');
        }
      });
  }, []);

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

  const currentDate = new Date();
  const days = generateCalendar(month, year);

  return (
    <div className={cx('wrapper')}>
      <Sidebar />
      <div className={cx('container')}>
        <div className={cx('header')}>
          <span className={cx('date')}>
            Ngày {currentDate.getDate()} Tháng {currentDate.getMonth() + 1} Năm {currentDate.getFullYear()}, Thứ{' '}
            {currentDate.getDay() + 1}
          </span>
          <span className={cx('name')}>Xin chào, {infor.FirstName + ' ' + infor.LastName}</span>
          <div className={cx('states')}>
            <Button
              className={cx('btn-state1')}
              leftIcon={<FontAwesomeIcon className={cx('icon')} icon={faRectangleList} />}
              to={config.routes.staffWaiting}
            >
              <span className={cx('number')}>4</span>
              <span className={cx('state')}>Đơn hàng đang chờ</span>
            </Button>
            <Button
              className={cx('btn-state2')}
              leftIcon={<FontAwesomeIcon className={cx('icon')} icon={faRectangleList} />}
              to={config.routes.staffDelivering}
            >
              <span className={cx('number')}>4</span>
              <span className={cx('state')}>Đang vận chuyển</span>
            </Button>
            <Button
              className={cx('btn-state3')}
              leftIcon={<FontAwesomeIcon className={cx('icon')} icon={faRectangleList} />}
              to={config.routes.staffSuccess}
            >
              <span className={cx('number')}>4</span>
              <span className={cx('state')}>Giao thành công</span>
            </Button>
          </div>
        </div>
        {children}
      </div>
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
    </div>
  );
}

Staff.protoTypes = {
  children: PropTypes.node.isRequired,
};

export default Staff;
