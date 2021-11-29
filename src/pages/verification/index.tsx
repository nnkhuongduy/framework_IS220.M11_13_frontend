import { Result, Button, Spin, Card } from 'antd';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { useToggleLayoutHeader } from 'src/hooks/toggle-layout-header';
import { useVerifyQuery } from 'src/services/auth';

const VerifyingCard = styled(Card)`
  width: 90%;
  max-width: 600px !important;
  margin: 0 auto;
`;

export const VerificationPage = () => {
  useToggleLayoutHeader();

  const { id: userId } = useParams<{ id: string }>();

  const { isSuccess, isFetching, error } = useVerifyQuery(userId);

  return (
    <VerifyingCard bordered={false}>
      {isFetching ? (
        <div style={{ textAlign: 'center' }}>
          <Spin size="large" style={{ margin: '0 auto' }} />
        </div>
      ) : isSuccess ? (
        <Result
          status="success"
          title="Chào mừng bạn đến với 99Phầntrăm!"
          subTitle="Tài khoản của bạn đã được xác nhận thành công. Bạn có thể đăng nhập."
          extra={[
            <Link to="/" key="home">
              <Button type="default">Về trang chủ</Button>
            </Link>,
            <Link to="/login" key="login">
              <Button type="primary">Đăng nhập</Button>
            </Link>,
          ]}
        />
      ) : error && (error as any).data ? (
        <Result
          status="warning"
          title="Đã có lỗi xảy ra!"
          subTitle={(error as any).data.message}
          extra={[
            <Link to="/" key="home">
              <Button type="primary">Về trang chủ</Button>
            </Link>,
          ]}
        />
      ) : (
        <Result
          status="warning"
          title="Tài khoản này không tồn tại!"
          extra={[
            <Link to="/" key="home">
              <Button type="primary">Về trang chủ</Button>
            </Link>,
          ]}
        />
      )}
    </VerifyingCard>
  );
};
