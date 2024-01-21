import { getEnvValue } from './Environment';
import { include, reverse } from 'named-urls';
import { getUserRole } from './localStorageHandler';

const endpoint = {
  auth: include('/api/user', {
    login: 'login',
    verifyOTP: 'authenticate',
    user: '',
    userAll: 'all',
    craeteUser: 'register',
    deleteUser:':id',
    updateUser:':id'
  }),
  inventory: include('/api', {
    item: include('item', {
      get: 'all',
      getSingleItem: ':id',
      create: 'add',
      update: 'update/:id',
      remove: 'delete/:id'
    }),
    priceList: include('priceList', {
      all: 'all',
      add: 'add',
      update: 'update/:id',
      remove: 'delete/:id'
    })
  }),
  sales: include('/api', {
    customer: include('customer', {
      get: 'all',
      getSingleCustomer: ':id',
      create: 'add',
      update: 'update/:id',
      remove: 'delete/:id'
    })
  }),
  purchase: include('/api', {
    vendor: include('vendor', {
      get: 'all',
      getSingleVendor: ':id',
      create: 'add',
      update: 'update/:id',
      remove: 'delete/:id'
    })
  }),
  paymentTerm: include('/api/PaymentTerm', {
    all: 'all',
    add: 'add',
    update: 'update/:id',
    remove: 'delete/:id'
  }),
  brand: include('/api/brand', {
    all: 'all',
    add: 'add',
    update: 'update/:id',
    remove: 'delete/:id'
  }),
  manufacturer: include('/api/manufacturer', {
    all: 'all',
    add: 'add',
    update: 'update/:id',
    remove: 'delete/:id'
  }),
  salesperson: include('/api/salesPerson', {
    all: 'all',
    add: 'add',
    update: 'update/:id',
    remove: 'delete/:id'
  }),
  reason: include('/api/reason', {
    all: 'all',
    add: 'add',
    remove: 'delete/:id'
  }),
  role: include('/api/roles', {
    all: 'all',
    modules: 'modules',
    add: 'add',
    getrole: ':id',
    delete: ':id',
    update: ':id'
  })
};

export function getAPIUrl(url, params = null) {
  const path = reverse(
    url.split('.').reduce((o, i) => o[i], endpoint),
    params
  );
  return getEnvValue('REACT_APP_API_URL') + path;
}

export function hasAccessFeature(accesslevel,module){
  let access=false
  const userRole=JSON.parse(getUserRole())
  userRole?.rolePermissions?.forEach(element => {
    if(element.module==module&&element.accessLevel==accesslevel){
      access=true
    }
  });
  return access
}
