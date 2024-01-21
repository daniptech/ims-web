import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import CustomizeTableColumns from '../../components/modals/CustomizeTableColumns';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../controller/routes';
import React, { useDispatch, useSelector } from 'react-redux';
import { getItem } from '../../controller/api/inventory/itemService';
import { setItem } from '../../redux/slices/inventorySlice';
import { Bars } from 'react-loader-spinner';
import { allUser, removeUser } from '../../controller/api/AuthServices';
import { reverse } from 'named-urls';

const UserList = () => {
  const dispatch = useDispatch();
  const itemData = useSelector((state) => state.inventory.items);
  const currentUserData = useSelector((state) => state.user.currentuser);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [customizeColoumn, setCustomizeColoumn] = useState(false);
  const [loader, setloader] = useState(false);
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    allUserGet();
  }, []);
  const allUserGet = async () => {
    setloader(true);
    await allUser()
      .then((res) => {
        setUserData(res.data);
        setloader(false);
      })
      .catch((err) => {
        console.log('err ====== >>', err);
        setloader(false);
      });
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
      title: 'FIRST NAME',
      dataIndex: 'firstName',
      key: 'firstName',
      ...getColumnSearchProps('firstName'),
      render: (item, record) => (
        <span className="d-flex justify-content-start align-items-center text-primary gap-2 text-start">
          {item}
        </span>
      ),
      sorter: (a, b) => a.firstName.length - b.firstName.length,
      isVisible: true,
      lock: true
    },
    {
      id: 2,
      title: 'LAST NAME',
      dataIndex: 'lastName',
      key: 'lastName',
      ...getColumnSearchProps('lastName'),
      sorter: (a, b) => a.lastName.length - b.lastName.length,
      isVisible: true,
      lock: true
    },
    {
      id: 3,
      title: 'PHONE NO.',
      dataIndex: '',
      key: 'phoneNumber',
      render: (record) => (
        <span>
          {record.countryCode}
          {record.phoneNumber}
        </span>
      ),
      // ...getColumnSearchProps('stock'),
      isVisible: true,
      lock: false
    },
    {
      id: 4,
      title: 'EMAIL',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email'),
      sorter: (a, b) => a.email.length - b.email.length,
      sortDirections: ['descend', 'ascend'],
      isVisible: false,
      lock: false
    },
    {
      id: 5,
      title: 'ROLE',
      dataIndex: 'role',
      key: 'role',
      render: (record) => (
        <span className="d-inline-block text-truncate" style={{ maxWidth: '150px' }}>
          {record?.role}
        </span>
      ),
      ...getColumnSearchProps('role'),
      sorter: (a, b) => a.role.length - b.role.length,
      sortDirections: ['descend', 'ascend'],
      isVisible: true,
      lock: false
    },
    {
      id: 6,
      title: 'COUNTRY',
      dataIndex: 'country',
      key: 'country',
      // ...getColumnSearchProps('usage_unit'),
      // sorter: (a, b) => a.usage_unit.length - b.usage_unit.length,
      sortDirections: ['descend', 'ascend'],
      isVisible: false,
      lock: false
    },
    {
      id: 7,
      title: 'CITY',
      dataIndex: 'city',
      key: 'city',
      render: (record) => record,
      // ...getColumnSearchProps('brrecorder_leveland'),
      // sorter: (a, b) => a.brand.length - b.brand.length,
      sortDirections: ['descend', 'ascend'],
      isVisible: false,
      lock: false
    },
    {
      id: 8,
      title: 'COMPANY NAME',
      dataIndex: 'companyName',
      key: 'companyName',
      render: (record) => record,
      // ...getColumnSearchProps('companyName'),
      // sorter: (a, b) => a.companyName.length - b.companyName.length,
      sortDirections: ['descend', 'ascend'],
      isVisible: false,
      lock: false
    },
    {
      id: 9,
      title: 'ORGANIZATION ID',
      dataIndex: 'organizationId',
      key: 'organizationId',
      render: (record) => record,
      // ...getColumnSearchProps('organizationId'),
      // sorter: (a, b) => a.organizationId.length - b.organizationId.length,
      sortDirections: ['descend', 'ascend'],
      isVisible: false,
      lock: false
    },
    {
      id: 10,
      title: 'ACTION',
      dataIndex: '',
      key: '',
      width: '10%',
      render: (record) => {
        return (
          <div className="d-flex align-items-center gap-2">
            <DeleteOutlined onClick={() => {
              removeUser({id:record.id})
              .then(()=>{
                allUserGet()
                message.success("User Sucessfully Deleted")
              }).catch(err=>console.log("err ------->",err))
            }}  />
            <EditOutlined onClick={() => { 
              navigate(reverse(routes.user.edit,{id:record.id}),{state: { data: record } })
            }} />
          </div>
        );
      },
      isVisible: true,
      lock: true,
      fixed: 'right'
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
        <div className="w-100 p-3 d-flex justify-content-end align-items-end">
          <Button
            type="primary"
            className="fs-6 d-flex justify-content-center align-items-center fw-medium"
            onClick={() => navigate(routes.user.createUser)}
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
            dataSource={userData}
            scroll={{ x: 1700 }}
            className=""
            pagination={{
              current: currentPage,
              pageSize: 5,
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

export default UserList;
