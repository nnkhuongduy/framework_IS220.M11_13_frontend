export enum ChatMessageType {
  TEXT,
  REQUEST_PAYMENT,
  CONFIRM_PAYMENT,
  CONFIRM_RECEIVED,
  RATED,
}

export interface ChatMessage {
  id: string;
  sender: string;
  seen: boolean;
  content: string;
  supplyId: string;
  orderId: string;
  ratingId: string;
  messageType: ChatMessageType;
  createdOn: string;
  modifiedOn: string;
}
