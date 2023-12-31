import {
  ArrowLeftOutlined,
  DownOutlined,
  SearchOutlined,
  SettingOutlined,
  UploadOutlined
} from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Form, Input, Select, DatePicker, Dropdown, Upload, message, Divider } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { faCircleXmark, faImage } from '@fortawesome/free-regular-svg-icons';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

const CreateAndEditCreditNotes = () => {
  const navigate = useNavigate();
  const params = useParams();
  const onSearch = (value) => console.log(value);
  const { Option } = Select;
  const onChange = (value) => {
    console.log(`selected ${value}`);
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
    <div className="w-100">
      <div className="w-100 bg-white p-3 border-bottom d-flex align-items-center justify-content-between ">
        <div className="d-flex align-items-center gap-4 fs-5">
          <ArrowLeftOutlined className="custom-back-button" onClick={() => navigate(-1)} />
          <span className="fw-medium">{params.id ? 'Edit' : 'New'} Credit Note</span>
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
            <div className="w-100 row col-12 bg-light p-4">
              <div className="col-6">
                <div className="row col-12 d-flex  align-items-center ">
                  <div className="col-3">
                    <label className="d-flex align-items-center gap-1 text-danger">
                      <span>Customer Name *</span>{' '}
                    </label>
                  </div>
                  <div className="col-9">
                    <div
                      className="d-flex align-items-center rounded-start border-start border-top border-bottom"
                      style={{ height: '34px' }}
                    >
                      <Select
                        style={{
                          width: '90%'
                        }}
                        showSearch
                        bordered={false}
                        placeholder="Select or add customer"
                        optionFilterProp="children"
                        onChange={onChange}
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={[
                          {
                            value: 'test_customer',
                            label: 'Test Customer'
                          },
                          {
                            value: 'customer1',
                            label: 'Customer 1'
                          },
                          {
                            value: 'customer2',
                            label: 'Customer 2'
                          }
                        ]}
                      />
                      <div
                        className="border-start align-items-center bg-primary rounded-end"
                        style={{
                          width: '50px',
                          height: '35px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        <SearchOutlined
                          onClick={() => console.log('search')}
                          style={{ color: '#fff', fontSize: '20px' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row col-12 p-4 m-0">
              <div className="col-6 d-flex flex-column gap-3">
                <div className="row col-12 d-flex  align-items-center">
                  <div className="col-3">
                    <label className="d-flex align-items-center gap-1 text-danger">
                      <span>Credit Note# *</span>
                    </label>
                  </div>
                  <div className="col-6">
                    <Form.Item name="company_name" className="d-flex m-0 form-item">
                      <Input placeholder="CN-00004" suffix={<SettingOutlined />} />
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
                    <label className="d-flex align-items-center gap-1 text-danger">
                      <span>Credit Note Date *</span>
                    </label>
                  </div>
                  <div className="col-6">
                    <Form.Item name="sales_order_date" className="d-flex m-0 form-item">
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
                    <label className="d-flex align-items-center gap-1">
                      <span>Salesperson</span>
                    </label>
                  </div>
                  <div className="col-6">
                    <Form.Item name="challan_type" className="d-flex m-0 form-item">
                      <Select
                        style={{
                          width: '90%'
                        }}
                        showSearch
                        placeholder="Let your customer know what this credit Notes is for."
                        optionFilterProp="children"
                        onChange={onChange}
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={[
                          {
                            value: 'test',
                            label: 'Test'
                          }
                        ]}
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className="row col-12 d-flex  align-items-center">
                  <div className="col-3">
                    <label className="d-flex align-items-center gap-1 text-danger">
                      <span>Subject</span>
                    </label>
                  </div>
                  <div className="col-6">
                    <Form.Item name="sales_order_date" className="d-flex m-0 form-item">
                      <Input.TextArea showCount maxLength={100} />
                    </Form.Item>
                  </div>
                </div>
              </div>
              <Divider className="mt-4 mb-4" />

              <div style={{ width: '80%' }} className="mb-2">
                <table className="w-100 custom-table-create">
                  <thead className="w-100">
                    <tr className="border-bottom border-top">
                      <th style={{ width: '34%' }} className="border-end">
                        ITEM DETAILS
                      </th>
                      <th style={{ width: '15%' }} className="border-end text-end">
                        Account
                      </th>
                      <th style={{ width: '15%' }} className="border-end text-end">
                        QUANTITY
                      </th>
                      <th style={{ width: '15%' }} className="border-end text-end">
                        RATE
                      </th>
                      <th style={{ width: '15%' }} className="border-end text-end">
                        DISCOUNT
                      </th>
                      <th style={{ width: '15%' }} className=" text-end">
                        AMOUNT
                      </th>
                      <th style={{ width: '6%' }} className="text-end"></th>
                    </tr>
                  </thead>
                  <tbody className="w-100">
                    <tr className="border-bottom">
                      <td style={{ width: '34%' }} className="border-end">
                        <div className="d-flex gap-2">
                          <div className="p-1 table-img">
                            <FontAwesomeIcon
                              icon={faImage}
                              style={{ color: '#c7c7c7', height: 25 }}
                            />
                          </div>
                          <Input
                            className="item-detail"
                            placeholder="Type or Click to select an item."
                          />
                        </div>
                      </td>
                      <td style={{ width: '15%' }} className="border-end">
                        <Select
                          placeholder="Select Account"
                          className="w-100"
                          options={[
                            {
                              value: 'advance_tex',
                              label: 'Advance Tex'
                            },
                            {
                              value: 'employee_advance',
                              label: 'Employee Advance'
                            },
                            {
                              value: 'prepaid_expenses',
                              label: 'Prepaid Expenses'
                            }
                          ]}
                        />
                      </td>
                      <td style={{ width: '15%' }} className="border-end">
                        <Input className="input-field" placeholder="1.00" />
                      </td>
                      <td style={{ width: '15%' }} className="border-end">
                        <Input className="input-field" placeholder="0.00" />
                      </td>
                      <td style={{ width: '15%' }} className="border-end">
                        <Input className="input-field" placeholder="0.00" />
                        <Select
                          className="w-100"
                          options={[
                            {
                              value: 'percentage',
                              label: '%'
                            },
                            {
                              value: 'rs',
                              label: 'Rs.'
                            }
                          ]}
                        />
                      </td>
                      <td style={{ width: '15%' }} className="text-end">
                        0.00
                      </td>
                      <td style={{ width: '6%' }} className="p-3">
                        <FontAwesomeIcon icon={faCircleXmark} style={{ color: '#e26a6a' }} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style={{ width: '80%' }}>
                <div className="row col-12">
                  <div className="col-4 d-flex flex-column justify-content-between">
                    <div>
                      <Dropdown.Button
                        icon={<DownOutlined />}
                        menu={{
                          items: [
                            {
                              label: 'Add another line',
                              key: 1
                            },
                            {
                              label: 'Add item in bulk',
                              key: 2
                            }
                          ]
                        }}
                      >
                        <div className="d-flex gap-2 align-items-center justify-content-center">
                          <FontAwesomeIcon icon={faCirclePlus} style={{ color: '#005eff' }} /> Add
                          another line
                        </div>
                      </Dropdown.Button>
                    </div>
                    <div>
                      <span>Customer Notes</span>
                      <div>
                        <Form.Item name="customer_notes">
                          <Input.TextArea placeholder="will be displayed on credit notes" />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                  <div className="col-8">
                    <div className="w-100 row col-12 bg-light rounded-2 p-2">
                      <div className="col-6">Sub Total</div>
                      <div className="col-6 text-end text-muted">0.00</div>
                      <div className="col-4">Discount</div>
                      <div className="col-4">
                        <Form.Item name="discount">
                          <Input
                            className="w-100"
                            addonAfter={
                              <Form.Item name="discount_type" noStyle>
                                <Select>
                                  <Option value="%">%</Option>
                                  <Option value="rs">Rs</Option>
                                </Select>
                              </Form.Item>
                            }
                          />
                        </Form.Item>
                      </div>
                      <div className="col-4 text-end text-muted">0.00</div>
                      <div className="col-4">
                        <Form.Item name="adjustment">
                          <Input className="w-100" placeholder="Adjustment" />
                        </Form.Item>
                      </div>
                      <div className="col-4">
                        <Form.Item name="discount">
                          <Input className="w-100" />
                        </Form.Item>
                      </div>
                      <div className="col-4 text-end text-muted">0.00</div>
                      <div className="col-4">TCS</div>
                      <div className="col-4">
                        <Form.Item name="discount">
                          <Select options={[]} className="w-100" />
                        </Form.Item>
                      </div>
                      <div className="col-4 text-end text-muted">0.00</div>
                      <div className="col-6 fw-medium">Total</div>
                      <div className="col-6 text-end fw-medium">0.00</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row col-12 bg-light p-4 m-0">
              <div className="col-6 border-end">
                <span>Terms & Conditions</span>
                <Form.Item name="t&c">
                  <Input.TextArea
                    style={{ minHeight: '70px' }}
                    placeholder="Enter the terms and conditions of your business to be displayed in your transaction"
                  />
                </Form.Item>
              </div>
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
        </Form>
      </div>
    </div>
  );
};
export default CreateAndEditCreditNotes;
