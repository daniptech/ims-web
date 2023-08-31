import { Button, Form, Input, Modal } from 'antd';
import React from 'react';
import {
  addBrand,
  getBrand,
  removeBrand,
  updateBrand
} from '../../controller/api/FieldsDataServices';
import { useState } from 'react';
import { useEffect } from 'react';
import { DeleteFilled, EditOutlined } from '@ant-design/icons';

const Brands = ({ brandModalOpen, setBrandModalOpen }) => {
  const [form] = Form.useForm();
  const [editBrandID, setEditBrandID] = useState();
  const [brand, seBrand] = useState([]);
  useEffect(() => {
    getAllBrand();
  }, []);
  const getAllBrand = () => {
    getBrand()
      .then((res) => {
        seBrand(res.data);
      })
      .catch((err) => console.log('err =====>', err));
  };
  const handleSubmit = (value) => {
    if (editBrandID === undefined) {
      addBrand(value)
        .then(() => {
          getAllBrand();
        })
        .catch((err) => console.log('err =====>', err));
    } else {
      updateBrand(value, { id: editBrandID })
        .then(() => {
          setEditBrandID();
          getAllBrand();
        })
        .catch((err) => console.log('err =====>', err));
    }
    form.resetFields();
  };
  const handleDelete = (val) => {
    removeBrand({ id: val.id })
      .then(() => {
        if (brand.length === 1) {
          setEditBrandID();
        }
        getAllBrand();
      })
      .catch((err) => console.log('err =====>', err));
  };
  const handleEdit = (val) => {
    console.log(val, 'brand val');
    setEditBrandID(val?.id);
    form.setFieldsValue({ ...val });
  };
  return (
    <Modal
      className="brand-modal"
      title="Manage Brands"
      maskClosable={false}
      open={brandModalOpen}
      onOk={''}
      footer={false}
      onCancel={() => setBrandModalOpen(false)}
    >
      <div className="w-100">
        <Form name="brand" form={form} onFinish={(value) => handleSubmit(value)}>
          <div className="row col-12">
            <div className="col-6">
              <label className="text-danger">Brand Name *</label>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Please Enter Brand Name'
                  }
                ]}
              >
                <Input />
              </Form.Item>
              <Button type="primary" htmlType="submit">
                {editBrandID !== undefined && brand?.length ? 'Update' : 'Save'}
              </Button>
            </div>
          </div>
        </Form>
        <table className="w-100 custom-table-create mt-4">
          <thead className="w-100">
            <tr className="border-bottom border-top">
              <th style={{ width: '10%' }} className="">
                Brands
              </th>
            </tr>
          </thead>
          <tbody>
            {brand?.map((val, index) => {
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

export default Brands;
