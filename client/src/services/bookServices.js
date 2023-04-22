import * as httpRequest from '~/utils/httpRequest';

export const showBook = async () => {
  try {
    const res = await httpRequest.get('book');
    return res;
  } catch (e) {
    console.log(e);
  }
};
