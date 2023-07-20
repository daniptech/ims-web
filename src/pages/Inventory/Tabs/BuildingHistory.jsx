import { Table } from 'antd'
import React, { useState } from 'react'

const BuildingHistory = () => {
  const BuildingHistoryTableColumn = [
    {
      title: 'Date',
      dataIndex: 'date',
      sorter: (a, b) => a.date.length - b.date.length,
      sortDirections: ['descend', 'ascend'],
      isVisible: true,
      lock: true,
    },
    {
      title: 'BUNDLING#',
      dataIndex: 'building',
    },
    {
      title: 'CUSTOMER NAME',
      dataIndex: 'customer_name',
    },
    {
      title: 'QUANTITY BUNDLED',
      dataIndex: 'quantity_bundled',
    },
    {
      title: 'TOTAL',
      dataIndex: 'total',
    }
  ]
  const [currentPage, setCurrentPage] = useState(1);

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };
  return (
    <div>
      <Table
        // bordered
        dataSource={[]}
        columns={BuildingHistoryTableColumn}
        rowClassName="editable-row"
        pagination={{
          current: currentPage,
          pageSize: 6,
          onChange: handleChangePage
        }}
      />
    </div>
  )
}

export default BuildingHistory
