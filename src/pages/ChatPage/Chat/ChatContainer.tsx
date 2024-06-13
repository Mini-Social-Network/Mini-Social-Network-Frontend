import React, { useEffect, useRef, useState, useCallback } from 'react';
import styled from 'styled-components';
import chatService from './ChatService';
import ChatInput from './ChatInput';
import { v4 as uuidv4 } from 'uuid';
import loading from '@app/assets/loader.gif';
import moment from 'moment';
import 'moment/locale/vi';
import {
  StompSessionProvider,
  useStompClient,
  useSubscription,
} from 'react-stomp-hooks';

import defaultAvatar from '@app/assets/DefaultAvatar.png';
import { Button } from 'antd';
import { notificationController } from '@app/controllers/notificationController';

interface ChatContainerProps {
  currentChat: any;
  currentUser: User | undefined;
  socket: any;
  topicContactId: any;
  handleChatUpdate: any;
  block: any;
  unblock: any;
  changeChat: any;
}

export interface Message {
  fromSelf: boolean;
  content: string;
  image?: string;
  user: User | undefined;
  isFile: boolean;
  createAt: Date;
}

export interface User {
  username: string;
  email: string;
  isAvatarImageSet: boolean;
  id: string;
  password: string;
  __v?: number;
  avatarImage: string;
  topicId: string;
}

const ChatContainer: React.FC<ChatContainerProps> = ({
  handleChatUpdate,
  currentChat,
  currentUser,
  socket,
  block,
  unblock,
  changeChat,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [arrivalMessage, setArrivalMessage] = useState<Message>();
  const [isLoading, setIsLoading] = useState(true);
  const [latestMessageDate, setLatestMessageDate] = useState<Date | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const stompClient = useStompClient();

  function daysIntoYear(date: Date) {
    return (
      (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) /
      24 /
      60 /
      60 /
      1000
    );
  }

  const fetchMessages = useCallback(async () => {
    if (currentChat && currentUser) {
      try {
        setIsLoading(true); // Set loading to true while fetching messages
        const response = await chatService.getAllMessages(currentChat.topicContactId);
        const updatedMessages = response.data.map((item: Message) => ({
          ...item,
          fromSelf: item?.user?.id === currentUser?.id,
        }));

        // Check if there are new messages
        const latestFetchedMessage = updatedMessages[updatedMessages.length - 1];
        setMessages(updatedMessages);
        setLatestMessageDate(new Date(latestFetchedMessage.createAt));
      } catch (error) {
        console.error('Failed to fetch messages', error);
      }
      setIsLoading(false);
    }
  }, [currentChat, currentUser]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages, currentChat]);

  const fetchNewMessages = useCallback(async () => {
    if (currentChat && currentUser && latestMessageDate) {
      try {
        const response = await chatService.getNewMessages(currentChat.topicContactId, latestMessageDate);
        const newMessages = response.data.map((item: Message) => ({
          ...item,
          fromSelf: item?.user?.id === currentUser?.id,
        }));

        if (newMessages.length > 0) {
          setMessages((prev) => [...prev, ...newMessages]);
          setLatestMessageDate(new Date(newMessages[newMessages.length - 1].createAt));
        }
      } catch (error) {
        console.error('Failed to fetch new messages', error);
      }
    }
  }, [currentChat, currentUser, latestMessageDate]);

  useEffect(() => {
    const interval = setInterval(fetchNewMessages, 3000); // Fetch new messages every 1 second
    return () => clearInterval(interval);
  }, [fetchNewMessages]);

  useEffect(() => {
    const elem = document.getElementById('chat-messages');
    if (elem) elem.scrollTop = elem.scrollHeight;
  }, [messages, currentChat]);

  useSubscription(`/topic/chat/${currentChat.topicContactId}`, (message: any) => {
    const body = JSON.parse(message.body);
    if (body.status === 1) {
      setArrivalMessage({
        fromSelf: body.data.user.id === currentUser?.id,
        content: body.data.isFile ? '' : body.data.content,
        image: body.data.isFile ? `http://localhost:8081/local-store/${body.data.content}` : undefined,
        user: body.data.user,
        isFile: body.data.isFile,
        createAt: new Date(),
      });
      changeChat({ ...currentChat, blocked: false });
    } else if (body.data === currentUser?.id) {
      changeChat({ ...currentChat, blocked: true });
      notificationController.success({ message: 'Bạn đã bị chặn' });
    }
  });

  useEffect(() => {
    if (socket.current) {
      socket.current.on('msg-recieve', (msg: string) => {
        console.log(msg);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (arrivalMessage) {
      setMessages((prev) => [...prev, arrivalMessage]);
      setLatestMessageDate(new Date(arrivalMessage.createAt));
    }
  }, [arrivalMessage]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = useCallback(
    async (msg: string, image: string) => {
      handleChatUpdate(true);
      if (currentUser && stompClient) {
        const messageBody = {
          userId: currentUser.id,
          content: image || msg,
          chatParent: null,
          isFile: Boolean(image),
        };
        stompClient.publish({
          destination: `/app/chat/${currentChat.topicContactId}`,
          body: JSON.stringify(messageBody),
        });
      }
    },
    [currentUser, currentChat, stompClient, handleChatUpdate]
  );

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={currentChat?.userFriend?.imageUrl ? `http://localhost:8081/local-store/${currentChat?.userFriend?.imageUrl}` : defaultAvatar}
              alt="current Chat avatar"
              onError={(e) => {
                e.currentTarget.src = defaultAvatar;
              }}
            />
          </div>
          <div className="username">
            <h3>{currentChat?.userFriend?.name}</h3>
          </div>
          <div className="Block">
            {currentChat.block ? (
              <Button onClick={() => unblock(currentChat.topicContactId, currentChat.userFriend.id)}>
                Bỏ Chặn
              </Button>
            ) : (
              <Button onClick={() => block(currentChat.topicContactId, currentChat.userFriend.id)}>
                Chặn
              </Button>
            )}
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="loading-messages">
          <img src={loading} alt="loader" className="loader" />
        </div>
      ) : (
        <div className="chat-messages" id="chat-messages">
          {messages.map((message, index, messages) => {
            const dateCurrentMessage = new Date(message.createAt);
            const dateNow = new Date();
            let isPaging = false;
            let timeDeplay = '';
            if (index > 0) {
              const datePreviousMessage = new Date(messages[index - 1].createAt);
              isPaging = dateCurrentMessage.getTime() - datePreviousMessage.getTime() >= 7200000;
            }
            if (isPaging) {
              const nowDay = daysIntoYear(dateNow);
              const currentMessageDay = daysIntoYear(dateCurrentMessage);
              if (nowDay - currentMessageDay === 0) {
                timeDeplay = moment(dateCurrentMessage).locale('vi').format('hh:mm');
              } else if (nowDay - currentMessageDay > 0 && nowDay - currentMessageDay <= 7) {
                timeDeplay = moment(dateCurrentMessage).locale('vi').format('dddd hh:mm');
              } else {
                timeDeplay = moment(dateCurrentMessage).locale('vi').format('hh:mm, DD MMMM YYYY');
              }
            }
            return (
              <React.Fragment key={uuidv4()}>
                {isPaging && <div style={{ margin: 'auto', padding: '5px 0' }}>{timeDeplay}</div>}
                <div ref={scrollRef}>
                  <div className={`message ${message.fromSelf ? 'sended' : 'recieved'}`}>
                    {message.content && !message.isFile && (
                      <div className="content">
                        <p>{message.content}</p>
                      </div>
                    )}
                    {message.isFile && (
                      <div className="content-image">
                        <img
                          src={`http://localhost:8081/local-store/${message.content}`}
                          alt="sended"
                          onError={(e) => {
                            e.currentTarget.src = defaultAvatar;
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      )}
      {currentChat.blocked && <div className="blockInput">Bạn đã bị chặn</div>}
      {!currentChat.blocked && (
        <ChatInput handleSendMessage={handleSendMessage} />
      )}
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 78% 12;
  gap: 0.1rem;
  overflow: hidden;
  background-color: white;
  border-left: 1px solid #d3d3d3;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-auto-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    align-items: center;
    padding: 0.2rem 2rem;
    border-bottom: 1px black solid;
    .user-details {
      display: flex;
      align-items: center;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: black;
        }
      }
    }
    .Block {
      margin-left: auto;
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: black;
      }
      &.sended {
        justify-content: flex-end;
        .content {
          background-color: #9a86f3;
          color: white;
        }
        .content-image {
          img {
            width: 300px;
            height: auto;
            border-radius: 1rem;
          }
        }
      }
      &.recieved {
        justify-content: flex-start;
        .content {
          background-color: #ececec;
        }
        .content-image {
          img {
            width: 300px;
            height: auto;
            border-radius: 1rem;
          }
        }
      }
    }
  }
  .loading-messages {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    .loader {
      width: 50px;
    }
  }
  .blockInput {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
`;

export default ChatContainer;
