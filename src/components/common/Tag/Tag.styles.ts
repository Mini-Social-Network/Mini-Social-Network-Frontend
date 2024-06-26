import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { CloseOutlined } from '@ant-design/icons';
import { TagSpan } from 'react-trello/dist/styles/Base';
import { FONT_SIZE } from '@app/styles/themes/constants';

export const RemoveTagWrapper = styled.span`
  padding-left: 0.3125rem;
  display: flex;
  align-items: center;
  padding-top: 1px;
`;

export const RemoveTagIcon = styled(CloseOutlined)`
  color: #ffffff;
  font-size: ${FONT_SIZE.xxs};
  cursor: pointer;
`;

export const TagWrapper = styled(TagSpan)`
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.3125rem 0.625rem;
  margin: 0;
  font-size: ${FONT_SIZE.xs};
`;
