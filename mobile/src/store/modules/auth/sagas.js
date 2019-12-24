import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

// import history from '~/services/history';
import api from '~/services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.get, `students/${id}`);

    const student = response.data;

    yield put(signInSuccess(student));

    // history.push('/students');
  } catch (e) {
    let message;

    if (e.response) {
      message = e.response.data.error;
    } else if (e.request) {
      message = e.request.toString();
    } else {
      message = e.message;
    }
    Alert.alert('Falha na autenticação', message);
    yield put(signFailure());
  }
}

export function signOut() {
  // history.push('/');
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
