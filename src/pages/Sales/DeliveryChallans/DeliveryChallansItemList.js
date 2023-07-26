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
    title: 'DELIVERY CHALLAN#',
    dataIndex: 'delivery_challan',
    sorter: (a, b) => a.delivery_challan - b.delivery_challan,
    isVisible: true,
    lock: true,
  },
  {
    title: 'REFERENCE NUMBER',
    dataIndex: 'reference_number',
    sorter: (a, b) => a.reference_number - b.reference_number,
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
    title: 'STATUS',
    dataIndex: 'status',
    sorter: (a, b) => a.status - b.status,
    isVisible: true,
    lock: true,
  },
  {
    title: 'INVOICE STATUS',
    dataIndex: 'invoice_status',
    sorter: (a, b) => a.invoice_status - b.invoicestatus,
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
];
const data = [
  {
    key: '1',
    date:'25/07/2023',
    customer_name: 'Mr.Test1',
    delivery_challan:"Chllan2",
    reference_number: 'ref-00007',
    status:"DRAFT",
    invoice_status: '',
    amount:'Rs.450.00'
  },
  {
    key: '2',
    date:'26/07/2023',
    customer_name: 'Mr.Test2',
    delivery_challan:"Chllan3",
    reference_number: 'ref-00007',
    status:"DRAFT",
    invoice_status: '',
    amount:'Rs.890.00'
  },
];

const DeliveryChallansItemList = () => {
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
                value: 'all_delivery_challans',
                label: 'All Delivery Challans'
              }}
              style={{
                width: 'auto'
              }}
              optionLabelProp='name'
              onChange={(val) => console.log(val)}
              options={[
                {
                  value: 'all',
                  label: 'All ',
                  name:"All "
                },
                {
                  value: 'draft',
                  label: 'Draft ',
                  name: 'Draft'
                },
                {
                  value: 'open',
                  label: 'Open',
                  name:'Open'
                },
                {
                  value: 'delivered',
                  label: 'Delivered',
                  name:'Delivered'
                },
                {
                  value: 'returned',
                  label: 'Returned',
                  name:'Returned'
                },
                {
                 value:'partially_invoiced',
                 label: "Partially Invoiced",
                 name :"Partially Invoiced"
                },
                {
                 value:'invoiced',
                 label: "Invoiced",
                 name :"Invoiced"
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

export default DeliveryChallansItemList;
