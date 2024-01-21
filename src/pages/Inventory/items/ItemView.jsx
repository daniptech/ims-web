import { ArrowLeftOutlined, DownOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Dropdown, Tabs, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { Icons } from '../../../controller/Images';
import { useNavigate, useParams } from 'react-router-dom';
import AdjustStock from '../../../components/modals/AdjustStock';
import OverView from '../Tabs/OverView';
import Transaction from '../Tabs/Transaction';
import History from '../Tabs/History';
import { reverse } from 'named-urls';
import { routes } from '../../../controller/routes';
import { getSingleItem, removeItem } from '../../../controller/api/inventory/itemService';
import { useSelector } from 'react-redux';
import { accesslevel, moduleEnum } from '../../../controller/enum';
import { hasAccessFeature } from '../../../controller/global';
const { TabPane } = Tabs;

const ItemView = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [openAdjustment, setOpenAdjustment] = useState(false);
  const [itemData, setItemData] = useState();
  const currentUserData = useSelector((state) => state.user.currentuser);
  useEffect(() => {
    getItem();
  }, [currentUserData]);
  const getItem = () => {
    getSingleItem({ id: params.id }, { organizationId: currentUserData?.organizationId })
      .then((res) => {
        setItemData(res?.data);
      })
      .catch((err) => {
        if (err?.response?.data?.error?.code == 500) {
          message.error(err?.response?.data?.error?.message);
          navigate(routes?.inventory?.items?.self);
        }
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
      label: 'Delete',
      onClick: () => {
        removeItem({ id: params.id })
          .then((res) => {
            if (res) {
              message.success('Item sucessfully deleted');
              navigate(routes.inventory.items.self);
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
        {hasAccessFeature(accesslevel.write,moduleEnum.Inventory_items)&&<div className="d-flex justify-content-center align-items-center gap-2 ">
          <Button
            className="d-flex justify-content-center align-items-center p-2 fs-5 bg-light"
            onClick={() => navigate(reverse(routes.inventory.items.edit, { id: params.id }))}
          >
            <EditOutlined />
          </Button>
          {itemData?.inventoryInfo !== null && (
            <Button type="primary" onClick={() => setOpenAdjustment(true)}>
              Adjust Stock
            </Button>
          )}
          <Dropdown
            menu={{
              items: moreItem
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
            <OverView inventoryitem={'item'} itemData={itemData} />
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
        <TabPane tab={<h6 className="m-0">History</h6>} className="" key="3">
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
      {openAdjustment && (
        <AdjustStock
          openAdjustment={openAdjustment}
          setOpenAdjustment={setOpenAdjustment}
          itemData={itemData}
        />
      )}
    </div>
  );
};

export default ItemView;
