import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { Flip, ToastContainer, toast } from 'react-toastify';

import Image from '~/components/Image';
import Button from '~/components/Button';
import styles from './BookItemCart.module.scss';
import axios from 'axios';

const cx = classNames.bind(styles);

function BookItemCart({ data, onSelect }) {
  const [isChecked, setIsChecked] = useState(false);

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

  const handleDeleteCart = async () => {
    await axios
      .delete(`http://localhost:5000/api/cart/delete/${data.id}`, {
        headers: { Authorization: `Bearer ${getJwtFromCookie()}` },
      })
      .then((response) => {
        toast.success(response.data.message);

        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((err) => {
        alert('Something went wrong', err);
      });
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    onSelect(data, !isChecked);
  };

  return (
    <div className={cx('wrapper')}>
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
      <div className={cx('content-left')}>
        <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} className={cx('checkbox')} />
        <Image className={cx('img')} src={data.Image}></Image>
      </div>
      <div className={cx('content-center')}>
        <span className={cx('book-name')}>{data.Name}</span>
        <span className={cx('book-category')}>Thể loại: {data.Category}</span>
        <span className={cx('book-price')}>
          {data.Price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', '')}
        </span>
        <span className={cx('book-quantity')}>x{data.quantity}</span>
      </div>
      <div className={cx('content-right')}>
        <div className={cx('options')}>
          <Button onClick={() => handleDeleteCart()} outline className={cx('btn')}>
            Xóa
          </Button>
        </div>
      </div>
    </div>
  );
}

BookItemCart.protoTypes = {
  data: PropTypes.node.isRequired,
  onSelect: PropTypes.func,
};

export default BookItemCart;
