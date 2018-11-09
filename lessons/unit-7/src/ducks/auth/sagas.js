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

function* loginUser(action) {
  yield put(actions.loginUserStart());

  try {
    const { email, password } = action.payload;
    const user = yield call(AuthService.loginUser, email, password);
    yield put(actions.loginUserSuccess(user));
  } catch (error) {
    yield put(actions.loginUserFailed(error));
  }
}

function* logoutUser() {
  yield call(AuthService.logoutUser);
}

export default function* () {
  yield all([
    yield takeLatest(types.CREATE_USER_REQUEST, createUser),
    yield takeLatest(types.LOGIN_USER_REQUEST, loginUser),
    yield takeLatest(types.LOGOUT_USER, logoutUser),
  ]);
}
