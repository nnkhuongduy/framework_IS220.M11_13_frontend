import { FC, useEffect, useRef } from 'react';
import { Skeleton, Col } from 'antd';

import { Chat } from 'src/models/chat';
import { useAppSelector } from 'src/hooks/store';
import { selectCurrentUser } from 'src/slices/auth';
import { MessageItem } from './message-item';

import { ChatBoxMain } from './styled';

interface Props {
  chat?: Chat;
}

export const MessageList: FC<Props> = ({ chat }) => {
  const user = useAppSelector(selectCurrentUser);
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    if (chat && ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [chat]);

  if (!chat || !user) {
    return (
      <ChatBoxMain>
        {[...Array(6).keys()].map((index) => (
          <Col span={24} key={index}>
            <Skeleton title={false} active avatar={true} />
          </Col>
        ))}
      </ChatBoxMain>
    );
  }

  return (
    <ChatBoxMain ref={ref}>
      {chat.content.map((message) => (
        <MessageItem
          key={message.id}
          message={message}
          sender={chat.user1.id === message.sender ? chat.user1 : chat.user2}
          direction={message.sender === user.id ? 'right' : 'left'}
          sendTime={message.createdOn}
        />
      ))}
    </ChatBoxMain>
  );
};
