import React, { useMemo } from 'react';
import { Trans } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import { Col, Row, Space } from 'antd';
import { Link } from 'react-router-dom';
import { Notification } from 'components/common/Notification/Notification';
import { capitalize } from 'utils/utils';
import { Mention, Notification as NotificationType } from 'api/notifications.api';
import { notificationsSeverities } from 'constants/notificationsSeverities';
import * as S from './NotificationsOverlay.styles';
import notificationsService from '../NotificationsService';

interface NotificationsOverlayProps {
  notifications: NotificationType[];
  setNotifications: (state: NotificationType[]) => void;
}

export const NotificationsOverlay: React.FC<NotificationsOverlayProps> = ({
  notifications,
  setNotifications,
  ...props
}) => {
<<<<<<< HEAD
  const { t } = useTranslation();
  const noticesList = useMemo(
    () =>
      notifications.map((notification, index) => {
        const type = notificationsSeverities.find((dbSeverity) => dbSeverity.name === notification.userName)?.name;
=======
  const noticesList = useMemo(
    () =>
      notifications.map((notification, index) => {
        const type = notificationsSeverities.find((dbSeverity) => dbSeverity.name === notification.name)?.name;
>>>>>>> main

        return (
          <Notification
            key={index}
            type={type || 'mention'}
            title={notification.userName}
            description={notification.description}
            mentionIconSrc={notification.userIcon}
            status={notification.status}
            id={notification.id}
<<<<<<< HEAD
            param={notification.param}
            typePost={notification.typePost}
=======
>>>>>>> main
          />
        );
      }),
    [notifications],
  );

  return (
    <S.NoticesOverlayMenu mode="inline" {...props}>
      <S.MenuRow gutter={[20, 20]}>
        <Col span={24} style={{ width: '15rem' }}>
          {notifications.length > 0 ? (
            <Space direction="vertical" size={10} split={<S.SplitDivider />}>
              {noticesList}
            </Space>
          ) : (
<<<<<<< HEAD
            <S.Text>{t('mini.noti')}</S.Text>
=======
            <S.Text>Không có thông báo</S.Text>
>>>>>>> main
          )}
        </Col>
        <Col span={24}>
          <Row gutter={[10, 10]}>
            {notifications.length > 0 && (
              <Col span={24} style={{ width: '15rem' }}>
                <S.Btn
                  type="ghost"
                  onClick={() => {
                    setNotifications([]);
                    notificationsService.DeleteNotifiCations();
                  }}
                >
<<<<<<< HEAD
                  {t('mini.readDone')}
=======
                  Đã đọc hết
>>>>>>> main
                </S.Btn>
              </Col>
            )}
            {/* <Col span={24}>
              <S.Btn type="link">
                <Link to="/">{t('header.notifications.viewAll')}</Link>
              </S.Btn>
            </Col> */}
          </Row>
        </Col>
      </S.MenuRow>
    </S.NoticesOverlayMenu>
  );
};
