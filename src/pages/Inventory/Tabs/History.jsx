import { Table } from 'antd'
import React, { useState } from 'react'

const History = () => {
  
  const HistaryTableColoumn = [
    {
        title: 'DATE',
        dataIndex: 'date',
    },
    {
        title: 'DETAILS',
        dataIndex: 'details',
    },
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
                            columns={HistaryTableColoumn}
                            rowClassName="editable-row"
                            pagination={{
                                current: currentPage,
                                pageSize: 4,
                                onChange: handleChangePage
                            }}
                        />
    </div>
  )
}

export default History
