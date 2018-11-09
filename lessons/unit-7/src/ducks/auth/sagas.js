import {
  all, takeLatest, put, call,
} from 'redux-saga/effects';
import AuthService from '../../services/AuthService';
import * as actions from './actions';
import * as types from './types';

function* createUser(action) {
  yield put(actions.createUserStart());

  try {
    const user = yield call(AuthService.createUser, action.payload);
    yield put(actions.createUserSuccess(user));
  } catch (error) {
    yield put(actions.createUserFailed(error));
  }
}

export default function* () {
  yield all([
    yield takeLatest(types.CREATE_USER_REQUEST, createUser),
  ]);
}
