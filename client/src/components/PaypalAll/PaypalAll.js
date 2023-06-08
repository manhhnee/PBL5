import React, { useEffect, useState } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import * as PaymentService from '../../services/PaymentService';

const PaypalAll = ({ address, orderItems }) => {
  console.log(address, orderItems);
  const [sdkReady, setSdkReady] = useState(false);
  const [clientId, setClientId] = useState('');
  const [loggedIn, setLoggedIn] = useState(!!getJwtFromCookie());
  const [totalPrice, setTotalPrice] = useState(null);

  const addPaypalScript = async () => {
    const { data } = await PaymentService.getConfig();
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
    setClientId(data);
  };

  function getJwtFromCookie() {
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
          payment: 2,
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
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((e) => {
        toast.error(e);
      });
  };

  useEffect(() => {
    if (!window.paypal) {
      addPaypalScript();
    } else {
      setSdkReady(true);
    }
  }, []);

  useEffect(() => {
    setLoggedIn(!!getJwtFromCookie());
    const totalPrice = orderItems.reduce((total, item) => total + item.Price, 0);
    setTotalPrice(totalPrice);
  }, [orderItems]);

  return (
    <div>
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
      {address.trim() && loggedIn && sdkReady && orderItems.length > 0 && (
        <PayPalButton
          amount={(totalPrice / 24000).toFixed(2)}
          onSuccess={(details, data) => {
            handleOrderAll(address);
            return fetch('/paypal-transaction-complete', {
              method: 'post',
              body: JSON.stringify({
                orderID: data.orderID,
              }),
            });
          }}
          onError={() => alert('Error')}
        />
      )}
    </div>
  );
};

export default PaypalAll;
