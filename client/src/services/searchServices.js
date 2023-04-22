import axios from 'axios';
import * as httpRequest from '~/utils/httpRequest';

export const search = async () => {
  try {
    const res = await httpRequest.get('book');
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
