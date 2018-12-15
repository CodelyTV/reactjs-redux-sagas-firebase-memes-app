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

function* loadSparks(action) {
  const { uid, lastKey } = action.payload;

  yield put(actions.loadSparksStart(!lastKey));

  try {
    const sparks = yield call(DataService.loadSparks, { uid, lastKey });
    yield put(actions.loadSparksSuccess(sparks));
  } catch (error) {
    yield put(actions.loadSparksFailed(error));
  }
}

function* thumbsUpSpark(action) {
  const { key } = action.payload;
  yield put(actions.thumbsUpStart(key));

  try {
    const spark = yield call(DataService.thumbsUp, key);
    yield put(actions.thumbsUpSuccess(spark));
  } catch (error) {
    yield put(actions.thumbsUpFailed(error));
  }
}

export default function* () {
  yield all([
    yield takeLatest(types.POST_SPARK_REQUEST, postSpark),
    yield takeLatest(types.LOAD_SPARKS_REQUEST, loadSparks),
    yield takeLatest(types.THUMBS_UP_REQUEST, thumbsUpSpark),
  ]);
}
