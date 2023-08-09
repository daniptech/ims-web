import {
    ArrowLeftOutlined,
    DownOutlined,
    InfoCircleOutlined,
    SearchOutlined,
    SettingOutlined,
    UploadOutlined
} from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Form, Input, Select, DatePicker, Tooltip, Dropdown, Upload, message, Divider } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { faCircleXmark, faImage } from '@fortawesome/free-regular-svg-icons';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';



const CreateAndEditPurchaseReceive = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [value, setValue] = React.useState(1);
    const onSearch = (value) => console.log(value);
    const { Option } = Select;
    const onChange = (value) => {
        console.log(`selected ${value}`);
    };
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];
    const uploadFile = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text'
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
        }
    };
    return (
        <div className="w-100">
            <div className="w-100 bg-white p-3 border-bottom d-flex align-items-center justify-content-between ">
                <div className="d-flex align-items-center gap-4 fs-5">
                    <ArrowLeftOutlined className="custom-back-button" onClick={() => navigate(-1)} />
                    <span className="fw-medium">{params.id ? 'Edit' : 'New'} Purchase Receive</span>
                </div>
                <div className="d-flex align-items-center gap-4 fs-5">
                    <Button onClick={() => navigate(-1)}>Cancel</Button>
                    <Button type="primary" htmlType="submit" form="conpositeForm">
                        Submit
                    </Button>
                </div>
            </div>
            <div
                className="w-100 position-relative"
                style={{
                    maxHeight: '100vh',
                    height: '100%',
                    overflow: 'scroll',
                    paddingBottom: '100px'
                }}>
                <Form layout="vertical" name="conpositeForm">
                    <div>
                        {!params.id && <div className="w-100 row col-12 bg-light p-4">
                            <div className='col-6 d-flex flex-column gap-3'>
                                <div className="row col-12 d-flex  align-items-center">
                                    <div className="col-3">
                                        <label className="d-flex align-items-center gap-1">
                                            <span>Vendor Name</span>
                                        </label>
                                    </div>
                                    <div className="col-9">
                                        <Form.Item name="vendor_name" className="d-flex m-0 form-item">
                                            <Select options={[]} />
                                        </Form.Item>
                                    </div>
                                </div>
                                <div className="row col-12 d-flex  align-items-center">
                                    <div className="col-3">
                                        <label className="d-flex align-items-center gap-1 text-danger">
                                            <span>Purchase Order#*</span>
                                        </label>
                                    </div>
                                    <div className="col-9">
                                        <Form.Item name="vendor_name" className="d-flex m-0 form-item">
                                            <Select options={[]} />
                                        </Form.Item>
                                    </div>
                                </div>
                            </div>
                        </div>}
                        <div className="row col-12 p-4 m-0">
                            <div className="col-6 d-flex flex-column gap-3">

                                <div className="row col-12 d-flex  align-items-center">
                                    <div className="col-3">
                                        <label className="d-flex align-items-center gap-1 text-danger">
                                            <span>Purchase Receive# *</span>
                                        </label>
                                    </div>
                                    <div className="col-6">
                                        <Form.Item name="company_name" className="d-flex m-0 form-item">
                                            <Input placeholder="SO-00004" suffix={<SettingOutlined />} />
                                        </Form.Item>
                                    </div>
                                </div>
                                <div className="row col-12 d-flex  align-items-center">
                                    <div className="col-3">
                                        <label className="d-flex align-items-center gap-1 text-danger">
                                            <span>Received Date*</span>
                                        </label>
                                    </div>
                                    <div className="col-6">
                                        <Form.Item name="sales_order_date" className="d-flex m-0 form-item">
                                            <DatePicker
                                                className='w-100'
                                                defaultValue={dayjs('25/07/2023', dateFormatList[0])}
                                                format={dateFormatList}
                                            />
                                        </Form.Item>
                                    </div>
                                </div>

                            </div>
                            <Divider className='mt-4 mb-4' />

                            <div style={{ width: '80%' }} className='mb-2'>
                                <table className='w-100 custom-table-create'>
                                    <thead className='w-100'>
                                        <tr className='border-bottom border-top'>
                                            <th style={{ width: '34%' }} className='' >ITEMS & DESCRIPTION</th>
                                            <th style={{ width: '15%' }} className='' >ORDERED</th>
                                            <th style={{ width: '15%' }} className='' >RECEIVED</th>
                                            <th style={{ width: '15%' }} className='' >IN TRANSIT</th>
                                            <th style={{ width: '15%' }} className=''>QUANTITY TO RECEIVE</th>
                                            <th style={{ width: '6%' }} className='text-end'></th>
                                        </tr>
                                    </thead>
                                    <tbody className='w-100'>
                                        <tr className='border-bottom'>
                                            <td style={{ width: '34%' }} className='    ' >
                                                <div className='d-flex flex-column'>
                                                    <span>-blacksdas</span>
                                                    <span className='text-muted'>SKU:12</span>
                                                </div>
                                            </td>
                                            <td style={{ width: '15%' }} className='    ' >1</td>
                                            <td style={{ width: '15%' }} className='    ' >0</td>
                                            <td style={{ width: '15%' }} className='    ' >0</td>
                                            <td style={{ width: '15%' }} className='text-end' ><Input className='input-field border' placeholder='0' /></td>
                                            <td style={{ width: '6%' }} className='p-3'><FontAwesomeIcon icon={faCircleXmark} style={{ color: "#e26a6a", }} /></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div style={{ width: '80%' }} className='mt-5'>
                                <div>
                                    <span>Notes (For Internal Use)</span>
                                    <Form.Item name='notes'>
                                        <Input.TextArea style={{minHeight:'70px'}}></Input.TextArea>
                                    </Form.Item>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default CreateAndEditPurchaseReceive




