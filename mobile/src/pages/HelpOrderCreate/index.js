import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

import { Container } from './styles';

import Header from '~/components/Header';

export default function HelpOrderCreate() {
  return <Container />;
}

HelpOrderCreate.navigationOptions = ({ navigation }) => ({
  header: <Header onBack={() => navigation.navigate('HelpOrders')} />,
});
