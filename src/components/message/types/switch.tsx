import { FC } from 'react';

import { ChatMessage, ChatMessageType } from 'src/models/chat-message';
import { PaymentMessage } from './payment';
import { ConfirmPaymentMessage } from './confirm';
import { ReceivedMessage } from './received';
import { RatedMessage } from './rated';

interface Props {
  message: ChatMessage;
}

export const MessageTypeSwitch: FC<Props> = ({ message }) => {
  switch (message.messageType) {
    case ChatMessageType.REQUEST_PAYMENT:
      return <PaymentMessage message={message} />;
    case ChatMessageType.CONFIRM_PAYMENT:
      return <ConfirmPaymentMessage message={message} />;
    case ChatMessageType.CONFIRM_RECEIVED:
      return <ReceivedMessage message={message} />;
    case ChatMessageType.RATED:
      return <RatedMessage message={message} />;
    default:
      return <>{message.content}</>;
  }
};
