import { Form, Input, Select } from 'antd';
import React from 'react';

const Address = () => {
  return (
    <div className="row col-12 p-4 m-0">
      <div className="col-6 d-flex flex-column gap-3">
        <span className="text-muted fw-medium">BILLING ADDRESS</span>
        <div className="row col-12 d-flex  align-items-center">
          <div className="col-3">
            <label className="d-flex align-items-center gap-1">
              <span>Attention </span>
            </label>
          </div>
          <div className="col-7">
            <Form.Item name="attention" className="d-flex m-0 form-item">
              <Input />
            </Form.Item>
          </div>
        </div>
        <div className="row col-12 d-flex  align-items-center">
          <div className="col-3">
            <label className="d-flex align-items-center gap-1">
              <span>Country / Region </span>
            </label>
          </div>
          <div className="col-7">
            <Form.Item name="country" className="d-flex m-0 form-item">
              <Select options={[]} />
            </Form.Item>
          </div>
        </div>
        <div className="row col-12 d-flex  align-items-center">
          <div className="col-3">
            <label className="d-flex align-items-center gap-1">
              <span>Address </span>
            </label>
          </div>
          <div className="col-7">
            <Form.Item name="address1" className="d-flex m-0 form-item">
              <Input.TextArea style={{ minHeight: '50px' }} placeholder="street 1" />
            </Form.Item>
          </div>
        </div>
        <div className="row col-12 d-flex  align-items-center">
          <div className="col-3"></div>
          <div className="col-7">
            <Form.Item name="address2" className="d-flex m-0 form-item">
              <Input.TextArea style={{ minHeight: '50px' }} placeholder="street 2" />
            </Form.Item>
          </div>
        </div>
        <div className="row col-12 d-flex  align-items-center">
          <div className="col-3">
            <label className="d-flex align-items-center gap-1">
              <span>City </span>
            </label>
          </div>
          <div className="col-7">
            <Form.Item name="city" className="d-flex m-0 form-item">
              <Input />
            </Form.Item>
          </div>
        </div>
        <div className="row col-12 d-flex  align-items-center">
          <div className="col-3">
            <label className="d-flex align-items-center gap-1">
              <span>State </span>
            </label>
          </div>
          <div className="col-7">
            <Form.Item name="state" className="d-flex m-0 form-item">
              <Select options={[]} />
            </Form.Item>
          </div>
        </div>
        <div className="row col-12 d-flex  align-items-center">
          <div className="col-3">
            <label className="d-flex align-items-center gap-1">
              <span>Zip Code </span>
            </label>
          </div>
          <div className="col-7">
            <Form.Item name="zip_code" className="d-flex m-0 form-item">
              <Input />
            </Form.Item>
          </div>
        </div>
        <div className="row col-12 d-flex  align-items-center">
          <div className="col-3">
            <label className="d-flex align-items-center gap-1">
              <span>Phone </span>
            </label>
          </div>
          <div className="col-7">
            <Form.Item name="phone" className="d-flex m-0 form-item">
              <Input />
            </Form.Item>
          </div>
        </div>
        <div className="row col-12 d-flex  align-items-center">
          <div className="col-3">
            <label className="d-flex align-items-center gap-1">
              <span>Fax </span>
            </label>
          </div>
          <div className="col-7">
            <Form.Item name="fax" className="d-flex m-0 form-item">
              <Input />
            </Form.Item>
          </div>
        </div>
      </div>
      <div className="col-6 d-flex flex-column gap-3">
        <span className="text-muted fw-medium">BILLING ADDRESS</span>
        <div className="row col-12 d-flex  align-items-center">
          <div className="col-3">
            <label className="d-flex align-items-center gap-1">
              <span>Attention </span>
            </label>
          </div>
          <div className="col-7">
            <Form.Item name="attention" className="d-flex m-0 form-item">
              <Input />
            </Form.Item>
          </div>
        </div>
        <div className="row col-12 d-flex  align-items-center">
          <div className="col-3">
            <label className="d-flex align-items-center gap-1">
              <span>Country / Region </span>
            </label>
          </div>
          <div className="col-7">
            <Form.Item name="country" className="d-flex m-0 form-item">
              <Select options={[]} />
            </Form.Item>
          </div>
        </div>
        <div className="row col-12 d-flex  align-items-center">
          <div className="col-3">
            <label className="d-flex align-items-center gap-1">
              <span>Address </span>
            </label>
          </div>
          <div className="col-7">
            <Form.Item name="address1" className="d-flex m-0 form-item">
              <Input.TextArea style={{ minHeight: '50px' }} placeholder="street 1" />
            </Form.Item>
          </div>
        </div>
        <div className="row col-12 d-flex  align-items-center">
          <div className="col-3"></div>
          <div className="col-7">
            <Form.Item name="address2" className="d-flex m-0 form-item">
              <Input.TextArea style={{ minHeight: '50px' }} placeholder="street 2" />
            </Form.Item>
          </div>
        </div>
        <div className="row col-12 d-flex  align-items-center">
          <div className="col-3">
            <label className="d-flex align-items-center gap-1">
              <span>City </span>
            </label>
          </div>
          <div className="col-7">
            <Form.Item name="city" className="d-flex m-0 form-item">
              <Input />
            </Form.Item>
          </div>
        </div>
        <div className="row col-12 d-flex  align-items-center">
          <div className="col-3">
            <label className="d-flex align-items-center gap-1">
              <span>State </span>
            </label>
          </div>
          <div className="col-7">
            <Form.Item name="state" className="d-flex m-0 form-item">
              <Select options={[]} />
            </Form.Item>
          </div>
        </div>
        <div className="row col-12 d-flex  align-items-center">
          <div className="col-3">
            <label className="d-flex align-items-center gap-1">
              <span>Zip Code </span>
            </label>
          </div>
          <div className="col-7">
            <Form.Item name="zip_code" className="d-flex m-0 form-item">
              <Input />
            </Form.Item>
          </div>
        </div>
        <div className="row col-12 d-flex  align-items-center">
          <div className="col-3">
            <label className="d-flex align-items-center gap-1">
              <span>Phone </span>
            </label>
          </div>
          <div className="col-7">
            <Form.Item name="phone" className="d-flex m-0 form-item">
              <Input />
            </Form.Item>
          </div>
        </div>
        <div className="row col-12 d-flex  align-items-center">
          <div className="col-3">
            <label className="d-flex align-items-center gap-1">
              <span>Fax </span>
            </label>
          </div>
          <div className="col-7">
            <Form.Item name="fax" className="d-flex m-0 form-item">
              <Input />
            </Form.Item>
          </div>
        </div>
      </div>

      <div
        className="row mt-4"
        style={{ borderLeftColor: '#fba800', borderLeftWidth: '5px', borderLeftStyle: 'solid' }}
      >
        <div>
          <div className="fw-bold">Note:</div>

          <ul>
            <li>You can add and manage additional addresses from contact details section.</li>
            <li>
              View and edit the address format of your transactions under Settings &gt; Preferences
              &gt; Customers and Vendors.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Address;
