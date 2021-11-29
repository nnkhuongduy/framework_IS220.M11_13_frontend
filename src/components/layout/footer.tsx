import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';

import { StyledFooter } from './styled';

export const Footer = () => {
  return (
    <StyledFooter>
      <div className="page-layout-spacing">
        <Row gutter={[40, 40]}>
          <Col sm={24} md={6}>
            <Link to="/">
              <img
                src="/assets/images/Logo-White.png"
                alt="99phantram logo"
                className="logo"
              />
            </Link>
          </Col>
          <Col sm={24} md={6}>
            <Row gutter={[8, 8]}>
              <Col span={24}>
                <b>HỔ TRỢ KHÁCH HÀNG</b>
              </Col>
              <Col span={24}>Trung tâm trợ giúp</Col>
              <Col span={24}>An toàn mua bán</Col>
              <Col span={24}>Quy định cần biết</Col>
              <Col span={24}>Quy chế quyền riêng tư</Col>
              <Col span={24}>Liên hệ hỗ trợ</Col>
            </Row>
          </Col>
          <Col sm={24} md={6}>
            <Row gutter={[8, 8]}>
              <Col span={24}>
                <b>VỀ 99PHANTRAM</b>
              </Col>
              <Col span={24}>Giới thiệu</Col>
              <Col span={24}>Tuyển dụng</Col>
              <Col span={24}>Truyền thông</Col>
              <Col span={24}>Blog</Col>
            </Row>
          </Col>
          <Col sm={24} md={6}>
            <Row gutter={[8, 8]}>
              <Col span={24}>
                <b>LIÊN KẾT VỚI CHÚNG TÔI</b>
              </Col>
              <Col span={24}>Facebook</Col>
              <Col span={24}>Google</Col>
            </Row>
          </Col>
        </Row>
        <div className="info">
          <p>
            Đây là dự án demo website C2C thực hiện bởi nhóm sinh viên trường
            Đại học Công nghệ thông tin - ĐHQG TPHCM
          </p>
          <p>Mọi chi tiết xin liên hệ - nnkhuongduy@gmail.com</p>
        </div>
      </div>
    </StyledFooter>
  );
};
