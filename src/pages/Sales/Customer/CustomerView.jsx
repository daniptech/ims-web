import React from 'react'
import { useParams } from 'react-router-dom'
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
    />
    <TopTaps
      tapItem={tabList}
    />
    </div>
  )
}
export default CustomerView