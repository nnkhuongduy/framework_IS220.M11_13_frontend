import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

export const StepSix = () => {
  return (
    <Result
      status="success"
      title="Đăng sản phẩm thành công!"
      subTitle="99PhầnTrăm sẽ kiểm duyệt bài đăng của bạn và sẽ thông báo kết quả cho bạn từ 2 - 12 tiếng!"
      extra={[
        <Link to="/">
          <Button type="primary">Trang chủ</Button>,
        </Link>,
      ]}
    />
  );
};
