import { PlusOutlined } from '@ant-design/icons';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown, Input } from 'antd';
import { Header } from 'antd/es/layout/layout';
import React from 'react';

const NavBar = () => {
  const handleMenuClick = (e) => {
    console.log('click', e);
  };
  const items = [
    {
      label: '1st menu item',
      key: '1'
    },
    {
      label: '2nd menu item',
      key: '2'
    },
    {
      label: '3rd menu item',
      key: '3',
      danger: true
    },
    {
      label: '4rd menu item',
      key: '4',
      danger: true,
      disabled: true
    }
  ];
  const menuProps = {
    items,
    onClick: handleMenuClick
  };
  return (
    <>
      <Header
        style={{
          padding: 0,
          height: 40,
          background: '#1677FF'
        }}
        className="d-flex w-100 justify-content-center align-items-center position-sticky overflow-hidden"
      >
        <div className="d-flex w-100 justify-content-between align-items-center p-4">
          <div className="text-white d-flex  align-items-center gap-3">
            <FontAwesomeIcon icon={faClockRotateLeft} rotation={180} />
            <Input allowClear />
          </div>
          <div className="text-white d-flex align-items-center gap-3">
            <Dropdown menu={menuProps} trigger="click">
              <PlusOutlined width="5px" height="20px" />
            </Dropdown>
            <FontAwesomeIcon icon={faClockRotateLeft} rotation={180} />
            <Input allowClear />
          </div>
        </div>
      </Header>
    </>
  );
};

export default NavBar;
