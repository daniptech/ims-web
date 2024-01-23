import { Button, Card, Form, Input, Select, message } from 'antd';
import React, { useEffect } from 'react';
import { countryData } from '../data/CountryData';
import { ArrowLeftOutlined, GlobalOutlined } from '@ant-design/icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { routes } from '../controller/routes';
import { enterOnlyNumber } from '../controller/enteronlynumber';
import { useSelector } from 'react-redux';
import { createUser, updateUser } from '../controller/api/AuthServices';
import { useState } from 'react';
import { getAllRole } from '../controller/api/role/roleServices';
import { useForm } from 'antd/es/form/Form';

const Register = () => {
  const { Option } = Select;
  const navigate = useNavigate();
  const [roleList, setRoleList] = useState([]);
  const currentUserData = useSelector((state) => state.user.currentuser);
  const location = useLocation()
  const [form] = useForm();
  const params=useParams()
  useEffect(() => {
    if(params.id){
      form.setFieldsValue({...location?.state?.data,role:location?.state?.data?.role?.roleName})
    }
    getRoleData();
  }, []);
  const getRoleData = () => {
    getAllRole()
      .then((res) => {
        setRoleList(res.data);
      })
      .catch((err) => {
        console.log('err----->', err);
      });
  };

  const selectBefore = (
    <Form.Item
      name="countryCode"
      rules={[
        {
          required: true,
          message: 'Please input your Country code!'
        }
      ]}
      noStyle
    >
      <Select showSearch placeholder="country code" className="heehjj" style={{ width: 80 }}>
        {countryData.map((val, index) => {
          return (
            <Option value={val.code} key={index}>
              {val.code}
            </Option>
          );
        })}
      </Select>
    </Form.Item>
  );
  const onFinish = async (value) => {
    const payload = {
      ...value,
      organizationId: currentUserData?.organizationId.toString(),
      companyName: currentUserData?.companyName
    };

   if(params.id){
    await updateUser(payload,{id:params.id})
    .then((res) => {
      message.success('User Successfully Updated');
      navigate(routes.user.self);
    })
    .catch((err) => {
      console.log('err======>', err);
    })

   }else{ await createUser(payload)
      .then((res) => {
        message.success('User Successfully Created');
        navigate(routes.user.self);
      })
      .catch((err) => {
        console.log('err======>', err);
      })}
  };
  return (
    // <div className="w-100 d-flex justify-content-center align-items-center p-5 bg-light auth-page">
    //   <Card
    //     className="auth-page-register"
    //     style={{
    //       width: '30%',
    //       borderBottomColor: '#1677ff',
    //       borderWidth: '3px'
    //     }}
    //   >
    //     <div className="d-flex flex-column gap-5">
    //       <div className="text-center">
    //         {/* <Image src={Images.logo} preview={false} width={100} height={100} /> */}
    //         <h3 className="text-muted fw-semibold">Register</h3>
    //       </div>

    // <Form
    //   name="register-form"
    //   className="auth-form text-start"
    //   wrapperCol={{
    //     span: 24
    //   }}
    //   style={{
    //     maxWidth: '100%'
    //   }}
    //   onFinish={onFinish}
    //   // onFinishFailed={onFinishFailed}
    //   autoComplete="off"
    // >
    //   <div className="row col-12 m-0 p-0">
    //     <div className="col-12">
    //       <Form.Item name="company_name" className="form-item">
    //         <Input placeholder="Company Name" />
    //       </Form.Item>
    //     </div>
    //     <div className="col-12">
    // <Form.Item
    //   name="number"
    //   className="form-item"
    //   rules={[
    //     {
    //       required: true,
    //       message: 'Please input your Phone Number!'
    //     }
    //   ]}
    // >
    //   <Input
    //     placeholder="Phone Number"
    //     minLength={10}
    //     maxLength={10}
    //     addonBefore={selectBefore}
    //     onKeyPress={(e) => enterOnlyNumber(e)}
    //   />
    // </Form.Item>
    //     </div>
    //     <div className="col-12">
    // <Form.Item
    //   name="email"
    //   className="form-item"
    //   rules={[
    //     {
    //       required: true,
    //       message: 'Please input your Email!'
    //     }
    //   ]}
    // >
    //   <Input placeholder="Email" />
    // </Form.Item>
    //     </div>
    //     <div className="col-12">
    // <Form.Item
    //   name="country"
    //   className="form-item"
    //   rules={[
    //     {
    //       required: true,
    //       message: 'Please input your Country!'
    //     }
    //   ]}
    // >
    //   <Input placeholder="Country" prefix={<GlobalOutlined />} />
    // </Form.Item>
    //     </div>
    //     <div className="col-12">
    // <Form.Item
    //   name="city"
    //   className="form-item"
    //   rules={[
    //     {
    //       required: true,
    //       message: 'Please input your City!'
    //     }
    //   ]}
    // >
    //   <Input placeholder="City" prefix={<FontAwesomeIcon icon={faLocationDot} />} />
    // </Form.Item>
    //     </div>
    //   </div>

    //   <Form.Item className="mt-2">
    //     <Button
    //       type="primary"
    //       shape="round"
    //       htmlType="submit"
    //       className="w-100 text-uppercase d-flex justify-content-center align-items-center p-3 auth-custom-btn"
    //     >
    //       Register
    //     </Button>
    //   </Form.Item>
    //   <div className="text-center text-muted">
    //     Do you have an account?{' '}
    //     <span
    //       className="text-primary navigate-auth"
    //       onClick={() => navigate(routes.login.self)}
    //     >
    //       Login.
    //     </span>
    //   </div>
    // </Form>
    //     </div>
    //   </Card>
    // </div>
    <div className="w-100">
      <div className="w-100 bg-white p-3 border-bottom d-flex align-items-center justify-content-between ">
        <div className="d-flex align-items-center gap-4 fs-5">
          <span className="fw-medium">Create User</span>
        </div>
        <div className="d-flex align-items-center gap-4 fs-5">
          <Button onClick={() => navigate(-1)}>Cancel</Button>
          <Button type="primary" htmlType="submit" form="createUser">
            Submit
          </Button>
        </div>
      </div>
      <Form layout="vertical" name="createUser" form={form}  onFinish={(value) => onFinish(value)}>
        <div className="row col-12 bg-light p-4 m-0">
          <div className="col-md-6 col-lg-6 d-flex flex-column gap-3 mb-3">
            <div className="row col-12 d-flex  align-items-center">
              <div className="col-lg-4 col-md-12">
                <label className="text-danger">First Name*</label>
              </div>
              <div className="col-lg-8 col-md-12">
                <Form.Item
                  name="firstName"
                  className="d-flex m-0 w-100 form-item"
                  rules={[
                    {
                      required: true,
                      message: 'Please input First Name!'
                    }
                  ]}
                >
                  <Input className="w-100" />
                </Form.Item>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-6 d-flex flex-column gap-3 mb-3">
            <div className="row col-12 d-flex  align-items-center">
              <div className="col-lg-4 col-md-12">
                <label className="text-danger">Last Name*</label>
              </div>
              <div className="col-lg-8 col-md-12">
                <Form.Item
                  name="lastName"
                  className="d-flex m-0 w-100 form-item"
                  rules={[
                    {
                      required: true,
                      message: 'Please input Last Name!'
                    }
                  ]}
                >
                  <Input className="w-100" />
                </Form.Item>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-6 d-flex flex-column gap-3">
            <div className="row col-12 d-flex  align-items-center">
              <div className="col-lg-4 col-md-12">
                <label className="text-danger">Phone Number*</label>
              </div>
              <div className="col-lg-8 col-md-12">
                <Form.Item
                  name="phoneNumber"
                  className="form-item"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Phone Number!'
                    }
                  ]}
                >
                  <Input
                    placeholder="Phone Number"
                    minLength={10}
                    maxLength={10}
                    addonBefore={selectBefore}
                    onKeyPress={(e) => enterOnlyNumber(e)}
                  />
                </Form.Item>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-6 d-flex flex-column gap-3">
            <div className="row col-12 d-flex  align-items-center">
              <div className="col-lg-4 col-md-12">
                <label className="text-danger">Email*</label>
              </div>
              <div className="col-lg-8 col-md-12">
                <Form.Item
                  name="email"
                  className="form-item"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Email!'
                    }
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-6 d-flex flex-column gap-3">
            <div className="row col-12 d-flex  align-items-center">
              <div className="col-lg-4 col-md-12">
                <label className="text-danger">Country*</label>
              </div>
              <div className="col-lg-8 col-md-12">
                <Form.Item
                  name="country"
                  className="form-item"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Country!'
                    }
                  ]}
                >
                  <Input placeholder="Country" prefix={<GlobalOutlined />} />
                </Form.Item>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-6 d-flex flex-column gap-3">
            <div className="row col-12 d-flex  align-items-center">
              <div className="col-lg-4 col-md-12">
                <label className="text-danger">City*</label>
              </div>
              <div className="col-lg-8 col-md-12">
                <Form.Item
                  name="city"
                  className="form-item"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your City!'
                    }
                  ]}
                >
                  <Input placeholder="City" prefix={<FontAwesomeIcon icon={faLocationDot} />} />
                </Form.Item>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-6 d-flex flex-column gap-3">
            <div className="row col-12 d-flex  align-items-center">
              <div className="col-lg-4 col-md-12">
                <label className="text-danger">Role*</label>
              </div>
              <div className="col-lg-8 col-md-12">
                <Form.Item
                  name="role"
                  className="form-item"
                  rules={[
                    {
                      required: true,
                      message: 'Please input User Role!'
                    }
                  ]}
                >
                  <Select>
                    {roleList?.map((val, index) => (
                      <Option value={val?.roleName} key={index}>
                        {val?.roleName}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Register;
