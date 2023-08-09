import { DownloadOutlined, MenuOutlined } from '@ant-design/icons';
import { Button, Dropdown, Select, Table, Card, Col, Row} from 'antd';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { routes } from '../../../controller/routes';
const PackageItemList = () => {
  const navigate = useNavigate();
  return (
    <div className="w-100 h-100">
      <div className="w-100 p-3 d-flex justify-content-between align-items-center">
        <h4>All Packages</h4>
        <Button
          type="primary"
          className="fs-6 d-flex justify-content-center align-items-center fw-medium"
          onClick={() => navigate(routes.sales.packages.new)}>
          + New
        </Button>
      </div>
      <div className=" p-2 row">
        <Row>
          <Col span={8}>
            <div class="packages-Not">
              <h7>Packages, Not Shipped</h7>
              <Dropdown
                menu={{
                items,
                }}
                placement="bottomRight"
                arrow
                >
              <Button type="text">
                <MenuOutlined />
              </Button>
              </Dropdown>
            </div>
            <div
              className="bg-light"
              style={{
                width: '93.5%',
                height: '1000px',
                marginLeft: '8px',
                justifyContent: 'center',
                display: 'flex'
              }}>
              <div
                style={{
                  width: '300px',
                  height: '150px',
                  borderRadius: '8px',
                  backgroundColor: 'white',
                  marginTop: '10px',
                  justifyContent: 'center',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                No Records Found
              </div>
            </div>
          </Col>
          <Col span={8}>
            <div class="shipped-Not">
              <h7>Shipped Packages</h7>
              <Dropdown
                menu={{
                items,
                }}
                placement="bottomRight"
                arrow
                >
              <Button type="text">
                <MenuOutlined />
              </Button>
              </Dropdown>
            </div>
            <div
              className="bg-light"
              style={{
                width: '93.5%',
                height: '1000px',
                marginLeft: '8px',
                justifyContent: 'center',
                display: 'flex'
              }}>
              <div
                style={{
                  width: '300px',
                  height: '150px',
                  borderRadius: '8px',
                  backgroundColor: 'white',
                  marginTop: '10px',
                  justifyContent: 'center',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                No Records Found
              </div>
            </div>
          </Col>
          <Col>
            <div class="delivery-Not">
              <h7>Delivered Packages</h7>
              <Dropdown
                menu={{
                items,
                }}
                placement="bottomRight"
                arrow
                >
              <Button type="text">
                <MenuOutlined />
              </Button>
              </Dropdown>
            </div>
            <div
              className="bg-light"
              style={{
                width: '95%',
                height: '1000px',
                marginLeft: '8px',
                justifyContent: 'center',
                display: 'flex'
              }}>
              <div
                style={{
                  width: '300px',
                  height: '150px',
                  borderRadius: '8px',
                  backgroundColor: 'white',
                  marginTop: '10px',
                  justifyContent: 'center',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                No Records Found
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
const linkStyle = {
    textDecoration: 'none',
  };
  
export default PackageItemList;
const items = [
    {
      key: '1',
      label: (
        <Link style={linkStyle}>
            Package Date
        </Link>
      ),
    },
    {
      key: '2',
      label: (
        <Link style={linkStyle}>
          Package #
    </Link>
      ),
    },
    {
      key: '3',
      label: (
        <Link style={linkStyle}>
           Carrier
        </Link>
      ),
    },
    {
        key: '4',
        label: (
          <Link style={linkStyle}>
            Sales Order#
          </Link>
        ),
      },
      {
        key: '5',
        label: (
          <Link style={linkStyle}>
             Shipment Date
          </Link>
        ),
      },
      {
        key: '6',
        label: (
          <Link style={linkStyle}>
             Customer Name
          </Link>
        ),
      },
      {
        key: '7',
        label: (
          <Link style={linkStyle}>
             Quantity
          </Link>
        ),
      },
      {
        key: '8',
        label: (
          <Link style={linkStyle}>
             Create Time
          </Link>
        ),
      },
      {
        key: '9',
        label: (
          <Link style={linkStyle}>
             Last Modified Time
          </Link>
        ),
      },
      {
        key: '10',
        label: (
          <Link style={linkStyle}>
            <div className='d-flex justify-content-center align-items-center'><DownloadOutlined style={{color:'blue'}}/>
            <h9 style={{marginLeft:'10px'}}>Import Packages</h9></div>
          </Link>
        ),
      },
      {
        key: '10',
        label: (
          <Link style={linkStyle}>
            <div className='d-flex justify-content-center align-items-center'><DownloadOutlined style={{color:'blue'}}/>
            <h9 style={{marginLeft:'10px'}}>Export Package </h9></div>
          </Link>
        ),
      },
  ];
 