import { Button, Form, Input, Select, Table, message } from 'antd';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import {
  createRole,
  getModules,
  getRole,
  updateRole
} from '../../controller/api/role/roleServices';
import { routes } from '../../controller/routes';

const CreateRole = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { Option } = Select;
  const [OriginalModule, setOriginalModule] = useState([]);
  const params = useParams();
  const [rolePermission, setRolePermission] = useState([
    {
      module: null,
      accessLevel: null,
      isFilled: false
    }
  ]);
  useEffect(() => {
    getModules().then((res) => {
      setOriginalModule(
        Object.entries(res.data)?.map((val) => {
          return { key: val[1], value: val[0] };
        })
      );
    });
  }, []);
  useEffect(() => {
    if (params?.id) {
      getRole({ id: params?.id })
        .then((res) => {
          form.setFieldsValue({ ...res.data });
          const rolepermission = [...res.data.rolePermissions]?.map((val) => {
            return { ...val, isFilled: true };
          });
          console.log(rolepermission, 'dkdnmlddldnld');
          setRolePermission(rolepermission);
        })
        .catch((err) => console.log('err ===== >', err));
    }
  }, []);
  const handleModule = (value, index) => {
    var newarr = [...rolePermission];
    const checkModule = newarr?.filter((val) => val?.module == value);
    if (checkModule?.length) {
      message.info('This module already added');
    } else {
      newarr[index].module = value;
      if (newarr[index]?.module && newarr[index]?.accessLevel) {
        newarr[index].isFilled = true;
      }
      setRolePermission(newarr);
    }
  };
  const handleSubmit = async (val) => {
    var newarr = [...rolePermission]?.filter((val) => val?.isFilled == true);
    if (newarr?.length) {
      const payload = {
        ...val,
        rolePermissions: newarr?.map((val) => {
          return {
            module: val?.module,
            accessLevel: val?.accessLevel
          };
        })
      };
      if (params?.id) {
        await updateRole(payload, { id: params?.id })
          .then((res) => {
            message.success('Role Successfully Updated');
            navigate(routes.role.self);
          })
          .catch((err) => console.log('err ---->', err));
      } else {
        await createRole(payload)
          .then((res) => {
            message.success('Role Successfully Created');
            navigate(routes.role.self);
          })
          .catch((err) => console.log('err ---->', err));
      }
    } else {
      message.info('Please Add minimum 1 Module Permission');
    }
  };
  return (
    <div className="w-100">
      <div className="w-100 bg-white p-3 border-bottom d-flex align-items-center justify-content-between ">
        <div className="d-flex align-items-center gap-4 fs-5">
          <span className="fw-medium">Create Role</span>
        </div>
        <div className="d-flex align-items-center gap-4 fs-5">
          <Button onClick={() => navigate(-1)}>Cancel</Button>
          <Button type="primary" htmlType="submit" form="createUser">
            Submit
          </Button>
        </div>
      </div>
      <div
        className="w-100 position-relative bg-light"
        style={{
          maxHeight: '100vh',
          height: '100%',
          overflow: 'scroll',
          paddingBottom: '100px'
        }}
      >
        <Form layout="vertical" form={form} name="createUser" onFinish={(val) => handleSubmit(val)}>
          <div className="row col-12 p-4 m-0">
            <div className="col-md-6 col-lg-6 d-flex flex-column gap-3 mb-3">
              <div className="row col-12 d-flex  align-items-center">
                <div className="col-lg-4 col-md-12">
                  <label className="text-danger">Role Name*</label>
                </div>
                <div className="col-lg-8 col-md-12">
                  <Form.Item
                    name="roleName"
                    className="d-flex m-0 w-100 form-item"
                    rules={[
                      {
                        required: true,
                        message: 'Please input Role Name!'
                      }
                    ]}
                  >
                    <Input className="w-100" />
                  </Form.Item>
                </div>
              </div>
            </div>
          </div>
          <div className="row col-8  p-4 m-0">
            <div className="col-lg-3 col-md-12">
              <label className="text-danger">Modules Permissions*</label>
            </div>
            <div className="col-lg-9 col-md-12">
              {rolePermission?.map((val, index) => {
                return (
                  <div className="row col-12 mb-2" key={index}>
                    <div className="col-5">
                      <Select
                        className="w-100"
                        value={val?.module}
                        placeholder="Select Module"
                        onChange={(value) => handleModule(value, index)}
                      >
                        {OriginalModule?.map((val, indexNumber) => {
                          return (
                            <Option value={val?.key} key={indexNumber}>
                              {val?.value}
                            </Option>
                          );
                        })}
                      </Select>
                    </div>
                    <div className="col-5">
                      <Select
                        className="w-100"
                        value={val?.accessLevel}
                        placeholder="Permission Level"
                        onChange={(value) => {
                          var newarr = [...rolePermission];
                          newarr[index].accessLevel = value;
                          if (newarr[index]?.module && newarr[index]?.accessLevel) {
                            newarr[index].isFilled = true;
                          }
                          setRolePermission(newarr);
                        }}
                      >
                        <Option value={1}>read</Option>
                        <Option value={2}>write</Option>
                      </Select>
                    </div>
                    <div className="col-2">
                      {rolePermission?.length - 1 == index ? (
                        <Button
                          type="text"
                          style={{ paddingLeft: '0px' }}
                          onClick={() => {
                            setRolePermission([
                              ...rolePermission,
                              {
                                module: null,
                                accessLevel: null,
                                isFilled: false
                              }
                            ]);
                          }}
                          disabled={val.isFilled ? false : true}
                        >
                          <div className="d-flex gap-2 align-items-center justify-content-center">
                            <FontAwesomeIcon icon={faCirclePlus} style={{ color: '#005eff' }} /> Add
                            another Module
                          </div>
                        </Button>
                      ) : (
                        <Button
                          type="text"
                          onClick={() => {
                            const deleteItem = rolePermission?.filter(
                              (value, indexNumber) => indexNumber !== index
                            );
                            setRolePermission(deleteItem);
                          }}
                        >
                          <FontAwesomeIcon icon={faCircleXmark} style={{ color: '#e26a6a' }} />
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreateRole;
