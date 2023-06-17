import axios from 'axios';

export const getConfig = async (data, access_token) => {
  const res = await axios.get('https://pbl5-server-shpk.onrender.com/api/payment/config');

  return res.data;
};
