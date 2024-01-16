import { Button, Form, Input, Modal } from 'antd';
import React from 'react';
import { addReason, getReason, removeReason } from '../../controller/api/FieldsDataServices';
import { useState } from 'react';
import { useEffect } from 'react';
import { DeleteFilled } from '@ant-design/icons';

const Reason = ({ reasonModalOpen, setReasonModalOpen }) => {
  const [form] = Form.useForm();
  const [reason, setReason] = useState([]);
  useEffect(() => {
    getAllReason();
  }, []);
  const getAllReason = () => {
    getReason()
      .then((res) => {
        setReason(res.data);
      })
      .catch((err) => console.log('err =====>', err));
  };
  const handleSubmit = (value) => {
    addReason(value)
      .then(() => {
        getAllReason();
      })
      .catch((err) => console.log('err =====>', err));
    form.resetFields();
  };
  const handleDelete = (val) => {
    removeReason({ id: val.id })
      .then(() => {
        getAllReason();
      })
      .catch((err) => console.log('err =====>', err));
  };

  return (
    <Modal
      className="brand-modal"
      title="Manage Reason"
      maskClosable={false}
      open={reasonModalOpen}
      onOk={''}
      footer={false}
      onCancel={() => setReasonModalOpen(false)}
    >
      <div className="w-100">
        <Form name="reason" form={form} onFinish={(value) => handleSubmit(value)}>
          <div className="row col-12">
            <div className="col-6">
              <label className="text-danger">Reason *</label>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Please Enter Reson'
                  }
                ]}
              >
                <Input />
              </Form.Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </div>
          </div>
        </Form>
        <table className="w-100 custom-table-create mt-4">
          <thead className="w-100">
            <tr className="border-bottom border-top">
              <th style={{ width: '10%' }} className="">
                Reason
              </th>
            </tr>
          </thead>
          <tbody>
            {reason?.map((val, index) => {
              return (
                <tr key={index} className="border-bottom table-row">
                  <td style={{ width: '70%' }} className="">
                    {val.name}
                  </td>
                  <td>
                    <div className="d-flex justify-content-center align-items-center gap-3 text-primary action-btn">
                      {/* <span
                        className="d-flex justify-content-center align-items-center gap-2"
                        style={{ cursor: 'pointer' }}
                        <EditOutlined /> Edit
                      </span> */}
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

export default Reason;
