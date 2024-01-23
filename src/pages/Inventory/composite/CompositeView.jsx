import { ArrowLeftOutlined, DownOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Dropdown, Tabs, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Icons } from '../../../controller/Images';
import OverView from '../Tabs/OverView';
import Transaction from '../Tabs/Transaction';
import BuildingHistory from '../Tabs/BuildingHistory';
import History from '../Tabs/History';
import { routes } from '../../../controller/routes';
import { reverse } from 'named-urls';
import { getSingleItem } from '../../../controller/api/inventory/itemService';
import { useSelector } from 'react-redux';
import { removeCompositeItem } from '../../../controller/api/inventory/compositeServices';
import { accesslevel, moduleEnum } from '../../../controller/enum';
import { hasAccessFeature } from '../../../controller/global';

const CompositeView = () => {
  const params = useParams();
  const { TabPane } = Tabs;
  const navigate = useNavigate();
  const [itemData, setItemData] = useState();
  const currentUserData = useSelector((state) => state.user.currentuser);
  useEffect(() => {
    getItem();
  }, [currentUserData]);
  const getItem = () => {
    getSingleItem({ id: params.id }, { organizationId: currentUserData?.organizationId.toString() })
      .then((res) => {
        setItemData(res?.data);
      })
      .catch((err) => {
        if (err?.response?.data?.error?.code == 500) {
          message.error(err?.response?.data?.error?.message);
          navigate(routes?.inventory?.compositeItem?.self);
        }
      });
  };
  const moreItems = [
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
      label: 'Delete',
      onClick: () => {
        removeCompositeItem({ id: params.id })
          .then((res) => {
            if (res) {
              message.success('Composite Item sucessfully deleted');
              navigate(routes.inventory.compositeItem.self);
            }
          })
          .catch((err) => console.log('err ===>', err));
      }
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
          <span className="fw-medium">{itemData?.name}</span>
        </div>
        {hasAccessFeature(accesslevel.write,moduleEnum.Inventory_composite_items)&&<div className="d-flex justify-content-center align-items-center gap-2 ">
          <Button
            className="d-flex justify-content-center align-items-center p-2 fs-5 bg-light"
            onClick={() =>
              navigate(reverse(routes.inventory.compositeItem.edit, { id: params.id }))
            }
          >
            <EditOutlined />
          </Button>
          <Button type="primary">Create Bundle</Button>
          <Dropdown
            menu={{
              items: moreItems
            }}
            placement="bottomRight"
            arrow={{
              pointAtCenter: true
            }}
            trigger="click"
          >
            <Button type="primary" className="d-flex justify-content-center align-items-center">
              More <DownOutlined />
            </Button>
          </Dropdown>
        </div>}
      </div>
      <div className="fs-6 d-flex align-items-center " style={{ marginLeft: '40px' }}>
        <span>{itemData?.sku}</span>&nbsp;&nbsp;
        {itemData?.isReturnable && (
          <>
            <div className="rounded-circle bg-danger" style={{ height: '5px', width: '5px' }}></div>{' '}
            &nbsp;&nbsp; <img src={Icons.uTurn} width={15} alt="" />
            &nbsp;Returnable Item
          </>
        )}
      </div>
      <Tabs defaultActiveKey="1" className="item-view-tabs">
        <TabPane tab={<h6 className="m-0">Overview</h6>} className="" key="1">
          <div
            className="w-100 px-3"
            style={{
              maxHeight: '70vh',
              height: '100%',
              overflow: 'scroll',
              paddingBottom: '79px'
            }}
          >
            <OverView inventoryitem={'composite'} itemData={itemData} />
          </div>
        </TabPane>
        <TabPane tab={<h6 className="m-0">Transactions</h6>} className="" key="2">
          <div
            className="w-100 p-3"
            style={{
              maxHeight: '70vh',
              height: '100%',
              overflow: 'scroll',
              paddingBottom: '79px'
            }}
          >
            <Transaction />
          </div>
        </TabPane>
        <TabPane tab={<h6 className="m-0">Building History</h6>} className="" key="3">
          <div
            className="w-100 p-3"
            style={{
              maxHeight: '70vh',
              height: '100%',
              overflow: 'scroll',
              paddingBottom: '79px'
            }}
          >
            <BuildingHistory />
          </div>
        </TabPane>
        <TabPane tab={<h6 className="m-0">History</h6>} className="" key="4">
          <div
            className="w-100 p-3"
            style={{
              maxHeight: '70vh',
              height: '100%',
              overflow: 'scroll',
              paddingBottom: '79px'
            }}
          >
            <History />
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default CompositeView;
