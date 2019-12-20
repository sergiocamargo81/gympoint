import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

// import history from '~/services/history';
import api from '~/services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.get, `students/?id=${id}`);

    const { students } = response.data;

    if (students.length === 1) {
      yield put(signInSuccess(students[0]));
    } else {
      Alert.alert(
        'Falha na autenticação',
        'Aluno não encontrado, verifique seus dados'
      );
      yield put(signFailure());
    }

    // history.push('/students');
  } catch (error) {
    Alert.alert(
      'Falha na autenticação',
      'Houve um erro no login, verifique seus dados'
    );
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
