import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { id } = payload;

    yield call(api.get, `/students/${id}`);

    yield put(signInSuccess(id));
  } catch (err) {
    Alert.alert(
      'Erro',
      'Não existe um aluno cadastrado com esse ID de cadastro.'
    );

    yield put(signFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
