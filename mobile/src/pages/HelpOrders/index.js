import React, { useState, useEffect } from 'react';

import { Alert, TouchableOpacity } from 'react-native';

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

function formatHelpOrder(helpOrder) {
  helpOrder.answered = helpOrder.answer !== null;
  helpOrder.elapsed = formatDistanceToNow(parseISO(helpOrder.createdAt), {
    addSuffix: true,
    locale: pt,
  });

  return helpOrder;
}

export default function HelpOrders({ navigation }) {
  const id = useSelector(state => state.auth.id);

  const [helpOrders, setHelpOrders] = useState([]);

  useEffect(() => {
    async function loadHelpOrders() {
      const response = await api.get(`students/${id}/help-orders`);

      const formattedHelpOrders = response.data.map(h => formatHelpOrder(h));

      setHelpOrders(formattedHelpOrders);
    }

    loadHelpOrders();
  }, [id]);

  function ItemStatus({ item }) {
    return (
      <HelpOrderStatus answered={item.answered}>
        {item.answered ? 'Respondido' : 'Sem resposta'}
      </HelpOrderStatus>
    );
  }

  function itemPress(item) {
    navigation.navigate('HelpOrderAnswered', {
      helpOrder: item,
    });
  }

  function Item({ item }) {
    return (
      <TouchableOpacity onPress={() => itemPress(item)}>
        <HelpOrder>
          <HelpOrderHeader>
            <HelpOrderCheck answered={item.answered} />
            <ItemStatus item={item} />
            <HelpOrderElapsed>{item.elapsed}</HelpOrderElapsed>
          </HelpOrderHeader>
          <HelpOrderBody>{item.question}</HelpOrderBody>
        </HelpOrder>
      </TouchableOpacity>
    );
  }

  async function handleNewHelpOrder() {
    navigation.navigate('HelpOrderCreate', {
      onCreated: helpOrder => {
        const formattedHelpOrders = [helpOrder, ...helpOrders].map(h =>
          formatHelpOrder(h)
        );

        setHelpOrders(formattedHelpOrders);
      },
    });
  }

  return (
    <Container>
      <Button onPress={handleNewHelpOrder}>Novo pedido de auxílio</Button>
      <List
        data={helpOrders}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => <Item item={item} />}
      />
    </Container>
  );
}

HelpOrders.navigationOptions = {
  header: <Header />,
  tabBarLabel: 'Pedir ajuda',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="live-help" size={20} color={tintColor} />
  ),
};
