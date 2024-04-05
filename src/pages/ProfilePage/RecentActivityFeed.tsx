import React, { useEffect, useMemo, useRef, useState } from 'react';

import * as s from '../HistoryPage/Tables.styles';

import { Feed } from '@app/components/common/Feed/Feed';
import { NotFound } from '@app/components/common/NotFound/NotFound';
import { RecentActivityItem } from './RecentActivityItem/RecentActivityItem';

interface RecentActivityFeedProps {
  activity: any[];
  hasMore: boolean;
  next: () => void;
  unfriend: any;
<<<<<<< HEAD
  acpfriend: any;
  cancelacpfriend: any;
}

const RecentActivityFeed: React.FC<RecentActivityFeedProps> = ({
  unfriend,
  activity,
  hasMore,
  next,
  acpfriend,
  cancelacpfriend,
}) => {
  const activityItems = useMemo(
    () =>
      activity?.map((item, index) => (
        <RecentActivityItem
          key={index}
          {...item.userFriend}
          topicContactId={item.topicContactId}
          unfriend={unfriend}
          statusFr={item.status}
          acpfriend={acpfriend}
          cancelacpfriend={cancelacpfriend}
        />
=======
}

const RecentActivityFeed: React.FC<RecentActivityFeedProps> = ({ unfriend, activity, hasMore, next }) => {
  const activityItems = useMemo(
    () =>
      activity.map((item, index) => (
        <RecentActivityItem key={index} {...item.userFriend} topicContactId={item.topicContactId} unfriend={unfriend} />
>>>>>>> main
      )),
    [activity],
  );

  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // if (activity.length < 4) {
    //   feedRef.current?.dispatchEvent(new CustomEvent('scroll'));
    // }
    console.log(activity);
  }, [activity]);

  return activityItems?.length > 0 ? (
    <s.FeedWrapper ref={feedRef} id="recent-activity-feed">
      <Feed hasMore={hasMore} next={next} target="recent-activity-feed">
        {activityItems}
      </Feed>
    </s.FeedWrapper>
  ) : (
    <NotFound />
  );
};
export default RecentActivityFeed;
