import React from 'react'
import { FileOutlined, PieChartOutlined, UserOutlined, DesktopOutlined, TeamOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartFlatbed } from '@fortawesome/free-solid-svg-icons';
const { Sider } = Layout;
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [
    getItem('Home', '1', <PieChartOutlined />),
    getItem('Inventory', '2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />, [getItem('Team 1', '10'), getItem('Team 2', '11')]),

];
const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (

        <Sider className='bg-white position-sticky  custom-sidebar' style={{ maxHeight: '100vh' }} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <div className="demo-logo-vertical d-flex justify-content-center align-items-center text-white gap-2" style={{height:'40px',background:'#1677FF'}} ><FontAwesomeIcon icon={faCartFlatbed} />{!collapsed&&<span>Inventory</span>}</div>
            <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={(val)=>console.log(val)}/>
        </Sider>
    )
}

export default Sidebar