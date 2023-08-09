import {
  SettingOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  StarOutlined,
  DollarOutlined,
  CreditCardOutlined,
  PayCircleOutlined,
  ShoppingOutlined,
  InteractionOutlined,
  ShopOutlined
} from '@ant-design/icons';
import { Button, Col, Row, Select, Tabs} from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../controller/routes';
export const ReportsItemsList = () => {
  const navigate = useNavigate();
  const { TabPane } = Tabs;
  const { Option, OptGroup } = Select;
  return (
    <div className="w-100">
      <div className="w-100 bg-white p-3 border-bottom d-flex align-items-center justify-content-between ">
        <div className="d-flex align-items-center gap-2 fs-5 w-25">
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
            }>
            <OptGroup label="Sales">
              <Option value="sales_by_customer" label="Sales by Customer">
                Sales by Customer
              </Option>
              <Option value="sales_by_item" label="Sales by Item">
                Sales by Item
              </Option>
              <Option value="pending_approval" label="Order Fulfillment by Item">
                Order Fulfillment by Item
              </Option>
              <Option value=" sales_return_history" label=" Sales return history">
                Sales return history
              </Option>
              <Option value="sales_by_sales_person" label="Sales by Sales person">
                Sales by Sales person
              </Option>
              <Option value="packing_history" label="Packing history">
                Packing history
              </Option>
            </OptGroup>
            <OptGroup label="Inventory">
              <Option value="inventory_summary" label="Inventory Summary">
                Inventory Summary
              </Option>
              <Option value="committed_stock_details" label="Committed stock details">
                Committed stock details
              </Option>
              <Option value="inventory_valuation_summary" label="Inventory Valuation Summary">
                Inventory Valuation Summary
              </Option>
              <Option value="fifo_cost_lot_tracking" label="FIFO Cost Lot Tracking">
                FIFO Cost Lot Tracking
              </Option>
              <Option value="stock_summary_report" label="Stock Summary Report">
                Stock Summary Report
              </Option>
              <Option value="abc_classification" label=" ABC Classification">
                ABC Classification
              </Option>
            </OptGroup>
            <OptGroup label="Receivables">
              <Option value="customer_balances" label="Customer Balances">
                Customer Balances
              </Option>
              <Option value="invoice_details" label="Invoice Details">
                Invoice Details
              </Option>
              <Option value="sales_order_details" label="Sales Order Details">
                Sales Order Details
              </Option>
              <Option value="delivery_challan_details" label="Delivery Challan Details">
                Delivery Challan Details
              </Option>
              <Option value="receivable_summery" label="Receivable Summery">
                Receivable Summary
              </Option>
              <Option value="receivable_details" label="Receivable Details">
                Receivable Details
              </Option>
            </OptGroup>
            <OptGroup label="Payments Received">
              <Option value="payments_rececived" label="Payments Received">
                Payments Received
              </Option>
              <Option value="refund_history" label="Refund History">
                Refund History
              </Option>
            </OptGroup>
            <OptGroup label="Payables">
              <Option value="vendor_balances" label=" Vendor Balances">
                Vendor Balances
              </Option>
              <Option value="bill_details" label="Bill Details">
                Bill Details
              </Option>
              <Option value="vender_credits_details" label="Vendor Credits Details">
                Vendor Credits Details
              </Option>
              <Option value="payment_made" label="Payment Made">
                Payment Made
              </Option>
              <Option value="purchase_order_details" label="Purchase Order Details">
                Purchase Order Details
              </Option>
              <Option value="purchase_order_by_vendor" label="Purchase Order By Vendor">
                Purchase Order By Vendor
              </Option>
              <Option value="Payble_summery" label="Payble Summery">
                Payable Summary
              </Option>
              <Option value="Payble_details" label="Payble Details">
                Payable Details
              </Option>
            </OptGroup>
            <OptGroup label="Purchases and Expenses">
              <Option value="purchase_by_item" label=" Purchases by Item">
                Purchases By Item
              </Option>
              <Option value="receive_history" label="Receive History">
                Receive History
              </Option>
              <Option value="billable_expenses_details">Billable Expenses Details</Option>
            </OptGroup>
            <OptGroup label="Activity">
              <Option value="system_mails" label="System Mails">
                System Mails
              </Option>
              <Option value="activity_logs_audit_trail" label="Activity Logs & Audit Trail">
                Activity Logs & Audit Trail
              </Option>
              <Option value="portal_activities" label="Portal Activities">
                Portal Activities
              </Option>
              <Option value="client_reviews" label="Client Reviews">
                Client Reviews
              </Option>
              <Option value="api_usage" label="API Usage">
                API Usage
              </Option>
            </OptGroup>
          </Select>
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
         <Tabs defaultActiveKey="1" className="item-view-tabs">
         <TabPane tab={<h6 style={{marginLeft:'15px'}}>General Reports</h6>} className="" key="bill_payment">
      <div
        style={{
          maxHeight: '100vh',
          height: '100%',
          overflow: 'scroll',
          paddingBottom: '150px'
        }}>
        <div className="w-100 p-3 position-relative justify-content-center align-items-center">
        <Row>
          <Col span={8} className="justify-content-center align-items-center">
            <div className="d-flex align-items-center fs-5 gap-2">
              {' '}
              <ShoppingCartOutlined /> <h4 className="text-muted">Sales</h4>
            </div>
            {sales.map((item, i) => (
              <div key={i} className=" text-primary mt-3 dotted-border">
                <Button type="text" className="d-flex align-items-center text-primary p-0">
                  <StarOutlined className="me-2" />
                  <h8>{item.name}</h8>
                </Button>
              </div>
            ))}
          </Col>
          <Col span={8} className="justify-content-center align-items-center">
            <div className="d-flex align-items-center fs-5 gap-2">
              {' '}
              <ShopOutlined /> <h4 className="text-muted">Inventory</h4>
            </div>
            {inventory.map((item, i) => (
              <div key={i} className="text-primary mt-3 dotted-border">
                <Button type="text" className="d-flex align-items-center text-primary p-0">
                  <StarOutlined className="me-2" />
                  <h8>{item.name}</h8>
                </Button>
              </div>
            ))}
          </Col>
          <Col span={8} className="justify-content-center align-items-center">
            <div className="d-flex align-items-center fs-5 gap-2">
              {' '}
              <DollarOutlined /> <h4 className="text-muted">Receivables</h4>
            </div>
            {receivables.map((item, i) => (
              <div key={i} className="text-primary mt-3 dotted-border">
                <Button type="text" className="d-flex align-items-center text-primary p-0">
                  <StarOutlined className="me-2" />
                  <h8>{item.name}</h8>
                </Button>
              </div>
            ))}
          </Col>
        </Row>

        <Row className="mt-5">
          <Col span={8} className="justify-content-center align-items-center">
            <div className="d-flex align-items-center fs-5 gap-2">
              <CreditCardOutlined />
              <h4 className="text-muted">Payments Received</h4>
            </div>
            {paymentReceived.map((item, i) => (
              <div key={i} className="text-primary mt-3 dotted-border">
                <Button type="text" className="d-flex align-items-center text-primary p-0">
                  <StarOutlined className="me-2" />
                  <h8>{item.name}</h8>
                </Button>
              </div>
            ))}
          </Col>
          <Col span={8} className="justify-content-center align-items-center">
            <div className="d-flex align-items-center fs-5 gap-2">
              <PayCircleOutlined /> <h4 className="text-muted">Payables</h4>
            </div>
            {payables.map((item, i) => (
              <div key={i} className="text-primary mt-3 dotted-border">
                <Button type="text" className="d-flex align-items-center text-primary p-0">
                  <StarOutlined className="me-2" />
                  <h8>{item.name}</h8>
                </Button>
              </div>
            ))}
          </Col>
          <Col span={8} className="justify-content-center align-items-center">
            <div className="d-flex align-items-center fs-5 gap-2">
              <ShoppingOutlined /> <h4 className="text-muted">Purchases and Expenses</h4>
            </div>
            {purchaseExpenses.map((item, i) => (
              <div key={i} className="text-primary mt-3 dotted-border">
                <Button type="text" className="d-flex align-items-center text-primary p-0">
                  <StarOutlined className="me-2" />
                  <h8>{item.name}</h8>
                </Button>
              </div>
            ))}
          </Col>
        </Row>
        <Row className="mt-5">
          <Col span={8} className="justify-content-center align-items-center">
            <div className="d-flex align-items-center fs-5 gap-2">
              {' '}
              <InteractionOutlined /> <h4 className="text-muted">Activity</h4>
            </div>
            {activity.map((item, i) => (
              <div key={i} className="text-primary mt-3 dotted-border">
                <Button type="text" className="d-flex align-items-center text-primary p-0">
                  <StarOutlined className="me-2" />
                  <h8>{item.name}</h8>
                </Button>
              </div>
            ))}
          </Col>
        </Row>
        </div>
      </div>
      </TabPane>
     </Tabs>
    </div>
  );
};

let sales = [
  { name: 'Sales by Customer' },
  { name: 'Sales by Item' },
  { name: 'Order Fulfillment By Item' },
  { name: 'Sales Return History' },
  { name: 'Sales by Sales Person' },
  { name: 'Packing History' }
];
let inventory = [
  { name: 'Inventory Summary' },
  { name: 'Committed Stock Details' },
  { name: 'Inventory Valuation Summary' },
  { name: 'FIFO Cost Lot Tracking' },
  { name: 'Inventory Aging Summary' },
  { name: 'Product Sales Report' },
  { name: 'Active Purchase Orders Report' },
  { name: 'Stock Summary Report' },
  { name: 'ABC Classification' }
];
let receivables = [
  { name: 'Customer Balances' },
  { name: 'Invoice Details' },
  { name: 'Sales Order Details' },
  { name: 'Delivery Challan Details' },
  { name: 'Receivable Summary' },
  { name: 'Receivable Details' }
];
let paymentReceived = [{ name: 'Payments Received' }, { name: 'Refund History' }];
let payables = [
  { name: 'Vendor Balances' },
  { name: 'Vendor Balances' },
  { name: 'Vendor Credits Details' },
  { name: 'Payments Made' },
  { name: 'Purchase Order Details' },
  { name: 'Purchase Orders by Vendor' },
  { name: 'Payable Summary' },
  { name: 'Payable Details' }
];
let activity = [
  { name: 'System Mails' },
  { name: 'Activity Logs & Audit Trail' },
  { name: 'Portal Activities' },
  { name: 'Client Reviews' },
  { name: 'API Usage' }
];
let purchaseExpenses = [
  { name: 'Purchases by Item' },
  { name: 'Receive History' },
  { name: 'Billable Expense Details' }
];
