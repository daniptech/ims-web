import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import './assets/css/custom.css'
import { Navigate, Route, Routes } from 'react-router-dom';
import { routes } from './controller/routes';
import Register from './pages/Register';
import Home from './pages/Home';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Navigate to={routes.login.self} />} />
        <Route path={routes.login.self} element={<Login />} />
        <Route path={routes.register.self} element={<Register />} />
        <Route path={routes.home.dashboard} element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
