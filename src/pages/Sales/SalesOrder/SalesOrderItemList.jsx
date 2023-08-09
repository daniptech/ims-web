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
    lock: true,
  },
  {
    title: 'SALES ORDER#',
    dataIndex: 'sales_order',
    sorter: (a, b) => a.sales_order - b.sales_order,
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
    title: 'ORDER STATUS',
    dataIndex: 'order_status',
    sorter: (a, b) => a.order_status - b.order_status,
    isVisible: true,
    lock: true,
  },
];
const data = [
  {
    key: '1',
    date: '25/07/2023',
    sales_order:"SO-000001",
    reference: 'references',
    customer_name:'Mr. Customer 1',
    order_status:'Closed'
  },
  {
    key: '2',
    date: '25/07/2023',
    sales_order:"SO-000002",
    reference: 'references',
    customer_name:'Mr.Customer 2',
    order_status:'Pending'
  },
  {
    key: '3',
    date: '25/07/2023',
    sales_order:"SO-000003",
    reference: 'references',
    customer_name:'Mr.Customer 3',
    order_status:'Draft'
  },
];
const SalesOrderItemsList = () => {
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
                label: 'All Sales Order'
              }}
              style={{
                width: 'auto'
              }}
              optionLabelProp='name'
              onChange={(val) => console.log(val)}
              options={[
                {
                  value: 'all',
                  label: 'All Sales Order',
                  name:"All Sales Order"
                },
                {
                  value: 'draft',
                  label: 'Draft ',
                  name: 'Draft'
                },
                {
                  value: 'pending_approval',
                  label: 'Pending Approval',
                  name:'Pending Approval'
                },
                {
                  value: 'approved',
                  label: 'Approved',
                  name:'Approved'
                },
                {
                  value: 'confirmed',
                  label: 'Confirmed',
                  name:'Confirmed'
                },
                {
                 value:'for_packing',
                 label: "For Packing",
                 name :"For Packing"
                },
                {
                 value:'to_be_Shipped',
                 label: "To be Shipped",
                 name :"To be Shipped"
                },
                {
                 value:'shipped',
                 label: "Shipped",
                 name :"Shipped"
                },
                {
                 value:'for_invoicing',
                 label: "For Invoicing",
                 name :"For Invoicing"
                }
              ]}
            />
            <Button
              type="primary"
              className="fs-6 d-flex justify-content-center align-items-center fw-medium"
              onClick={()=>navigate(routes.sales.salesOrder.new)}
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
            onClick: () => navigate(reverse(routes.sales.salesOrder.view, { id: record.key })),
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
export default SalesOrderItemsList;