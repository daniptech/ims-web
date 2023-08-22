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
    title: 'INVOICES#',
    dataIndex: 'invoices',
    sorter: (a, b) => a.invoices - b.invoices,
    isVisible: true,
    lock: true
  },
  {
    title: 'ORDER NUMBER',
    dataIndex: 'order_number',
    sorter: (a, b) => a.order_number - b.order_number,
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
    title: 'STATUS',
    dataIndex: 'status',
    sorter: (a, b) => a.status - b.status,
    isVisible: true,
    lock: true
  },
  {
    title: 'DUE DATE',
    dataIndex: 'due_date',
    sorter: (a, b) => a.due_date - b.due_date,
    isVisible: true,
    lock: true
  },
  {
    title: 'AMOUNT',
    dataIndex: 'amount',
    sorter: (a, b) => a.amount - b.amount,
    isVisible: true,
    lock: true
  },
  {
    title: 'BALANCE DUE',
    dataIndex: 'balance_due',
    sorter: (a, b) => a.balance_due - b.balance_due,
    isVisible: true,
    lock: true
  }
];
const data = [
  {
    key: '1',
    date: '25/07/2023',
    customer_name: 'Mr.Test1',
    due_date: '12/07/2023',
    invoices: 'INV-00007',
    status: 'DRAFT',
    order_number: '',
    amount: 'Rs.450.00',
    balance_due: 'Rs.450.00'
  },
  {
    key: '2',
    date: '25/07/2023',
    customer_name: 'Neeraj kumar',
    due_date: '25/07/2023',
    invoices: 'INV-000001 ',
    status: 'DRAFT',
    order_number: 'OR-000001',
    amount: 'Rs.450.00',
    balance_due: 'Rs.450.00'
  }
];
const InvoicesItemList = () => {
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
                value: 'all_unpaid_invoices',
                label: 'Unpaid Invoices'
              }}
              style={{
                width: 'auto'
              }}
              optionLabelProp="name"
              onChange={(val) => console.log(val)}
              options={[
                {
                  value: 'all',
                  label: 'All ',
                  name: 'All '
                },
                {
                  value: 'draft',
                  label: 'Draft ',
                  name: 'Draft'
                },
                {
                  value: 'pending',
                  label: 'Pending ',
                  name: 'Pending'
                },
                {
                  value: 'approved',
                  label: 'Approved',
                  name: 'Approved'
                },
                {
                  value: 'customer_viewed',
                  label: 'Customer Viewed',
                  name: 'Customer Viewed'
                },
                {
                  value: 'partially_paid',
                  label: 'Partially_Paid',
                  name: 'Partially_Paid'
                },
                {
                  value: 'unpaid',
                  label: 'Unpaid',
                  name: 'Unpaid'
                },
                {
                  value: 'overdue',
                  label: 'Overdue',
                  name: 'Overdue'
                },
                {
                  value: 'payment_initiated',
                  label: 'Payment Initiated',
                  name: 'Payment Initiated'
                },
                {
                  value: 'paid',
                  label: 'Paid',
                  name: 'Paid'
                },
                {
                  value: 'void',
                  label: 'Void',
                  name: 'Void'
                }
              ]}
            />
            <Button
              type="primary"
              className="fs-6 d-flex justify-content-center align-items-center fw-medium"
              onClick={() => navigate(routes.sales.invoices.new)}
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
            onClick: () => navigate(reverse(routes.sales.invoices.view, { id: record.key }))
          })}
          columns={columns}
          dataSource={data}
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
export default InvoicesItemList;
