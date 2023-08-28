import { DeleteOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input } from 'antd';
import React from 'react';
import { useRef } from "react";

const BankDetails = ({ bankdetail, setBankDetail }) => {
  const [form] = Form.useForm();
  // const handleAddBank = () => {
  //   setBankDetail([
  //     ...bankdetail,
  //     {
  //       beneficiaryName: '',
  //       bankName: '',
  //       accountNumber: '',
  //       reenterAccountNumber: '',
  //       ifsc: ''
  //     }
  //   ]);
  // };
  // const removeBankDetailRow = (removeindex) => {
  //   const filterData = bankdetail?.filter((val, index) => index !== removeindex);
  //   setBankDetail(filterData);
  // };
  // const handleChange = (event, index) => {
  //   const data = [...bankdetail];
  //   data[index][event.target.name] = event.target.value;
  //   setBankDetail(data);
  // };
  return (
    <div className="w-100">
      <Form layout="vertical" form={form} name="bankForm" onFinish={(value) => console.log(value,'bank form')}>
        <div className="row col-12 p-4 m-0">
          <div className="col-6 d-flex flex-column gap-3">
            <div className="row col-12 d-flex  align-items-center">
              <div className="col-3">
                <label className="d-flex align-items-center gap-1">
                  <span>Beneficiary Name </span>
                </label>
              </div>
              <div className="col-7">
                <Form.Item name="beneficiaryName" className="d-flex m-0 form-item">
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
                <Form.Item name="bankName" className="d-flex m-0 form-item">
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
                <Form.Item
                  name="accountNumber"
                  className="d-flex m-0 form-item"
                  rules={[
                    {
                      required: 'true',
                      message: 'please enter account number'
                    }
                  ]}>
                  <Input.Password />
                </Form.Item>
              </div>
            </div>
            <div className="row col-12 d-flex  align-items-center">
              <div className="col-3">
                <label className="d-flex align-items-center gap-1 text-danger">
                  <span>Re-enter Account Number *</span>
                </label>
              </div>
              <div className="col-7">
                <Form.Item
                  name="reenterAccountNumber"
                  className="d-flex m-0 form-item"
                  rules={[
                    {
                      required: 'true',
                      message: 'please enter account number'
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('accountNumber') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "The account numbers you've entered do not match. Re-enter them again"
                          )
                        );
                      }
                    })
                  ]}>
                  <Input.Password />
                </Form.Item>
              </div>
            </div>
            <div className="row col-12 d-flex  align-items-center">
              <div className="col-3">
                <label className="d-flex align-items-center gap-1 text-danger">
                  <span>IFSC *</span>
                </label>
              </div>
              <div className="col-7">
                <Form.Item
                  name="ifsc"
                  className="d-flex m-0 form-item"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter IFSC CODE'
                    }
                  ]}>
                  <Input />
                </Form.Item>
              </div>
            </div>
            <div className="row col-12 d-flex  align-items-center">
              <div className="col-3">
                <Button type="primary" form="bankForm" htmlType="submit" onClick={()=>form.submit()}>
                  Add
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default BankDetails;
