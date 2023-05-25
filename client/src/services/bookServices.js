import * as httpRequest from '~/utils/httpRequest';

export const showBook = async () => {
  try {
    const res = await httpRequest.get('book');
    return res;
  } catch (e) {
    console.log(e);
  }
};

export const show20Book = async (limit = 20) => {
  try {
    const res = await httpRequest.get('book', {
      params: {
        limit,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
