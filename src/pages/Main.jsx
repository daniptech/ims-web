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
      getItem('Sales Order', '8'),
      getItem('Packages', '9'),
      getItem('Shipments', '10'),
      getItem('Delivery Challans', '11'),
      getItem('Invoice', '12'),
      getItem('Payment Received', '13'),
      getItem('sales Return', '14'),
      getItem('Credit Notes', '15')
    ]),
    getItem('Purchasea', 'purchasea', <FontAwesomeIcon icon={faBagShopping} />, [
      getItem('Vendors', '16'),
      getItem('Expenses', '17'),
      getItem('Purchase Orders', '18'),
      getItem('Purchase Receives', '19'),
      getItem('Bills', '20'),
      getItem('Payments Mode', '21'),
      getItem('Vendor Credits', '22')
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
            <Route path={routes.inventory.inventoryAdjustments.new} element={<CreateAndEditInventoryAdjustment />} />
            <Route path={routes.inventory.inventoryAdjustments.view} element={<InventoryAdjustmentView />} />
            <Route path={routes.sales.customers.self} element={<CustomerItemsList/>}/>
            <Route path={routes.sales.customers.view} element={<CustomerView/>}/>
            <Route path={routes.sales.customers.new} element={<CreateAndEditCustomer/>}/>
            <Route path={routes.sales.customers.edit} element={<CreateAndEditCustomer/>}/>
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default Main;
