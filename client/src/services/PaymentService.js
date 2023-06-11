import axios from 'axios';

export const getConfig = async (data, access_token) => {
  const res = await axios.get('http://localhost:5000/api/payment/config');

  return res.data;
};
