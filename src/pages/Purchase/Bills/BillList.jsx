import { Button, Tabs, Select, Upload, message, Image, Table, Input, Space, Dropdown } from 'antd';
import { useNavigate } from 'react-router-dom';
import Highlighter from 'react-highlight-words';
import { routes } from '../../../controller/routes';
import { reverse } from 'named-urls';
import { Images } from '../../../controller/Images';
import React, { useRef, useState } from 'react';
import { SearchOutlined, MoreOutlined, CloseOutlined } from '@ant-design/icons';
import CustomizeTableColumns from '../../../components/modals/CustomizeTableColumns';
const { Dragger } = Upload;
const { TabPane } = Tabs;
const BillList = () => {
  const navigate = useNavigate();
  const draggerProps = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    }
  };

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [customizeColoumn, setCustomizeColoumn] = useState(false);
  // const [openNewItem, setOpenNewItem] = useState(false);
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
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      ...getColumnSearchProps('date'),
      sorter: (a, b) => a.date.length - b.date.length,
      isVisible: true,
      lock: true
    },
    {
      id: 2,
      title: 'BILL#',
      dataIndex: 'bill',
      key: 'bill',
      width: '20%',
      ...getColumnSearchProps('bill'),
      sorter: (a, b) => a.bill.length - b.bill.length,
      isVisible: true,
      lock: true
    },
    {
      id: 3,
      title: 'REFERENCE NUMBER',
      dataIndex: 'reference_number',
      key: 'reference_number',
      isVisible: true,
      lock: false
    },
    {
      id: 4,
      title: 'VENDOR NAME',
      dataIndex: 'vendor_name',
      key: 'vendor_name',
      isVisible: true,
      lock: true
    },
    {
      id: 5,
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      isVisible: true,
      lock: true
    },
    {
      id: 6,
      title: 'DUE DATE',
      dataIndex: 'due_date',
      key: 'due_date',
      isVisible: true,
      lock: false
    },
    {
      id: 7,
      title: 'AMOUNT',
      dataIndex: 'amount',
      key: 'amount',
      isVisible: false,
      lock: false
    },
    {
      id: 8,
      title: 'BALANCE DUE',
      dataIndex: 'balance_due',
      key: 'balance_due',
      isVisible: true,
      lock: true
    }
  ]);

  const data = [
    {
      key: '1',
      date: '20-04-2024',
      bill: '2434343',
      reference_number: '124214',
      vendor_name: 'Purchase Vender',
      status: 'open',
      due_date: '25/07/2023',
      amount: 5000,
      balance_due: 1000
    }
  ];
  const [currentPage, setCurrentPage] = useState(1);

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-100 h-100">
      <div className="w-100 d-flex justify-content-between align-items-center position-relative">
        <Tabs defaultActiveKey="2" className="upload-document w-100">
          <TabPane tab={<h6 className="m-0">Uploaded Documents</h6>} className="" key="1">
            <div
              className="w-100"
              style={{
                maxHeight: '80vh',
                height: '100%',
                overflow: 'scroll'
              }}
            >
              <div className="bg-light w-100 p-3">
                <Select
                  className="item-table-filter"
                  bordered={false}
                  // labelInValue
                  defaultValue={{
                    value: 'all',
                    label: 'All Documents'
                  }}
                  style={{
                    width: 'auto'
                  }}
                  onChange={(val) => console.log(val)}
                  options={[
                    {
                      value: 'all',
                      label: 'All Documents'
                    },
                    {
                      value: 'pending_document',
                      label: 'User uploaded Pending Documents'
                    }
                  ]}
                />
              </div>
              <div
                className="w-100 d-flex justify-content-center align-items-center"
                style={{ minHeight: '40vh' }}
              >
                <div className="w-50">
                  <Dragger {...draggerProps}>
                    <div className="d-flex flex-column lh-lg">
                      <div className="mb-3">
                        <Image
                          src={Images.uploadImage}
                          alt=""
                          style={{ width: '150px' }}
                          preview={false}
                        />
                      </div>
                      <span className="fs-5 fw-medium">Drag & Drop Files Here</span>
                      <span> Upload your documents (Images, PDF, Docs or Sheets) here</span>
                    </div>
                  </Dragger>
                </div>
              </div>
            </div>
          </TabPane>
          <TabPane tab={<h6 className="m-0">Bills</h6>} className="" key="2">
            <div
              className="w-100"
              style={{
                maxHeight: '80vh',
                height: '100%',
                overflow: 'scroll'
              }}
            >
              <div>
                <div className="bg-light w-100 p-3">
                  {selectedRows?.selectedRows?.length ? (
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center gap-3">
                        <Button>Link to existing Purchase Order</Button>
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
                          }}
                        >
                          <Button className="d-flex justify-content-center align-items-center p-2">
                            {' '}
                            <MoreOutlined rotate={90} className="m-0" />
                          </Button>
                        </Dropdown>
                        <span className="fs-6 text-muted">
                          {selectedRows?.selectedRows?.length} Customer(s) Selected
                        </span>
                      </div>
                      <CloseOutlined
                        onClick={() => rowSelection.onChange('', [])}
                        className="text-muted"
                      />
                    </div>
                  ) : (
                    <>
                      <span className="text-muted fw-semibold">VIEW BY:</span>
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
                            value: 'all',
                            label: 'All',
                            name: 'All Purchase Receives'
                          },
                          {
                            value: 'in_transit',
                            label: 'In Transit',
                            name: 'In Transit'
                          },
                          {
                            value: 'received',
                            label: 'Received',
                            name: 'Received'
                          }
                        ]}
                      />
                    </>
                  )}
                </div>

                <div
                  className="m-3 p-3 border border-1 "
                  style={{
                    boxShadow:
                      'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px'
                  }}
                >
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
                    dataSource={data}
                    onRow={(record) => ({
                      onClick: () =>
                        navigate(reverse(routes.purchase.bills.view, { id: record.key }))
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
              </div>
            </div>
          </TabPane>
        </Tabs>
        <div className="position-absolute" style={{ top: '10px', right: '15px' }}>
          <Button
            type="primary"
            className="fs-6 d-flex justify-content-center align-items-center fw-medium"
            onClick={() => navigate(routes.purchase.bills.new)}
          >
            + New
          </Button>
        </div>
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
  );
};

export default BillList;
