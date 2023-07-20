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
    title: 'SKU',
    dataIndex: 'sku',
    sorter: (a, b) => a.sku - b.sku,
    isVisible: true,
    lock: true,
  },
  {
    title: 'STOCK IN HAND',
    dataIndex: 'stock_in_hand',
    sorter: (a, b) => a.stock_in_hand - b.stock_in_hand,
    isVisible: true,
    lock: true,
  },
  {
    title: 'REORDER POINT',
    dataIndex: 'reorder_point',
    sorter: (a, b) => a.reorder_point - b.reorder_point,
    isVisible: true,
    lock: true,
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    sku: 32,
    stock_in_hand: 10,
    reorder_point: 56
  },
  {
    key: '2',
    name: 'Jim Green',
    sku: 42,
    stock_in_hand: 12,
    reorder_point: 50
  },
  {
    key: '3',
    name: 'Joe Black',
    sku: 32,
    stock_in_hand: 5,
    reorder_point: 100
  },
  {
    key: '4',
    name: 'Joe Black',
    sku: 32,
    stock_in_hand: 5,
    reorder_point: 100
  },
  {
    key: '5',
    name: 'Joe Black',
    sku: 32,
    stock_in_hand: 5,
    reorder_point: 100
  },
  {
    key: '6',
    name: 'Joe Black',
    sku: 32,
    stock_in_hand: 5,
    reorder_point: 100
  },
  {
    key: '7',
    name: 'Joe Black',
    sku: 32,
    stock_in_hand: 5,
    reorder_point: 100
  },
  {
    key: '8',
    name: 'Joe Black',
    sku: 32,
    stock_in_hand: 5,
    reorder_point: 100
  },
  {
    key: '9',
    name: 'Joe Black',
    sku: 32,
    stock_in_hand: 5,
    reorder_point: 100
  },
  {
    key: '10',
    name: 'Joe Black',
    sku: 32,
    stock_in_hand: 5,
    reorder_point: 100
  },

];

const CompositeItemsList = () => {
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
                  value: 'all_composite_items',
                  label: 'All',
                  name:"All Composite Items"
                },
                {
                  value: 'ungrouped_items',
                  label: 'Ungrouped Items',
                  name: 'Ungrouped Items'
                },
                {
                  value: 'active_items',
                  label: 'Active',
                  name:'Active Composite Items'
                },
                {
                  value: 'low_stock_items',
                  label: 'Low Stock',
                  name:'Low Stock Composite Items'
                },
                {
                  value: 'inactive_items',
                  label: 'Inactive Items',
                  name:'Inactive Composite Items  '
                }
              ]}
            />
            <Button
              type="primary"
              className="fs-6 d-flex justify-content-center align-items-center fw-medium"
              onClick={()=>navigate(routes.inventory.compositeItem.new)}
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
            onClick: () => navigate(reverse(routes.inventory.compositeItem.view, { id: record.key })),
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

export default CompositeItemsList;
