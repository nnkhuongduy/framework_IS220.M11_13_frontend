import { ChatMessage } from './chat-message';
import { User } from './user';

export interface Chat {
  id: string;
  user1: User;
  user2: User;
  content: ChatMessage[];
  createdOn: string;
  modifiedOn: string;
}

export interface StartChatBody {
  receiverId: string;
  message: string;
}

export type ChatMeta = Omit<Chat, 'content' | 'user1' | 'user2'> & {
  user: User;
  lastMessage: ChatMessage;
  unseens: number;
};

export interface SendMessageBody {
  message: string;
  chatId: string;
  supplyId?: string;
}
