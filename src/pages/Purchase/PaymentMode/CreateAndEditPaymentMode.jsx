import { ArrowLeftOutlined, DownOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Dropdown, Tabs } from 'antd'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Icons } from '../../../controller/Images'
import { routes } from '../../../controller/routes'
import { reverse } from 'named-urls'
import PaymentModeTab from '../Tabs/PaymentModeTab'

const CreateAndEditPaymentMode = () => {
    const params = useParams()
    const { TabPane } = Tabs;
    const navigate = useNavigate()
    const [tab, setTab] = useState("bill_payment")
    const moreItems = [
        {
            key: '1',
            label: "Clone Item",
        },
        {
            key: '2',
            label: "Mark as Inactive",
        },
        {
            key: '3',
            label: "Delete",
        },
        {
            key: '4',
            label: "Add to group",
        }
    ];

    return (
        <div className='item-view-container w-100 bg-white'>
            <div className='d-flex justify-content-between align-items-center pt-4 px-3'>
                <div className='d-flex  align-items-center gap-2 fs-5 '>
                    <ArrowLeftOutlined onClick={() => navigate(-1)} className='custom-back-button' />
                    <span className="fw-medium">{params.id ? 'Edit' : 'New'} Payment</span>
                </div>
                <div className="d-flex align-items-center gap-4 fs-5">
                    <Button onClick={() => navigate(-1)}>Cancel</Button>
                    <Button type="primary" htmlType="submit" form="conpositeForm">
                        Submit
                    </Button>
                </div>
            </div>
            <Tabs defaultActiveKey="1" className="item-view-tabs" value={tab} onChange={(val) => setTab(val)} >
                <TabPane tab={<h6 className='m-0'>Bill Payment</h6>} className="" key="bill_payment">
                    <div className="w-100"
                        style={{
                            maxHeight: '70vh',
                            height: '100%',
                            overflow: 'scroll',
                            paddingBottom: '79px'
                        }}>
                        <PaymentModeTab tab={tab} />
                    </div>
                </TabPane>
                <TabPane tab={<h6 className='m-0'>Vendor Advance</h6>} className="" key="vendor_advance">
                    <div className="w-100"
                        style={{
                            maxHeight: '70vh',
                            height: '100%',
                            overflow: 'scroll',
                            paddingBottom: '79px'
                        }}>
                        <PaymentModeTab tab={tab} />
                    </div>

                </TabPane>
            </Tabs>

        </div>
    )
}

export default CreateAndEditPaymentMode
