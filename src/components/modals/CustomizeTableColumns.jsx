import { LockOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { faEllipsisVertical, faSliders } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Checkbox, Input, List, Modal } from 'antd';
import React, { useState } from 'react';

const CustomizeTableColumns = ({ columns, setcolumns, customizeColoumn, setCustomizeColoumn }) => {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [draggedOverIndex, setDraggedOverIndex] = useState(null);
  const [dataList, setDataList] = useState(columns);
  const [searchItem, setSearchItem] = useState([]);

  const onDragStart = (index) => {
    setDraggedIndex(index);
  };

  const onDragOver = (index) => {
    setDraggedOverIndex(index);
  };

  const onDragEnd = () => {
    if (draggedIndex !== null && draggedOverIndex !== null && draggedIndex !== draggedOverIndex) {
      // Reorder the data array based on the dragged and dropped indices
      const reorderedData = [...dataList];
      const [draggedItem] = reorderedData.splice(draggedIndex, 1);
      reorderedData.splice(draggedOverIndex, 0, draggedItem);
      // Update the data state with the new order
      setDataList(reorderedData);
    }
    setDraggedIndex(null);
    setDraggedOverIndex(null);
  };
  const handleCheck = (checked, item) => {
    const data = [...dataList];
    const searchList = [...searchItem];
    const updateData = data?.map((val) => {
      if (val.id === item.id) {
        let value = { ...val };
        value.isVisible = checked;
        return value;
      } else {
        return val;
      }
    });
    const updateSearch = searchList?.map((val) => {
      if (val.id === item.id) {
        let value = { ...val };
        value.isVisible = checked;
        return value;
      } else {
        return val;
      }
    });
    setDataList(updateData);
    setSearchItem(updateSearch);
  };
  const handleSearch = (val) => {
    const dataItem = [...dataList];
    const filterData = dataItem?.filter((item) => {
      if (!item.title?.toLowerCase().search(val?.toLowerCase())) {
        return val;
      }
    });
    setSearchItem(filterData);
  };
  const renderItem = (item, index) => {
    return (
      <div
        className="mb-2 rounded-2 p-1 m-3 d-flex gap-2 text-muted align-items-center"
        style={{ background: '#f9f9fb' }}
        draggable
        onDragStart={() => onDragStart(index)}
        onDragOver={() => onDragOver(index)}
        onDragEnd={onDragEnd}
      >
        <div>
          <FontAwesomeIcon icon={faEllipsisVertical} style={{ color: '#a1a1a1' }} />
          <FontAwesomeIcon icon={faEllipsisVertical} style={{ color: '#a1a1a1' }} />
        </div>
        {item.lock ? (
          <LockOutlined />
        ) : (
          <Checkbox
            checked={item.isVisible}
            onChange={(val) => handleCheck(val.target.checked, item)}
          />
        )}
        <span>{item?.title}</span>
      </div>
    );
  };
  return (
    <Modal
      className="p-0 cusomize-table-column"
      title={
        <div
          className="w-100  d-flex justify-content-between align-items-center mb-2 rounded-top-3 p-3"
          style={{ height: '50px', background: '#f9f9fb' }}
        >
          <div className=" d-flex gap-2 justify-content-center align-items-center">
            <FontAwesomeIcon icon={faSliders} style={{ color: '#000' }} />
            <h4 className="m-0">Customize Columns</h4>
          </div>
          <div className=" d-flex justify-content-center align-items-center gap-2">
            <span className="border-end p-1">
              {dataList?.filter((val) => val.isVisible)?.length} of {dataList?.length} Selected
            </span>
            <PlusOutlined
              className="text-danger fw-bold"
              style={{ transform: 'rotate(45deg)' }}
              onClick={() => setCustomizeColoumn(false)}
            />
          </div>
        </div>
      }
      open={true}
      closable={false}
      okText={'Save'}
      onOk={() => {
        setcolumns(dataList);
        setCustomizeColoumn(false);
      }}
      onCancel={() => setCustomizeColoumn(false)}
    >
      <div className="p-3">
        <Input
          className=""
          placeholder="Search"
          prefix={<SearchOutlined />}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <List dataSource={searchItem?.length ? searchItem : dataList} renderItem={renderItem} />
    </Modal>
  );
};

export default CustomizeTableColumns;
