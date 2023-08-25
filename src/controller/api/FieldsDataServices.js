import { getAPIUrl } from '../global';
import { Get, Post } from '../headerIntercepter';

export const getPaymentTerm = () => {
  const url = getAPIUrl('paymentTerm.all');
  return Get(url, true);
};

export const addPaymentTerm = (data) => {
  const url = getAPIUrl('paymentTerm.add');
  return Post(url, data, true);
};
