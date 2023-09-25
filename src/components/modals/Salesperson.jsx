// import React from 'react'

// export const Salesperson = () => {
//   return (
//     <div>Salesperson</div>
//   )
// }
import { Button, Form, Input, Modal } from 'antd';
import React from 'react';
import {
  addSalesPerson,
  getSalesPerson,
  removeSalesPerson,
  updateSalesPerson
} from '../../controller/api/FieldsDataServices';
import { useState } from 'react';
import { useEffect } from 'react';
import { DeleteFilled, EditOutlined } from '@ant-design/icons';

const Salesperson = ({ salesPersonModalOpen, setSalesPersonModalOpen }) => {
  const [form] = Form.useForm();
  const [editSalesPersonID, setEditSalesPersonID] = useState();
  const [salesPerson, setSalesPerson] = useState([]);
  useEffect(() => {
    debugger
    getAllSalesPerson();
  }, []);
  const getAllSalesPerson = () => {
    getSalesPerson()
      .then((res) => {
        setSalesPerson(res.data);
      })
      .catch((err) => console.log('err =====>', err));
  };
  const handleSubmit = (value) => {
    if (editSalesPersonID === undefined) {
      addSalesPerson({ ...value, isDefault: true })
        .then(() => {
            getAllSalesPerson();
        })
        .catch((err) => console.log('err =====>', err));
    } else {
      updateSalesPerson({ ...value, isDefault: true }, { id: editSalesPersonID })
        .then(() => {
          setEditSalesPersonID();
          getAllSalesPerson();
        })
        .catch((err) => console.log('err =====>', err));
    }
    form.resetFields();
  };
  const handleDelete = (val) => {
    removeSalesPerson({ id: val.id })
      .then(() => {
        if (salesPerson.length === 1) {
          setEditSalesPersonID();
        }
        getAllSalesPerson();
      })
      .catch((err) => console.log('err =====>', err));
  };
  const handleEdit = (val) => {
    debugger
    setEditSalesPersonID(val?.id);
    form.setFieldsValue({ ...val });
  };
  return (
    <Modal
      className="payment-term-modal"
      title="Manage Payment Terms"
      maskClosable={false}
      open={salesPersonModalOpen}
      onOk={''}
      footer={false}
      onCancel={() => setSalesPersonModalOpen(false)}>
      <div className="w-100">
        <Form name="brand" form={form} onFinish={(value) => handleSubmit(value)}>
          <div className="row col-12">
            <div className="col-6">
              <label className="text-danger">Name *</label>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Please Enter  Name'
                  }
                ]}>
                <Input />
              </Form.Item>
            </div>
            <div className="col-6">
              <label className="text-danger">Email *</label>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please Enter Email'
                  }
                ]}>
                <Input />
              </Form.Item>
            </div>
            <div className="col-6">
              <Button type="primary" htmlType="submit">
                {editSalesPersonID !== undefined && salesPerson?.length ? 'Update' : 'Save'}
              </Button>
            </div>
          </div>
        </Form>
        <table className="w-100 custom-table-create mt-4">
          <thead className="w-100">
            <tr className="border-bottom border-top">
              <th style={{ width: '10%' }} className="">
                SALESPERSON NAME
              </th>
              <th style={{ width: '10%' }} className="">
                EMAIL
              </th>
            </tr>
          </thead>
          <tbody>
            {salesPerson?.map((val, index) => {
              return (
                <tr key={index} className="border-bottom table-row">
                  <td style={{ width: '40%' }} className="">
                    {val.name}
                  </td>
                  <td style={{ width: '30%' }} className="">
                    {val.email}
                  </td>
                  <td>
                    <div className="d-flex justify-content-center align-items-center gap-3 text-primary action-btn">
                      <span
                        className="d-flex justify-content-center align-items-center gap-2"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleEdit(val)}>
                        <EditOutlined /> Edit
                      </span>
                      <span
                        className="d-flex justify-content-center align-items-center gap-2"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleDelete(val)}>
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

export default Salesperson;
