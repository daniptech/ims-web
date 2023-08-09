import { Button, Card, Form, Input, Select, message } from 'antd';
import React, { useState } from 'react';
import { countryData } from '../data/CountryData';
import OtpPopup from '../components/modals/OtpPopup';
import { useNavigate } from 'react-router-dom';
import { routes } from '../controller/routes';
import { enterOnlyNumber } from '../controller/enteronlynumber';
import { loginData } from '../data/LoginData';

const Login = ({setLoginUser,setSelectKey}) => {
  const { Option } = Select;
  const navigate = useNavigate();
  const [loginWith, setLoginWith] = useState('phone');
  const [OpenOtpPopup, setOpenOtpPopup] = useState(false);
  const [currentUser, setCurrentUser] = useState('')
  const selectBefore = (
    <Form.Item
      name="country_code"
      rules={[
        {
          required: true,
          message: 'Please input your Country code!'
        }
      ]}
      noStyle
    >
      <Select showSearch placeholder="country code" className="" style={{ width: 80 }}>
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
  const onFinish = (value) => {
    var minm = 1000;
    var maxm = 9999;
    const otp = Math.floor(Math.random() * (maxm - minm + 1)) + minm;
    if (value['email']) {
      const checkUser = loginData?.filter((val) => val.email == value.email)
      if (checkUser?.length) {
        setCurrentUser({ ...checkUser[0], otp: otp })
        setOpenOtpPopup(true);
      } else {
        message.error("please enter Vaild credential")
      }
    } else {
      const checkUser = loginData?.filter((val) => val.phone == value.phone && val.country_code == value.country_code)
      if (checkUser?.length) {
        setCurrentUser({ ...checkUser[0], otp: otp })
        setOpenOtpPopup(true);
      } else {
        message.error("please enter Vaild credential")
      }
    }
  };

  return (
    <div className="w-100 d-flex justify-content-center align-items-center p-5 bg-light auth-page">
      <Card
        className="auth-page-login"
        style={{
          width: '30%',
          borderBottomColor: '#1677ff',
          borderWidth: '3px'
        }}
      >
        <div className="d-flex flex-column gap-5">
          <div className="text-center">
            {/* <Image src={Images.logo} preview={false} width={100} height={100} /> */}
            <h3 className="text-muted fw-semibold">Login</h3>
          </div>

          <Form
            name="login-form"
            className="auth-form text-start"
            wrapperCol={{
              span: 24
            }}
            style={{
              maxWidth: '100%'
            }}
            onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            {loginWith === 'email' ? (
              <>
                <Form.Item
                  name="email"
                  className="form-item"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Email!'
                    },
                    {
                      type: 'email',
                      message: 'Please Enter Vaild Mail!'
                    }
                  ]}
                >
                  <Input placeholder="Email Address" className="p-2" />
                </Form.Item>
                <div
                  style={{ cursor: 'pointer' }}
                  className="text-primary"
                  onClick={() => {
                    setLoginWith('phone');
                  }}
                >
                  Login with mobile number
                </div>
              </>
            ) : (
              <>
                <Form.Item
                  name="phone"
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
                    className="p-2"
                    addonBefore={selectBefore}
                    onKeyPress={(e) => enterOnlyNumber(e)}
                  />
                </Form.Item>
                <div
                  style={{ cursor: 'pointer' }}
                  className="text-primary"
                  onClick={() => {
                    setLoginWith('email');
                  }}
                >
                  Login with email
                </div>
              </>
            )}
            <Form.Item className="mt-2">
              <Button
                type="primary"
                shape="round"
                htmlType="submit"
                className="w-100 text-uppercase d-flex justify-content-center align-items-center p-3 auth-custom-btn"
              >
                Login
              </Button>
            </Form.Item>
            <div className="text-center text-muted">
              Don&apos;t have an account?{' '}
              <span
                className="text-primary navigate-auth"
                onClick={() => navigate(routes.register.self)}
              >
                Register.
              </span>
            </div>
          </Form>
        </div>
      </Card>
      {OpenOtpPopup && (
        <OtpPopup
          OpenOtpPopup={OpenOtpPopup}
          setOpenOtpPopup={setOpenOtpPopup}
          loginWith={loginWith}
          currentUser={currentUser}
          setLoginUser={(val)=>setLoginUser(val)}
          setSelectKey={(val)=>setSelectKey(val)}
        />
      )}
    </div>
  );
};

export default Login;
