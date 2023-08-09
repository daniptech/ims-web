import { ArrowLeftOutlined, CaretDownOutlined, EditOutlined, MailOutlined, MoreOutlined } from '@ant-design/icons'
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Divider, Dropdown, Image, Table } from 'antd'
import React from 'react'
import { routes } from '../../../controller/routes'
import { useNavigate, useParams } from 'react-router-dom'
import { reverse } from 'named-urls'
import { Icons } from '../../../controller/Images'
import { faImage } from '@fortawesome/free-regular-svg-icons'

const VendorCreditView = () => {
    const navigate = useNavigate()
    const params = useParams()
    return (
        <div className='item-view-container w-100 bg-white'>
            <div className='w-100 border-bottom'>
                <div className='d-flex justify-content-between align-items-center p-4 px-3'>
                    <div className='d-flex  align-items-center gap-2 fs-5 '>
                        <ArrowLeftOutlined onClick={() => navigate(-1)} className='custom-back-button' />
                        <span className='fw-medium'>Payment Name </span>
                    </div>
                    <div className='d-flex justify-content-center align-items-center gap-2 '>
                        <Button className='d-flex justify-content-center align-items-center p-2 fs-5 bg-light' onClick={() => navigate(reverse(routes.purchase.paymentMode.edit, { id: params.id }))}><EditOutlined /></Button>
                        <Button className='d-flex justify-content-center align-items-center'><MailOutlined /> Email</Button>
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
                        <Dropdown
                            trigger='click'
                            menu={{
                                items: [
                                    {
                                        label: 'Refund',
                                        key: 1
                                    },
                                    {
                                        label: 'Delete',
                                        key: 2
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
                <div className=' w-100 pdf-box p-5 rounded-1'>
                    <div className='row col-12'>
                        <div className='col-4'>
                            <div className='d-flex flex-column text-muted'>
                                <span className='fs-5 text-dark fw-medium'>Personal</span>
                                <span>Delhi </span>
                                <span>India</span>
                            </div>

                        </div>
                        <div className='col-8 text-end text-dark fw-medium'>
                            <div className='d-flex flex-column'>
                                <span className='fs-2 mb-0 fw-semibold'>VENDOR CREDITS</span>
                                <span>CreditNote# DN-1200001</span>
                            </div>
                            <div className='d-flex flex-column mt-3'>
                                <span>Credits Remaining</span>
                                <span>Rs.11,212.00</span>
                            </div>
                        </div>
                    </div>
                    <div className='row col-12 mt-5'>
                        <div className='col-4'>
                            <div className='d-flex flex-column text-muted gap-3'>
                                <span className='fs-6 text-dark fw-medium'>Vendor Address</span>
                                <div className='d-flex flex-column'>
                                    <span className='text-primary'>Purchase  Vender</span>
                                    <span>1st 60 Feet Rd</span>
                                    <span>Street2</span>
                                    <span>New Delhi</span>
                                    <span>110044 Delhi </span>
                                    <span>India</span>
                                </div>
                            </div>

                        </div>
                        <div className='col-8 m-0 p-0 text-end text-muted fw-medium d-flex align-items-end'>
                            <div className='row col-12 m-0 p-0'>
                                <div className='col-4'></div>
                                <div className='col-4 text-end'>Date :</div>
                                <div className='col-4 text-end'>19/07/2023</div>
                                <div className='col-4'></div>
                                <div className='col-4 text-end'>Reference number :</div>
                                <div className='col-4 text-end'>ORNo-00005566</div>
                            </div>
                        </div>
                    </div>
                    <div className='mt-5'>
                        <Table
                            className='vendor-credit-table'
                            columns={[
                                { title: '#', dataIndex: 'id', key: 'id', },
                                {
                                    title: 'ITEMS & DESCRIPTION', dataIndex: '', key: '',
                                    render: (text, record) => {
                                        return (
                                            <div className='w-100 '>
                                                <div className='d-flex gap-5'>
                                                    <div className='border p-1 d-flex justify-content-center align-items-center' style={{ width: '35px', height: '35px', objectFit: 'cover' }}>
                                                        {record?.img ? <Image src={record.img} alt="" preview={false} /> : <FontAwesomeIcon icon={faImage} style={{ color: "#919191", }} />}
                                                    </div>
                                                    <div className='d-flex flex-column'>
                                                        <span className='text-primary fw-medium'>
                                                            {record.item_name}
                                                        </span>
                                                        <span className='text-muted'>
                                                            SKU:{record.sku}
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
                                {
                                    title: 'QUANTITY', dataIndex: 'quentity', key: 'quentity', className: 'text-end',
                                    render: (text, record) =>
                                        <div className='d-flex flex-column text-end'>
                                            <span>{text}</span>
                                            <span> {record.exchange_rate}</span>
                                        </div>
                                },
                                { title: 'RATE', dataIndex: 'rate', key: 'rate', className: 'text-end' },
                                { title: 'Amount', dataIndex: 'amount', key: 'amount', className: 'text-end' }
                            ]}
                            dataSource={[{
                                img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH0buAM-qQKTibKB8MpUsw51lCyaWYh8dZqWtjU-tZ&s',
                                item_name: 'Botalsss',
                                sku: 12,
                                description: 'Best service',
                                rate: 100.00,
                                receive: 1,
                                bill: 0,
                                rate: "11,212.00",
                                amount: "1,121,200.00",
                                quentity: "100.00",
                                exchange_rate: 1,
                                id: 1
                            }]}
                            pagination={false}
                        />

                    </div>
                    <div className='w-100  row col-12 m-0 p-0 mt-2'>
                        <div className='col-6'></div>
                        <div className='col-6 m-0 p-0 d-flex flex-column gap-3'>
                            <div className='row col-12 m-0 p-0'>
                                <div className='col-6 text-end'>Sub Total</div>
                                <div className='col-6 text-end'>1,121,200.00</div>
                            </div>
                            <div className='row col-12 m-0 p-0 text-dark fw-medium'>
                                <div className='col-6 text-end'>Total</div>
                                <div className='col-6 text-end'>Rs.1,121,200.00</div>
                            </div>
                            <div className='row col-12 m-0 p-0 bg-light p-2 text-dark fw-medium'>
                                <div className='col-6 text-end'>Credits Remaining</div>
                                <div className='col-6 text-end'>Rs.1,121,200.00</div>
                            </div>
                        </div>
                    </div>
                    <div className='w-100  row col-12 m-0 p-0 mt-5'>
                        <div className='col-6 d-flex flex-column gap-3'>
                            <div className='d-flex flex-column'>
                                <span className='fw-medium'>Notes</span>
                                <span className='text-muted'>new vendor form created </span>
                            </div>
                            <div className='row col-12'>
                                <div className='col-4 w-auto'>Authorized Signature</div>
                                <div className='col-8 border-bottom '></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default VendorCreditView