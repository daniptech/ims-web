import { ArrowLeftOutlined, DownOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, DatePicker, Divider, Dropdown, Form, Image, Input, Radio, Select, Space, Table, Upload, message } from 'antd'
import React from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Icons, Images } from '../../../components/controller/Images'
import { faCircleXmark, faImage } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'

const CreateAndEditInventoryAdjustment = () => {
    const [form] = Form.useForm()
    const navigate = useNavigate()
    const params = useParams()
    const inputRef = useRef(null);
    const [reasonItems, setReasonItems] = useState();
    const [reasonName, setReasonName] = useState('');
    const onReasonNameInputChange = (event) => {
        setReasonName(event.target.value);
    };
    const addReasonItem = (e) => {
        e.preventDefault();
        if (reasonItems?.length) {
            setReasonItems([...reasonItems, reasonName]);
        } else {
            setReasonItems([reasonName]);
        }
        setReasonName('');
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };
    const uploadFile = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
        beforeUpload: (file) => {
            const isFileTypeValid = file.type === 'image/jpeg' || file.type === 'image/png'; // Add the desired file types here
            const isSizeValid = file.size / 1024 / 1024 <= 5; // Maximum file size of 5MB

            if (!isFileTypeValid) {
                message.error('You can only upload JPEG or PNG files!');
            }

            if (!isSizeValid) {
                message.error('File size must be less than or equal to 5MB!');
            }

            return isFileTypeValid && isSizeValid;
        },
        onChange({ file, fileList }) {
            if (file.status !== 'uploading') {
                console.log(file, fileList);
            }
        },
    };
    return (
        <div className='w-100'>
            <div className='w-100 bg-white p-3 border-bottom d-flex align-items-center justify-content-between '>
                <div className='d-flex align-items-center gap-4 fs-5'>
                    <ArrowLeftOutlined className='custom-back-button' onClick={() => navigate(-1)} />
                    <span className='fw-medium'>{params.id ? "Edit" : "New"} Adjustment</span>
                </div>
                <div className='d-flex align-items-center gap-4 fs-5'>
                    <Button onClick={() => navigate(-1)}>Cancel</Button>
                    <Button type='primary' htmlType='submit' form='conpositeForm' >Submit</Button>
                </div>
            </div>
            <div
                className='w-100 position-relative '
                style={{
                    maxHeight: '100vh',
                    height: '100%',
                    overflow: 'scroll',
                    paddingBottom: '100px'
                }}
            >
                <Form
                    layout="vertical"
                    name="adjustmentForm"
                    form={form}
                    initialValues={{
                        mode_of_adjustment: 'quantity_adjustment'
                    }}
                    onFinish={(val) => console.log(val)}
                >
                    <div className='row col-12 p-4'>
                        <div className='col-6'>
                            <div className='row col-12'>
                                <div className='col-4'>
                                    Mode of adjustment
                                </div>
                                <div className='col-8'>
                                    <Form.Item
                                        name='mode_of_adjustment'
                                    >
                                        <Radio.Group>
                                            <Space direction="vertical">
                                                <Radio value='quantity_adjustment'>Quantity Adjustment</Radio>
                                                <Radio value='value_adjustment'>Value Adjustment</Radio>
                                            </Space>
                                        </Radio.Group>
                                    </Form.Item>
                                </div>
                            </div>
                            <div className='row col-12'>
                                <div className='col-4'>
                                    Reference Number
                                </div>
                                <div className='col-8'>
                                    <Form.Item
                                        name='reference_number'
                                    >
                                        <Input />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className='row col-12'>
                                <div className='col-4'>
                                    <span className='text-danger'>Date *</span>
                                </div>
                                <div className='col-8'>
                                    <Form.Item
                                        name='date'
                                    >
                                        <DatePicker className='w-100' />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className='row col-12'>
                                <div className='col-4'>
                                    <span className='text-danger'>Account *</span>
                                </div>
                                <div className='col-8'>
                                    <Form.Item
                                        name='account'
                                    >
                                        <Select
                                            options={[
                                                {
                                                    label: 'Manager',
                                                    options: [
                                                        {
                                                            label: 'Jack',
                                                            value: 'jack',
                                                        },
                                                        {
                                                            label: 'Lucy',
                                                            value: 'lucy',
                                                        },
                                                    ],
                                                },
                                                {
                                                    label: 'Engineer',
                                                    options: [
                                                        {
                                                            label: 'yiminghe',
                                                            value: 'Yiminghe',
                                                        },
                                                    ],
                                                },
                                            ]}
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className='row col-12'>
                                <div className='col-4'>
                                    <span className='text-danger'>Reason *</span>
                                </div>
                                <div className='col-8'>
                                    <Form.Item
                                        name='reason'
                                    >
                                        <Select
                                            placeholder="custom dropdown render"
                                            dropdownRender={(menu) => (
                                                <>
                                                    {menu}
                                                    <Divider
                                                        style={{
                                                            margin: '8px 0',
                                                        }}
                                                    />
                                                    <Space
                                                        style={{
                                                            padding: '0 8px 4px',
                                                        }}
                                                    >
                                                        <Input
                                                            placeholder="Please enter item"
                                                            ref={inputRef}
                                                            value={reasonName}
                                                            onChange={onReasonNameInputChange}
                                                        />
                                                        <Button type="text" icon={<PlusOutlined />} onClick={addReasonItem}>
                                                            Add item
                                                        </Button>
                                                    </Space>
                                                </>
                                            )}
                                            options={reasonItems?.map((item) => ({
                                                label: item,
                                                value: item,
                                            }))}
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className='row col-12'>
                                <div className='col-4'>
                                    <span className=''>Description </span>
                                </div>
                                <div className='col-8'>
                                    <Form.Item
                                        name='description'
                                    >
                                        <Input.TextArea maxLength={500} placeholder='mAX. 500 characters' />
                                    </Form.Item>
                                </div>
                            </div>
                        </div>


                        <div style={{ width: '80%' }} className='mb-2'>
                            <table className='w-100 custom-table-create'>
                                <thead className='w-100'>
                                    <tr className='border-bottom border-top'>
                                        <th style={{ width: '40%' }} className='border-end' >ITEM DETAILS</th>
                                        <th style={{ width: '20%' }} className='border-end text-end' >QUANTITY AVAILABLE</th>
                                        <th style={{ width: '20%' }} className='border-end text-end' >NEW QUANTITY ON HAND</th>
                                        <th style={{ width: '20%' }} className='text-end'>QUANTITY ADJUSTED</th>
                                    </tr>
                                </thead>
                                <tbody className='w-100'>
                                    <tr className='border-bottom'>
                                        <td style={{ width: '40%' }} className='border-end' ><div className='d-flex gap-2'>
                                            <div className='p-1 table-img'>
                                                <FontAwesomeIcon icon={faImage} style={{ color: "#c7c7c7", height: 25 }} />
                                            </div>
                                            <Input className='item-detail' placeholder='Type or Click to select an item.' />
                                        </div></td>
                                        <td style={{ width: '18%' }} className='border-end' ></td>
                                        <td style={{ width: '18%' }} className='border-end' ><Input className='input-field' placeholder='0.00' /></td>
                                        <td style={{ width: '18%' }} ><Input className='input-field' placeholder='Eg. +10,-10' /></td>
                                        <td style={{ width: '6%' }} className='p-3'><FontAwesomeIcon icon={faCircleXmark} style={{ color: "#e26a6a", }} /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className='mb-2'>
                            <Dropdown.Button
                             icon={<DownOutlined />}
                             menu={{
                                items:[
                                    {
                                        label:'Add another line',
                                        key:1
                                    },
                                    {
                                        label:'Add item in bulk',
                                        key:2
                                    }
                                ]
                             }}
                            >
                             <div className='d-flex gap-2 align-items-center justify-content-center'>
                             <FontAwesomeIcon icon={faCirclePlus} style={{color: "#005eff",}} />  Add another line
                             </div>
                            </Dropdown.Button>
                        </div>

                        <hr />
                        <div className='col-4'>
                            <div className='d-flex flex-column'>
                                <span>Attach File(s) to inventory adjustment</span>
                                <span style={{ fontSize: '12px' }}>You can upload a maximum of 5 files, 5MB each</span>
                            </div>
                            <Form.Item name='inventory_file'>
                                <Upload {...uploadFile} multiple maxCount={5}>
                                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                </Upload>
                            </Form.Item>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default CreateAndEditInventoryAdjustment