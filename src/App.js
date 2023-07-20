import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import './assets/css/custom.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Main from './pages/Main';
import { routes } from './components/controller/routes';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to={routes.login.self} />} />
        <Route path={routes.login.self} element={<Login />} />
        <Route path={routes.register.self} element={<Register />} />
      </Routes>
      {
        window.location.pathname == routes.login.self || routes.register.self && <Main />
      }
    </div>
  );
}

export default App;
