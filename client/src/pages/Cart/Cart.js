import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Image from '~/components/Image';
import Button from '~/components/Button';
import styles from './Cart.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function Cart () {
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
    <div className={cx('cart-items-container')}>
      {cartItems.length === 0 ? (
        <p className={cx('cart-item-null')}>Không có sản phẩm nào trong giỏ hàng của bạn.</p>
      ) : (
        <ul className={cx('cart-items-list')}>
          {cartItems.map((item) => (
            <li key={item.id} className={cx('cart-item')}>
              <div className={cx('cart-item-details')}>
                <Image src={item.image} alt={item.Name} />
                <div className={cx('cart-item-info')}>
                  <p className={cx('cart-item-name')}>{item.Name}</p>
                  <p>{item.supplier}</p>
                  <div className={'cart-item-quantity'}>
                    <span>Số lượng: {item.quantity}</span>
                  </div>
                </div>
              </div>
              <div className={cx('cart-item-function')}>
                <p className={cx('cart-item-price')}>{item.price * item.quantity}đ</p>
                <div className={cx('cart-item-btn')}>
                  <Button primary={true}>Thanh toán</Button>
                  <Button outline={true}>Xóa</Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Cart;
