import {
  ArrowLeftOutlined,
  CaretDownOutlined,
  DeleteOutlined,
  EditOutlined,
  MailOutlined,
  MoreOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';
import { Button, Collapse, Divider, Dropdown, Image, Table } from 'antd';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { routes } from '../../../controller/routes';
import { reverse } from 'named-urls';
import { Icons } from '../../../controller/Images';
import { faFileInvoice, faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PurchaseOrderView = () => {
  const navigate = useNavigate();
  const params = useParams();
  return (
    <div className="item-view-container w-100 bg-white">
      <div className="w-100 border-bottom">
        <div className="d-flex justify-content-between align-items-center p-4 px-3">
          <div className="d-flex  align-items-center gap-2 fs-5 ">
            <ArrowLeftOutlined onClick={() => navigate(-1)} className="custom-back-button" />
            <span className="fw-medium">Adjustment Details </span>
          </div>
          <div className="d-flex justify-content-center align-items-center gap-2 ">
            <Button
              className="d-flex justify-content-center align-items-center p-2 fs-5 bg-light"
              onClick={() =>
                navigate(reverse(routes.purchase.purchaseOrder.edit, { id: params.id }))
              }
            >
              <EditOutlined />
            </Button>
            <Button className="d-flex justify-content-center align-items-center">
              <MailOutlined />
              Send Mail
            </Button>
            <Dropdown
              trigger="click"
              menu={{
                items: [
                  {
                    label: 'PDF',
                    key: 1
                  },
                  {
                    label: 'Print',
                    key: 2
                  }
                ]
              }}
            >
              <Button className="d-flex align-items-center">
                <Image src={Icons.fileIcon} alt="" width={15} preview={false} />{' '}
                <span>PDF / Print</span>
                <CaretDownOutlined />
              </Button>
            </Dropdown>
            <Button className="d-flex justify-content-center align-items-center">Receive</Button>
            <Button className="d-flex justify-content-center align-items-center gap-2">
              <FontAwesomeIcon icon={faFileInvoice} /> Convert to Bill
            </Button>
            <Dropdown
              trigger="click"
              menu={{
                items: [
                  {
                    label: 'Expected Delivery Date',
                    key: 1
                  },
                  {
                    label: 'Cancle Item',
                    key: 2
                  },
                  {
                    label: 'Mark as Cancled',
                    key: 3
                  },
                  {
                    label: 'clone',
                    key: 4
                  },
                  {
                    label: 'Delete',
                    key: 5
                  }
                ]
              }}
            >
              <MoreOutlined />
            </Dropdown>
          </div>
        </div>
      </div>
      <div
        className="w-100 p-4"
        style={{
          maxHeight: '83vh',
          height: '100%',
          overflow: 'scroll',
          paddingBottom: '79px'
        }}
      >
        <div className="p-4">
          <div className="border rounded-2 p-4 purchase-order-card d-flex justify-content-between">
            <div className="d-flex gap-3">
              <div
                className=" p-2 rounded-2 d-flex justify-content-center align-items-center"
                style={{ background: '#eee' }}
              >
                <ShoppingCartOutlined />
              </div>
              <div className="d-flex flex-column fs-6">
                <strong>Complete Your Purchase</strong>
                <span className="text-muted">
                  You can create bills and receives(in any sequence) with this order to complete
                  your purchase.
                </span>
              </div>
            </div>
            <div className="d-flex align-items-center gap-3">
              <Button type="primary">Convert to Bill</Button>
              <Button>Receive</Button>
            </div>
          </div>
          <Collapse
            className="mt-4"
            items={[
              {
                key: '1',
                label: 'Receives',
                // children: <div className='d-flex align-item-center justify-content-center'>
                //     <p class="mb-0">No items have been received yet!  - </p>
                //     <p style={{ color: "#1677FF", cursor: 'pointer' }} >New Purchase receive</p>
                // </div>
                children: (
                  <Table
                    columns={[
                      {
                        title: 'Purchase Receive',
                        dataIndex: 'purchase_receive',
                        key: 'purchase_receive'
                      },
                      { title: 'received on', dataIndex: 'received_on', key: 'received_on' },
                      { title: 'Status', dataIndex: 'status', key: 'status' },
                      { title: 'Bill#', dataIndex: 'bill', key: 'bill' },
                      {
                        title: '',
                        dataIndex: '',
                        key: '',
                        render: () => (
                          <div className=" w-100 d-flex gap-2 justify-content-end align-items-center">
                            <span className="text-primary">Convert to bill</span>
                            <DeleteOutlined className="border-start p-1 text-primary" />
                          </div>
                        )
                      }
                    ]}
                    dataSource={[
                      {
                        purchase_receive: 'PR-00002',
                        received_on: '25/07/2023',
                        status: 'Received',
                        bill: ''
                      }
                    ]}
                    pagination={false}
                  />
                )
              }
            ]}
          />
          <div className="mt-5">
            <div className="row col-12">
              <div className="col-6 d-flex flex-column gap-3">
                <div>
                  <h4 className="m-0">PURCHASE ORDER</h4>
                  <span>Purchase Order# 23232</span>
                </div>
                <div>
                  <span className="text-muted fw-medium">STATUS</span>
                  <div
                    className="p-2"
                    style={{
                      borderLeftColor: 'orange',
                      borderLeftWidth: '3px',
                      borderLeftStyle: 'solid'
                    }}
                  >
                    <div className="row col-12">
                      <div className="col-3">order</div>
                      <div className="col-9">
                        <span className="bg-primary bg-opacity-75 p-1 rounded-2">ISSUED</span>
                      </div>
                    </div>
                    <div className="row col-12">
                      <div className="col-3">Receive</div>
                      <div className="col-9">
                        {' '}
                        <div className="text-success">Received</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row col-12">
                  <div className="col-3 text-muted fw-medium">REFERENCE#</div>
                  <div className="col-9"> 124214</div>
                  <div className="col-3 text-muted fw-medium">ORDER DATE</div>
                  <div className="col-9"> 25/07/2023</div>
                  <div className="col-3 text-muted fw-medium">DELIVERY DATE</div>
                  <div className="col-9"> 26/07/2023</div>
                  <div className="col-3 text-muted fw-medium">PAYMENT TERMS</div>
                  <div className="col-9"> Net 15</div>
                </div>
              </div>
              <div className="col-6 d-flex flex-column justify-content-between">
                <div className="d-flex flex-column">
                  <strong className="text-muted">VENDOR ADDRESS</strong>
                  <span className="text-primary">name</span>
                  <span>demo</span>
                </div>
                <div className="d-flex flex-column">
                  <strong className="text-muted">DELIVERY ADDRESS</strong>
                  <span>veeresh</span>
                  <span>Delhi</span>
                  <span>India</span>
                  <spna>6396340468</spna>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <Table
                columns={[
                  {
                    title: 'ITEMS & DESCRIPTION',
                    dataIndex: '',
                    key: '',
                    render: (text, record) => {
                      return (
                        <div className="w-100 ">
                          <div className="d-flex gap-2">
                            <div
                              className="border p-1 d-flex justify-content-center align-items-center"
                              style={{ width: '35px', height: '35px', objectFit: 'cover' }}
                            >
                              {record?.img ? (
                                <Image src={record.img} alt="" preview={false} />
                              ) : (
                                <FontAwesomeIcon icon={faImage} style={{ color: '#919191' }} />
                              )}
                            </div>
                            <div className="d-flex flex-column">
                              <span className="text-primary fw-medium">{record.item_name}</span>
                              <span className="text-muted">[{record.sku}]</span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  },
                  {
                    title: 'ORDERED',
                    dataIndex: 'order',
                    key: 'order',
                    render: () => (
                      <div className="d-flex flex-column">
                        <span>1</span>
                        <span>g</span>
                      </div>
                    )
                  },
                  {
                    title: 'STATUS',
                    dataIndex: 'status',
                    key: 'status',
                    render: (text, record) => (
                      <div className="d-flex flex-column">
                        <span>{record.receive} Received</span>
                        <span>{record.bill} Billed</span>
                      </div>
                    )
                  },
                  {
                    title: 'RATE	',
                    dataIndex: 'rate',
                    key: 'rate',
                    render: (text) => <span>Rs. {text}</span>
                  },
                  { title: 'AMOUNT', dataIndex: 'amount', key: 'amount' }
                ]}
                dataSource={[
                  {
                    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH0buAM-qQKTibKB8MpUsw51lCyaWYh8dZqWtjU-tZ&s',
                    item_name: 'demo text-black',
                    sku: 12,
                    rate: 100.0,
                    receive: 1,
                    bill: 0,
                    amount: 100
                  }
                ]}
                pagination={false}
              />
            </div>
            <div className="row col-12 ">
              <div className="col-6"></div>
              <div className="col-6 text-end d-flex flex-column gap-3">
                <div className="row col-12 mt-2">
                  <div className="col-6 d-flex flex-column">
                    <strong className="fs-5">Sub Total</strong>
                    <span className="text-muted">Total Quantity : 1</span>
                  </div>
                  <div className="col-6">
                    <strong> Rs.100.00</strong>
                  </div>
                </div>
                <div className="row col-12">
                  <div className="col-6 d-flex flex-column">
                    <strong className="fs-5 text-muted">Discount</strong>
                  </div>
                  <div className="col-6 text-muted">Rs.10.00</div>
                </div>
                <div className="row col-12">
                  <div className="col-6 d-flex flex-column">
                    <strong className="fs-5 text-muted">TCS</strong>
                    <span className="text-muted">(206C(6CE))</span>
                  </div>
                  <div className="col-6 text-muted">Rs.10.80</div>
                </div>
                <Divider className="mb-1 mt-1" />
                <div className="row col-12">
                  <div className="col-6 d-flex flex-column">
                    <strong className="fs-5 ">Total</strong>
                  </div>
                  <div className="col-6 ">
                    <strong> Rs.100.80</strong>
                  </div>
                </div>
              </div>
            </div>
            <Divider />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrderView;
