import * as httpRequest from '~/utils/httpRequest';

export const showCategory = async () => {
  try {
    const res = await httpRequest.get('category');
    return res;
  } catch (e) {
    console.log(e);
  }
};
