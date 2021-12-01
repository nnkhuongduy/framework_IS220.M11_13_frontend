import { FC } from 'react';
import { Row, Col, Avatar, Typography } from 'antd';
import dayjs from 'dayjs';

import { User } from 'src/models/user';
import { ChatMessage } from 'src/models/chat-message';
import { MessageTypeSwitch } from './types/switch';

import { MessageBox, MessageCol, MessageItemMain } from './styled';

interface ItemProps {
  message: ChatMessage;
  sender: User;
  direction: 'left' | 'right';
  sendTime: string;
}

export const MessageItem: FC<ItemProps> = ({
  message,
  sender,
  direction,
  sendTime,
}) => {
  const SendDateText = () => (
    <Typography.Text type="secondary" style={{ margin: '0 10px' }}>
      {dayjs(sendTime).format('LLL')}
    </Typography.Text>
  );

  const BodyCol = () => (
    <Col>
      <Row>
        <MessageCol span={24} direction={direction}>
          <SendDateText />
        </MessageCol>
        <MessageCol span={24} direction={direction}>
          <MessageBox direction={direction}>
            <MessageTypeSwitch message={message} />
          </MessageBox>
        </MessageCol>
      </Row>
    </Col>
  );

  const AvatarCol = () => (
    <Col>
      <Avatar src={sender.avatar} style={{ marginTop: '5px' }}>
        {sender.firstName[0]}
      </Avatar>
    </Col>
  );

  return (
    <MessageItemMain>
      <Row
        wrap={false}
        justify={direction === 'left' ? 'start' : 'end'}
        gutter={16}
      >
        {direction === 'left' ? (
          <>
            <AvatarCol />
            <BodyCol />
          </>
        ) : (
          <>
            <BodyCol />
            <AvatarCol />
          </>
        )}
      </Row>
    </MessageItemMain>
  );
};
