import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import { formatDistanceToNow, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import api from '~/services/api';

import {
  Container,
  Button,
  List,
  Checkin,
  CheckinName,
  CheckinElapsed,
} from './styles';

import Header from '~/components/Header';

function Item({ item }) {
  return (
    <Checkin>
      <CheckinName>Check-in #{item.number}</CheckinName>
      <CheckinElapsed>{item.elapsed}</CheckinElapsed>
    </Checkin>
  );
}

export default function Checkins() {
  const id = useSelector(state => state.auth.id);

  const [checkins, setCheckins] = useState([]);

  useEffect(() => {
    async function loadCheckins() {
      const response = await api.get(`students/${id}/checkins`);

      let numberCheckin = response.data.length;

      const checkinsFormatted = response.data.map(c => {
        c.number = numberCheckin;
        c.elapsed = formatDistanceToNow(parseISO(c.createdAt), {
          addSuffix: true,
          locale: pt,
        });
        numberCheckin -= 1;
        return c;
      });

      setCheckins(checkinsFormatted);
    }

    loadCheckins();
  }, [id]);

  return (
    <Container>
      <Header />
      <Button>Novo check-in</Button>
      <List
        data={checkins}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => <Item item={item} />}
      />
    </Container>
  );
}

Checkins.navigationOptions = {
  tabBarLabel: 'Check-ins',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="edit-location" size={20} color={tintColor} />
  ),
};
