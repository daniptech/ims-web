import { ArrowLeftOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Tabs, Tooltip, message } from 'antd';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import OtherDetail from '../Tabs/OtherDetail';
import Address from '../Tabs/Address';
import BankDetails from '../Tabs/BankDetails';
import { ContactPerson } from '../Tabs/ContactPerson';
import { useState } from 'react';
import { vendorItem } from '../../../controller/constants';
import { createVendor, getSingleVendor, updateVendor } from '../../../controller/api/purchase/vendorServices';
import { routes } from '../../../controller/routes';
import { reverse } from 'named-urls';
import { useEffect } from "react";
import { useSelector } from "react-redux";
const { TabPane } = Tabs;
const CreateAndEditVendor = () => {
  const [form]=Form.useForm()
  const navigate = useNavigate();
  const params = useParams();
  const [bankdetail, setBankDetail] = useState([]);
  const[loader,setloader]=useState(false)
  const currentUserData = useSelector((state) => state.user.currentuser);
  const [contectPerson, setContectPerson] = useState([
    {
      salutation: '',
      firstName: '',
      lastName: '',
      email: '',
      workPhone: '',
      mobile: '',
      skypeNameNumber: '',
      designation: '',
      department: ''
    }
  ]);
  useEffect(() => {
    if (params.id) {
      setloader(true);
      getSingleVendor({ id: params.id }, { organizationId: currentUserData?.organizationId })
        .then((res) => {
          const billingdata = res?.data?.addresses?.filter((val) => val?.type === 'Billing');
          const shippingdata = res?.data?.addresses?.filter((val) => val?.type === 'Shipping');
          if (res?.data?.contactPersons?.length) {
            setContectPerson(res?.data?.contactPersons);
          }
          setBankDetail(res?.data?.bankDetails)
          form.setFieldsValue({
            ...res.data,
            billingattention: billingdata?.length && billingdata[0]?.attention,
            billingcountry: billingdata?.length && billingdata[0]?.country,
            billingaddressLine1: billingdata?.length && billingdata[0]?.addressLine1,
            billingaddressLine2: billingdata?.length && billingdata[0]?.addressLine2,
            billingcity: billingdata?.length && billingdata[0]?.city,
            billingstate: billingdata?.length && billingdata[0]?.state,
            billing_zip_code: billingdata?.length && billingdata[0]?.zipCode,
            billingphone: billingdata?.length && billingdata[0]?.phone,
            billingfax: billingdata?.length && billingdata[0]?.fax,

            shippingattention: shippingdata?.length && shippingdata[0]?.attention,
            shippingcountry: shippingdata?.length && shippingdata[0]?.country,
            shippingaddress1: shippingdata?.length && shippingdata[0]?.addressLine1,
            shippingaddress2: shippingdata?.length && shippingdata[0]?.addressLine2,
            shippingcity: shippingdata?.length && shippingdata[0]?.city,
            shippingstate: shippingdata?.length && shippingdata[0]?.state,
            shipping_zip_code: shippingdata?.length && shippingdata[0]?.zipCode,
            shippingphone: shippingdata?.length && shippingdata[0]?.phone,
            shippingfax: shippingdata?.length && shippingdata[0]?.fax
          });
          setloader(false);
        })
        .catch((err) => {
          console.log(err);
          setloader(false);
        });
    }
  }, [params, currentUserData]);



  const handleSubmit = (value) => {
    console.log(value, 'vender form');
    const billingAddress = {
      type: 'billing',
      attention: value.billingattention,
      country: value.billingcountry,
      addressLine1: value.billingaddressLine1,
      addressLine2: value.billingaddressLine2,
      city: value.billingcity,
      state: value.billingstate,
      zipCode: value.billing_zip_code,
      phone: value.billingphone,
      fax: value.billingfax
    };
    const shippingAddress = {
      type: 'shipping',
      attention: value.shippingattention,
      country: value.shippingcountry,
      addressLine1: value.shippingaddress1,
      addressLine2: value.shippingaddress2,
      city: value.shippingcity,
      state: value.shippingstate,
      zipCode: value.shipping_zip_code,
      phone: value.shippingphone,
      fax: value.shippingfax
    };

    Object.keys(vendorItem)?.forEach((val) => {
      switch (val) {
        case 'addresses':
          vendorItem[val] = [{ ...billingAddress }, { ...shippingAddress }];
          break;
        case 'contactPersons':
          vendorItem[val] = contectPerson;
          break;
        case 'paymentTerms':
          vendorItem[val] = value[val];
          break;
        case 'bankDetails':
          vendorItem[val] = bankdetail;
          break;
        default:
          vendorItem[val] = value[val];
          break;
      }
    });
    if (params?.id) {
      updateVendor(vendorItem, { id: params?.id }).then((res) => {
        if (res) {
          navigate(reverse(routes.purchase.vendor.view, { id: params.id }));
          message.success('Vendor sucessfully Updated');
        }
      });
    } else {
      createVendor(vendorItem)
        .then((res) => {
          if (res) {
            navigate(routes.purchase.vendor.self);
            message.success('Vendor sucessfully created');
          }
        })
        .catch((err) => {});
    }
  };
  return (
    <div className="w-100">
      <div className="w-100 bg-white p-3 border-bottom d-flex align-items-center justify-content-between ">
        <div className="d-flex align-items-center gap-4 fs-5">
          <ArrowLeftOutlined className="custom-back-button" onClick={() => navigate(-1)} />
          <span className="fw-medium">{params.id ? 'Edit' : 'New'} Vendor</span>
        </div>
        <div className="d-flex align-items-center gap-4 fs-5">
          <Button onClick={() => navigate(-1)}>Cancel</Button>
          <Button type="primary" htmlType="submit" form="vendorForm">
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
        <Form layout="vertical" form={form} name="vendorForm" onFinish={(val) => handleSubmit(val)}>
          <div>
            <div className="row col-12 p-4 m-0">
              <div className="col-md-6 col-lg-6 d-flex flex-column gap-3">
                <div className="row col-12 d-flex  align-items-center">
                  <div className="col-3">
                    <label className="d-flex align-items-center gap-1">
                      <span>Primary Contact</span>{' '}
                      <Tooltip
                        placement="rightTop"
                        title="Select if this item is a Physical good or a service you're offering. Also, remember that once you include this item in a transaction, you can't change its type. ">
                        <InfoCircleOutlined className="text-muted" />
                      </Tooltip>{' '}
                    </label>
                  </div>
                  <div className="col-9">
                    <div className="row col-12">
                      <div className="col-4">
                        <Form.Item name="salutation" className="d-flex m-0 form-item">
                          <Select
                            placeholder="Salutation"
                            options={[
                              {
                                label: 'Mr.',
                                value: 'mr'
                              },
                              {
                                label: 'Mrs.',
                                value: 'mrs'
                              },
                              {
                                label: 'Ms.',
                                value: 'ms'
                              },
                              {
                                label: 'Miss',
                                value: 'miss'
                              },
                              {
                                label: 'Dr.',
                                value: 'dr'
                              }
                            ]}
                          />
                        </Form.Item>
                      </div>
                      <div className="col-4">
                        <Form.Item name="firstName" className="d-flex m-0 form-item ">
                          <Input placeholder="First Name" />
                        </Form.Item>
                      </div>
                      <div className="col-4">
                        <Form.Item name="lastName" className="d-flex m-0 form-item">
                          <Input placeholder="Last Name" />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row col-12 d-flex  align-items-center">
                  <div className="col-3">
                    <label className="d-flex align-items-center gap-1">
                      <span>Company Name</span>
                    </label>
                  </div>
                  <div className="col-6">
                    <Form.Item name="companyName" className="d-flex m-0 form-item">
                      <Input />
                    </Form.Item>
                  </div>
                </div>

                <div className="row col-12 d-flex  align-items-center">
                  <div className="col-3">
                    <label className="d-flex align-items-center gap-1 text-danger">
                      Vendor Display Name *
                      <Tooltip
                        placement="rightTop"
                        title="Select if this item is a Physical good or a service you're offering. Also, remember that once you include this item in a transaction, you can't change its type. ">
                        <InfoCircleOutlined className="text-muted" />
                      </Tooltip>{' '}
                    </label>
                  </div>
                  <div className="col-6">
                    <Form.Item
                      name="vendorDisplayName"
                      className="d-flex m-0 form-item"
                      rules={[
                        {
                          required: true,
                          message: 'Please Enter Vendor Display Name'
                        }
                      ]}>
                      <Input />
                    </Form.Item>
                  </div>
                </div>
                <div className="row col-12 d-flex  align-items-center">
                  <div className="col-3">
                    <label className="d-flex align-items-center gap-1">
                      Vendor Email
                      <Tooltip
                        placement="rightTop"
                        title="Select if this item is a Physical good or a service you're offering. Also, remember that once you include this item in a transaction, you can't change its type. ">
                        <InfoCircleOutlined className="text-muted" />
                      </Tooltip>{' '}
                    </label>
                  </div>
                  <div className="col-6">
                    <Form.Item name="vendorEmail" className="d-flex m-0 form-item">
                      <Input />
                    </Form.Item>
                  </div>
                </div>
                <div className="row col-12 d-flex  align-items-center">
                  <div className="col-3">
                    <label className="d-flex align-items-center gap-1">
                      Vendor Phone
                      <Tooltip
                        placement="rightTop"
                        title="Select if this item is a Physical good or a service you're offering. Also, remember that once you include this item in a transaction, you can't change its type. ">
                        <InfoCircleOutlined className="text-muted" />
                      </Tooltip>{' '}
                    </label>
                  </div>
                  <div className="col-6">
                    <div className="row col-12 m-0 p-0">
                      <div className="col-5 p-0 m-0">
                        <Form.Item name="workPhone" className="d-flex m-0 form-item">
                          <Input placeholder="Work Phone" />
                        </Form.Item>
                      </div>
                      <div className="col-2"></div>
                      <div className="col-5 p-0 m-0">
                        <Form.Item name="mobile" className="d-flex m-0 form-item">
                          <Input placeholder="Mobile" />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4">
              <Tabs defaultActiveKey="1">
                <TabPane tab="Other Details" className="" key="1">
                  <OtherDetail />
                </TabPane>
                <TabPane tab="Address" className="" key="2">
                  <Address />
                </TabPane>
                <TabPane tab="Contact Persons" className="" key="3">
                  <ContactPerson
                    contectPerson={contectPerson}
                    setContectPerson={(value) => setContectPerson(value)}
                  />
                </TabPane>
                <TabPane tab="Bank Details" className="" key="4">
                  {params?.id?<div className="w-100 text-center text-muted fw-semibold">At the moment, you can add or edit the bank details only from the Contact Overview page.</div>:<BankDetails bankdetail={bankdetail} setBankDetail={setBankDetail} />}
                </TabPane>
                <TabPane tab="Remarks" className="" key="5">
                  <div className="row col-12 p-4 m-0">
                    <div className="col-6 d-flex flex-column gap-3">
                      <div>
                        Remarks<span className="text-muted"> (For Internal Use)</span>
                      </div>
                      <Form.Item name="remarks">
                        <Input.TextArea />
                      </Form.Item>
                    </div>
                  </div>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreateAndEditVendor;
