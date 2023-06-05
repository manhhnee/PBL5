import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { faTruckFast } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import Order from '~/components/Order';
import Menu from '~/pages/Admin/Menu';
import styles from './AdminDelivering.module.scss';

const cx = classNames.bind(styles);

function AdminDelivering() {
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
      const response = await axios.get('http://localhost:5000/api/order/2', {
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
        <span className={cx('title-content')}>Đơn hàng đang vận chuyển</span>
      </div>
      <div className={cx('order-list')}>
        {orderList.map((order) => {
          return <Order key={order.id} data={order} icon={faTruckFast}></Order>;
        })}
      </div>
    </div>
  );
}

export default AdminDelivering;
