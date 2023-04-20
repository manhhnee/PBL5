import * as httpRequest from '~/utils/httpRequest';

export const apiLogin = async () => {
  try {
    const res = await httpRequest.get('login', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
};
