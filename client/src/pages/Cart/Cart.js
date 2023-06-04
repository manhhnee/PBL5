import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import { useSpring, animated } from 'react-spring';
import { Flip, ToastContainer, toast } from 'react-toastify';

import BookItemCart from '~/components/BookItemCart/BookItemCart';
import Button from '~/components/Button/Button';
import styles from './Cart.module.scss';
import Popup from '~/components/Popup/Popup';
import InputForm from '~/components/InputForm/InputForm';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [payload, setPayload] = useState({
    address: '',
  });
  const modalAnimation = useSpring({
    opacity: isModalOpen ? 1 : 0,
  });
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

  const handleOrderAll = async (address) => {
    await axios
      .post(
        'http://localhost:5000/api/order/add',
        {
          address: address,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getJwtFromCookie()}`,
          },
        },
      )
      .then((res) => {
        alert(res.data.message);
        window.location.reload();
      })
      .catch((e) => {
        alert(e);
      });
  };

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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={cx('container')}>
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
      {cartItems.length === 0 ? (
        <p className={cx('cart-item-null')}>Không có sản phẩm nào trong giỏ hàng của bạn.</p>
      ) : (
        cartItems.map((cartItem) => {
          return (
            <>
              <BookItemCart data={cartItem} key={cartItem.id} />
              <div className={cx('options')}>
                <Button onClick={() => openModal()} primary>
                  Thanh toán
                </Button>
              </div>
            </>
          );
        })
      )}

      <Popup isOpen={isModalOpen} onRequestClose={() => closeModal()} width={String('500px')} height={'300px'}>
        <animated.div style={modalAnimation}>
          <h2>Xác nhận thanh toán</h2>
          <div className={cx('input-field')}>
            <div className={cx('header')}>Nhà sản xuất</div>
            <InputForm
              placeholder=""
              type="text"
              value={payload.address}
              setValue={setPayload}
              name={'address'}
              className={cx('input')}
              leftIcon={faLocationDot}
            />
          </div>
          <div className={cx('options')}>
            <Button onClick={() => handleOrderAll(payload.address)} outline>
              Xác nhận
            </Button>
          </div>
        </animated.div>
      </Popup>
    </div>
  );
}

export default Cart;
