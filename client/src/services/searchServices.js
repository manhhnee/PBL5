import * as httpRequest from '~/utils/httpRequest';

export const search = async (search, limit = 5) => {
  try {
    const res = await httpRequest.get('book', {
      params: {
        search,
        limit,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
