import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRectangleList } from '@fortawesome/free-regular-svg-icons';

import Button from '~/components/Button';
import config from '~/config';
import styles from './Menu.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';

const cx = classNames.bind(styles);

function Menu() {
  const [countPending, setCountPending] = useState();
  const [countDelivering, setCountDelivering] = useState();
  const [countSuccess, setCountSuccess] = useState();
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
        headers: {
          Authorization: `Bearer ${getJwtFromCookie()}`,
        },
      });
      setCountPending(response.data.length);
    };
    const getApiOrderDelivering = async () => {
      const response = await axios.get('http://localhost:5000/api/order/2', {
        headers: {
          Authorization: `Bearer ${getJwtFromCookie()}`,
        },
      });
      setCountDelivering(response.data.length);
    };
    const getApiOrderSuccess = async () => {
      const response = await axios.get('http://localhost:5000/api/order/3', {
        headers: {
          Authorization: `Bearer ${getJwtFromCookie()}`,
        },
      });
      setCountSuccess(response.data.length);
    };
    getApiOrderPending();
    getApiOrderDelivering();
    getApiOrderSuccess();
  }, []);
  return (
    <div className={cx('states')}>
      <Button
        className={cx('btn-state1')}
        leftIcon={<FontAwesomeIcon className={cx('icon')} icon={faRectangleList} />}
        to={config.routes.staffWaiting}
      >
        <span className={cx('number')}>{countPending}</span>
        <span className={cx('state')}>Đơn hàng đang chờ</span>
      </Button>
      <Button
        className={cx('btn-state2')}
        leftIcon={<FontAwesomeIcon className={cx('icon')} icon={faRectangleList} />}
        to={config.routes.staffDelivering}
      >
        <span className={cx('number')}>{countDelivering}</span>
        <span className={cx('state')}>Đang vận chuyển</span>
      </Button>
      <Button
        className={cx('btn-state3')}
        leftIcon={<FontAwesomeIcon className={cx('icon')} icon={faRectangleList} />}
        to={config.routes.staffSuccess}
      >
        <span className={cx('number')}>{countSuccess}</span>
        <span className={cx('state')}>Giao thành công</span>
      </Button>
    </div>
  );
}

export default Menu;
