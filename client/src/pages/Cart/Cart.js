import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import { useSpring, animated } from 'react-spring';
import { Flip, ToastContainer, toast } from 'react-toastify';

import BookItemCart from '~/components/BookItemCart';
import Button from '~/components/Button';
import InputForm from '~/components/InputForm';
import Popup from '~/components/Popup';
import styles from './Cart.module.scss';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import PaypalAll from '~/components/PaypalAll/PaypalAll';

const cx = classNames.bind(styles);

function Cart() {
  const [paymentMethod, setPaymentMethod] = useState('cash'); // Mặc định là tiền mặt khi nhận hàng
  const [cartItems, setCartItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [payload, setPayload] = useState({
    address: '',
  });
  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };
  const [errorMessages, setErrorMessages] = useState({
    address: '',
  });
  const validateForm = () => {
    let isValid = true;
    const errors = {};

    if (!payload.address.trim()) {
      errors.address = 'Vui lòng nhập địa chỉ đặt hàng!';
      isValid = false;
    }

    setErrorMessages(errors);

    return isValid;
  };
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

  const handleBookItemSelect = (bookItem) => {
    const updatedOrderItems = orderItems.slice();

    const index = updatedOrderItems.findIndex((item) => item.id === bookItem.id);

    if (index !== -1) {
      updatedOrderItems.splice(index, 1);
    } else {
      updatedOrderItems.push(bookItem);
    }

    setOrderItems(updatedOrderItems);
  };

  const handleOrderAll = async (address) => {
    if (orderItems.length === 0) {
      toast.error('Vui lòng chọn sản phẩm để thanh toán');
    } else {
      if (!validateForm()) {
        return;
      } else {
        const orderItemsPayload = orderItems.map((item) => ({
          idCartItem: item.id,
          id_BookSupplier: item.id_BookSupplier,
          quantity: item.quantity,
          Price: item.Price,
          Amount: item.Amount,
        }));

        await axios
          .post(
            'http://localhost:5000/api/order/add',
            {
              address: address,
              payment: 1,
              OrderItems: orderItemsPayload,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getJwtFromCookie()}`,
              },
            },
          )
          .then((res) => {
            toast.success(res.data.message);
            window.location.reload();
          })
          .catch((e) => {
            alert(e);
          });
      }
    }
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
            <BookItemCart
              data={cartItem}
              onSelect={() => {
                handleBookItemSelect(cartItem);
              }}
              key={cartItem.id}
            />
          );
        })
      )}
      {cartItems.length > 0 && (
        <div className={cx('options')}>
          <Button className={cx('btn')} onClick={() => openModal()} primary>
            Thanh toán
          </Button>
        </div>
      )}
      ,
      <Popup isOpen={isModalOpen} onRequestClose={() => closeModal()} width={String('500px')} height={'350px'}>
        <animated.div style={modalAnimation}>
          <h2>Xác nhận thanh toán</h2>
          <div className={cx('input-field')}>
            <div className={cx('header')}>Nhập địa chỉ giao hàng</div>
            <InputForm
              placeholder=""
              type="text"
              value={payload.address}
              setValue={setPayload}
              name={'address'}
              className={cx('input')}
              leftIcon={faLocationDot}
            />
            {errorMessages.address && <div className={cx('error-message')}>{errorMessages.address}</div>}
          </div>
          <div className={cx('options')}>
            <div className={cx('payment-methods')}>
              <label>
                <input
                  type="radio"
                  value="cash"
                  checked={paymentMethod === 'cash'}
                  onChange={handlePaymentMethodChange}
                />
                Thanh toán bằng tiền mặt khi nhận hàng
              </label>
              <label>
                <input
                  type="radio"
                  value="paypal"
                  checked={paymentMethod === 'paypal'}
                  onChange={handlePaymentMethodChange}
                />
                Thanh toán bằng PayPal
              </label>
            </div>
            {paymentMethod === 'cash' ? (
              <Button onClick={() => handleOrderAll(payload.address)} outline>
                Xác nhận
              </Button>
            ) : (
              <PaypalAll address={payload.address} orderItems={orderItems} />
            )}
          </div>
        </animated.div>
      </Popup>
    </div>
  );
}

export default Cart;
