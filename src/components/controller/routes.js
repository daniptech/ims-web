import { include } from 'named-urls';

export const routes = {
  login: include('/login', {
    self: ''
  }),
  register: include('/register', {
    self: ''
  }),
  home: include('/home', {
    self: '',
    dashboard: 'inventory-dashboard'
  }),
  inventory: include('/inventory', {
    self: '',
    items: include('items', {
      self: '',
      view: ':id',
      new: 'new',
      edit: ':id/edit'
    }),
    itemGroups: include('item-groups', {
      self: '',
      view: ':id',
      new: 'new',
      edit: ':id/edit'
    }),
    compositeItem: include('composite-items', {
      self: '',
      view: ':id',
      new: 'new',
      edit: ':id/edit'
    }),
    priceList: include('price-list', {
      self: '',
      view: ':id',
      new: 'new',
      edit: ':id/edit'
    }),
    inventoryAdjustments: include('inventory-adjustments', {
      self: '',
      view: ':id',
      new: 'new',
      edit: ':id/edit'
    })
  }),
  sales: include('/sales', {
    self: '',
    customers: include('customers', {
      self: '',
      view: ':id',
      new: 'new',
      edit: ':id/edit'
    }),
    salesOrder: include('salesOrder', {
      self: '',
      view: ':id',
      new: 'new',
      edit: ':id/edit'
    }),
    packages: include('packages', {
      self: '',
      view: ':id',
      new: 'new',
      edit: ':id/edit'
    }),
    shipment: include('shipment', {
      self: '',
      view: ':id',
      new: 'new',
      edit: ':id/edit'
    }),
    deliveryChallans: include('deliveryChallans', {
      self: '',
      view: ':id',
      new: 'new',
      edit: ':id/edit'
    })
  }),
  purchase: include('/purchase', {
    self: '',
    vendor: include('vendor', {
      self: '',
      view: ':id',
      new: 'new',
      edit: ':id/edit'
    }),
    purchaseOrder: include('purchase-order', {
      self: '',
      view: ':id',
      new: 'new',
      edit: ':id/edit'
    }),
    purchaseReceives: include('purchase-receives', {
      self: '',
      view: ':id',
      new: 'new',
      edit: ':id/edit'
    }),
    bill: include('bills', {
      self: '',
      view: ':id',
      new: 'new',
      edit: ':id/edit'
    }),
    paymentMode: include('payment-mode', {
      self: '',
      view: ':id',
      new: 'new',
      edit: ':id/edit'
    }),
    vendorCredit: include('vendor-credit', {
      self: '',
      view: ':id',
      new: 'new',
      edit: ':id/edit'
    })
  })
};
