import {
  ArrowLeftOutlined,
  SettingTwoTone,
  UploadOutlined
} from '@ant-design/icons';
import {
  Button,
  DatePicker,
  Divider,
  Dropdown,
  Form,
  Input,
  Radio,
  Select,
  Space,
  Upload,
  message
} from 'antd';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { faCircleXmark, faImage } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { getReason } from '../../../controller/api/FieldsDataServices';
import Reason from '../../../components/modals/Reason';
import { useSelector } from 'react-redux';
import { getItem } from '../../../controller/api/inventory/itemService';

const CreateAndEditInventoryAdjustment = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const params = useParams();
  const [reason, setReason] = useState([]);
  const [reasonModalOpen, setReasonModalOpen] = useState(false);
  const currentUserData = useSelector((state) => state.user.currentuser);
  const [items, setItems] = useState([]);
  const [adjustmentValue, setAdjustmentValue] = useState('quantity_adjustment');
  const [associatedItemlist, setAssociatedlist] = useState([
    {
      itemDetail: '',
      Avlquantity: 0,
      newquantity: 0,
      quantityadjusted: 0,
      currentVAl: 1,
      changeval: 0,
      adjustedval: 0,
      isFilled: false
    }
  ]);

  useEffect(() => {
    if (currentUserData?.organizationId) {
      getItem({ organizationId: currentUserData?.organizationId.toString() }).then((res) => {
        if (res?.data) {
          setItems(res?.data);
        }
      });
    }
  }, [currentUserData]);

  const handleItem = (e, index) => {
    if (e.key == params.id) {
      message.info('Same Assembly Item cannot be a component on its own Inventory Assembly');
    } else {
      const data = [...items];
      const itemList = [...associatedItemlist];
      const itemData = data?.filter((val) => e.key == val.id);
      const getFilledData = itemList?.filter((val) => val.isFilled);
      if (getFilledData.length) {
        const checkRepectedField = getFilledData?.filter((val) => {
          if (val?.itemDetail?.id == e.key) {
            return val;
          }
        });
        if (checkRepectedField?.length) {
          message.info('This item already Selected. Choose another Item.');
        } else {
          if (itemData?.length) {
            itemList[index].itemDetail = itemData[0];
            itemList[index].Avlquantity = '';
            itemList[index].currentVAl = '';
            itemList[index].isFilled = true;
          }
        }
      } else {
        if (itemData?.length) {
          itemList[index].itemDetail = itemData[0];
          itemList[index].Avlquantity = '';
          itemList[index].currentVAl = '';
          itemList[index].isFilled = true;
        }
      }
      setAssociatedlist([...itemList]);
    }
  };

  const getReasonData = () => {
    getReason()
      .then((res) => setReason(res.data))
      .catch((err) => console.log('err ====>', err));
  };

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
          <span className="fw-medium">{params.id ? 'Edit' : 'New'} Adjustment</span>
        </div>
        <div className="d-flex align-items-center gap-4 fs-5">
          <Button onClick={() => navigate(-1)}>Cancel</Button>
          <Button type="primary" htmlType="submit" form="conpositeForm">
            Submit
          </Button>
        </div>
      </div>
      <div
        className="w-100 position-relative "
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
          <div className="row col-12 p-4">
            <div className="col-6">
              <div className="row col-12">
                <div className="col-4">Mode of adjustment</div>
                <div className="col-8">
                  <Form.Item name="mode_of_adjustment">
                    <Radio.Group
                      value={adjustmentValue}
                      onChange={(e) => setAdjustmentValue(e?.target?.value)}
                    >
                      <Space direction="vertical">
                        <Radio value="quantity_adjustment">Quantity Adjustment</Radio>
                        <Radio value="value_adjustment">Value Adjustment</Radio>
                      </Space>
                    </Radio.Group>
                  </Form.Item>
                </div>
              </div>
              <div className="row col-12">
                <div className="col-4">Reference Number</div>
                <div className="col-8">
                  <Form.Item name="reference_number">
                    <Input />
                  </Form.Item>
                </div>
              </div>
              <div className="row col-12">
                <div className="col-4">
                  <span className="text-danger">Date *</span>
                </div>
                <div className="col-8">
                  <Form.Item name="date">
                    <DatePicker className="w-100" />
                  </Form.Item>
                </div>
              </div>
              <div className="row col-12">
                <div className="col-4">
                  <span className="text-danger">Account *</span>
                </div>
                <div className="col-8">
                  <Form.Item name="account">
                    <Select
                      options={[
                        {
                          label: 'Manager',
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
                        },
                        {
                          label: 'Engineer',
                          options: [
                            {
                              label: 'yiminghe',
                              value: 'Yiminghe'
                            }
                          ]
                        }
                      ]}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="row col-12">
                <div className="col-4">
                  <span className="text-danger">Reason *</span>
                </div>
                <div className="col-8">
                  <Form.Item name="reason">
                    <Select
                      options={
                        reason?.length
                          ? reason?.map((val) => {
                              return {
                                label: val?.name,
                                value: val.name
                              };
                            })
                          : []
                      }
                      showSearch={true}
                      onClick={() => {
                        getReasonData();
                      }}
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
                              padding: '0 18px 4px'
                            }}
                          >
                            <span
                              className="d-flex align-items-center gap-3 text-primary"
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                setReasonModalOpen(true);
                              }}
                            >
                              {' '}
                              <SettingTwoTone /> Manage Reason
                            </span>
                          </Space>
                        </>
                      )}
                    >
                      <Input />
                    </Select>
                  </Form.Item>
                </div>
              </div>
              <div className="row col-12">
                <div className="col-4">
                  <span className="">Description </span>
                </div>
                <div className="col-8">
                  <Form.Item name="description">
                    <Input.TextArea maxLength={500} placeholder="mAX. 500 characters" />
                  </Form.Item>
                </div>
              </div>
            </div>

            <div style={{ width: '80%' }} className="mb-2">
              <table className="w-100 custom-table-create">
                <thead className="w-100">
                  <tr className="border-bottom border-top">
                    <th style={{ width: '40%' }} className="border-end">
                      ITEM DETAILS
                    </th>
                    <th style={{ width: '20%' }} className="border-end text-end">
                      {adjustmentValue == 'quantity_adjustment'
                        ? 'QUANTITY AVAILABLE'
                        : 'CURRENT VALUE'}
                    </th>
                    <th style={{ width: '20%' }} className="border-end text-end">
                      {adjustmentValue == 'quantity_adjustment'
                        ? 'NEW QUANTITY ON HAND'
                        : 'CHANGED VALUE'}
                    </th>
                    <th style={{ width: '20%' }} className="text-end">
                      {adjustmentValue == 'quantity_adjustment'
                        ? 'QUANTITY ADJUSTED'
                        : 'ADJUSTED VALUE'}
                    </th>
                  </tr>
                </thead>
                <tbody className="w-100">
                  {associatedItemlist?.map((val, index) => {
                    return (
                      <tr className="border-bottom" key={index}>
                        <td style={{ width: '40%' }} className="border-end">
                          <div className="d-flex gap-2">
                            <div className="p-1 table-img">
                              <FontAwesomeIcon
                                icon={faImage}
                                style={{ color: '#c7c7c7', height: 25 }}
                              />
                            </div>
                            {val?.itemDetail !== '' ? (
                              <div className="w-100 bg-light rounded-3 d-flex justify-content-between p-2">
                                <div className="d-flex flex-column">
                                  <span className="fw-semibold">{val?.itemDetail?.name}</span>
                                  <span>SKU: {val?.itemDetail?.sku}</span>
                                </div>
                                <FontAwesomeIcon
                                  icon={faCircleXmark}
                                  style={{ color: '#b4b4b4', cursor: 'pointer' }}
                                  onClick={() => {}}
                                />
                              </div>
                            ) : (
                              <Dropdown
                                trigger={'click'}
                                menu={{
                                  items: items?.map((val) => {
                                    return {
                                      label: (
                                        <div className="row col-12 m-0 p-0">
                                          <div className="col-6 text-start">
                                            <div className="d-flex flex-column">
                                              <span className="fw-bold">{val.name}</span>
                                              <span>SKU : {val.sku}</span>
                                            </div>
                                          </div>
                                          <div className="col-6 text-end">
                                            <div className="d-flex flex-column">
                                              <span className="fw-semibold">STOCK ON HAND</span>
                                              <span>-</span>
                                            </div>
                                          </div>
                                        </div>
                                      ),
                                      key: val?.id
                                    };
                                  }),
                                  className: 'custom-dropdown',
                                  onClick: (e) => handleItem(e, index)
                                }}
                              >
                                <Input
                                  className="item-detail"
                                  placeholder="Click to select an item."
                                />
                              </Dropdown>
                            )}
                          </div>
                        </td>
                        <td style={{ width: '18%' }} className="border-end">
                          {adjustmentValue == 'quantity_adjustment'
                            ? val?.Avlquantity
                            : val?.currentVAl}
                        </td>
                        <td style={{ width: '18%' }} className="border-end">
                          <Input className="input-field" placeholder="0.00" />
                        </td>
                        <td style={{ width: '18%' }}>
                          <Input className="input-field" placeholder="Eg. +10,-10" />
                        </td>
                        <td style={{ width: '6%' }} className="p-3">
                          <FontAwesomeIcon icon={faCircleXmark} style={{ color: '#e26a6a' }} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mb-2">
              <Button
                type="text"
                style={{ paddingLeft: '0px' }}
                onClick={() =>
                  setAssociatedlist([
                    ...associatedItemlist,
                    {
                      itemDetail: '',
                      Avlquantity: 0,
                      newquantity: 0,
                      quantityadjusted: 0,
                      currentVAl: 0,
                      changeval: 0,
                      adjustedval: 0,
                      isFilled: false
                    }
                  ])
                }
              >
                <div className="d-flex gap-2 align-items-center justify-content-center">
                  <FontAwesomeIcon icon={faCirclePlus} style={{ color: '#005eff' }} /> Add another
                  line
                </div>
              </Button>
            </div>

            <hr />
            <div className="col-4">
              <div className="d-flex flex-column">
                <span>Attach File(s) to inventory adjustment</span>
                <span style={{ fontSize: '12px' }}>
                  You can upload a maximum of 5 files, 5MB each
                </span>
              </div>
              <Form.Item name="inventory_file">
                <Upload {...uploadFile} multiple maxCount={5}>
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
      {reasonModalOpen && (
        <Reason reasonModalOpen={reasonModalOpen} setReasonModalOpen={setReasonModalOpen} />
      )}
    </div>
  );
};

export default CreateAndEditInventoryAdjustment;
