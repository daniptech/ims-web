import { Button, Form, Input, Modal } from 'antd';
import React from 'react';
import {
  addPaymentTerm,
  getPaymentTerm,
  removePaymentTerm,
  updatePaymentTerm
} from '../../controller/api/FieldsDataServices';
import { useState } from 'react';
import { useEffect } from 'react';
import { DeleteFilled, EditOutlined } from '@ant-design/icons';

const PaymentTerms = ({ paymentTermsModalOpen, setPaymentTermsModalOpen }) => {
  const [form] = Form.useForm();
  const [editPaymentTermsID, setEditPaymentTermsID] = useState();
  const [paymentTerm, setPaymentTerms] = useState([]);
  useEffect(() => {
    getAllPaymentTerms();
  }, []);
  const getAllPaymentTerms = () => {
    getPaymentTerm()
      .then((res) => {
        const data = res?.data?.filter((val) => val.isDefault);
        setPaymentTerms(data);
      })
      .catch((err) => console.log('err =====>', err));
  };
  const handleSubmit = (value) => {
    if (editPaymentTermsID === undefined) {
      addPaymentTerm({ ...value, isDefault: true })
        .then(() => {
          getAllPaymentTerms();
        })
        .catch((err) => console.log('err =====>', err));
    } else {
      updatePaymentTerm({ ...value, isDefault: true }, { id: editPaymentTermsID })
        .then(() => {
          setEditPaymentTermsID();
          getAllPaymentTerms();
        })
        .catch((err) => console.log('err =====>', err));
    }
    form.resetFields();
  };
  const handleDelete = (val) => {
    removePaymentTerm({ id: val.id })
      .then(() => {
        if (paymentTerm.length === 1) {
          setEditPaymentTermsID();
        }
        getAllPaymentTerms();
      })
      .catch((err) => console.log('err =====>', err));
  };
  const handleEdit = (val) => {
    setEditPaymentTermsID(val?.id);
    form.setFieldsValue({ ...val });
  };
  return (
    <Modal
      className="payment-term-modal"
      title="Manage Payment Terms"
      maskClosable={false}
      open={paymentTermsModalOpen}
      onOk={''}
      footer={false}
      onCancel={() => setPaymentTermsModalOpen(false)}
    >
      <div className="w-100">
        <Form name="brand" form={form} onFinish={(value) => handleSubmit(value)}>
          <div className="row col-12">
            <div className="col-6">
              <label className="text-danger">Term Name *</label>
              <Form.Item
                name="termName"
                rules={[
                  {
                    required: true,
                    message: 'Please Enter Term Name'
                  }
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-6">
              <label className="text-danger">Number of Days *</label>
              <Form.Item
                name="numberOfDays"
                rules={[
                  {
                    required: true,
                    message: 'Please Enter Number of Days'
                  }
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-6">
              <Button type="primary" htmlType="submit">
                {editPaymentTermsID !== undefined && paymentTerm?.length ? 'Update' : 'Save'}
              </Button>
            </div>
          </div>
        </Form>
        <table className="w-100 custom-table-create mt-4">
          <thead className="w-100">
            <tr className="border-bottom border-top">
              <th style={{ width: '10%' }} className="">
                Payment Term Name
              </th>
              <th style={{ width: '10%' }} className="">
                Number of Days
              </th>
            </tr>
          </thead>
          <tbody>
            {paymentTerm?.map((val, index) => {
              return (
                <tr key={index} className="border-bottom table-row">
                  <td style={{ width: '40%' }} className="">
                    {val.termName}
                  </td>
                  <td style={{ width: '30%' }} className="">
                    {val.numberOfDays}
                  </td>
                  <td>
                    <div className="d-flex justify-content-center align-items-center gap-3 text-primary action-btn">
                      <span
                        className="d-flex justify-content-center align-items-center gap-2"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleEdit(val)}
                      >
                        <EditOutlined /> Edit
                      </span>
                      <span
                        className="d-flex justify-content-center align-items-center gap-2"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleDelete(val)}
                      >
                        <DeleteFilled /> Delete
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Modal>
  );
};

export default PaymentTerms;
