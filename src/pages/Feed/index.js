import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';

import FeedImage from '../../components/FeedImage';

import api from '../../services/api';

import {
  Container,
  Post,
  Header,
  Avatar,
  Name,
  Description,
  Loading,
} from './styles';

export default function Feed() {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  async function loadPage() {
    if (loading) return;

    setLoading(true);

    const { data } = await api.get(`/feed`);

    setLoading(false);

    setFeed(data);
  }

  async function refreshList() {
    setRefreshing(true);

    await loadPage();

    setRefreshing(false);
  }

  useEffect(() => {
    loadPage();
  }, []);

  return (
    <Container>
      <FlatList
        key="list"
        data={feed}
        keyExtractor={(item) => String(item.id)}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 10,
        }}
        showsVerticalScrollIndicator={false}
        onRefresh={refreshList}
        refreshing={refreshing}
        ListFooterComponent={loading && <Loading />}
        renderItem={({ item }) => (
          <Post>
            <Header>
              <Avatar
                source={{ uri: item.InstagramUser.profile_picture_url }}
              />
              <Name>{item.InstagramUser.username}</Name>
            </Header>

            <FeedImage
              aspectRatio={0.834}
              smallSource={item.media_url}
              source={item.thumbnail_ur}
            />

            <Description>
              <Name>{item.InstagramUser.username}</Name> {item.caption}
            </Description>
          </Post>
        )}
      />
    </Container>
  );
}
