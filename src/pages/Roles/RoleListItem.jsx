import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, message } from 'antd';
import { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import CustomizeTableColumns from '../../components/modals/CustomizeTableColumns';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../controller/routes';
import React from 'react-redux';
import { Bars } from 'react-loader-spinner';
import { useEffect } from 'react';
import { getAllRole, removeRole } from '../../controller/api/role/roleServices';
import { reverse } from 'named-urls';

const RoleListItem = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [customizeColoumn, setCustomizeColoumn] = useState(false);
  const [loader, setloader] = useState(false);
  const [roleList, setRoleList] = useState([]);

  useEffect(() => {
    getRoleData();
  }, []);
  const getRoleData = () => {
    setloader(true);
    getAllRole()
      .then((res) => {
        setRoleList(res.data);
        setloader(false);
      })
      .catch((err) => {
        console.log('err----->', err);
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
      title: 'ROLE Name ',
      dataIndex: 'roleName',
      key: 'roleName',
      render: (record) => (
        <span className="d-inline-block text-truncate" style={{ maxWidth: '150px' }}>
          {record?.role}
        </span>
      ),
      ...getColumnSearchProps('roleName'),
      sorter: (a, b) => a.roleName.length - b.roleName.length,
      sortDirections: ['descend', 'ascend'],
      isVisible: true,
      lock: false
    },
    {
      id: 2,
      title: 'Action',
      dataIndex: '',
      key: 'action',
      render: (record) => {
        return (
          <div className="d-flex align-items-center gap-2">
            <DeleteOutlined
              onClick={async () => {
                await removeRole({ id: record?.id })
                  .then(() => {
                    message.success('Role Successfully Deleted');
                    getRoleData();
                  })
                  .catch((err) => console.log('err -------=>', err));
              }}
            />
            <EditOutlined onClick={() => navigate(reverse(routes.role.edit, { id: record.id }))} />
          </div>
        );
      },
      isVisible: true,
      lock: true
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
            onClick={() => navigate(routes.role.createRole)}
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
            dataSource={roleList}
            // scroll={{ x:2400 }}
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

export default RoleListItem;
