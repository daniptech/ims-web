import React from 'react';
import { HomeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { faBagShopping, faCartFlatbed, faChartSimple } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function getItem(label, key, icon, children) {
  if (key !== 'items') {
    return {
      key,
      icon,
      children,
      label
    };
  }
}
const adminItems = [
  getItem('Home', 'home', <HomeOutlined />),
  getItem('Inventory', 'inventory', <FontAwesomeIcon icon={faCartFlatbed} />, [
    getItem('Items', 'items'),
    getItem('Composite Items', 'compositeItem'),
    getItem('Item Groups', 'itemGroups'),
    getItem('Price Lists', 'priceList'),
    getItem('Inventory Adjustments', 'inventoryAdjustments')
  ]),
  getItem('Sales', 'sales', <ShoppingCartOutlined />, [
    getItem('Customers', 'customers'),
    getItem('Sales Order', 'salesOrder'),
    getItem('Packages', 'packages'),
    getItem('Shipments', 'shipment'),
    getItem('Delivery Challans', 'deliveryChallans'),
    getItem('Invoice', 'invoices'),
    getItem('Payment Received', 'paymentReceived'),
    getItem('sales Return', 'salesReturn'),
    getItem('Credit Notes', 'creditNotes')
  ]),
  getItem('Purchase', 'purchase', <FontAwesomeIcon icon={faBagShopping} />, [
    getItem('Vendors', 'vendor'),
    getItem('Purchase Order', 'purchaseOrder'),
    getItem('Purchase Receives', 'purchaseReceives'),
    getItem('Bills', 'bills'),
    getItem('Payments Mode', 'paymentMode'),
    getItem('Vendor Credits', 'vendorCredit')
  ]),
  getItem('Reports', 'reports', <FontAwesomeIcon icon={faChartSimple} />),
  getItem('User', 'user'),
  getItem('Role', 'role')
];

const managerItems = [
  getItem('Home', 'home', <HomeOutlined />),
  getItem('Inventory', 'inventory', <FontAwesomeIcon icon={faCartFlatbed} />, [
    getItem('Items', 'items'),
    getItem('Item Groups', 'itemGroups'),
    getItem('Price Lists', 'priceList'),
    getItem('Inventory Adjustments', 'inventoryAdjustments')
  ]),
  getItem('Sales', 'sales', <ShoppingCartOutlined />, [
    getItem('Customers', 'customers'),
    getItem('Sales Order', 'salesOrder'),
    getItem('Packages', 'packages'),
    getItem('Shipments', 'shipment'),
    getItem('Delivery Challans', 'deliveryChallans'),
    getItem('Invoice', 'invoices'),
    getItem('Payment Received', 'paymentReceived')
  ]),
  getItem('Purchase', 'purchase', <FontAwesomeIcon icon={faBagShopping} />, [
    getItem('Vendors', 'vendor'),
    getItem('Purchase Order', 'purchaseOrder'),
    getItem('Bills', 'bills')
  ]),
  getItem('Reports', 'reports', <FontAwesomeIcon icon={faChartSimple} />)
];

const staffItems = [
  getItem('Home', 'home', <HomeOutlined />),
  getItem('Sales', 'sales', <ShoppingCartOutlined />, [
    getItem('Customers', 'customers'),
    getItem('Sales Order', 'salesOrder'),
    getItem('Packages', 'packages'),
    getItem('Shipments', 'shipment'),
    getItem('Invoice', 'invoices')
  ]),
  getItem('Purchase', 'purchase', <FontAwesomeIcon icon={faBagShopping} />, [
    getItem('Vendors', 'vendor'),
    getItem('Purchase Order', 'purchaseOrder'),
    getItem('Bills', 'bills')
  ])
];
const defaultItems = [getItem('Home', 'home', <HomeOutlined />)];

export { adminItems, managerItems, staffItems, defaultItems };
