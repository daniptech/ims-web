import { Button, Select, Table } from 'antd';
import { useEffect, useState } from 'react';
import CustomizeTableColumns from '../../../components/modals/CustomizeTableColumns';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../controller/routes';
import { reverse } from 'named-urls';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomer } from '../../../controller/api/sales/customerServices';
import { setCustomer } from '../../../redux/slices/salesSlice';
import { Bars } from 'react-loader-spinner';
import React from 'react';

const CustomerItemsList = () => {
  const dispatch = useDispatch();
  const customerData = useSelector((state) => state.sales.customer);
  const navigate = useNavigate();
  const [customizeColoumn, setCustomizeColoumn] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [loader, setloader] = useState(false);
  // const [openNewItem, setOpenNewItem] = useState(false);
  useEffect(() => {
    setFilterData(customerData);
  }, [customerData]);
  useEffect(() => {
    getCustomerData();
  }, []);
  const getCustomerData = () => {
    setloader(true);
    getCustomer()
      .then((res) => {
        dispatch(setCustomer(res?.data));
      })
      .catch((err) => console.log('Err =====>', err))
      .finally(() => setloader(false));
  };

  const [columns, setcolumns] = useState([
    {
      id: 1,
      title: 'NAME',
      dataIndex: '',
      key: 'name',
      width: '20%',
      render: (record) => <span>{record.firstName + ' ' + record?.lastName}</span>,
      isVisible: true,
      lock: true
    },
    {
      id: 2,
      title: 'COMPANY NAME',
      dataIndex: 'companyName',
      key: 'companyName',
      width: '20%',
      isVisible: true,
      lock: false
    },
    {
      id: 3,
      title: 'Email',
      dataIndex: 'customerEmail',
      key: 'customerEmail',
      sortDirections: ['descend', 'ascend'],
      isVisible: true,
      lock: false
    },
    {
      id: 4,
      title: 'WORK PHONE',
      dataIndex: 'workPhone',
      key: 'workPhone',
      sortDirections: ['descend', 'ascend'],
      isVisible: true,
      lock: false
    },
    {
      id: 5,
      title: 'RECEIVABLES (BCY)',
      dataIndex: '',
      key: 'receivables_bcy',
      // ...getColumnSearchProps('usage_unit'),
      // sorter: (a, b) => a.usage_unit.length - b.usage_unit.length,
      sortDirections: ['descend', 'ascend'],
      isVisible: true,
      lock: false
    },
    {
      id: 6,
      title: 'UNUSED CREDITS (BCY)',
      dataIndex: '',
      key: 'unused_credit_bcy',
      // ...getColumnSearchProps('brrecorder_leveland'),
      // sorter: (a, b) => a.brand.length - b.brand.length,
      sortDirections: ['descend', 'ascend'],
      isVisible: true,
      lock: false
    },
    {
      id: 7,
      title: 'RECEIVABLES',
      dataIndex: '',
      key: 'receivables',
      // ...getColumnSearchProps('account_name'),
      // sorter: (a, b) => a.brand.length - b.brand.length,
      sortDirections: ['descend', 'ascend'],
      isVisible: false,
      lock: false
    },
    {
      id: 8,
      title: 'UNUSED CREDITS',
      dataIndex: '',
      key: '',
      // ...getColumnSearchProps('description'),
      // sorter: (a, b) => a.brand.length - b.brand.length,
      sortDirections: ['descend', 'ascend'],
      isVisible: false,
      lock: false
    },
    {
      id: 9,
      title: 'FIRST NAME',
      dataIndex: 'firstName',
      key: 'firstName',
      sortDirections: ['descend', 'ascend'],
      isVisible: false,
      lock: false
    },
    {
      id: 10,
      title: 'LAST NAME',
      dataIndex: 'lastName',
      key: 'lastName',
      sortDirections: ['descend', 'ascend'],
      isVisible: false,
      lock: false
    },
    {
      id: 11,
      title: 'MOBILE PHONE',
      dataIndex: 'mobile',
      key: 'mobile',
      sortDirections: ['descend', 'ascend'],
      isVisible: false,
      lock: false
    },
    {
      id: 12,
      title: 'PAYMENT TERM',
      dataIndex: 'paymentTerms',
      key: 'paymentTerms',
      sortDirections: ['descend', 'ascend'],
      isVisible: false,
      lock: false
    },
    {
      id: 13,
      title: 'STATUS',
      dataIndex: '',
      key: 'status',
      sortDirections: ['descend', 'ascend'],
      isVisible: false,
      lock: false
    },
    {
      id: 14,
      title: 'WEBSITE',
      dataIndex: 'website',
      sortDirections: ['descend', 'ascend'],
      isVisible: false,
      lock: false
    }
  ]);
  const [currentPage, setCurrentPage] = useState(1);

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className="w-100 position-relative ">
      {loader && (
        <div
          className="d-flex justify-content-center align-items-center w-100 position-absolute"
          style={{ height: '100vh', zIndex: '11111' }}
        >
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
          <Select
            className="item-table-filter"
            bordered={false}
            labelInValue
            defaultValue={{
              value: 'all_items',
              label: 'All Items'
            }}
            style={{
              width: 'auto'
            }}
            // onChange={handleChange}
            options={[
              {
                value: 'all_items',
                label: 'All Items'
              },
              {
                value: 'active_items',
                label: 'Active Items'
              },
              {
                value: 'ungrouped_items',
                label: 'Ungrouped Items'
              },
              {
                value: 'low_stock_items',
                label: 'Low Stock Items'
              },
              {
                value: 'sales',
                label: 'Sales'
              },
              {
                value: 'pirchases',
                label: 'Purchases'
              },
              {
                value: 'inventory_items',
                label: 'Inventory Items'
              },
              {
                value: 'non_inventory-items',
                label: 'Non-Inventory Items'
              },
              {
                value: 'services',
                label: 'Services'
              },
              {
                value: 'inactive_items',
                label: 'Inactive Items'
              },
              {
                value: 'non_returnable_items',
                label: 'Non Returnable Items'
              }
            ]}
          />
          <Button
            type="primary"
            className="fs-6 d-flex justify-content-center align-items-center fw-medium"
            onClick={() => navigate(routes.sales.customers.new)}
          >
            + New
          </Button>
        </div>
        <div
          className="m-3 p-3 border border-1 "
          style={{
            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px'
          }}
        >
          <div className="w-100 d-flex justify-content-end align-items-end p-3 mb-3">
            <Button type="primary" onClick={() => setCustomizeColoumn(true)}>
              Customize Columns
            </Button>
          </div>
          <Table
            columns={columns.filter((val) => val.isVisible)}
            dataSource={filterData}
            onRow={(record) => ({
              onClick: () => navigate(reverse(routes.sales.customers.view, { id: record.id }))
            })}
            scroll={{ x: 1000 }}
            className=""
            pagination={{
              current: currentPage,
              pageSize: 6,
              onChange: handleChangePage
            }}
          />
        </div>
        {customizeColoumn && (
          <CustomizeTableColumns
            customizeColoumn={customizeColoumn}
            setCustomizeColoumn={setCustomizeColoumn}
            columns={columns}
            setcolumns={setcolumns}
          />
        )}
        {/* {openNewItem && <CreateNewItem openNewItem={openNewItem} setOpenNewItem={setOpenNewItem} />} */}
      </div>
    </div>
  );
};

export default CustomerItemsList;
