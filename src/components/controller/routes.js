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
    slef: '',
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
    }),
  }),
  sales:include('/sales',{
    self:'',
    customers:include('customer-items',{
      self: '',
      view: ':id',
      new: 'new',
      edit: ':id/edit'
    })
  })
};
