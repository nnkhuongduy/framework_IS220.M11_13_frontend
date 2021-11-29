import { Col, Row, Form, Input, Button, Divider, Checkbox } from 'antd';
import { Link, useHistory, useLocation } from 'react-router-dom';
import {
  GoogleLoginButton,
  FacebookLoginButton,
} from 'react-social-login-buttons';

import { GLOBAL_CONSTANTS } from 'src/constants/global';
import { useHttpError } from 'src/hooks/http';
import { useToggleLayoutHeader } from 'src/hooks/toggle-layout-header';
import { AuthRequest } from 'src/models/auth';
import { useLoginMutation, useLazyAuthenticateQuery } from 'src/services/auth';

import { LoginMain, LeftSection, RightSection, LoginBox } from './styled';

export const LoginPage = () => {
  useToggleLayoutHeader();

  const httpError = useHttpError();
  const history = useHistory();
  const location = useLocation();

  const [login, { isLoading: isLogging }] = useLoginMutation();
  const [authenticate, { isLoading: isAuthenticating }] =
    useLazyAuthenticateQuery();

  console.log();

  const onLogin = async (request: AuthRequest) => {
    try {
      const { token } = await login(request).unwrap();

      localStorage.setItem(GLOBAL_CONSTANTS.LOCAL_STORE_JWT_TOKEN, token);

      authenticate();

      const returnUrl = new URLSearchParams(location.search).get('return');

      history.push(returnUrl || '/');
    } catch (error) {
      httpError(error);
    }
  };

  return (
    <LoginMain align="middle" justify="center" gutter={32}>
      <LeftSection sm={24} md={14}>
        <Link to="/">
          <img
            src="/assets/images/Logo-Primarycolor.png"
            alt="logo"
            width="250px"
          />
        </Link>
        <h2>
          99Phầntrăm giúp bạn mua và bán những món đồ cũ một cách dễ dàng và uy
          tín.
        </h2>
      </LeftSection>
      <RightSection sm={24} md={10}>
        <LoginBox>
          <Row>
            <Col span={24}>
              <h1>Đăng nhập</h1>
            </Col>
            <Col span={24}>
              <Form
                labelCol={{ span: 0 }}
                wrapperCol={{ span: 24 }}
                layout="vertical"
                requiredMark={false}
                size="large"
                onFinish={onLogin}
                initialValues={{
                  remember: false,
                }}
              >
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: 'Xin vui lòng nhập email!' },
                    {
                      type: 'email',
                      message: 'Xin vui lòng nhập email hợp lệ!',
                    },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: 'Xin vui lòng nhập mật khẩu!' },
                    { min: 7, message: 'Mật khẩu ít nhất 7 ký tự' },
                  ]}
                >
                  <Input placeholder="Mật khẩu" type="password" />
                </Form.Item>
                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox>Ghi nhớ phiên đăng nhập</Checkbox>
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isLogging || isAuthenticating}
                  >
                    Đăng nhập
                  </Button>
                </Form.Item>
              </Form>
            </Col>
            <Col span={24}>
              <Link to="/">
                <Button type="text" className="forgot-btn">
                  Quên mật khẩu?
                </Button>
              </Link>
            </Col>
            <Col span={24} style={{ textAlign: 'center' }}>
              <Link to="/signup">
                <Button className="signup-btn" size="large">
                  Tạo tài khoản
                </Button>
              </Link>
            </Col>
          </Row>
          {/* <Divider>Hoặc</Divider>
          <p style={{ textAlign: 'center', margin: '0' }}>Đăng nhập bằng:</p>
          <Row>
            <Col xs={24} sm={12}>
              <GoogleLoginButton
                style={{ fontSize: '12px', fontWeight: 'normal' }}
              >
                Đăng nhập bằng Google
              </GoogleLoginButton>
            </Col>
            <Col xs={24} sm={12}>
              <FacebookLoginButton
                style={{ fontSize: '12px', fontWeight: 'normal' }}
              >
                Đăng nhập bằng Facebook
              </FacebookLoginButton>
            </Col>
          </Row> */}
        </LoginBox>
      </RightSection>
    </LoginMain>
  );
};
