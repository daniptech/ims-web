import React from 'react'
import Sidebar from '../components/Sidebar'
import NavBar from '../components/NavBar'
import { Card, Progress, Table, Tabs, Tooltip } from 'antd'
import { CheckCircleOutlined, InboxOutlined } from '@ant-design/icons'
import { faEllipsis, faFileLines } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const { TabPane } = Tabs;

const Home = () => {

    return (
        <div className='dashboard-home'>
            <div className='d-flex w-100'>
                <Sidebar />
                <div className='w-100' style={{ maxHeight: '100vh', height: '100%', overflow: 'hidden' }}>
                    <NavBar />
                    <Tabs defaultActiveKey="1" className='w-100 dashboard-tab' >
                        <TabPane tab={<h5>Dashboard</h5>} className='w-100 dashboard-item m-0' key='1'>
                            <div className='w-100' style={{ maxHeight: '100vh', height: '100%', overflow: 'scroll' }} >
                                <div className='row col-12 w-100 dashboard-section m-0'>
                                    <div className='col-md-12 col-sm-12 col-lg-8 sales-activity d-flex flex-column gap-3 p-4'>
                                        <span className='fs-5 fw-medium text-muted'>Sales Activity</span>
                                        <div className='d-flex gap-3 flex-wrap justify-content-around'>
                                            <div className='sales-activity-card d-flex flex-column justify-content-center align-items-center p-3'>
                                                <Tooltip placement="top" title='0.00'> <h3 className='m-0 text-primary'>0</h3></Tooltip>
                                                <span className='text-muted fw-medium'>Qty</span>
                                                <p className='m-0 d-flex justify-content-center align-items-center gap-2 mt-3' style={{ color: '#495569' }}><CheckCircleOutlined /><span> TO BE PACKED</span></p>
                                            </div>

                                            <div className='sales-activity-card d-flex flex-column justify-content-center align-items-center p-3'>

                                                <Tooltip placement="top" title='0.00'>
                                                    <h3 className='m-0 text-danger'>0</h3>
                                                </Tooltip>
                                                <span className='text-muted fw-medium'>Qty</span>
                                                <p className='m-0 d-flex justify-content-center align-items-center gap-2 mt-3' style={{ color: '#495569' }}>
                                                    <InboxOutlined />
                                                    <span> TO BE SHIPPED</span>
                                                </p>
                                            </div>

                                            <div className='sales-activity-card d-flex flex-column justify-content-center align-items-center p-3'>
                                                <Tooltip placement="top" title='0.00'>
                                                    <h3 className='m-0 text-success'>0</h3>
                                                </Tooltip>
                                                <span className='text-muted fw-medium'>Qty</span>
                                                <p className='m-0 d-flex justify-content-center align-items-center gap-2 mt-3' style={{ color: '#495569' }}><FontAwesomeIcon icon={faEllipsis} /><span> TO BE DELIVERED</span></p>
                                            </div>

                                            <div className='sales-activity-card d-flex flex-column justify-content-center align-items-center p-3'>
                                                <Tooltip placement="top" title='0.00'><h3 className='m-0 text-warning'>0</h3></Tooltip>
                                                <span className='text-muted fw-medium'>Qty</span>
                                                <p className='m-0 d-flex justify-content-center align-items-center gap-2 mt-3' style={{ color: '#495569' }}><FontAwesomeIcon icon={faFileLines} /><span> TO BE INVOICED</span></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-md-12 col-sm-12 col-lg-4 d-flex flex-column gap-3 p-4 inventory-summary'>
                                        <span className='fs-5 fw-medium text-muted'>Sales Activity</span>
                                        <div className='inventory-summary-card row col-12 justify-content-center align-items-center p-2'>
                                            <div className='col-10'>
                                                <span className='text-muted'>QUANTITY IN HAND</span>
                                            </div>
                                            <div className='col-2 border-start'>
                                                <Tooltip placement="top" title='0.00'><h3 className='m-0'>0</h3></Tooltip>
                                            </div>
                                        </div>
                                        <div className='inventory-summary-card row col-12 justify-content-center align-items-center p-2'>
                                            <div className='col-10'>
                                                <span className='text-muted'>QUANTITY TO BE RECEIVED</span>
                                            </div>
                                            <div className='col-2 border-start'>
                                                <Tooltip placement="top" title='0.00'><h3 className='m-0'>0</h3></Tooltip>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-100 p-4'>
                                    <div className='row col-12'>
                                        <div className='col-md-6 col-lg-6'>
                                            <div className='w-100 product-detail-box p-2'>
                                                <div className='border-bottom'>
                                                    <label className='mb-1 px-3 fw-semibold'>PRODUCT DETAILS</label>
                                                </div>
                                                <div className='row col-12'>
                                                    <div className='col-7 p-3'>
                                                        <div className='d-flex flex-column gap-3 px-3'>
                                                            <div className='d-flex justify-content-between text-danger fs-5 fw-normal'>
                                                                <span>Low Stock Items</span>
                                                                <span>0</span>
                                                            </div>
                                                            <div className='d-flex justify-content-between text-muted fs-5 fw-normal'>
                                                                <span>All Item Groups</span>
                                                                <span className='text-black'>0</span>
                                                            </div>
                                                            <div className='d-flex justify-content-between text-muted fs-5 fw-normal'>
                                                                <span>All Items</span>
                                                                <span className='text-black'>0</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-5 p-3 d-flex flex-column justify-content-center align-items-center gap-3'>
                                                        <div className='text-muted fs-6' style={{ fontWeight: 500 }}>
                                                            Active Items
                                                        </div>
                                                        <Tooltip placement="top" title={<div>jb</div>}><Progress type="circle" percent={100} strokeWidth={20} status='active' size={100} /></Tooltip>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-md-6 col-lg-6'>
                                            ad
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default Home