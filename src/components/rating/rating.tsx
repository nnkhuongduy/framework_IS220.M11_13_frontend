import { FC } from 'react';
import { Row, Col, Avatar, Rate, Typography } from 'antd';
import dayjs from 'dayjs';

import { Rating } from 'src/models/rating';

interface Props {
  rating: Rating;
}

export const RatingRow: FC<Props> = ({ rating }) => {
  return (
    <Row gutter={[8, 8]} style={{ textAlign: 'left' }}>
      <Col>
        <Avatar src={rating.user.avatar}>{rating.user.firstName[0]}</Avatar>
      </Col>
      <Col>
        <div>
          <Typography.Text strong style={{ margin: '0' }}>
            {rating.user.lastName} {rating.user.firstName}
          </Typography.Text>
          <Typography.Text type="secondary" style={{ marginLeft: '10px' }}>
            {dayjs(rating.createdOn).format('L')}
          </Typography.Text>
        </div>

        <Rate defaultValue={rating.point} disabled />

        <Typography.Paragraph style={{ textAlign: 'left' }}>
          {rating.comment}
        </Typography.Paragraph>
      </Col>
    </Row>
  );
};
