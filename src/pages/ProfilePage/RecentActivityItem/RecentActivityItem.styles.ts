import { Typography } from 'antd';
// import { css } from 'styled-components';
import styled from '@emotion/styled';
import { css } from '@emotion/react'
import { Card as BaseCard } from '@app/components/common/Card/Card';
import { FONT_SIZE, media, FONT_FAMILY } from '@app/styles/themes/constants';

interface CardInternalProps {
  $isSider: boolean;
}

export const ActivityCard = styled(BaseCard)<CardInternalProps>`
  box-shadow: var(--box-shadow-nft-secondary-color);

  ${(props) =>
    props.$isSider &&
    css`
      background: var(--additional-background-color);
    `};
`;

export const Wrapper = styled.div`
  display: flex;
  gap: 1.625rem;
`;

export const ImgWrapper = styled.div`
  position: relative;
`;

export const IconWrapper = styled.div`
  width: 1.4375rem;
  height: 1.4375rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  color: var(--text-secondary-color);

  background-color: var(--primary-color);

  font-size: ${FONT_SIZE.xs};
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex: 1;
`;

export const InfoHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`;

export const InfoBottomWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled(Typography.Title)`
  &.ant-typography {
    margin-bottom: 0;

    font-size: ${FONT_SIZE.xs};

    @media only screen and ${media.xl} {
      font-size: ${FONT_SIZE.md};
    }
  }
`;

export const Text = styled(Typography.Text)`
  display: block;

  font-size: ${FONT_SIZE.xxs};

  color: var(--text-nft-light-color);

  font-family: ${FONT_FAMILY.secondary};

  @media only screen and ${media.xl} {
    font-size: ${FONT_SIZE.xs};
  }
`;

export const DateText = styled(Text)`
  font-style: italic;

  font-family: ${FONT_FAMILY.main};
`;
