import { ArrowLeftOutlined, SettingOutlined, UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  Upload,
  message,
  Divider,
  Checkbox,
  Radio
} from 'antd';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
const CreateAndEditPaymentReceived = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];
  const uploadFile = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text'
    },
    beforeUpload: (file) => {
      const isFileTypeValid = file.type === 'image/jpeg' || file.type === 'image/png';
      const isSizeValid = file.size / 1024 / 1024 <= 5;
      if (!isFileTypeValid) {
        message.error('You can only upload JPEG or PNG files!');
      }
      if (!isSizeValid) {
        message.error('File size must be less than or equal to 5MB!');
      }
      return isFileTypeValid && isSizeValid;
    },
    onChange({ file, fileList }) {
      if (file.status !== 'uploading') {
        console.log(file, fileList);
      }
    }
  };
  return (
    <div className="item-view-container w-100 bg-white">
      <div className="d-flex justify-content-between align-items-center pt-4 px-3">
        <div className="d-flex  align-items-center gap-2 fs-5 ">
          <ArrowLeftOutlined onClick={() => navigate(-1)} className="custom-back-button" />
          <span className="fw-medium">{params.id ? 'Edit' : 'New'} Record Payment</span>
        </div>
        <div className="d-flex align-items-center gap-4 fs-5">
          <Button onClick={() => navigate(-1)}>Cancel</Button>
          <Button type="primary" htmlType="submit" form="conpositeForm">
            Submit
          </Button>
        </div>
      </div>
      <div
        className="w-100 position-relative"
        style={{
          maxHeight: '100vh',
          height: '100%',
          overflow: 'scroll',
          paddingBottom: '100px'
        }}
      >
        <Form layout="vertical" name="conpositeForm">
          <div>
            <div className="w-100 row col-12 bg-light p-4 m-0">
              <div className="col-6">
                <div className="row col-12 d-flex ">
                  <div className="col-3">
                    <label className="d-flex gap-1 text-danger">
                      <span>Customer Name *</span>{' '}
                    </label>
                  </div>
                  <div className="col-9">
                    <Form.Item name="vendor_name" className="mb-1">
                      <Select className="w-100" placeholder="Select or add customer" options={[]} />
                    </Form.Item>
                    <span className="text-primary" style={{ cursor: 'pointer' }}>
                      View Customer Detail
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <Divider />
            <div className="row col-12 p-4 m-0">
              <div className="col-6 d-flex flex-column gap-3">
                <div className="row col-12 d-flex ">
                  <div className="col-3">
                    <label className="d-flex align-items-center gap-1 text-danger">
                      <span>Amount Received*</span>
                    </label>
                  </div>
                  <div className="col-6">
                    <Form.Item name="payment_mode" className="d-flex m-0 form-item mb-1">
                      <Input addonBefore={'INR'} />
                    </Form.Item>
                    <Checkbox>Pay full amount (Rs.100.00)</Checkbox>
                  </div>
                </div>
                <div className="row col-12 d-flex  align-items-center">
                  <div className="col-3">
                    <label className="d-flex align-items-center gap-1">
                      <span>Bank Charges (if any)</span>
                    </label>
                  </div>
                  <div className="col-6">
                    <Form.Item name="bank_charges" className="d-flex m-0 form-item">
                      <Input />
                    </Form.Item>
                  </div>
                </div>
                <div className="row col-12 d-flex  align-items-center">
                  <div className="col-3">
                    <label className="d-flex align-items-center gap-1 text-danger">
                      <span>Payment Date *</span>
                    </label>
                  </div>
                  <div className="col-6">
                    <Form.Item name="payment_date" className="d-flex m-0 form-item">
                      <DatePicker
                        className="w-100"
                        defaultValue={dayjs('25/07/2023', dateFormatList[0])}
                        format={dateFormatList}
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className="row col-12 d-flex  align-items-center">
                  <div className="col-3">
                    <label className="d-flex align-items-center gap-1 text-danger">
                      <span>Payment # *</span>
                    </label>
                  </div>
                  <div className="col-6">
                    <Form.Item name="payment" className="d-flex m-0 form-item">
                      <Input placeholder="SO-00004" suffix={<SettingOutlined />} />
                    </Form.Item>
                  </div>
                </div>

                <div className="row col-12 d-flex  align-items-center">
                  <div className="col-3">
                    <label className="d-flex align-items-center gap-1">
                      <span>Payment Mode</span>
                    </label>
                  </div>
                  <div className="col-6">
                    <Form.Item name="payment_date" className="d-flex m-0 form-item">
                      <Select options={paymentmode} />
                    </Form.Item>
                  </div>
                </div>
                <div className="row col-12 d-flex  align-items-center">
                  <div className="col-3">
                    <label className="d-flex align-items-center gap-1 text-danger">
                      <span>Deposit To*</span>
                    </label>
                  </div>
                  <div className="col-6">
                    <Form.Item name="payment_date" className="d-flex m-0 form-item">
                      <Select options={paymentDeposit} />
                    </Form.Item>
                  </div>
                </div>
                <div className="row col-12 d-flex  align-items-center">
                  <div className="col-3">
                    <label className="d-flex align-items-center gap-1">
                      <span>Reference# </span>
                    </label>
                  </div>
                  <div className="col-6">
                    <Form.Item name="company_name" className="d-flex m-0 form-item">
                      <Input />
                    </Form.Item>
                  </div>
                </div>
                <div className="row col-12 d-flex  align-items-center">
                  <div className="col-3">
                    <label className="d-flex align-items-center gap-1">
                      <span>Tax deducted? </span>
                    </label>
                  </div>
                  <div className="col-6">
                    <Form.Item name="tax_deducted" className="d-flex m-0 form-item">
                      <Radio.Group onChange={onChange} value={value}>
                        <Radio value={1}>No Tax deducted</Radio>
                        <Radio value={2}>Yes, TDS (Income Tax)</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 w-100">
              <div style={{ width: '80%' }} className="mb-2">
                <table className="w-100 custom-table-create">
                  <thead className="w-100">
                    <tr className="border-bottom border-top">
                      <th style={{ width: '18%' }} className="">
                        Date
                      </th>
                      <th style={{ width: '18%' }} className=" ">
                        Invoice Number#
                      </th>
                      <th style={{ width: '18%' }} className=" ">
                        Invoice Amount
                      </th>
                      <th style={{ width: '18%' }} className=" ">
                        Amount Due
                      </th>
                      <th style={{ width: '18%', textAlign: 'right' }} className="">
                        Payment
                      </th>
                    </tr>
                  </thead>
                  <tbody className="w-100">
                    <tr className="border-bottom">
                      <td style={{ width: '18%' }} className="">
                        <div className="d-flex flex-column">
                          <span>23/07/2023</span>
                          <span style={{ fontSize: '12px' }}>Due Date: 07/08/2023</span>
                        </div>
                      </td>
                      <td style={{ width: '18%' }} className="">
                        2434343
                      </td>
                      <td style={{ width: '18%' }} className="">
                        100
                      </td>
                      <td style={{ width: '10%' }}>
                        <Input className="input-field" placeholder="0.00" />
                      </td>
                      <td style={{ width: '18%', textAlign: 'right' }} className="">
                        100
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="d-flex w-100 justify-content-end">
                  <div className="d-flex gap-5">
                    <span>Total:</span>
                    <span>100.00</span>
                  </div>
                </div>
                <div className="d-flex mt-4 w-100 justify-content-end">
                  <div className="payment-mode-box rounded-1 p-2">
                    <div className="row col-12 lh-lg">
                      <div className="col-8 text-end">Amount Received :</div>
                      <div className="col-4 text-end">0.00</div>
                      <div className="col-8 text-end">Amount used for Payments:</div>
                      <div className="col-4 text-end">100.00</div>
                      <div className="col-8 text-end">Amount Refunded:</div>
                      <div className="col-4 text-end">0.00</div>
                      <div className="col-8 text-end">Amount in Excess:</div>
                      <div className="col-4 text-end">Rs. -100.00</div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ width: '80%' }}>
                <span>Notes (Internal use. Not visible to vendor)</span>
                <Input.TextArea style={{ minHeight: '70px' }} />
              </div>
              <div className="row col-12 mt-4">
                <div className="col-4">
                  <div className="d-flex flex-column">
                    <span>Attach File(s) to inventory adjustment</span>
                    <span style={{ fontSize: '12px' }}>
                      You can upload a maximum of 5 files, 5MB each
                    </span>
                  </div>
                  <Form.Item name="inventory_file">
                    <Upload {...uploadFile} multiple maxCount={5}>
                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                  </Form.Item>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};
export default CreateAndEditPaymentReceived;
const paymentmode = [
  {
    value: 'cash',
    label: 'Cash'
  },
  {
    value: 'check',
    label: 'Check'
  },
  {
    value: 'bank_transfer',
    label: 'Bank Transfer'
  },
  {
    value: 'bank_remittance',
    label: 'Bank Remittance'
  },
  {
    value: 'credit_card',
    label: 'Credit Card'
  }
];

const paymentDeposit = [
  {
    value: 'petty_cash',
    label: 'Petty Cash'
  },
  {
    value: 'undeposited_funds',
    label: 'Undeposited Funds'
  },
  {
    value: 'employee_reimbursements',
    label: 'Employee Reimbursements'
  },
  {
    value: 'opening_balance_adjustments',
    label: 'Opening Balance Adjustments'
  },
  {
    value: 'tds_payable',
    label: 'TDS Payable'
  }
];
