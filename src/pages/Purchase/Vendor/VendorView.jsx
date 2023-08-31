import { ArrowLeftOutlined, DownOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Dropdown, Tabs } from 'antd';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { reverse } from 'named-urls';
import { routes } from '../../../controller/routes';
import OverView from '../Tabs/OverView';
import Comment from '../Tabs/Comment';
import Mail from '../Tabs/Mail';
import { Transaction } from '../Tabs/Transaction';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getSingleVendor } from '../../../controller/api/purchase/vendorServices';
const { TabPane } = Tabs;

const VendorView = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [vendorData, setVendorData] = useState();
  const currentUserData = useSelector((state) => state.user.currentuser);
  useEffect(() => {
    if (currentUserData?.organizationId) {
      getItem(currentUserData?.organizationId);
    }
  }, [currentUserData]);
  const getItem = (organizationId) => {
    getSingleVendor({ id: params.id }, { organizationId: organizationId })
      .then((res) => {
        setVendorData(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const moreItem = [
    {
      key: '1',
      label: 'Clone Item'
    },
    {
      key: '2',
      label: 'Mark as Inactive'
    },
    {
      key: '3',
      label: 'Delete'
    },
    {
      key: '4',
      label: 'Add to group'
    }
  ];
  return (
    <div className="item-view-container w-100 bg-white">
      <div className="d-flex justify-content-between align-items-center pt-4 px-3">
        <div className="d-flex  align-items-center gap-2 fs-5 ">
          <ArrowLeftOutlined onClick={() => navigate(-1)} className="custom-back-button" />
          <span className="fw-medium">{vendorData?.firstName+" "+vendorData?.lastName}</span>
        </div>
        <div className="d-flex justify-content-center align-items-center gap-2 ">
          <Button
            className="d-flex justify-content-center align-items-center p-2 fs-5 bg-light"
            onClick={() => navigate(reverse(routes.purchase.vendor.edit, { id: params.id }))}>
            <EditOutlined />
          </Button>
          <Dropdown
            menu={{
              items: moreItem
            }}
            placement="bottomRight"
            arrow={{
              pointAtCenter: true
            }}
            trigger="click">
            <Button type="primary" className="d-flex justify-content-center align-items-center">
              More <DownOutlined />
            </Button>
          </Dropdown>
        </div>
      </div>
      <Tabs defaultActiveKey="1" className="item-view-tabs">
        <TabPane tab={<h6 className="m-0">Overview</h6>} className="" key="1">
          <div
            className="w-100"
            style={{
              maxHeight: '80vh',
              height: '100%',
              overflow: 'scroll'
            }}>
            <OverView vendorData={vendorData} />
          </div>
        </TabPane>
        <TabPane tab={<h6 className="m-0">Comment</h6>} className="" key="2">
          <div
            className="w-100 p-3"
            style={{
              maxHeight: '70vh',
              height: '100%',
              overflow: 'scroll',
              paddingBottom: '79px'
            }}>
            <Comment />
          </div>
        </TabPane>
        <TabPane tab={<h6 className="m-0">Transactions</h6>} className="" key="3">
          <div
            className="w-100"
            style={{
              maxHeight: '100vh',
              height: '100%',
              overflow: 'scroll',
              paddingBottom: '149px'
            }}>
            <Transaction />
          </div>
        </TabPane>
        <TabPane tab={<h6 className="m-0">Mails</h6>} className="" key="4">
          <div
            className="w-100 p-3"
            style={{
              maxHeight: '70vh',
              height: '100%',
              overflow: 'scroll',
              paddingBottom: '79px'
            }}>
            <Mail />
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default VendorView;
