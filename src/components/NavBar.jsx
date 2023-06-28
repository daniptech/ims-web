import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Input, Select } from 'antd'
import { Header } from 'antd/es/layout/layout'
import Search from 'antd/es/transfer/search'
import React from 'react'

const NavBar = () => {
    const { Option } = Select
    const selectBefore = (
        <Select value={""}>
            <Option value="http://">http://</Option>
            <Option value="https://">https://</Option>
        </Select>
    );
    return (
        <>
            <Header
                style={{
                    padding: 0,
                    height: 40,
                    background: '#1677FF'
                }}
                className='d-flex w-100 justify-content-center align-items-center position-sticky overflow-hidden'
            >
                <div className='d-flex w-100 justify-content-between align-items-center p-4'>

                    <div className='text-white d-flex  align-items-center gap-3'>
                        <FontAwesomeIcon icon={faClockRotateLeft} rotation={180} />
                        <Input allowClear />
                    </div>
                    <div className='text-white d-flex align-items-center gap-3'>
                        <FontAwesomeIcon icon={faClockRotateLeft} rotation={180} />
                        <Input allowClear />
                    </div>
                </div>

            </Header>
        </>
    )
}

export default NavBar