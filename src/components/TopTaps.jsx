import React from 'react'
import {Tabs } from 'antd'
export const TopTaps = ({tapItem}) => {
    const { TabPane } = Tabs;
  return (
    <Tabs defaultActiveKey="0" className="item-view-tabs">
       {tapItem.map((item,i)=>
        <TabPane tab={<h6 className='m-0'>{item.title}</h6>} className="" key={i}>
          <div className="w-100 px-3"
            style={{
              maxHeight: '90vh',
              height: '100%',
              overflow: 'scroll',
              paddingBottom: '79px'
            }}>
            {item.component}
          </div>
        </TabPane>
        )}
    </Tabs>
    )
}
