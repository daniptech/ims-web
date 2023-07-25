import { Divider, Form, Input, Select } from 'antd'
import React from 'react'

const BankDetails = () => {
    return (
        <div className='w-100'>
            {/* <div className=' w-100 d-flex justify-content-center mt-4'>
                <div className='d-flex flex-column align-items-center justify-content-center'>
                    <span>Add your vendor's bank details and make payments.</span>
                    <span className='text-primary' style={{cursor:'pointer'}}>+ Add Bank Account</span>
                </div>
            </div> */}
            <div className="row col-12 p-4 m-0">
                <div className="col-6 d-flex flex-column gap-3">
                    {/* <span className='text-muted fw-medium'>BANK 1</span> */}
                    <div className="row col-12 d-flex  align-items-center">
                        <div className="col-3">
                            <label className="d-flex align-items-center gap-1">
                                <span>Beneficiary Name </span>
                            </label>
                        </div>
                        <div className="col-7">
                            <Form.Item name="beneficiary_name" className="d-flex m-0 form-item">
                                <Input />
                            </Form.Item>
                        </div>
                    </div>
                    <div className="row col-12 d-flex  align-items-center">
                        <div className="col-3">
                            <label className="d-flex align-items-center gap-1">
                                <span>Bank Name </span>
                            </label>
                        </div>
                        <div className="col-7">
                            <Form.Item name="bank_name" className="d-flex m-0 form-item">
                                <Input />
                            </Form.Item>
                        </div>
                    </div>
                    <div className="row col-12 d-flex  align-items-center">
                        <div className="col-3">
                            <label className="d-flex align-items-center gap-1 text-danger">
                                <span>Account Number * </span>
                            </label>
                        </div>
                        <div className="col-7">
                            <Form.Item name="account_number" className="d-flex m-0 form-item">
                                <Input.Password />
                            </Form.Item>
                        </div>
                    </div>
                    <div className="row col-12 d-flex  align-items-center">
                        <div className="col-3">
                            <label className="d-flex align-items-center gap-1 text-danger">
                                <span>Re-enter Account Number  *</span>
                            </label>
                        </div>
                        <div className="col-7">
                            <Form.Item name="confirm_account_number" className="d-flex m-0 form-item">
                                <Input />
                            </Form.Item>
                        </div>
                    </div>
                    <div className="row col-12 d-flex  align-items-center">
                        <div className="col-3">
                            <label className="d-flex align-items-center gap-1 text-danger">
                                <span>IFSC  *</span>
                            </label>
                        </div>
                        <div className="col-7">
                            <Form.Item name="ifcs" className="d-flex m-0 form-item">
                                <Input />
                            </Form.Item>
                        </div>
                    </div>
                    <Divider className='mb-1'/>
                    <span className='text-primary' style={{cursor:'pointer'}}>+   Add New Bank</span>
                </div>
            </div>
        </div>
    )
}

export default BankDetails
