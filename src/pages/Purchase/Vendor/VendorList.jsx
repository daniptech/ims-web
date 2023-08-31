import { CloseOutlined, MoreOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Dropdown, Input, Select, Space, Table } from 'antd';
import { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useNavigate } from 'react-router-dom';
import { reverse } from 'named-urls';
import { routes } from '../../../controller/routes';
import CustomizeTableColumns from '../../../components/modals/CustomizeTableColumns';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVendor } from '../../../controller/api/purchase/vendorServices';
import { setVendor } from '../../../redux/slices/purchaseSlice';
import { Bars } from "react-loader-spinner";

const VendorList = () => {
  const dispatch = useDispatch();
  const vendorData = useSelector((state) => state.purchase.vendor);
  const currentUserData = useSelector((state) => state.user.currentuser);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [customizeColoumn, setCustomizeColoumn] = useState(false);
  const [filterVendorData, setFilterVendorData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [selectedRows, setSelectedRows] = useState({
    selectedRowKeys: '',
    selectedRows: []
  });

  useEffect(() => {
    setFilterVendorData(vendorData);
  }, [vendorData]);

  useEffect(() => {
    setLoader(true);
    getVendor({ organizationId: currentUserData?.organizationId })
      .then((res) => {
        dispatch(setVendor(res.data));
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
      });
  }, [dispatch, currentUserData]);

  const rowSelection = {
    selectedRowKeys: selectedRows.selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRows({
        selectedRowKeys,
        selectedRows
      });
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    }
    // getCheckboxProps: (record) => ({
    //   disabled: record.name === 'Disabled User',
    //   // Column configuration not to be checked
    //   name: record.name,
    // }),
  };
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8
        }}
        onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block'
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90
            }}>
            Search
          </Button>
          <Button
            onClick={() => {
              clearFilters && handleReset(clearFilters);
              handleSearch(selectedKeys, confirm, dataIndex);
            }}
            size="small"
            style={{
              width: 90
            }}>
            Reset
          </Button>
          {/* <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedC  olumn(dataIndex);
            }}
          >
            Filter
          </Button> */}
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}>
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      )
  });
  const [columns, setcolumns] = useState([
    {
      id: 1,
      title: 'NAME',
      dataIndex: 'firstName',
      key: 'name',
      width: '20%',
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
      title: 'EMAIL',
      dataIndex: 'vendorEmail',
      key: 'email',
      isVisible: true,
      lock: false
    },
    {
      id: 4,
      title: 'WORK PHONE',
      dataIndex: 'workPhone',
      key: 'workPhone',
      isVisible: true,
      lock: false
    },
    {
      id: 5,
      title: 'PAYABLES (BCY)',
      dataIndex: 'payables_bcy',
      key: 'payables_bcy',
      isVisible: true,
      lock: false
    },
    {
      id: 6,
      title: 'UNUSED CREDITS (BCY)',
      dataIndex: 'unused_credit_bcy',
      key: 'unused_credit_bcy',
      isVisible: true,
      lock: false
    },
    {
      id: 7,
      title: 'PAYABLES',
      dataIndex: 'payables',
      key: 'payables',
      isVisible: false,
      lock: false
    },
    {
      id: 8,
      title: 'UNUSED CREDITS',
      dataIndex: 'unused_credit',
      key: 'unused_credit',
      isVisible: false,
      lock: false
    },
    {
      id: 9,
      title: 'FIRST NAME',
      dataIndex: 'firstName',
      key: 'firstName',
      isVisible: false,
      lock: false
    },
    {
      id: 10,
      title: 'LAST NAME',
      dataIndex: 'lastName',
      key: 'lastName',
      isVisible: false,
      lock: false
    },
    {
      id: 11,
      title: 'MOBILE PHONE',
      dataIndex: 'mobile',
      key: 'mobile',
      isVisible: false,
      lock: false
    },
    {
      id: 12,
      title: 'PAYMENT TERMS',
      dataIndex: 'paymentTerms',
      key: 'paymentTerms',
      isVisible: false,
      lock: false
    },
    {
      id: 13,
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      isVisible: false,
      lock: false
    },
    {
      id: 14,
      title: 'WEBSITE',
      dataIndex: 'website',
      key: 'website',
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
        {selectedRows?.selectedRows?.length ? (
          <>
            <div className="d-flex gap-2 align-items-center">
              <Button>Bulk Update</Button>
              <Dropdown
                trigger="click"
                menu={{
                  items: [
                    {
                      label: 'Mark as Active',
                      key: 1
                    },
                    {
                      label: 'Merge',
                      key: 2
                    },
                    {
                      label: 'Mark as Inactive',
                      key: 3
                    },
                    {
                      label: 'Delete',
                      key: 4
                    }
                  ]
                }}>
                <Button className="d-flex justify-content-center align-items-center p-2">
                  {' '}
                  <MoreOutlined rotate={90} className="m-0" />
                </Button>
              </Dropdown>
              <span className="fs-6 text-muted">
                {selectedRows?.selectedRows?.length} Customer(s) Selected
              </span>
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
              onClick={() => navigate(routes.purchase.vendor.new)}>
              + New
            </Button>
          </>
        )}
      </div>
      <div
        className="m-3 p-3 border border-1 "
        style={{
          boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px'
        }}>
        {!selectedRows?.selectedRows?.length && (
          <div className="w-100 d-flex justify-content-end align-items-end p-3 mb-3">
            <Button type="primary" onClick={() => setCustomizeColoumn(true)}>
              Customize Columns
            </Button>
          </div>
        )}
        <Table
          rowSelection={{
            type: 'checkbox',
            ...rowSelection
          }}
          columns={columns.filter((val) => val.isVisible)}
          dataSource={filterVendorData}
          onRow={(record) => ({
            onClick: () => navigate(reverse(routes.purchase.vendor.view, { id: record.id }))
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
    </div>
    </div>
  );
};

export default VendorList;
