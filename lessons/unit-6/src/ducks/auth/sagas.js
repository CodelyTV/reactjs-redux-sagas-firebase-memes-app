import { takeLatest, put, call } from 'redux-saga/effects';
import * as actions from './actions';
import firebase from '../../services/firebase';

function* newUser(action) {
  const { username, email, password } = action.payload;

  yield put(actions.newUserStart());

  try {
    const auth = firebase.auth();
    const userCredential = yield call([auth, auth.createUserWithEmailAndPassword], email, password);
    if (userCredential) {
      const { user } = userCredential;
      yield call([user, user.updateProfile], { displayName: username });

      yield put(actions.newUserSuccess(user));
    }
  } catch (error) {
    yield put(actions.newUserFailure(error));
  }
}

export default function* () {
  yield takeLatest('NEW_USER_REQUEST', newUser);
}
