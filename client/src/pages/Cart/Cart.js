import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';

import BookItemCart from '~/components/BookItemCart/BookItemCart';
import styles from './Cart.module.scss';

const cx = classNames.bind(styles);

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/cart/items', { withCredentials: true })
      .then((response) => {
        setCartItems(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
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
    </div>
  );
}

export default Cart;
