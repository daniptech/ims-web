import { getAPIUrl } from '../../global';
import { Get } from '../../headerIntercepter';

export const getPriceList = (params = {}) => {
  const url = getAPIUrl('inventory.priceList.all');
  return Get(url, true, params);
};
