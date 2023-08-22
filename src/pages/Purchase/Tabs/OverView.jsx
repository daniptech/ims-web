import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  MessageOutlined,
  MobileOutlined,
  MoreOutlined,
  PhoneOutlined,
  PlusCircleOutlined,
  SettingFilled,
  SkypeFilled
} from '@ant-design/icons';
import { Button, Collapse, Dropdown, Image, Select, Table } from 'antd';
import React from 'react';
import { useState } from 'react';
import { Icons } from '../../../controller/Images';

const OverView = () => {
  const [otherDetail, setOtherDetail] = useState({ defaultCurrency: 'view' });
  let data = [
    {
      date: '20/07/2023 05:10 PM',
      title: '',
      text: 'rtgrt by veeresh'
    },
    {
      date: '20/07/2023 05:10 PM',
      title: 'Invoice added',
      text: 'Invoice INV-000002 of amount Rs.211.00 created by veeresh '
    },
    {
      date: '20/07/2023 05:10 PM',
      title: 'added 2',
      text: 'Delivery Challan Chllan of amount Rs.56.00 created by veeresh'
    },
    {
      date: '20/07/2023 05:10 PM',
      title: 'added 3',
      text: 'Delivery Challan Tyu of amount Rs.165.00 created by veeresh'
    }
  ];

  const items = [
    {
      key: '1',
      label: 'ADDRESS',
      children: (
        <div className="w-100 d-flex flex-column gap-3">
          <div className="d-flex flex-column">
            <strong>Billing Address</strong>
            <span className="text-muted">
              No Billing Address - <span className="view-btn text-primary">Add new address</span>
            </span>
          </div>
          <div className="d-flex flex-column">
            <strong>Shipping Address</strong>
            <span className="text-muted">
              No Shipping Address - <span className="view-btn text-primary">Add new address</span>
            </span>
          </div>
          <span className="view-btn text-primary">Add additional address</span>
        </div>
      )
    },
    {
      key: '2',
      label: 'OTHER DETAILS',
      children: (
        <div className="w-100">
          <div className="row col-12">
            <div className="col-5 text-muted">Default Currency</div>
            <div className="col-7">
              {otherDetail.defaultCurrency === 'edit' ? (
                <div className="d-flex justify-content-between gap-1">
                  <Select className="w-75" options={[]} />
                  <div className="rounded-2 d-flex">
                    <div className="bg-success rounded-start-2 d-flex justify-content-center align-items-center p-2">
                      <CheckOutlined />
                    </div>
                    <div
                      className=" bg-danger rounded-end-2  d-flex justify-content-center align-items-center p-2"
                      onClick={() => setOtherDetail({ defaultCurrency: 'view' })}
                    >
                      <CloseOutlined />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="d-flex justify-content-between currency-value p-1 rounded-1 align-items-center text-muted">
                  INR{' '}
                  <EditOutlined
                    className="other-detail-edit-icon"
                    onClick={() => setOtherDetail({ defaultCurrency: 'edit' })}
                  />
                </div>
              )}
            </div>
            <div className="col-5 text-muted">Payment Terms</div>
            <div className="col-7">Due on Receipt</div>
            <div className="col-5 text-muted">Source</div>
            <div className="col-7"></div>
          </div>
        </div>
      )
    },
    {
      key: '3',
      label: 'CONTACT PERSONS',
      children: (
        <div className="w-100">
          {/* <div className='text-muted d-flex justify-content-center'>No contact persons found.</div> */}

          <div className=" d-flex justify-content-between">
            <div className="d-flex gap-3">
              <span>image</span>
              <div className="d-flex flex-column">
                <strong className="">Mrs. demo test</strong>
                <span className="fw-normal">demo@mail.com</span>
                <span>developer</span>
                <span>IT</span>
                <span className="d-flex align-items-center gap-2">
                  <PhoneOutlined rotate={90} /> 32665959849
                </span>
                <span className="d-flex align-items-center gap-2">
                  <MobileOutlined /> 32665959849
                </span>
                <span className="d-flex align-items-center gap-2">
                  <SkypeFilled style={{ color: '#2a4d89' }} /> live:cid20y92ybskf9t
                </span>
              </div>
            </div>
            <div>
              <Dropdown
                menu={{
                  items: [
                    {
                      label: 'Edit',
                      key: 1
                    },
                    {
                      label: 'Mark as Primary',
                      key: 2
                    },
                    {
                      label: 'Send Email',
                      key: 3
                    },
                    {
                      label: 'Delete',
                      key: 4
                    }
                  ]
                }}
              >
                <SettingFilled />
              </Dropdown>
            </div>
          </div>
        </div>
      ),
      extra: <PlusCircleOutlined className="text-primary" />
    },
    {
      key: '4',
      label: 'BANK ACCOUNT DETAILS',
      children: (
        <div className="w-100">
          {/* <div className='text-muted d-flex justify-content-center'>No bank account added yet</div> */}
          <div className="d-flex justify-content-between">
            <span>Account ending with 3456</span>
            <div className="d-flex gap-3 align-items-center">
              <span className="text-primary">Edit</span>
              <DeleteOutlined />
            </div>
          </div>
        </div>
      ),
      extra: <PlusCircleOutlined className="text-primary" />
    },
    {
      key: '5',
      label: 'RECORD INFO',
      children: (
        <div className="w-100">
          <div className="row col-12">
            <div className="col-5">Vendor ID</div>
            <div className="col-7">1367875000000020001</div>
            <div className="col-5">Created on</div>
            <div className="col-7">30/06/2023</div>
            <div className="col-5">Created By</div>
            <div className="col-7">veeresh</div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="w-100 row col-12 h-100 p-0 m-0">
      <div className="col-4 bg-light h-100 p-4">
        <span>Best India</span>
        <hr />
        <div className="d-flex gap-3">
          <span>image</span>
          <div className="d-flex flex-column">
            <strong className="">Mrs. Ritu Kumar</strong>
            <span className="fw-normal">retu@gmail.com</span>
            <span className="d-flex align-items-center gap-2">
              <MobileOutlined /> 32665959849
            </span>
            <span
              className="d-flex align-items-center gap-2 text-primary"
              style={{ fontSize: '12px' }}
            >
              <span className="view-btn">Edit</span>
              <span className="view-btn">Send Email</span> <span className="view-btn">Delete</span>
            </span>
          </div>
        </div>
        <Collapse
          className="border-0 mt-5 custom-collapse"
          items={items}
          defaultActiveKey={['1', '2', '3', '4', '5']}
        />
      </div>
      <div className="col-8 p-0 m-0">
        <div className="d-flex gap-3 p-4" style={{ background: '#f7faff' }}>
          <Image src={Icons.arrowIcon} alt="" className="pt-3" preview={false} height={100} />
          <div className="pt-4">
            <strong className="fs-6">What's Next for Your Vendor?</strong>
            <p className="text-muted">
              Your vendor has been added. Create a purchase order or record a bill for the items you
              buy from your vendor.
            </p>
            <div className="d-flex gap-3 align-items-center">
              <Button>New Purchase Order</Button>
              <Button type="primary">New Bill</Button>
              <Dropdown
                trigger="click"
                menu={{
                  items: [
                    {
                      label: "Don't Show Again",
                      key: 1
                    }
                  ]
                }}
              >
                <MoreOutlined className="text-muted" style={{ fontSize: '22px' }} />
              </Dropdown>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="text-muted">Payment due period</div>
          <div>Due on Receipt</div>
          <div className="mt-3">
            <strong className="fs-5">Payables</strong>
            <Table
              columns={[
                {
                  id: 1,
                  title: 'CURRENCY',
                  dataIndex: 'currency',
                  key: 'currency'
                },
                {
                  id: 2,
                  title: 'OUTSTANDING PAYABLES',
                  dataIndex: 'outstanding_payables',
                  key: 'outstanding_payables',
                  render: (text) => <span>Rs.{text}</span>
                },
                {
                  id: 3,
                  title: 'UNUSED CREDITS',
                  dataIndex: 'unused_credits',
                  key: 'unused_credits',
                  render: (text) => <span>Rs.{text}</span>
                }
              ]}
              dataSource={[
                {
                  currency: 'INR- Indian Rupee',
                  outstanding_payables: '0.00',
                  unused_credits: '0.00'
                }
              ]}
              pagination={false}
            />
          </div>
          <div className="w-100 bg-light mt-2 p-3 d-flex gap-3">
            <span className="border-end p-2 fw-medium">
              Items to be received: <span className="text-danger">0</span>
            </span>
            <span className="p-2 fw-medium">
              Total items ordered: <span className="text-danger">0</span>
            </span>
          </div>
          <div>
            {data?.map((items, i) => (
              <div key={i} className={i === 0 ? 'd-flex mt-5' : 'd-flex'}>
                <h9 style={{ width: '150px', marginTop: '34px' }}>{items.date}</h9>
                <div
                  className="border border-secondary"
                  style={{ width: '0.5px', height: '110px' }}
                />
                <div
                  className="border border-1 rounded-circle p-1 d-flex justify-content-center "
                  style={{
                    width: '25px',
                    height: '25px',
                    marginLeft: '-12px',
                    background: '#f6fbff'
                  }}
                >
                  <MessageOutlined />
                </div>
                <div className="container chat-container" style={{ marginLeft: '15px' }}>
                  <div className="row">
                    <div className="col-md-12 offset chat-box">
                      <div className="arrow-up"></div>
                      <h6 className="alert-heading">{items.title}</h6>
                      <p>{items.text}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverView;
