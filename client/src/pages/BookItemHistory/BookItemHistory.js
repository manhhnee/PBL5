import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faSpinner, faTruck, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';

import Image from '~/components/Image';
import Button from '~/components/Button';
import styles from './BookItemHistory.module.scss';
import config from '~/config';

const cx = classNames.bind(styles);

function BookItemHistory() {
  const location = useLocation();
  const { id } = queryString.parse(location.search);
  const [historyDetails, setHistoryDetails] = useState({});
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
    const getApiHistoryDetail = async () => {
      const response = await axios.get(`http://localhost:5000/api/order/detail/${id}`, {
        headers: {
          Authorization: `Bearer ${getJwtFromCookie()}`,
        },
      });
      setHistoryDetails(response.data);
    };
    getApiHistoryDetail();
  }, [id]);

  let iconComponent;
  let statusComponent;
  if (historyDetails.orderInfor && historyDetails.orderInfor.id_Status === 1) {
    iconComponent = <FontAwesomeIcon icon={faSpinner} className={cx('icon')} spinPulse />;
    statusComponent = <span className={cx('status-name')}>Đơn hàng đang được chuẩn bị</span>;
  } else if (historyDetails.orderInfor && historyDetails.orderInfor.id_Status === 2) {
    iconComponent = <FontAwesomeIcon icon={faTruckFast} className={cx('icon')} bounce />;
    statusComponent = <span className={cx('status-name')}>Đơn hàng đang được giao</span>;
  } else if (historyDetails.orderInfor && historyDetails.orderInfor.id_Status === 3) {
    iconComponent = <FontAwesomeIcon icon={faCheckCircle} className={cx('icon')} beat />;
    statusComponent = <span className={cx('status-name')}>Đơn hàng đã được giao thành công</span>;
  }

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        {historyDetails.orderDetail &&
          historyDetails.orderDetail.map((order) => {
            return (
              <div className={cx('content')} key={order.id}>
                <div className={cx('content-left')}>
                  <Image className={cx('img')} src={order.Image}></Image>
                </div>
                <div className={cx('content-center')}>
                  <span className={cx('book-name')}>{order.Name}</span>
                  <span className={cx('book-category')}>Tác giả: {order.Author}</span>
                  <span className={cx('book-price')}>
                    {order.Fixed_Price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                  </span>
                  <span className={cx('book-quantity')}>x{order.quantity}</span>
                </div>
                <div className={cx('content-right')}>
                  <div className={cx('status')}>
                    {iconComponent}
                    {statusComponent}
                  </div>
                  <div className={cx('options')}>
                    <Button blue className={cx('btn')}>
                      Đánh giá
                    </Button>
                    <Button to={`${config.routes.bookdetail}?id=${order.idBook}`} white className={cx('btn')}>
                      Mua lại
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default BookItemHistory;
