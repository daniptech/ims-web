import React from 'react';

import { Layout, Menu } from 'antd';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartFlatbed } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { routes } from '../controller/routes';
import { useEffect } from 'react';
const { Sider } = Layout;

const Sidebar = ({ selectKey, setSelectKey, items }) => {
  useEffect(() => {
    const pathname = window.location.hash.split('/');
    const currentSelectKey = pathname[2];
    if (currentSelectKey === 'inventoryDashboard') {
      setSelectKey('home');
    } else if (pathname[1] === 'reports') {
      setSelectKey('reports');
    } else if (pathname[1] === 'user') {
      setSelectKey('user');
    } else if (pathname[1] === 'role') {
      setSelectKey('role');
    } else {
      setSelectKey(currentSelectKey);
    }
  }, [setSelectKey]);
  // useEffect(() => {
  //   try {
  //     user().then(res => {
  //       setUserRole(res.data.role)
  //       dispatch(setCurrentUser(res.data))
  //     }).catch(err => console.log(err))
  //   } catch (error) {
  //     console.log('err=>', error)
  //   }
  // }, [])

  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const handleChange = (val) => {
    setSelectKey(val?.key);
    if (val?.keyPath?.length > 1) {
      navigate(routes[val.keyPath[1]][val.keyPath[0]].self);
    } else if (val.key === 'home') {
      navigate(routes.home.dashboard);
    } else if (val.key === 'reports') {
      navigate(routes.reports.self);
    } else if (val.key === 'user') {
      navigate(routes.user.self);
    } else if (val.key === 'role') {
      navigate(routes.role.self);
    }
  };
  return (
    <div style={{ minHeight: '100vh' }}>
      <div
        className="demo-logo-vertical d-flex justify-content-center align-items-center text-white gap-2"
        style={{ height: '40px', background: '#1677FF' }}
      >
        <FontAwesomeIcon icon={faCartFlatbed} />
        {!collapsed && <span>Inventory</span>}
      </div>
      <Sider
        className="bg-white position-sticky  custom-sidebar"
        // style={{ mixHeight: '93vh' }}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        {/* <div
          className="demo-logo-vertical d-flex justify-content-center align-items-center text-white gap-2"
          style={{ height: '40px', background: '#1677FF' }}
        >
          <FontAwesomeIcon icon={faCartFlatbed} />
          {!collapsed && <span>Inventory</span>}
        </div> */}
        <Menu
          theme="light"
          selectedKeys={selectKey}
          mode="inline"
          items={items}
          onClick={(val) => handleChange(val)}
        />
      </Sider>
    </div>
  );
};

export default Sidebar;
