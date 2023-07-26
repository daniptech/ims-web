import { ArrowLeftOutlined, CaretDownOutlined, DeleteOutlined, DownOutlined, EditOutlined, MailOutlined, MoreOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Button, Collapse, Divider, Dropdown, Image, Table } from 'antd'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { routes } from '../../../components/controller/routes'
import { reverse } from 'named-urls'
import { Icons } from '../../../components/controller/Images'
import { faBagShopping, faFileInvoice, faImage, faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { render } from '@testing-library/react'

const BillView = () => {
    const navigate = useNavigate()
    const params = useParams()
    return (

        <div className='item-view-container w-100 bg-white'>
            <div className='w-100 border-bottom'>
                <div className='d-flex justify-content-between align-items-center p-4 px-3'>
                    <div className='d-flex  align-items-center gap-2 fs-5 '>
                        <ArrowLeftOutlined onClick={() => navigate(-1)} className='custom-back-button' />
                        <span className='fw-medium'>Bill Name </span>
                    </div>
                    <div className='d-flex justify-content-center align-items-center gap-2 '>
                        <Button className='d-flex justify-content-center align-items-center p-2 fs-5 bg-light' onClick={() => navigate(reverse(routes.purchase.bill.edit, { id: params.id }))}><EditOutlined /></Button>
                        <Dropdown
                            trigger='click'
                            menu={{
                                items: [
                                    {
                                        label: 'PDF',
                                        key: 1
                                    },
                                    {
                                        label: 'Print',
                                        key: 2
                                    }
                                ]
                            }}
                        >
                            <Button className='d-flex align-items-center'><Image src={Icons.fileIcon} alt='' width={15} preview={false} /> <span>PDF / Print</span><CaretDownOutlined /></Button>
                        </Dropdown>
                        <Button className='d-flex justify-content-center align-items-center'>Record Payment</Button>
                        <Button className='d-flex justify-content-center align-items-center gap-2'><FontAwesomeIcon icon={faPencil} /> Convert to Open</Button>
                        <Dropdown
                            trigger='click'
                            menu={{
                                items: [
                                    {
                                        label: 'Void',
                                        key: 1
                                    },
                                    {
                                        label: 'clone',
                                        key: 2
                                    },
                                    {
                                        label: 'create vendor credits',
                                        key: 3
                                    },
                                    {
                                        label: 'Delete',
                                        key: 4
                                    }
                                ]
                            }}
                        >
                            <MoreOutlined />
                        </Dropdown>
                    </div>
                </div>
            </div>
            <div className="w-100 p-4"
                style={{
                    maxHeight: '83vh',
                    height: '100%',
                    overflow: 'scroll',
                    paddingBottom: '79px'
                }}>
                <div className='p-4'>
                    <div className='border rounded-2 p-4 purchase-order-card'>
                        <div className='d-flex align-items-center gap-2 '>
                            <FontAwesomeIcon icon={faBagShopping} />
                            <span className='text-muted'>Open Purchase Orders: <span className='text-dark fw-medium'>1</span></span>
                            <span className='text-primary' style={{ cursor: 'pointer' }}>Apply Now</span>
                        </div>
                        <Divider />
                        <div className=' d-flex justify-content-between align-items-center'>
                            <div className='d-flex flex-column '>
                                <span className='fs-5 fw-medium'>Convert to Open</span>
                                <span className='text-muted'>Bill has been created. Convert the bill to the open status to record payment.</span>
                            </div>
                            <div>
                                <Button type='primary'>Convert To Open</Button>
                            </div>
                        </div>

                    </div>
                    <div className='mt-5'>
                        <div className='row col-12'>
                            <div className='col-6 d-flex flex-column gap-3'>
                                <div className='lh-lg'>
                                    <h4 className='m-0'>BILL</h4>
                                    <span>Bill#  Bill name</span>
                                <div>
                                    <span className=' p-1 rounded-1 text-white' style={{ backgroundColor: 'gray' }}>ISSUED</span>
                                </div>
                                </div>
                                <div className='row col-12'>
                                    <div className='col-3 text-muted fw-medium'>ORDER NUMBER</div>
                                    <div className='col-9'> bill-0008</div>
                                    <div className='col-3 text-muted fw-medium'>BILL DATE</div>
                                    <div className='col-9'> 2023-07-18</div>
                                    <div className='col-3 text-muted fw-medium'>DUE DATE</div>
                                    <div className='col-9'> 2023-07-18</div>
                                    <div className='col-3 text-muted fw-medium'>PAYMENT TERMS</div>
                                    <div className='col-9'> Due on Receipt</div>
                                    <div className='col-3 text-muted fw-medium'>BALANCE DUE</div>
                                    <div className='col-9'> Rs.11,212.00</div>
                                    <div className='col-3 text-muted fw-medium'>TOTAL</div>
                                    <div className='col-9'> Rs.11,212.00</div>
                                </div>

                            </div>
                            <div className='col-6 d-flex flex-column justify-content-between'>
                                <div className='d-flex flex-column gap-2'>
                                    <strong className='text-muted'>VENDOR ADDRESS</strong>
                                    <span className='text-primary'>Purchase Vender</span>
                                    <div className='d-flex flex-column'>
                                        <span>Billing address</span>
                                        <span>1st 60 Feet Rd</span>
                                        <span>Street2</span>
                                        <span>New Delhi, Delhi</span>
                                        <span>India - 110044</span>
                                        <span>8279929110</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mt-5'>
                            <Table columns={[
                                {
                                    title: 'ITEMS & DESCRIPTION', dataIndex: '', key: '',
                                    render: (text, record) => {
                                        return (
                                            <div className='w-100 '>
                                                <div className='d-flex gap-2'>
                                                    <div className='border p-1 d-flex justify-content-center align-items-center' style={{ width: '35px', height: '35px', objectFit: 'cover' }}>
                                                        {record?.img ? <Image src={record.img} alt="" preview={false} /> : <FontAwesomeIcon icon={faImage} style={{ color: "#919191", }} />}
                                                    </div>
                                                    <div className='d-flex flex-column'>
                                                        <span className='text-primary fw-medium'>
                                                            {record.item_name}
                                                        </span>
                                                        <span className='text-muted'>
                                                            [{record.sku}]
                                                        </span>
                                                        <span className='text-muted'>
                                                            {record.description}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                },
                                { title: 'ACCOUNT', dataIndex: 'account', key: 'account' },
                                { title: 'QUANTITY', dataIndex: 'quentity', key: 'quentity' },
                                { title: 'RATE	', dataIndex: 'rate', key: 'rate'},
                                { title: 'AMOUNT', dataIndex: 'amount', key: 'amount' },
                            ]}
                                dataSource={[{
                                    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH0buAM-qQKTibKB8MpUsw51lCyaWYh8dZqWtjU-tZ&s',
                                    item_name: 'demo text-black',
                                    sku: 12,
                                    rate: 11212,
                                    account: 'Finished Goods',
                                    quentity: 1,
                                    amount: 11212.00,
                                    description:'Best service'
                                }]}
                                pagination={false}
                            />

                        </div>
                        <div className='row col-12 '>
                            <div className='col-6'>
                            </div>
                            <div className='col-6 text-end d-flex flex-column gap-3'>
                                <div className='row col-12 mt-2'>
                                    <div className='col-6 d-flex flex-column'>
                                        <strong className='fs-5'>Sub Total</strong>
                                    </div>
                                    <div className='col-6'>
                                        <strong> Rs.11,212.00</strong>

                                    </div>
                                </div>
                                <div className='row col-12'>
                                    <div className='col-6 d-flex flex-column'>
                                        <strong className='fs-5 text-muted'>Discount</strong>
                                    </div>
                                    <div className='col-6 text-muted'>
                                    (-)Rs.0.00
                                    </div>
                                </div>
                                <Divider className='mb-1 mt-1' />
                                <div className='row col-12'>
                                    <div className='col-6 d-flex flex-column'>
                                        <strong className='fs-5 '>Total</strong>
                                    </div>
                                    <div className='col-6 '>
                                        <strong> Rs.11,212.00</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Divider />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BillView
