import classNames from 'classnames/bind';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import moment from 'moment';
import Button from '~/components/Button/Button';
import { useEffect, useState } from 'react';

import Profile from '~/layouts/Profile';
import styles from './History.module.scss';
import config from '~/config';

const cx = classNames.bind(styles);

function History() {
  const [historyOrder, setHistoryOrder] = useState([]);

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
    const getApiHistoryOrder = async () => {
      const response = await axios.get('http://localhost:5000/api/order/history', {
        headers: {
          Authorization: `Bearer ${getJwtFromCookie()}`,
        },
      });
      setHistoryOrder(response.data.OrderList);
    };
    getApiHistoryOrder();
  }, []);
  return (
    <Profile>
      <div className={cx('container')}>
        <span className={cx('header')}>Lịch sử đơn hàng</span>
        {historyOrder.map((order) => {
          let iconComponent;
          let statusComponent;
          if (order.id_Status === 1) {
            iconComponent = <FontAwesomeIcon icon={faSpinner} className={cx('icon')} spinPulse></FontAwesomeIcon>;
            statusComponent = <span className={cx('status-name')}>Đơn hàng đang được chuẩn bị</span>;
          } else if (order.id_Status === 2) {
            iconComponent = <FontAwesomeIcon icon={faTruckFast} className={cx('icon')} bounce></FontAwesomeIcon>;
            statusComponent = <span className={cx('status-name')}>Đơn hàng đang được giao</span>;
          } else if (order.id_Status === 3) {
            iconComponent = <FontAwesomeIcon icon={faCheckCircle} className={cx('icon')} beat></FontAwesomeIcon>;
            statusComponent = <span className={cx('status-name')}>Đơn hàng đã được giao thành công</span>;
          }
          if (!order) {
            return null;
          }
          const orderDate = order.OrderDate;
          const formattedDate = moment(orderDate).format('DD-MM-YYYY');
          return (
            <div className={cx('wrapper')}>
              <div className={cx('content-center')}>
                <span className={cx('book-price')}>
                  {order.totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                </span>
                <span className={cx('book-date')}>Ngày đặt hàng: {formattedDate}</span>
                <span className={cx('book-address')}>Địa chỉ nhận hàng: {order.OrderAddress}</span>
                <span className={cx('book-paymethod')}>Phương thức thanh toán: {order.Payment_Method}</span>
              </div>
              <div className={cx('content-right')}>
                <div className={cx('status')}>
                  {order && iconComponent}
                  {order && statusComponent}
                </div>
                <div className={cx('options')}>
                  <Button to={`${config.routes.historydetails}?id=${order.id}`} white className={cx('btn')}>
                    Xem chi tiết đơn hàng
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Profile>
  );
}

export default History;
