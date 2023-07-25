import { DeleteOutlined, MessageOutlined } from '@ant-design/icons'
import { Button, Divider, Form, Input, Steps } from 'antd'
import React from 'react'

const Comment = () => {
    return (
        <div className='row col-12'>
            <div className='col-6 p-4'>
                <Form>
                    <div className='border border-1 bg-white rounded-2'>
                        <Form.Item
                            name='comment'
                            className='m-0'
                        >
                            <Input.TextArea className='border-0 bg-light' style={{ minHeight: '100px' }} />
                        </Form.Item>
                        <div className='p-2'>
                            <Button>Add Comment</Button>
                        </div>
                    </div>
                </Form>
                <div className='mt-4'>
                    <strong className='fs-5 d-flex gap-2 align-items-center'>All Comment <div className='bg-primary rounded-1 d-flex justify-content-center align-items-center fs-6 text-white ' style={{ width: '25px', height: '25px' }}>2</div></strong>
                    <Divider />
                    <Steps
                        direction="vertical"
                        items={[
                            {
                                title: <div><span className='fs-6 fw-semibold'>Veeresh</span> <span className='text-muted'>•</span> <span className=' fw-medium text-muted' style={{fontSize:'12px'}}>25/07/2023 09:21 AM </span>  </div>,
                                description: <div className='bg-light p-2 rounded-1 d-flex justify-content-between align-items-center'><span className='fw-medium'>This is a description. This is a description.</span> <DeleteOutlined /></div>,
                                icon:<div className='border border-1 rounded-circle d-flex align-items-center justify-content-center p-1'><MessageOutlined  /></div>
                            },
                            {
                                title: <div><span className='fs-6 fw-semibold'>Veeresh</span> <span className='text-muted'>•</span> <span className=' fw-medium text-muted' style={{fontSize:'12px'}}>25/07/2023 09:21 AM </span>  </div>,
                                description: <div className='bg-light p-2 rounded-1 d-flex justify-content-between align-items-center'><span className='fw-medium'>This is a description. This is a description.</span> <DeleteOutlined /></div>,
                                icon:<div className='border border-1 rounded-circle d-flex align-items-center justify-content-center p-1'><MessageOutlined  /></div>
                            }
                        ]}
                    />
                </div>
            </div>

        </div>
    )
}

export default Comment