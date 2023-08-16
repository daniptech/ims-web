import { CaretDownOutlined, CloseOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Dropdown, Input, Select, Space, Table } from 'antd';
import { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useNavigate } from 'react-router-dom';
import { reverse } from 'named-urls';
import { routes } from '../../../controller/routes';
import CustomizeTableColumns from '../../../components/modals/CustomizeTableColumns';

const VendorCreditList = () => {
    const navigate = useNavigate()
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [customizeColoumn, setCustomizeColoumn] = useState(false);
    // const [openNewItem, setOpenNewItem] = useState(false);
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
            title: 'DATE',
            dataIndex: 'date',
            key: 'date',
            ...getColumnSearchProps('date'),
            sorter: (a, b) => a.date.length - b.date.length,
            isVisible: true,
            lock: true,
        },
        {
            id: 2,
            title: 'CREDIT NOTE#',
            dataIndex: 'credit_note',
            key: 'credit_note',
            ...getColumnSearchProps('credit_note'),
            sorter: (a, b) => a.credit_note.length - b.credit_note.length,
            isVisible: true,
            lock: true
        },
        {
            id: 3,
            title: 'REFERENCE NUMBER#',
            dataIndex: 'reference_number',
            key: 'reference_number',
            ...getColumnSearchProps('reference_number'),
            sorter: (a, b) => a.reference_number.length - b.reference_number.length,
            isVisible: true,
            lock: false
        },
        {
            id: 4,
            title: 'VENDOR NAME',
            dataIndex: 'vendor_name',
            key: 'vendor_name',
            ...getColumnSearchProps('vendor_name'),
            sorter: (a, b) => a.vendor_name.length - b.vendor_name.length,
            isVisible: true,
            lock: true
        },
        {
            id: 5,
            title: 'STATUS',
            dataIndex: 'status',
            key: 'status',
            isVisible: true,
            lock: true

        },
        {
            id: 6,
            title: 'AMOUNT',
            dataIndex: 'amount',
            key: 'amount',
            render: (text) => <span>Rs.{text}</span>,
            sorter: (a, b) => a.amount.length - b.amount.length,
            isVisible: true,
            lock: true
        },
        {
            id: 7,
            title: 'BALANCE',
            dataIndex: 'balance',
            key: 'balance',
            render: (text) => <span>Rs.{text}</span>,
            sorter: (a, b) => a.balance.length - b.balance.length,
            isVisible: true,
            lock: false
        }
    ]);


    const data = [
        {
            key: '1',
            date: '20-04-2024',
            reference_number: 'OR-00096',
            vendor_name: 'Purchase Vender',
            amount: '2,000.00',
            status: 'DRAFT',
            credit_note:'DN-1200001',
            balance:'11,212.00'




        }
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
                        <div className='d-flex gap-2 align-items-center'>
                            <Dropdown
                                trigger='click'
                                menu={{
                                    items: [
                                        {
                                            label: 'Bulk update',
                                            key: 1
                                        },
                                        {
                                            label: 'MArk as Issued',
                                            key: 2
                                        },
                                        {
                                            label: 'Bulk Cencle Items',
                                            key: 3
                                        },
                                        {
                                            label: 'Bulk reopen  Canceled items',
                                            key: 4
                                        },
                                        {
                                            label: 'Convert to Bill',
                                            key: 5
                                        },
                                    ]
                                }}
                            >
                                <Button className='d-flex justify-content-center align-items-center p-2'> Bulk Action <CaretDownOutlined /></Button>
                            </Dropdown>
                            <Button className='d-flex justify-content-center align-items-center'><DeleteOutlined /></Button>
                            <span className='fs-6 text-muted'>{selectedRows?.selectedRows?.length}  Purchase Order Selected</span>
                        </div>
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
                                    value: 'all_vendor_credit',
                                    label: 'All',
                                    name: "All Vendor Credits "
                                },
                                {
                                    value: 'draft_vendor_credit',
                                    label: 'Draft',
                                    name: 'Draft Vendor Credits'
                                },
                                {
                                    value: 'pending_approval_vendor_credit',
                                    label: 'Pending Approval',
                                    name: 'Pending Approval Vendor Credits'
                                },
                                {
                                    value: 'open_vendor_credit',
                                    label: 'Open',
                                    name: 'Open Vendor Credits'
                                },
                                {
                                    value: 'closed_vendor_credit',
                                    label: 'Closed',
                                    name: 'Closed Vendor Credits'
                                },
                                {
                                    value: 'void_vendor_credit',
                                    label: 'Void',
                                    name: 'Void Vendor Credits'
                                },
                            ]}
                        />
                        <Button
                            type="primary"
                            className="fs-6 d-flex justify-content-center align-items-center fw-medium"
                            onClick={() => navigate(routes.purchase.vendorCredit.new)}
                        >
                            + New
                        </Button>
                    </>
                }
            </div>
            <div
                className="m-3 p-3 border border-1 "
                style={{
                    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px'
                }}
            >
                {!selectedRows?.selectedRows?.length && <div className="w-100 d-flex justify-content-end align-items-end p-3 mb-3">
                    <Button type="primary" onClick={() => setCustomizeColoumn(true)}>
                        Customize Columns
                    </Button>
                </div>}
                <Table
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,
                    }}
                    columns={columns.filter((val) => val.isVisible)}
                    dataSource={data}
                    onRow={(record) => ({
                        onClick: () => navigate(reverse(routes.purchase.vendorCredit.view, { id: record.key })),
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
    );
};

export default VendorCreditList;
