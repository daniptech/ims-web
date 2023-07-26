import { ArrowLeftOutlined, InfoCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { Button, Form, Input, Select, Tabs, Tooltip,Radio } from 'antd'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ContactPerson } from './Tabs/ContactPerson'
import OtherDetail from './Tabs/OtherDetails'
import Address from './Tabs/Address'
//import OtherDetail from '../Tabs/OtherDetail';
//import Address from '../Tabs/Address';

const { TabPane } = Tabs;
const CreateAndEditCustomer = () => {
    const navigate = useNavigate()
    const params = useParams()
    const [value, setValue] = React.useState(1);
  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };
    return (
        <div className='w-100'>
            <div className='w-100 bg-white p-3 border-bottom d-flex align-items-center justify-content-between '>
                <div className='d-flex align-items-center gap-4 fs-5'>
                    <ArrowLeftOutlined className='custom-back-button' onClick={() => navigate(-1)} />
                    <span className='fw-medium'>{params.id ? "Edit" : "New"} Customer</span>
                </div>
                <div className='d-flex align-items-center gap-4 fs-5'>
                    <Button onClick={() => navigate(-1)}>Cancel</Button>
                    <Button type='primary' htmlType='submit' form='conpositeForm' >Submit</Button>
                </div>
            </div>
            <div
                className='w-100 position-relative'
                style={{
                    maxHeight: '100vh',
                    height: '100%',
                    overflow: 'scroll',
                    paddingBottom: '100px'
                }}
            >
                <Form
                    layout="vertical"
                    name="conpositeForm"
                >
                    <div>
                        <div className="row col-12 p-4 m-0">
                            <div className="col-6 d-flex flex-column gap-3">
                                <div className="row col-12 d-flex  align-items-center">
                                    <div className="col-3">
                                        <label className="d-flex align-items-center gap-1">
                                            <span>Customer Type</span>{' '}
                                            <Tooltip
                                                placement="rightTop"
                                                title="Select if this item is a Physical good or a service you're offering. Also, remember that once you include this item in a transaction, you can't change its type. "
                                            >
                                                <InfoCircleOutlined className="text-muted" />
                                            </Tooltip>{' '}
                                        </label>
                                    </div>
                                    <div className="col-6">
                                        <Radio.Group onChange={onChange} value={value} className="d-flex m-0 form-item">
                                            <Radio value={1}>Business</Radio>
                                            <Radio value={2}>Individual</Radio>
                                        </Radio.Group>
                                    </div>
                                </div>
                                <div className="row col-12 d-flex  align-items-center">
                                    <div className="col-3">
                                        <label className="d-flex align-items-center gap-1">
                                            <span>Primary Contact</span>{' '}
                                            <Tooltip
                                                placement="rightTop"
                                                title="Select if this item is a Physical good or a service you're offering. Also, remember that once you include this item in a transaction, you can't change its type. "
                                            >
                                                <InfoCircleOutlined className="text-muted" />
                                            </Tooltip>{' '}
                                        </label>
                                    </div>
                                    <div className="col-9">
                                        <div className='row col-12'>
                                            <div className='col-4'>
                                                <Form.Item name="type" className="d-flex m-0 form-item">
                                                    <Select
                                                        placeholder='Salutation'
                                                        options={[
                                                            {
                                                                label: 'Mr.',
                                                                value: 'mr'
                                                            },
                                                            {
                                                                label: 'Mrs.',
                                                                value: 'mrs'
                                                            },
                                                            {
                                                                label: 'Ms.',
                                                                value: 'ms'
                                                            },
                                                            {
                                                                label: 'Miss',
                                                                value: 'miss'
                                                            },
                                                            {
                                                                label: 'Dr.',
                                                                value: 'dr'
                                                            }
                                                        ]}
                                                    />
                                                </Form.Item>
                                            </div>
                                            <div className='col-4'>
                                                <Form.Item name="fname" className="d-flex m-0 form-item ">
                                                    <Input placeholder='First Name' />
                                                </Form.Item>
                                            </div>
                                            <div className='col-4'>
                                                <Form.Item name="lname" className="d-flex m-0 form-item">
                                                    <Input placeholder='Last Name' />
                                                </Form.Item>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row col-12 d-flex  align-items-center">
                                    <div className="col-3">
                                        <label className="d-flex align-items-center gap-1">
                                            <span>Company Name</span>
                                        </label>
                                    </div>
                                    <div className="col-6">
                                        <Form.Item name="company_name" className="d-flex m-0 form-item">
                                            <Input />
                                        </Form.Item>
                                    </div>
                                </div>
                                <div className="row col-12 d-flex  align-items-center">
                                    <div className="col-3">
                                        <label className="d-flex align-items-center gap-1 text-danger">
                                            Customer Display Name *
                                            <Tooltip
                                                placement="rightTop"
                                                title="Select if this item is a Physical good or a service you're offering. Also, remember that once you include this item in a transaction, you can't change its type. "
                                            >
                                                <InfoCircleOutlined className="text-muted" />
                                            </Tooltip>{' '}
                                        </label>
                                    </div>
                                    <div className="col-6">
                                        <Form.Item name="vendor_display_name" className="d-flex m-0 form-item">
                                            <Input />
                                        </Form.Item>
                                    </div>
                                </div>
                                <div className="row col-12 d-flex  align-items-center">
                                    <div className="col-3">
                                        <label className="d-flex align-items-center gap-1">
                                            Customer Email
                                            <Tooltip
                                                placement="rightTop"
                                                title="Select if this item is a Physical good or a service you're offering. Also, remember that once you include this item in a transaction, you can't change its type. "
                                            >
                                                <InfoCircleOutlined className="text-muted" />
                                            </Tooltip>{' '}
                                        </label>
                                    </div>
                                    <div className="col-6">
                                        <Form.Item name="vendor_email" className="d-flex m-0 form-item">
                                            <Input />
                                        </Form.Item>
                                    </div>
                                </div>
                                <div className="row col-12 d-flex  align-items-center">
                                    <div className="col-3">
                                        <label className="d-flex align-items-center gap-1">
                                            Customer Phone
                                            <Tooltip
                                                placement="rightTop"
                                                title="Select if this item is a Physical good or a service you're offering. Also, remember that once you include this item in a transaction, you can't change its type. "
                                            >
                                                <InfoCircleOutlined className="text-muted" />
                                            </Tooltip>{' '}
                                        </label>
                                    </div>
                                    <div className="col-6">
                                        <div className='row col-12 m-0 p-0'>
                                            <div className='col-5 p-0 m-0'>
                                                <Form.Item name="work_Phone" className="d-flex m-0 form-item">
                                                    <Input placeholder='Work Phone' />
                                                </Form.Item>
                                            </div>
                                            <div className='col-2'></div>
                                            <div className='col-5 p-0 m-0'>
                                                <Form.Item name="mobile" className="d-flex m-0 form-item">
                                                    <Input placeholder='Mobile' />
                                                </Form.Item>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='p-4'>
                            <Tabs defaultActiveKey="1">
                                <TabPane tab='Other Details' className="" key="1">
                                    <OtherDetail />
                                </TabPane>
                                <TabPane tab='Address' className="" key="2">
                                    <Address />
                                </TabPane>
                                <TabPane tab='Contact Persons' className="" key="3">
                                <ContactPerson/>
                                </TabPane>
                                <TabPane tab='Remarks' className="" key="7">
                                   <div className="row col-12 p-4 m-0">
                                        <div className="col-6 d-flex flex-column gap-3">
                                            <div>Remarks<span className='text-muted'> (For Internal Use)</span></div>
                                            <Form.Item name='remark'>
                                                <Input.TextArea />
                                            </Form.Item>
                                        </div>
                                    </div>
                                </TabPane>
                            </Tabs>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
}
export default CreateAndEditCustomer