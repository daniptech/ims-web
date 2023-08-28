import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { routes } from '../../../controller/routes';
import { reverse } from 'named-urls';
import Overview from './CustomerTabs/Overview';
import { Mail } from './CustomerTabs/Mail';
import { Transactions } from './CustomerTabs/Transactions';
import { Comment } from './CustomerTabs/Comment';
import { BackHeader } from '../../../components/BackHeader';
import { TopTaps } from '../../../components/TopTaps';
import { getSingleCustomer, removeCustomer } from '../../../controller/api/sales/customerServices';
import { Bars } from 'react-loader-spinner';
import { Button, Dropdown, message } from 'antd';
import { ArrowLeftOutlined, DownOutlined, EditOutlined } from '@ant-design/icons';
const CustomerView = () => {
  const navigate = useNavigate();
  const [singlecustomer, setSinglecustomer] = useState();
  const params = useParams();
  const [loader, setloader] = useState(false);

  useEffect(() => {
    getsinglecustomerData(params.id);
  }, [params]);
  const getsinglecustomerData = (id) => {
    setloader(true);
    getSingleCustomer({ id })
      .then((res) => setSinglecustomer(res.data))
      .catch((err) => console.log('err ====>', err))
      .finally(() => setloader(false));
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
        removeCustomer({ id: params?.id })
          .then((res) => {
            message.success('Customer Sucessfully Deleted');
            navigate(routes.sales.customers.self);
          })
          .catch((err) => console.log('err ====>', err));
      }
    },
    {
      key: '4',
      label: 'Add to group'
    }
  ];
  let tabList = [
    {
      title: 'OverView',
      component: <Overview singlecustomer={singlecustomer} />
    },
    {
      title: 'Comments',
      component: <Comment />
    },
    {
      title: 'Transactions',
      component: <Transactions />
    },
    {
      title: 'Mail',
      component: <Mail />
    }
  ];
  return (
    <div className="w-100 position-relative ">
      {loader && (
        <div
          className="d-flex justify-content-center align-items-center w-100 position-absolute"
          style={{ height: '100vh', zIndex: '11111' }}>
          <Bars
            height="130"
            width="130"
            color="#1677ff"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={loader}
          />
        </div>
      )}
      <div className={`w-100 h-100 ${loader && ' opacity-25'}`}>
        <div className="item-view-container w-100 bg-white">
          <BackHeader
            headerTitle={
              singlecustomer?.salutation +
              ' ' +
              singlecustomer?.firstName +
              ' ' +
              singlecustomer?.lastName
            }
            items={moreItems}
            editScreen={reverse(routes.sales.customers.edit, { id: params.id })}
          />
          <TopTaps tapItem={tabList} />
        </div>
      </div>
    </div>
  );
};
export default CustomerView;
