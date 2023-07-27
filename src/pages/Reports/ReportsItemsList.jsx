import { SettingOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Divider, Select } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../components/controller/routes';
export const ReportsItemsList = () => {
  const navigate = useNavigate();
  return (
    <div className="w-100">
      <div className="w-100 bg-white p-3 border-bottom d-flex align-items-center justify-content-between ">
        <div className="d-flex align-items-center gap-2 fs-5">
          <h5>Reports</h5>
          <Select
            showSearch
            className="item-table-filter"
            bordered={true}
            placeholder="Search Reports"
            style={{
              width: '100%',
              marginLeft: '20px'
            }}
            suffixIcon={<SearchOutlined />}
            optionLabelProp="name"
            onChange={(val) => console.log(val)}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={[
              {
                value: 'all',
                label: 'All Sales Order',
                name: 'All Sales Order'
              },
              {
                value: 'draft',
                label: 'Draft ',
                name: 'Draft'
              },
              {
                value: 'pending_approval',
                label: 'Pending Approval',
                name: 'Pending Approval'
              },
              {
                value: 'approved',
                label: 'Approved',
                name: 'Approved'
              },
              {
                value: 'confirmed',
                label: 'Confirmed',
                name: 'Confirmed'
              },
              {
                value: 'for_packing',
                label: 'For Packing',
                name: 'For Packing'
              },
              {
                value: 'to_be_Shipped',
                label: 'To be Shipped',
                name: 'To be Shipped'
              },
              {
                value: 'shipped',
                label: 'Shipped',
                name: 'Shipped'
              },
              {
                value: 'for_invoicing',
                label: 'For Invoicing',
                name: 'For Invoicing'
              }
            ]}
          />
        </div>
        <div className="d-flex align-items-center gap-2 fs-5">
          <SettingOutlined />
          <Button
            type="text"
            className="fs-6 d-flex justify-content-center align-items-center fw-small text-primary"
            onClick={() => navigate(routes.sales.salesOrder.new)}>
            Configure Reports Layout
          </Button>
        </div>
      </div>
    </div>
  );
};
