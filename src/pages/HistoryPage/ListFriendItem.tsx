import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { activityStatuses } from '@app/constants/config/activityStatuses';
import { Dates } from '@app/constants/Dates';
import * as s from './Tables.styles';
import { Activity } from '@app/api/activity.api';
import dfavt from '@app/share/dfavt.png';
import { Button, Rate } from 'antd';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import listContactService from './ListFriendPageService';

export const ListFriendItem: React.FC<Activity> = ({
  id,
  imageUrl,
  name,
  status,
  email,
  topicId,
  isExpert,
  expertInfo,
  contactInfo,
  unfriend,
  addfriend,
  acpfriend,
  cancelacpfriend,
  subexpert,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  console.log(imageUrl, name, status, email);
  const [isSubcribed, setIsSubcribed] = useState<boolean>(isExpert && expertInfo.isSub);
  const currentActivity = useMemo(() => activityStatuses.find((dbStatus) => dbStatus.name === status), [status]);

  const [statusFr, setStatusFr] = useState<number>(contactInfo && contactInfo.status);

  useEffect(() => {
    setIsSubcribed(isExpert && expertInfo.isSub);
    setStatusFr(contactInfo && contactInfo.status);
  }, [expertInfo, contactInfo]);
  const getBtn = (statusFr: any) => {
    switch (statusFr) {
      case 1:
        return (
          <Button
            size={'small'}
            onClick={() => {
              cancelacpfriend(id);
            }}
          >
<<<<<<< HEAD
            {t('mini.cancel')}
=======
            Huỷ lời mời
>>>>>>> main
          </Button>
        );
      case 2:
        return (
          <Button
            size={'small'}
            onClick={() => {
              unfriend(id);
            }}
          >
<<<<<<< HEAD
            {t('mini.unfr')}
=======
            Huỷ kết bạn
>>>>>>> main
          </Button>
        );
      case 3:
        return (
          <>
            <Button
              size={'small'}
              type={'primary'}
              onClick={() => {
                acpfriend(id);
              }}
            >
<<<<<<< HEAD
              {t('mini.acptfr')}
=======
              Chấp nhận
>>>>>>> main
            </Button>
            <Button
              size={'small'}
              onClick={() => {
                unfriend(id);
              }}
              danger
            >
<<<<<<< HEAD
              {t('mini.cancel')}
=======
              Xoá
>>>>>>> main
            </Button>
          </>
        );

      default:
        return (
          <Button
            size={'small'}
            type={'primary'}
            onClick={() => {
              addfriend(id);
            }}
          >
<<<<<<< HEAD
            {t('mini.addfr')}
=======
            Kết bạn
>>>>>>> main
          </Button>
        );
    }
  };
  return (
    <s.ActivityCard bodyStyle={{ padding: '25px  10px' }}>
      <s.Wrapper>
<<<<<<< HEAD
        <s.ImgWrapper onClick={() => navigate(`/profile-page/${id}`)}>
=======
        <s.ImgWrapper>
>>>>>>> main
          <img
            src={imageUrl ? `http://localhost:8081/local-store/${imageUrl}` : dfavt}
            alt={`title ${imageUrl ? imageUrl : 'dfavt'}`}
            width={84}
            height={84}
          />
        </s.ImgWrapper>

        <s.InfoWrapper>
          <s.InfoHeaderWrapper>
<<<<<<< HEAD
            <s.TitleWrapper onClick={() => navigate(`/profile-page/${id}`)}>
=======
            <s.TitleWrapper>
>>>>>>> main
              <s.Title level={5}>
                {name} {isExpert ? <CheckCircleTwoTone /> : null}
              </s.Title>
            </s.TitleWrapper>

<<<<<<< HEAD
            <s.TextCard onClick={() => navigate(`/profile-page/${id}`)}>{email}</s.TextCard>
            {isExpert ? (
              <span onClick={() => navigate(`/profile-page/${id}`)}>
=======
            <s.TextCard>{email}</s.TextCard>
            {isExpert ? (
              <span>
>>>>>>> main
                <Rate disabled style={{ fontSize: '1rem' }} defaultValue={expertInfo.rating} />
                {expertInfo.ratingCount ? (
                  <span style={{ fontSize: '0.8rem' }} className="ant-rate-text">
                    {expertInfo.ratingCount}
                  </span>
                ) : (
                  ''
                )}
              </span>
            ) : null}

            <Button
              size={'small'}
              onClick={() => {
                if (!contactInfo) {
                  listContactService.addFriend(id, 'null').then((res: any) => {
                    if (res.status) {
                      navigate(`/chat-center`, {
                        state: { topicContactId: res.data.topicId, imageUrl: imageUrl, name: name },
                      });
                    }
                  });
                } else {
                  navigate(`/chat-center`, {
                    state: { topicContactId: contactInfo.topicContactId, imageUrl: imageUrl, name: name },
                  });
                }
              }}
            >
<<<<<<< HEAD
              {t('mini.chat')}
=======
              Chat
>>>>>>> main
            </Button>
          </s.InfoHeaderWrapper>
        </s.InfoWrapper>
      </s.Wrapper>
      <s.WrapperBtn>
        {isExpert ? (
          <Button
            size={'small'}
            type={isSubcribed ? 'default' : 'primary'}
            onClick={() => {
              subexpert(id);
            }}
          >
<<<<<<< HEAD
            {isSubcribed ? t('mini.unsub') : t('mini.sub')}
=======
            {isSubcribed ? 'Huỷ Đăng ký' : 'Đăng ký'}
>>>>>>> main
          </Button>
        ) : null}
        {isExpert ? (
          <div
            style={{
              borderLeft: 'thin solid rgb(0 0 0)',
            }}
          />
        ) : null}
        {contactInfo ? (
          getBtn(statusFr)
        ) : (
          <Button
            size={'small'}
            type={'primary'}
            onClick={() => {
              addfriend(id);
            }}
          >
<<<<<<< HEAD
            {t('mini.addfr')}
=======
            Kết bạn
>>>>>>> main
          </Button>
        )}
      </s.WrapperBtn>
    </s.ActivityCard>
  );
};
