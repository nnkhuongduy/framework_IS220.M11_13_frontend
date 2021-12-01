import { FC, useState } from 'react';
import { Col, Row, Avatar, Typography, Button, Divider } from 'antd';
import { AiOutlineUser } from 'react-icons/ai';
import { Link, useHistory } from 'react-router-dom';

import { User } from 'src/models/user';
import { useStartChatMutation } from 'src/services/chat';
import { useHttpError } from 'src/hooks/http';
import { useAppSelector } from 'src/hooks/store';
import { selectCurrentUser } from 'src/slices/auth';
import { ContactModal } from './contact-modal';
import { Supply } from 'src/models/supply';

interface Props {
  supply: Supply;
  user?: User;
  preview?: boolean;
}

export const SupplyUser: FC<Props> = ({ supply, user, preview }) => {
  const history = useHistory();
  const httpError = useHttpError();
  const currentUser = useAppSelector(selectCurrentUser);

  const [startChat, { isLoading }] = useStartChatMutation();

  const [visible, setVisible] = useState(false);

  const onContact = async (message: string) => {
    if (!currentUser) {
      return history.push({
        pathname: '/login',
        search: `?return=/supply/${supply.id}`,
      });
    }

    if (!preview && user) {
      try {
        const chatId = (
          await startChat({
            receiverId: user.id,
            message,
          }).unwrap()
        ).chatId;

        history.push(`/contact/${chatId}`);
      } catch (error) {
        httpError(error);
      }
    }
  };

  if (user) {
    return (
      <>
        <Row>
          <Col span={24}>
            <Row gutter={8}>
              <Col>
                <Avatar src={user.avatar} icon={<AiOutlineUser />} size={48} />
              </Col>
              <Col>
                {preview ? (
                  <Typography.Paragraph style={{ margin: '8px 0' }} strong>
                    {user.lastName} {user.firstName}
                  </Typography.Paragraph>
                ) : (
                  <Link to={`/user/${user.id}`}>
                    <Typography.Paragraph style={{ margin: '8px 0' }} strong>
                      {user.lastName} {user.firstName}
                    </Typography.Paragraph>
                  </Link>
                )}
                <div style={{ textAlign: 'center' }}>
                  {preview ? (
                    <Button type="default">Xem trang</Button>
                  ) : (
                    <Link to={`/user/${user.id}`}>
                      <Button type="default">Xem trang</Button>
                    </Link>
                  )}
                </div>
              </Col>
            </Row>
          </Col>
          <Divider />
          <Col span={24}>
            <Button
              style={{ width: '100%' }}
              type="primary"
              onClick={() => setVisible(true)}
              disabled={isLoading}
            >
              Liên hệ
            </Button>
          </Col>
        </Row>
        <ContactModal
          visible={visible}
          title={`Liên hệ với ${user.lastName} ${user.firstName}`}
          initialMessage={`Xin chào ${user.lastName} ${user.firstName}! Sau khi tham khảo sản phẩm, tôi có nhu cầu muốn mua ${supply.name} từ bạn.`}
          onCancel={() => setVisible(false)}
          onSubmit={onContact}
        />
      </>
    );
  }

  return null;
};
