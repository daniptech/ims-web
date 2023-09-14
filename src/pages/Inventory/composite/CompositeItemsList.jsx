import { CloseOutlined, DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../controller/routes';
import { reverse } from 'named-urls';
import { getItem } from '../../../controller/api/inventory/itemService';
import { setCompositeItem } from '../../../redux/slices/inventorySlice';
import { useDispatch, useSelector } from 'react-redux';
import { Bars } from 'react-loader-spinner';

const columns = [
  {
    title: 'Name',
    dataIndex: '',
    render: (record) => {
      if (Object.prototype.hasOwnProperty.call(record, 'item')) {
        return record?.item?.name || '-';
      } else {
        return record?.name || '-';
      }
    },
    sorter: (a, b) => a.name.length - b.name.length,
    isVisible: true,
    lock: true
  },
  {
    title: 'SKU',
    dataIndex: '',
    render: (record) => {
      if (Object.prototype.hasOwnProperty.call(record, 'sku')) {
        return record?.sku || '-';
      } else {
        return record?.item?.sku || '-';
      }
    },
    sorter: (a, b) => a.sku - b.sku,
    isVisible: true,
    lock: true
  },
  {
    title: 'STOCK IN HAND',
    dataIndex: '',
    key: 'openingStock',
    render: (record) => {
      if (Object.prototype.hasOwnProperty.call(record, 'inventoryInfo')) {
        return record?.inventoryInfo?.openingStock || '-';
      } else {
        return record?.item?.inventoryInfo?.openingStock || '-';
      }
    },
    sorter: (a, b) => a.stock_in_hand - b.stock_in_hand,
    isVisible: true,
    lock: true
  },
  {
    title: 'REORDER POINT',
    dataIndex: '',
    key: 'reorderPoint',
    render: (record) => {
      if (Object.prototype.hasOwnProperty.call(record, 'inventoryInfo')) {
        return record?.inventoryInfo?.reorderPoint || '-';
      } else {
        return record?.item?.inventoryInfo?.reorderPoint || '-';
      }
    },
    sorter: (a, b) => a.reorder_point - b.reorder_point,
    isVisible: true,
    lock: true
  }
];

const CompositeItemsList = () => {
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
    }
    // getCheckboxProps: (record) => {
    //   return {
    //     disabled: record.ischild == true ? true : false // Disable checkbox for child rows
    //   };
    // }
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
  const dispatch = useDispatch();
  const compositeItemData = useSelector((state) => state.inventory.compositeItem);
  const currentUserData = useSelector((state) => state.user.currentuser);
  const [filterData, setFilterData] = useState([]);
  const [loader, setloader] = useState(false);

  useEffect(() => {
    setFilterData(compositeItemData);
  }, [compositeItemData]);

  useEffect(() => {
    setloader(true);
    getItem({ organizationId: currentUserData?.organizationId, IsComposite: true })
      .then((res) => {
        const updateData = res?.data?.map((val, index) => {
          if (val && val.associatedItems && val.associatedServices) {
            val['key'] = index;
            val['children'] = [...val.associatedItems, ...val.associatedServices];
            val['children'] = val['children']?.map((value) => {
              value['ischild'] = true;
              return value;
            });
            val['children'] = val['children']?.filter((data) => {
              if (data?.item) {
                return data;
              }
            });
            if(val?.children?.length==0){
              delete val.children
            }
          }
          return val;
        });
        dispatch(setCompositeItem(updateData));
        setloader(false);
      })
      .catch((err) => {
        console.log('err ====>', err);
        setloader(false);
      });
  }, [dispatch, currentUserData]);
  return (
    <div className="w-100 position-relative ">
      {loader && (
        <div
          className="d-flex justify-content-center align-items-center w-100 position-absolute"
          style={{ height: '100vh', zIndex: '11111' }}>
          <Bars
            height="130"
            width="130"
            color="#1677ff"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={loader}
          />
        </div>
      )}
      <div className={`w-100 h-100 ${loader && ' opacity-25'}`}>
        <div className="w-100 p-3 d-flex justify-content-between align-items-center">
          {selectedRows?.selectedRows?.length ? (
            <>
              <Dropdown
                trigger="click"
                menu={{
                  items
                }}
                placement="bottom">
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
                // labelInValue
                defaultValue={{
                  value: 'all_composite_items',
                  label: 'All Composite Items'
                }}
                style={{
                  width: 'auto'
                }}
                optionLabelProp="name"
                onChange={(val) => console.log(val)}
                options={[
                  {
                    value: 'all_composite_items',
                    label: 'All',
                    name: 'All Composite Items'
                  },
                  {
                    value: 'ungrouped_items',
                    label: 'Ungrouped Items',
                    name: 'Ungrouped Items'
                  },
                  {
                    value: 'active_items',
                    label: 'Active',
                    name: 'Active Composite Items'
                  },
                  {
                    value: 'low_stock_items',
                    label: 'Low Stock',
                    name: 'Low Stock Composite Items'
                  },
                  {
                    value: 'inactive_items',
                    label: 'Inactive Items',
                    name: 'Inactive Composite Items  '
                  }
                ]}
              />
              <Button
                type="primary"
                className="fs-6 d-flex justify-content-center align-items-center fw-medium"
                onClick={() => navigate(routes.inventory.compositeItem.new)}>
                + New
              </Button>
            </>
          )}
        </div>
        <div className="p-3">
          <Table
            rowSelection={{
              type: 'checkbox',
              ...rowSelection
            }}
            onRow={(record) => ({
              onClick: () => {
                if (!record?.ischild) {
                  navigate(reverse(routes.inventory.compositeItem.view, { id: record.id }));
                }
              }
            })}
            scroll={{
              y: 400
            }}
            className="item-group-table"
            columns={columns}
            dataSource={filterData}
            pagination={{
              current: currentPage,
              pageSize: 8,
              onChange: handleChangePage
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CompositeItemsList;
