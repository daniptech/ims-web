import {
  ArrowLeftOutlined,
  DownOutlined,
  InfoCircleOutlined,
  SearchOutlined,
  SettingOutlined,
  SettingTwoTone,
  UploadOutlined
} from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  Tooltip,
  Dropdown,
  Upload,
  message,
  Divider,
  Space
} from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { faCircleXmark, faImage } from '@fortawesome/free-regular-svg-icons';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { getPaymentTerm, getSalesPerson } from '../../../controller/api/FieldsDataServices';
import Salesperson from '../../../components/modals/Salesperson';
import PaymentTerms from '../../../components/modals/PaymentTerms';
export const CreateAndEditSalesOrder = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [salesPersonModalOpen, setSalesPersonModalOpen] = useState(false);
  const [salesPersonList, setSalesPersonList] = useState([]);
  const [paymentTerm, setPaymentTerm] = useState([]);
  const [paymentTermsModalOpen, setPaymentTermsModalOpen] = useState(false);

  const getPaymentData = () => {
    getPaymentTerm()
      .then((res) => setPaymentTerm(res.data))
      .catch((err) => console.log('err ====>', err));
  };
  const getAllSalesPerson = () => {
    getSalesPerson()
      .then((res) => setSalesPersonList(res.data))
      .catch((err) => console.log(err));
  };

  const onSearch = (value) => console.log(value);
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
          <span className="fw-medium">{params.id ? 'Edit' : 'New'} Sales Order</span>
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
            <div className="w-100 row col-12 bg-light  p-4">
              <div className="col-6">
                <div className="row col-12 d-flex align-items-center ">
                  <div className="col-3">
                    <label className="d-flex align-items-center gap-1 text-danger">
                      <span>Customer Name *</span>{' '}
                    </label>
                  </div>
                  <div className="col-9">
                    <Form.Item name="customerName" className="d-flex m-0 form-item">
                      <Select
                        style={{
                          width: '90%'
                        }}
                        showSearch
                        placeholder="Select customer"
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
                    </Form.Item>
                  </div>
                </div>
              </div>
            </div>
            <div className="row col-12 p-4 m-0">
              <div className="col-6 d-flex flex-column gap-3">
                <div className="row col-12 d-flex  align-items-center">
                  <div className="col-3">
                    <label className="d-flex align-items-center gap-1 text-danger">
                      <span>Sales Order# *</span>
                    </label>
                  </div>
                  <div className="col-6">
                    <Form.Item name="company_name" className="d-flex m-0 form-item">
                      <Input placeholder="SO-00004" suffix={<SettingOutlined />} />
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
                      <span>Sales Order Date *</span>
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
                      <span>Expected Delivery Date</span>
                    </label>
                  </div>
                  <div className="col-6">
                    <Form.Item name="expected_shipment_date" className="d-flex m-0 form-item">
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
                      Payment Terms
                      <Tooltip
                        placement="rightTop"
                        title="Select if this item is a Physical good or a service you're offering. Also, remember that once you include this item in a transaction, you can't change its type. "
                      >
                        <InfoCircleOutlined className="text-muted" />
                      </Tooltip>{' '}
                    </label>
                  </div>
                  <div className="col-6">
                    <Form.Item name="paymentTerms" className="d-flex m-0 form-item">
                      <Select
                        options={
                          paymentTerm?.length
                            ? paymentTerm?.map((val) => {
                                return {
                                  label: val?.termName,
                                  value: val.termName
                                };
                              })
                            : []
                        }
                        showSearch={true}
                        onClick={() => {
                          getPaymentData();
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
                                onClick={() => setPaymentTermsModalOpen(true)}
                              >
                                {' '}
                                <SettingTwoTone /> Manage Payment Terms
                              </span>
                            </Space>
                          </>
                        )}
                      >
                        <Input />
                      </Select>
                    </Form.Item>
                  </div>
                </div>
                <div className="row col-12 d-flex  align-items-center">
                  <div className="col-3">
                    <label className="d-flex align-items-center gap-1">Delivery Method</label>
                  </div>
                  <div className="col-6">
                    <Form.Item name="delivery_method" className="d-flex m-0 form-item">
                      <Select
                        style={{
                          width: '100%'
                        }}
                        showSearch
                        placeholder="Select or add customer"
                        optionFilterProp="children"
                        onChange={onChange}
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={[
                          {
                            value: 'best',
                            label: 'Best'
                          }
                        ]}
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className="row col-12 d-flex  align-items-center">
                  <div className="col-3">
                    <label className="d-flex align-items-center gap-1">
                      Salesperson
                      <Tooltip
                        placement="rightTop"
                        title="Select if this item is a Physical good or a service you're offering. Also, remember that once you include this item in a transaction, you can't change its type. "
                      >
                        <InfoCircleOutlined className="text-muted" />
                      </Tooltip>{' '}
                    </label>
                  </div>
                  <div className="col-6">
                    <Form.Item name="sales_person" className="d-flex m-0 form-item">
                      <Select
                        onClick={() => getAllSalesPerson()}
                        options={
                          salesPersonList?.length
                            ? salesPersonList?.map((item) => ({
                                label: item.name,
                                value: item.name
                              }))
                            : []
                        }
                        showSearch={true}
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
                                padding: '0 8px 4px'
                              }}
                            >
                              <span
                                className="d-flex align-items-center gap-3 text-primary"
                                style={{ cursor: 'pointer' }}
                                onClick={() => setSalesPersonModalOpen(true)}
                              >
                                {' '}
                                <SettingTwoTone /> Manage SalesPerson
                              </span>
                            </Space>
                          </>
                        )}
                      >
                        <Input />
                      </Select>
                    </Form.Item>
                  </div>
                </div>
              </div>
              <Divider className="mt-4 mb-4" />
              <div className="row col-12 mb-4">
                <div className="col-6">
                  <div className="row col-12 d-flex  align-items-center">
                    <div className="col-3">
                      <label className="d-flex align-items-center gap-1">Price List</label>
                    </div>
                    <div className="col-6">
                      <Form.Item name="priceList" className="d-flex m-0 form-item">
                        <Select
                          style={{
                            width: '100%'
                          }}
                          showSearch
                          placeholder="Select or add customer"
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                          }
                          options={[
                            {
                              value: 'best',
                              label: 'Best'
                            }
                          ]}
                        />
                      </Form.Item>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ width: '90%' }} className="mb-4">
                <table className="w-100 custom-table-create">
                  <thead className="w-100">
                    <tr className="">
                      <th style={{ width: '40%' }} className="border-bottom border-top border-end">
                        ITEM DETAILS
                      </th>
                      <th
                        style={{ width: '18%' }}
                        className="border-bottom border-top border-end text-end"
                      >
                        QUANTITY
                      </th>
                      <th
                        style={{ width: '18%' }}
                        className="border-bottom border-top border-end text-end"
                      >
                        RATE
                      </th>
                      <th style={{ width: '18%' }} className="border-bottom border-top text-end">
                        AMOUNT
                      </th>
                      <th style={{ width: '6%' }} className="text-end"></th>
                    </tr>
                  </thead>
                  <tbody className="w-100">
                    <tr className="">
                      <td style={{ width: '40%' }} className="border-bottom border-end">
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
                      <td style={{ width: '18%' }} className="border-bottom border-end">
                        <Input className="input-field" placeholder="0.00" />
                      </td>
                      <td style={{ width: '18%' }} className="border-bottom border-end">
                        <Input className="input-field" placeholder="0.00" />
                      </td>
                      <td style={{ width: '18%' }} className="border-bottom text-end">
                        0.00
                      </td>
                      <td style={{ width: '6%' }} className="p-3">
                        <FontAwesomeIcon icon={faCircleXmark} style={{ color: '#e26a6a' }} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style={{ width: '90%' }}>
                <div className="row col-12 justify-content-between">
                  <div className="col-4 d-flex flex-column justify-content-between">
                    <div>
                      <div
                        className="d-flex gap-2 align-items-center "
                        style={{ cursor: 'pointer' }}
                      >
                        <FontAwesomeIcon icon={faCirclePlus} style={{ color: '#005eff' }} /> Add
                        another line
                      </div>
                    </div>
                    <div>
                      <span>Customer Notes</span>
                      <div>
                        <Form.Item name="customer_notes">
                          <Input.TextArea placeholder="will be displayed on purchase order" />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="w-100 row col-12 bg-light rounded-2 p-2 lh-lg">
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
                                  {/* <Option value="%">%</Option> */}
                                  {/* <Option value="rs">Rs</Option> */}
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
                      <Divider />
                      <div className="col-6 fw-bold fs-5">Total ( Rs. )</div>
                      <div className="col-6 text-end fw-bold fs-5">0.00</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row col-12 bg-light p-4 m-0">
              <div className="col-6 border-end">
                <span>Terms & Conditions</span>
                <Form.Item name="t&c">
                  <Input.TextArea style={{ minHeight: '70px' }} />
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
      {salesPersonModalOpen && (
        <Salesperson
          salesPersonModalOpen={salesPersonModalOpen}
          setSalesPersonModalOpen={setSalesPersonModalOpen}
        />
      )}
      {paymentTermsModalOpen && (
        <PaymentTerms
          paymentTermsModalOpen={paymentTermsModalOpen}
          setPaymentTermsModalOpen={setPaymentTermsModalOpen}
        />
      )}
    </div>
  );
};
