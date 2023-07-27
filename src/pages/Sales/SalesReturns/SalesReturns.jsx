import { Button, Divider } from 'antd';
import {CheckCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../components/controller/routes';
import Grap from '../../../assets/images/salesReturnGrap.png'
export const SalesReturns = () => {
  const navigate=useNavigate()
  return (
    <div className="w-100 h-100 justify-content-center align-items-center bg-light">
    <div className="p-3 text-center mt-4">
      <h4>Sales Returns</h4>
      <p>
        Process your product returns in a few simple steps and get your inventory automatically sorted out.
        <br />
        Start creating sales returns from sales orders
      </p>
      <br />
      <Button type="primary" onClick={()=>navigate(routes.sales.salesOrder.self)}>GO TO SALES ORDER</Button>
    </div>
    <Divider />
    <div className="p-3 text-center mt-4 ">
      <h4>Life cycle of a Sales Return</h4>
      <img src={Grap} alt="" width={'50%'}/>
      <Divider />
      <h6 className='me-4'>In the Sales Return section, you can:</h6>
        <div className="d-flex justify-content-center align-items-center mt-2">
           <CheckCircleOutlined className='text-primary'/>
          <h8 style={{marginLeft:'10px'}}>Record receives of the returned items.</h8>
        </div>
          <div className="d-flex justify-content-center align-items-center mt-2 me-5">
           <CheckCircleOutlined className='me-2 text-primary'/>
           <h8 style={{marginLeft:'10px'}}>Associate credits and refunds.</h8>
         </div>
    </div>
  </div>
  );
};