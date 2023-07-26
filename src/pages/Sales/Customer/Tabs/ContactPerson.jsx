import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Select,Button, Input } from 'antd'
import React from 'react'
import { faCircleXmark} from '@fortawesome/free-regular-svg-icons'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
export const ContactPerson = () => {
  const [tbodyCount, setTbodyCount] = React.useState(1);

  const handleIncrement = () => {
    setTbodyCount((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    setTbodyCount((prevCount) => Math.max(prevCount - 1, 1));
  };
  return (
   <div>
     <div style={{ width: '100%' }} className='mb-2'>
    <table className='w-100 custom-table-create'>
        <thead className='w-100'>
            <tr className='border-bottom border-top'>
                <th style={{ width: '10%' }} className='border-end' >Salutation</th>
                <th style={{ width: '10%' }} className='border-end text-center' >First Name</th>
                <th style={{ width: '10%' }} className='border-end text-center' >Last Name</th>
                <th style={{ width: '10%' }} className='border-end text-center'>Email Address</th>
                <th style={{ width: '10%' }} className='border-end text-center'>Work Phone</th>
                <th style={{ width: '10%' }} className='border-end text-center'>Mobile</th>
                <th style={{ width: '10%' }} className='border-end text-left'>SkypeName/Number</th>
                <th style={{ width: '10%' }} className='border-end text-center'>Designation</th>
                <th style={{ width: '10%' }} className='border-end text-center'>Department</th>
            </tr>
        </thead>
        {Array.from({ length: tbodyCount }).map((_, index) => (
        <tbody  key={index} className='w-100'>
            <tr className='border-bottom'>
                <td style={{ width: '10%' }} className='border-end' ><div className='d-flex gap-2'>
                <Select defaultValue="" style={{ width: 120 }} bordered={false} 
                  options={[
                    { value: 'mr', label: 'Mr.' },
                    { value: 'mrs', label: 'Mrs' },
                    { value: 'ms', label: 'Ms' },
                    { value: 'miss', label: 'Miss' },
                    { value: 'dr', label: 'Dr.' }
                  ]}
                />
                </div></td>
                <td style={{ width: '10%' }} className='border-end' ><Input className='item-detail'/></td>
                <td style={{ width: '10%' }} className='border-end' ><Input className='item-detail'/></td>
                <td style={{ width: '10%' }}  className='border-end' ><Input className='item-detail'/></td>
                <td style={{ width: '10%' }}  className='border-end' ><Input className='item-detail'/></td>
                <td style={{ width: '10%' }}  className='border-end' ><Input className='item-detail'/></td>
                <td style={{ width: '10%' }}  className='border-end' ><Input className='item-detail'/></td>
                <td style={{ width: '10%' }}  className='border-end' ><Input className='item-detail'/></td>
                <td style={{ width: '10%' }}  className='border-end' ><Input className='item-detail'/></td>
                <td style={{ width: '4%' }} className='p-3'><Button type='text' onClick={handleDecrement}><FontAwesomeIcon icon={faCircleXmark} style={{ color: "#e26a6a", }} /></Button></td>
            </tr>
            
        </tbody>
        ))}
    </table>
</div>
<div className='mb-2'>
    <Button type='text' onClick={handleIncrement}>
      <div className='d-flex gap-2 align-items-center justify-content-center'>
      <FontAwesomeIcon icon={faCirclePlus} style={{color: "#005eff",}} />  Add Contact Person
      </div>
    </Button>
  </div>
   </div>
  )
}
