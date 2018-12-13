import { all } from 'redux-saga/effects';
import authSagas from './ducks/auth/sagas';
import sparksSagas from './ducks/data/sagas';

export default function* rootSaga() {
  yield all([
    authSagas(),
    sparksSagas(),
  ]);
}
