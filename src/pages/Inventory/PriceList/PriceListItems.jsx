import { DeleteOutlined, LineOutlined } from '@ant-design/icons';
import { Button, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../controller/routes';
import { reverse } from 'named-urls';
import axios from 'axios';
import { CurrencyEnum, priceSchemaEnum, roundOfSchemaEnum } from "../../../controller/enum";
import { Bars } from "react-loader-spinner";

const data = [
  {
    key: '1',
    name: 'John Brown',
    description: 'hello',
    currency: null,
    details: '12% Markup',
    priceing_scheme: 'Unit Pricing',
    round_off_preference: 'Never mind',
    active: true
  },
  {
    key: '2',
    name: 'John Brown',
    description: 'hello',
    currency: null,
    details: '12% Markup',
    priceing_scheme: 'Unit Pricing',
    round_off_preference: 'Never mind',
    active: false
  },
  {
    key: '3',
    name: 'John Brown',
    description: 'hello',
    currency: null,
    details: '12% Markup',
    priceing_scheme: 'Unit Pricing',
    round_off_preference: 'Never mind',
    active: true
  },
  {
    key: '4',
    name: 'John Brown',
    description: 'hello',
    currency: null,
    details: '12% Markup',
    priceing_scheme: 'Unit Pricing',
    round_off_preference: 'Never mind',
    active: true
  },
  {
    key: '5',
    name: 'John Brown',
    description: 'hello',
    currency: null,
    details: '12% Markup',
    priceing_scheme: 'Unit Pricing',
    round_off_preference: 'Never mind',
    active: false
  },
  {
    key: '6',
    name: 'John Brown',
    description: 'hello',
    currency: null,
    details: '12% Markup',
    priceing_scheme: 'Unit Pricing',
    round_off_preference: 'Never mind',
    active: true
  }
];

const PriceListItems = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [priceList, setPriceList] = useState([]);
  const [loader, setloader] = useState(false);
  useEffect(() => {
    setloader(true)
    axios
      .get('https://run.mocky.io/v3/6fd98cbe-5867-4b3b-8c9e-1b50e0eaa1ef')
      .then((res) => {
        setPriceList(res.data);
        setloader(false)
      })
      .catch((err) => {
        setloader(false)
        console.log('err ------>', err);
      });
  }, []);
  const columns = [
    {
      title: 'NAME AND DESCRIPTION',
      dataIndex: '',
      render: (record) => {
        return (
          <>
            <div className="d-flex flex-column">
              <span
                className="text-primary"
                style={{ cursor: 'pointer' }}
                onClick={() =>
                  navigate(reverse(routes.inventory.priceList.edit, { id: record.id }))
                }>
                {record.name}
              </span>
              <span>{record.description}</span>
            </div>
          </>
        );
      }
    },
    {
      title: 'CURRENCY',
      dataIndex: 'currency',
      render: (item,record) => {
        return <>{record?.currency ? `${CurrencyEnum[record?.currency]?.code} - ${CurrencyEnum[record?.currency]?.name}` : '-'}</>;
      }
    },
    {
      title: 'DETAILS',
      dataIndex: '',
      render:(record)=>{
        return(
          <span>{`${record?.percentage} % ${record?.percentage_type}`}</span>
        )
      }
    },
    {
      title: 'PRICING SCHEME',
      dataIndex: 'pricing_scheme',
      render: (item,record) => {
        return <>{record?.pricing_scheme ? priceSchemaEnum[record?.pricing_scheme]  : '-'}</>;
      }
    },
    {
      title: 'ROUND OFF PREFERENCE',
      dataIndex: 'round_off_to',
      render:(item,record)=>{
        return(
          <>{item?roundOfSchemaEnum[item]:"-"}</>
        )
      }
    },
    {
      title: '',
      dataIndex: '',
      render: (record) => {
        return (
          <div className="d-flex align-items-center gap-2 action-btn">
            <span
              className="text-primary"
              style={{ cursor: 'pointer' }}
              onClick={() =>
                navigate(reverse(routes.inventory.priceList.edit, { id: record.id }))
              }>
              Edit
            </span>
            <LineOutlined rotate={90} />
            <span className="text-primary" style={{ cursor: 'pointer' }}>
              {record.active ? 'Make as Active' : 'Make as inActive'}
            </span>
            <LineOutlined rotate={90} />
            <DeleteOutlined className="text-danger" style={{ cursor: 'pointer' }} />
          </div>
        );
      }
    }
  ];

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className="w-100 h-100 position-relative">
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
      <div className="w-100 p-3 d-flex justify-content-between align-items-center">
        <Select
          className="item-table-filter"
          bordered={false}
          // labelInValue
          defaultValue={{
            value: 'all_price_lists',
            label: 'All Price Lists',
            name: 'All Price Lists'
          }}
          style={{
            width: 'auto'
          }}
          optionLabelProp="name"
          onChange={(val) => console.log(val)}
          options={[
            {
              value: 'all_price_lists',
              label: 'All',
              name: 'All Price Lists'
            },
            {
              value: 'sales_price_lists ',
              label: 'Sales',
              name: 'Sales Price Lists '
            },
            {
              value: 'purchase_price_lists',
              label: 'Purchase',
              name: 'Purchase Price Lists'
            }
          ]}
        />
        <Button
          type="primary"
          className="fs-6 d-flex justify-content-center align-items-center fw-medium"
          onClick={() => navigate(routes.inventory.priceList.new)}>
          + New Price List
        </Button>
      </div>
      <div className=" p-3">
        <Table
          className="price_list_Tale"
          columns={columns}
          dataSource={priceList}
          pagination={{
            current: currentPage,
            pageSize: 6,
            onChange: handleChangePage
          }}
        />
      </div>
      </div>
    </div>
  );
};

export default PriceListItems;
