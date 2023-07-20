import { ArrowLeftOutlined, DownOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Dropdown, Image } from 'antd'
import { reverse } from 'named-urls'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { routes } from '../../../components/controller/routes'
import { Icons } from '../../../components/controller/Images'

const InventoryAdjustmentView = () => {
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
                        <Button className='d-flex justify-content-center align-items-center p-2 fs-5 bg-light' onClick={() => navigate(reverse(routes.inventory.inventoryAdjustments.edit, { id: params.id }))}><EditOutlined /></Button>
                        <Dropdown
                        menu={{
                            items:[]
                        }}
                        >
                        <Button className='d-flex align-items-center'><Image src={Icons.fileIcon} alt='' width={15} preview={false} /> <span>PDF / Print</span></Button>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InventoryAdjustmentView