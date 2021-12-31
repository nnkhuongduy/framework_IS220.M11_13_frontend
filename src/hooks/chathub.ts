import * as signalR from '@microsoft/signalr';

const connection = new signalR.HubConnectionBuilder()
  .withUrl(process.env.REACT_APP_API_ENDPOINT + '/chathub')
  .withAutomaticReconnect()
  .configureLogging(signalR.LogLevel.Information)
  .build();

const start = async () => {
  try {
    if (connection.state === 'Disconnected') {
      await connection.start();
    }
  } catch (error) {
    console.log(error);
  }
};

export const useChatHub = () => {
  return {
    start,
    connection,
  };
};
