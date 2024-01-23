import { ArrowLeftOutlined } from '@ant-design/icons';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Checkbox, Form, Input, Radio, Select, Switch, Table } from 'antd';
import React from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { currenctData } from '../../../data/Currency';
const { Option } = Select;

const CreateAndEditPriceList = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const params = useParams();
  const [priceListType, setPriceListType] = useState('all_items');
  const [priceSchemeType, setPriceSchemeType] = useState('unit_price');
  const [transactionType, setTransactionType] = useState('sales');
  const [discount, setDiscount] = useState(false);
  const selectBefore = (
    <Form.Item name="percentage_type" noStyle>
      <Select>
        <Option value="markup">Markup</Option>
        <Option value="markdown">Markdown</Option>
      </Select>
    </Form.Item>
  );
  const [columns, setColumns] = useState([
    {
      title: 'ITEM DETAILS',
      dataIndex: '',
      width: '65%',
      render: (record) => {
        return (
          <>
            <div className="d-flex flex-column">
              <span>{record.name}</span>
              {record?.sku ? <span className="text-muted">SKU: {record.sku}</span> : ''}
            </div>
          </>
        );
      }
    },
    {
      title: 'SALES RATE',
      dataIndex: 'sales_rates',
      render: (record) => {
        return (
          <>
            <span>RS. {record}</span>
          </>
        );
      }
    },
    {
      title: 'PURCHASE RATE',
      dataIndex: 'purchase_rates',
      render: (record) => {
        return (
          <>
            <span>RS. {record}</span>
          </>
        );
      }
    },
    {
      title: 'CUSTOM RATE',
      dataIndex: 'custom_rate',
      render: () => {
        return (
          <>
            <Input addonAfter="RS." />
          </>
        );
      }
    }
  ]);
  const data = [
    {
      name: 'Burger',
      sku: 'dd',
      sales_rates: 150,
      purchase_rates: 200
    }
  ];
  return (
    <div className="w-100">
      <div className="w-100 bg-white p-3 border-bottom d-flex align-items-center justify-content-between ">
        <div className="d-flex align-items-center gap-4 fs-5">
          <ArrowLeftOutlined className="custom-back-button" onClick={() => navigate(-1)} />
          <span className="fw-medium">{params.id ? 'Edit' : 'New'} Item Group</span>
        </div>
        <div className="d-flex align-items-center gap-4 fs-5">
          <Button onClick={() => navigate(-1)}>Cancel</Button>
          <Button type="primary" htmlType="submit" form="conpositeForm">
            Submit
          </Button>
        </div>
      </div>
      <div
        className="w-100 position-relative "
        style={{
          maxHeight: '100vh',
          height: '100%',
          overflow: 'scroll',
          paddingBottom: '100px'
        }}
      >
        <Form
          layout="vertical"
          name="conpositeForm"
          form={form}
          initialValues={{
            transactionType: 'sales',
            percentage_type: 'markup',
            price_list_type: 'all_items',
            discount: false,
            // pricing_scheme: 'unit_price'
          }}
          onFinish={(val) => console.log(val)}
        >
          <div className="row col-12 p-4 m-0">
            <div className="col-8">
              <div className="row col-12">
                <div className="col-2">
                  <label className="text-danger">Name *</label>
                </div>
                <div className="col-5">
                  <Form.Item name="name">
                    <Input />
                  </Form.Item>
                </div>
              </div>
              <div className="row col-12">
                <div className="col-2">
                  <label>Transaction Type</label>
                </div>
                <div className="col-5">
                  <Form.Item name="transactionType">
                    <Radio.Group
                      name="radiogroup"
                      onChange={(e) => {
                        setTransactionType(e.target.value);
                      }}
                    >
                      <Radio value="sales">Sales</Radio>
                      <Radio value="purchase">Purchase</Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>
              </div>
              <div className="row col-12">
                <div className="col-2">
                  <label>Price List Type</label>
                </div>
                <div className="col-10">
                  <Form.Item name="priceListType" className="radio-field">
                    <Radio.Group
                      name="radiogroup"
                      className="radio-container w-100 d-flex"
                      onChange={(e) => setPriceListType(e.target.value)}
                    >
                      <Radio value="all_items" className="radio-item rounded-3">
                        <div className="d-flex flex-column">
                          <span className="fw-medium">All Items</span>
                          <span className="text-muted" style={{ fontSize: 12 }}>
                            Mark up or mark down the rate of all items
                          </span>
                        </div>
                      </Radio>
                      <Radio value="individual_items" className="radio-item rounded-3">
                        <div className="d-flex flex-column">
                          <span className="fw-medium">Individual Items</span>
                          <span className="text-muted" style={{ fontSize: 12 }}>
                            Customise the rate for each item individually
                          </span>
                        </div>
                      </Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>
              </div>
              <div className="row col-12">
                <div className="col-2">
                  <label>Description</label>
                </div>
                <div className="col-5">
                  <Form.Item name="description">
                    <Input.TextArea placeholder="Enter the description" />
                  </Form.Item>
                </div>
              </div>
              {priceListType === 'all_items' ? (
                <>
                  <div className="row col-12">
                    <div className="col-2">
                      <label className="text-danger">Percentage *</label>
                    </div>
                    <div className="col-5">
                      <Form.Item name="percentage">
                        <Input addonBefore={selectBefore} addonAfter="%" />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="row col-12">
                    <div className="col-2">
                      <label className="text-danger">Round Off To *</label>
                    </div>
                    <div className="col-5">
                      <Form.Item name="roundOffTo">
                        <Select
                          options={[
                            {
                              label: 'Never Mind',
                              value: 'never_mind'
                            },
                            {
                              label: 'Nearest whole number',
                              value: 'nearest_whole_number'
                            },
                            {
                              label: '0.99',
                              value: '0.99'
                            },
                            {
                              label: '0.50',
                              value: '0.50'
                            },
                            {
                              label: '0.49',
                              value: '0.49'
                            },
                            {
                              label: 'Decimal Place',
                              value: 'decimal_place'
                            }
                          ]}
                        />
                      </Form.Item>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* <div className="row col-12">
                    <div className="col-2">
                      <label className="">Pricing Scheme</label>
                    </div>
                    <div className="col-5">
                      <Form.Item name="pricing_scheme" className="radio-field">
                        <Radio.Group
                          name="radiogroup"
                          className="radio-container w-100 d-flex"
                          value={priceSchemeType}
                          onChange={(e) => setPriceSchemeType(e.target.value)}
                        >
                          <Radio value="unit_price" className="radio-item rounded-3">
                            Unit Price
                          </Radio>
                          <Radio value="volumn_item" className="radio-item rounded-3">
                            Volume Pricing
                          </Radio>
                        </Radio.Group>
                      </Form.Item>
                    </div>
                  </div> */}
                  <div className="row col-12">
                    <div className="col-2">
                      <label className="">Currency</label>
                    </div>
                    <div className="col-5">
                      <Form.Item name="currency">
                        <Select
                          showSearch={true}
                          options={currenctData?.map((val) => {
                            return {
                              label: `${val?.code}- ${val?.name}`,
                              value: val?.code
                            };
                          })}
                        />
                      </Form.Item>
                    </div>
                  </div>
                  {transactionType == 'sales' && (
                    <div className="row col-12">
                      <div className="col-2">
                        <label className="">Discount</label>
                      </div>
                      <div className="col-6">
                        <Form.Item name="discount">
                          <Checkbox
                            onChange={(e) => {
                              if (e.target.checked) {
                                setColumns([
                                  ...columns,
                                  {
                                    title: 'DISCOUNT',
                                    dataIndex: 'discount',
                                    render: () => {
                                      return (
                                        <>
                                          <Input />
                                        </>
                                      );
                                    }
                                  }
                                ]);
                              } else {
                                setColumns(columns?.filter((val) => val.dataIndex !== 'discount'));
                              }
                              setDiscount(e.target.checked);
                            }}
                          >
                            I want to include discount percentage for the items
                          </Checkbox>
                        </Form.Item>
                      </div>
                      {discount ? (
                        <span className="d-flex gap-2 align-items-center mt-0">
                          <FontAwesomeIcon icon={faCircleInfo} style={{ color: '#1162ee' }} />
                          When a price list is applied, the discount percentage will be applied only
                          if discount is enabled at the line-item level
                        </span>
                      ) : (
                        '   '
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
            {priceListType === 'individual_items' && (
              <>
                <hr />
                <div>
                  <div className="d-flex justify-content-between">
                    <span className="fs-5 fw-medium">Customise Rates in Bulk</span>
                    <span className="d-flex align-items-center gap-2">
                      Import Price List for Items
                      <Switch height={10} />
                    </span>
                  </div>
                </div>
                <div className="mt-2">
                  <Table
                    className="customise-rate-table"
                    bordered
                    columns={
                      transactionType === 'sales'
                        ? columns?.filter((val) => val.dataIndex !== 'purchase_rates')
                        : columns?.filter((val) => val.dataIndex !== 'sales_rates')
                    }
                    dataSource={data}
                    pagination={false}
                  />
                </div>
              </>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreateAndEditPriceList;
