import { ArrowLeftOutlined, DownOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Dropdown, Tabs } from 'antd'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { routes } from '../../../components/controller/routes'
import { reverse } from 'named-urls'
import { Overview } from './CustomerTabs/Overview'
import { Mail } from './CustomerTabs/Mail'
import { Transactions } from './CustomerTabs/Transactions'
import { Comment } from './CustomerTabs/Comment'
import { BackHeader } from '../../../components/BackHeader'
import { TopTaps } from '../../../components/TopTaps'
const CustomerView = () => {
  const params = useParams()
  const { TabPane } = Tabs;
  const navigate = useNavigate()
  const moreItems = [
    {
      key: '1',
      label: "Clone Item",
    },
    {
      key: '2',
      label: "Mark as Inactive",
    },
    {
      key: '3',
      label: "Delete",
    },
    {
      key: '4',
      label: "Add to group",
    }
  ];
  let tabList = [
    {
      title:'OverView',
      component:<Overview/>,
    },
    {
      title:'Comments',
      component:<Comment />,
    },
    {
      title:'Transactions',
      component:<Transactions />,
    },
    {
      title:'Mail',
      component:<Mail/>,
    },
  ]
  return (
    <div className='item-view-container w-100 bg-white'>
    <BackHeader 
      headerTitle={'Mr.Test'}
      items={moreItems}
      editScreen={reverse(routes.sales.customers.edit ,{id:params.id})}
      createBundle={'Create Bundle'}
    />
    <TopTaps
      tapItem={tabList}
    />
      {/* <Tabs defaultActiveKey="1" className="item-view-tabs">
        <TabPane tab={<h6 className='m-0'>Overview</h6>} className="" key="1">
          <div className="w-100 px-3"
            style={{
              maxHeight: '70vh',
              height: '100%',
              overflow: 'scroll',
              paddingBottom: '79px'
            }}>
            <Overview />
          </div>
        </TabPane>
        <TabPane tab={<h6 className='m-0'>Comments</h6>} className="" key="2">
          <div className="w-100 px-3"
            style={{
              maxHeight: '70vh',
              height: '100%',
              overflow: 'scroll',
              paddingBottom: '79px'
            }}>
            <Comment />
          </div>
        </TabPane>
        <TabPane tab={<h6 className='m-0'>Transactions</h6>} className="" key="3">
                    <div className="w-100 p-3"
                        style={{
                            maxHeight: '70vh',
                            height: '100%',
                            overflow: 'scroll',
                            paddingBottom: '79px'
                        }}>
                        <Transactions />

                    </div>

                </TabPane>
                <TabPane tab={<h6 className='m-0'>Mails</h6>} className="" key="4">
                    <div className="w-100 p-3"
                        style={{
                            maxHeight: '70vh',
                            height: '100%',
                            overflow: 'scroll',
                            paddingBottom: '79px'
                        }}>
                        <Mail />

                    </div>

                </TabPane>
                <TabPane tab={<h6 className='m-0'>Statement</h6>} className="" key="5">
                    <div className="w-100 p-3"
                        style={{
                            maxHeight: '70vh',
                            height: '100%',
                            overflow: 'scroll',
                            paddingBottom: '79px'
                        }}>
                        <Statement />

                    </div>

                </TabPane>
      </Tabs> */}

    </div>
  )
}

export default CustomerView
