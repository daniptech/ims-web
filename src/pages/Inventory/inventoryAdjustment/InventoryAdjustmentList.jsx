import { BarChartOutlined, CaretDownOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Dropdown, Select, Table } from 'antd';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../components/controller/routes';
import { click } from '@testing-library/user-event/dist/click';
import { reverse } from 'named-urls';

const InventoryAdjustmentList = () => {
    const navigate=useNavigate()
    const [currentPage, setCurrentPage] = useState(1);
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
    };
    const columns = [
        {
            title: 'DATE',
            dataIndex: 'date',
        },
        {
            title: 'REASON',
            dataIndex: 'reason',
        },
        {
            title: 'DESCRIPTION',
            dataIndex: 'description',
        },
        {
            title: 'STATUS',
            dataIndex: 'status',
        },
        {
            title: 'REFERENCE NUMBER',
            dataIndex: 'reference_number',
        },
        {
            title: 'TYPE',
            dataIndex: 'type',
        },
        {
            title: 'CREATED BY',
            dataIndex: 'created_by',
        },
        {
            title: 'CREATED TIME',
            dataIndex: 'created_time',
        },
        {
            title: 'LAST MODIFIED BY',
            dataIndex: 'last_modified_by',
        },
        {
            title: 'LAST MODIFIED TIME',
            dataIndex: 'last_modified_time',
        },
    ];

    const handleChangePage = (page) => {
        setCurrentPage(page);
    };
    
    return (
        <div className="w-100 h-100">
            <div className="w-100 p-3 d-flex justify-content-between align-items-center">

                <span className='fs-4 fw-medium'>Inventory Adjustments</span>
                <Button
                    type="primary"
                    className="fs-6 d-flex justify-content-center align-items-center fw-medium"
                    onClick={()=>navigate(routes.inventory.inventoryAdjustments.new)}
                >
                    + New
                </Button>
            </div>
            <div className='w-100 bg-light p-3 d-flex justify-content-between align-items-center'>
                {selectedRows?.selectedRows?.length ?
                    <>
                        <div className='d-flex gap-2 align-items-center'>
                            <Button>Delete</Button>
                            <span className='text-muted fs-6'>{selectedRows?.selectedRows?.length} Inventory Adjustments Selected</span>
                        </div>
                        <CloseOutlined onClick={() => rowSelection.onChange("", [])} className='text-muted' />
                    </>
                    :
                    <>
                        <div className='d-flex gap-2 align-items-center'>
                            <span>Filter By : </span>
                            <Dropdown
                                menu={{
                                    items: [
                                        {
                                            key:1,
                                            label:'All'
                                        },
                                        {
                                            key:2,
                                            label:'By Quentity'
                                        },
                                        {
                                            key:3,
                                            label:'By Value'
                                        }
                                    ]
                                }}
                                placement="bottom"
                            >
                                <Button className='d-flex align-items-center justify-content-center'> Type: Sales Order <CaretDownOutlined /></Button>
                            </Dropdown>
                            <Dropdown
                                menu={{
                                    items: [
                                        {
                                            key:1,
                                            label:'All'
                                        },
                                        {
                                            key:2,
                                            label:'Today'
                                        },
                                        {
                                            key:3,
                                            label:'This Week'
                                        },
                                        {
                                            key:4,
                                            label:'This Month'
                                        },
                                        {
                                            key:5,
                                            label:'This Quarter'
                                        },
                                        {
                                            key:6,
                                            label:'This Year'
                                        }
                                    ],
                                }}
                                placement="bottom"
                            >
                                <Button className='d-flex align-items-center justify-content-center'>Period:  Sales Order <CaretDownOutlined /></Button>
                            </Dropdown>
                        </div>
                        <div className='text-primary d-flex align-items-center gap-2' style={{ cursor: 'pointer' }}>
                            <BarChartOutlined />
                            <span> FIFO Cost Lot Tracking Report</span>
                        </div>
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
                    className='price_list_Tale'
                    columns={columns}
                    dataSource={[{
                        key:1,
                        date: '03/07/2023',
                        reason: 'Stolen goods',
                        description: 'Best Qualtity',
                        reference_number: 'Test',
                        type: 'Quentity',
                        created_by: 'demo',
                        created_time: '03/07/2023 10:44 AM',
                        last_modified_by: 'demo',
                        last_modified_time: '03/07/2023 10:44 AM'
                    }]}
                    onRow={(record)=>({
                        onClick:()=>navigate(reverse(routes.inventory.inventoryAdjustments.view,{
                            id:record.key
                        }))
                    })}
                    pagination={{
                        current: currentPage,
                        pageSize: 6,
                        onChange: handleChangePage
                    }}
                />
            </div>
        </div>
    )
}

export default InventoryAdjustmentList