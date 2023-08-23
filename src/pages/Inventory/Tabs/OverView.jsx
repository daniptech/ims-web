import {
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  Popconfirm,
  Segmented,
  Table,
  Typography
} from 'antd';
import React, { useState } from 'react';
import {
  CaretDownOutlined,
  CaretRightOutlined,
  EditOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import MultiImageUpload from '../../../components/MultiImageUpload';
import ChartView from '../../../components/ChartView';
import { routes } from '../../../controller/routes';
import { reverse } from 'named-urls';
import { useParams } from 'react-router-dom';
const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`
            }
          ]}>
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const OverView = ({ inventoryitem, itemData }) => {
  const params = useParams();
  const [associatedPriceList, setAssociatedPriceList] = useState({ open: false, table: 'sales' });
  const [previewImageUrl, setPreviewImageUrl] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const [data, setData] = useState(
    Array.from({ length: 5 }, (_, i) => {
      return {
        key: i.toString(),
        name: `hello${i}`,
        price: 32.3,
        discount: 10
      };
    })
  );
  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      ...record
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey('');
  };
  const save = async (key) => {
    setEditingKey('');
  };
  const salescolumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      editable: true
    },
    {
      title: 'Price',
      dataIndex: 'price',
      editable: true
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      editable: true
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8
              }}>
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <span>Cancel</span>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ''}
            className="d-flex justify-content-center align-items-center"
            onClick={() => edit(record)}>
            <EditOutlined /> Edit
          </Typography.Link>
        );
      }
    }
  ];
  const purchasecolumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      editable: true
    },
    {
      title: 'Price',
      dataIndex: 'price',
      editable: true
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8
              }}>
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              Cancel
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ''}
            className="d-flex justify-content-center align-items-center"
            onClick={() => edit(record)}>
            <EditOutlined /> Edit
          </Typography.Link>
        );
      }
    }
  ];
  const mergedColumns = () => {
    const column = associatedPriceList.table === 'sales' ? salescolumns : purchasecolumns;
    return column.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record) => ({
          record,
          inputType: col.dataIndex === 'name' ? 'text' : 'number',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record)
        })
      };
    });
  };
  const [currentPage, setCurrentPage] = useState(1);

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="row col-12 mt-3">
        <div className="col-md-6 col-lg-8 d-flex flex-column gap-4">
          <div className="d-flex flex-column gap-2">
            <div className="row col-12">
              <span className="col-5 fw-semibold" style={{ color: '#777' }}>
                Item Type
              </span>
              <span className="col-7">
                {itemData?.inventoryInfo
                  ? 'Inventory Items'
                  : itemData?.purchaseInfo && itemData?.sellingInfo
                  ? 'Sales and Purchase Items (Service)'
                  : itemData?.purchaseInfo
                  ? 'Purchase Items (Service)'
                  : itemData?.sellingInfo && 'Sales Items (Service)'}
              </span>
            </div>
            {itemData?.sku && (
              <div className="row col-12">
                <span className="col-5 fw-semibold" style={{ color: '#777' }}>
                  SKU
                </span>
                <span className="col-7">{itemData?.sku}</span>
              </div>
            )}
            {itemData?.unit && (
              <div className="row col-12">
                <span className="col-5 fw-semibold" style={{ color: '#777' }}>
                  Unit
                </span>
                <span className="col-7">{itemData?.unit}</span>
              </div>
            )}
            {itemData?.dimensions && (
              <div className="row col-12">
                <span className="col-5 fw-semibold" style={{ color: '#777' }}>
                  Dimensions
                </span>
                <span className="col-7">{`${itemData?.dimensions?.length} ${itemData?.dimensionUnit} x ${itemData?.dimensions?.width} ${itemData?.dimensionUnit} x ${itemData?.dimensions?.height} ${itemData?.dimensionUnit}`}</span>
              </div>
            )}
            {itemData?.weight && itemData?.weightUnit && (
              <div className="row col-12">
                <span className="col-5 fw-semibold" style={{ color: '#777' }}>
                  Weight
                </span>
                <span className="col-7">
                  {itemData?.weight} {itemData?.weightUnit}
                </span>
              </div>
            )}
            {itemData?.upc && (
              <div className="row col-12">
                <span className="col-5 fw-semibold" style={{ color: '#777' }}>
                  UPC
                </span>
                <span className="col-7">{itemData?.upc}</span>
              </div>
            )}
            {itemData?.ean && (
              <div className="row col-12">
                <span className="col-5 fw-semibold" style={{ color: '#777' }}>
                  EAN
                </span>
                <span className="col-7">{itemData?.ean}</span>
              </div>
            )}
            {itemData?.mpn && (
              <div className="row col-12">
                <span className="col-5 fw-semibold" style={{ color: '#777' }}>
                  MPN
                </span>
                <span className="col-7">{itemData?.mpn}</span>
              </div>
            )}
            {itemData?.isbn && (
              <div className="row col-12">
                <span className="col-5 fw-semibold" style={{ color: '#777' }}>
                  ISBN
                </span>
                <span className="col-7">{itemData?.isbn}</span>
              </div>
            )}
            {itemData?.manufacturer && (
              <div className="row col-12">
                <span className="col-5 fw-semibold" style={{ color: '#777' }}>
                  Manufacturer
                </span>
                <span className="col-7">{itemData?.manufacturer}</span>
              </div>
            )}
            {itemData?.brand && (
              <div className="row col-12">
                <span className="col-5 fw-semibold" style={{ color: '#777' }}>
                  Brand
                </span>
                <span className="col-7">{itemData?.brand}</span>
              </div>
            )}

            <div className="row col-12">
              <span className="col-5 fw-semibold" style={{ color: '#777' }}>
                Created Source
              </span>
              <span className="col-7">-</span>
            </div>
            {itemData?.inventoryInfo?.inventoryAccount && (
              <div className="row col-12">
                <span className="col-5 fw-semibold" style={{ color: '#777' }}>
                  Inventory Account
                </span>
                <span className="col-7">{itemData?.inventoryInfo?.inventoryAccount}</span>
              </div>
            )}
          </div>
          <div className="d-flex flex-column">
            <h6 className="fw-medium">Purchase Information</h6>
            <div className="d-flex flex-column gap-2">
              {itemData?.purchaseInfo?.costPrice && (
                <div className="row col-12">
                  <span className="col-5 fw-semibold" style={{ color: '#777' }}>
                    Cost Price
                  </span>
                  <span className="col-7">{itemData?.purchaseInfo?.costPrice}</span>
                </div>
              )}

              {itemData?.purchaseInfo?.account && (
                <div className="row col-12">
                  <span className="col-5 fw-semibold" style={{ color: '#777' }}>
                    Purchase Account
                  </span>
                  <span className="col-7">{itemData?.purchaseInfo?.account}</span>
                </div>
              )}
              {itemData?.purchaseInfo?.description && (
                <div className="row col-12">
                  <span className="col-5 fw-semibold" style={{ color: '#777' }}>
                    Description
                  </span>
                  <span className="col-7">{itemData?.purchaseInfo?.description}</span>
                </div>
              )}

              <div className="row col-12">
                <span className="col-5 fw-semibold" style={{ color: '#777' }}>
                  Preferred Vendor
                </span>
                <span className="col-7">Demo</span>
              </div>
            </div>
          </div>
          {itemData?.sellingInfo && (
            <div>
              <h6 className="fw-medium">Selling Price</h6>
              <div className="d-flex flex-column gap-2">
                {itemData?.sellingInfo?.sellingPrice && (
                  <div className="row col-12">
                    <span className="col-5 fw-semibold" style={{ color: '#777' }}>
                      Selling Price
                    </span>
                    <span className="col-7">Rs. {itemData?.sellingInfo?.sellingPrice}</span>
                  </div>
                )}
                {itemData?.sellingInfo?.account && (
                  <div className="row col-12">
                    <span className="col-5 fw-semibold" style={{ color: '#777' }}>
                      Sales Account
                    </span>
                    <span className="col-7">{itemData?.sellingInfo?.account}</span>
                  </div>
                )}
                {itemData?.sellingInfo?.description && (
                  <div className="row col-12">
                    <span className="col-5 fw-semibold" style={{ color: '#777' }}>
                      Description
                    </span>
                    <span className="col-7">{itemData?.sellingInfo?.description}</span>
                  </div>
                )}
              </div>
            </div>
          )}
          <div>
            <div className="d-flex w-100">
              <Button
                type="link"
                className="fs-6 d-flex p-0 align-items-center"
                onClick={() =>
                  setAssociatedPriceList({
                    ...associatedPriceList,
                    open: !associatedPriceList.open
                  })
                }>
                Associated Price Lists{' '}
                {associatedPriceList.open ? <CaretDownOutlined /> : <CaretRightOutlined />}
              </Button>
              {associatedPriceList.open && (
                <div className="d-flex w-100 justify-content-end">
                  <Segmented
                    className="custom-setmented"
                    onChange={(val) =>
                      setAssociatedPriceList({ ...associatedPriceList, table: val })
                    }
                    value={associatedPriceList.table}
                    options={[
                      {
                        label: 'Sales',
                        value: 'sales'
                      },
                      {
                        label: 'Purchase',
                        value: 'purchase'
                      }
                    ]}
                  />
                </div>
              )}
            </div>
            {associatedPriceList.open && (
              <div className="w-100 mt-4">
                <Form form={form} component={false}>
                  <Table
                    components={{
                      body: {
                        cell: EditableCell
                      }
                    }}
                    // bordered
                    dataSource={data}
                    columns={mergedColumns()}
                    rowClassName="editable-row"
                    pagination={{
                      current: currentPage,
                      pageSize: 4,
                      onChange: handleChangePage
                    }}
                  />
                </Form>
              </div>
            )}
          </div>
          {inventoryitem === 'composite' && (
            <div>
              <h6 className="fw-medium">Associated Items</h6>
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col" className="w-75 text-muted">
                      ITEM DETAILS
                    </th>
                    <th scope="col" className="w-25 text-end text-muted">
                      QUANTITY
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="w-75">
                      <div className="d-flex gap-2">
                        <div className="border p-1" style={{ width: '50px', height: '50px' }}>
                          <Image
                            className="w-100"
                            style={{ height: '40px' }}
                            src={
                              'https://img.freepik.com/free-vector/app-development-illustration_52683-47743.jpg?w=740&t=st=1689154509~exp=1689155109~hmac=dfcebc3143f20558da62710837c499b62196196327394aa6abb8984e57c01103'
                            }
                            alt=""
                            preview={false}
                          />
                        </div>
                        <div className="d-flex flex-column text-muted">
                          <span className="text-primary">Botalsss</span>
                          <span>[dd]</span>
                          <span>Accounting Stock: 16.00</span>
                          <span>Physical Stock: 16.00</span>
                        </div>
                      </div>
                    </td>
                    <td className="w-25 text-muted text-end">1</td>
                  </tr>
                  <tr>
                    <td className="w-75">
                      <div className="d-flex gap-2">
                        <div className="border p-1" style={{ width: '50px', height: '50px' }}>
                          <Image
                            className="w-100"
                            style={{ height: '40px' }}
                            src={
                              'https://img.freepik.com/free-vector/app-development-illustration_52683-47743.jpg?w=740&t=st=1689154509~exp=1689155109~hmac=dfcebc3143f20558da62710837c499b62196196327394aa6abb8984e57c01103'
                            }
                            alt=""
                            preview={false}
                          />
                        </div>
                        <div className="d-flex flex-column text-muted">
                          <span
                            className=" d-flex justify-content-center bg-success text-white fw-medium"
                            style={{ fontSize: '10px', width: '40px' }}>
                            services
                          </span>
                          <span className="text-primary">Botalsss </span>
                          <span>[dd]</span>
                        </div>
                      </div>
                    </td>
                    <td className="w-25 text-muted text-end">1</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
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
          <div className="w-100 bg-light h-auto p-3 rounded-3 d-flex flex-column gap-4 mt-5">
            <div className="row col-12">
              <div className="col-6">Opening Stock :</div>
              <div className="col-6">16.00</div>
            </div>
            <h6 className="d-flex align-items-center gap-2">
              Accounting Stock <QuestionCircleOutlined />
            </h6>
            <div className="row col-12 lh-lg">
              <div className="col-6 mb-1">Stock on Hand :</div>
              <div className="col-6">16.00</div>
              <div className="col-6">Committed Stock :</div>
              <div className="col-6">1.00</div>
              <div className="col-6">Available for Sale :</div>
              <div className="col-6">15.00</div>
            </div>
            <h6 className="d-flex align-items-center gap-2">
              Physical Stock <QuestionCircleOutlined />
            </h6>
            <div className="row col-12 lh-lg">
              <div className="col-6">Stock on Hand :</div>
              <div className="col-6">16.00</div>
              <div className="col-6">Committed Stock :</div>
              <div className="col-6">1.00</div>
              <div className="col-6">Available for Sale :</div>
              <div className="col-6">15.00</div>
            </div>
            <hr />
            <div className="row col-12">
              <div className="col-md-6 col-lg-6 mb-4">
                <div
                  style={{ width: '100%', height: '100px' }}
                  className="bg-white rounded-3 p-1 d-flex flex-column justify-content-center align-items-center">
                  <span>0</span>
                  <span className="text-muted">Qty</span>
                  <span>To be Shipped</span>
                </div>
              </div>
              <div className="col-md-6 col-lg-6 mb-4">
                <div
                  style={{ width: '100%', height: '100px' }}
                  className="bg-white rounded-3 p-1 d-flex flex-column justify-content-center align-items-center">
                  <span>0</span>
                  <span className="text-muted">Qty</span>
                  <span>To be Received</span>
                </div>
              </div>
              <div className="col-md-6 col-lg-6 mb-4">
                <div
                  style={{ width: '100%', height: '100px' }}
                  className="bg-white rounded-3 p-1 d-flex flex-column justify-content-center align-items-center">
                  <span>0</span>
                  <span className="text-muted">Qty</span>
                  <span>To be Invoiced</span>
                </div>
              </div>
              <div className="col-md-6 col-lg-6 mb-4">
                <div
                  style={{ width: '100%', height: '100px' }}
                  className="bg-white rounded-3 p-1 d-flex flex-column justify-content-center align-items-center">
                  <span>0</span>
                  <span className="text-muted">Qty</span>
                  <span>To be Billed</span>
                </div>
              </div>
            </div>
            <hr className="mt-0" />
            <div className="row col-12 lh-lg">
              <div className="col-6 ">
                <span style={{ borderBottomStyle: 'dashed', borderBottomWidth: '2px' }}>
                  Reorder Point{' '}
                </span>
                :
              </div>
              <div className="col-6 fw-semibold">10</div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5">
        <ChartView />
      </div>
    </>
  );
};

export default OverView;
