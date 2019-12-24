import React, { useState, useEffect } from 'react';

import { Alert } from 'react-native';

import { withNavigationFocus } from 'react-navigation';

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

Item.propTypes = {
  item: PropTypes.shape({
    number: PropTypes.number.isRequired,
    elapsed: PropTypes.string.isRequired,
  }).isRequired,
};

function Checkins({ isFocused }) {
  const id = useSelector(state => state.auth.id);

  const [checkins, setCheckins] = useState([]);

  const [loading, setLoading] = useState(false);

  const [newCheckin, setNewCheckin] = useState({});

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
  }, [id, isFocused, newCheckin]);

  async function handleNewCheckin() {
    setLoading(true);

    try {
      const response = await api.post(`/students/${id}/checkins`);

      setNewCheckin(response.data);
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
  }

  return (
    <Container>
      <Header />
      <Button loading={loading} onPress={handleNewCheckin}>
        Novo check-in
      </Button>
      <List
        data={checkins}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => <Item item={item} />}
      />
    </Container>
  );
}

function TabCheckinsIcon({ tintColor }) {
  return <Icon name="edit-location" size={20} color={tintColor} />;
}

TabCheckinsIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Checkins.navigationOptions = {
  tabBarLabel: 'Check-ins',
  tabBarIcon: TabCheckinsIcon,
};

Checkins.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
  }).isRequired,
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(Checkins);
