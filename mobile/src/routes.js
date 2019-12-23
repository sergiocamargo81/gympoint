import React from 'react';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import { createBottomTabNavigator } from 'react-navigation-tabs';

import { createStackNavigator } from 'react-navigation-stack';

import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from './pages/SignIn';

import Checkins from './pages/Checkins';
import HelpOrders from './pages/HelpOrders';

import HelpOrderCreate from './pages/HelpOrderCreate';
import HelpOrderAnswered from './pages/HelpOrderAnswered';

function TabHelpOrderIcon({ tintColor }) {
  return <Icon name="live-help" size={20} color={tintColor} />;
}

TabHelpOrderIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
        }),
        App: createBottomTabNavigator(
          {
            Checkins,
            HelpOrders: {
              screen: createStackNavigator({
                HelpOrders,
                HelpOrderCreate,
                HelpOrderAnswered,
              }),
              navigationOptions: {
                tabBarLabel: 'Pedir ajuda',
                tabBarIcon: TabHelpOrderIcon,
              },
            },
          },
          {
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#ee4d64',
              inactiveTintColor: '#999',
              style: { backgroundColor: '#fff' },
            },
          }
        ),
      },
      {
        initialRouteName: isSigned ? 'App' : 'Sign',
      }
    )
  );
