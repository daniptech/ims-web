import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Divider, Form, Input } from 'antd';
import React, { useState } from 'react';
import { useRef } from 'react';

const BankDetails = ({ bankdetail, setBankDetail }) => {
  const [editID, setEditID] = useState();
  const [form1] = Form.useForm();
  const removeBank = (removeItem) => {
    if (removeItem == editID) {
      setEditID();
    }
    const data = bankdetail?.filter((val, index) => index !== removeItem);
    setBankDetail(data);
  };
  const rowEdit = (id, val) => {
    setEditID(id);
    form1.setFieldsValue({ ...val });
  };
  const handleSubmit = (value) => {
    if(editID!==undefined){
      const data=[...bankdetail]
      data[editID]=value
      setBankDetail(data)
      setEditID()
    }else{
      setBankDetail([...bankdetail, value]);
    }
    form1.resetFields();
  };
  return (
    <div className="w-100">
      <Form
        layout="vertical"
        form={form1}
        name="bankForm"
        onFinish={(value) => {
          handleSubmit(value);
        }}>
        <div className="row col-12 p-4 m-0">
          <div className="col-4 d-flex flex-column gap-3">
            <div className="row col-12 d-flex  align-items-center">
              <div className="col-5">
                <label className="d-flex align-items-center gap-1">
                  <span>Beneficiary Name </span>
                </label>
              </div>
              <div className="col-7 p-0 m-0">
                <Form.Item name="beneficiaryName" className="d-flex m-0 form-item">
                  <Input />
                </Form.Item>
              </div>
            </div>
          </div>
          <div className="col-4 d-flex flex-column gap-3">
            <div className="row col-12 d-flex  align-items-center">
              <div className="col-5">
                <label className="d-flex align-items-center gap-1">
                  <span>Bank Name </span>
                </label>
              </div>
              <div className="col-7 p-0 m-0">
                <Form.Item name="bankName" className="d-flex m-0 form-item">
                  <Input />
                </Form.Item>
              </div>
            </div>
          </div>
          <div className="col-4 d-flex flex-column gap-3">
            <div className="row col-12 d-flex  align-items-center">
              <div className="col-5">
                <label className="d-flex align-items-center gap-1 text-danger">
                  <span>Account Number * </span>
                </label>
              </div>
              <div className="col-7 p-0 m-0">
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
          </div>
          <div className="col-4 d-flex flex-column gap-3">
            <div className="row col-12 d-flex  align-items-center">
              <div className="col-5">
                <label className="d-flex align-items-center gap-1 text-danger">
                  <span>Re-enter Account Number *</span>
                </label>
              </div>
              <div className="col-7 p-0 m-0">
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
          </div>
          <div className="col-4 d-flex flex-column gap-3">
            <div className="row col-12 d-flex  align-items-center">
              <div className="col-5">
                <label className="d-flex align-items-center gap-1 text-danger">
                  <span>IFSC *</span>
                </label>
              </div>
              <div className="col-7 p-0 m-0">
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
          </div>
          <div className="col-4 d-flex flex-column gap-3">
            <div className="row col-12 d-flex  align-items-center">
              <div className="col-12 text-center">
                <Button
                  type="primary"
                  form="bankForm"
                  htmlType="submit"
                  onClick={() => form1.submit()}>
                  {editID !== undefined ? 'UPDATE' : 'ADD'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Form>
      <div style={{ width: '100%' }} className="mb-2">
        <table className="w-100 custom-table-create">
          <thead className="w-100">
            <tr className="">
              <th
                style={{ width: '18%' }}
                className="border-end border-top border-bottom text-center">
                Beneficiary Name
              </th>
              <th
                style={{ width: '18%' }}
                className="border-end border-top border-bottom text-center">
                Bank Name
              </th>
              <th
                style={{ width: '18%' }}
                className="border-end border-top border-bottom text-center">
                Account Number
              </th>
              <th
                style={{ width: '18%' }}
                className="border-end border-top border-bottom text-center">
                Re-enter Account Number
              </th>
              <th style={{ width: '18%' }} className=" border-top border-bottom text-center">
                IFSC
              </th>
              <th style={{ width: '10%' }} className=""></th>
            </tr>
          </thead>
          {bankdetail.map((val, index) => (
            <tbody key={index} className="w-100">
              <tr className="">
                <td style={{ width: '18%' }} className="border-end border-bottom text-center">
                  <>{val.beneficiaryName}</>
                </td>
                <td style={{ width: '18%' }} className="border-end border-bottom text-center">
                  <>{val.bankName}</>
                </td>
                <td style={{ width: '18%' }} className="border-end border-bottom text-center">
                  <>{val.accountNumber}</>
                </td>
                <td style={{ width: '18%' }} className="border-end border-bottom text-center">
                  <>{val.reenterAccountNumber}</>
                </td>
                <td style={{ width: '18%' }} className=" border-bottom text-center">
                  <>{val.ifsc}</>
                </td>

                <td style={{ width: '10%' }} className="text-center">
                  <div className="d-flex justify-content-center align-items-center gap-4">
                    <EditOutlined
                      style={{ cursor: 'pointer' }}
                      onClick={() => rowEdit(index, val)}
                    />
                    <FontAwesomeIcon
                      icon={faCircleXmark}
                      onClick={() => removeBank(index)}
                      style={{ color: '#e26a6a', cursor: 'pointer' }}
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
        {!bankdetail?.length && (
          <div className="w-100 p-2 text-center border-bottom fw-semibold text-muted fs-6">
            No Bank Detail Added
          </div>
        )}
      </div>
    </div>
  );
};

export default BankDetails;
