import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { Flip, ToastContainer, toast } from 'react-toastify';

import Image from '~/components/Image';
import styles from './Order.module.scss';
import Button from '../Button/Button';
import axios from 'axios';
import { faX } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Order({ data, icon }) {
  console.log(data.Address);
  if (!data) {
    return null;
  }
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
  const handleChangeStatus = async (id) => {
    await axios
      .put(
        `http://localhost:5000/api/order/changeStatus/${id}`,
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
      .catch((e) => {
        toast.success(e);
      });
  };

  const orderDate = data.OrderDate;
  const formattedDate = moment(orderDate).format('YYYY-MM-DD');
  const formattedTime = moment(orderDate, 'HH:mm').format('hh:mm A');

  let iconComponent;
  let buttonComponent;
  if (data.id_Status === 1) {
    iconComponent = <FontAwesomeIcon className={cx('icon')} icon={icon} spinPulse />;
    buttonComponent = (
      <Button onClick={() => handleChangeStatus(data.id)} className={cx('btn')} blue>
        Xác nhận
      </Button>
    );
  } else if (data.id_Status === 2) {
    iconComponent = <FontAwesomeIcon className={cx('icon')} icon={icon} bounce />;
    buttonComponent = (
      <Button onClick={() => handleChangeStatus(data.id)} className={cx('btn')} blue>
        Xác nhận
      </Button>
    );
  } else if (data.id_Status === 3) {
    iconComponent = <FontAwesomeIcon className={cx('icon')} icon={icon} beat />;
  } else if (data.id_Status === 4) {
    iconComponent = <FontAwesomeIcon className={cx('icon')} icon={faX} beat />;
  } else {
    iconComponent = null;
    buttonComponent = null;
  }
  return (
    <div className={cx('order')}>
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
      <Image className={cx('order-image')} src={data.Avatar} alt="avatar"></Image>
      {iconComponent}

      <div className={cx('name-order')}>{data.FirstName + ' ' + data.LastName}</div>

      <div className={cx('day-order')}>{formattedDate}</div>
      <div className={cx('address')}>{data.OrderAddress}</div>
      <div className={cx('price-order')}>
        {data.totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', '')}
      </div>
      {buttonComponent}
    </div>
  );
}

export default Order;
