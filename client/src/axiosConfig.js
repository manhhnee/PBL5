import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // gắn token vào header
    let token = localStorage.getItem('persist:auth');
    console.log(token);

    return config;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  },
);

export default instance;
