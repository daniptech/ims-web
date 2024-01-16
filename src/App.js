import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import './assets/css/custom.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import { routes } from './controller/routes';
import React, { useEffect, useState } from 'react';
import { isLoggedIn } from './controller/localStorageHandler';

function App() {
  const [loginuser, setLoginUser] = useState(false);
  useEffect(() => {
    if (loginuser) {
      window.location.reload();
    }
  }, [loginuser]);
  // const loginCheck = localStorage.getItem('login');
  // const checkLogin = () => {
  //   const check = window.location.hash?.split('/')[1];
  //   if (check == 'login' || check == 'register') {
  //     return false;
  //   } else if (loginCheck) {
  //     return true;
  //   }
  // };
  const [selectKey, setSelectKey] = useState('1');

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to={routes.login.self} />} />
        <Route
          path={routes.login.self}
          element={
            <Login
              setLoginUser={(val) => setLoginUser(val)}
              setSelectKey={(val) => setSelectKey(val)}
            />
          }
        />
        {/* <Route path={routes.register.self} element={<Register />} /> */}
      </Routes>
      {isLoggedIn() && <Main selectKey={selectKey} setSelectKey={setSelectKey} />}
    </div>
  );
}

export default App;
