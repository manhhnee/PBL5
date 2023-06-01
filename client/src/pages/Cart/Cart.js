import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';

import BookItemCart from '~/components/BookItemCart/BookItemCart';
import styles from './Cart.module.scss';
import Button from '~/components/Button/Button';

const cx = classNames.bind(styles);

function Cart() {
  const [cartItems, setCartItems] = useState([]);
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
    const fetchApiCarts = async () => {
      const response = await axios.get(`http://localhost:5000/api/cart/items`, {
        headers: {
          Authorization: `Bearer ${getJwtFromCookie()}`,
        },
      });
      const cartsData = await response.data;
      setCartItems(cartsData.cartItem);
    };
    fetchApiCarts();
  }, []);

  return (
    <div className={cx('container')}>
      {cartItems.length === 0 ? (
        <p className={cx('cart-item-null')}>Không có sản phẩm nào trong giỏ hàng của bạn.</p>
      ) : (
        cartItems.map((cartItem) => {
          return <BookItemCart data={cartItem} key={cartItem.id} />;
        })
      )}
      <div className={cx('options')}>
        <Button primary>Thanh toán tất cả</Button>
      </div>
    </div>
  );
}

export default Cart;
