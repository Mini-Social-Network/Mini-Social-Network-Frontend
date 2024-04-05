import React, { useEffect, useState } from 'react';
import { ExpertInfo } from './ProfilePage';
import { Card } from './Tables.styles';
import { Title } from '../DashBoard/Tables.styles';
import { Rate } from 'antd';

<<<<<<< HEAD
const ExpertInfoPage: React.FC<ExpertInfo> = ({ jobTitle, specialist, workPlace, rating, ratingCount }) => {
  const [expertInfo, setExpertInfo] = useState({ jobTitle, specialist, workPlace, rating, ratingCount });
  useEffect(() => {
    setExpertInfo({ jobTitle, specialist, workPlace, rating, ratingCount });
  }, [jobTitle, specialist, workPlace, rating, ratingCount]);
  return (
    <Card>
      {expertInfo.jobTitle && <Title level={2}>{expertInfo.jobTitle}</Title>}
      {expertInfo.specialist && <Title level={2}>{expertInfo.specialist}</Title>}
      {expertInfo.workPlace && <Title level={2}>{expertInfo.workPlace}</Title>}
      {expertInfo.rating ? (
        <span style={{ display: 'flex', flexDirection: 'row', padding: 15, fontFamily: 'inherit' }}>
          <Rate disabled style={{ fontSize: '1.5rem' }} defaultValue={expertInfo.rating} />
          {expertInfo.ratingCount ? (
            <span style={{ fontSize: '1.5rem' }} className="ant-rate-text">
              {expertInfo.ratingCount}
            </span>
          ) : (
            ''
          )}
        </span>
      ) : null}
    </Card>
=======
const ExpertInfoPage: React.FC<ExpertInfo> = ({ jobTitle, specialist, workPlace, rating }) => {
  const [expertInfo, setExpertInfo] = useState({ jobTitle, specialist, workPlace, rating });

  return (
    <>
      <div>
        <ul>
          {expertInfo.jobTitle && <li>{expertInfo.jobTitle}</li>}
          {expertInfo.specialist && <li>{expertInfo.specialist}</li>}
          {expertInfo.workPlace && <li>{expertInfo.workPlace}</li>}
          {expertInfo.rating && <li>{expertInfo.rating}</li>}
        </ul>
      </div>
    </>
>>>>>>> main
  );
};

export default ExpertInfoPage;
