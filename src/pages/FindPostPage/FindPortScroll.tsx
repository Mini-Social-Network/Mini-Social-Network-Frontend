import React, { useEffect, useMemo, useRef, useState } from 'react';

import * as s from '../FindPostPage/Tables.styles';
import { NotFound } from '@app/components/common/NotFound/NotFound';
import { Tag } from '@app/components/common/Tag/Tag';
import { Col, Row, Spin, Image } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface RecentActivityFeedProps {
  activity: any[];
  hasMore: boolean;
  next: () => void;
}

const FindPortScroll: React.FC<RecentActivityFeedProps> = ({ activity, hasMore, next }) => {
  const navigate = useNavigate();

  const activityItems = useMemo(
    () =>
      activity?.map((item, index) => {
        console.log(activity);
        return (
          <Col className="gutter-row" span={12} md={12} xs={24} key={index}>
            <Col span={24}>
              <s.ActivityCard
                bodyStyle={{ padding: '0px  10px' }}
                onClick={() => {
                  navigate(`/detail`, {
                    state: item.id,
                  });
                }}
              >
                <s.Wrapper>
                  <s.ImgWrapper>
                    {item.imageList?.map((img: string) => (
                      <Image
                        src={`http://localhost:8081/local-store/${img}`}
                        alt={`title ${img ? img : 'dfavt'}`}
                        width={100}
                        height={100}
                        preview={false}
                        key={img}
                      />
                    ))}
                  </s.ImgWrapper>

                  <s.InfoWrapper>
                    <s.InfoHeaderWrapper>
                      <s.Title2>{item.title}</s.Title2>
                      {!!item.topicTag && (
                        <s.TagsWrapper>
                          <Tag key={item.topicTag.id} title={item.topicTag.tagName} bgColor={item.topicTag.color} />
                        </s.TagsWrapper>
                      )}
                      <s.Description>{item.context}</s.Description>
                      <s.Hashtag>#{item.hashTag}</s.Hashtag>
                    </s.InfoHeaderWrapper>
                  </s.InfoWrapper>
                </s.Wrapper>
              </s.ActivityCard>
            </Col>
          </Col>
        );
      }),
    [activity],
  );

  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // if (activity.length < 4) {
    //   feedRef.current?.dispatchEvent(new CustomEvent('scroll'));
    // }
    console.log(activity);
  }, [activity]);

  return activityItems.length > 0 ? (
    <s.FeedWrapper ref={feedRef} id="recent-activity-feed">
      <InfiniteScroll
        dataLength={activityItems.length}
        next={next}
        hasMore={hasMore}
        loader={
          <s.SpinnerWrapper>
            <Spin size="large" />
          </s.SpinnerWrapper>
        }
        style={{ overflow: 'hidden' }}
        scrollableTarget="recent-activity-feed"
      >
        <Row gutter={[16, 24]}>{activityItems}</Row>
      </InfiniteScroll>
    </s.FeedWrapper>
  ) : (
    <NotFound />
  );
};
export default FindPortScroll;
