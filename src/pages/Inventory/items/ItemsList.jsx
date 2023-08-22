import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Select, Space, Table } from 'antd';
import { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import CustomizeTableColumns from '../../../components/modals/CustomizeTableColumns';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../controller/routes';
import { reverse } from 'named-urls';
import { useDispatch, useSelector } from 'react-redux';
import { getItem } from '../../../controller/api/inventory/itemService';
import { setItem } from '../../../redux/slices/inventorySlice';
import { Bars } from 'react-loader-spinner';

const ItemsList = () => {
  const dispatch = useDispatch();
  const itemData = useSelector((state) => state.inventory.items);
  const currentUserData = useSelector((state) => state.user.currentuser);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [customizeColoumn, setCustomizeColoumn] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [loader, setloader] = useState(false);
  // const [openNewItem, setOpenNewItem] = useState(false);
  useEffect(() => {
    setFilterData(itemData);
  }, [itemData]);

  useEffect(() => {
    setloader(true);
    getItem({ organizationId: currentUserData?.organizationId })
      .then((res) => {
        dispatch(setItem(res.data));
        setloader(false);
      })
      .catch((err) => {
        setloader(false);
      });
  }, [dispatch, currentUserData]);

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
        onKeyDown={(e) => e.stopPropagation()}
      >
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
            }}
          >
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
            }}
          >
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
            }}
          >
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
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      ...getColumnSearchProps('name'),
      sorter: (a, b) => a.name.length - b.name.length,
      isVisible: true,
      lock: true
    },
    {
      id: 2,
      title: 'SKU',
      dataIndex: 'sku',
      key: 'sku',
      width: '20%',
      ...getColumnSearchProps('sku'),
      sorter: (a, b) => a.sku.length - b.sku.length,
      isVisible: true,
      lock: false
    },
    {
      id: 3,
      title: 'STOCK ON HAND',
      dataIndex: 'inventoryInfo',
      key: 'stock',
      render: (record) => record?.openingStock,
      // ...getColumnSearchProps('stock'),
      // sorter: (a, b) => a.stock.length - b.stock.length,
      sortDirections: ['descend', 'ascend'],
      isVisible: false,
      lock: false
    },
    {
      id: 4,
      title: 'BRAND',
      dataIndex: 'brand',
      key: 'brand',
      ...getColumnSearchProps('brand'),
      sorter: (a, b) => a.brand.length - b.brand.length,
      sortDirections: ['descend', 'ascend'],
      isVisible: true,
      lock: false
    },
    {
      id: 5,
      title: 'USAGE UNIT',
      dataIndex: 'unit',
      key: 'usage_unit',
      // ...getColumnSearchProps('usage_unit'),
      // sorter: (a, b) => a.usage_unit.length - b.usage_unit.length,
      sortDirections: ['descend', 'ascend'],
      isVisible: false,
      lock: false
    },
    {
      id: 6,
      title: 'REORDER LEVEL',
      dataIndex: 'inventoryInfo',
      key: 'recorder_level',
      render: (record) => record?.reorderPoint,
      // ...getColumnSearchProps('brrecorder_leveland'),
      // sorter: (a, b) => a.brand.length - b.brand.length,
      sortDirections: ['descend', 'ascend'],
      isVisible: false,
      lock: false
    },
    {
      id: 7,
      title: 'ACCOUNT NAME',
      dataIndex: 'sellingInfo',
      key: 'account_name',
      render: (record) => record?.account,
      // ...getColumnSearchProps('account_name'),
      // sorter: (a, b) => a.brand.length - b.brand.length,
      sortDirections: ['descend', 'ascend'],
      isVisible: true,
      lock: false
    },
    {
      id: 8,
      title: 'DESCRIPTION',
      dataIndex: 'sellingInfo',
      key: 'description',
      render: (record) => record?.description,
      // ...getColumnSearchProps('description'),
      // sorter: (a, b) => a.brand.length - b.brand.length,
      sortDirections: ['descend', 'ascend'],
      isVisible: true,
      lock: false
    },
    {
      id: 9,
      title: 'MANUFACTURER',
      dataIndex: 'manufacturer',
      key: 'manufacturer',
      ...getColumnSearchProps('manufacturer'),
      sorter: (a, b) => a.brand.length - b.brand.length,
      sortDirections: ['descend', 'ascend'],
      isVisible: false,
      lock: false
    },
    {
      id: 10,
      title: 'PURCHASE ACCOUNT NAME',
      dataIndex: 'purchaseInfo',
      key: 'purchase_account_name',
      render: (record) => record?.account,
      // ...getColumnSearchProps('purchase_account_name'),
      // sorter: (a, b) => a.brand.length - b.brand.length,
      sortDirections: ['descend', 'ascend'],
      isVisible: false,
      lock: false
    },
    {
      id: 11,
      title: 'PURCHASE DESCRIPTION',
      dataIndex: 'purchaseInfo',
      key: 'purchase_description',
      render: (record) => record?.description,
      // ...getColumnSearchProps('purchase_description'),
      // sorter: (a, b) => a.brand.length - b.brand.length,
      sortDirections: ['descend', 'ascend'],
      isVisible: false,
      lock: false
    },
    {
      id: 12,
      title: 'PURCHASE RATE',
      dataIndex: 'purchaseInfo',
      key: 'purchase_rate',
      render: (record) => record?.costPrice,
      // ...getColumnSearchProps('purchase_rate'),
      // sorter: (a, b) => a.brand.length - b.brand.length,
      sortDirections: ['descend', 'ascend'],
      isVisible: false,
      lock: false
    },
    {
      id: 13,
      title: 'RATE',
      dataIndex: 'sellingInfo',
      key: 'rate',
      render: (record) => record?.sellingPrice,
      // ...getColumnSearchProps('rate'),
      // sorter: (a, b) => a.brand.length - b.brand.length,
      sortDirections: ['descend', 'ascend'],
      isVisible: false,
      lock: false
    },
    {
      id: 14,
      title: 'SHOW IN STORE',
      dataIndex: '',
      key: 'show_in_store',
      render: (record) => <span>false</span>,
      // ...getColumnSearchProps('show_in_store'),
      // sorter: (a, b) => a.brand.length - b.brand.length,
      sortDirections: ['descend', 'ascend'],
      isVisible: false,
      lock: false
    },
    {
      id: 15,
      title: 'TYPE',
      dataIndex: 'type',
      key: 'type',
      ...getColumnSearchProps('type'),
      sorter: (a, b) => a.brand.length - b.brand.length,
      sortDirections: ['descend', 'ascend'],
      isVisible: false,
      lock: false
    },
    {
      id: 16,
      title: 'UPC',
      dataIndex: 'upc',
      key: 'upc',
      ...getColumnSearchProps('upc'),
      sorter: (a, b) => a.brand.length - b.brand.length,
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
            onClick={() => navigate(routes.inventory.items.new)}
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
              onClick: () => navigate(reverse(routes.inventory.items.view, { id: record.id }))
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

export default ItemsList;
