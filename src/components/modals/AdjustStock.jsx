import { SettingTwoTone } from '@ant-design/icons';
import { Button, DatePicker, Divider, Drawer, Form, Input, Radio, Select, Space } from 'antd';
import React, {useState } from 'react';
import Reason from './Reason';
import { getReason } from '../../controller/api/FieldsDataServices';

const AdjustStock = ({ setOpenAdjustment, itemData }) => {
  const [form] = Form.useForm();
  const [adjustmentValue, setAdjustmentValue] = useState('quantity_ajustment');
  const [reason, setReason] = useState([]);
  const [reasonModalOpen, setReasonModalOpen] = useState(false);

  const getReasonData = () => {
    getReason()
      .then((res) => setReason(res.data))
      .catch((err) => console.log('err ====>', err));
  };

  return (
    <Drawer
      title={`Adjust Stock - ${itemData?.name}`}
      placement="right"
      width={500}
      onClose={() => setOpenAdjustment(false)}
      open={true}
      footer={
        <Space>
          <Button onClick={() => setOpenAdjustment(false)}>Cancel</Button>
          <Button type="primary" htmlType="submit" form="adjustemtForm">
            Submit
          </Button>
        </Space>
      }
    >
      <div>
        <Form
          className="adjustment-from"
          form={form}
          name="adjustemtForm"
          onFinish={() => setOpenAdjustment(false)}
          initialValues={{
            adjustment: 'quantity_ajustment',
            quentity_available: 16
          }}
        >
          <Form.Item name="adjustment">
            <Radio.Group>
              <Space direction="vertical" onChange={(e) => setAdjustmentValue(e.target.value)}>
                <Radio value="quantity_ajustment">Quantity Adjustment</Radio>
                <Radio value="value_adjustment">Value Adjustment</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="date"
            label="Date"
            className="adjust-form-items"
            rules={[
              {
                required: true
              }
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="account"
            label="Account"
            className="adjust-form-items"
            rules={[
              {
                required: true
              }
            ]}
          >
            <Select
              options={[
                {
                  label: 'Manager',
                  options: [
                    {
                      label: 'Jack',
                      value: 'jack'
                    },
                    {
                      label: 'Lucy',
                      value: 'lucy'
                    }
                  ]
                },
                {
                  label: 'Engineer',
                  options: [
                    {
                      label: 'yiminghe',
                      value: 'Yiminghe'
                    }
                  ]
                }
              ]}
            />
          </Form.Item>
          <Form.Item name="reference_number" label="Reference Number" className="adjust-form-items">
            <Input />
          </Form.Item>
          {adjustmentValue === 'quantity_ajustment' ? (
            <div className="row col-12  adjust-box-input m-0">
              <div className="col-md-6 col-md-12 col-lg-12 border border-bottom-0 p-2">
                <Form.Item
                  name="quentity_available"
                  label="Quantity Available"
                  className="adjust-input-items mb-0"
                >
                  <Input disabled={true} />
                </Form.Item>
                <div className="w-100 text-end">{itemData?.unit}</div>
              </div>
              <div className="col-md-6 col-md-12 col-lg-12 border border-bottom-0 p-2">
                <Form.Item
                  name="new_quantity_on_hand"
                  label="New Quantity on hand"
                  className="adjust-input-items mb-0"
                >
                  <Input placeholder="0.00" />
                </Form.Item>
              </div>
              <div className="col-md-6 col-md-12 col-lg-12 border border-bottom-0 p-2">
                <Form.Item
                  name="quentity_adjusted"
                  label="Quantity Adjusted"
                  className="adjust-input-items mb-0"
                  rules={[
                    {
                      required: true
                    }
                  ]}
                >
                  <Input placeholder="Eg. +10,-10" />
                </Form.Item>
              </div>
              <div className="col-md-6 col-md-12 col-lg-12 border p-2">
                <Form.Item name="cost_price" label="Cost Price" className="adjust-input-items mb-0">
                  <Input />
                </Form.Item>
                <div className="w-100 text-end">
                  <span className="text-muted" style={{ borderBottomStyle: 'dashed' }}>
                    Suggested Price:{' '}
                  </span>
                  12
                </div>
              </div>
            </div>
          ) : (
            <div className="row col-12  adjust-box-input m-0">
              <div className="col-md-6 col-md-12 col-lg-12 border border-bottom-0 p-2">
                <Form.Item
                  name="current_value"
                  label="Current Value"
                  className="adjust-input-items mb-0"
                >
                  <Input disabled={true} />
                </Form.Item>
              </div>
              <div className="col-md-6 col-md-12 col-lg-12 border border-bottom-0 p-2">
                <Form.Item
                  name="changed_value"
                  label="Changed Value"
                  className="adjust-input-items mb-0"
                >
                  <Input placeholder="0.00" />
                </Form.Item>
              </div>
              <div className="col-md-6 col-md-12 col-lg-12 border  p-2">
                <Form.Item
                  name="adjusted_value"
                  label="Adjusted Value"
                  className="adjust-input-items mb-0"
                  rules={[
                    {
                      required: true
                    }
                  ]}
                >
                  <Input placeholder="Eg. +10,-10" />
                </Form.Item>
              </div>
            </div>
          )}
          <div className="mt-3">
            <Form.Item
              name="reason"
              label="Reason"
              className="adjust-form-items"
              rules={[
                {
                  required: true
                }
              ]}
            >
              <Select
                options={
                  reason?.length
                    ? reason?.map((val) => {
                        return {
                          label: val?.name,
                          value: val.name
                        };
                      })
                    : []
                }
                showSearch={true}
                onClick={() => {
                  getReasonData();
                }}
                dropdownRender={(menu) => (
                  <>
                    {menu}
                    <Divider
                      style={{
                        margin: '8px 0'
                      }}
                    />
                    <Space
                      style={{
                        padding: '0 18px 4px'
                      }}
                    >
                      <span
                        className="d-flex align-items-center gap-3 text-primary"
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          setReasonModalOpen(true);
                        }}
                      >
                        {' '}
                        <SettingTwoTone /> Manage Reason
                      </span>
                    </Space>
                  </>
                )}
              >
                <Input />
              </Select>
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              className="adjust-form-items"
              rules={[
                {
                  required: true
                }
              ]}
            >
              <Input.TextArea />
            </Form.Item>
          </div>
        </Form>
      </div>
      {reasonModalOpen && (
        <Reason reasonModalOpen={reasonModalOpen} setReasonModalOpen={setReasonModalOpen} />
      )}
    </Drawer>
  );
};

export default AdjustStock;
