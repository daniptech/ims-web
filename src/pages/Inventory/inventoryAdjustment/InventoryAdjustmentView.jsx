import {
  ArrowLeftOutlined,
  CaretDownOutlined,
  EditOutlined,
  MoreOutlined
} from '@ant-design/icons';
import { Button, Dropdown, Image, Table } from 'antd';
import { reverse } from 'named-urls';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { routes } from '../../../controller/routes';
import { Icons } from '../../../controller/Images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import { accesslevel, moduleEnum } from '../../../controller/enum';
import { hasAccessFeature } from '../../../controller/global';

const InventoryAdjustmentView = () => {
  const navigate = useNavigate();
  const params = useParams();
  const columns = [
    {
      title: 'Item Details',
      dataIndex: '',
      render: (record) => {
        return (
          <div className="w-100">
            <div className="d-flex gap-2">
              <div
                className="border p-1 d-flex justify-content-center align-items-center"
                style={{ width: '40px', height: '40px' }}
              >
                <FontAwesomeIcon icon={faImage} style={{ color: '#c7c7c7', height: 25 }} />
              </div>
              <div className="d-flex flex-column">
                <span>{record.name}</span>
                <span>SKU: {record.sku}</span>
                <span>{record.description}</span>
              </div>
            </div>
          </div>
        );
      }
    },
    {
      title: 'Quantity Adjusted',
      dataIndex: 'quantity_adjustment',
      render: (text, record) => {
        return (
          <div className="w-100 text-end">
            <span>{`${text} (${record.unit})`}</span>
          </div>
        );
      }
    },
    {
      title: 'Cost Price',
      dataIndex: 'cost_price',
      render: (text) => {
        return (
          <div className="w-100 text-end">
            <span>{text}</span>
          </div>
        );
      }
    }
  ];
  return (
    <div className="item-view-container w-100 bg-white">
      <div className="w-100 border-bottom">
        <div className="d-flex justify-content-between align-items-center p-4 px-3">
          <div className="d-flex  align-items-center gap-2 fs-5 ">
            <ArrowLeftOutlined onClick={() => navigate(-1)} className="custom-back-button" />
            <span className="fw-medium">Adjustment Details </span>
          </div>
          {hasAccessFeature(accesslevel.write,moduleEnum.Inventory_adjustment)&&<div className="d-flex justify-content-center align-items-center gap-2 ">
            <Button
              className="d-flex justify-content-center align-items-center p-2 fs-5 bg-light"
              onClick={() =>
                navigate(reverse(routes.inventory.inventoryAdjustments.edit, { id: params.id }))
              }
            >
              <EditOutlined />
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
            <Dropdown
              trigger="click"
              menu={{
                items: [
                  {
                    label: 'clone',
                    key: 1
                  },
                  {
                    label: 'Delete',
                    key: 2
                  }
                ]
              }}
            >
              <MoreOutlined />
            </Dropdown>
          </div>}
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
        <div className="w-100 p-4">
          <div className="row col-12">
            <div className="col-6 d-flex flex-column gap-3 fs-6">
              <div className="row col-12">
                <div className="col-4">Date</div>
                <div className="col-1">:</div>
                <div className="col-7">03/07/2023</div>
              </div>
              <div className="row col-12">
                <div className="col-4">Reason</div>
                <div className="col-1">:</div>
                <div className="col-7">Stolen goods</div>
              </div>
              <div className="row col-12">
                <div className="col-4">Status</div>
                <div className="col-1">:</div>
                <div className="col-7">ADJUSTED</div>
              </div>
              <div className="row col-12">
                <div className="col-4">Account</div>
                <div className="col-1">:</div>
                <div className="col-7">Petty Cash</div>
              </div>
              <div className="row col-12">
                <div className="col-4">Adjustment Type</div>
                <div className="col-1">:</div>
                <div className="col-7">Quantity</div>
              </div>
              <div className="row col-12">
                <div className="col-4">Reference Number</div>
                <div className="col-1">:</div>
                <div className="col-7">Test</div>
              </div>
              <div className="row col-12">
                <div className="col-4">Adjusted By</div>
                <div className="col-1">:</div>
                <div className="col-7">veeresh</div>
              </div>
              <div className="row col-12">
                <div className="col-4">Created Time</div>
                <div className="col-1">:</div>
                <div className="col-7">03/07/2023 10:44 AM</div>
              </div>
              <div className="row col-12">
                <div className="col-4">Description</div>
                <div className="col-1">:</div>
                <div className="col-7">Best quality</div>
              </div>
            </div>
          </div>
          <hr className="mt-5 mb-2" />
          <div className="w-100">
            <span className="fs-5 p-2 fw-semibold">Adjusted Items</span>
            <Table
              className="mt-2"
              columns={columns}
              dataSource={[
                {
                  name: 'Botal',
                  sku: 'demo',
                  description: 'Best quality botal',
                  quantity_adjustment: 984.0,
                  cost_price: 56.0,
                  unit: 1
                }
              ]}
              pagination={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryAdjustmentView;
