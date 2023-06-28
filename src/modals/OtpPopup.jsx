import { Button, Form, Input, Modal } from 'antd'
import { InputOTP } from 'antd-input-otp';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { routes } from '../controller/routes';


const OtpPopup = ({ OpenOtpPopup, setOpenOtpPopup, loginWith }) => {
    const navigate = useNavigate()
    const [form] = Form.useForm();
    const handleFinish = (values) => {
        // The value will be array of string
        // Check the field if there is no value, or value is undefined/empty string
        const { otp } = values;
        if (!otp || otp.includes(undefined) || otp.includes(""))
            return form.setFields([
                {
                    name: "otp",
                    errors: ["OTP is invalid."]
                }
            ]);
        console.log(`OTP: ${otp}`);
        navigate(routes.home.dashboard)

    };

    return (
        <Modal open={OpenOtpPopup} footer={null} closable={false}>
            <section className='text-center'>
                <p className='fs-6'>We have sent you <span className='text-primary'>One Time Password</span> to your {loginWith == 'email' ? 'email' : "phone number"}</p>
                <p className='text-primary fs-6'>Please Enter OTP</p>
                <Form form={form} onFinish={handleFinish}>
                    <Form.Item
                        name="otp"
                        className="center-error-message"
                        rules={[{ validator: async () => Promise.resolve() }]}
                    >
                        <InputOTP autoFocus inputType="numeric" length={4} />
                    </Form.Item>

                    <div className='row col-12 mt-5 gap-1 justify-content-center m-0'>
                        <div className='col-md-6 col-lg-5'>
                            <Form.Item noStyle>
                                <Button block onClick={() => setOpenOtpPopup(false)} type="primary">
                                    cancel
                                </Button>
                            </Form.Item>
                        </div>
                        <div className='col-md-6 col-lg-5'>
                            <Form.Item noStyle>
                                <Button block htmlType="submit" type="primary">
                                    Submit
                                </Button>
                            </Form.Item>
                        </div>

                    </div>
                </Form>
            </section>
        </Modal>
    )
}

export default OtpPopup