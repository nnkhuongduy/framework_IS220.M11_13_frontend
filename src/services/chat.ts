import {
  Chat,
  ChatMeta,
  StartChatBody,
  SendMessageBody,
} from 'src/models/chat';
import { _99phantramApi } from 'src/slices/api';

export const chatApi = _99phantramApi.injectEndpoints({
  endpoints: (build) => ({
    startChat: build.mutation<{ chatId: string }, StartChatBody>({
      query: (body) => ({
        url: '/chat/start',
        method: 'POST',
        body,
      }),
    }),
    getChats: build.query<ChatMeta[], void>({
      query: () => '/chat/list',
    }),
    connectChat: build.mutation<Chat, string>({
      query: (chatId) => `/chat/connect/${chatId}`,
    }),
    disconnectChat: build.mutation<void, string>({
      query: (chatId) => `/chat/disconnect/${chatId}`,
    }),
    sendMessage: build.mutation<void, SendMessageBody>({
      query: ({ message, chatId, supplyId }) => ({
        url: `/chat/send/${chatId}`,
        method: 'POST',
        body: {
          message,
          supplyId,
        },
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useStartChatMutation,
  useGetChatsQuery,
  useConnectChatMutation,
  useDisconnectChatMutation,
  useSendMessageMutation,
} = chatApi;
