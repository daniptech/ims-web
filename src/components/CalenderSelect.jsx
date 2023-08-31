import { DownOutlined } from '@ant-design/icons';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, DatePicker, Dropdown, Menu, Space, theme } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';
const { RangePicker } = DatePicker;
const { useToken } = theme;
const CalenderSelect = ({ calenderDropDown, setCalenderDropDown }) => {
  const [openRangePicker, setOpenRangePicker] = useState(false);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const handleChange = (val) => {
    if (val.value === 'custom') {
      setOpenRangePicker(true);
    } else {
      setOpenRangePicker(false);
      switch (val.value) {
        case 'today':
          val['date'] = [dayjs(), dayjs()];
          break;
        default:
          break;
      }
      setCalenderDropDown(val);
    }
  };
  const { token } = useToken();

  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary
  };

  const items = [
    {
      value: 'today',
      label: 'Today'
    },
    {
      value: 'yesterday',
      label: 'Yesterday'
    },
    {
      value: 'this-week',
      label: 'This Week'
    },
    {
      value: 'this-month',
      label: 'This Month'
    },
    {
      value: 'previous-week',
      label: 'Previous Week'
    },
    {
      value: 'previous-month',
      label: 'Previous Month'
    },
    {
      value: 'previous-year',
      label: 'Previous Year'
    },
    {
      value: 'custom',
      label: 'Custom'
    }
  ];

  return (
    <>
      <Dropdown
        trigger="click"
        placement="bottom"
        open={dropDownOpen}
        onClick={() => setDropDownOpen(true)}
        dropdownRender={() => (
          <div style={contentStyle} className="d-flex" onMouseLeave={() => setDropDownOpen(false)}>
            {openRangePicker ? (
              <div className="p-2 border-end">
                <RangePicker
                  picker="inline"
                  value={calenderDropDown.date}
                  bordered={false}
                  onChange={(val) => console.log(val)}
                />
                <div className="d-flex gap-3 justify-content-end mt-3">
                  <Button type="primary">Apply</Button>
                  <Button type="" onClick={() => setOpenRangePicker(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              ''
            )}
            <div>
              <Menu className="shadow-none">
                {items.map((val, index) => {
                  return (
                    <>
                      <Menu.Item
                        key={index}
                        className={calenderDropDown.value === val.value && 'text-bg-primary'}
                        onClick={() => {
                          handleChange(val);
                        }}
                      >
                        {val.label}
                      </Menu.Item>
                    </>
                  );
                })}
              </Menu>
            </div>
          </div>
        )}
      >
        <Space className="d-flex" style={{ cursor: 'pointer' }}>
          <FontAwesomeIcon icon={faCalendarDays} />
          {calenderDropDown.label}
          <DownOutlined />
        </Space>
      </Dropdown>
    </>
  );
};

export default CalenderSelect;
