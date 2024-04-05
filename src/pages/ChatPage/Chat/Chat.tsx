import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import chatService from './ChatService';
import Contacts from './Contacts';
import Welcome from './Welcome';
import ChatContainer from './ChatContainer';
import { useSubscription } from 'react-stomp-hooks';
import { notificationController } from '@app/controllers/notificationController';

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

function Chat() {
  const { state } = useLocation();

  const [contacts, setContacts] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User>();
  const [currentChat, setCurrentChat] = useState(undefined);
  const navigate = useNavigate();

  const UserDataNew = localStorage.getItem('UserData');
  const [userInfo, setUserInfo] = useState(UserDataNew ? JSON.parse(UserDataNew)?.topicId : '');

  useEffect(() => {
    const UserData = localStorage.getItem('UserData');
    const UserInfo = JSON.parse(UserData ? UserData : '');
    setUserInfo(UserInfo?.topicId);
  }, []);

  useSubscription(`/topic/user/${userInfo}`, (message: any) => {
    console.log(message);
    const body = JSON.parse(message.body);
    const actionSender = JSON.parse(body.value);

    if (actionSender.action === 'new-message') {
      chatService.getListFriends().then((data: any) => {
        if (data?.data?.length > 0) {
          setContacts(data.data);
        }
      });
    }
  });

  useEffect(() => {
    const setUser = async () => {
      if (!localStorage.getItem('UserData')) {
        navigate('/login');
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem('UserData')!));
      }
    };
    setUser();
  }, [navigate]);

  useEffect(() => {
    if (currentUser) {
    }
  }, [currentUser]);

  useEffect(() => {
    chatService.getListFriends().then((data: any) => {
<<<<<<< HEAD
      if (data?.data?.length > 0) {
        const newdata = data.data;
        if (state) {
          if (newdata) {
            const found = newdata.find((item: any) => item.topicContactId === (state as any).topicContactId);

            if (!found) {
              newdata.unshift({
                topicContactId: (state as any).topicContactId,
                userFriend: { name: (state as any).name, imageUrl: (state as any).imageUrl },
              });
            }
          }

          newdata.map((contact: any, index: any) => {
            if (contact.topicContactId == (state as any).topicContactId) {
              setCurrentChat(contact);
            }
          });
          setContacts(newdata);
        } else {
          setContacts(newdata);
        }
=======
      const newdata = data.data;
      if (state) {
        if (newdata) {
          const found = newdata.find((item: any) => item.topicContactId === state.topicContactId);

          if (!found) {
            newdata.unshift({
              topicContactId: state.topicContactId,
              userFriend: { name: state.name, imageUrl: state.imageUrl },
            });
          }
        }

        newdata.map((contact: any, index: any) => {
          if (contact.topicContactId == state.topicContactId) {
            setCurrentChat(contact);
          }
        });
        setContacts(newdata);
      } else {
        setContacts(newdata);
>>>>>>> main
      }
    });
  }, []);

  const handleChatChange = (chat: any) => {
    setCurrentChat(chat);
  };
  const handleChatUpdate = (update: boolean) => {
    if (update) {
      chatService.getListFriends().then((data: any) => {
        const newdata = data.data;
        if (state) {
          if (newdata) {
<<<<<<< HEAD
            const found = newdata.find((item: any) => item.topicContactId === (state as any).topicContactId);

            if (!found) {
              newdata.unshift({
                topicContactId: (state as any).topicContactId,
                userFriend: { name: (state as any).name, imageUrl: (state as any).imageUrl },
=======
            const found = newdata.find((item: any) => item.topicContactId === state.topicContactId);

            if (!found) {
              newdata.unshift({
                topicContactId: state.topicContactId,
                userFriend: { name: state.name, imageUrl: state.imageUrl },
>>>>>>> main
              });
            }
          }

          newdata.map((contact: any, index: any) => {
<<<<<<< HEAD
            if (contact.topicContactId == (state as any).topicContactId) {
=======
            if (contact.topicContactId == state.topicContactId) {
>>>>>>> main
              setCurrentChat(contact);
            }
          });
          setContacts(newdata);
        } else {
          setContacts(newdata);
        }
      });
    }
  };
<<<<<<< HEAD

  const block = (topicId: string, uId: string) => {
    chatService.block(topicId, uId).then((res: any) => {
      if (res.status === 1) {
        chatService.getListFriends().then((data: any) => {
          const newdata = data.data;
          if (currentChat) {
            newdata.map((contact: any, index: any) => {
              if ((currentChat as any)?.topicContactId === contact.topicContactId) {
                setCurrentChat(contact);
                notificationController.success({ message: 'Chặn thành công' });
              }
            });
            setContacts(newdata);
          } else {
            setContacts(newdata);
          }
        });
      }
    });
  };
  const unblock = (topicId: string, uId: string) => {
    chatService.unblock(topicId, uId).then((res: any) => {
      if (res.status === 1) {
        chatService.getListFriends().then((data: any) => {
          const newdata = data.data;
          if (currentChat) {
            newdata.map((contact: any, index: any) => {
              if ((currentChat as any)?.topicContactId === contact.topicContactId) {
                setCurrentChat(contact);
                notificationController.success({ message: 'Bỏ chặn thành công' });
              }
            });
            setContacts(newdata);
          } else {
            setContacts(newdata);
          }
        });
      }
    });
  };
=======
>>>>>>> main
  return (
    <>
      <Container>
        <div className="container">
          <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
          {currentChat === undefined ? (
            <Welcome currentUsername={currentUser?.username || ''} />
          ) : (
            <ChatContainer
              handleChatUpdate={handleChatUpdate}
              currentChat={currentChat}
<<<<<<< HEAD
              topicContactId={(currentChat as any).topicContactId}
              block={block}
              unblock={unblock}
              changeChat={handleChatChange}
              currentUser={currentUser ? currentUser : undefined}
=======
              currentUser={currentUser}
>>>>>>> main
              socket={'a'}
            />
          )}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: -webkit-fill-available;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: var(--layout-sider-bg-color);
  .container {
    width: 84vw;
    height: 87vh;
    background-color: var(--layout-header-bg-color);
    display: grid;
    grid-template-columns: 20% 80%;

    @media screen and (min-width: 720px) {
      grid-template-columns: 35% 65%;
      grid-template-rows: none;
      width: 84vw;
      height: 87vh;
    }
    @media screen and (min-width: 1100px) {
      grid-template-columns: 28% 72%;
    }
  }
`;

export default Chat;
