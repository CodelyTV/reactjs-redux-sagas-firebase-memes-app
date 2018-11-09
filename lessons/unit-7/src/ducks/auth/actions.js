import * as types from './types';

/**
 * Create user actions
 */
export const createUserRequest = ({ username, email, password }) => ({
  type: types.CREATE_USER_REQUEST,
  payload: {
    username,
    email,
    password,
  },
});
export const createUserStart = () => ({
  type: types.CREATE_USER_START,
});
export const createUserSuccess = user => ({
  type: types.CREATE_USER_SUCCESS,
  payload: {
    user,
  },
});
export const createUserFailed = error => ({
  type: types.CREATE_USER_FAILED,
  payload: {
    error,
  },
});
