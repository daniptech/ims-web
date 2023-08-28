import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Select, Button, Input } from 'antd';
import React, { useEffect } from 'react';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
export const ContactPerson = ({ contectPerson, setContectPerson }) => {
  // const [tbodyCount, setTbodyCount] = React.useState(1);
  // const handleIncrement = () => {
  //   setTbodyCount((prevCount) => prevCount + 1);
  // };

  const addRow = () => {
    setContectPerson([
      ...contectPerson,
      {
        salutation: '',
        firstName: '',
        lastName: '',
        email: '',
        workPhone: '',
        mobile: '',
        skypeNameNumber: '',
        designation: '',
        department: ''
      }
    ]);
  };
  const deleteRow = (delindex) => {
    console.log(contectPerson);
    if (contectPerson?.length > 1) {
      const filterContectPerson = contectPerson?.filter((val, index) => index !== delindex);
      setContectPerson(filterContectPerson);
    } else {
      Object.keys(contectPerson[0])?.map((key) => {
        contectPerson[0][key] = '';
      });
    }
  };
  const handleChange = (value, index, name) => {
    const data = [...contectPerson];
    data[index][name] = value;
    setContectPerson(data);
  };
  return (
    <div>
      <div style={{ width: '100%' }} className="mb-2">
        <table className="w-100 custom-table-create">
          <thead className="w-100">
            <tr className="border-bottom border-top">
              <th style={{ width: '10%' }} className="border-end">
                Salutation
              </th>
              <th style={{ width: '10%' }} className="border-end text-center">
                First Name
              </th>
              <th style={{ width: '10%' }} className="border-end text-center">
                Last Name
              </th>
              <th style={{ width: '10%' }} className="border-end text-center">
                Email Address
              </th>
              <th style={{ width: '10%' }} className="border-end text-center">
                Work Phone
              </th>
              <th style={{ width: '10%' }} className="border-end text-center">
                Mobile
              </th>
              <th style={{ width: '10%' }} className="border-end text-left">
                SkypeName/Number
              </th>
              <th style={{ width: '10%' }} className="border-end text-center">
                Designation
              </th>
              <th style={{ width: '10%' }} className="border-end text-center">
                Department
              </th>
            </tr>
          </thead>
          {contectPerson.map((val, index) => (
            <tbody key={index} className="w-100">
              <tr className="border-bottom">
                <td style={{ width: '10%' }} className="border-end">
                  <div className="d-flex gap-2">
                    <Select
                      defaultValue=""
                      style={{ width: 120 }}
                      name="salutation"
                      value={val?.salutation}
                      onChange={(value) => handleChange(value, index, 'salutation')}
                      bordered={false}
                      options={[
                        { value: 'mr', label: 'Mr.' },
                        { value: 'mrs', label: 'Mrs' },
                        { value: 'ms', label: 'Ms' },
                        { value: 'miss', label: 'Miss' },
                        { value: 'dr', label: 'Dr.' }
                      ]}
                    />
                  </div>
                </td>
                <td style={{ width: '10%' }} className="border-end">
                  <Input
                    name="firstName"
                    onChange={(event) => handleChange(event.target.value, index, 'firstName')}
                    value={val?.firstName}
                    className="item-detail"
                  />
                </td>
                <td style={{ width: '10%' }} className="border-end">
                  <Input
                    name="lastName"
                    value={val?.lastName}
                    onChange={(event) => handleChange(event.target.value, index, 'lastName')}
                    className="item-detail"
                  />
                </td>
                <td style={{ width: '10%' }} className="border-end">
                  <Input
                    name="email"
                    value={val?.email}
                    className="item-detail"
                    onChange={(event) => handleChange(event.target.value, index, 'email')}
                  />
                </td>
                <td style={{ width: '10%' }} className="border-end">
                  <Input
                    name="workPhone"
                    value={val?.workPhone}
                    className="item-detail"
                    onChange={(event) => handleChange(event.target.value, index, 'workPhone')}
                  />
                </td>
                <td style={{ width: '10%' }} className="border-end">
                  <Input
                    name="mobile"
                    onChange={(event) => handleChange(event.target.value, index, 'mobile')}
                    value={val?.mobile}
                    className="item-detail"
                  />
                </td>
                <td style={{ width: '10%' }} className="border-end">
                  <Input
                    name="skypeNameNumber"
                    value={val?.skypeNameNumber}
                    className="item-detail"
                    onChange={(event) => handleChange(event.target.value, index, 'skypeNameNumber')}
                  />
                </td>
                <td style={{ width: '10%' }} className="border-end">
                  <Input
                    name="designation"
                    value={val?.designation}
                    onChange={(event) => handleChange(event.target.value, index, 'designation')}
                    className="item-detail"
                  />
                </td>
                <td style={{ width: '10%' }} className="border-end">
                  <Input
                    name="department"
                    value={val?.department}
                    className="item-detail"
                    onChange={(event) => handleChange(event.target.value, index, 'department')}
                  />
                </td>
                <td style={{ width: '4%' }} className="p-3">
                  <Button type="text" onClick={() => deleteRow(index)}>
                    <FontAwesomeIcon icon={faCircleXmark} style={{ color: '#e26a6a' }} />
                  </Button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <div className="mb-2">
        <Button type="text" onClick={() => addRow()}>
          <div className="d-flex gap-2 align-items-center justify-content-center">
            <FontAwesomeIcon icon={faCirclePlus} style={{ color: '#005eff' }} /> Add Contact Person
          </div>
        </Button>
      </div>
    </div>
  );
};