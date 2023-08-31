import { Button, Card, Form, Input, Select, message } from 'antd';
import React from 'react';
import { countryData } from '../data/CountryData';
import { GlobalOutlined } from '@ant-design/icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { routes } from '../controller/routes';
import { enterOnlyNumber } from '../controller/enteronlynumber';

const Register = () => {
  const { Option } = Select;
  const navigate = useNavigate();
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
      <Select placeholder="country code" className="heehjj" style={{ width: 80 }}>
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
  const onFinish = () => {
    navigate(routes.login.self);
    message.success('Register Sucessfully');
  };
  return (
    <div className="w-100 d-flex justify-content-center align-items-center p-5 bg-light auth-page">
      <Card
        className="auth-page-register"
        style={{
          width: '30%',
          borderBottomColor: '#1677ff',
          borderWidth: '3px'
        }}
      >
        <div className="d-flex flex-column gap-5">
          <div className="text-center">
            {/* <Image src={Images.logo} preview={false} width={100} height={100} /> */}
            <h3 className="text-muted fw-semibold">Register</h3>
          </div>

          <Form
            name="register-form"
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
            <div className="row col-12 m-0 p-0">
              <div className="col-12">
                <Form.Item name="company_name" className="form-item">
                  <Input placeholder="Company Name" />
                </Form.Item>
              </div>
              <div className="col-12">
                <Form.Item
                  name="number"
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
              <div className="col-12">
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
              <div className="col-12">
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
              <div className="col-12">
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

            <Form.Item className="mt-2">
              <Button
                type="primary"
                shape="round"
                htmlType="submit"
                className="w-100 text-uppercase d-flex justify-content-center align-items-center p-3 auth-custom-btn"
              >
                Register
              </Button>
            </Form.Item>
            <div className="text-center text-muted">
              Do you have an account?{' '}
              <span
                className="text-primary navigate-auth"
                onClick={() => navigate(routes.login.self)}
              >
                Login.
              </span>
            </div>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default Register;
