import React, { useState, useEffect } from 'react';

import { TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { withNavigationFocus } from 'react-navigation';

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

function Item({ item, navigation }) {
  const handlePress = () =>
    navigation.navigate('HelpOrderAnswered', {
      helpOrder: item,
    });

  return (
    <TouchableOpacity onPress={handlePress}>
      <HelpOrder>
        <HelpOrderHeader>
          <HelpOrderCheck answered={item.answered} />
          <HelpOrderStatus answered={item.answered}>
            {item.answered ? 'Respondido' : 'Sem resposta'}
          </HelpOrderStatus>
          <HelpOrderElapsed>{item.elapsed}</HelpOrderElapsed>
        </HelpOrderHeader>
        <HelpOrderBody>{item.question}</HelpOrderBody>
      </HelpOrder>
    </TouchableOpacity>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    answered: PropTypes.bool.isRequired,
    elapsed: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

function HelpOrders({ navigation, isFocused }) {
  const id = useSelector(state => state.auth.id);

  const [helpOrders, setHelpOrders] = useState([]);

  useEffect(() => {
    async function loadHelpOrders() {
      const response = await api.get(`students/${id}/help-orders`);

      const formattedHelpOrders = response.data.map(h => formatHelpOrder(h));

      setHelpOrders(formattedHelpOrders);
    }

    if (isFocused) {
      loadHelpOrders();
    }
  }, [id, isFocused]);

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
        renderItem={({ item }) => <Item item={item} navigation={navigation} />}
      />
    </Container>
  );
}

HelpOrders.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  isFocused: PropTypes.bool.isRequired,
};

function TabHelpOrdersIcon({ tintColor }) {
  return <Icon name="live-help" size={20} color={tintColor} />;
}

TabHelpOrdersIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

HelpOrders.navigationOptions = {
  header: <Header />,
  tabBarLabel: 'Pedir ajuda',
  tabBarIcon: TabHelpOrdersIcon,
};

export default withNavigationFocus(HelpOrders);
