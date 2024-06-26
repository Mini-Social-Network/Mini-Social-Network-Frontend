import { CollapseProps, Collapse as AntdCollapse } from 'antd';
import * as S from './Collapse.styles';
import React from 'react';

export const { Panel } = AntdCollapse;

export const Collapse: React.FC<CollapseProps> = (props) => {
  return <S.Collapse {...props} />;
};
