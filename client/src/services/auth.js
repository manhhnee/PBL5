import * as httpRequest from '~/utils/httpRequest';

export const apiBook = async () => {
  try {
    const res = await httpRequest.get('book');
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const apiLogin = async () => {
  try {
    const res = await httpRequest.get('login');
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
};
