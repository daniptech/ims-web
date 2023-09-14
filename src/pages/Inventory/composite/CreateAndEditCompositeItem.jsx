import { ArrowLeftOutlined, PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Divider,
  Dropdown,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Tooltip,
  message
} from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import MultiImageUpload from '../../../components/MultiImageUpload';
import { useNavigate, useParams } from 'react-router-dom';
import { routes } from '../../../controller/routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faImage } from '@fortawesome/free-regular-svg-icons';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { SettingTwoTone } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { getBrand, getManufacturer } from '../../../controller/api/FieldsDataServices';
import { item } from '../../../controller/constants';
import Brands from '../../../components/modals/Brands';
import Manufacturer from '../../../components/modals/Manufacturer';
import { getVendor } from '../../../controller/api/purchase/vendorServices';
import { getItem, getSingleItem } from '../../../controller/api/inventory/itemService';
import {
  createCompositeItem,
  updateCompositeItem
} from '../../../controller/api/inventory/compositeServices';
import { Bars } from 'react-loader-spinner';
import { reverse } from 'named-urls';

const CreateAndEditCompositeItem = () => {
  const params = useParams();
  const navigate = useNavigate();
  const currentUserData = useSelector((state) => state.user.currentuser);
  const [form] = Form.useForm();
  const [previewImageUrl, setPreviewImageUrl] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);
  const [vendor, setVendor] = useState([]);
  const [loader, setloader] = useState(false);
  const handleVendor = () => {
    getVendor({ organizationId: currentUserData?.organizationId })
      .then((res) => setVendor(res.data))
      .catch((err) => console.log('err ======>', err));
  };

  const [brandList, setBrandList] = useState([]);
  const [brandModalOpen, setBrandModalOpen] = useState(false);
  const [manufacturerModalOpen, setManufacturerModalOpen] = useState(false);
  const [manufacturerList, setManufacturerList] = useState([]);
  const [associatedItem, setAssociatedItem] = useState([
    {
      itemDetail: '',
      quantity: 1,
      sellingPrice: 0,
      costPrice: 0,
      isFilled: false
    }
  ]);
  const [associatedServicesShow, setAssociatedServicesShow] = useState(false);
  const [associatedServices, setAssociatedServices] = useState([
    {
      servicesDetail: '',
      quantity: 1,
      sellingPrice: 0,
      costPrice: 0,
      isFilled: false
    }
  ]);
  const [associatedItemDropDownData, setAssociatedItemDropDownData] = useState([]);
  const [associatedServicesDropDownData, setAssociatedServicesDropDownData] = useState([]);
  const [associatedItemTotal, setAssociatedItemTotal] = useState({
    costPriceTotal: 0,
    sellingPriceTotal: 0
  });
  const [associatedServicesTotal, setAssociatedServicesTotal] = useState({
    costPriceTotal: 0,
    sellingPriceTotal: 0
  });
  useEffect(() => {
    if (currentUserData?.organizationId) {
      getItem({ organizationId: currentUserData?.organizationId }).then((res) => {
        if (res?.data) {
          setAssociatedItemDropDownData(res?.data?.filter((val) => val.type !== 'Services'));
          setAssociatedServicesDropDownData(res?.data?.filter((val) => val.type == 'Services'));
        }
      });
    }
    if (params?.id) {
      setloader(true);
      handleVendor();
      getSingleItem({ id: params.id }, { organizationId: currentUserData?.organizationId })
        .then((res) => {
          form.setFieldsValue({
            ...res.data,
            dimension_length: res?.data?.dimensions?.length,
            dimension_width: res?.data?.dimensions?.width,
            dimension_height: res?.data?.dimensions?.height,
            ...res?.data?.inventoryInfo,
            cost_price: res?.data?.purchaseInfo?.costPrice,
            purchase_account: res?.data?.purchaseInfo?.account,
            purchase_description: res?.data?.purchaseInfo?.description,
            preferred_vendor: res?.data?.purchaseInfo?.preferredVendorId,
            sellingPrice: res?.data?.sellingInfo?.sellingPrice,
            sales_account: res?.data?.sellingInfo?.account,
            sales_description: res?.data?.sellingInfo?.description
          });
          const associtedItemData = res.data?.associatedItems?.map((val) => {
            return {
              itemDetail: val.item,
              quantity: val.quantity,
              sellingPrice: val.sellingPrice,
              costPrice: val.costPrice,
              isFilled: true
            };
          });
          const filterdeletedasscoiatedItem = associtedItemData?.filter((val) => {
            if (val?.itemDetail) {
              return val;
            }
          });
          if (filterdeletedasscoiatedItem?.length) {
            setAssociatedItem(filterdeletedasscoiatedItem);
          }
          associtedItemTotal(filterdeletedasscoiatedItem);
          const associtedServicesData = res.data?.associatedServices?.map((val) => {
            return {
              servicesDetail: val.item,
              quantity: val.quantity,
              sellingPrice: val.sellingPrice,
              costPrice: val.costPrice,
              isFilled: true
            };
          });
          const filterdeletedasscoiatedservices = associtedServicesData?.filter((val) => {
            if (val?.itemDetail) {
              return val;
            }
          });
          if (filterdeletedasscoiatedservices?.length) {
            setAssociatedServicesShow(true);
            setAssociatedServices(filterdeletedasscoiatedservices);
          }
          associtedServicesTotal(filterdeletedasscoiatedservices);
          setloader(false);
        })
        .catch((err) => {
          if (err?.response?.data?.error?.code == 500) {
            setloader(false);
            message.error(err?.response?.data?.error?.message);
            navigate(routes?.inventory?.compositeItem?.self);
          }
        });
    }
  }, [currentUserData, params]);
  const getAllManufacturer = () => {
    getManufacturer()
      .then((res) => setManufacturerList(res.data))
      .catch((err) => console.log(err));
  };

  const getAllBrand = () => {
    getBrand()
      .then((res) => setBrandList(res.data))
      .catch((err) => console.log('err =====> ', err));
  };

  const handleSubmit = async (val) => {
    await Object.keys(item)?.forEach((key) => {
      if (key === 'dimensions') {
        item[key] = {
          length: val.dimension_length,
          width: val.dimension_width,
          height: val.dimension_height
        };
      } else if (key === 'inventoryInfo') {
        item[key] = {
          inventoryAccount: val.inventoryAccount,
          openingStock: val.openingStock,
          openingStockRatePerUnit: val.openingStockRatePerUnit,
          reorderPoint: val.reorderPoint
        };
      } else if (key === 'purchaseInfo') {
        item[key] = {
          costPrice: val.cost_price.toString(),
          account: val.purchase_account,
          description: val.purchase_description,
          preferredVendorId: val?.preferred_vendor
        };
      } else if (key === 'sellingInfo') {
        item[key] = {
          sellingPrice: val?.sellingPrice.toString(),
          account: val?.sales_account,
          description: val?.sales_description
        };
      } else if (key === 'isComposite') {
        item[key] = true;
      } else if (key === 'associatedItems') {
        const getFilledItem = associatedItem?.filter((val) => val?.isFilled);
        if (getFilledItem?.length) {
          const data = getFilledItem?.map((val) => {
            return {
              itemid: val?.itemDetail?.id || '',
              quantity: val.quantity,
              sellingPrice: val.sellingPrice,
              costPrice: val.costPrice
            };
          });
          item[key] = data;
        } else {
          return message.info('Add Atlest One Item');
        }
      } else if (key === 'associatedServices') {
        const getFilledItem = associatedServices?.filter((val) => val?.isFilled);
        if (getFilledItem?.length) {
          const data = getFilledItem?.map((val) => {
            return {
              itemid: val?.itemDetail?.id || '',
              quantity: val.quantity,
              sellingPrice: val.sellingPrice,
              costPrice: val.costPrice
            };
          });
          item[key] = data;
        } else {
          item[key] = [];
        }
      } else {
        if (Object.prototype.hasOwnProperty.call(val, key)) {
          item[key] = val[key];
        }
        if (key === 'organizationId') {
          item[key] = currentUserData?.organizationId;
        }
      }
    });
    if (params.id) {
      updateCompositeItem(item, { id: params?.id })
        .then((res) => {
          if (res) {
            navigate(reverse(routes.inventory.compositeItem.view, { id: params.id }));
            message.success('Composite item sucessfully updated');
          }
        })
        .catch((err) => {
          console.log('err ===>', err);
        });
    } else {
      try {
        createCompositeItem(item)
          .then((res) => {
            if (res) {
              navigate(routes.inventory.compositeItem.self);
              message.success('Composite Item sucessfully created');
            }
          })
          .catch((err) => {
            if (err.response) {
              console.log(err);
            }
          });
      } catch (err) {
        console.log('err  ==> ', err);
      }
    }
  };

  const handleAssocitedItem = (e, index) => {
    if (e.key == params.id) {
      message.info('Same Assembly Item cannot be a component on its own Inventory Assembly');
    } else {
      const data = [...associatedItemDropDownData];
      const assciatedTableData = [...associatedItem];
      const itemData = data?.filter((val, index) => e.key == val.id);
      const getFilledData = assciatedTableData?.filter((val) => val.isFilled);
      if (getFilledData.length) {
        const checkRepectedField = getFilledData?.filter((val) => {
          if (val?.itemDetail?.id == e.key) {
            return val;
          }
        });
        if (checkRepectedField?.length) {
          message.info('This item already Selected. Choose another Item.');
        } else {
          if (itemData?.length) {
            assciatedTableData[index].itemDetail = itemData[0];
            assciatedTableData[index].sellingPrice = itemData[0]?.sellingInfo?.sellingPrice;
            assciatedTableData[index].costPrice = itemData[0]?.purchaseInfo?.costPrice;
            assciatedTableData[index].isFilled = true;
          }
        }
      } else {
        if (itemData?.length) {
          assciatedTableData[index].itemDetail = itemData[0];
          assciatedTableData[index].sellingPrice = itemData[0]?.sellingInfo?.sellingPrice;
          assciatedTableData[index].costPrice = itemData[0]?.purchaseInfo?.costPrice;
          assciatedTableData[index].isFilled = true;
        }
      }
      setAssociatedItem([...assciatedTableData]);
      associtedItemTotal(assciatedTableData);
    }
  };

  const handleAssocitedServices = (e, index) => {
    console.log(e, index);
    const data = [...associatedServicesDropDownData];
    const assciatedTableData = [...associatedServices];
    const itemData = data?.filter((val, index) => e.key == val.id);
    const getFilledData = assciatedTableData?.filter((val) => val.isFilled);
    if (getFilledData.length) {
      const checkRepectedField = getFilledData?.filter((val) => {
        if (val?.servicesDetail?.id == e.key) {
          return val;
        }
      });
      if (checkRepectedField?.length) {
        message.info('This  Services item already Selected. Choose another service Item.');
      } else {
        if (itemData?.length) {
          assciatedTableData[index].servicesDetail = itemData[0];
          assciatedTableData[index].sellingPrice = itemData[0]?.sellingInfo?.sellingPrice;
          assciatedTableData[index].costPrice = itemData[0]?.purchaseInfo?.costPrice;
          assciatedTableData[index].isFilled = true;
        }
      }
    } else {
      if (itemData?.length) {
        assciatedTableData[index].servicesDetail = itemData[0];
        assciatedTableData[index].sellingPrice = itemData[0]?.sellingInfo?.sellingPrice;
        assciatedTableData[index].costPrice = itemData[0]?.purchaseInfo?.costPrice;
        assciatedTableData[index].isFilled = true;
      }
    }
    setAssociatedServices([...assciatedTableData]);
    associtedServicesTotal(assciatedTableData);
  };
  const associtedItemTotal = (data) => {
    const sellingpriceTotal = data?.reduce(
      (total, val) => total + (Number(val.sellingPrice) || 0),
      0
    );
    const costpriceTotal = data?.reduce((total, val) => total + (Number(val.costPrice) || 0), 0);
    setAssociatedItemTotal({
      costPriceTotal: costpriceTotal,
      sellingPriceTotal: sellingpriceTotal
    });
  };
  const associtedServicesTotal = (data) => {
    const sellingpriceTotal = data?.reduce(
      (total, val) => total + (Number(val.sellingPrice) || 0),
      0
    );
    const costpriceTotal = data?.reduce((total, val) => total + (Number(val.costPrice) || 0), 0);
    setAssociatedServicesTotal({
      costPriceTotal: costpriceTotal,
      sellingPriceTotal: sellingpriceTotal
    });
  };
  return (
    <div className="w-100 position-relative ">
      {loader && (
        <div
          className="d-flex justify-content-center align-items-center w-100 position-absolute"
          style={{ height: '100vh', zIndex: '11111' }}>
          <Bars
            height="130"
            width="130"
            color="#1677ff"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={loader}
          />
        </div>
      )}
      <div className={`w-100 ${loader && ' opacity-25'}`}>
        <div className="w-100 bg-white p-3 border-bottom d-flex align-items-center justify-content-between ">
          <div className="d-flex align-items-center gap-4 fs-5">
            <ArrowLeftOutlined className="custom-back-button" onClick={() => navigate(-1)} />
            <span className="fw-medium">{params.id ? 'Edit' : 'New'} Composite Item</span>
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
          }}>
          <Form
            layout="vertical"
            name="conpositeForm"
            form={form}
            initialValues={{
              unit: 'kg',
              isReturnable: false,
              purchase_information: true,
              sales_information: true,
              inventory_track: true,
              weightUnit: 'cm'
            }}
            onFinish={(val) => handleSubmit(val)}>
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
                        name="isReturnable"
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
              <div className="p-5 bg-light">
                <div style={{ width: '80%' }} className="mb-2">
                  <h6 className="text-danger">Associate Items *</h6>
                  <br />
                  <table
                    className="w-100 custom-table-create"
                    // style={index === 0 ? null : { marginTop: '15px' }}
                  >
                    <thead className="w-100">
                      <tr>
                        <th style={{ width: '34%' }} className="border bg-white">
                          ITEM DETAILS
                        </th>
                        <th style={{ width: '15%' }} className="border text-end bg-white">
                          Quantity{' '}
                        </th>
                        <th style={{ width: '15%' }} className="border text-end bg-white">
                          Selling Price
                        </th>
                        <th style={{ width: '15%' }} className="border text-end bg-white">
                          Cost Price
                        </th>
                        <th style={{ width: '6%' }} className="text-end"></th>
                      </tr>
                    </thead>
                    <tbody className="w-100">
                      {associatedItem?.map((val, index) => {
                        return (
                          <>
                            <tr className="" key={index}>
                              <td style={{ width: '34%' }} className="border bg-white">
                                <div className="d-flex gap-2">
                                  <div className="p-1 table-img">
                                    <FontAwesomeIcon
                                      icon={faImage}
                                      style={{ color: '#c7c7c7', height: 25 }}
                                    />
                                  </div>
                                  {val?.itemDetail !== '' ? (
                                    <div className="w-100 bg-light rounded-3 d-flex justify-content-between p-2">
                                      <div className="d-flex flex-column">
                                        <span className="fw-semibold">{val?.itemDetail?.name}</span>
                                        <span>SKU: {val?.itemDetail?.sku}</span>
                                      </div>
                                      <FontAwesomeIcon
                                        icon={faCircleXmark}
                                        style={{ color: '#b4b4b4', cursor: 'pointer' }}
                                        onClick={() => {
                                          const associatedTabelData = [...associatedItem];
                                          associatedTabelData[index] = {
                                            itemDetail: '',
                                            quantity: 1,
                                            sellingPrice: 0,
                                            costPrice: 0,
                                            isFilled: false
                                          };
                                          setAssociatedItem(associatedTabelData);
                                          associtedItemTotal(associatedTabelData);
                                        }}
                                      />
                                    </div>
                                  ) : (
                                    <Dropdown
                                      trigger={'click'}
                                      menu={{
                                        items: associatedItemDropDownData?.map((val, index) => {
                                          return {
                                            label: (
                                              <div className="row col-12 m-0 p-0">
                                                <div className="col-6 text-start">
                                                  <div className="d-flex flex-column">
                                                    <span className="fw-bold">{val.name}</span>
                                                    <span>SKU : {val.sku}</span>
                                                  </div>
                                                </div>
                                                <div className="col-6 text-end">
                                                  <div className="d-flex flex-column">
                                                    <span className="fw-semibold">
                                                      STOCK ON HAND
                                                    </span>
                                                    <span>-</span>
                                                  </div>
                                                </div>
                                              </div>
                                            ),
                                            key: val?.id
                                          };
                                        }),
                                        className: 'custom-dropdown',
                                        onClick: (e) => handleAssocitedItem(e, index)
                                      }}>
                                      <Input
                                        className="item-detail"
                                        placeholder="Click to select an item."
                                      />
                                    </Dropdown>
                                  )}
                                </div>
                              </td>
                              <td style={{ width: '15%' }} className="border bg-white">
                                <Tooltip
                                  title={'Add item to change the quentity'}
                                  open={val.itemDetail ? false : true}>
                                  <InputNumber
                                    className="input-field"
                                    value={val?.quantity}
                                    onChange={(value) => {
                                      const data = [...associatedItem];
                                      data[index].quantity = value;
                                      data[index].costPrice =
                                        val?.itemDetail?.purchaseInfo?.costPrice * value;
                                      data[index].sellingPrice =
                                        val?.itemDetail?.sellingInfo?.sellingPrice * value;
                                      setAssociatedItem(data);
                                      associtedItemTotal(data);
                                    }}
                                    disabled={val.itemDetail ? false : true}
                                    min={1}
                                    placeholder="0"
                                  />
                                </Tooltip>
                              </td>
                              <td style={{ width: '15%' }} className="border bg-white">
                                <span className="d-flex justify-content-end">
                                  {val.sellingPrice}
                                </span>
                              </td>
                              <td style={{ width: '15%' }} className="border bg-white">
                                <span className="d-flex justify-content-end">{val.costPrice}</span>
                              </td>
                              <td style={{ width: '6%' }} className="p-3">
                                <Button
                                  type="text"
                                  onClick={() => {
                                    const filterData = associatedItem?.filter(
                                      (val, indexID) => index !== indexID
                                    );
                                    setAssociatedItem(filterData);
                                    associtedItemTotal(filterData);
                                  }}
                                  disabled={associatedItem?.length == 1 ? true : false}>
                                  <FontAwesomeIcon
                                    icon={faCircleXmark}
                                    style={{ color: '#e26a6a' }}
                                  />
                                </Button>
                              </td>
                            </tr>
                          </>
                        );
                      })}
                      <tr>
                        <td className="p-1">
                          <div className="d-flex gap-2 ">
                            <Button
                              type="text"
                              style={{ paddingLeft: '0px' }}
                              onClick={() =>
                                setAssociatedItem([
                                  ...associatedItem,
                                  {
                                    itemDetail: '',
                                    quantity: 1,
                                    sellingPrice: 0,
                                    costPrice: 0,
                                    isFilled: false
                                  }
                                ])
                              }>
                              <div className="d-flex gap-2 align-items-center justify-content-center">
                                <FontAwesomeIcon icon={faCirclePlus} style={{ color: '#005eff' }} />{' '}
                                Add another line
                              </div>
                            </Button>
                            {!associatedServicesShow && (
                              <>
                                <div
                                  className="border"
                                  style={{ width: '1px', height: '20px', marginTop: '5px' }}
                                />
                                <Button type="text" onClick={() => setAssociatedServicesShow(true)}>
                                  <div className="d-flex gap-2 align-items-center justify-content-center">
                                    <FontAwesomeIcon
                                      icon={faCirclePlus}
                                      style={{ color: '#005eff' }}
                                    />{' '}
                                    Add Services
                                  </div>
                                </Button>
                              </>
                            )}
                          </div>
                        </td>
                        <td style={{ width: '15%' }} className="border text-end bg-white">
                          {' '}
                          Total (Rs.) :
                        </td>
                        <td style={{ width: '15%' }} className="border bg-white">
                          <span className="d-flex justify-content-end">
                            {associatedItemTotal?.sellingPriceTotal}
                          </span>
                        </td>
                        <td style={{ width: '15%' }} className="border bg-white">
                          <span className="d-flex justify-content-end">
                            {associatedItemTotal?.costPriceTotal}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              {associatedServicesShow && (
                <div className="p-5 bg-light">
                  <div style={{ width: '80%' }} className="mb-2">
                    <h6 className="text-danger">Associate Services *</h6>
                    <br />
                    <table
                      className="w-100 custom-table-create"
                      // style={index === 0 ? null : { marginTop: '15px' }}
                    >
                      <thead className="w-100">
                        <tr>
                          <th style={{ width: '34%' }} className="border bg-white">
                            SERVICES DETAILS
                          </th>
                          <th style={{ width: '15%' }} className="border text-end bg-white">
                            Quantity{' '}
                          </th>
                          <th style={{ width: '15%' }} className="border text-end bg-white">
                            Selling Price
                          </th>
                          <th style={{ width: '15%' }} className="border text-end bg-white">
                            Cost Price
                          </th>
                          <th style={{ width: '6%' }} className="text-end"></th>
                        </tr>
                      </thead>
                      <tbody className="w-100">
                        {associatedServices?.map((val, index) => {
                          return (
                            <>
                              <tr className="" key={index}>
                                <td style={{ width: '34%' }} className="border bg-white">
                                  <div className="d-flex gap-2">
                                    <div className="p-1 table-img">
                                      <FontAwesomeIcon
                                        icon={faImage}
                                        style={{ color: '#c7c7c7', height: 25 }}
                                      />
                                    </div>
                                    {val?.servicesDetail !== '' ? (
                                      <div className="w-100 bg-light rounded-3 d-flex justify-content-between p-2">
                                        <div className="d-flex flex-column">
                                          <span className="fw-semibold">
                                            {val?.servicesDetail?.name}
                                          </span>
                                          <span>SKU: {val?.servicesDetail?.sku}</span>
                                        </div>
                                        <FontAwesomeIcon
                                          icon={faCircleXmark}
                                          style={{ color: '#b4b4b4', cursor: 'pointer' }}
                                          onClick={() => {
                                            const associatedTabelData = [...associatedServices];
                                            associatedTabelData[index] = {
                                              servicesDetail: '',
                                              quantity: 1,
                                              sellingPrice: 0,
                                              costPrice: 0,
                                              isFilled: false
                                            };
                                            setAssociatedServices(associatedTabelData);
                                            associtedServicesTotal(associatedTabelData);
                                          }}
                                        />
                                      </div>
                                    ) : (
                                      <Dropdown
                                        trigger={'click'}
                                        menu={{
                                          items: associatedServicesDropDownData?.map(
                                            (val, index) => {
                                              return {
                                                label: (
                                                  <div className="row col-12 m-0 p-0">
                                                    <div className="col-6 text-start">
                                                      <div className="d-flex flex-column">
                                                        <span className="fw-bold">{val.name}</span>
                                                        <span>SKU : {val.sku}</span>
                                                      </div>
                                                    </div>
                                                    <div className="col-6 text-end">
                                                      <div className="d-flex flex-column">
                                                        <span className="fw-semibold">
                                                          STOCK ON HAND
                                                        </span>
                                                        <span>-</span>
                                                      </div>
                                                    </div>
                                                  </div>
                                                ),
                                                key: val?.id
                                              };
                                            }
                                          ),
                                          className: 'custom-dropdown',
                                          onClick: (e) => handleAssocitedServices(e, index)
                                        }}>
                                        <Input
                                          className="item-detail"
                                          placeholder="Click to select an item."
                                        />
                                      </Dropdown>
                                    )}
                                  </div>
                                </td>
                                <td style={{ width: '15%' }} className="border bg-white">
                                  <Tooltip
                                    title={'Add item to change the quentity'}
                                    open={val.servicesDetail ? false : true}>
                                    <InputNumber
                                      className="input-field"
                                      value={val?.quantity}
                                      onChange={(value) => {
                                        const data = [...associatedServices];
                                        data[index].quantity = value;
                                        data[index].costPrice =
                                          val?.servicesDetail?.purchaseInfo?.costPrice * value;
                                        data[index].sellingPrice =
                                          val?.servicesDetail?.sellingInfo?.sellingPrice * value;
                                        setAssociatedServices(data);
                                        associtedServicesTotal(data);
                                      }}
                                      disabled={val.servicesDetail ? false : true}
                                      min={1}
                                      placeholder="0"
                                    />
                                  </Tooltip>
                                </td>
                                <td style={{ width: '15%' }} className="border bg-white">
                                  <span className="d-flex justify-content-end">
                                    {val.sellingPrice}
                                  </span>
                                </td>
                                <td style={{ width: '15%' }} className="border bg-white">
                                  <span className="d-flex justify-content-end">
                                    {val.costPrice}
                                  </span>
                                </td>
                                <td style={{ width: '6%' }} className="p-3">
                                  <Button
                                    type="text"
                                    onClick={() => {
                                      const filterData = associatedServices?.filter(
                                        (val, indexID) => index !== indexID
                                      );
                                      setAssociatedServices(filterData);
                                      associtedServicesTotal(filterData);
                                    }}
                                    disabled={associatedServices?.length == 1 ? true : false}>
                                    <FontAwesomeIcon
                                      icon={faCircleXmark}
                                      style={{ color: '#e26a6a' }}
                                    />
                                  </Button>
                                </td>
                              </tr>
                            </>
                          );
                        })}
                        <tr>
                          <td className="p-1">
                            <div className="d-flex gap-2 ">
                              <Button
                                type="text"
                                style={{ paddingLeft: '0px' }}
                                onClick={() =>
                                  setAssociatedServices([
                                    ...associatedServices,
                                    {
                                      servicesDetail: '',
                                      quantity: 1,
                                      sellingPrice: 0,
                                      costPrice: 0
                                    }
                                  ])
                                }>
                                <div className="d-flex gap-2 align-items-center justify-content-center">
                                  <FontAwesomeIcon
                                    icon={faCirclePlus}
                                    style={{ color: '#005eff' }}
                                  />{' '}
                                  Add another line
                                </div>
                              </Button>
                            </div>
                          </td>
                          <td style={{ width: '15%' }} className="border text-end bg-white">
                            {' '}
                            Total (Rs.) :
                          </td>
                          <td style={{ width: '15%' }} className="border bg-white">
                            <span className="d-flex justify-content-end">
                              {associatedServicesTotal?.sellingPriceTotal}
                            </span>
                          </td>
                          <td style={{ width: '15%' }} className="border bg-white">
                            <span className="d-flex justify-content-end">
                              {associatedServicesTotal?.costPriceTotal}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

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
                        name="sellingPrice"
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
                        onClick={() =>
                          form.setFieldsValue({
                            sellingPrice:
                              associatedItemTotal?.sellingPriceTotal +
                              associatedServicesTotal?.sellingPriceTotal
                          })
                        }
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
                              label: <span className="fw-bolder text-black">Income</span>,
                              options: [
                                {
                                  label: 'Discount',
                                  value: 'discount'
                                },
                                {
                                  label: 'General Income',
                                  value: 'General Income'
                                },
                                {
                                  label: 'Interest Income',
                                  value: 'Interest Income'
                                },
                                {
                                  label: 'Late Fee Income',
                                  value: 'Late Fee Income'
                                },
                                {
                                  label: 'Other Charges',
                                  value: 'Other Charges'
                                },
                                {
                                  label: 'Sales',
                                  value: 'Sales'
                                },
                                {
                                  label: 'Shipping charge',
                                  value: 'Shipping charge'
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
                  <span className="fs-5 fw-semibold">Purchases Information</span>
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
                        onClick={() =>
                          form.setFieldsValue({
                            cost_price:
                              associatedItemTotal?.costPriceTotal +
                              associatedServicesTotal?.costPriceTotal
                          })
                        }
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
                              label: <span className="fw-bolder text-black">Expance</span>,
                              options: [
                                {
                                  label: 'Advertising and Marketing',
                                  value: 'Advertising and Marketing'
                                },
                                {
                                  label: 'Automobile Expense',
                                  value: 'Automobile Expense'
                                },
                                {
                                  label: 'Bad Debt',
                                  value: 'Bad Debt'
                                },
                                {
                                  label: 'Bank Fees and charges',
                                  value: 'Bank Fees and charges'
                                },
                                {
                                  label: 'Consultant Expense',
                                  value: 'Consultant Expense'
                                },
                                {
                                  label: 'Contract Assets',
                                  value: 'Contract Assets'
                                },
                                {
                                  label: 'Credit Card Charges',
                                  value: 'Credit Card Charges'
                                },
                                {
                                  label: 'Depereciation Expense',
                                  value: 'Depereciation Expense'
                                },
                                {
                                  label: 'IT and Internet Expense',
                                  value: 'IT and Internet Expense'
                                },
                                {
                                  label: 'Janitorial Expense',
                                  value: 'Janitorial Expense'
                                },
                                {
                                  label: 'Lodging',
                                  value: 'Lodging'
                                },
                                {
                                  label: 'Meals and Entertainment',
                                  value: 'Meals and Entertainment'
                                },
                                {
                                  label: 'Merchandise',
                                  value: 'Merchandise'
                                },
                                {
                                  label: 'Offices Supplies',
                                  value: 'Offices Supplies'
                                },
                                {
                                  label: 'Other Expense',
                                  value: 'Other Expense'
                                },
                                {
                                  label: 'Postage',
                                  value: 'Postage'
                                },
                                {
                                  label: 'Printing and Stationery',
                                  value: 'Printing and Stationery'
                                },
                                {
                                  label: 'Purchase Discounts',
                                  value: 'Purchase Discounts'
                                },
                                {
                                  label: 'Raw Expense',
                                  value: 'Raw Expense'
                                },
                                {
                                  label: 'Repaire and Maintanance',
                                  value: 'Repaire and Maintanance'
                                },
                                {
                                  label: 'Salaries and Employee Wayes',
                                  value: 'Salaries and Employee Wayes'
                                },
                                {
                                  label: 'Telephone Expense',
                                  value: 'Telephone Expense'
                                },
                                {
                                  label: 'Transportation Expense',
                                  value: 'Transportation Expense'
                                },
                                {
                                  label: 'Travel Expense',
                                  value: 'Travel Expense'
                                },
                                {
                                  label: 'Uncategorized',
                                  value: 'Uncategorized'
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
                          onClick={() => handleVendor()}
                          options={vendor?.map((val) => {
                            return {
                              label: val?.vendorDisplayName,
                              value: val.id
                            };
                          })}
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
                              <Form.Item name="dimensionUnit" noStyle>
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
                        <Select
                          onClick={() => getAllManufacturer()}
                          options={
                            manufacturerList?.length
                              ? manufacturerList?.map((item) => ({
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
                                }}>
                                <span
                                  className="d-flex align-items-center gap-3 text-primary"
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => setManufacturerModalOpen(true)}>
                                  {' '}
                                  <SettingTwoTone /> Manage Manufacturer
                                </span>
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
                            <Form.Item name="weightUnit" noStyle>
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
                          onClick={() => getAllBrand()}
                          options={
                            brandList?.length
                              ? brandList?.map((item) => ({
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
                                }}>
                                <span
                                  className="d-flex align-items-center gap-3 text-primary"
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => setBrandModalOpen(true)}>
                                  {' '}
                                  <SettingTwoTone /> Manage Brands
                                </span>
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
                      <Form.Item name="isbn" className="d-flex m-0 form-item">
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
                        name="inventoryAccount"
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
                              label: <span className="fw-bolder text-black">Stock</span>,
                              options: [
                                {
                                  label: 'Finished Goods',
                                  value: 'Finished Goods'
                                },
                                {
                                  label: 'Inventory Asset',
                                  value: 'Inventory Asset'
                                },
                                {
                                  label: 'Work In Progress',
                                  value: 'Work In Progress'
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
                        <Form.Item name="openingStock" className="d-flex m-0 form-item">
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
                        <Form.Item name="openingStockRatePerUnit" className="d-flex m-0 form-item">
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
                      <Form.Item name="reorderPoint" className="d-flex m-0 form-item">
                        <Input className="w-100" />
                      </Form.Item>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </div>
        {brandModalOpen && (
          <Brands brandModalOpen={brandModalOpen} setBrandModalOpen={setBrandModalOpen} />
        )}
        {manufacturerModalOpen && (
          <Manufacturer
            manufacturerModalOpen={manufacturerModalOpen}
            setManufacturerModalOpen={setManufacturerModalOpen}
          />
        )}
      </div>
    </div>
  );
};

export default CreateAndEditCompositeItem;
