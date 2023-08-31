import React from 'react';
import { Collapse, Select, Table } from 'antd';
import { Link } from 'react-router-dom';
export const Transaction = () => {
  return (
    <div className="w-100 h-100 p-3">
      <Select
        defaultValue="Go to transactions"
        style={{ width: 200, marginTop: 20, backgroundColor: '#F5F5F5' }}
        bordered={false}
        options={[
          { value: 'invoices', label: 'Invoices' },
          { value: 'customerPayments', label: 'Customer Payments' },
          { value: 'salesOrders', label: 'Sales Orders' },
          { value: 'packages', label: 'Packages' },
          { value: 'deliveryChallans', label: 'Delivery Challans' },
          { value: 'bills', label: 'Bills' },
          { value: 'creditNotes', label: 'Credit Notes' }
        ]}
      />
      <Collapse
        className="mt-4"
        items={[
          { key: '1', label: ' Invoices', children: <Table columns={columns} dataSource={data} /> }
        ]}
      />
      <Collapse
        className="mt-4"
        items={[
          {
            key: '1',
            label: 'Customer Payments',
            children: (
              <div className="d-flex align-item-center justify-content-center">
                <p className="mb-0">No payments have been received or recorded yet - </p>
                <Link to=" " style={linkStyle}>
                  <p style={{ color: '#1677FF' }}>Add New</p>
                </Link>
              </div>
            )
          }
        ]}
      />
      <Collapse
        className="mt-4"
        items={[
          {
            key: '1',
            label: 'Sales Orders',
            children: (
              <Table
                columns={[
                  { title: 'SALES ORDER', dataIndex: 'salesOrder', key: 'salesOrder' },
                  {
                    title: 'REFERENCE NUMBER',
                    dataIndex: 'referenceNumber',
                    key: 'referenceNumber'
                  },
                  { title: 'DATE', dataIndex: 'date', key: 'date' },
                  { title: 'SHIPMENT DATE', dataIndex: 'shipmentDate', key: 'shipmentDate' },
                  { title: 'AMOUNT', dataIndex: 'amount', key: 'amount' },
                  { title: 'STATUS', dataIndex: 'status', key: 'status' }
                ]}
                dataSource={salesdata}
              />
            )
          }
        ]}
      />
      <Collapse
        className="mt-4"
        items={[
          {
            key: '1',
            label: ' Packages',
            children: (
              <div className="d-flex align-item-center justify-content-center">
                <p className="mb-0">No data to display - </p>
                <Link to=" " style={linkStyle}>
                  <p style={{ color: '#1677FF' }}>Add New</p>
                </Link>
              </div>
            )
          }
        ]}
      />
      <Collapse
        className="mt-4"
        items={[
          {
            key: '1',
            label: 'Delivery Challans',
            children: (
              <Table
                columns={[
                  {
                    title: 'Delivery Challans',
                    dataIndex: 'deliveryChallans',
                    key: 'deliveryChallans'
                  },
                  {
                    title: 'REFERENCE NUMBER',
                    dataIndex: 'referenceNumber',
                    key: 'referenceNumber'
                  },
                  { title: 'DATE', dataIndex: 'date', key: 'date' },
                  { title: 'AMOUNT', dataIndex: 'amount', key: 'amount' },
                  { title: 'STATUS', dataIndex: 'status', key: 'status' }
                ]}
                dataSource={challansData}
              />
            )
          }
        ]}
      />
      <Collapse
        className="mt-4"
        items={[
          {
            key: '1',
            label: 'Bills',
            children: (
              <div className="d-flex align-item-center justify-content-center">
                <p className="mb-0">There are no Bills</p>
              </div>
            )
          }
        ]}
      />
      <Collapse
        className="mt-4"
        items={[
          {
            key: '1',
            label: 'Credit Notes',
            children: (
              <div className="d-flex align-item-center justify-content-center">
                <p className="mb-0">There are no credit notes - </p>
                <Link to=" " style={linkStyle}>
                  <p style={{ color: '#1677FF' }}>Add New</p>
                </Link>
              </div>
            )
          }
        ]}
      />
    </div>
  );
};
const linkStyle = {
  textDecoration: 'none'
};
const data = [
  {
    key: '1',
    date: '01/07/2023',
    invoiceNumber: 'INV-000001',
    orderNumber: 'SO-00001',
    amount: 'Rs.216.00',
    balanceDue: 'Rs.216.00',
    status: 'Draft'
  },
  {
    key: '2',
    date: '02/07/2023',
    invoiceNumber: 'INV-000002',
    orderNumber: 'SO-00002',
    amount: 'Rs.215.00',
    balanceDue: 'Rs.215.00',
    status: 'Cancel'
  },
  {
    key: '3',
    date: '03/07/2023',
    invoiceNumber: 'INV-000003',
    orderNumber: 'SO-00003',
    amount: 'Rs.214.00',
    balanceDue: 'Rs.214.00',
    status: 'Panding'
  }
];
const columns = [
  {
    title: 'DATE',
    dataIndex: 'date',
    key: 'date',
    render: (text) => <span>{text}</span>
  },
  {
    title: 'INVOICE NUMBER',
    dataIndex: 'invoiceNumber',
    key: 'invoiceNumber'
  },
  {
    title: 'ORDER NUMBER',
    dataIndex: 'orderNumber',
    key: 'orderNumber'
  },
  {
    title: 'AMOUNT',
    key: 'amount',
    dataIndex: 'amonut'
  },
  {
    title: 'BALANCE DUE',
    key: 'balanceDue',
    dataIndex: 'balanceDue'
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status'
  }
];
const salesdata = [
  {
    key: '1',
    salesOrder: 'SO-00001',
    referenceNumber: '-',
    date: '25/07/2023',
    shipmentDate: '25/07/2023',
    amount: 'Rs.211.00',
    status: 'Draft'
  }
];
const challansData = [
  {
    key: '1',
    deliveryChallans: 'challans name test',
    referenceNumber: 'reference 2',
    date: '25/07/2023',
    shipmentDate: '25/07/2023',
    amount: 'Rs.211.00',
    status: 'Draft'
  }
];
