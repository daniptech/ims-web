import { DownOutlined, MailOutlined } from '@ant-design/icons'
import { Avatar, Button, Dropdown } from 'antd'
import React from 'react'

const Mail = () => {
    return (
        <div className=' border border-1 rounded-2'>
            <div className='bg-light p-2 d-flex justify-content-between'>
                <span className='fs-5 fw-medium'>System Mails</span>
                <Dropdown
                    trigger='click'
                    menu={{
                        items: [
                            {
                                label: "Outlook",
                                key: 1
                            },
                            {
                                label: 'Zoho Mail',
                                key: 2
                            },
                            {
                                label: 'Link with work account',
                                key: 3
                            }
                        ]
                    }}
                >
                    <span className='d-flex align-items-center gap-1 fw-medium'><MailOutlined className='text-primary' />connect your mail account<DownOutlined className='text-primary' /></span>
                </Dropdown>
            </div>
            <div>
                <div className='p-3 d-flex justify-content-between'>
                    <div className=' d-flex gap-2'>
                        <Avatar
                        className='bg-gray text-muted'
                            style={{
                                verticalAlign: 'middle',
                            }}
                            size="default"
                        >
                            D
                        </Avatar>
                       <div className='d-flex flex-column'>
                       <span>To <span className='fw-medium'>demo1@yopmail.com</span></span>
                       <span>Sales Order Notification - Sales Order from Personal (Sales Order #: SO-00003)</span>
                       </div>
                    </div>
                    <span className='text-muted'>06/07/2023 01:56 PM</span>

                </div>
            </div>

        </div>
    )
}

export default Mail
