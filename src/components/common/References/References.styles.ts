import styled from '@emotion/styled';
import { ComponentType } from 'react';
import { media } from '@app/styles/themes/constants';

export const ReferencesWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  flex-wrap: nowrap;
  margin-top: 2rem;

  @media only screen and ${media.sm} {
    align-items: center;
  }

  @media only screen and ${media.xl} {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const Text = styled.span`
  display: flex;
  align-items: center;
  white-space: pre-wrap;
  flex-wrap: wrap;
  margin-bottom: 1rem;

  @media only screen and ${media.xl} {
    margin-bottom: 0;
  }
`;

export const Icons = styled.div`
  margin-left: -0.5rem;
  margin-right: -0.5rem;
  display: flex;
  flex-wrap: nowrap;
`;

export function withStyles<T>(Component: ComponentType<T>): any {
  return styled(Component)`
    font-size: 2rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  `;
}
