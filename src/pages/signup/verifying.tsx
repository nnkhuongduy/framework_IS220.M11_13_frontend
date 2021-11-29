import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

import { useToggleLayoutHeader } from 'src/hooks/toggle-layout-header';

import { VerifyingCard } from './styled';

export const VerifyingPage = () => {
  useToggleLayoutHeader();

  return (
    <VerifyingCard bordered={false}>
      <Result
        status="success"
        title="Tài khoản của bạn đã được tạo thành công!"
        subTitle="Email xác nhận sẽ được gửi đến mail của bạn trong 5-10 phút. Vui lòng xác nhận tài khoản qua email đó."
        extra={[
          <Link to="/" key="home">
            <Button type="primary">
              Về trang chủ
            </Button>
          </Link>,
        ]}
      />
    </VerifyingCard>
  );
};
