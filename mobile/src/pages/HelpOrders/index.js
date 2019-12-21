import React, { useState, useEffect } from 'react';

import { Alert } from 'react-native';

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
  HelpOrder,
  HelpOrderHeader,
  HelpOrderCheck,
  HelpOrderStatus,
  HelpOrderElapsed,
  HelpOrderBody,
} from './styles';

import Header from '~/components/Header';

function ItemStatus({ item }) {
  return (
    <HelpOrderStatus answered={item.answered}>
      {item.answered ? 'Respondido' : 'Sem resposta'}
    </HelpOrderStatus>
  );
}

function Item({ item }) {
  return (
    <HelpOrder>
      <HelpOrderHeader>
        <HelpOrderCheck answered={item.answered} />
        <ItemStatus item={item} />
        <HelpOrderElapsed>{item.elapsed}</HelpOrderElapsed>
      </HelpOrderHeader>
      <HelpOrderBody numberOfLines={3}>{item.question}</HelpOrderBody>
    </HelpOrder>
  );
}

export default function HelpOrders() {
  const id = useSelector(state => state.auth.id);

  const [helpOrders, setHelpOrders] = useState([]);

  const [loading, setLoading] = useState(false);

  const [newHelpOrder, setNewHelpOrder] = useState({});

  useEffect(() => {
    async function loadHelpOrders() {
      const response = await api.get(`students/${id}/help-orders`);

      const helpOrdersFormatted = response.data.map(h => {
        h.answered = h.answer !== null;
        h.elapsed = formatDistanceToNow(parseISO(h.createdAt), {
          addSuffix: true,
          locale: pt,
        });

        return h;
      });

      setHelpOrders(helpOrdersFormatted);
    }

    loadHelpOrders();
  }, [id, newHelpOrder]);

  async function handleNewHelpOrder() {
    /*
    setLoading(true);

    try {
      const response = await api.post(`/students/${id}/checkins`);

      setNewHelpOrder(response.data);
    } catch (e) {
      let message;

      if (e.response) {
        message = e.response.data.error;
      } else if (e.request) {
        message = e.request.toString();
      } else {
        message = e.message;
      }

      Alert.alert('Falha ao realizar check-in', message);
    }

    setLoading(false);
    */
  }

  return (
    <Container>
      <Header />
      <Button loading={loading} onPress={handleNewHelpOrder}>
        Novo pedido de auxílio
      </Button>
      <List
        data={helpOrders}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => <Item item={item} />}
      />
    </Container>
  );
}

HelpOrders.navigationOptions = {
  tabBarLabel: 'Pedir ajuda',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="live-help" size={20} color={tintColor} />
  ),
};
