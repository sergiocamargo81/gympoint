import React from 'react';
import { View } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import PropTypes from 'prop-types';

import {
  Container,
  Button,
  List,
  Checkin,
  CheckinName,
  CheckinElapsed,
} from './styles';

import Header from '~/components/Header';

const data = [
  { id: 14, name: 'Check-in #14', elapsed: 'Hoje às 14h' },
  { id: 13, name: 'Check-in #13', elapsed: 'Ontem às 20h' },
  { id: 12, name: 'Check-in #12', elapsed: 'Há 3 dias' },
  { id: 11, name: 'Check-in #11', elapsed: 'Há 1 semana' },
  { id: 10, name: 'Check-in #10', elapsed: 'Há 2 semanas' },
  { id: 9, name: 'Check-in #9', elapsed: 'Há 1 mês' },
  { id: 8, name: 'Check-in #8', elapsed: 'Há 3 meses' },
  { id: 7, name: 'Check-in #7', elapsed: 'Hoje às 14h' },
  { id: 6, name: 'Check-in #6', elapsed: 'Ontem às 20h' },
  { id: 5, name: 'Check-in #5', elapsed: 'Há 3 dias' },
  { id: 4, name: 'Check-in #4', elapsed: 'Há 1 semana' },
  { id: 3, name: 'Check-in #3', elapsed: 'Há 2 semanas' },
  { id: 2, name: 'Check-in #2', elapsed: 'Há 1 mês' },
  { id: 1, name: 'Check-in #1', elapsed: 'Há 3 meses' },
];

function Item({ item }) {
  return (
    <Checkin>
      <CheckinName>{item.name}</CheckinName>
      <CheckinElapsed>{item.elapsed}</CheckinElapsed>
    </Checkin>
  );
}

export default function Checkins() {
  return (
    <Container>
      <Header />
      <Button>Novo check-in</Button>
      <List
        data={data}
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
