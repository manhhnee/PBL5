import classNames from 'classnames/bind';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faTruckFast, faX } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import moment from 'moment';
import { Flip, ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';

import Profile from '~/layouts/Profile';
import Button from '~/components/Button/Button';
import config from '~/config';
import styles from './History.module.scss';

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

  const handleCancelOrder = async (id) => {
    await axios
      .put(
        `http://localhost:5000/api/order/cancel/${id}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getJwtFromCookie()}`,
          },
        },
      )
      .then((res) => {
        toast.success(res.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  return (
    <Profile>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        transition={Flip}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className={cx('container')}>
        <span className={cx('header')}>Lịch sử đơn hàng</span>
        {historyOrder &&
          historyOrder.map((order) => {
            let iconComponent;
            let statusComponent;
            let btnComponent;
            if (order.id_Status === 1) {
              iconComponent = <FontAwesomeIcon icon={faSpinner} className={cx('icon')} spinPulse></FontAwesomeIcon>;
              statusComponent = <span className={cx('status-name')}>Đơn hàng đang được chuẩn bị</span>;
              btnComponent = (
                <Button
                  onClick={() => {
                    handleCancelOrder(order.id);
                  }}
                  primary
                  className={cx('btn')}
                >
                  Hủy đơn hàng
                </Button>
              );
            } else if (order.id_Status === 2) {
              iconComponent = <FontAwesomeIcon icon={faTruckFast} className={cx('icon')} bounce></FontAwesomeIcon>;
              statusComponent = <span className={cx('status-name')}>Đơn hàng đang được giao</span>;
            } else if (order.id_Status === 3) {
              iconComponent = <FontAwesomeIcon icon={faCheckCircle} className={cx('icon')} beat></FontAwesomeIcon>;
              statusComponent = <span className={cx('status-name')}>Đơn hàng đã được giao thành công</span>;
            } else if (order.id_Status === 4) {
              iconComponent = <FontAwesomeIcon icon={faX} className={cx('icon1')} beatFade></FontAwesomeIcon>;
              statusComponent = <span className={cx('status-name1')}>Đơn hàng đã được hủy</span>;
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
                    {order && btnComponent}
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
