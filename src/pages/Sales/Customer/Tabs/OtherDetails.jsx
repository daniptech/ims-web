import {
  FacebookOutlined,
  InfoCircleOutlined,
  SkypeOutlined,
  TwitterOutlined
} from '@ant-design/icons';
import { Checkbox, Form, Input, Select, Tooltip } from 'antd';
import React from 'react';
import { useState } from 'react';
import currencyData from '../../../../data/Common-Currency.json'
const OtherDetail = ({ form }) => {
  const { Option } = Select;
  const [addmore, setAddMore] = useState(false);
  const [checked, setchecked] = useState(form.getFieldValue('enablePortal'));
  return (
    <div className="row col-12 p-4 m-0">
      <div className="col-6 d-flex flex-column gap-3">
        <div className="row col-12 d-flex  align-items-center">
          <div className="col-3">
            <label className="d-flex align-items-center gap-1">
              <span>PAN </span>{' '}
              <Tooltip
                placement="rightTop"
                title="Select if this item is a Physical good or a service you're offering. Also, remember that once you include this item in a transaction, you can't change its type. ">
                <InfoCircleOutlined className="text-muted" />
              </Tooltip>{' '}
            </label>
          </div>
          <div className="col-7">
            <Form.Item name="pan" className="d-flex m-0 form-item">
              <Input />
            </Form.Item>
          </div>
        </div>
        <div className="row col-12 d-flex  align-items-center">
          <div className="col-3">
            <label className="d-flex align-items-center gap-1">
              <span>Currency </span>
            </label>
          </div>
          <div className="col-7">
            <Form.Item name="currency" className="d-flex m-0 form-item">
              <Select>
                {Object.keys(currencyData)?.map((key,index)=>{
                  return <Option key={index} value={currencyData[key]?.code}>{currencyData[key]?.code+"- "+currencyData[key]?.name}</Option>
                })}
              </Select>
            </Form.Item>
          </div>
        </div>
        <div className="row col-12 d-flex  align-items-center">
          <div className="col-3">
            <label className="d-flex align-items-center gap-1">
              <span>Payment Terms </span>
            </label>
          </div>
          <div className="col-7">
            <Form.Item name="paymentTerms" className="d-flex m-0 form-item">
              <Select options={[]} />
            </Form.Item>
          </div>
        </div>
        <div className="row col-12 d-flex  align-items-center">
          <div className="col-3">
            <label className="d-flex align-items-center gap-1">
              <span>Price List </span>
            </label>
          </div>
          <div className="col-7">
            <Form.Item name="priceList" className="d-flex m-0 form-item">
              <Select options={[]} />
            </Form.Item>
          </div>
        </div>
        <div className="row col-12 d-flex  align-items-center">
          <div className="col-3">
            <div className="col-3">
              <label className="d-flex align-items-center gap-1">
                <span>Enable Portal? </span>{' '}
                <Tooltip
                  placement="rightTop"
                  title="Select if this item is a Physical good or a service you're offering. Also, remember that once you include this item in a transaction, you can't change its type. ">
                  <InfoCircleOutlined className="text-muted" />
                </Tooltip>{' '}
              </label>
            </div>
          </div>
          <div className="col-7">
            <Form.Item name="enablePortal" className="d-flex m-0 form-item" valuePropName="checked">
              <Checkbox onChange={(value) => setchecked(value.target.checked)}>
                Allow portal access for this customer{' '}
                {checked && <span className="text-muted">( Email address is mandatory )</span>}
              </Checkbox>
            </Form.Item>
          </div>
        </div>
        <div className="row col-12 d-flex  align-items-center">
          <div className="col-3">
            <label className="d-flex align-items-center gap-1">
              <span>Portal Language?</span>{' '}
              <Tooltip
                placement="rightTop"
                title="Select if this item is a Physical good or a service you're offering. Also, remember that once you include this item in a transaction, you can't change its type. ">
                <InfoCircleOutlined className="text-muted" />
              </Tooltip>{' '}
            </label>
          </div>
          <div className="col-7">
            <Form.Item name="portalLanguage" className="d-flex m-0 form-item">
              <Select
                options={[
                  {
                    label: 'English',
                    value: 'en'
                  }
                ]}
              />
            </Form.Item>
          </div>
        </div>
        {!addmore && (
          <span
            className="text-primary"
            style={{ cursor: 'pointer' }}
            onClick={() => setAddMore(true)}>
            Add more details
          </span>
        )}
        {addmore && (
          <>
            <div className="row col-12 d-flex  align-items-center">
              <div className="col-3">
                <label className="d-flex align-items-center gap-1">
                  <span>Website </span>
                </label>
              </div>
              <div className="col-7">
                <Form.Item name="website" className="d-flex m-0 form-item">
                  <Input />
                </Form.Item>
              </div>
            </div>
            <div className="row col-12 d-flex  align-items-center">
              <div className="col-3">
                <label className="d-flex align-items-center gap-1">
                  <span>Department </span>
                </label>
              </div>
              <div className="col-7">
                <Form.Item name="department" className="d-flex m-0 form-item">
                  <Input />
                </Form.Item>
              </div>
            </div>
            <div className="row col-12 d-flex  align-items-center">
              <div className="col-3">
                <label className="d-flex align-items-center gap-1">
                  <span>Designation </span>
                </label>
              </div>
              <div className="col-7">
                <Form.Item name="designation" className="d-flex m-0 form-item">
                  <Input />
                </Form.Item>
              </div>
            </div>
            <div className="row col-12 d-flex  align-items-center">
              <div className="col-3">
                <label className="d-flex align-items-center gap-1">
                  <span>Twitter </span>
                </label>
              </div>
              <div className="col-7">
                <Form.Item name="twitter" className="d-flex m-0 form-item">
                  <Input addonBefore={<TwitterOutlined className="text-primary" />} />
                </Form.Item>
                <span className="text-muted">http://www.twitter.com/</span>
              </div>
            </div>
            <div className="row col-12 d-flex  align-items-center">
              <div className="col-3">
                <label className="d-flex align-items-center gap-1">
                  <span>Skype Name/Number </span>
                </label>
              </div>
              <div className="col-7">
                <Form.Item name="skypeNameNumber" className="d-flex m-0 form-item">
                  <Input addonBefore={<SkypeOutlined className="text-primary" />} />
                </Form.Item>
              </div>
            </div>
            <div className="row col-12 d-flex  align-items-center">
              <div className="col-3">
                <label className="d-flex align-items-center gap-1">
                  <span>Facebook </span>
                </label>
              </div>
              <div className="col-7">
                <Form.Item name="facebook" className="d-flex m-0 form-item">
                  <Input addonBefore={<FacebookOutlined className="text-primary" />} />
                </Form.Item>
                <span className="text-muted">http://www.facebook.com/</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default OtherDetail;
