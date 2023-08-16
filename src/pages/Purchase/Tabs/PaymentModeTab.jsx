import {
    SettingOutlined,
    UploadOutlined
} from '@ant-design/icons';
import { Button, Form, Input, Select, DatePicker, Upload, message, Divider, Checkbox } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
const PaymentModeTab = ({tab}) => {
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];
    const uploadFile = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text'
        },
        beforeUpload: (file) => {
            const isFileTypeValid = file.type === 'image/jpeg' || file.type === 'image/png'; // Add the desired file types here
            const isSizeValid = file.size / 1024 / 1024 <= 5; // Maximum file size of 5MB
            if (!isFileTypeValid) {
                message.error('You can only upload JPEG or PNG files!');
            }
            if (!isSizeValid) {
                message.error('File size must be less than or equal to 5MB!');
            }
            return isFileTypeValid && isSizeValid;
        },
        onChange({ file, fileList }) {
            if (file.status !== 'uploading') {
                console.log(file, fileList);
            }
        }
    };
    return (
        <Form layout="vertical" name="conpositeForm">
            <div>
                <div className="w-100 row col-12 bg-light p-4 m-0">
                    <div className='col-6'>
                        <div className="row col-12 d-flex ">
                            <div className="col-3">
                                <label className="d-flex gap-1 text-danger">
                                    <span>Vendor Name *</span>{' '}
                                </label>
                            </div>
                            <div className="col-9">
                                <Form.Item name='vendor_name' className='mb-1'>
                                    <Select
                                        className='w-100'
                                        placeholder="Select or add customer"
                                        options={[]}
                                    />
                                </Form.Item>
                                <span className='text-primary' style={{ cursor: 'pointer' }}>View vendor Detail</span>
                            </div>
                        </div>
                    </div>
                </div>
                <Divider/>
                <div className="row col-12 p-4 m-0">
                    <div className="col-6 d-flex flex-column gap-3">

                        <div className="row col-12 d-flex  align-items-center">
                            <div className="col-3">
                                <label className="d-flex align-items-center gap-1 text-danger">
                                    <span>Payment # *</span>
                                </label>
                            </div>
                            <div className="col-6">
                                <Form.Item name="company_name" className="d-flex m-0 form-item">
                                    <Input placeholder="SO-00004" suffix={<SettingOutlined />} />
                                </Form.Item>
                            </div>
                        </div>
                        <div className="row col-12 d-flex ">
                            <div className="col-3">
                                <label className="d-flex align-items-center gap-1 text-danger">
                                    <span>Payment Mode*</span>
                                </label>
                            </div>
                            <div className="col-6">
                                <Form.Item name="payment_mode" className="d-flex m-0 form-item mb-1">
                                    <Input addonBefore={"INR"} />
                                </Form.Item>
                                <Checkbox>Pay full amount (Rs.100.00)</Checkbox>
                            </div>
                        </div>
                        <div className="row col-12 d-flex  align-items-center">
                            <div className="col-3">
                                <label className="d-flex align-items-center gap-1">
                                    <span>Payment Date</span>
                                </label>
                            </div>
                            <div className="col-6">
                                <Form.Item name="payment_date" className="d-flex m-0 form-item">
                                    <DatePicker
                                        className='w-100'
                                        defaultValue={dayjs('25/07/2023', dateFormatList[0])}
                                        format={dateFormatList}
                                    />
                                </Form.Item>
                            </div>
                        </div>
                        <div className="row col-12 d-flex  align-items-center">
                            <div className="col-3">
                                <label className="d-flex align-items-center gap-1">
                                    <span>Payment Mode</span>
                                </label>
                            </div>
                            <div className="col-6">
                                <Form.Item name="payment_date" className="d-flex m-0 form-item">
                                    <Select options={[]} />
                                </Form.Item>
                            </div>
                        </div>
                        <div className="row col-12 d-flex  align-items-center">
                            <div className="col-3">
                                <label className="d-flex align-items-center gap-1 text-danger">
                                    <span>Paid Through*</span>
                                </label>
                            </div>
                            <div className="col-6">
                                <Form.Item name="payment_date" className="d-flex m-0 form-item">
                                    <Select options={[]} />
                                </Form.Item>
                            </div>
                        </div>
                        <div className="row col-12 d-flex  align-items-center">
                            <div className="col-3">
                                <label className="d-flex align-items-center gap-1">
                                    <span>Reference# </span>
                                </label>
                            </div>
                            <div className="col-6">
                                <Form.Item name="company_name" className="d-flex m-0 form-item">
                                    <Input />
                                </Form.Item>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='p-4 w-100'>
                    {tab==='bill_payment'&&
                    <div style={{ width: '80%' }} className='mb-2'>
                    <table className='w-100 custom-table-create'>
                        <thead className='w-100'>
                            <tr className='border-bottom border-top'>
                                <th style={{ width: '15%' }} className='' >Date</th>
                                <th style={{ width: '15%' }} className=' ' >Bill#</th>
                                <th style={{ width: '15%' }} className=' ' >Purchase Orders</th>
                                <th style={{ width: '15%' }} className=' ' >Bill Amount</th>
                                <th style={{ width: '15%' }} className=' '>Amount Due</th>
                                <th style={{ width: '15%' }} className=''>Payment</th>
                            </tr>
                        </thead>
                        <tbody className='w-100'>
                            <tr className='border-bottom'>
                                <td style={{ width: '15%' }} className='' ><div className='d-flex flex-column'>
                                    <span>23/07/2023</span>
                                    <span style={{ fontSize: '12px' }}>Due Date: 07/08/2023</span>
                                </div></td>
                                <td style={{ width: '15%' }} className='' >2434343</td>
                                <td style={{ width: '15%' }} className='' >2434343</td>
                                <td style={{ width: '15%' }} className='' >100</td>
                                <td style={{ width: '15%' }} className='' >100</td>
                                <td style={{ width: '15%' }} className='text-end' ><Input className='input-field' placeholder='0.00' /></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='d-flex w-100 justify-content-end'>
                        <div className='d-flex gap-5'>
                            <span>Total:</span>
                            <span>100.00</span>
                        </div>
                    </div>
                    <div className='d-flex mt-4 w-100 justify-content-end'>
                        <div className='payment-mode-box rounded-1 p-2'>
                            <div className='row col-12 lh-lg'>
                                <div className='col-8 text-end'>Amount Paid:</div>
                                <div className='col-4 text-end'>0.00</div>
                                <div className='col-8 text-end'>Amount used for Payments:</div>
                                <div className='col-4 text-end'>100.00</div>
                                <div className='col-8 text-end'>Amount Refunded:</div>
                                <div className='col-4 text-end'>0.00</div>
                                <div className='col-8 text-end'>Amount in Excess:</div>
                                <div className='col-4 text-end'>Rs. -100.00</div>
                            </div>
                        </div>
                    </div>
                </div>
                    }
                    <div style={{ width: '80%' }}>
                        <span>Notes (Internal use. Not visible to vendor)</span>
                        <Input.TextArea style={{ minHeight: '70px' }} />

                    </div>
                    <div className='row col-12 mt-4'>
                        <div className='col-4'>
                            <div className='d-flex flex-column'>
                                <span>Attach File(s) to inventory adjustment</span>
                                <span style={{ fontSize: '12px' }}>You can upload a maximum of 5 files, 5MB each</span>
                            </div>
                            <Form.Item name='inventory_file'>
                                <Upload {...uploadFile} multiple maxCount={5}>
                                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                </Upload>
                            </Form.Item>
                        </div>
                    </div>
                </div>

            </div>
        </Form>
    )
}

export default PaymentModeTab