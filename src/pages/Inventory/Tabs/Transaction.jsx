import { CaretDownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Empty, Table } from 'antd';
import React, { useState } from 'react';

const Transaction = () => {
  const transactionTableColumn = [
    {
      title: 'Date',
      dataIndex: 'date',
      sorter: (a, b) => a.date.length - b.date.length,
      sortDirections: ['descend', 'ascend'],
      isVisible: true,
      lock: true
    },
    {
      title: 'SALES ORDER#',
      dataIndex: 'sales_order'
    },
    {
      title: 'CUSTOMER NAME',
      dataIndex: 'customer_name'
    },
    {
      title: 'QUANTITY SOLD',
      dataIndex: 'quantity_sold'
    },
    {
      title: 'PRICE',
      dataIndex: 'price'
    },
    {
      title: 'TOTAL',
      dataIndex: 'total'
    },
    {
      title: 'STATUS',
      dataIndex: 'status'
    }
  ];
  const FilterByitems = [
    {
      key: '1',
      label: 'Sales Order'
    },
    {
      key: '2',
      label: 'Invoices'
    },
    {
      key: '3',
      label: 'Delivery Challans'
    },
    {
      key: '4',
      label: 'Credit Notes'
    },
    {
      key: '5',
      label: 'Purchase Order'
    },
    {
      key: '6',
      label: 'Bills'
    },
    {
      key: '7',
      label: 'Vendor Credit'
    },
    {
      key: '8',
      label: 'Inventory Adjustments'
    }
  ];
  const statusItems = [
    {
      key: '1',
      label: 'All'
    },
    {
      key: '2',
      label: 'Adjusted'
    },
    {
      key: '3',
      label: 'Draft'
    }
  ];

  const [currentPage, setCurrentPage] = useState(1);

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };
  return (
    <div>
      <div className="d-flex gap-3">
        <Dropdown
          menu={{
            items: FilterByitems
          }}
          placement="bottom"
        >
          <Button className="d-flex align-items-center justify-content-center">
            Filter By: bottom <CaretDownOutlined />
          </Button>
        </Dropdown>
        <Dropdown
          menu={{
            items: statusItems
          }}
          placement="bottom"
        >
          <Button className="d-flex align-items-center justify-content-center">
            Status: bottom <CaretDownOutlined />
          </Button>
        </Dropdown>
      </div>
      <div className="mt-3">
        <div className="w-100">
          <Table
            // bordered
            dataSource={[]}
            locale={{
              emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={`No data`} />
            }}
            columns={transactionTableColumn}
            rowClassName="editable-row"
            pagination={{
              current: currentPage,
              pageSize: 4,
              onChange: handleChangePage
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Transaction;
