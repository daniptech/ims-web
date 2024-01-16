import {
  ArrowLeftOutlined,
  CaretDownOutlined,
  CaretRightOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import { Button, Checkbox, Divider, Form, Input, Radio, Select, Space, Tooltip, Table } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import MultiImageUpload from '../../../components/MultiImageUpload';
import { useNavigate, useParams } from 'react-router-dom';

const CreateAndEditGroupItem = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [previewImageUrl, setPreviewImageUrl] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);
  const [brandItems, setBrandItems] = useState();
  const [brandName, setBrandName] = useState('');
  const [manufacturerName, setManufacturerName] = useState('');
  const [manufacturerItems, setManufacturerItems] = useState();
  const inputRef = useRef(null);
  const [configureAccount, setConfigureAccount] = useState(false);
  const [optionName, setOptionName] = useState('');
  const [optionItems, setOptionItems] = useState();

  const onBrandNameInputChange = (event) => {
    setBrandName(event.target.value);
  };
  const addBrandItem = (e) => {
    e.preventDefault();
    if (brandItems?.length) {
      setBrandItems([...brandItems, brandName]);
    } else {
      setBrandItems([brandName]);
    }
    setBrandName('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };
  const onmanufacturerNameInputChange = (event) => {
    setManufacturerName(event.target.value);
  };
  const addmanufacturerItem = (e) => {
    e.preventDefault();
    if (manufacturerItems?.length) {
      setManufacturerItems([...manufacturerItems, manufacturerName]);
    } else {
      setManufacturerItems([manufacturerName]);
    }
    setBrandName('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const onOptionNameInputChange = (event) => {
    setOptionName(event.target.value);
  };
  const addOptionItem = (e) => {
    e.preventDefault();
    if (optionItems?.length) {
      setOptionItems([...optionItems, optionName]);
    } else {
      setOptionItems([optionName]);
    }
    setOptionName('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };
  const [columns, setColumn] = useState([
    {
      title: 'ITEM NAME',
      dataIndex: 'item_name'
    },
    {
      title: () => {
        return (
          <div className="d-flex flex-column">
            <span className="">
              SKU{' '}
              <Tooltip placement="rightTop" title="The Stock Keeping  Unit of the item.">
                <QuestionCircleOutlined className="text-muted" />
              </Tooltip>
            </span>
          </div>
        );
      },
      dataIndex: 'sku'
    },
    {
      title: () => {
        return (
          <div className="d-flex flex-column">
            <span className="">
              COST PRICE (RS.) *{' '}
              <Tooltip
                placement="rightTop"
                title="Click here to apply the same price to all the items"
              >
                <QuestionCircleOutlined className="text-muted" />
              </Tooltip>
            </span>
            <span>Per unit</span>
          </div>
        );
      },
      dataIndex: 'opening_stock_value'
    },
    {
      title: () => {
        return (
          <div className="d-flex flex-column">
            <span className="">
              SELLING PRICE (RS.) *{' '}
              <Tooltip
                placement="rightTop"
                title="Click here to apply the same price to all the items"
              >
                <QuestionCircleOutlined className="text-muted" />
              </Tooltip>
            </span>
            <span>Per unit</span>
          </div>
        );
      },
      dataIndex: 'opening_stock_value'
    },
    {
      title: () => {
        return (
          <div className="d-flex flex-column">
            <span className="">
              UPC{' '}
              <Tooltip
                placement="rightTop"
                title="Twelve digit unique number associated with the bar code (Universal Product Code)"
              >
                <QuestionCircleOutlined className="text-muted" />
              </Tooltip>
            </span>
          </div>
        );
      },
      dataIndex: 'opening_stock_value'
    },
    {
      title: () => {
        return (
          <div className="d-flex flex-column">
            <span className="">
              EAN{' '}
              <Tooltip
                placement="rightTop"
                title="Thirteen digit unique number (International Article Number)"
              >
                <QuestionCircleOutlined className="text-muted" />
              </Tooltip>
            </span>
          </div>
        );
      },
      dataIndex: 'opening_stock_value'
    },
    {
      title: () => {
        return (
          <div className="d-flex flex-column">
            <span className="">
              ISBN
              <Tooltip
                placement="rightTop"
                title="Thirteen digit unique commercial  Book identifier (International Standard Book Number)"
              >
                <QuestionCircleOutlined className="text-muted" />
              </Tooltip>
            </span>
          </div>
        );
      },
      dataIndex: 'opening_stock_value'
    },
    {
      title: () => {
        return (
          <span className="">
            {' '}
            REORDER POINT{' '}
            <Tooltip
              placement="rightTop"
              title="Recorder level refers to the quentity of an item below which , and item is considered to be low  on stock."
            >
              <QuestionCircleOutlined className="text-muted" />
            </Tooltip>
          </span>
        );
      },
      dataIndex: 'opening_stock_value'
    }
  ]);
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
        className="w-100 position-relative"
        style={{
          maxHeight: '100vh',
          height: '100%',
          overflow: 'scroll',
          paddingBottom: '100px'
        }}
      >
        <Form
          layout="vertical"
          name="conpositeGroupForm"
          form={form}
          initialValues={{
            type: 'good',
            unit: 'kg',
            returnable_item: false,
            purchase_information: true,
            sales_information: true,
            inventory_track: true,
            weight_type: 'cm',
            item_type: 'inventory',
            filter_list: 'sales'
          }}
          onFinish={(val) => console.log(val)}
        >
          <div>
            <div className="row col-12 bg-light-subtle p-4 m-0">
              <div className="col-lg-8 d-flex flex-column gap-3">
                <div className="row col-12 d-flex  align-items-center">
                  <div className="col-lg-3 ">
                    <label className="d-flex align-items-center gap-1">
                      <span>Type</span>{' '}
                      <Tooltip
                        placement="rightTop"
                        title="Select if this item is a Physical good or a service you're offering. Also, remember that once you include this item in a transaction, you can't change its type. "
                      >
                        <QuestionCircleOutlined className="text-muted" />
                      </Tooltip>{' '}
                    </label>
                  </div>
                  <div className="col-lg-9 ">
                    <Form.Item name="type" className="d-flex m-0 form-item">
                      <Radio.Group>
                        <Radio value="good">Good</Radio>
                        <Radio value="services">Services</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </div>
                </div>
                <div className="row col-12 d-flex  align-items-center">
                  <div className="col-lg-3 ">
                    <label className="text-danger">Item Group Name*</label>
                  </div>
                  <div className="col-lg-9 ">
                    <Form.Item
                      name="group_name"
                      className="d-flex m-0 w-100 form-item"
                      rules={[
                        {
                          required: true,
                          message: 'Please input Group Name!'
                        }
                      ]}
                    >
                      <Input className="w-100" />
                    </Form.Item>
                  </div>
                </div>

                <div className="row col-12 d-flex  align-items-center">
                  <div className="col-lg-3 ">
                    <label className="d-flex align-items-center gap-1">
                      <span>Description</span>
                    </label>
                  </div>
                  <div className="col-lg-9 ">
                    <Form.Item name="sku" className="d-flex m-0 form-item">
                      <Input.TextArea className="w-100" />
                    </Form.Item>
                  </div>
                </div>

                <div className="row col-12 d-flex  align-items-center">
                  <div className="col-lg-3 "></div>
                  <div className="col-lg-9 ">
                    <Form.Item
                      name="returnable_item"
                      className="d-flex m-0 form-item"
                      valuePropName="checked"
                    >
                      <Checkbox>
                        <div className="d-flex align-items-center gap-2">
                          <span>Returnable Item</span>
                          <Tooltip
                            placement="rightTop"
                            title="Enable this option if the item  is eligible for sales return"
                          >
                            <QuestionCircleOutlined className="text-muted" />
                          </Tooltip>{' '}
                        </div>
                      </Checkbox>
                    </Form.Item>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <MultiImageUpload
                  previewImageUrl={previewImageUrl}
                  setPreviewImageUrl={setPreviewImageUrl}
                  previewImage={previewImage}
                  setPreviewImage={setPreviewImage}
                  fileList={fileList}
                  setFileList={setFileList}
                />
              </div>
              <div className="col-lg-8 d-flex flex-column gap-3">
                <div className="row col-12">
                  <div className="col-lg-3">
                    <label className="d-flex align-items-center gap-1 text-danger">
                      <span>Unit*</span>{' '}
                      <Tooltip
                        placement="rightTop"
                        title="This item will be measured in terms of this unit. (e.g.: kg,dozon)"
                      >
                        <QuestionCircleOutlined className="text-muted" />
                      </Tooltip>{' '}
                    </label>
                  </div>
                  <div className="col-lg-4">
                    <Form.Item
                      name="unit"
                      className="d-flex m-0 form-item"
                      rules={[
                        {
                          required: true,
                          message: 'Please Select unit!'
                        }
                      ]}
                    >
                      <Select
                        options={[
                          { value: 'dz', label: 'dz' },
                          { value: 'kg', label: 'kg' },
                          { value: 'in', label: 'in' },
                          { value: 'km', label: 'km' },
                          { value: 'lb', label: 'lb' },
                          { value: 'mg', label: 'mg' },
                          { value: 'ml', label: 'ml' },
                          { value: 'm', label: 'm' }
                        ]}
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className="row col-12">
                  <div className="col-lg-3">
                    <label className="d-flex align-items-center ">
                      <span>Manufacturer</span>
                    </label>
                  </div>
                  <div className="col-lg-4">
                    <Form.Item name="manufacturer" className="d-flex m-0 form-item">
                      <Select
                        options={
                          manufacturerItems?.length
                            ? manufacturerItems?.map((item) => ({
                                label: item,
                                value: item
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
                              <Input
                                placeholder="Please enter item"
                                ref={inputRef}
                                onChange={onmanufacturerNameInputChange}
                                value={manufacturerName}
                              />
                              <Button
                                type="text"
                                icon={<PlusOutlined />}
                                onClick={addmanufacturerItem}
                                disabled={!manufacturerName}
                              >
                                Add item
                              </Button>
                            </Space>
                          </>
                        )}
                      >
                        <Input />
                      </Select>
                    </Form.Item>
                  </div>
                  <div className="col-lg-1">
                    <label className="d-flex">
                      <span>Brand</span>
                    </label>
                  </div>
                  <div className="col-lg-4">
                    <Form.Item name="brand" className="d-flex m-0 form-item">
                      <Select
                        options={
                          brandItems?.length
                            ? brandItems?.map((item) => ({
                                label: item,
                                value: item
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
                              <Input
                                placeholder="Please enter item"
                                ref={inputRef}
                                onChange={onBrandNameInputChange}
                                value={brandName}
                              />
                              <Button
                                type="text"
                                icon={<PlusOutlined />}
                                onClick={addBrandItem}
                                disabled={!brandName}
                              >
                                Add item
                              </Button>
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

              <div className="col-lg-8">
                <div className="row col-12">
                  <div className="col-lg-3">
                    <label className=" text-danger">
                      <span>Multiple Items?*</span>
                    </label>
                  </div>
                  <div className="col-lg-4">
                    <Form.Item
                      name="multiple_item"
                      className="d-flex m-0 form-item"
                      valuePropName="checked"
                    >
                      <Checkbox>
                        <div className="d-flex align-items-center gap-2">
                          <span>Create Attributes and Options</span>
                        </div>
                      </Checkbox>
                    </Form.Item>
                  </div>
                </div>
                <div className="row col-12">
                  <div className="col-lg-3"></div>
                  <div className="col-lg-4">
                    <div>
                      <label className=" text-danger">
                        <span>Attribute*</span>
                      </label>
                      <Form.Item name="attribute" className="d-flex m-0 form-item mt-2">
                        <Select
                          showSearch
                          placeholder="eg: color"
                          optionFilterProp="children"
                          options={[
                            {
                              value: 'color',
                              label: 'Color'
                            },
                            {
                              value: 'lucy',
                              label: 'Lucy'
                            },
                            {
                              value: 'tom',
                              label: 'Tom'
                            }
                          ]}
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="col-lg-5">
                    <div>
                      <label className="text-danger">
                        <span>Options*</span>
                      </label>
                      <div className="d-flex justify-content-between align-items-center mt-2">
                        <Form.Item
                          name="options"
                          className="d-flex m-0 form-item"
                          style={{ width: '90%' }}
                        >
                          <Form.Item name="brand" className="d-flex m-0 form-item">
                            <Select
                              mode="multiple"
                              allowClear
                              auto
                              options={
                                optionItems?.length
                                  ? optionItems?.map((item) => ({
                                      label: item,
                                      value: item
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
                                    <Input
                                      placeholder="Please enter item"
                                      ref={inputRef}
                                      onChange={onOptionNameInputChange}
                                      value={optionName}
                                    />
                                    <Button
                                      type="text"
                                      icon={<PlusOutlined />}
                                      onClick={addOptionItem}
                                      disabled={!optionName}
                                    >
                                      Add item
                                    </Button>
                                  </Space>
                                </>
                              )}
                            >
                              <Input />
                            </Select>
                          </Form.Item>
                        </Form.Item>
                        <DeleteOutlined className="text-danger" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row col-12 mt-2">
                  <div className="col-lg-3"></div>
                  <div className="col-lg-4 d-flex gap-2 align-items-center">
                    <PlusCircleOutlined className="text-primary" /> Add more attributes
                  </div>
                </div>
              </div>
            </div>
            <div className="row col-12 w-100 m-0 bg-light p-2">
              <div className="col-6 ">
                <div className="d-flex align-items-center gap-3">
                  <label>Select your Item Type:</label>
                  <Form.Item name="item_type" className="d-flex m-0 form-item">
                    <Radio.Group name="radiogroup" defaultValue="inventory">
                      <Radio value="inventory">Inventory</Radio>
                      <Radio value="non_nventory">Non-Inventory</Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>
              </div>
              <div className="col-6 text-end">
                <Form.Item name="filter_list" className="d-flex m-0 form-item" hidden="true">
                  <Radio.Group name="radiogroup">
                    <Radio value="sales">Sales Only</Radio>
                    <Radio value="purchase">Purchase Only</Radio>
                    <Radio value="both">Both</Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
            </div>
            <div className="row col-12 m-0 p-2">
              <Table
                columns={columns}
                locale={{
                  emptyText: 'Please enter attributes.'
                }}
              />
            </div>
            <div className="row col-12 w-100 m-0 p-2 mb-5">
              <Button
                type="link"
                className="fs-6 d-flex p-0 align-items-center"
                onClick={() => setConfigureAccount(!configureAccount)}
              >
                {' '}
                {configureAccount ? <CaretDownOutlined /> : <CaretRightOutlined />} Configure
                Accounts
                <Tooltip
                  placement="rightTop"
                  title="By default  ant item group will be associated with the following 3 account - sales,cost of goods and inventory asset. you can edit this using the Configure Accounts option"
                >
                  <QuestionCircleOutlined className="text-muted" />
                </Tooltip>
              </Button>
              {configureAccount && (
                <>
                  <div className="col-3">
                    <div>
                      <label className="">
                        <span>Sales Account </span>
                      </label>
                      <div className="d-flex justify-content-between align-items-center mt-2">
                        <Form.Item
                          name="sales_account"
                          className="d-flex m-0 form-item"
                          style={{ width: '90%' }}
                        >
                          <Select
                            options={[
                              {
                                label: 'Stock',
                                options: [
                                  {
                                    label: 'Finished Goods',
                                    value: 'jack'
                                  },
                                  {
                                    label: 'Inventory Asset',
                                    value: 'lucy'
                                  },
                                  {
                                    label: 'Work  In Progress',
                                    value: 'lucy'
                                  }
                                ]
                              }
                            ]}
                          />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div>
                      <label className="">
                        <span>Purchase Account </span>
                      </label>
                      <div className="d-flex justify-content-between align-items-center mt-2">
                        <Form.Item
                          name="sales_account"
                          className="d-flex m-0 form-item"
                          style={{ width: '90%' }}
                        >
                          <Select
                            options={[
                              {
                                label: 'Stock',
                                options: [
                                  {
                                    label: 'Finished Goods',
                                    value: 'jack'
                                  },
                                  {
                                    label: 'Inventory Asset',
                                    value: 'lucy'
                                  },
                                  {
                                    label: 'Work  In Progress',
                                    value: 'lucy'
                                  }
                                ]
                              }
                            ]}
                          />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div>
                      <label className="">
                        <span>Inventory Account</span>
                      </label>
                      <div className="d-flex justify-content-between align-items-center mt-2">
                        <Form.Item
                          name="sales_account"
                          className="d-flex m-0 form-item"
                          style={{ width: '90%' }}
                        >
                          <Select
                            options={[
                              {
                                label: 'Stock',
                                options: [
                                  {
                                    label: 'Finished Goods',
                                    value: 'jack'
                                  },
                                  {
                                    label: 'Inventory Asset',
                                    value: 'lucy'
                                  },
                                  {
                                    label: 'Work  In Progress',
                                    value: 'lucy'
                                  }
                                ]
                              }
                            ]}
                          />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreateAndEditGroupItem;
