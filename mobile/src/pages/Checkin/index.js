import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';

import Background from '~/components/Background';

import {
  Container,
  CheckInButton,
  CheckInList,
  CheckInView,
  Title,
  Time,
} from './styles';

export default function Checkin() {
  const [checkins, setCheckins] = useState([]);
  const [count, setCount] = useState();
  const [page, setPage] = useState(0);
  const [maxPage, setMaxPage] = useState(0);
  const [loading, setLoading] = useState(true);

  const id = useSelector(state => state.auth.id);

  async function handleCheckin() {
    setLoading(true);
    try {
      const response = await api.post(`/students/${id}/checkins`);

      const { id: checkinId, createdAt } = response.data;
      setCount(count + 1);

      const data = {
        id: checkinId,
        createdAt,
        formattedDate: formatRelative(parseISO(createdAt), new Date(), {
          locale: pt,
        }),
        formattedTitle: `Check-in #${count + 1}`,
      };

      setCheckins([data, ...checkins]);
    } catch (err) {
      Alert.alert(
        'Erro',
        'Você ultrapassou o limite de 5 check-ins no período de 7 dias.'
      );
    } finally {
      setLoading(false);
    }
  }

  function handleEndReached() {
    if (page < maxPage) {
      setLoading(true);
      setPage(page + 1);
      setLoading(false);
    }
  }

  useEffect(() => {
    async function loadCheckins() {
      const response = await api.get(`/students/${id}/checkins?page=${page}`);

      const data = response.data.rows.map((checkin, index) => ({
        ...checkin,
        formattedDate: formatRelative(parseISO(checkin.createdAt), new Date(), {
          locale: pt,
        }),
        formattedTitle: `Check-in #${response.data.count -
          checkins.length -
          index}`,
      }));

      setCount(response.data.count);
      setMaxPage(response.data.maxPage);

      setCheckins([...checkins, ...data]);
      setLoading(false);
    }

    loadCheckins();
  }, [id, page]);

  return (
    <Background>
      <Container>
        <CheckInButton loading={loading} onPress={handleCheckin}>
          Novo check-in
        </CheckInButton>

        <CheckInList
          data={checkins}
          keyExtractor={checkin => String(checkin.id)}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.2}
          renderItem={({ item: checkin }) => (
            <CheckInView>
              <Title>{checkin.formattedTitle}</Title>
              <Time>{checkin.formattedDate}</Time>
            </CheckInView>
          )}
        />
      </Container>
    </Background>
  );
}
