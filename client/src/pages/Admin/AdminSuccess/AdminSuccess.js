import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import Menu from '~/pages/Admin/Menu';
import Order from '~/components/Order';
import styles from './AdminSuccess.module.scss';

const cx = classNames.bind(styles);

function AdminSuccess() {
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
      const response = await axios.get('http://localhost:5000/api/order/3', {
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
        <span className={cx('title-content')}>Đơn hàng giao thành công</span>
      </div>
      <div className={cx('order-list')}>
        {orderList.map((order) => {
          return <Order key={order.id} data={order} icon={faCheckCircle}></Order>;
        })}
      </div>
    </div>
  );
}

export default AdminSuccess;
