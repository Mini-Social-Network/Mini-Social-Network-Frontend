import React, { useEffect, useState } from 'react';
import ProfilePageService from './ProfilePageServicce';
import { Button, Card, Col, Empty, Row, Space, Tabs } from 'antd';

import { UserInfo } from './ProfilePage';
import { NewsFilter } from '@app/components/apps/newsFeed/NewsFilter/NewsFilter';
import { ArticleCard } from '@app/components/common/ArticleCard/ArticleCard';
import { Feed } from '@app/components/common/Feed/Feed';
import * as s from './Tables.styles';
<<<<<<< HEAD
import { useTranslation } from 'react-i18next';

const Post: React.FC<UserInfo> = ({ id, name, email, imageUrl, status, isExpert, rating, lastTime }: UserInfo) => {
  const [post, setPost] = useState<any[]>([]);
  const { t } = useTranslation();
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [nextOffset, setNextOffset] = useState<number>(0);

=======

const Post: React.FC<UserInfo> = ({ id, name, email, imageUrl, status, isExpert, rating, lastTime }: UserInfo) => {
  const [post, setPost] = useState<any[]>([]);

  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [nextOffset, setNextOffset] = useState<number>(0);

>>>>>>> main
  const getAllData = () => {
    if (id) {
      setLoaded(true);
      ProfilePageService.getAllPost(id, nextOffset).then((data: any) => {
        if (data.data) {
          if (data.data?.length === 0) {
            setHasMore(false);
          } else {
            setHasMore(true);
            setPost((oldPost) => [...oldPost, ...data.data]);
            setNextOffset([...post, ...data.data].length);
          }
        }
      });
      setLoaded(false);
    }
  };
  useEffect(() => {
    if (id) {
      setLoaded(true);
      ProfilePageService.getAllPost(id, nextOffset).then((data: any) => {
        if (data.data) {
          setPost((oldPost) => [...oldPost, ...data.data]);

          setNextOffset([...post, ...data.data].length);
        }
        setLoaded(false);
      });
    }
  }, [id]);

  const next = () => {
    getAllData();
  };

  return (
    <>
<<<<<<< HEAD
      <s.Card title={t('mini.mypost')}>
=======
      <s.Card title="Trang của tôi">
>>>>>>> main
        <Row style={{ display: 'flex', justifyContent: 'center' }}>
          <NewsFilter news={post}>
            {({ filteredNews }) =>
              filteredNews?.length || !loaded ? (
                <Feed next={next} hasMore={hasMore}>
                  {filteredNews?.map((post) => (
                    <ArticleCard
                      key={post.id}
<<<<<<< HEAD
                      idPost={post.id}
                      idUser={0}
=======
>>>>>>> main
                      title={post.title}
                      description={post.context}
                      date={post.createAt}
                      imgUrl={post.imageList}
                      author={post.user.name}
                      avatar={post.user.imageUrl}
                      tags={post.topicTag}
                      hashTags={post.hashTag}
                      disLikeCount={post.disLikeCount}
                      likeCount={post.likeCount}
                      commentCount={post.commentCount}
                      isExpert={post.user.isExpert}
<<<<<<< HEAD
                      isLike={post.isLike}
                      isDisLike={post.isDisLike}
                      viewCount={post.viewCount}
=======
>>>>>>> main
                    />
                  ))}
                </Feed>
              ) : (
                <Empty />
              )
            }
          </NewsFilter>
        </Row>
      </s.Card>
    </>
  );
};

export default Post;
