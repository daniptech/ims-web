import { CloseOutlined, DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Select, Table } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../controller/routes';
import { reverse } from 'named-urls';
const columns = [
  {
    title: 'DATE',
    dataIndex: 'date',
    render: (text) => <span>{text}</span>,
    sorter: (a, b) => a.date.length - b.date.length,
    isVisible: true,
    lock: true
  },
  {
    title: 'SHIPMENT ORDER#',
    dataIndex: 'shipment_order',
    sorter: (a, b) => a.shipment_order - b.shipment_order,
    isVisible: true,
    lock: true
  },
  {
    title: 'CUSTOMER NAME',
    dataIndex: 'customer_name',
    sorter: (a, b) => a.customer_name - b.customer_name,
    isVisible: true,
    lock: true
  },
  {
    title: 'SALES ORDER#',
    dataIndex: 'sales_order',
    sorter: (a, b) => a.sales_order - b.sales_order,
    isVisible: true,
    lock: true
  },
  {
    title: 'PACKAGE#',
    dataIndex: 'package',
    sorter: (a, b) => a.package - b.package,
    isVisible: true,
    lock: true
  },
  {
    title: 'CARRIER',
    dataIndex: 'carrier',
    sorter: (a, b) => a.carrier - b.carrier,
    isVisible: true,
    lock: true
  },
  {
    title: 'TRACKING#',
    dataIndex: 'tracking',
    sorter: (a, b) => a.tracking - b.tracking,
    isVisible: true,
    lock: true
  },
  {
    title: 'STATUS',
    dataIndex: 'status',
    sorter: (a, b) => a.status - b.status,
    isVisible: true,
    lock: true
  },
  {
    title: 'SHIPPING RATE',
    dataIndex: 'shipping_rate',
    sorter: (a, b) => a.shipping_rate - b.shipping_rate,
    isVisible: true,
    lock: true
  }
];
const ShipmentItemsList = () => {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState({
    selectedRowKeys: '',
    selectedRows: []
  });
  const rowSelection = {
    selectedRowKeys: selectedRows.selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRows({
        selectedRowKeys,
        selectedRows
      });
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    }
  };
  const items = [
    {
      key: '1',
      label: 'Mark as Active'
    },
    {
      key: '2',
      label: 'Mark as Inactive'
    },
    {
      key: '3',
      label: 'Delete'
    },
    {
      key: '4',
      label: 'Add to Group'
    },
    {
      key: '5',
      label: 'Mark as Returnable'
    }
  ];
  const [currentPage, setCurrentPage] = useState(1);

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className="w-100 h-100">
      <div className="w-100 p-3 d-flex justify-content-between align-items-center">
        {selectedRows?.selectedRows?.length ? (
          <>
            <Dropdown
              trigger="click"
              menu={{
                items
              }}
              placement="bottom"
            >
              <Button type="primary" className="d-flex justify-content-center align-items-center">
                Bulk Action <DownOutlined />
              </Button>
            </Dropdown>
            <CloseOutlined onClick={() => rowSelection.onChange('', [])} className="text-muted" />
          </>
        ) : (
          <>
            <Select
              className="item-table-filter"
              bordered={false}
              defaultValue={{
                value: 'all',
                label: 'All Shipped'
              }}
              style={{
                width: 'auto'
              }}
              optionLabelProp="name"
              onChange={(val) => console.log(val)}
              options={[
                {
                  value: 'shipped',
                  label: 'Shipped',
                  name: 'Shipped'
                },
                {
                  value: 'in_transit',
                  label: 'In-Transit',
                  name: 'In-Transit'
                },
                {
                  value: 'out_for_delivery',
                  label: 'Out For Delivery',
                  name: 'Out For Delivery'
                },
                {
                  value: 'faild_delivery_attempt',
                  label: 'Faild Delivery Attempt',
                  name: 'Faild Delivery Attempt'
                },
                {
                  value: 'customers_clearance',
                  label: 'Customers Clearance',
                  name: 'Customers Clearance'
                },
                {
                  value: 'ready_for_pickup',
                  label: 'Ready For Pickup',
                  name: 'Ready For Pickup'
                },
                {
                  value: 'delayed',
                  label: 'Delayed',
                  name: 'Delayed'
                }
              ]}
            />
            <Button
              type="primary"
              className="fs-6 d-flex justify-content-center align-items-center fw-medium"
              onClick={() => navigate(routes.sales.shipment.new)}
            >
              + New
            </Button>
          </>
        )}
      </div>
      <div className=" p-3">
        <Table
          rowSelection={{
            type: 'checkbox',
            ...rowSelection
          }}
          onRow={(record) => ({
            onClick: () => navigate(reverse(routes.sales.shipment.new, { id: record.key }))
          })}
          columns={columns}
          dataSource={[]}
          pagination={{
            current: currentPage,
            pageSize: 8,
            onChange: handleChangePage
          }}
        />
      </div>
    </div>
  );
};
export default ShipmentItemsList;
