import { CloseOutlined, DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Select, Table } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../components/controller/routes';
import { reverse } from 'named-urls';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (text) => <span>{text}</span>,
    sorter: (a, b) => a.name.length - b.name.length,
    isVisible: true,
    lock: true,
  },
  {
    title: 'COMPANY NAME',
    dataIndex: 'company',
    sorter: (a, b) => a.company - b.company,
    isVisible: true,
    lock: true,
  },
  {
    title: 'EMAIL',
    dataIndex: 'email',
    sorter: (a, b) => a.email - b.email,
    isVisible: true,
    lock: true,
  },
  {
    title: 'WORK PHONE',
    dataIndex: 'work_phone',
    sorter: (a, b) => a.work_phone - b.work_phone,
    isVisible: true,
    lock: true,
  },
  {
    title: 'RECEIVABLE(BCY)',
    dataIndex: 'receivable',
    sorter: (a, b) => a.receivable - b.receivable,
    isVisible: true,
    lock: true,
  },
];
const data = [
  {
    key: '1',
    name: 'Mr.Test',
    company:"Test company",
    email: 'test@gmail.com',
    work_phone: 123456,
    receivable:'Rs.10.00'
  },
  {
    key: '2',
    name: 'Mr.Test2',
    company:"Test company2",
    email: 'test2@gmail.com',
    work_phone: 123456,
    receivable:'Rs.10.00'
  },
  {
    key: '3',
    name: 'Joe Black',
    company:"Joe company",
    email: 'joe@gmail.com',
    work_phone: 623456,
    receivable:'Rs.160.00'
  },
  {
    key: '4',
    name: 'Joe Black',
    company:"Black company",
    email: 'black@gmail.com',
    work_phone: 423456,
    receivable:'Rs.140.00'
  },
  {
    key: '5',
    name: 'Joe Black',
    company:"Test company",
    email: 'test@gmail.com',
    work_phone: 123456,
    receivable:'Rs.10.00'
  },
  {
    key: '6',
    name: 'Joe Black',
    company:"Test company",
    email: 'test@gmail.com',
    work_phone: 123456,
    receivable:'Rs.10.00'
  },
  {
    key: '7',
    name: 'Joe Black',
    company:"Test company",
    email: 'test@gmail.com',
    work_phone: 123456,
    receivable:'Rs.10.00'
  },
  {
    key: '8',
    name: 'Joe Black',
    company:"Test company",
    email: 'test@gmail.com',
    work_phone: 123456,
    receivable:'Rs.10.00'
  },
  {
    key: '9',
    name: 'Joe Black',
    company:"Test company",
    email: 'test@gmail.com',
    work_phone: 123456,
    receivable:'Rs.10.00'
  },
  {
    key: '10',
    name: 'Joe Black',
    company:"Test company",
    email: 'test@gmail.com',
    work_phone: 123456,
    receivable:'Rs.10.00'
  },

];

const CustomerItemsList = () => {
  const navigate=useNavigate()
  const [selectedRows, setSelectedRows] = useState({
    selectedRowKeys: '',
    selectedRows: []
  })
  // rowSelection object indicates the need for row selection
  const rowSelection = {
    selectedRowKeys: selectedRows.selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRows({
        selectedRowKeys,
        selectedRows
      })
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    // getCheckboxProps: (record) => ({
    //   disabled: record.name === 'Disabled User',
    //   // Column configuration not to be checked
    //   name: record.name,
    // }),
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
              // labelInValue
              defaultValue={{
                value: 'all_customers',
                label: 'All Customers'
              }}
              style={{
                width: 'auto'
              }}
              optionLabelProp='name'
              onChange={(val) => console.log(val)}
              options={[
                {
                  value: 'all_customers',
                  label: 'All Customers',
                  name:"All Customers"
                },
                {
                  value: 'active_customers',
                  label: 'Active Customers ',
                  name: 'Active Customers'
                },
                {
                  value: 'crm_customers',
                  label: 'CRM Customers',
                  name:'CRM Customers'
                },
                {
                  value: 'inactive_Customers',
                  label: 'Inactive Customer',
                  name:'Inactive Customer'
                },
                {
                  value: 'overdue_customers',
                  label: 'Overdue Customers',
                  name:'Overdue Customers'
                },
                {
                 value:'unpaid_customers',
                 label: "Unpaid Customers",
                 name :"Unpaid Customers"
                }
              ]}
            />
            <Button
              type="primary"
              className="fs-6 d-flex justify-content-center align-items-center fw-medium"
              onClick={()=>navigate(routes.sales.customers.new)}
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
            onClick: () => navigate(reverse(routes.sales.customers.view, { id: record.key })),
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

export default CustomerItemsList;
