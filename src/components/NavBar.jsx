import { BellOutlined, DownOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Badge, Dropdown, Input, Menu, Tooltip } from 'antd';
import { Header } from 'antd/es/layout/layout';
import React from 'react';
import { useState } from 'react';
import NotificationDrawer from './modals/NotificationDrawer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { routes } from '../controller/routes';
import { useNavigate } from 'react-router-dom';
import { logout } from '../controller/localStorageHandler';

const NavBar = () => {
  const navigate = useNavigate()
  const [notificationdrawer, setNotificationDrawer] = useState(false)
  const [searchType, setsearchType] = useState({
    key: 'customer',
    label: 'Customer'
  })
  const searchTypeMenu = [
    {
      key: 'customer',
      label: 'Customer'
    },
    {
      key: 'vendor',
      label: 'Vendor'
    },
    {
      key: 'invoices',
      label: 'Invoices'
    },
    {
      key: 'packages',
      label: 'Packages'
    },
    {
      key: 'shipments',
      label: 'Shipments'
    },
    {
      key: 'sales_order',
      label: 'Sales Orders'
    },

    {
      key: 'delivery_challans',
      label: 'Delivery Challans'
    }, {
      key: 'credit Notes',
      label: 'Credit Notes'
    },
    {
      key: 'bills',
      label: 'Bills'
    },
    {
      key: 'vendor_credits',
      label: 'Vendor Credits'
    },
    {
      key: 'purchase_order',
      label: 'Purchase Order'
    },
    {
      key: 'purchase_receives',
      label: 'Purchase Receives'
    },
    {
      key: 'items',
      label: 'Items'
    },
    {
      key: 'composite_items',
      label: 'Composite Items'
    },

    {
      key: 'inventory_adjustments',
      label: 'Inventory Adjustments'
    },
    {
      key: 'sales_returns',
      label: 'Sales Returns'
    },
    {
      key: 'documents',
      label: 'Documents'
    },
    {
      key: 'price_lists',
      label: 'Price Lists'
    },

  ]
  const handleSearchMenuClick = (value) => {
    const currentSerchType = searchTypeMenu?.filter(val => val.key === value.key)
    setsearchType(currentSerchType[0])
  }

  return (
    <>
      <Header
        style={{
          padding: 0,
          height: 40,
          background: '#1677FF'
        }}
        className="d-flex w-100 justify-content-center align-items-center position-sticky overflow-hidden header-container"
      >
        <div className="d-flex w-100 justify-content-between align-items-center p-4">
          <div className="text-white d-flex  align-items-center gap-3">
            {/* <Input allowClear
              addonBefore={<div>kn</div>}
            /> */}
            <div className='bg-light d-flex  align-items-center rounded-2' style={{ width: '300px', height: '30px' }}>
              <div className='row col-12 m-0 p-0'>
                <Dropdown
                  trigger='click'
                  overlayClassName='nav-option-dropdown'
                  overlay={
                    <Menu onClick={handleSearchMenuClick} >
                      {searchTypeMenu?.map(item => {
                        return (
                          <Menu.Item className={item.key === searchType.key && "bg-primary"} key={item.key}>
                            {item.label}
                          </Menu.Item>
                        )
                      })}
                    </Menu>
                  }

                >
                  <div className='col-2 d-flex justify-content-center align-items-center m-0 p-0 text-primary'><SearchOutlined /><DownOutlined style={{ fontSize: '10px' }} /></div>
                </Dropdown>
                <div className='col-10 m-0 p-0'><Input className=' bg-transparent border-0 w-100 border-start rounded-0' placeholder={`Search in ${searchType.label} ( / )`} /></div>
              </div>
            </div>
          </div>
          <div className="text-white d-flex align-items-center gap-3">
            <Tooltip title="You are currently in the Free Plane"><span className='text-truncate' style={{ width: '150px' }}>You are currently in the Free Plane</span></Tooltip>
            <Badge count={1} className='notification-btn'>
              <Avatar shape="square" icon={<BellOutlined />} onClick={() => setNotificationDrawer(true)} />
            </Badge>
            <Dropdown
              overlayClassName='user-btn-dropdown'
              arrow
              dropdownRender={() => <div className=''>
                <div className='bg-light p-3 border-bottom rounded-2'>
                  <div className='border-bottom pb-3'>
                    <div className='d-flex justify-content-between'>
                      <div className='d-flex gap-3'>
                        <Avatar shape="square" size='large' src={''} icon={<UserOutlined />} />
                        <div className='d-flex flex-column'>
                          <span className=''>demo</span>
                          <span className='text-muted'>demo@mail.com</span>
                        </div>
                      </div>
                    </div>
                    <div className='mt-1'><span>User ID: 60022275245 </span>• <span>Organization ID: 60022272371</span></div>
                  </div>
                  <div className='d-flex justify-content-between align-items-center mt-3'>
                    <span>My Account</span>
                    <span className='text-danger d-flex align-items-center gap-2' style={{ cursor: 'pointer' }} onClick={() => {
                      logout()
                      navigate(routes.login.self)
                    }} ><FontAwesomeIcon icon={faArrowRightFromBracket} accordion
                      />Sign Out</span>
                  </div>
                </div>
              </div>}
            >
              <Avatar icon={<UserOutlined />} />
            </Dropdown>
          </div>
        </div>
      </Header>
      {notificationdrawer && <NotificationDrawer notificationdrawer={notificationdrawer} setNotificationDrawer={setNotificationDrawer} />}
    </>
  );
};

export default NavBar;
