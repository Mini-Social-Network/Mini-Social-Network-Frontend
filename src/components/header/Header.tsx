import React, { useEffect, useState } from 'react';
import { DesktopHeader } from './layouts/DesktopHeader';
import { MobileHeader } from './layouts/MobileHeader';
import { useResponsive } from '@app/hooks/useResponsive';
import { useSubscription } from 'react-stomp-hooks';
import { notificationController } from '@app/controllers/notificationController';
<<<<<<< HEAD
import { useTranslation } from 'react-i18next';
=======
>>>>>>> main

interface HeaderProps {
  toggleSider: () => void;
  isSiderOpened: boolean;
  isTwoColumnsLayout: boolean;
}

export const Header: React.FC<HeaderProps> = ({ toggleSider, isSiderOpened, isTwoColumnsLayout }) => {
  const { isTablet } = useResponsive();
  const UserDataNew = localStorage.getItem('UserData');
  const [userInfo, setUserInfo] = useState(UserDataNew ? JSON.parse(UserDataNew)?.topicId : '');
<<<<<<< HEAD
  useEffect(() => {
    const UserData = localStorage.getItem('UserData');
    const UserInfo = JSON.parse(UserData as string);
    setUserInfo(UserInfo?.topicId);
  }, []);
  const { t } = useTranslation();
  useSubscription(`/topic/user/${userInfo}`, (message: any) => {
    console.log(message);
    const body = JSON.parse(message.body);
    const actionSender = JSON.parse(body.value);
    const senderInfo = JSON.parse(actionSender.user);
    let action = '';
    switch (actionSender.action) {
      case 'post-like':
        action = `${t('mini.likepost')}`;
        break;
      case 'post-comment':
        action = `${t('mini.cmtpost')}`;
        break;
      case 'request-friend':
        action = `${t('mini.sendfrreq')}`;
        break;
      case 'accept-friend':
        action = `${t('mini.acptfrreq')}`;
        break;
      case 'subscriber':
        action = `${t('mini.subex')}`;
        break;
      case 'post-new':
        action = `${t('mini.newpost')}`;
        break;
      case 'new-message':
        action = `${t('mini.newchat')}`;
        break;
      default:
        break;
    }

    notificationController.success({
      message: `${senderInfo.name} ${t('mini.had')} ${action}`,
=======
  const getLogin = (isLogin: boolean) => {};
  useEffect(() => {
    const UserData = localStorage.getItem('UserData');
    const UserInfo = JSON.parse(UserData);
    setUserInfo(UserInfo?.topicId);
  }, []);

  useSubscription(`/topic/user/${userInfo}`, (message: any) => {
    console.log(message);
    const body = JSON.parse(message.body);
    const actionSender = JSON.parse(body.value);
    const senderInfo = JSON.parse(actionSender.user);
    let action = '';
    switch (actionSender.action) {
      case 'post-like':
        action = 'thích bài viết';
        break;
      case 'post-comment':
        action = 'bình luận bài viết';
        break;
      case 'request-friend':
        action = 'gửi lời mời kết bạn';
        break;
      case 'accept-friend':
        action = 'chấp nhận lời mời kết bạn';
        break;
      case 'subscriber':
        action = 'đăng ký';
        break;
      default:
        break;
    }

    notificationController.success({
      message: `${senderInfo.name} đã ${action} của bạn ${body.user.name}`,
>>>>>>> main
    });
  });
  return isTablet ? (
    <DesktopHeader isTwoColumnsLayout={isTwoColumnsLayout} />
  ) : (
    <MobileHeader toggleSider={toggleSider} isSiderOpened={isSiderOpened} />
  );
};
