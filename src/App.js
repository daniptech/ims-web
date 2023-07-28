import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import './assets/css/custom.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Main from './pages/Main';
import { routes } from './components/controller/routes';
import { useEffect, useState } from 'react';

function App() {
  const [loginuser, setLoginUser] = useState(false)
  useEffect(() => {
    if (loginuser) {
      window.location.reload()
    }
  }, [loginuser])
  const loginCheck = localStorage.getItem('login')
  const checkLogin = () => {
    if (window.location.pathname == routes.login.self || window.location.pathname == routes.register.self) {
      return false
    } else if (loginCheck) {
      return true
    }
  }
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<div>nkkn</div>} />
        <Route exact path={routes.login.self} element={<Login setLoginUser={(val) => setLoginUser(val)} />} />
        <Route exact path={routes.register.self} element={<Register />} />
      </Routes>
      {
        checkLogin() && <Main />
      }
    </div>
  );
}

export default App;
