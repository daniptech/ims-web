import { Button, Form, Input, Modal } from 'antd';
import React from 'react';
import {
  addManufacturer,
  getManufacturer,
  removeManufacturer,
  updateManufacturer
} from '../../controller/api/FieldsDataServices';
import { useState } from 'react';
import { useEffect } from 'react';
import { DeleteFilled, EditOutlined } from '@ant-design/icons';

const Manufacturer = ({ manufacturerModalOpen, setManufacturerModalOpen }) => {
  const [form] = Form.useForm();
  const [editManufacturerID, setEditManufacturerID] = useState();
  const [manufacturer, seManufacturer] = useState([]);
  useEffect(() => {
    getAllManufacturer();
  }, []);
  const getAllManufacturer = () => {
    getManufacturer()
      .then((res) => {
        seManufacturer(res.data);
      })
      .catch((err) => console.log('err =====>', err));
  };
  const handleSubmit = (value) => {
    if (editManufacturerID === undefined) {
      addManufacturer(value)
        .then(() => {
          getAllManufacturer();
        })
        .catch((err) => console.log('err =====>', err));
    } else {
      updateManufacturer(value, { id: editManufacturerID })
        .then(() => {
          setEditManufacturerID();
          getAllManufacturer();
        })
        .catch((err) => console.log('err =====>', err));
    }
    form.resetFields();
  };
  const handleDelete = (val) => {
    removeManufacturer({ id: val.id })
      .then(() => {
        if (Manufacturer.length === 1) {
          setEditManufacturerID();
        }
        getAllManufacturer();
      })
      .catch((err) => console.log('err =====>', err));
  };
  const handleEdit = (val) => {
    console.log(val, 'brand val');
    setEditManufacturerID(val?.id);
    form.setFieldsValue({ ...val });
  };
  return (
    <Modal
      className="manufacturer-modal"
      title="Manage Manufacturer"
      maskClosable={false}
      open={manufacturerModalOpen}
      onOk={''}
      footer={false}
      onCancel={() => setManufacturerModalOpen(false)}
    >
      <div className="w-100">
        <Form name="brand" form={form} onFinish={(value) => handleSubmit(value)}>
          <div className="row col-12">
            <div className="col-6">
              <label className="text-danger">Manufacturer Name *</label>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Please Enter Manufacturer Name'
                  }
                ]}
              >
                <Input />
              </Form.Item>
              <Button type="primary" htmlType="submit">
                {editManufacturerID !== undefined && manufacturer?.length ? 'Update' : 'Save'}
              </Button>
            </div>
          </div>
        </Form>
        <table className="w-100 custom-table-create mt-4">
          <thead className="w-100">
            <tr className="border-bottom border-top">
              <th style={{ width: '10%' }} className="">
                Manufacturer
              </th>
            </tr>
          </thead>
          <tbody>
            {manufacturer?.map((val, index) => {
              return (
                <tr key={index} className="border-bottom table-row">
                  <td style={{ width: '70%' }} className="">
                    {val.name}
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

export default Manufacturer;
