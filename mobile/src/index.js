import React from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';

import './config/ReactotronConfig';

import { store } from './store';
import Routes from './routes';

export default function App() {
  return (
    <>
      <Provider store={store}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
        <Routes />
      </Provider>
    </>
  );
}
