// import React from 'react'

// const PurchaseReceiveList = () => {
//   return (
//     <div>PurchaseReceiveList</div>
//   )
// }

// export default PurchaseReceiveList
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
    sorter: (a, b) => a.date.length - b.date.length,
    isVisible: true,
    lock: true,
  },
  {
    title: 'PURCHASE RECEIVE#',
    dataIndex: 'purchase_receive',
    sorter: (a, b) => a.purchase_receive.length - b.purchase_receive.length,
    isVisible: true,
    lock: true,
  },
  {
    title: 'PURCHASE ORDER#',
    dataIndex: 'purchase_order',
    sorter: (a, b) => a.purchase_order.length - b.purchase_order.length,
    isVisible: true,
    lock: true,
  },
  {
    title: 'VENDOR NAME',
    dataIndex: 'vendor_name',
  },
  {
      title: 'STATUS',
      dataIndex: 'status',
    },
    {
      title: 'QUANTITY',
      dataIndex: 'quantity',
    },
];
const data = [
  {
    key: '1',
    DATE: '25/07/2023',
    purchase_receive: 'PR-00001',
    purchase_order: 'PU-0000231',
    vendor_name: 'Purchase Vender',
    status:'Received',
    quantity:1.00
  }
];

const PurchaseReceiveList = () => {
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
                value: 'all_composite_items',
                label: 'All Composite Items'
              }}
              style={{
                width: 'auto'
              }}
              optionLabelProp='name'
              onChange={(val) => console.log(val)}
              options={[
                {
                  value: 'all',
                  label: 'All',
                  name:"All Purchase Receives"
                },
                {
                  value: 'in_transit',
                  label: 'In Transit',
                  name: 'In Transit'
                },
                {
                  value: 'received',
                  label: 'Received',
                  name:'Received'
                }
              ]}
            />
            <Button
              type="primary"
              className="fs-6 d-flex justify-content-center align-items-center fw-medium"
              onClick={()=>navigate(routes.purchase.purchaseReceives.new)}
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
            onClick: () => navigate(reverse(routes.purchase.purchaseReceives.view, { id: record.key })),
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

export default PurchaseReceiveList;
