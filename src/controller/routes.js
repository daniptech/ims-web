import { include } from 'named-urls';

export const routes = {
  login: include('/login', {
    self: ''
  }),
  register: include('/register', {
    self: ''
  }),
  home: include('/home', {
    dashboard: 'inventoryDashboard'
  }),
  inventory: include('/inventory', {
    self: '',
    items: include('items', {
      self: '',
      view: ':id',
      new: 'new',
      edit: ':id/edit'
    }),
    itemGroups: include('itemGroups', {
      self: '',
      view: ':id',
      new: 'new',
      edit: ':id/edit'
    }),
    compositeItem: include('compositeItem', {
      self: '',
      view: ':id',
      new: 'new',
      edit: ':id/edit'
    }),
    priceList: include('priceList', {
      self: '',
      view: ':id',
      new: 'new',
      edit: ':id/edit'
    }),
    inventoryAdjustments: include('inventoryAdjustments', {
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
    }),
    invoices: include('invoices', {
      self: '',
      view: ':id',
      new: 'new',
      edit: ':id/edit'
    }),
    creditNotes: include('creditNotes', {
      self: '',
      view: ':id',
      new: 'new',
      edit: ':id/edit'
    }),
    salesReturn: include('salesReturn', {
      self: '',
      view: ':id',
      new: 'new',
      edit: ':id/edit'
    }),
    paymentReceived: include('paymentReceived', {
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
    purchaseOrder: include('purchaseOrder', {
      self: '',
      view: ':id',
      new: 'new',
      edit: ':id/edit'
    }),
    purchaseReceives: include('purchaseReceives', {
      self: '',
      view: ':id',
      new: 'new',
      edit: ':id/edit'
    }),
    bills: include('bills', {
      self: '',
      view: ':id',
      new: 'new',
      edit: ':id/edit'
    }),
    paymentMode: include('paymentMode', {
      self: '',
      view: ':id',
      new: 'new',
      edit: ':id/edit'
    }),
    vendorCredit: include('vendorCredit', {
      self: '',
      view: ':id',
      new: 'new',
      edit: ':id/edit'
    })
  }),
  reports: include('reports', {
    self: ''
  })
};
