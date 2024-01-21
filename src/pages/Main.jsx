import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Dashboard/Home';
import Sidebar from '../components/Sidebar';
import NavBar from '../components/NavBar';
import ItemsList from './Inventory/items/ItemsList';
import { routes } from '../controller/routes';
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
import CustomerItemsList from './Sales/Customer/CustomerItemList';
import CustomerView from './Sales/Customer/CustomerView';
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
import CreateAndEditPurchaseOrder from './Purchase/PurchaseOrder/CreateAndEditPurchaseOrder';
import PurchaseReceiveList from './Purchase/PurchaseReceive/PurchaseReceiveList';
import PurchaseReceiveView from './Purchase/PurchaseReceive/PurchaseReceiveView';
import CreateAndEditPurchaseReceive from './Purchase/PurchaseReceive/CreateAndEditPurchaseReceive';
import BillList from './Purchase/Bills/BillList';
import BillView from './Purchase/Bills/BillView';
import CreateAndEditBill from './Purchase/Bills/CreateAndEditBill';
import CreateAndEditDeliveryChallans from './Sales/DeliveryChallans/CreateAndEditDeliveryChallans';
import DeliveryChallansView from './Sales/DeliveryChallans/DeliveryChallansView';
import InvoicesItemList from './Sales/Invoices/InvoicesItemList';
import CreateAndEditInvoice from './Sales/Invoices/CreateAndEditInvoice';
import InvoicesView from './Sales/Invoices/InvoicesView';
import CreditNotesItemList from './Sales/CreditNotes/CreditNotesItemList';
import CreateAndEditCreditNotes from './Sales/CreditNotes/CreateAndEditCreditNotes';
import CreditNotesView from './Sales/CreditNotes/CreditNotesView';
import PaymentModeList from './Purchase/PaymentMode/PaymentModeList';
import PaymentModeView from './Purchase/PaymentMode/PaymentModeView';
import CreateAndEditPaymentMode from './Purchase/PaymentMode/CreateAndEditPaymentMode';
import VendorCreditList from './Purchase/VendorCredits/VendorCreditList';
import VendorCreditView from './Purchase/VendorCredits/VendorCreditView';
import CreateAndEditVendorCredit from './Purchase/VendorCredits/CreateAndEditVendorCredit';
import { SalesReturns } from './Sales/SalesReturns/SalesReturns';
import PaymentReceivedItemList from './Sales/PaymentReceived/PaymentReceivedItemList';
import { PaymentReceivedView } from './Sales/PaymentReceived/PaymentReceivedView';
import CreateAndEditPaymentReceived from './Sales/PaymentReceived/CreateAndEditPaymentReceived';
import { ReportsItemsList } from './Reports/ReportsItemsList';
import { user } from '../controller/api/AuthServices';
import { isLoggedIn, setUserRole } from '../controller/localStorageHandler';
import { setCurrentUser } from '../redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { adminItems } from '../controller/api/sidebarData';
import Register from './Register';
import UserList from './Users/UserList';
import CreateRole from './Roles/CreateRole';
import RoleListItem from './Roles/RoleListItem';
import { HomeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { faBagShopping, faCartFlatbed, faChartSimple } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Bars } from 'react-loader-spinner';


const Main = ({ selectKey, setSelectKey }) => {
  const [items,setItems]=useState([])
  const dispatch = useDispatch();
  const [rolePermisiion,setRolePermission]=useState([])
  const [loader, setloader] = useState(false);
  useEffect(() => {
    setloader(true)
    user()
      .then((res) => {
        setUserRole(JSON.stringify(res.data.role));
        setRolePermission(res.data.role.rolePermissions)
        dispatch(setCurrentUser(res.data));
        setloader(false)
      })
      .catch((err) => console.log(err)).finally(()=>setloader(false));
  }, [dispatch, isLoggedIn]);


  function getItem(label, key, icon, children,accessname) {
    // const rolePermisiion=[...currentUserData.role.rolePermisiion]
    const getmoduleNumber=rolePermisiion?.map((val)=>val?.module)
    if(accessname==true||getmoduleNumber.includes(accessname)){
      return {
        key,
        icon,
        children,
        label
      };
    }
}

useEffect(()=>{
  setItems([
    getItem('Home', 'home', <HomeOutlined />,null,true),
    getItem('Inventory', 'inventory', <FontAwesomeIcon icon={faCartFlatbed} />, [
      getItem('Items', 'items',null,null,1),
      getItem('Composite Items', 'compositeItem',null,null,2),
      getItem('Item Groups', 'itemGroups',null,null,3),
      getItem('Price Lists', 'priceList',null,null,4),
      getItem('Inventory Adjustments', 'inventoryAdjustments',null,null,5)
    ],true),
    getItem('Sales', 'sales', <ShoppingCartOutlined />, [
      getItem('Customers', 'customers',null,null,6),
      getItem('Sales Order', 'salesOrder',null,null,7),
      getItem('Packages', 'packages',null,null,8),
      getItem('Shipments', 'shipment',null,null,9),
      getItem('Delivery Challans', 'deliveryChallans',null,null,10),
      getItem('Invoice', 'invoices',null,null,11),
      getItem('Payment Received', 'paymentReceived',null,null,12),
      getItem('sales Return', 'salesReturn',null,null,13),
      getItem('Credit Notes', 'creditNotes',null,null,14)
    ],true),
    getItem('Purchase', 'purchase', <FontAwesomeIcon icon={faBagShopping} />, [
      getItem('Vendors', 'vendor',null,null,15),
      getItem('Purchase Order', 'purchaseOrder',null,null,16),
      getItem('Purchase Receives', 'purchaseReceives',null,null,17),
      getItem('Bills', 'bills',null,null,18),
      getItem('Payments Mode', 'paymentMode',null,null,19),
      getItem('Vendor Credits', 'vendorCredit',null,null,20)
    ],true),
    getItem('Reports', 'reports', <FontAwesomeIcon icon={faChartSimple} />,null,21),
    getItem('User', 'user',null,null,22),
    getItem('Role', 'role',null,null,23)
  ])
},[rolePermisiion])

  // const items = [
  //   getItem('Home', 'home', <HomeOutlined />),
  //   getItem('Inventory', 'inventory', <FontAwesomeIcon icon={faCartFlatbed} />, [
  //     getItem('Items', 'items'),
  //     getItem('Composite Items', 'compositeItem'),
  //     getItem('Item Groups', 'itemGroups'),
  //     getItem('Price Lists', 'priceList'),
  //     getItem('Inventory Adjustments', 'inventoryAdjustments')
  //   ]),
  //   getItem('Sales', 'sales', <ShoppingCartOutlined />, [
  //     getItem('Customers', 'customers'),
  //     getItem('Sales Order', 'salesOrder'),
  //     getItem('Packages', 'packages'),
  //     getItem('Shipments', 'shipment'),
  //     getItem('Delivery Challans', 'deliveryChallans'),
  //     getItem('Invoice', 'invoices'),
  //     getItem('Payment Received', 'paymentReceived'),
  //     getItem('sales Return', 'salesReturn'),
  //     getItem('Credit Notes', 'creditNotes')
  //   ]),
  //   getItem('Purchase', 'purchase', <FontAwesomeIcon icon={faBagShopping} />, [
  //     getItem('Vendors', 'vendor'),
  //     getItem('Purchase Order', 'purchaseOrder'),
  //     getItem('Purchase Receives', 'purchaseReceives'),
  //     getItem('Bills', 'bills'),
  //     getItem('Payments Mode', 'paymentMode'),
  //     getItem('Vendor Credits', 'vendorCredit')
  //   ]),
  //   getItem('Reports', 'reports', <FontAwesomeIcon icon={faChartSimple} />),
  //   getItem('User', 'user'),
  //   getItem('Role', 'role')
  // ];
  return (
    <div className="d-flex w-100 position-relative">
      {loader && (
        <div
          className="d-flex justify-content-center align-items-center w-100 position-absolute"
          style={{ height: '100vh', zIndex: '11111' }}
        >
          <Bars
            height="130"
            width="130"
            color="#1677ff"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={loader}
          />
        </div>
      )}
      {loader==false&&<>
        <Sidebar items={items} selectKey={selectKey} setSelectKey={setSelectKey} />
      <div className="w-100" style={{ maxHeight: '100vh', height: '100%', overflow: 'hidden' }}>
        <NavBar />
        <Routes>
          <Route path={routes.home.dashboard} element={<Home />} />
          <Route path={routes.inventory.items.self} element={<ItemsList />} />
          <Route path={routes.inventory.items.view} element={<ItemView />} />
          <Route path={routes.inventory.items.new} element={<CreateAndEditItems />} />
          <Route path={routes.inventory.items.edit} element={<CreateAndEditItems />} />
          <Route path={routes.inventory.compositeItem.self} element={<CompositeItemsList />} />
          <Route path={routes.inventory.compositeItem.view} element={<CompositeView />} />
          <Route
            path={routes.inventory.compositeItem.new}
            element={<CreateAndEditCompositeItem />}
          />
          <Route
            path={routes.inventory.compositeItem.edit}
            element={<CreateAndEditCompositeItem />}
          />
          <Route path={routes.inventory.itemGroups.self} element={<ItemGroupList />} />
          <Route path={routes.inventory.itemGroups.view} element={<ItemGroupVIew />} />
          <Route path={routes.inventory.itemGroups.new} element={<CreateAndEditGroupItem />} />
          <Route path={routes.inventory.itemGroups.edit} element={<CreateAndEditGroupItem />} />
          <Route path={routes.inventory.priceList.self} element={<PriceListItems />} />
          <Route path={routes.inventory.priceList.new} element={<CreateAndEditPriceList />} />
          <Route path={routes.inventory.priceList.edit} element={<CreateAndEditPriceList />} />
          <Route
            path={routes.inventory.inventoryAdjustments.self}
            element={<InventoryAdjustmentList />}
          />
          <Route
            path={routes.inventory.inventoryAdjustments.view}
            element={<InventoryAdjustmentView />}
          />
          <Route
            path={routes.inventory.inventoryAdjustments.new}
            element={<CreateAndEditInventoryAdjustment />}
          />
          <Route
            path={routes.inventory.inventoryAdjustments.edit}
            element={<CreateAndEditInventoryAdjustment />}
          />
          <Route path={routes.sales.customers.self} element={<CustomerItemsList />} />
          <Route path={routes.sales.customers.view} element={<CustomerView />} />
          <Route path={routes.sales.customers.new} element={<CreateAndEditCustomer />} />
          <Route path={routes.sales.customers.edit} element={<CreateAndEditCustomer />} />
          <Route path={routes.sales.salesOrder.self} element={<SalesOrderItemsList />} />
          <Route path={routes.sales.salesOrder.new} element={<CreateAndEditSalesOrder />} />
          <Route path={routes.sales.salesOrder.edit} element={<CreateAndEditSalesOrder />} />
          <Route path={routes.sales.salesOrder.view} element={<SalesOrderView />} />
          <Route path={routes.sales.packages.self} element={<PackageItemList />} />
          <Route path={routes.sales.packages.new} element={<CreateAndEditPackage />} />
          <Route path={routes.sales.packages.edit} element={<CreateAndEditPackage />} />
          <Route path={routes.sales.shipment.self} element={<ShipmentItemsList />} />
          <Route path={routes.sales.shipment.new} element={<CreateAndEditShipment />} />
          <Route path={routes.sales.shipment.edit} element={<CreateAndEditShipment />} />
          <Route path={routes.sales.deliveryChallans.self} element={<DeliveryChallansItemList />} />
          <Route
            path={routes.sales.deliveryChallans.new}
            element={<CreateAndEditDeliveryChallans />}
          />
          <Route
            path={routes.sales.deliveryChallans.edit}
            element={<CreateAndEditDeliveryChallans />}
          />
          <Route path={routes.sales.deliveryChallans.view} element={<DeliveryChallansView />} />
          <Route path={routes.sales.invoices.self} element={<InvoicesItemList />} />
          <Route path={routes.sales.invoices.new} element={<CreateAndEditInvoice />} />
          <Route path={routes.sales.invoices.edit} element={<CreateAndEditInvoice />} />
          <Route path={routes.sales.invoices.view} element={<InvoicesView />} />
          <Route path={routes.sales.creditNotes.self} element={<CreditNotesItemList />} />
          <Route path={routes.sales.creditNotes.new} element={<CreateAndEditCreditNotes />} />
          <Route path={routes.sales.creditNotes.edit} element={<CreateAndEditCreditNotes />} />
          <Route path={routes.sales.creditNotes.view} element={<CreditNotesView />} />
          <Route path={routes.sales.salesReturn.self} element={<SalesReturns />} />
          <Route path={routes.sales.paymentReceived.self} element={<PaymentReceivedItemList />} />
          <Route path={routes.sales.paymentReceived.view} element={<PaymentReceivedView />} />
          <Route
            path={routes.sales.paymentReceived.new}
            element={<CreateAndEditPaymentReceived />}
          />
          <Route
            path={routes.sales.paymentReceived.edit}
            element={<CreateAndEditPaymentReceived />}
          />
          <Route path={routes.purchase.vendor.self} element={<VendorList />} />
          <Route path={routes.purchase.vendor.view} element={<VendorView />} />
          <Route path={routes.purchase.vendor.edit} element={<CreateAndEditVendor />} />
          <Route path={routes.purchase.vendor.new} element={<CreateAndEditVendor />} />
          <Route path={routes.purchase.purchaseOrder.self} element={<PurchaseOrderList />} />
          <Route path={routes.purchase.purchaseOrder.view} element={<PurchaseOrderView />} />
          <Route
            path={routes.purchase.purchaseOrder.new}
            element={<CreateAndEditPurchaseOrder />}
          />
          <Route
            path={routes.purchase.purchaseOrder.edit}
            element={<CreateAndEditPurchaseOrder />}
          />
          <Route path={routes.purchase.purchaseReceives.self} element={<PurchaseReceiveList />} />
          <Route path={routes.purchase.purchaseReceives.view} element={<PurchaseReceiveView />} />
          <Route
            path={routes.purchase.purchaseReceives.new}
            element={<CreateAndEditPurchaseReceive />}
          />
          <Route
            path={routes.purchase.purchaseReceives.edit}
            element={<CreateAndEditPurchaseReceive />}
          />
          <Route path={routes.purchase.bills.self} element={<BillList />} />
          <Route path={routes.purchase.bills.view} element={<BillView />} />
          <Route path={routes.purchase.bills.new} element={<CreateAndEditBill />} />
          <Route path={routes.purchase.bills.edit} element={<CreateAndEditBill />} />
          <Route path={routes.purchase.paymentMode.self} element={<PaymentModeList />} />
          <Route path={routes.purchase.paymentMode.view} element={<PaymentModeView />} />
          <Route path={routes.purchase.paymentMode.new} element={<CreateAndEditPaymentMode />} />
          <Route path={routes.purchase.paymentMode.edit} element={<CreateAndEditPaymentMode />} />
          <Route path={routes.purchase.vendorCredit.self} element={<VendorCreditList />} />
          <Route path={routes.purchase.vendorCredit.view} element={<VendorCreditView />} />
          <Route path={routes.purchase.vendorCredit.new} element={<CreateAndEditVendorCredit />} />
          <Route path={routes.purchase.vendorCredit.edit} element={<CreateAndEditVendorCredit />} /> 
          <Route path={routes.reports.self} element={<ReportsItemsList />} />
          {/* <Route path='*' element={<PageNoteFound setSelectKey={setSelectKey} />} /> */}
          <Route path={routes.user.self} element={<UserList />} />
          <Route path={routes.user.createUser} element={<Register />} />
          <Route path={routes.user.edit} element={<Register />} />
          <Route path={routes.role.self} element={<RoleListItem />} />
          <Route path={routes.role.createRole} element={<CreateRole />} />
          <Route path={routes.role.edit} element={<CreateRole />} />
        </Routes>
      </div>
      </>}
    </div>
  );
};

export default Main;
