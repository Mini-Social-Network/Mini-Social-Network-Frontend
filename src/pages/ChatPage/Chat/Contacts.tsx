import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled'
import Chat from '@app/assets/chat.png';

import defaultAvatar from '@app/assets/DefaultAvatar.png';

import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface ContactsProps {
  contacts: any;
  currentUser: any;
  changeChat: (chat: any) => void;
}
export interface User {
  username: string;
  email: string;
  isAvatarImageSet: boolean;
  _id: string;
  password: string;
  __v?: number;
  avatarImage: string;
}
const Contacts: React.FC<ContactsProps> = ({ contacts, currentUser, changeChat }) => {
  const [currentUserName, setCurrentUserName] = useState<string>('');
  const [currentUserImage, setCurrentUserImage] = useState<string>('');
  const [currentSelected, setCurrentSelected] = useState<string>('');

  const navigate = useNavigate();
  const { t } = useTranslation();
  useEffect(() => {
    const setUser = async () => {
      if (localStorage.getItem('chat-app-user')) {
        const data: User = await JSON.parse(localStorage.getItem('chat-app-user')!);
        setCurrentUserName(data.username);
        setCurrentUserImage(data.avatarImage);
      }
    };
    setUser();
  }, []);

  const changeCurrentChat = (index: any, contact: any) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      <Container style={{ backgroundColor: 'var(--background-color)' }}>
        <div className="brand" style={{ backgroundColor: 'var(--timeline-background-color)' }}>
          <img src={Chat} alt="logo" />
          <h3 style={{ color: 'var(--text-main-color)' }}>{t('mini.chat')}</h3>
        </div>
        <div className="contacts">
          {contacts?.map((contact: any, index: any) => {
            return (
              <div
                key={contact._id}
                className={`contact ${index === currentSelected ? 'selected' : ''}`}
                style={{ backgroundColor: 'var(--secondary-background-selected-color)' }}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className="avatar">
                  <img
                    src={
                      contact?.userFriend?.imageUrl
                        ? `http://localhost:8081/local-store/${contact?.userFriend?.imageUrl}`
                        : defaultAvatar
                    }
                    alt=""
                  />
                </div>
                <div className="username">
                  <h3 style={{ color: 'var(--text-main-color)' }}>{contact?.userFriend?.name}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  overflow: hidden;
  background-color: var(--layout-sider-bg-color);
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    /* padding: 1.8rem 0; */
    img {
      height: 3rem;
    }
    h3 {
      color: #e4e6eb;
      text-transform: uppercase;
      display: none;
    }
    @media screen and (min-width: 720px) {
      h3 {
        display: block;
      }
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff15;
      min-height: 5rem;
      cursor: pointer;
      border-radius: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: var(--text-main-color);
        }
      }

      &:hover {
        filter: brightness(80%);
      }
    }
    .selected {
      /* background-color: #9a86f3; */
      background-color: rgba(45, 136, 255, 0.1);
    }
    @media screen and (min-width: 720px) {
      .contact {
        flex-direction: row;
        justify-content: flex-start;

        padding: 1.1rem;
        gap: 1rem;
        .username {
          h3 {
            color: white;
            display: block;
          }
        }
      }
    }
  }
  .current-user {
    background-color: var(--layout-sider-bg-color);
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 0.2px solid #ffffff15;
    .avatar {
      height: 3.1rem;
      position: relative;
      img {
        height: 3.1rem;
        /* max-inline-size: 100%; */
      }
      .camera-img {
        position: absolute;
        left: 0;
        top: 0;
        background-color: #ffffff42;
        border-radius: 50%;
        height: 3.1rem;
        width: 3.1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        img {
          height: 2.5rem;
          width: 2.5rem;
        }
      }
    }
    .username {
      h2 {
        color: white;
        display: none;
      }
    }
    @media screen and (min-width: 720px) {
      gap: 1rem;
      justify-content: flex-start;
      padding: 0.4rem;

      .username {
        h2 {
          font-size: 1rem;
          display: block;
          font-size: 1.2rem;
        }
      }
    }
  }
  @media screen and (max-width: 900px) and (orientation: landscape) {
    grid-template-rows: 15% 70% 15%;
    .contacts {
      .contact {
        min-height: 4rem;
      }
    }
    h3 {
      display: none;
    }
  }
`;

export default Contacts;
