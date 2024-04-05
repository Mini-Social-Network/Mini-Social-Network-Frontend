import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { activityStatuses } from '@app/constants/config/activityStatuses';
import { Dates } from '@app/constants/Dates';
import * as S from './RecentActivityItem.styles';
import { Activity } from '@app/api/activity.api';
import dfavt from '@app/share/dfavt.png';
import { Button } from 'antd';
<<<<<<< HEAD
import { WrapperBtn } from '@app/pages/HistoryPage/Tables.styles';
=======
>>>>>>> main

export const RecentActivityItem: React.FC<Activity> = ({
  id,
  imageUrl,
  name,
  status,
  email,
<<<<<<< HEAD
  statusFr,
  acpfriend,
  cancelacpfriend,
  unfriend,
}) => {
  const { t } = useTranslation();
  console.log(imageUrl, name, status, email);
=======
  topicContactId,
  unfriend,
}) => {
  const { t } = useTranslation();
  console.log(imageUrl, name, status, email, topicContactId);
>>>>>>> main

  const currentActivity = useMemo(() => activityStatuses.find((dbStatus) => dbStatus.name === status), [status]);

  return (
<<<<<<< HEAD
    <S.ActivityCard $isSider={false}>
=======
    <S.ActivityCard>
>>>>>>> main
      <S.Wrapper>
        <S.ImgWrapper>
          <img
            src={imageUrl ? `http://localhost:8081/local-store/${imageUrl}` : dfavt}
            alt={`title ${imageUrl ? imageUrl : 'dfavt'}`}
            width={84}
            height={84}
          />
        </S.ImgWrapper>

        <S.InfoWrapper>
          <S.InfoHeaderWrapper>
            <S.TitleWrapper>
              <S.Title level={5}>{name}</S.Title>
<<<<<<< HEAD
            </S.TitleWrapper>
            <S.Text>{email}</S.Text>
          </S.InfoHeaderWrapper>
          {statusFr === 2 ? (
            <Button
              size={'small'}
              onClick={() => {
                unfriend(id);
              }}
            >
              {t('mini.unfr')}
            </Button>
          ) : (
            <WrapperBtn>
              <Button
                size={'small'}
                type={'primary'}
                onClick={() => {
                  acpfriend(id);
                }}
              >
                {t('mini.acptfr')}
              </Button>
              <Button
                size={'small'}
                onClick={() => {
                  cancelacpfriend(id);
                }}
                danger
              >
                {t('mini.cancel')}
              </Button>
            </WrapperBtn>
          )}
=======

              <S.IconWrapper>{currentActivity?.icon}</S.IconWrapper>
            </S.TitleWrapper>

            <S.Text>
              {t(currentActivity?.title || '')} {t('nft.by')} {email}
            </S.Text>
          </S.InfoHeaderWrapper>
          <Button
            onClick={() => {
              unfriend(id);
            }}
          >
            Huỷ Kết Bạn
          </Button>
>>>>>>> main
        </S.InfoWrapper>
      </S.Wrapper>
    </S.ActivityCard>
  );
};
