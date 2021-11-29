import { Col, Row, Divider, Form, Input, Button } from 'antd';
import {
  GoogleLoginButton,
  FacebookLoginButton,
} from 'react-social-login-buttons';
import { useHistory } from 'react-router-dom';

import { useRegisterMutation } from 'src/services/auth';

import { useToggleLayoutHeader } from 'src/hooks/toggle-layout-header';
import { useHttpError } from 'src/hooks/http';

import { RegisterationForm } from 'src/models/auth';

import { SignupBox } from './styled';

export const SignupPage = () => {
  useToggleLayoutHeader();
  const httpError = useHttpError();
  const history = useHistory();

  const [register, { isLoading }] = useRegisterMutation();

  const onFinish = async (form: RegisterationForm) => {
    try {
      await register(form).unwrap();

      history.push('/signup/verifying');
    } catch (error) {
      httpError(error);
    }
  };

  return (
    <Row align="middle" justify="center" style={{ margin: '32px 0' }}>
      <Col span={24} style={{ textAlign: 'center' }}>
        <img
          src="/assets/images/Logo-Primarycolor.png"
          alt="logo"
          width="150px"
          style={{ marginBottom: '16px' }}
        />
      </Col>
      <Col span={24}>
        <SignupBox className="page-layout-spacing">
          <h1>Đăng ký</h1>
          <p className="subtitle">Chào mừng bạn đến với 99Phầntrăm</p>
          <Divider />
          <Form
            labelCol={{ span: 0 }}
            size="large"
            requiredMark={false}
            onFinish={onFinish}
          >
            <p>
              <b>Thông tin cơ bản:</b>
            </p>
            <Form.Item style={{ margin: '8px 0 0' }}>
              <Form.Item
                className="inline-form-item"
                name="lastName"
                rules={[{ required: true, message: 'Vui lòng nhập họ!' }]}
              >
                <Input placeholder="Họ" />
              </Form.Item>
              <Form.Item
                className="inline-form-item"
                name="firstName"
                rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
              >
                <Input placeholder="Tên" />
              </Form.Item>
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                { type: 'email', message: 'Vui lòng nhập email hợp lệ!' },
                { required: true, message: 'Vui lòng nhập email!' },
              ]}
            >
              <Input type="email" placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Vui lòng nhập mật khẩu!' },
                {
                  min: 7,
                  message: 'Mật khẩu ít nhất 7 ký tự!',
                },
              ]}
            >
              <Input.Password placeholder="Mật khẩu" />
            </Form.Item>
            <Form.Item
              name="repassword"
              rules={[
                { required: true, message: 'Vui lòng nhập mật khẩu!' },
                {
                  min: 7,
                  message: 'Mật khẩu ít nhất 7 ký tự!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      new Error('Mật khẩu không trùng nhau!')
                    );
                  },
                }),
              ]}
              dependencies={['password']}
              hasFeedback
            >
              <Input.Password placeholder="Nhập lại mật khẩu" />
            </Form.Item>
            <p style={{ margin: '8px 0' }}>
              Bằng cách nhấp vào Đăng ký, bạn đồng ý với Điều khoản, Chính sách
              Dữ liệu và Chính sách Cookie của chúng tôi.
            </p>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: '100%' }}
                disabled={isLoading}
              >
                Đăng ký
              </Button>
            </Form.Item>
          </Form>
          {/* <Divider>Hoặc</Divider>
          <p style={{ textAlign: 'center' }}>Đăng ký bằng:</p>
          <Row>
            <Col xs={24} sm={12}>
              <GoogleLoginButton style={{ fontSize: '14px' }}>
                Đăng ký bằng Google
              </GoogleLoginButton>
            </Col>
            <Col xs={24} sm={12}>
              <FacebookLoginButton style={{ fontSize: '14px' }}>
                Đăng ký bằng Facebook
              </FacebookLoginButton>
            </Col>
          </Row> */}
        </SignupBox>
      </Col>
    </Row>
  );
};
