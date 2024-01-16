import { DownOutlined } from '@ant-design/icons';
import CanvasJSReact from '@canvasjs/react-charts';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown, Space } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const ChartView = () => {
  function getLastDateOfCurrentMonth() {
    // Get the current date
    const currentDate = new Date();

    // Set the date to the first day of the next month
    currentDate.setMonth(currentDate.getMonth() + 1, 1);

    // Subtract one day to get the last day of the current month
    currentDate.setDate(currentDate.getDate() - 1);

    // Return the last date of the current month
    return currentDate;
  }

  console.log(dayjs(getLastDateOfCurrentMonth()).format('DD'), 'dkndldnldnd');
  const options = {
    // animationEnabled:     true,
    // exportEnabled: true,
    theme: 'light2', // "light1", "dark1", "dark2"
    // title: {
    //     text: "Bounce Rate by Week of Year"
    // },
    axisY: {
      interval: 1, // Y-axis interval set to 1k
      maximum: 8, // Maximum value for y-axis,
      minimum: 0,
      labelFormatter: (e) => {
        return `${e.value} k`;
      }
    },
    width: 650,
    height: 300,
    axisX: {
      interval: 1, // X-axis interval set to 2
      minimum: 0,
      maximum: dayjs(getLastDateOfCurrentMonth()).format('DD'), // Corrected property name from 'maximun' to 'maximum'
      labelFormatter: (e) => {
        // Display only odd values on the x-axis
        return e.value % 2 !== 0
          ? `${e.value} ${dayjs(getLastDateOfCurrentMonth()).format('MMM')}`
          : '';
      }
    },
    data: [
      {
        type: 'line',
        // toolTipContent: "<div className=''><span>Rs.{x}</span><span>{y}</span></div>",
        dataPoints: [
          { x: 1, y: 3 },
          { x: 4, y: 5 }
        ]
      }
    ]
  };
  return (
    <div>
      <div className="w-100 border border-black h-auto p-3">
        <div className="d-flex justify-content-between">
          <span className="fs-6">Sales Order Summary (In INR)</span>
          <Dropdown
            trigger="click"
            menu={{
              items: [{ key: 1, label: 'slsml' }]
            }}
            className="fs-6"
          >
            <Space>
              Hover me
              <DownOutlined />
            </Space>
          </Dropdown>
        </div>
        <hr />
        <div className="row col-12">
          <div className="col-8 border-end">
            <div className="w-100" style={{ position: 'relative' }}>
              <CanvasJSChart options={options} />
              {/* {[].length === 0 && (
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: 'red',
                    fontStyle: 'italic'
                  }}>
                  No data found
                </div>
              )} */}
            </div>
          </div>
          <div className="col-2 d-flex flex-column gap-3">
            <div>Total Sales</div>
            <div className="d-flex gap-3 chart-card" style={{ width: '100%' }}>
              <FontAwesomeIcon icon={faCircle} style={{ color: '#0caee0' }} />
              <div>
                <span>DIRECT SALES</span>
                <div>Rs.0.00</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartView;
