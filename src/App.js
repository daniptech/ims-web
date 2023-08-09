import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import './assets/css/custom.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Main from './pages/Main';
import { routes } from './controller/routes';
import { useEffect, useState } from 'react';
import { HomeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { faBagShopping, faCartFlatbed, faChartSimple } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function App() {
  const [loginuser, setLoginUser] = useState(false)
  useEffect(() => {
    if (loginuser) {
      window.location.reload()
    }
  }, [loginuser])
  const loginCheck = localStorage.getItem('login')
  const checkLogin = () => {
    const check=window.location.hash?.split('/')[1]
    if (check == 'login' || check == 'register') {
      return false
    } else if (loginCheck) {
      return true
    }
  }
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
    getItem('Reports', 'reports', <FontAwesomeIcon icon={faChartSimple} />)
  ];
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to={routes.login.self} />} />
        <Route path={routes.login.self} element={<Login setLoginUser={(val) => setLoginUser(val)} setSelectKey={(val)=>setSelectKey(val)} />} />
        <Route path={routes.register.self} element={<Register />} />
      </Routes>
      {
        checkLogin() && <Main items={items} selectKey={selectKey} setSelectKey={setSelectKey} />
      }
    </div>
  );
}

export default App;
