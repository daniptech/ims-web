import React from 'react';
import { ArrowLeftOutlined, DownOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Dropdown } from 'antd';
import { useNavigate } from 'react-router-dom';
export const BackHeader = ({ items, createBundle, headerTitle, editScreen }) => {
  const navigate = useNavigate();
  return (
    <div className="d-flex justify-content-between align-items-center pt-4 px-3">
      <div className="d-flex  align-items-center gap-2 fs-5 ">
        <ArrowLeftOutlined onClick={() => navigate(-1)} className="custom-back-button" />
        <span className="fw-medium">{headerTitle}</span>
      </div>
      <div className="d-flex justify-content-center align-items-center gap-2 ">
        <Button
          className="d-flex justify-content-center align-items-center p-2 fs-5 bg-light"
          onClick={() => navigate(editScreen)}
        >
          <EditOutlined />
        </Button>
        {createBundle && <Button type="primary">{createBundle}</Button>}
        <Dropdown
          menu={{
            items: items
          }}
          placement="bottomRight"
          arrow={{
            pointAtCenter: true
          }}
          trigger="click"
        >
          <Button type="primary" className="d-flex justify-content-center align-items-center">
            More <DownOutlined />
          </Button>
        </Dropdown>
      </div>
    </div>
  );
};
