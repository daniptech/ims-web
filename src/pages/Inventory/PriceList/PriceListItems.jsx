import { DeleteOutlined, LineOutlined } from '@ant-design/icons';
import { Button, Select, Table } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../controller/routes';
import { reverse } from 'named-urls';

const data = [
  {
    key: '1',
    name: 'John Brown',
    description: 'hello',
    currency: null,
    details: '12% Markup',
    priceing_scheme: 'Unit Pricing',
    round_off_preference: 'Never mind',
    active: true
  },
  {
    key: '2',
    name: 'John Brown',
    description: 'hello',
    currency: null,
    details: '12% Markup',
    priceing_scheme: 'Unit Pricing',
    round_off_preference: 'Never mind',
    active: false
  },
  {
    key: '3',
    name: 'John Brown',
    description: 'hello',
    currency: null,
    details: '12% Markup',
    priceing_scheme: 'Unit Pricing',
    round_off_preference: 'Never mind',
    active: true
  },
  {
    key: '4',
    name: 'John Brown',
    description: 'hello',
    currency: null,
    details: '12% Markup',
    priceing_scheme: 'Unit Pricing',
    round_off_preference: 'Never mind',
    active: true
  },
  {
    key: '5',
    name: 'John Brown',
    description: 'hello',
    currency: null,
    details: '12% Markup',
    priceing_scheme: 'Unit Pricing',
    round_off_preference: 'Never mind',
    active: false
  },
  {
    key: '6',
    name: 'John Brown',
    description: 'hello',
    currency: null,
    details: '12% Markup',
    priceing_scheme: 'Unit Pricing',
    round_off_preference: 'Never mind',
    active: true
  }
];

const PriceListItems = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const columns = [
    {
      title: 'NAME AND DESCRIPTION',
      dataIndex: '',
      render: (record) => {
        return (
          <>
            <div className="d-flex flex-column">
              <span
                className="text-primary"
                style={{ cursor: 'pointer' }}
                onClick={() =>
                  navigate(reverse(routes.inventory.priceList.edit, { id: record.key }))
                }
              >
                {record.name}
              </span>
              <span>{record.description}</span>
            </div>
          </>
        );
      }
    },
    {
      title: 'CURRENCY',
      dataIndex: 'currency',
      render: (record) => {
        return <>{record?.currenty ? record?.currenty : '-'}</>;
      }
    },
    {
      title: 'DETAILS',
      dataIndex: 'details'
    },
    {
      title: 'PRICING SCHEME',
      dataIndex: 'priceing_scheme',
      render: (record) => {
        return <>{record?.priceing_scheme ? record?.priceing_scheme : '-'}</>;
      }
    },
    {
      title: 'ROUND OFF PREFERENCE',
      dataIndex: 'round_off_preference'
    },
    {
      title: '',
      dataIndex: '',
      render: (record) => {
        return (
          <div className="d-flex align-items-center gap-2 action-btn">
            <span
              className="text-primary"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(reverse(routes.inventory.priceList.edit, { id: record.key }))}
            >
              Edit
            </span>
            <LineOutlined rotate={90} />
            <span className="text-primary" style={{ cursor: 'pointer' }}>
              {record.active ? 'Make as Active' : 'Make as inActive'}
            </span>
            <LineOutlined rotate={90} />
            <DeleteOutlined className="text-danger" style={{ cursor: 'pointer' }} />
          </div>
        );
      }
    }
  ];

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className="w-100 h-100">
      <div className="w-100 p-3 d-flex justify-content-between align-items-center">
        <Select
          className="item-table-filter"
          bordered={false}
          // labelInValue
          defaultValue={{
            value: 'all_price_lists',
            label: 'All Price Lists',
            name: 'All Price Lists'
          }}
          style={{
            width: 'auto'
          }}
          optionLabelProp="name"
          onChange={(val) => console.log(val)}
          options={[
            {
              value: 'all_price_lists',
              label: 'All',
              name: 'All Price Lists'
            },
            {
              value: 'sales_price_lists ',
              label: 'Sales',
              name: 'Sales Price Lists '
            },
            {
              value: 'purchase_price_lists',
              label: 'Purchase',
              name: 'Purchase Price Lists'
            }
          ]}
        />
        <Button
          type="primary"
          className="fs-6 d-flex justify-content-center align-items-center fw-medium"
          onClick={() => navigate(routes.inventory.priceList.new)}
        >
          + New Price List
        </Button>
      </div>
      <div className=" p-3">
        <Table
          className="price_list_Tale"
          columns={columns}
          dataSource={data}
          pagination={{
            current: currentPage,
            pageSize: 6,
            onChange: handleChangePage
          }}
        />
      </div>
    </div>
  );
};

export default PriceListItems;
