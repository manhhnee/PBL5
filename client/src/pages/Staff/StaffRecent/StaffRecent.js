import classNames from 'classnames/bind';

import Menu from '~/pages/Staff/Menu';
import Order from '~/components/Order';
import styles from './StaffRecent.module.scss';

import { faCheckCircle, faSpinner, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';

const cx = classNames.bind(styles);

function StaffRecent() {
  const [orderList, setOrderList] = useState([]);
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
  const getIcon = (id) => {
    switch (id) {
      case 1:
        return faSpinner;
      case 2:
        return faTruckFast;
      case 3:
        return faCheckCircle;
      default:
        return null;
    }
  };
  useEffect(() => {
    const getApiOrderList = async () => {
      const response = await axios.get('http://localhost:5000/api/order/orderList', {
        headers: { Authorization: `Bearer ${getJwtFromCookie()}` },
      });
      setOrderList(response.data);
    };
    getApiOrderList();
  }, []);
  return (
    <div className={cx('content')}>
      <Menu />
      <div className={cx('header-content')}>
        <span className={cx('title-content')}>Đơn hàng gần đây</span>
      </div>
      <div className={cx('order-list')}>
        {orderList.map((order) => {
          return <Order data={order} icon={getIcon(order.id_Status)}></Order>;
        })}
      </div>
    </div>
  );
}

export default StaffRecent;
