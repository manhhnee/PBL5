import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Image from '~/components/Image';
import Button from '~/components/Button';
import styles from './BookItemCart.module.scss';
import axios from 'axios';

const cx = classNames.bind(styles);

function BookItemCart({ data }) {
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

  const HandleDeteteCart = async () => {
    await axios
      .delete(`http://localhost:5000/api/cart/delete/${data.id}`, {
        headers: { Authorization: `Bearer ${getJwtFromCookie()}` },
      })
      .then((response) => {
        alert(response.data.message);
      })
      .catch((err) => {
        alert('Sth wrong', err);
      });
    window.location.reload();
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('content-left')}>
        <Image className={cx('img')} src={data.Image}></Image>
      </div>
      <div className={cx('content-center')}>
        <span className={cx('book-name')}>{data.Name}</span>
        {/* <span className={cx('book-category')}>Thể loại: {data.Category_Name}</span> */}
        <span className={cx('book-price')}>
          {data.Price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', '')}
        </span>
        <span className={cx('book-quantity')}>x{data.quantity}</span>
      </div>
      <div className={cx('content-right')}>
        <div className={cx('options')}>
          <Button primary className={cx('btn')}>
            Thanh toán
          </Button>
          <Button onClick={() => HandleDeteteCart()} outline className={cx('btn')}>
            Xóa
          </Button>
        </div>
      </div>
    </div>
  );
}

BookItemCart.protoTypes = {
  data: PropTypes.node.isRequired,
};

export default BookItemCart;
