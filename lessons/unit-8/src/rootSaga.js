import { all } from 'redux-saga/effects';
import authSagas from './ducks/auth/sagas';

export default function* rootSaga() {
  yield all([
    authSagas(),
  ]);
}
