import React, { useState } from 'react';

import { Alert } from 'react-native';

import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import * as Yup from 'yup';

import api from '~/services/api';

import { Container, Question, Send } from './styles';

import Header from '~/components/Header';

const schema = Yup.string()
  .trim()
  .required();

export default function HelpOrderCreate({ navigation }) {
  const id = useSelector(state => state.auth.id);

  const [question, setQuestion] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleSend() {
    setLoading(true);

    try {
      if (schema.isValidSync(question)) {
        const response = await api.post(`/students/${id}/help-orders`, {
          question,
        });

        const onCreated = navigation.getParam('onCreated', () => {});

        onCreated(response.data);

        navigation.navigate('HelpOrders');
      } else {
        Alert.alert(
          'Falha ao criar pedido de ajuda',
          'O pedido não pode ser vazio'
        );
      }
    } catch (e) {
      let message;

      if (e.response) {
        message = e.response.data.error;
      } else if (e.request) {
        message = e.request.toString();
      } else {
        message = e.message;
      }

      Alert.alert('Falha ao criar pedido de ajuda', message);
    }

    setLoading(false);
  }

  function handleQuestionChange(q) {
    setQuestion(q);
  }

  return (
    <Container>
      <Question value={question} onChangeText={handleQuestionChange} />
      <Send loading={loading} onPress={handleSend}>
        Enviar pedido
      </Send>
    </Container>
  );
}

HelpOrderCreate.navigationOptions = ({ navigation }) => ({
  header: <Header onBack={() => navigation.navigate('HelpOrders')} />,
});
