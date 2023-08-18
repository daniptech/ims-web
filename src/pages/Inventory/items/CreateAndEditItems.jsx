import { ArrowLeftOutlined, PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import {
    Button,
    Checkbox,
    Divider,
    Form,
    Input,
    Radio,
    Select,
    Space,
    Tooltip,
} from 'antd';
import React, { useRef, useState } from 'react'
import MultiImageUpload from '../../../components/MultiImageUpload'
import { useNavigate, useParams } from 'react-router-dom';
import { item } from '../../../controller/constants'
import { createItem } from '../../../controller/api/inventory/itemService';

const CreateAndEditItems = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [form] = Form.useForm();
    const [previewImageUrl, setPreviewImageUrl] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);
    const [items, setItems] = useState();
    const [brandName, setBrandName] = useState('');
    const [salesInformation, setSalesInformation] = useState(true);
    const [purchaseInformation, setPurchaseInformation] = useState(true);
    const [inventoryTrack, setInventoryTrack] = useState(true);
    const inputRef = useRef(null);
    const onBrandNameInputChange = (event) => {
        setBrandName(event.target.value);
    };
    const addBrandItem = (e) => {
        e.preventDefault();
        if (items?.length) {
            setItems([...items, brandName]);
        } else {
            setItems([brandName]);
        }
        setBrandName('');
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };
    const handleSubmit = async (val) => {

        await Object.keys(item)?.forEach((key) => {
            if (key === "dimensions") {
                item[key] = {
                    length: val.dimension_length,
                    width: val.dimension_width,
                    height: val.dimension_height
                }
            } else if (key === "inventoryInfo") {
                if (val.sales_information && val.purchase_information && val.inventory_track) {
                    item[key] = {
                        inventoryAccount: val.inventoryAccount,
                        openingStock: val.openingStock,
                        openingStockRatePerUnit: val.openingStockRatePerUnit,
                        reorderPoint: val.reorderPoint
                    }
                } else {
                    item[key] = null
                }
            } else if (key === "purchaseInfo") {
                if (val.purchase_information) {
                    item[key] = {
                        costPrice: val.cost_price,
                        account: val.purchase_account,
                        description: val.purchase_description,
                        preferredVendorId: val.preferred_vendor
                    }
                } else {
                    item[key] = null
                }
            } else if (key === "sellingInfo") {
                if (val.sales_information) {
                    item[key] = {
                        sellingPrice: val?.sellingPrice,
                        account: val?.sales_account,
                        description: val?.sales_description
                    }
                } else {
                    item[key] = null
                }
            } else {
                if (val.hasOwnProperty(key)) {
                    item[key] = val[key]
                }
                if (key === 'organizationId') {
                    item[key] = 0
                }

            }

        })
        if (params.id) {

        } else {

            try {
                createItem(item).then(res => {
                    if (res) {
                        console.log(res, "jkjs")
                    }
                }).catch((err) => {
                    if (err.response) {
                        console.log(err)
                        // message.error(err.response.data.error.message)
                    }
                })
            } catch (err) {
                console.log("err  ==> ", err)
            }
        }

    }

    return (
        <div className='w-100'>
            <div className='w-100 bg-white p-3 border-bottom d-flex align-items-center justify-content-between '>
                <div className='d-flex align-items-center gap-4 fs-5'>
                    <ArrowLeftOutlined className='custom-back-button' onClick={() => navigate(-1)} />
                    <span className='fw-medium'>{params.id ? "Edit" : "New"} Item</span>
                </div>
                <div className='d-flex align-items-center gap-4 fs-5'>
                    <Button onClick={() => navigate(-1)}>Cancel</Button>
                    <Button type='primary' htmlType='submit' form='conpositeForm' >Submit</Button>
                </div>
            </div>
            <div
                className='w-100 position-relative'
                style={{
                    maxHeight: '100vh',
                    height: '100%',
                    overflow: 'scroll',
                    paddingBottom: '100px'
                }}
            >

                <Form
                    layout="vertical"
                    name="conpositeForm"
                    form={form}
                    initialValues={{
                        type: 'good',
                        unit: 'kg',
                        isReturnable: false,
                        purchase_information: true,
                        sales_information: true,
                        inventory_track: true,
                        weightUnit: "cm",
                        dimensionUnit: 'cm'
                    }}
                    onFinish={(val) => handleSubmit(val)}
                >
                    <div>
                        <div className="row col-12 bg-light p-4 m-0">
                            <div className="col-md-6 col-lg-8 d-flex flex-column gap-3">
                                <div className="row col-12 d-flex  align-items-center">
                                    <div className="col-lg-4 col-md-12">
                                        <label className="d-flex align-items-center gap-1">
                                            <span>Type</span>{' '}
                                            <Tooltip
                                                placement="rightTop"
                                                title="Select if this item is a Physical good or a service you're offering. Also, remember that once you include this item in a transaction, you can't change its type. "
                                            >
                                                <QuestionCircleOutlined className="text-muted" />
                                            </Tooltip>{' '}
                                        </label>
                                    </div>
                                    <div className="col-lg-8 col-md-12">
                                        <Form.Item name="type" className="d-flex m-0 form-item">
                                            <Radio.Group>
                                                <Radio value="good">Good</Radio>
                                                <Radio value="services">Services</Radio>
                                            </Radio.Group>
                                        </Form.Item>
                                    </div>
                                </div>

                                <div className="row col-12 d-flex  align-items-center">
                                    <div className="col-lg-4 col-md-12">
                                        <label className="text-danger">Name*</label>
                                    </div>
                                    <div className="col-lg-8 col-md-12">
                                        <Form.Item
                                            name="name"
                                            className="d-flex m-0 w-100 form-item"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input Name!'
                                                }
                                            ]}
                                        >
                                            <Input className="w-100" />
                                        </Form.Item>
                                    </div>
                                </div>

                                <div className="row col-12 d-flex  align-items-center">
                                    <div className="col-lg-4 col-md-12">
                                        <label className="d-flex align-items-center gap-1">
                                            <span>SKU</span>{' '}
                                            <Tooltip placement="rightTop" title="This stock Keeping Unit of the item ">
                                                <QuestionCircleOutlined className="text-muted" />
                                            </Tooltip>{' '}
                                        </label>
                                    </div>
                                    <div className="col-lg-8 col-md-12">
                                        <Form.Item name="sku" className="d-flex m-0 form-item">
                                            <Input className="w-100" />
                                        </Form.Item>
                                    </div>
                                </div>

                                <div className="row col-12 d-flex  align-items-center">
                                    <div className="col-lg-4 col-md-12">
                                        <label className="d-flex align-items-center gap-1 text-danger">
                                            <span>Unit*</span>{' '}
                                            <Tooltip
                                                placement="rightTop"
                                                title="This item will be measured in terms of this unit. (e.g.: kg,dozon)"
                                            >
                                                <QuestionCircleOutlined className="text-muted" />
                                            </Tooltip>{' '}
                                        </label>
                                    </div>
                                    <div className="col-lg-8 col-md-12">
                                        <Form.Item
                                            name="unit"
                                            className="d-flex m-0 form-item"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please Select unit!'
                                                }
                                            ]}
                                        >
                                            <Select
                                                options={[
                                                    { value: 'dz', label: 'dz' },
                                                    { value: 'kg', label: 'kg' },
                                                    { value: 'in', label: 'in' },
                                                    { value: 'km', label: 'km' },
                                                    { value: 'lb', label: 'lb' },
                                                    { value: 'mg', label: 'mg' },
                                                    { value: 'ml', label: 'ml' },
                                                    { value: 'm', label: 'm' }
                                                ]}
                                            />
                                        </Form.Item>
                                    </div>
                                </div>

                                <div className="row col-12 d-flex  align-items-center">
                                    <div className="col-lg-4 col-md-12"></div>
                                    <div className="col-lg-8 col-md-12">
                                        <Form.Item
                                            name="isReturnable"
                                            className="d-flex m-0 form-item"
                                            valuePropName="checked"
                                        >
                                            <Checkbox>
                                                <span>Returnable Item</span>
                                                <Tooltip
                                                    placement="rightTop"
                                                    title="Enable this option if the item  is eligible for sales return"
                                                >
                                                    <QuestionCircleOutlined className="text-muted" />
                                                </Tooltip>{' '}
                                            </Checkbox>
                                        </Form.Item>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <MultiImageUpload
                                    previewImageUrl={previewImageUrl}
                                    setPreviewImageUrl={setPreviewImageUrl}
                                    previewImage={previewImage}
                                    setPreviewImage={setPreviewImage}
                                    fileList={fileList}
                                    setFileList={setFileList}
                                />
                            </div>
                        </div>

                        <div className="row col-12 p-4 m-0">
                            <div className="col-md-6 col-lg-6 d-flex flex-column gap-3">
                                <div className="row col-12 d-flex ">
                                    <div className="col-lg-4 col-md-12">
                                        <label className="gap-1">
                                            <span>Dimensions</span>{' '}
                                            <span className="text-muted" style={{ fontSize: '12px' }}>
                                                (Length X Width X Height)
                                            </span>
                                        </label>
                                    </div>
                                    <div className="col-lg-8 col-md-12">
                                        <div className='d-flex border-1 w-100 text-muted align-items-center dimensions-input-box'>
                                            <Form.Item name="dimension_length" className="d-flex m-0 form-item w-25">
                                                <Input className='border-0 dimensions-input' />
                                            </Form.Item>
                                            X
                                            <Form.Item name="dimension_width" className="d-flex m-0 form-item w-25">
                                                <Input className='border-0 dimensions-input' />
                                            </Form.Item>
                                            X
                                            <Form.Item name="dimension_height" className="d-flex m-0 form-item w-50">
                                                <Input className='border-0 dimensions-input' addonAfter={
                                                    <Form.Item name="dimensionUnit" noStyle>
                                                        <Select
                                                            className='border-0 dimention_addonAfter'
                                                            options={[
                                                                { labal: 'cm', value: 'cm' },
                                                                { labal: 'in', value: 'in' },
                                                            ]}
                                                        ></Select>
                                                    </Form.Item>
                                                } />
                                            </Form.Item>
                                        </div>
                                    </div>
                                </div>

                                <div className="row col-12 d-flex ">
                                    <div className="col-lg-4 col-md-12">
                                        <label className="gap-1">
                                            <span>Manufacturer</span>
                                        </label>
                                    </div>
                                    <div className="col-lg-8 col-md-12">
                                        <Form.Item name="manufacturer" className="d-flex m-0 form-item">
                                            <Input className="w-100" />
                                        </Form.Item>
                                    </div>
                                </div>

                                <div className="row col-12 d-flex ">
                                    <div className="col-lg-4 col-md-12">
                                        <label className="d-flex align-items-center gap-1">
                                            <span>UPC</span>
                                            <Tooltip
                                                placement="rightTop"
                                                title="Twelve digit unique number associated with the bar code (Universal Product Code)"
                                            >
                                                <QuestionCircleOutlined className="text-muted" />
                                            </Tooltip>
                                        </label>
                                    </div>
                                    <div className="col-lg-8 col-md-12">
                                        <Form.Item name="upc" className="d-flex m-0 form-item">
                                            <Input className="w-100" />
                                        </Form.Item>
                                    </div>
                                </div>

                                <div className="row col-12 d-flex ">
                                    <div className="col-lg-4 col-md-12">
                                        <label className="d-flex align-items-center gap-1">
                                            <span>EAN</span>
                                            <Tooltip
                                                placement="rightTop"
                                                title="Thirteen digit unique number (International Article Number)"
                                            >
                                                <QuestionCircleOutlined className="text-muted" />
                                            </Tooltip>
                                        </label>
                                    </div>
                                    <div className="col-lg-8 col-md-12">
                                        <Form.Item name="ean" className="d-flex m-0 form-item">
                                            <Input className="w-100" />
                                        </Form.Item>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-6 d-flex flex-column gap-3">
                                <div className="row col-12 d-flex ">
                                    <div className="col-lg-4 col-md-12">
                                        <label className="gap-1">
                                            <span>Weight</span>
                                        </label>
                                    </div>
                                    <div className="col-lg-8 col-md-12">
                                        <Form.Item name="weight" className="d-flex m-0 form-item">
                                            <Input
                                                className="w-100"
                                                addonAfter={
                                                    <Form.Item name="weightUnit" noStyle>
                                                        <Select
                                                            options={[
                                                                { labal: 'kg', value: 'kg' },
                                                                { labal: 'g', value: 'g' },
                                                                { labal: 'lb', value: 'lb' },
                                                                { labal: 'oz', value: 'oz' }
                                                            ]}
                                                        ></Select>
                                                    </Form.Item>
                                                }
                                            />
                                        </Form.Item>
                                    </div>
                                </div>

                                <div className="row col-12 d-flex ">
                                    <div className="col-lg-4 col-md-12">
                                        <label className="gap-1">
                                            <span>Brand</span>
                                        </label>
                                    </div>
                                    <div className="col-lg-8 col-md-12">
                                        <Form.Item name="brand" className="d-flex m-0 form-item">
                                            <Select
                                                options={
                                                    items?.length
                                                        ? items?.map((item) => ({
                                                            label: item,
                                                            value: item
                                                        }))
                                                        : []
                                                }
                                                showSearch={true}
                                                dropdownRender={(menu) => (
                                                    <>
                                                        {menu}
                                                        <Divider
                                                            style={{
                                                                margin: '8px 0'
                                                            }}
                                                        />
                                                        <Space
                                                            style={{
                                                                padding: '0 8px 4px'
                                                            }}
                                                        >
                                                            <Input
                                                                placeholder="Please enter item"
                                                                ref={inputRef}
                                                                onChange={onBrandNameInputChange}
                                                                value={brandName}
                                                            />
                                                            <Button
                                                                type="text"
                                                                icon={<PlusOutlined />}
                                                                onClick={addBrandItem}
                                                                disabled={!brandName}
                                                            >
                                                                Add item
                                                            </Button>
                                                        </Space>
                                                    </>
                                                )}
                                            >
                                                <Input />
                                            </Select>
                                        </Form.Item>
                                    </div>
                                </div>

                                <div className="row col-12 d-flex ">
                                    <div className="col-lg-4 col-md-12">
                                        <label className="d-flex align-items-center gap-1">
                                            <span>MPN </span>
                                            <Tooltip
                                                placement="rightTop"
                                                title="Menufacturing Part Number  unabbiguously identifies a part design"
                                            >
                                                <QuestionCircleOutlined className="text-muted" />
                                            </Tooltip>
                                        </label>
                                    </div>
                                    <div className="col-lg-8 col-md-12">
                                        <Form.Item name="mpn" className="d-flex m-0 form-item">
                                            <Input className="w-100" />
                                        </Form.Item>
                                    </div>
                                </div>

                                <div className="row col-12 d-flex ">
                                    <div className="col-lg-4 col-md-12">
                                        <label className="d-flex align-items-center gap-1">
                                            <span>ISBN </span>
                                            <Tooltip
                                                placement="rightTop"
                                                title="Thirteen digit unique commercial  Book identifier (International Standard Book Number)"
                                            >
                                                <QuestionCircleOutlined className="text-muted" />
                                            </Tooltip>
                                        </label>
                                    </div>
                                    <div className="col-lg-8 col-md-12">
                                        <Form.Item name="isbn" className="d-flex m-0 form-item">
                                            <Input className="w-100" />
                                        </Form.Item>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr style={{ marginLeft: '25px', marginRight: '25px' }} />
                        <div className="row col-12 p-4 m-0">
                            <div className="col-md-6 col-lg-6 d-flex flex-column gap-3">
                                <Form.Item
                                    name="sales_information"
                                    className="d-flex m-0 form-item"
                                    valuePropName="checked"
                                >
                                    <Checkbox
                                        className="fs-5 fw-semibold"
                                        onChange={(val) => setSalesInformation(val.target.checked)}
                                    >
                                        Sales Information
                                    </Checkbox>
                                </Form.Item>
                                <div className="row col-12 d-flex ">
                                    <div className="col-lg-4 col-md-12">
                                        <label className={`gap-1 ${salesInformation && 'text-danger'}`}>
                                            <Tooltip
                                                placement="rightTop"
                                                title="The rate at which you're going to sell this item"
                                            >
                                                <span>Selling Price {salesInformation && '*'}</span>
                                            </Tooltip>
                                        </label>
                                    </div>
                                    <div className="col-lg-8 col-md-12">
                                        <Form.Item
                                            name="sellingPrice"
                                            className="d-flex m-0 form-item"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'please add selling price'
                                                }
                                            ]}
                                        >
                                            <Input className="w-100" addonBefore={'INR'} disabled={!salesInformation} />
                                        </Form.Item>
                                    </div>
                                </div>

                                <div className="row col-12 d-flex ">
                                    <div className="col-lg-4 col-md-12">
                                        <label className={`gap-1 ${salesInformation && 'text-danger'}`}>
                                            <Tooltip
                                                placement="rightTop"
                                                title="All sales transaction for this item will be tracked under this account"
                                            >
                                                Account {salesInformation && '*'}
                                            </Tooltip>
                                        </label>
                                    </div>
                                    <div className="col-lg-8 col-md-12">
                                        <Form.Item
                                            name="sales_account"
                                            className="d-flex m-0 form-item"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'please add Account'
                                                }
                                            ]}
                                        >
                                            <Select
                                                disabled={!salesInformation}
                                                className="text-black"
                                                options={[
                                                    {
                                                        label: <span className="fw-bolder text-black">Manager</span>,
                                                        options: [
                                                            {
                                                                label: 'Jack',
                                                                value: 'jack'
                                                            },
                                                            {
                                                                label: 'Lucy',
                                                                value: 'lucy'
                                                            }
                                                        ]
                                                    }
                                                ]}
                                            />
                                        </Form.Item>
                                    </div>
                                </div>

                                <div className="row col-12 d-flex ">
                                    <div className="col-lg-4 col-md-12">
                                        <label className="gap-1">
                                            <span>Description</span>
                                        </label>
                                    </div>
                                    <div className="col-lg-8 col-md-12">
                                        <Form.Item name="sales_description" className="d-flex m-0 form-item">
                                            <Input.TextArea className="w-100" disabled={!salesInformation} />
                                        </Form.Item>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-6 d-flex flex-column gap-3">
                                <Form.Item
                                    name="purchase_information"
                                    className="d-flex m-0 form-item"
                                    valuePropName="checked"
                                >
                                    <Checkbox
                                        className="fs-5 fw-semibold"
                                        onChange={(val) => setPurchaseInformation(val.target.checked)}
                                    >
                                        Purchase Information
                                    </Checkbox>
                                </Form.Item>
                                <div className="row col-12 d-flex ">
                                    <div className="col-lg-4 col-md-12">
                                        <label className={`gap-1 ${purchaseInformation && 'text-danger'}`}>
                                            <Tooltip placement="rightTop" title="The rate at which you purchased this item">
                                                <span>Cost Price {purchaseInformation && '*'}</span>
                                            </Tooltip>
                                        </label>
                                    </div>
                                    <div className="col-lg-8 col-md-12">
                                        <Form.Item
                                            name="cost_price"
                                            className="d-flex m-0 form-item"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'please add selling price'
                                                }
                                            ]}
                                        >
                                            <Input className="w-100" addonBefore={'INR'} disabled={!purchaseInformation} />
                                        </Form.Item>
                                    </div>
                                </div>

                                <div className="row col-12 d-flex ">
                                    <div className="col-lg-4 col-md-12">
                                        <label className={`gap-1 ${purchaseInformation && 'text-danger'}`}>
                                            <Tooltip
                                                placement="rightTop"
                                                title="All purchase transaction for this item will be tracked under this account"
                                            >
                                                Account {purchaseInformation && '*'}
                                            </Tooltip>
                                        </label>
                                    </div>
                                    <div className="col-lg-8 col-md-12">
                                        <Form.Item
                                            name="purchase_account"
                                            className="d-flex m-0 form-item"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'please add Account'
                                                }
                                            ]}
                                        >
                                            <Select
                                                disabled={!purchaseInformation}
                                                className="text-black"
                                                options={[
                                                    {
                                                        label: <span className="fw-bolder text-black">Manager</span>,
                                                        options: [
                                                            {
                                                                label: 'Jack',
                                                                value: 'jack'
                                                            },
                                                            {
                                                                label: 'Lucy',
                                                                value: 'lucy'
                                                            }
                                                        ]
                                                    }
                                                ]}
                                            />
                                        </Form.Item>
                                    </div>
                                </div>

                                <div className="row col-12 d-flex ">
                                    <div className="col-lg-4 col-md-12">
                                        <label className="gap-1">
                                            <span>Description</span>
                                        </label>
                                    </div>
                                    <div className="col-lg-8 col-md-12">
                                        <Form.Item name="purchase_description" className="d-flex m-0 form-item">
                                            <Input.TextArea className="w-100" disabled={!purchaseInformation} />
                                        </Form.Item>
                                    </div>
                                </div>

                                <div className="row col-12 d-flex ">
                                    <div className="col-lg-4 col-md-12">
                                        <label className="gap-1">
                                            <Tooltip
                                                placement="rightTop"
                                                title="All sales transaction for this item will be tracked under this account"
                                            >
                                                Preferred Vendor
                                            </Tooltip>
                                        </label>
                                    </div>
                                    <div className="col-lg-8 col-md-12">
                                        <Form.Item name="preferred_vendor" className="d-flex m-0 form-item">
                                            <Select
                                                disabled={!purchaseInformation}
                                                className="text-black"
                                                options={[
                                                    {
                                                        label: 'Jack',
                                                        value: 'jack'
                                                    },
                                                    {
                                                        label: 'Lucy',
                                                        value: 'lucy'
                                                    }
                                                ]}
                                                showSearch
                                            />
                                        </Form.Item>
                                    </div>
                                </div>
                            </div>


                            {salesInformation && purchaseInformation ?
                                <div>
                                    <hr />
                                    <div className="row col-12 p-0 m-0 gap-3">
                                        <Form.Item
                                            name="inventory_track"
                                            className="d-flex m-0 form-item"
                                            valuePropName="checked"
                                        >
                                            <Checkbox
                                                className="fs-5 fw-semibold"
                                                checked={inventoryTrack}
                                                onChange={(val) => setInventoryTrack(val.target.checked)}
                                            >
                                                Track Inventory for this item{' '}
                                            </Checkbox>
                                            <div className="text-muted" style={{ marginLeft: '23px', marginTop: '-8px' }}>
                                                You cannot enable/disable inventory tracking once you've created
                                                transactions for this item{' '}
                                            </div>
                                        </Form.Item>
                                        {inventoryTrack ?
                                            <>
                                                <div className='col-md-6 col-lg-6'>
                                                    <div className="row col-12 d-flex ">
                                                        <div className="col-lg-4 col-md-12 mb-1">
                                                            <label className="gap-1 text-danger">
                                                                <Tooltip
                                                                    placement="rightTop"
                                                                    title="The account which tracks the inventory of this item"
                                                                >
                                                                    <span
                                                                        style={{
                                                                            borderBottomStyle: 'dashed',
                                                                            borderBottomColor: '#969696'
                                                                        }}
                                                                    >
                                                                        Inventory Account *
                                                                    </span>
                                                                </Tooltip>
                                                            </label>
                                                        </div>
                                                        <div className="col-lg-8 col-md-12">
                                                            <Form.Item
                                                                name="inventoryAccount"
                                                                className="d-flex m-0 form-item"
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        message: 'please add Account'
                                                                    }
                                                                ]}
                                                            >
                                                                <Select
                                                                    allowClear
                                                                    className="text-black"
                                                                    options={[
                                                                        {
                                                                            label: <span className="fw-bolder text-black">Manager</span>,
                                                                            options: [
                                                                                {
                                                                                    label: 'Jack',
                                                                                    value: 'jack'
                                                                                },
                                                                                {
                                                                                    label: 'Lucy',
                                                                                    value: 'lucy'
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]}
                                                                />
                                                            </Form.Item>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='row col-12 m-0 p-0'>
                                                    <div className='col-md-6 col-lg-6 m-0 pr-0'>
                                                        <div className="row col-12 d-flex ">
                                                            <div className="col-lg-4 col-md-12 mb-1">
                                                                <label className="d-flex align-items-center gap-1">
                                                                    <label className="gap-1">
                                                                        <Tooltip
                                                                            placement="rightTop"
                                                                            title="The stock available for sale at the beginning of the accounting period"
                                                                        >
                                                                            <span
                                                                                style={{
                                                                                    borderBottomStyle: 'dashed',
                                                                                    borderBottomColor: '#969696'
                                                                                }}
                                                                            >
                                                                                Opening Stock
                                                                            </span>
                                                                        </Tooltip>
                                                                    </label>
                                                                </label>
                                                            </div>
                                                            <div className="col-lg-8 col-md-12">
                                                                <Form.Item name="openingStock" className="d-flex m-0 form-item">
                                                                    <Input className="w-100" />
                                                                </Form.Item>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-6 col-lg-6'>
                                                        <div className="row col-12 d-flex ">
                                                            <div className="col-lg-4 col-md-12 mb-1">
                                                                <label className="d-flex align-items-center gap-1">
                                                                    <label className="gap-1">
                                                                        <Tooltip
                                                                            placement="rightTop"
                                                                            title="The rate at which you bought each unit of the opening stock"
                                                                        >
                                                                            <span
                                                                                style={{
                                                                                    borderBottomStyle: 'dashed',
                                                                                    borderBottomColor: '#969696'
                                                                                }}
                                                                            >
                                                                                Opening Stock Rate per Unit
                                                                            </span>
                                                                        </Tooltip>
                                                                    </label>
                                                                </label>
                                                            </div>
                                                            <div className="col-lg-8 col-md-12">
                                                                <Form.Item
                                                                    name="openingStockRatePerUnit"
                                                                    className="d-flex m-0 form-item"
                                                                >
                                                                    <Input className="w-100" />
                                                                </Form.Item>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-md-6 col-lg-6'>
                                                    <div className="row col-12 d-flex ">
                                                        <div className="col-lg-4 col-md-12 mb-1">
                                                            <label className="d-flex align-items-center gap-1">
                                                                <label className="gap-1">
                                                                    <Tooltip
                                                                        placement="rightTop"
                                                                        title="When the stock reaches the reorder point, a notification will be sent to you"
                                                                    >
                                                                        <span
                                                                            style={{
                                                                                borderBottomStyle: 'dashed',
                                                                                borderBottomColor: '#969696'
                                                                            }}
                                                                        >
                                                                            Reorder Point
                                                                        </span>
                                                                    </Tooltip>
                                                                </label>
                                                            </label>
                                                        </div>
                                                        <div className="col-lg-8 col-md-12">
                                                            <Form.Item name="reorderPoint" className="d-flex m-0 form-item">
                                                                <Input className="w-100" />
                                                            </Form.Item>
                                                        </div>
                                                    </div>
                                                </div>
                                            </> : ''
                                        }
                                    </div></div> : ""
                            }

                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default CreateAndEditItems
