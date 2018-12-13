import {
  all, takeLatest, put, call,
} from 'redux-saga/effects';
import AuthService from '../../services/AuthService';
import DataService from '../../services/DataService';
import * as actions from './actions';
import * as types from './types';

function* postSpark(action) {
  yield put(actions.postSparkStart());

  try {
    const { data } = action.payload;
    const imageData = {
      ...data.images.fixed_width,
      title: data.title,
    };

    const user = yield call(AuthService.currentUser);
    yield call(DataService.addSpark, imageData, user.uid);

    yield put(actions.postSparkSuccess());
  } catch (error) {
    yield put(actions.postSparkFailed(error));
  }
}

export default function* () {
  yield all([
    yield takeLatest(types.POST_SPARK_REQUEST, postSpark),
  ]);
}
