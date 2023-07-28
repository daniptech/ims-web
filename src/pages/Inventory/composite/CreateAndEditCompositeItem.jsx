import {
  ArrowLeftOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  DownOutlined
} from '@ant-design/icons';
import { Button, Checkbox, Divider, Form, Input, Select, Space, Tooltip, Dropdown } from 'antd';
import React, { useRef, useState } from 'react';
import MultiImageUpload from '../../../components/MultiImageUpload';
import { useNavigate, useParams } from 'react-router-dom';
import { routes } from '../../../components/controller/routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faImage } from '@fortawesome/free-regular-svg-icons';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

const CreateAndEditCompositeItem = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [previewImageUrl, setPreviewImageUrl] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);
  const [items, setItems] = useState();
  const [brandName, setBrandName] = useState('');
  const inputRef = useRef(null);
  const onBrandNameInputChange = (event) => {
    setBrandName(event.target.value);
  };
  const addBrandItem = (e) => {
    e.preventDefault();
    if (items?.length) {
      setItems([...items, brandName]);
    } else {
      setItems([brandName]);
    }
    setBrandName('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };
  const [tbodyCount, setTbodyCount] = React.useState(1);
  const [anotherLine, setAnotherLine] = React.useState(1);
  const [addServices, setAddServices] = React.useState(true);
  const handleIncrement = () => {
    setTbodyCount((prevCount) => prevCount + 1);
    setAddServices(!addServices)
  };
  const handleDecrement = () => {
    setTbodyCount((prevCount) => Math.max(prevCount - 1, 1));
    setAnotherLine((prevCount) => Math.max(prevCount - 1, 1));
    setAddServices(!addServices)
  };
  const AddAnotherLine =()=>{
    setAnotherLine((prevCount) => prevCount + 1);
    setAddServices(!addServices)
  }
  return (
    <div className="w-100">
      <div className="w-100 bg-white p-3 border-bottom d-flex align-items-center justify-content-between ">
        <div className="d-flex align-items-center gap-4 fs-5">
          <ArrowLeftOutlined
            className="custom-back-button"
            onClick={() => navigate(routes.inventory.compositeItem.self)}
          />
          <span className="fw-medium">{params.id ? 'Edit' : 'New'} Composite Item</span>
        </div>
        <div className="d-flex align-items-center gap-4 fs-5">
          <Button onClick={() => navigate(routes.inventory.compositeItem.self)}>Cancel</Button>
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
        }}>
        <Form
          layout="vertical"
          name="conpositeForm"
          form={form}
          initialValues={{
            unit: 'kg',
            returnable_item: false,
            purchase_information: true,
            sales_information: true,
            inventory_track: true,
            weight_type: 'cm'
          }}
          onFinish={(val) => console.log(val)}>
          <div>
            <div className="row col-12 bg-light p-4 m-0">
              <div className="col-md-6 col-lg-8 d-flex flex-column gap-3">
                <div className="row col-12 d-flex  align-items-center">
                  <div className="col-lg-4 col-md-12">
                    <label className="text-danger">Name*</label>
                  </div>
                  <div className="col-lg-8 col-md-12">
                    <Form.Item
                      name="name"
                      className="d-flex m-0 w-100 form-item"
                      rules={[
                        {
                          required: true,
                          message: 'Please input Name!'
                        }
                      ]}>
                      <Input className="w-100" />
                    </Form.Item>
                  </div>
                </div>

                <div className="row col-12 d-flex  align-items-center">
                  <div className="col-lg-4 col-md-12">
                    <label className="d-flex align-items-center gap-1">
                      <span>SKU</span>{' '}
                      <Tooltip placement="rightTop" title="This stock Keeping Unit of the item ">
                        <QuestionCircleOutlined className="text-muted" />
                      </Tooltip>{' '}
                    </label>
                  </div>
                  <div className="col-lg-8 col-md-12">
                    <Form.Item name="sku" className="d-flex m-0 form-item">
                      <Input className="w-100" />
                    </Form.Item>
                  </div>
                </div>

                <div className="row col-12 d-flex  align-items-center">
                  <div className="col-lg-4 col-md-12">
                    <label className="d-flex align-items-center gap-1 text-danger">
                      <span>Unit*</span>{' '}
                      <Tooltip
                        placement="rightTop"
                        title="This item will be measured in terms of this unit. (e.g.: kg,dozon)">
                        <QuestionCircleOutlined className="text-muted" />
                      </Tooltip>{' '}
                    </label>
                  </div>
                  <div className="col-lg-8 col-md-12">
                    <Form.Item
                      name="unit"
                      className="d-flex m-0 form-item"
                      rules={[
                        {
                          required: true,
                          message: 'Please Select unit!'
                        }
                      ]}>
                      <Select
                        allowClear
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

                <div className="row col-12 d-flex  align-items-center">
                  <div className="col-lg-4 col-md-12"></div>
                  <div className="col-lg-8 col-md-12">
                    <Form.Item
                      name="returnable_item"
                      className="d-flex m-0 form-item"
                      valuePropName="checked">
                      <Checkbox>
                        <span>Returnable Item</span>
                        <Tooltip
                          placement="rightTop"
                          title="Enable this option if the item  is eligible for sales return">
                          <QuestionCircleOutlined className="text-muted" />
                        </Tooltip>{' '}
                      </Checkbox>
                    </Form.Item>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <MultiImageUpload
                  previewImageUrl={previewImageUrl}
                  setPreviewImageUrl={setPreviewImageUrl}
                  previewImage={previewImage}
                  setPreviewImage={setPreviewImage}
                  fileList={fileList}
                  setFileList={setFileList}
                />
              </div>
            </div>
              <div  className="p-5 bg-light">
                <div style={{ width: '80%' }} className="mb-2">
                <h6 className='text-danger'>Associate Items *</h6><br/>
               {Array.from({ length: tbodyCount }).map((_, index) => (
                  <table key={index} className="w-100 custom-table-create" style={index==0?null:{marginTop:'15px'}}>
                    <thead className="w-100">
                      <tr>
                        <th style={{ width: '34%' }} className="border">
                          ITEM DETAILS
                        </th>
                        <th style={{ width: '15%' }} className="border text-end">
                          Quantity{' '}
                        </th>
                        <th style={{ width: '15%' }} className="border text-end">
                          Selling Price
                        </th>
                        <th style={{ width: '15%' }} className="border text-end">
                          Cost Price
                        </th>
                        <th style={{ width: '6%' }} className="text-end"></th>
                      </tr>
                    </thead>
                    <tbody className="w-100">
                    {Array.from({ length: anotherLine }).map((_, index) => (
                      <tr key={index} className="">
                        <td style={{ width: '34%' }} className="border">
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
                        <td style={{ width: '15%' }} className="border">
                          <Select className="w-100" options={[]} />
                        </td>
                        <td style={{ width: '15%' }} className="border">
                          <Input className="input-field" placeholder="0.00" />
                        </td>
                        <td style={{ width: '15%' }} className="border">
                          <Input className="input-field" placeholder="0.00" />
                        </td>
                        <td style={{ width: '6%' }} className="p-3">
                          <Button type="text" onClick={handleDecrement}>
                            <FontAwesomeIcon icon={faCircleXmark} style={{ color: '#e26a6a' }} />
                          </Button>
                        </td>
                      </tr>
                      ))}
                      <tr>
                        <td  className="p-1">
                          <div className="d-flex gap-2 ">
                            <Button  type="text" style={{paddingLeft:'0px'}} onClick={AddAnotherLine}>
                              <div className="d-flex gap-2 align-items-center justify-content-center">
                                <FontAwesomeIcon icon={faCirclePlus} style={{ color: '#005eff' }} />{' '}
                                Add another line
                              </div>
                            </Button>
                            {addServices&&(<>
                            <div className="border" style={{ width: '1px', height: '20px',marginTop:'5px' }} />
                            <Button type="text" onClick={handleIncrement}>
                              <div className="d-flex gap-2 align-items-center justify-content-center">
                                <FontAwesomeIcon icon={faCirclePlus} style={{ color: '#005eff' }} />{' '}
                                Add Services
                              </div>
                            </Button>
                              </>)}
                          </div>
                        </td>
                        <td style={{ width: '15%' }} className="border text-end">
                          {' '}
                          Total (Rs.) :
                        </td>
                        <td style={{ width: '15%' }} className="border">
                          <Input className="input-field" placeholder="0.00" />
                        </td>
                        <td style={{ width: '15%' }} className="border">
                          <Input className="input-field" placeholder="0.00" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  ))}
                </div>
              </div>
            <div className="row col-12 p-4 m-0">
              <div className="col-md-6 col-lg-6 d-flex flex-column gap-3">
                <span className="fs-5 fw-semibold">Sales Information</span>
                <div className="row col-12 d-flex ">
                  <div className="col-lg-4 col-md-12">
                    <label className={`gap-1 text-danger`}>
                      <Tooltip
                        placement="rightTop"
                        title="The rate at which you're going to sell this item">
                        <span>Selling Price *</span>
                      </Tooltip>
                    </label>
                  </div>
                  <div className="col-lg-8 col-md-12">
                    <Form.Item
                      name="selling_price"
                      className="d-flex m-0 form-item"
                      rules={[
                        {
                          required: true,
                          message: 'please add selling price'
                        }
                      ]}>
                      <Input className="w-100" addonBefore={'INR'} />
                    </Form.Item>
                    <span
                      className=" w-100 d-flex justify-content-end text-primary"
                      style={{ cursor: 'pointer' }}>
                      copy from total
                    </span>
                  </div>
                </div>

                <div className="row col-12 d-flex ">
                  <div className="col-lg-4 col-md-12">
                    <label className={`gap-1 text-danger`}>
                      <Tooltip
                        placement="rightTop"
                        title="All sales transaction for this item will be tracked under this account">
                        Account *
                      </Tooltip>
                    </label>
                  </div>
                  <div className="col-lg-8 col-md-12">
                    <Form.Item
                      name="sales_account"
                      className="d-flex m-0 form-item"
                      rules={[
                        {
                          required: true,
                          message: 'please add Account'
                        }
                      ]}>
                      <Select
                        className="text-black"
                        options={[
                          {
                            label: <span className="fw-bolder text-black">Manager</span>,
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
                          }
                        ]}
                      />
                    </Form.Item>
                  </div>
                </div>

                <div className="row col-12 d-flex ">
                  <div className="col-lg-4 col-md-12">
                    <label className="gap-1">
                      <span>Description</span>
                    </label>
                  </div>
                  <div className="col-lg-8 col-md-12">
                    <Form.Item name="sales_description" className="d-flex m-0 form-item">
                      <Input.TextArea className="w-100" />
                    </Form.Item>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-6 d-flex flex-column gap-3">
                <span className="fs-5 fw-semibold">Sales Information</span>
                <div className="row col-12 d-flex ">
                  <div className="col-lg-4 col-md-12">
                    <label className={`gap-1 text-danger`}>
                      <Tooltip
                        placement="rightTop"
                        title="The rate at which you purchased this item">
                        <span>Cost Price *</span>
                      </Tooltip>
                    </label>
                  </div>
                  <div className="col-lg-8 col-md-12">
                    <Form.Item
                      name="cost_price"
                      className="d-flex m-0 form-item"
                      rules={[
                        {
                          required: true,
                          message: 'please add selling price'
                        }
                      ]}>
                      <Input className="w-100" addonBefore={'INR'} />
                    </Form.Item>
                    <span
                      className=" w-100 d-flex justify-content-end text-primary"
                      style={{ cursor: 'pointer' }}>
                      copy from total
                    </span>
                  </div>
                </div>

                <div className="row col-12 d-flex ">
                  <div className="col-lg-4 col-md-12">
                    <label className={`gap-1 text-danger`}>
                      <Tooltip
                        placement="rightTop"
                        title="All purchase transaction for this item will be tracked under this account">
                        Account *
                      </Tooltip>
                    </label>
                  </div>
                  <div className="col-lg-8 col-md-12">
                    <Form.Item
                      name="purchase_account"
                      className="d-flex m-0 form-item"
                      rules={[
                        {
                          required: true,
                          message: 'please add Account'
                        }
                      ]}>
                      <Select
                        className="text-black"
                        options={[
                          {
                            label: <span className="fw-bolder text-black">Manager</span>,
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
                          }
                        ]}
                      />
                    </Form.Item>
                  </div>
                </div>

                <div className="row col-12 d-flex ">
                  <div className="col-lg-4 col-md-12">
                    <label className="gap-1">
                      <span>Description</span>
                    </label>
                  </div>
                  <div className="col-lg-8 col-md-12">
                    <Form.Item name="purchase_description" className="d-flex m-0 form-item">
                      <Input.TextArea className="w-100" />
                    </Form.Item>
                  </div>
                </div>

                <div className="row col-12 d-flex ">
                  <div className="col-lg-4 col-md-12">
                    <label className="gap-1">
                      <Tooltip
                        placement="rightTop"
                        title="All sales transaction for this item will be tracked under this account">
                        Preferred Vendor
                      </Tooltip>
                    </label>
                  </div>
                  <div className="col-lg-8 col-md-12">
                    <Form.Item name="preferred_vendor" className="d-flex m-0 form-item">
                      <Select
                        className="text-black"
                        options={[
                          {
                            label: 'Jack',
                            value: 'jack'
                          },
                          {
                            label: 'Lucy',
                            value: 'lucy'
                          }
                        ]}
                        showSearch
                      />
                    </Form.Item>
                  </div>
                </div>
              </div>
            </div>

            <hr style={{ marginLeft: '25px', marginRight: '25px' }} />

            <div className="row col-12 p-4 m-0">
              <div className="col-md-6 col-lg-6 d-flex flex-column gap-3">
                <div className="row col-12 d-flex ">
                  <div className="col-lg-4 col-md-12">
                    <label className="gap-1">
                      <span>Dimensions</span>{' '}
                      <span className="text-muted" style={{ fontSize: '12px' }}>
                        (Length X Width X Height)
                      </span>
                    </label>
                  </div>
                  <div className="col-lg-8 col-md-12">
                    <div className="d-flex border-1 w-100 text-muted align-items-center dimensions-input-box">
                      <Form.Item name="dimension_length" className="d-flex m-0 form-item w-25">
                        <Input className="border-0 dimensions-input" />
                      </Form.Item>
                      X
                      <Form.Item name="dimension_width" className="d-flex m-0 form-item w-25">
                        <Input className="border-0 dimensions-input" />
                      </Form.Item>
                      X
                      <Form.Item name="dimension_height" className="d-flex m-0 form-item w-50">
                        <Input
                          className="border-0 dimensions-input"
                          addonAfter={
                            <Form.Item name="weight_type" noStyle>
                              <Select
                                className="border-0 dimention_addonAfter"
                                options={[
                                  { labal: 'cm', value: 'cm' },
                                  { labal: 'in', value: 'in' }
                                ]}></Select>
                            </Form.Item>
                          }
                        />
                      </Form.Item>
                    </div>
                  </div>
                </div>

                <div className="row col-12 d-flex ">
                  <div className="col-lg-4 col-md-12">
                    <label className="gap-1">
                      <span>Manufacturer</span>
                    </label>
                  </div>
                  <div className="col-lg-8 col-md-12">
                    <Form.Item name="manufacturer" className="d-flex m-0 form-item">
                      <Input className="w-100" />
                    </Form.Item>
                  </div>
                </div>

                <div className="row col-12 d-flex ">
                  <div className="col-lg-4 col-md-12">
                    <label className="d-flex align-items-center gap-1">
                      <span>UPC</span>
                      <Tooltip
                        placement="rightTop"
                        title="Twelve digit unique number associated with the bar code (Universal Product Code)">
                        <QuestionCircleOutlined className="text-muted" />
                      </Tooltip>
                    </label>
                  </div>
                  <div className="col-lg-8 col-md-12">
                    <Form.Item name="upc" className="d-flex m-0 form-item">
                      <Input className="w-100" />
                    </Form.Item>
                  </div>
                </div>

                <div className="row col-12 d-flex ">
                  <div className="col-lg-4 col-md-12">
                    <label className="d-flex align-items-center gap-1">
                      <span>EAN</span>
                      <Tooltip
                        placement="rightTop"
                        title="Thirteen digit unique number (International Article Number)">
                        <QuestionCircleOutlined className="text-muted" />
                      </Tooltip>
                    </label>
                  </div>
                  <div className="col-lg-8 col-md-12">
                    <Form.Item name="ean" className="d-flex m-0 form-item">
                      <Input className="w-100" />
                    </Form.Item>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-6 d-flex flex-column gap-3">
                <div className="row col-12 d-flex ">
                  <div className="col-lg-4 col-md-12">
                    <label className="gap-1">
                      <span>Weight</span>
                    </label>
                  </div>
                  <div className="col-lg-8 col-md-12">
                    <Form.Item name="weight" className="d-flex m-0 form-item">
                      <Input
                        className="w-100"
                        addonAfter={
                          <Form.Item name="weight_type" noStyle>
                            <Select
                              options={[
                                { labal: 'kg', value: 'kg' },
                                { labal: 'g', value: 'g' },
                                { labal: 'lb', value: 'lb' },
                                { labal: 'oz', value: 'oz' }
                              ]}></Select>
                          </Form.Item>
                        }
                      />
                    </Form.Item>
                  </div>
                </div>

                <div className="row col-12 d-flex ">
                  <div className="col-lg-4 col-md-12">
                    <label className="gap-1">
                      <span>Brand</span>
                    </label>
                  </div>
                  <div className="col-lg-8 col-md-12">
                    <Form.Item name="brand" className="d-flex m-0 form-item">
                      <Select
                        options={
                          items?.length
                            ? items?.map((item) => ({
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
                              }}>
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
                                disabled={!brandName}>
                                Add item
                              </Button>
                            </Space>
                          </>
                        )}>
                        <Input />
                      </Select>
                    </Form.Item>
                  </div>
                </div>

                <div className="row col-12 d-flex ">
                  <div className="col-lg-4 col-md-12">
                    <label className="d-flex align-items-center gap-1">
                      <span>MPN </span>
                      <Tooltip
                        placement="rightTop"
                        title="Menufacturing Part Number  unabbiguously identifies a part design">
                        <QuestionCircleOutlined className="text-muted" />
                      </Tooltip>
                    </label>
                  </div>
                  <div className="col-lg-8 col-md-12">
                    <Form.Item name="mpn" className="d-flex m-0 form-item">
                      <Input className="w-100" />
                    </Form.Item>
                  </div>
                </div>

                <div className="row col-12 d-flex ">
                  <div className="col-lg-4 col-md-12">
                    <label className="d-flex align-items-center gap-1">
                      <span>ISBN </span>
                      <Tooltip
                        placement="rightTop"
                        title="Thirteen digit unique commercial  Book identifier (International Standard Book Number)">
                        <QuestionCircleOutlined className="text-muted" />
                      </Tooltip>
                    </label>
                  </div>
                  <div className="col-lg-8 col-md-12">
                    <Form.Item name="isnb" className="d-flex m-0 form-item">
                      <Input className="w-100" />
                    </Form.Item>
                  </div>
                </div>
              </div>
            </div>

            <hr style={{ marginLeft: '25px', marginRight: '25px' }} />

            <div className="row col-12 p-4 m-0 gap-3">
              <span className="fs-6 fw-semibold">Additional Information</span>
              <div className="col-md-6 col-lg-6">
                <div className="row col-12 d-flex ">
                  <div className="col-lg-4 col-md-12 mb-1">
                    <label className="gap-1 text-danger">
                      <Tooltip
                        placement="rightTop"
                        title="The account which tracks the inventory of this item">
                        <span
                          style={{
                            borderBottomStyle: 'dashed',
                            borderBottomColor: '#969696'
                          }}>
                          Inventory Account *
                        </span>
                      </Tooltip>
                    </label>
                  </div>
                  <div className="col-lg-8 col-md-12">
                    <Form.Item
                      name="inventory_account"
                      className="d-flex m-0 form-item"
                      rules={[
                        {
                          required: true,
                          message: 'please add Account'
                        }
                      ]}>
                      <Select
                        allowClear
                        className="text-black"
                        options={[
                          {
                            label: <span className="fw-bolder text-black">Manager</span>,
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
                          }
                        ]}
                      />
                    </Form.Item>
                  </div>
                </div>
              </div>
              <div className="row col-12 m-0 p-0">
                <div className="col-md-6 col-lg-6 m-0 pr-0">
                  <div className="row col-12 d-flex ">
                    <div className="col-lg-4 col-md-12 mb-1">
                      <label className="d-flex align-items-center gap-1">
                        <label className="gap-1">
                          <Tooltip
                            placement="rightTop"
                            title="The stock available for sale at the beginning of the accounting period">
                            <span
                              style={{
                                borderBottomStyle: 'dashed',
                                borderBottomColor: '#969696'
                              }}>
                              Opening Stock
                            </span>
                          </Tooltip>
                        </label>
                      </label>
                    </div>
                    <div className="col-lg-8 col-md-12">
                      <Form.Item name="opening_stock" className="d-flex m-0 form-item">
                        <Input className="w-100" />
                      </Form.Item>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-6">
                  <div className="row col-12 d-flex ">
                    <div className="col-lg-4 col-md-12 mb-1">
                      <label className="d-flex align-items-center gap-1">
                        <label className="gap-1">
                          <Tooltip
                            placement="rightTop"
                            title="The rate at which you bought each unit of the opening stock">
                            <span
                              style={{
                                borderBottomStyle: 'dashed',
                                borderBottomColor: '#969696'
                              }}>
                              Opening Stock Rate per Unit
                            </span>
                          </Tooltip>
                        </label>
                      </label>
                    </div>
                    <div className="col-lg-8 col-md-12">
                      <Form.Item
                        name="opening_stock_rate_per_unit"
                        className="d-flex m-0 form-item">
                        <Input className="w-100" />
                      </Form.Item>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-6">
                <div className="row col-12 d-flex ">
                  <div className="col-lg-4 col-md-12 mb-1">
                    <label className="d-flex align-items-center gap-1">
                      <label className="gap-1">
                        <Tooltip
                          placement="rightTop"
                          title="When the stock reaches the reorder point, a notification will be sent to you">
                          <span
                            style={{
                              borderBottomStyle: 'dashed',
                              borderBottomColor: '#969696'
                            }}>
                            Reorder Point
                          </span>
                        </Tooltip>
                      </label>
                    </label>
                  </div>
                  <div className="col-lg-8 col-md-12">
                    <Form.Item name="reorder_point" className="d-flex m-0 form-item">
                      <Input className="w-100" />
                    </Form.Item>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreateAndEditCompositeItem;
