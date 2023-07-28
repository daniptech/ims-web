import { DownOutlined } from '@ant-design/icons';
import CanvasJSReact from '@canvasjs/react-charts';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown, Space } from 'antd';
import React from 'react'
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const ChartView = () => {
    const options = {
        // animationEnabled:     true,
        // exportEnabled: true,
        theme: "light2", // "light1", "dark1", "dark2"
        // title: {
        //     text: "Bounce Rate by Week of Year"
        // },
        axisY: {
            // title: "Bounce Rate",
            // suffix: "%",
            interval: 20
        },
        width: 600,
        height: 300,
        axisX: {
            // title: "Week of Year",
            // prefix: "W",
            interval: 2
        },
        data: [{
            type: "line",
            toolTipContent: "<div className=''><span>Rs.{x}</span><span>{y}</span></div>",
            dataPoints: [
                { x: 1, y: 64 },
                { x: 2, y: 61 },
                { x: 3, y: 64 },
                { x: 4, y: 62 },
                { x: 5, y: 64 },
                { x: 6, y: 60 },
                { x: 7, y: 58 },
                { x: 8, y: 59 },
                { x: 9, y: 53 },
                { x: 10, y: 54 },
                { x: 11, y: 61 },
                { x: 12, y: 60 },
                { x: 13, y: 55 },
                { x: 14, y: 60 },
                { x: 15, y: 56 },
                { x: 16, y: 60 },
                { x: 17, y: 59.5 },
                { x: 18, y: 63 },
                { x: 19, y: 58 },
                { x: 20, y: 54 },
                { x: 21, y: 59 },
                { x: 22, y: 64 },
                { x: 23, y: 59 },
                { x: 24, y: 1 },
            ]
        }]
    }
    return (
        <div>
            <div className='w-100 border border-black h-auto p-3'>
                <div className='d-flex justify-content-between'>
                    <span className='fs-6'>Sales Order Summary (In INR)</span>
                    <Dropdown trigger='click' className='fs-6'>
                        <Space>
                            Hover me
                            <DownOutlined />
                        </Space>
                    </Dropdown>
                </div>
                <hr />
                <div className='row col-12'>
                    <div className='col-7 border-end'>
                        <div className='w-100'><CanvasJSChart options={options} /></div>
                    </div>
                    <div className='col-2 d-flex flex-column gap-3'>
                        <div>Total Sales</div>
                        <div className='d-flex gap-3 chart-card' style={{ width: '100%' }}>
                            <FontAwesomeIcon icon={faCircle} style={{ color: "#0caee0", }} />
                            <div>
                                <span>DIRECT SALES</span>
                                <div>Rs.0.00</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChartView
