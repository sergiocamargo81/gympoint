import React from 'react';
import { View } from 'react-native';

import Header from '~/components/Header';

// import { Container } from './styles';

export default function HelpOrderAnswered() {
  return <View />;
}

HelpOrderAnswered.navigationOptions = ({ navigation }) => ({
  header: <Header onBack={() => navigation.navigate('HelpOrders')} />,
});
