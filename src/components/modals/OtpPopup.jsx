import { Button, Form, Modal, Progress, message } from 'antd';
import { InputOTP } from 'antd-input-otp';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../controller/routes';
import { verifyOTP } from '../../controller/api/AuthServices';
import { setRefreshToken, setUserToken } from '../../controller/localStorageHandler';

const OtpPopup = ({
  OpenOtpPopup,
  setOpenOtpPopup,
  loginWith,
  setSelectKey,
  otpValidTill,
  setotpValidTill,
  user,
  resend
}) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    const timeout = setInterval(() => {
      if (otpValidTill?.otpTill > 0) {
        setotpValidTill({
          ...otpValidTill,
          otpTill: otpValidTill.otpTill - 1
        });
      } else {
        message.info('Otp expire, please resend the otp');
        clearInterval(timeout);
      }
    }, 1000);
    return () => {
      clearInterval(timeout);
    };
  }, [otpValidTill, setotpValidTill]);

  const handleFinish = (values) => {
    const { otp } = values;
    if (!otp || otp.includes(undefined) || otp.includes(''))
      return form.setFields([
        {
          name: 'otp',
          errors: ['OTP is invalid.']
        }
      ]);
    const formOtpText = otp.toString();
    const payload = {
      ...user,
      otp: formOtpText.replaceAll(',', '')
    };
    try {
      verifyOTP(payload)
        .then((res) => {
          setUserToken(res.data.token);
          setRefreshToken(res.data.refreshToken);
          setSelectKey('home');
          navigate(routes.home.dashboard);
        })
        .catch((err) => {
          if (err.response) {
            message.error(err.response.data.error.message);
          }
        });
    } catch (error) {
      console.log('error ====>> ', error);
    }
    // if (currentUser.otp == formOtpText.replaceAll(',', "")) {
    //   localStorage.setItem("login", true)
    //   setLoginUser(true)
    //   setSelectKey('home')
    //   navigate(routes.home.dashboard);
    // } else {
    //   message.error('otp Not Match')
    // }
  };

  return (
    <Modal open={OpenOtpPopup} footer={null} closable={false}>
      <section className="text-center">
        <p className="fs-6">
          We have sent you <span className="text-primary">One Time Password</span> to your{' '}
          {loginWith === 'email' ? 'email' : 'phone number'}
        </p>
        <p className="text-primary fs-6">Please Enter OTP</p>
        <Form form={form} onFinish={handleFinish}>
          <Form.Item
            name="otp"
            className="center-error-message"
            rules={[{ validator: async () => Promise.resolve() }]}
          >
            <InputOTP autoFocus inputType="numeric" length={4} />
          </Form.Item>
          {otpValidTill?.otpTill > 0 ? (
            <Progress
              type="circle"
              size="small"
              percent={(otpValidTill?.otpTill * 100) / otpValidTill?.OtpTotaltime}
              format={(percent) => otpValidTill?.otpTill}
            />
          ) : (
            <Button type="primary" onClick={() => resend({ ...user })}>
              Resend
            </Button>
          )}
          <div className="row col-12 mt-5 gap-1 justify-content-center m-0">
            <div className="col-md-6 col-lg-5">
              <Form.Item noStyle>
                <Button block htmlType="submit" type="primary">
                  Submit
                </Button>
              </Form.Item>
            </div>
            <div className="col-md-6 col-lg-5">
              <Form.Item noStyle>
                <Button block onClick={() => setOpenOtpPopup(false)} type="primary">
                  cancel
                </Button>
              </Form.Item>
            </div>
          </div>
        </Form>
      </section>
    </Modal>
  );
};

export default OtpPopup;
