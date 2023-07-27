import { CloseOutlined, DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Select, Table } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../components/controller/routes';
import { reverse } from 'named-urls';
const columns = [
  {
    title: 'DATE',
    dataIndex: 'date',
    render: (text) => <span>{text}</span>,
    sorter: (a, b) => a.date.length - b.date.length,
    isVisible: true,
    lock: true,
  },
  {
    title: 'PAYMENT#',
    dataIndex: 'payment',
    sorter: (a, b) => a.payment - b.payment,
    isVisible: true,
    lock: true,
  },
  {
    title: 'REFERENCE#',
    dataIndex: 'reference',
    sorter: (a, b) => a.reference - b.reference,
    isVisible: true,
    lock: true,
  },
  {
    title: 'CUSTOMER NAME',
    dataIndex: 'customer_name',
    sorter: (a, b) => a.customer_name - b.customer_name,
    isVisible: true,
    lock: true,
  },
  {
    title: 'INVOICE',
    dataIndex: 'invoice',
    sorter: (a, b) => a.invoice - b.invoice,
    isVisible: true,
    lock: true,
  },
  {
    title: 'MODE',
    dataIndex: 'mode',
    sorter: (a, b) => a.mode - b.mode,
    isVisible: true,
    lock: true,
  },
  {
    title: 'AMOUNT',
    dataIndex: 'amount',
    sorter: (a, b) => a.amount - b.amount,
    isVisible: true,
    lock: true,
  },
  {
    title: 'UNUSED AMOUNT',
    dataIndex: 'unused_amount',
    sorter: (a, b) => a.unused_amount - b.unused_amount,
    isVisible: true,
    lock: true,
  },
];
const data = [
  {
    key: '1',
    date: '25/07/2023',
    payment:"1",
    reference: 're-002',
    customer_name:'Mr. Customer 1',
    invoice:'',
    mode:'Cash',
    amount:'Rs.18000.00',
    unused_amount:'Rs.18000.00',
  },
];
const PaymentReceivedItemList = () => {
  const navigate=useNavigate()
  const [selectedRows, setSelectedRows] = useState({
    selectedRowKeys: '',
    selectedRows: []
  })
  const rowSelection = {
    selectedRowKeys: selectedRows.selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRows({
        selectedRowKeys,
        selectedRows
      })
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  };
  const items = [
    {
      key: '1',
      label: "Mark as Active",
    },
    {
      key: '2',
      label: "Mark as Inactive",
    },
    {
      key: '3',
      label: "Delete",
    },
    {
      key: '4',
      label: "Add to Group",
    },
    {
      key: '5',
      label: "Mark as Returnable",
    },
  ];
  const [currentPage, setCurrentPage] = useState(1);

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className="w-100 h-100">
      <div className="w-100 p-3 d-flex justify-content-between align-items-center">
        {selectedRows?.selectedRows?.length ?
          <>
            <Dropdown
              trigger='click'
              menu={{
                items,
              }}
              placement="bottom"
            >
              <Button type='primary' className='d-flex justify-content-center align-items-center'>Bulk Action <DownOutlined /></Button>
            </Dropdown>
            <CloseOutlined onClick={() => rowSelection.onChange("", [])} className='text-muted' />
          </>

          :
          <>
            <Select
              className="item-table-filter"
              bordered={false}
              defaultValue={{
                value: 'all',
                label: 'All Received Payments'
              }}
              style={{
                width: 'auto'
              }}
              optionLabelProp='name'
              onChange={(val) => console.log(val)}
              options={[
                {
                  value: 'all',
                  label: 'All Payments',
                  name:"All Payments"
                },
              ]}
            />
            <Button
              type="primary"
              className="fs-6 d-flex justify-content-center align-items-center fw-medium"
              onClick={()=>navigate(routes.sales.paymentReceived.new)}
            >
              + New
            </Button>
          </>
        }
      </div>
      <div
        className=" p-3"
      >
        <Table
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
          onRow={(record) => ({
            onClick: () => navigate(reverse(routes.sales.paymentReceived.view, { id: record.key })),
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
  )
};
export default PaymentReceivedItemList;