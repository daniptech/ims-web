import { CloseOutlined, ScanOutlined } from '@ant-design/icons';
import { Drawer, Tabs } from 'antd';
import React from 'react';
const { TabPane } = Tabs;
const NotificationDrawer = ({ notificationdrawer, setNotificationDrawer }) => {
  return (
    <Drawer
      placement="right"
      width={'40%'}
      className="notification-drawer"
      closeIcon={false}
      open={notificationdrawer}
    >
      <div className="w-100">
        <div className="d-flex justify-content-between align-items-center p-3 bg-light">
          <span className="fs-5 fw-semibold">Notifications</span>
          <CloseOutlined
            style={{ cursor: 'pointer' }}
            onClick={() => setNotificationDrawer(false)}
          />
        </div>
        <Tabs defaultActiveKey="1" className="w-100 bg-light">
          <TabPane tab="Organization" className=" m-0" key="1">
            <div
              className="w-100 bg-white p-0 m-0"
              style={{
                maxHeight: '85vh',
                height: '100%',
                overflow: 'scroll'
              }}
            >
              <div className="w-100 p-4">
                <div className="w-100 d-flex gap-4 border-bottom pb-3">
                  <div className="border p-2 rounded-2">
                    <ScanOutlined style={{ width: '25px' }} />
                  </div>
                  <div className="d-flex flex-column">
                    <span>Document has been scanned</span>
                    <span>26/07/2023 12:49 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </TabPane>
          <TabPane tab="Announcements" className="" key="2">
            <div
              className="w-100 bg-white p-0 m-0"
              style={{
                maxHeight: '85vh',
                height: '100%',
                overflow: 'scroll'
              }}
            >
              <div className="w-100 bg-light border-bottom">
                <div className="p-3">
                  <div className="w-100 d-flex gap-4 pb-3">
                    <div className="border p-2 rounded-2">
                      <ScanOutlined style={{ width: '25px' }} />
                    </div>
                    <div className="d-flex flex-column">
                      <span>Document has been scanned</span>
                      <span>26/07/2023 12:49 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </Drawer>
  );
};

export default NotificationDrawer;
