import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import Menu from '~/pages/Staff/Menu';
import Order from '~/components/Order';
import styles from './StaffWaiting.module.scss';

const cx = classNames.bind(styles);

function StaffWaiting() {
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
  useEffect(() => {
    const getApiOrderPending = async () => {
      const response = await axios.get('http://localhost:5000/api/order/1', {
        headers: { Authorization: `Bearer ${getJwtFromCookie()}` },
      });
      setOrderList(response.data);
    };
    getApiOrderPending();
  }, []);

  return (
    <div className={cx('content')}>
      <Menu />
      <div className={cx('header-content')}>
        <span className={cx('title-content')}>Đơn hàng đang chờ</span>
      </div>
      <div className={cx('order-list')}>
        {orderList.map((order) => {
          return <Order key={order.id} data={order} icon={faSpinner}></Order>;
        })}
      </div>
    </div>
  );
}

export default StaffWaiting;
