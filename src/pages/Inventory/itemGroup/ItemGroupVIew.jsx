import { ArrowLeftOutlined, DownOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Dropdown, Image, Table } from 'antd'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { routes } from '../../../components/controller/routes'
import { reverse } from 'named-urls'
import { Icons } from '../../../components/controller/Images'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'

const ItemGroupVIew = () => {
    const navigate = useNavigate()
    const params = useParams()
    const moreItems = [
        {
            key: '1',
            label: "Mark as Inactive",
        },
        {
            key: '2',
            label: "Delete",
        },
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'item_name',
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
                            </div>
                        </div>
                    </div>
                )
            }
        },
        {
            title: 'COST PRICE',
            dataIndex: 'cost_price',
            width: 200
        },
        {
            title: 'SELLING PRICE',
            dataIndex: 'selling_price',
            width: 200
        },
        {
            title: 'STOCK ON HAND',
            dataIndex: 'stock_on_hand',
            width: 200
        },
        {
            title: 'REORDER POINT',
            dataIndex: 'reorder_point',
            width: 200
        }
    ]
    const data = [
        {
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH0buAM-qQKTibKB8MpUsw51lCyaWYh8dZqWtjU-tZ&s',
            item_name: 'demo text-black',
            cost_price: 800,
            selling_price: 1212,
            stock_on_hand: 100,
            reorder_point: 10,
            sku: 12
        }
    ]
    return (
        <div className='item-view-container w-100 bg-white'>

            <div className='w-100 border-bottom'>
                <div className='d-flex justify-content-between align-items-center p-4 px-3'>
                    <div className='d-flex  align-items-center gap-2 fs-5 '>
                        <ArrowLeftOutlined onClick={() => navigate(-1)} className='custom-back-button' />
                        <span className='fw-medium'>Burger </span><span className='fs-6' >(1 Item's)</span>
                    </div>
                    <div className='d-flex justify-content-center align-items-center gap-2 '>
                        <Button className='d-flex justify-content-center align-items-center p-2 fs-5 bg-light' onClick={() => navigate(reverse(routes.inventory.itemGroups.edit, { id: params.id }))}><EditOutlined /></Button>
                        <Button type='primary' >Add Items</Button>
                        <Dropdown
                            menu={{
                                items: moreItems,
                            }}
                            placement="bottomRight"
                            arrow={{
                                pointAtCenter: true,
                            }}
                            trigger='click'
                        >
                            <Button  className='d-flex justify-content-center align-items-center bg-light' >More <DownOutlined /></Button>
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
                <div className='w-100 d-flex flex-column gap-2 fs-6'>
                    <div className='row col-12 lh-lg'>
                        <div className='col-md-6 col-lg-6 '>
                            <div className='row col-12'>
                                <div className='col-4 text-muted fw-medium text-capitalize'>
                                    Unit
                                </div>
                                <div className='col-2 text-muted fw-medium '>
                                    :
                                </div>
                                <div className='col-4'>
                                    ad
                                </div>
                            </div>

                        </div>
                        <div className='col-md-6 col-lg-6 '>
                            <div className='row col-12'>
                                <div className='col-4 text-muted fw-medium text-capitalize '>
                                    Manufacturer
                                </div>
                                <div className='col-2 text-muted fw-medium '>
                                    :
                                </div>
                                <div className='col-4'>
                                    burger
                                </div>

                            </div>
                        </div>
                        <div className='row col-12'>
                            <div className='col-md-6 col-lg-6 '>
                                <div className='row col-12'>
                                    <div className='col-4 text-muted fw-medium text-capitalize '>
                                        Brand
                                    </div>
                                    <div className='col-2 text-muted fw-medium '>
                                        :
                                    </div>
                                    <div className='col-4'>
                                        branded
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className='row col-12'>
                            <div className='col-md-6 col-lg-6 d-flex'>
                                <div className='row col-12'>
                                    <div className='col-4 text-muted fw-medium text-capitalize '>
                                        color
                                    </div>
                                    <div className='col-2 text-muted fw-medium '>
                                        :
                                    </div>
                                    <div className='col-4'>
                                        <span className='bg-info rounded-1 p-1 text-white fw-medium' style={{ fontSize: '14px' }} >
                                            black
                                        </span>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className='row col-12'>
                            <div className='col-md-6 col-lg-6 d-flex flex-column gap-2'>
                                <div className='text-muted fw-medium text-capitalize'>Description :</div>
                                <div>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='mt-5'>
                    <Table
                        dataSource={data}
                        columns={columns}
                    />
                </div>
            </div>
        </div>
    )
}

export default ItemGroupVIew
