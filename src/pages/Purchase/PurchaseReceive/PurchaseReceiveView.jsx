import { ArrowLeftOutlined, CaretDownOutlined, DeleteOutlined, DownOutlined, EditOutlined, MailOutlined, MoreOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Button, Collapse, Divider, Dropdown, Image, Table } from 'antd'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { routes } from '../../../controller/routes'
import { reverse } from 'named-urls'
import { Icons } from '../../../controller/Images'
import { faFileInvoice, faImage, faTruck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { render } from '@testing-library/react'

const PurchaseReceiveView = () => {
    const navigate = useNavigate()
    const params = useParams()
    return (

        <div className='item-view-container w-100 bg-white'>
            <div className='w-100 border-bottom'>
                <div className='d-flex justify-content-between align-items-center p-4 px-3'>
                    <div className='d-flex  align-items-center gap-2 fs-5 '>
                        <ArrowLeftOutlined onClick={() => navigate(-1)} className='custom-back-button' />
                        <span className='fw-medium'>Adjustment Details </span>
                    </div>
                    <div className='d-flex justify-content-center align-items-center gap-2 '>
                        <Button className='d-flex justify-content-center align-items-center p-2 fs-5 bg-light' onClick={() => navigate(reverse(routes.purchase.purchaseReceives.edit, { id: params.id }))}><EditOutlined /></Button>
                        <Button className='d-flex justify-content-center align-items-center'><DeleteOutlined />Delete</Button>
                        <Button className='d-flex justify-content-center align-items-center gap-2'><FontAwesomeIcon icon={faTruck} />Mark as In Transit</Button>
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
                    <div className=''>
                        <div className='row col-12'>
                            <div className='col-6 d-flex flex-column gap-3'>
                                <div>
                                    <h4 className='m-0'>PURCHASE RECEIVE</h4>
                                    <span>Receive# 23232</span>
                                </div>
                                <div className='row col-12 lh-lg'>
                                    <div className='col-4 text-muted fw-medium'>PURCHASE ORDER#</div>
                                    <div className='col-8'> 124214</div>
                                    <div className='col-4 text-muted fw-medium'>DATE</div>
                                    <div className='col-8'> 25/07/2023</div>
                                    <div className='col-4 text-muted fw-medium'>STATUS</div>
                                    <div className='col-8'> <span className='bg-success bg-opacity-75 p-1 rounded-2'>RECEIVED</span></div>
                                </div>

                            </div>
                        </div>
                        <div className='mt-5'>
                            <Table columns={[
                                { title: '#', dataIndex: 'id', key: 'id'},
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
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                },
                                { title: 'QUANTITY', dataIndex: 'quentity', key: 'quentity',render:(text)=><span>{text} g</span>},
                            ]}
                                dataSource={[{
                                    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH0buAM-qQKTibKB8MpUsw51lCyaWYh8dZqWtjU-tZ&s',
                                    item_name: 'demo text-black',
                                    sku: 12,
                                    rate: 100.00,
                                    receive: 1,
                                    bill: 0,
                                    amount: 100,
                                    id:1
                                }]}
                                pagination={false}
                            />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PurchaseReceiveView
