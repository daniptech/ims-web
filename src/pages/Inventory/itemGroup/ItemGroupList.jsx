import { CloseOutlined } from '@ant-design/icons';
import { Button, Select, Table } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { reverse } from 'named-urls';
import { routes } from '../../../controller/routes';
import { hasAccessFeature } from '../../../controller/global';
import { accesslevel, moduleEnum } from '../../../controller/enum';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (text, record) => (
      <span>
        {text} {record?.children?.length && `(${record.children.length} items)`}
      </span>
    ),
    sorter: (a, b) => a.name.length - b.name.length,
    isVisible: true,
    lock: true
  },
  {
    title: 'SKU',
    dataIndex: 'sku',
    render: (text, record) => (record?.ischild ? 'ddn' : ''),
    sorter: (a, b) => a.sku - b.sku,
    isVisible: true,
    lock: true
  },
  {
    title: 'STOCK IN HAND',
    dataIndex: 'stock_in_hand',
    render: (text, record) => (record?.ischild ? text : ''),
    sorter: (a, b) => a.stock_in_hand - b.stock_in_hand,
    isVisible: true,
    lock: true
  },
  {
    title: 'REORDER POINT',
    dataIndex: 'reorder_point',
    render: (text, record) => (record?.ischild ? text : ''),
    sorter: (a, b) => a.reorder_point - b.reorder_point,
    isVisible: true,
    lock: true
  }
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    sku: 32,
    stock_in_hand: 10,
    reorder_point: 56,
    children: [
      {
        name: 'John Brown',
        sku: 32,
        stock_in_hand: 10,
        reorder_point: 56,
        ischild: true
      }
    ]
  },
  {
    key: '2',
    name: 'Jim Green',
    sku: 42,
    stock_in_hand: 12,
    reorder_point: 50,
    children: [
      {
        name: 'John Brown',
        sku: 32,
        stock_in_hand: 10,
        reorder_point: 56,
        ischild: true
      }
    ]
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
  }
];

const ItemGroupList = () => {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState({
    selectedRowKeys: '',
    selectedRows: []
  });
  // rowSelection object indicates the need for row selection
  const rowSelection = {
    selectedRowKeys: selectedRows.selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRows({
        selectedRowKeys,
        selectedRows
      });
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => {
      return {
        disabled: record.ischild // Disable checkbox for child rows
      };
    }
  };
  const [currentPage, setCurrentPage] = useState(1);

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className="w-100 h-100">
      <div className="w-100 p-3 d-flex justify-content-between align-items-center">
        {selectedRows?.selectedRows?.length ? (
          <>
            <div className="d-flex gap-2">
              <Button>Mark as Active</Button>
              <Button>Mark as Inactive</Button>
            </div>
            <CloseOutlined onClick={() => rowSelection.onChange('', [])} className="text-muted" />
          </>
        ) : (
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
              onChange={(val) => console.log(val)}
              options={[
                {
                  value: 'all_items_group',
                  label: 'All Item Groups'
                },
                {
                  value: 'active_items_group',
                  label: 'Active Item Groups'
                },
                {
                  value: 'inactive_items_group',
                  label: 'Inactive Item Groups'
                }
              ]}
            />
           {hasAccessFeature(accesslevel.write,moduleEnum.Inventory_item_groups)&&<Button
              type="primary"
              className="fs-6 d-flex justify-content-center align-items-center fw-medium"
              onClick={() => navigate(routes.inventory.itemGroups.new)}
            >
              + New
            </Button>}
          </>
        )}
      </div>
      <div className=" p-3">
        <Table
          rowSelection={{
            type: 'checkbox',
            ...rowSelection
          }}
          className="item-group-table"
          scroll={{
            y: 350
          }}
          onRow={(record) => ({
            onClick: () =>
              record.ischild
                ? navigate(reverse(routes.inventory.items.view, { id: record.key }))
                : navigate(reverse(routes.inventory.itemGroups.view, { id: record.key }))
          })}
          columns={columns}
          dataSource={data}
          pagination={{
            current: currentPage,
            pageSize: 6,
            onChange: handleChangePage
          }}
        />
      </div>
    </div>
  );
};

export default ItemGroupList;
