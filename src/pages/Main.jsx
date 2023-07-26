import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Dashboard/Home';
import Sidebar from '../components/Sidebar';
import NavBar from '../components/NavBar';
import ItemsList from './Inventory/items/ItemsList';
import { HomeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { faBagShopping, faCartFlatbed, faChartSimple } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { routes } from '../components/controller/routes';
import ItemView from './Inventory/items/ItemView';
import CompositeView from './Inventory/composite/CompositeView';
import CreateAndEditCompositeItem from './Inventory/composite/CreateAndEditCompositeItem';
import CreateAndEditItems from './Inventory/items/CreateAndEditItems';
import CompositeItemsList from './Inventory/composite/CompositeItemsList';
import ItemGroupList from './Inventory/itemGroup/ItemGroupList';
import ItemGroupVIew from './Inventory/itemGroup/ItemGroupVIew';
import CreateAndEditGroupItem from './Inventory/itemGroup/CreateAndEditGroupItem';
import PriceListItems from './Inventory/PriceList/PriceListItems';
import CreateAndEditPriceList from './Inventory/PriceList/CreateAndEditPriceList';
import InventoryAdjustmentList from './Inventory/inventoryAdjustment/InventoryAdjustmentList';
import CreateAndEditInventoryAdjustment from './Inventory/inventoryAdjustment/CreateAndEditInventoryAdjustment';
import InventoryAdjustmentView from './Inventory/inventoryAdjustment/InventoryAdjustmentView';
import CustomerItemsList from './Sales/Customer/CustomerItemList'
import CustomerView from './Sales/Customer/CustomerView'
import CreateAndEditCustomer from './Sales/Customer/CreateAndEditCustomer';
//import { CustomerView, CustomerItemsList} from './Sales/Customer';
import VendorList from './Purchase/Vendor/VendorList';
import VendorView from './Purchase/Vendor/VendorView';
import CreateAndEditVendor from './Purchase/Vendor/CreateAndEditVendor';
import SalesOrderItemsList from './Sales/SalesOrder/SalesOrderItemList';
import { CreateAndEditSalesOrder } from './Sales/SalesOrder/CreateAndEditSalesOrder';
import SalesOrderView from './Sales/SalesOrder/SalesOrderView';
import PackageItemList from './Sales/Packages/PackageItemList';
import CreateAndEditPackage from './Sales/Packages/CreateAndEditPackage';
import ShipmentItemsList from './Sales/Shipment/ShipmentItemList';
import CreateAndEditShipment from './Sales/Shipment/CreateAndEditShipment';
import DeliveryChallansItemList from './Sales/DeliveryChallans/DeliveryChallansItemList';
import PurchaseOrderList from './Purchase/PurchaseOrder/PurchaseOrderList';
import PurchaseOrderView from './Purchase/PurchaseOrder/PurchaseOrderView';
import CreateAndEditPurchaseOrder from './Purchase/PurchaseOrder/CreateAndEditPurchaseOrder'
import PurchaseReceiveList from './Purchase/PurchaseReceive/PurchaseReceiveList';
import PurchaseReceiveView from './Purchase/PurchaseReceive/PurchaseReceiveView';
import CreateAndEditPurchaseReceive from './Purchase/PurchaseReceive/CreateAndEditPurchaseReceive';
import BillList from './Purchase/Bills/BillList';
import BillView from './Purchase/Bills/BillView';
import CreateAndEditBill from './Purchase/Bills/CreateAndEditBill';
import PaymentModeList from './Purchase/PaymentMode/PaymentModeList';
import PaymentModeView from './Purchase/PaymentMode/PaymentModeView';
import CreateAndEditPaymentMode from './Purchase/PaymentMode/CreateAndEditPaymentMode';

const Main = () => {
  const [selectKey, setSelectKey] = useState('1');
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label
    };
  }
  const items = [
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
      getItem('Invoice', '12'),
      getItem('Payment Received', '13'),
      getItem('sales Return', '14'),
      getItem('Credit Notes', '15')
    ]),
    getItem('Purchase', 'purchase', <FontAwesomeIcon icon={faBagShopping} />, [
      getItem('Vendors', 'vendor'),
      getItem('Purchase Order', 'purchaseOrder'),
      getItem('Purchase Receives', 'purchaseReceives'),
      getItem('Bills', 'bill'),
      getItem('Payments Mode', 'paymentMode'),
      getItem('Vendor Credits', 'vendorCredit')
    ]),
    getItem('Reports', 'reports', <FontAwesomeIcon icon={faChartSimple} />)
  ];
  return (
    <div className="d-flex w-100">
      <Sidebar items={items} selectKey={selectKey} setSelectKey={setSelectKey} />
      <div className="w-100" style={{ maxHeight: '100vh', height: '100%', overflow: 'hidden' }}>
        <NavBar />
        <Routes>
          <Route path={routes.home.dashboard} element={<Home />} />
          <Route path={routes.inventory.self}>
            <Route path={routes.inventory.items.self} element={<ItemsList />} />
            <Route path={routes.inventory.items.view} element={<ItemView />} />
            <Route path={routes.inventory.items.new} element={<CreateAndEditItems />} />
            <Route path={routes.inventory.items.edit} element={<CreateAndEditItems />} />
            <Route path={routes.inventory.compositeItem.self} element={<CompositeItemsList />} />
            <Route path={routes.inventory.compositeItem.view} element={<CompositeView />} />
            <Route path={routes.inventory.compositeItem.new} element={<CreateAndEditCompositeItem />} />
            <Route path={routes.inventory.itemGroups.self} element={<ItemGroupList />} />
            <Route path={routes.inventory.itemGroups.view} element={<ItemGroupVIew />} />
            <Route path={routes.inventory.itemGroups.new} element={<CreateAndEditGroupItem />} />
            <Route path={routes.inventory.itemGroups.edit} element={<CreateAndEditGroupItem />} />
            <Route path={routes.inventory.priceList.self} element={<PriceListItems />} />
            <Route path={routes.inventory.priceList.new} element={<CreateAndEditPriceList />} />
            <Route path={routes.inventory.priceList.edit} element={<CreateAndEditPriceList />} />
            <Route path={routes.inventory.inventoryAdjustments.self} element={<InventoryAdjustmentList />} />
            <Route path={routes.inventory.inventoryAdjustments.view} element={<InventoryAdjustmentView />} />
            <Route path={routes.inventory.inventoryAdjustments.new} element={<CreateAndEditInventoryAdjustment />} />
            <Route path={routes.inventory.inventoryAdjustments.edit} element={<CreateAndEditInventoryAdjustment />} />
          </Route>
          <Route path={routes.sales.self}>
            <Route path={routes.sales.customers.self} element={<CustomerItemsList/>}/>
            <Route path={routes.sales.customers.view} element={<CustomerView/>}/>
            <Route path={routes.sales.customers.new} element={<CreateAndEditCustomer/>}/>
            <Route path={routes.sales.customers.edit} element={<CreateAndEditCustomer/>}/>
            <Route path={routes.sales.salesOrder.self} element={<SalesOrderItemsList/>}/>
            <Route path={routes.sales.salesOrder.new} element={<CreateAndEditSalesOrder/>}/>
            <Route path={routes.sales.salesOrder.edit} element={<CreateAndEditSalesOrder/>}/>
            <Route path={routes.sales.salesOrder.view} element={<SalesOrderView/>}/>
            <Route path={routes.sales.packages.self} element={<PackageItemList/>}/>
            <Route path={routes.sales.packages.new} element={<CreateAndEditPackage/>}/>
            <Route path={routes.sales.packages.edit} element={<CreateAndEditPackage/>}/>
            <Route path={routes.sales.shipment.self} element={<ShipmentItemsList/>}/>
            <Route path={routes.sales.shipment.new} element={<CreateAndEditShipment/>}/>
            <Route path={routes.sales.shipment.edit} element={<CreateAndEditShipment/>}/>
            <Route path={routes.sales.deliveryChallans.self} element={<DeliveryChallansItemList/>}/>
          </Route>
          <Route path={routes.purchase.self}>
            <Route path={routes.purchase.vendor.self} element={<VendorList />} />
            <Route path={routes.purchase.vendor.view} element={<VendorView />} />
            <Route path={routes.purchase.vendor.edit} element={<CreateAndEditVendor />} />
            <Route path={routes.purchase.vendor.new} element={<CreateAndEditVendor />} />
            <Route path={routes.purchase.purchaseOrder.self} element={<PurchaseOrderList />} />
            <Route path={routes.purchase.purchaseOrder.view} element={<PurchaseOrderView />} />
            <Route path={routes.purchase.purchaseOrder.new} element={<CreateAndEditPurchaseOrder />} />
            <Route path={routes.purchase.purchaseOrder.edit} element={<CreateAndEditPurchaseOrder />} />
            <Route path={routes.purchase.purchaseReceives.self} element={<PurchaseReceiveList />} />
            <Route path={routes.purchase.purchaseReceives.view} element={<PurchaseReceiveView />} />
            <Route path={routes.purchase.purchaseReceives.new} element={<CreateAndEditPurchaseReceive />} />
            <Route path={routes.purchase.purchaseReceives.edit} element={<CreateAndEditPurchaseReceive />} />
            <Route path={routes.purchase.bill.self} element={<BillList />} />
            <Route path={routes.purchase.bill.view} element={<BillView />} />
            <Route path={routes.purchase.bill.new} element={<CreateAndEditBill />} />
            <Route path={routes.purchase.bill.edit} element={<CreateAndEditBill />} />
            <Route path={routes.purchase.paymentMode.self} element={<PaymentModeList />} />
            <Route path={routes.purchase.paymentMode.view} element={<PaymentModeView />} />
            <Route path={routes.purchase.paymentMode.new} element={<CreateAndEditPaymentMode />} />
            <Route path={routes.purchase.paymentMode.edit} element={<CreateAndEditPaymentMode />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default Main;
