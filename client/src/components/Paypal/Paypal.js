import React, { useEffect, useState } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import * as PaymentService from '../../services/PaymentService';

const Paypal = ({ price }) => {
  const [sdkReady, setSdkReady] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [clientId, setClientId] = useState('');

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
    setClientId(data); // Set the PayPal client ID from the data object
  };

  useEffect(() => {
    const totalPriceElement = document.querySelector('.totalPrice');
    if (totalPriceElement) {
      setTotalPrice(parseFloat(totalPriceElement.innerText));
      console.log(totalPriceElement.innerText);
    }

    if (!window.paypal) {
      addPaypalScript();
    } else {
      setSdkReady(true);
    }
  }, []);

  return (
    <div>
      <PayPalButton
        amount={price}
        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
        onSuccess={(details, data) => {
          alert('Transaction completed by ' + details.payer.name.given_name);

          // OPTIONAL: Call your server to save the transaction
          return fetch('/paypal-transaction-complete', {
            method: 'post',
            body: JSON.stringify({
              orderID: data.orderID,
            }),
          });
        }}
        onError={() => alert('Error')}
      />
    </div>
  );
};

export default Paypal;
